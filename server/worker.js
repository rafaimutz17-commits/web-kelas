const SESSION_COOKIE = 'roman_admin_session'
const SESSION_DURATION_SECONDS = 60 * 60 * 12
const LOGIN_WINDOW_SECONDS = 15 * 60
const MAX_LOGIN_ATTEMPTS = 5
const MAX_CONTENT_BYTES = 1_000_000
const MAX_IMAGE_BYTES = 8 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  })
}

function bytesToBase64Url(bytes) {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
}

function base64UrlToBytes(value) {
  const base64 = value.replaceAll('-', '+').replaceAll('_', '/')
  const binary = atob(base64 + '='.repeat((4 - (base64.length % 4)) % 4))
  return Uint8Array.from(binary, (character) => character.charCodeAt(0))
}

async function sign(value, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  return bytesToBase64Url(new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))))
}

function constantTimeEqual(left, right) {
  const length = Math.max(left.length, right.length)
  let difference = left.length ^ right.length
  for (let index = 0; index < length; index += 1) {
    difference |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0)
  }
  return difference === 0
}

async function verifySession(request, env) {
  if (!env.SESSION_SECRET) throw new Error('SESSION_SECRET belum dikonfigurasi.')
  const cookie = request.headers.get('Cookie') || ''
  const token = cookie.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${SESSION_COOKIE}=`))?.slice(SESSION_COOKIE.length + 1)
  if (!token) return false
  const [expiresAt, nonce, signature] = token.split('.')
  if (!expiresAt || !nonce || !signature || Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false
  return constantTimeEqual(signature, await sign(`${expiresAt}.${nonce}`, env.SESSION_SECRET))
}

function sessionCookie(value, maxAge) {
  return `${SESSION_COOKIE}=${value}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAge}`
}

function hasSameOrigin(request) {
  const origin = request.headers.get('Origin')
  return origin === new URL(request.url).origin
}

async function handleLogin(request, env) {
  if (!hasSameOrigin(request)) return json({ error: 'Asal permintaan tidak valid.' }, 403)
  if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET) {
    return json({ error: 'Password admin atau kunci sesi belum dikonfigurasi di server.' }, 503)
  }
  const body = await request.json().catch(() => null)
  if (!body || typeof body.password !== 'string') return json({ error: 'Masukkan password admin.' }, 400)
  const clientAddress = request.headers.get('CF-Connecting-IP') || 'local-development'
  const ipHash = bytesToBase64Url(new Uint8Array(await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${env.SESSION_SECRET}:${clientAddress}`),
  )))
  const now = Math.floor(Date.now() / 1000)
  await env.DB.prepare('DELETE FROM admin_login_attempts WHERE window_started < ?')
    .bind(now - 24 * 60 * 60)
    .run()
  const attempt = await env.DB.prepare('SELECT window_started, attempt_count FROM admin_login_attempts WHERE ip_hash = ?')
    .bind(ipHash)
    .first()
  if (attempt && now - attempt.window_started < LOGIN_WINDOW_SECONDS && attempt.attempt_count >= MAX_LOGIN_ATTEMPTS) {
    return json({ error: 'Terlalu banyak percobaan masuk. Tunggu 15 menit sebelum mencoba lagi.' }, 429)
  }
  const windowStarted = attempt && now - attempt.window_started < LOGIN_WINDOW_SECONDS ? attempt.window_started : now
  const attemptCount = attempt && now - attempt.window_started < LOGIN_WINDOW_SECONDS ? attempt.attempt_count + 1 : 1
  await env.DB.prepare(
    'INSERT INTO admin_login_attempts (ip_hash, window_started, attempt_count) VALUES (?, ?, ?) ON CONFLICT(ip_hash) DO UPDATE SET window_started = excluded.window_started, attempt_count = excluded.attempt_count',
  ).bind(ipHash, windowStarted, attemptCount).run()
  if (!constantTimeEqual(body.password, env.ADMIN_PASSWORD)) return json({ error: 'Password admin tidak cocok.' }, 401)
  await env.DB.prepare('DELETE FROM admin_login_attempts WHERE ip_hash = ?').bind(ipHash).run()

  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS
  const nonce = crypto.randomUUID()
  const payload = `${expiresAt}.${nonce}`
  const signature = await sign(payload, env.SESSION_SECRET)
  return json({ authenticated: true }, 200, {
    'Set-Cookie': sessionCookie(`${payload}.${signature}`, SESSION_DURATION_SECONDS),
  })
}

async function handleContent(request, env) {
  if (request.method === 'GET') {
    const record = await env.DB.prepare('SELECT content_json, updated_at FROM site_content WHERE content_key = ?')
      .bind('homepage')
      .first()
    if (!record) return json({ content: null, updatedAt: null })
    return json({ content: JSON.parse(record.content_json), updatedAt: record.updated_at })
  }

  if (request.method === 'PUT') {
    if (!hasSameOrigin(request)) return json({ error: 'Asal permintaan tidak valid.' }, 403)
    if (!(await verifySession(request, env))) return json({ error: 'Silakan masuk sebagai admin untuk menyimpan perubahan.' }, 401)
    const raw = await request.text()
    if (new TextEncoder().encode(raw).byteLength > MAX_CONTENT_BYTES) return json({ error: 'Data terlalu besar untuk disimpan.' }, 413)
    let content
    try {
      content = JSON.parse(raw)
    } catch {
      return json({ error: 'Format data tidak valid.' }, 400)
    }
    if (!content || typeof content !== 'object' || !Array.isArray(content.students) || !Array.isArray(content.projects)) {
      return json({ error: 'Data situs belum lengkap atau formatnya tidak valid.' }, 400)
    }
    const updatedAt = new Date().toISOString()
    await env.DB.prepare(
      'INSERT INTO site_content (content_key, content_json, updated_at) VALUES (?, ?, ?) ON CONFLICT(content_key) DO UPDATE SET content_json = excluded.content_json, updated_at = excluded.updated_at',
    ).bind('homepage', JSON.stringify(content), updatedAt).run()
    return json({ saved: true, updatedAt })
  }

  return json({ error: 'Metode tidak didukung.' }, 405, { Allow: 'GET, PUT' })
}

async function handleUpload(request, env) {
  if (!hasSameOrigin(request)) return json({ error: 'Asal permintaan tidak valid.' }, 403)
  if (!(await verifySession(request, env))) return json({ error: 'Silakan masuk sebagai admin untuk mengunggah gambar.' }, 401)
  if (!env.IMAGES) return json({ error: 'Penyimpanan foto belum dikonfigurasi.' }, 503)

  const form = await request.formData()
  const file = form.get('file')
  if (!(file instanceof File)) return json({ error: 'Pilih file gambar terlebih dahulu.' }, 400)
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) return json({ error: 'Format gambar harus JPG, PNG, WebP, atau GIF.' }, 415)
  if (file.size > MAX_IMAGE_BYTES) return json({ error: 'Ukuran gambar maksimal 8 MB.' }, 413)

  const extension = file.type.split('/')[1].replace('jpeg', 'jpg')
  const key = `${crypto.randomUUID()}.${extension}`
  await env.IMAGES.put(key, file.stream(), {
    httpMetadata: { contentType: file.type, cacheControl: 'public, max-age=31536000, immutable' },
  })
  return json({ url: `/media/${key}` })
}

async function handleMedia(request, env, key) {
  if (request.method !== 'GET') return json({ error: 'Metode tidak didukung.' }, 405, { Allow: 'GET' })
  const object = await env.IMAGES.get(key)
  if (!object) return new Response('Gambar tidak ditemukan.', { status: 404 })
  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('ETag', object.httpEtag)
  headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  headers.set('X-Content-Type-Options', 'nosniff')
  return new Response(object.body, { headers })
}

async function routeApi(request, env) {
  const { pathname } = new URL(request.url)
  if (pathname === '/api/admin/login' && request.method === 'POST') return handleLogin(request, env)
  if (pathname === '/api/admin/logout' && request.method === 'POST') {
    if (!hasSameOrigin(request)) return json({ error: 'Asal permintaan tidak valid.' }, 403)
    return json({ authenticated: false }, 200, { 'Set-Cookie': sessionCookie('', 0) })
  }
  if (pathname === '/api/admin/session' && request.method === 'GET') {
    return json({ authenticated: await verifySession(request, env) })
  }
  if (pathname === '/api/content') return handleContent(request, env)
  if (pathname === '/api/upload' && request.method === 'POST') return handleUpload(request, env)
  if (pathname.startsWith('/media/')) return handleMedia(request, env, decodeURIComponent(pathname.slice('/media/'.length)))
  return json({ error: 'Endpoint tidak ditemukan.' }, 404)
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/media/')) {
      try {
        return await routeApi(request, env)
      } catch (error) {
        console.error('Permintaan situs gagal:', error)
        return json({ error: 'Layanan situs mengalami kendala. Coba lagi sebentar.' }, 500)
      }
    }
    return env.ASSETS.fetch(request)
  },
}
