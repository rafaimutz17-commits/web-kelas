import React, { useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import './RomanEntry.css'
import { ArrowDown, ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Users } from 'lucide-react'

const IMAGE_SOURCES = [
  { href: 'https://commons.wikimedia.org/wiki/File:Vitruvius,_Loggia_del_Consiglio,_Piazza_dei_Signori,_Verona_(37108421733).jpg', label: 'Vitruvius · Dimitris Kamaras (CC BY 2.0)' },
  { href: 'https://commons.wikimedia.org/wiki/File:Drawing,_Roman_Ruins_with_Figures,_ca._1745_(CH_18357879).jpg', label: 'Sketsa Romawi' },
  { href: 'https://github.com/twitter/twemoji', label: 'Pensil · Twemoji (CC BY 4.0)' },
]

export default function Login() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [journeyComplete, setJourneyComplete] = useState(false)
  const [step, setStep] = useState('story')
  const [staticStory, setStaticStory] = useState(false)
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const storyRef = useRef(null)
  const stageRef = useRef(null)

  const panelRef = useRef(null)

  useLayoutEffect(() => {
    if (step !== 'story') {
      window.scrollTo({ top: 0, behavior: 'instant' })
      panelRef.current?.querySelector('button, input')?.focus({ preventScroll: true })
    }
  }, [step])

  useLayoutEffect(() => {
    if (step !== 'story' || staticStory) return undefined
    if (prefersReducedMotion) {
      setStaticStory(true)
      setJourneyComplete(true)
      return undefined
    }
    let context
    let cancelled = false
    async function initializeScrollStory() {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'), import('gsap/ScrollTrigger'),
        ])
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)
        context = gsap.context(() => {
          const timeline = gsap.timeline({
            onUpdate() { setJourneyComplete(this.progress() >= 0.995) },
            scrollTrigger: {
              trigger: storyRef.current, start: 'top top',
              end: () => `+=${Math.max(2200, window.innerHeight * 4)}`,
              scrub: 0.6, pin: stageRef.current, anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          gsap.set('.roman-entry-perspective path', {
            strokeDasharray: (_, el) => el.getTotalLength(),
            strokeDashoffset: (_, el) => el.getTotalLength(),
          })
          timeline
            .to('.roman-entry-copy', { autoAlpha: 0, y: -25, duration: 0.6 }, 0.3)
            // A short push toward the architect, then the drawing surface.
            .to('.roman-entry-camera', { scale: 1.65, transformOrigin: '30% 35%', filter: 'blur(5px)', duration: 0.25, ease: 'power3.in' }, 0.9)
            .to('.roman-entry-camera', { filter: 'blur(0px)', duration: 0.2 }, 1.15)
            .fromTo('.roman-entry-idea', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 1.2)
            .to('.roman-entry-idea', { autoAlpha: 0, duration: 0.2 }, 1.7)
            .to('.roman-entry-camera', { scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'power2.inOut' }, 1.7)
            .to('.roman-entry-paper > img', { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: 'none' }, 2.1)
            .to('.roman-entry-perspective path', { strokeDashoffset: 0, autoAlpha: 0.85, duration: 0.25, stagger: 0.14, ease: 'none' }, 2.1)
            .fromTo('.roman-entry-pencil', { autoAlpha: 0, left: '12%', top: '52%' }, { autoAlpha: 1, left: '50%', top: '24%', duration: 0.3 }, 2.1)
            .to('.roman-entry-pencil', { left: '76%', top: '53%', rotation: 9, duration: 0.18 }, 2.4)
            .to('.roman-entry-pencil', { left: '50%', top: '76%', rotation: -8, duration: 0.18 }, 2.58)
            .to('.roman-entry-pencil', { left: '24%', top: '53%', rotation: 5, duration: 0.18 }, 2.76)
            .to('.roman-entry-pencil', { left: '50%', top: '24%', rotation: -5, duration: 0.18 }, 2.94)
            .to('.roman-entry-pencil', { left: '88%', top: '53%', rotation: 12, duration: 0.18, ease: 'power3.in' }, 3.12)
            .to('.roman-entry-paper', { scale: 3.2, transformOrigin: '88% 53%', duration: 0.5, ease: 'power3.in' }, 3.5)
            .to('.roman-entry-pencil', { scale: 18, transformOrigin: '0% 100%', duration: 0.4, ease: 'power3.in' }, 3.7)
            .to('.roman-entry-camera', { rotation: -12, scale: 1.2, filter: 'blur(7px)', duration: 0.3 }, 4.1)
            .to('.roman-entry-final', { autoAlpha: 1, duration: 0.4 }, 4.3)
            .to('.roman-entry-camera', { rotation: 0, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }, 4.4)
            .fromTo('.roman-entry-final-figure', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 4.5)
            .to('.roman-entry-mist', { autoAlpha: 1, duration: 0.5 }, 4.5)
        }, storyRef)
      } catch (animationError) {
        if (!cancelled) {
          console.error('Tidak dapat memuat animasi gerbang login.', animationError)
          setStaticStory(true)
          setJourneyComplete(true)
        }
      }
    }
    initializeScrollStory()
    return () => {
      cancelled = true
      context?.revert()
    }
  }, [prefersReducedMotion, staticStory, step])

  function enterHome() {
    try { sessionStorage.setItem('roman-entry-complete', '1') } catch { /* Storage is optional. */ }
    navigate('/', { state: { entryComplete: true } })
  }

  function replay() {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setJourneyComplete(false)
    setStaticStory(false)
    setStep('story')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ password }),
      })
      const isJson = response.headers.get('content-type')?.includes('application/json')
      const payload = isJson ? await response.json() : null
      if (!response.ok || !payload?.authenticated) {
        throw new Error(
          payload?.error ||
          (response.status >= 500
            ? 'Layanan admin sedang tidak tersedia. Jalankan npm run dev agar API admin aktif, lalu coba lagi.'
            : 'Tidak dapat masuk sebagai admin.'),
        )
      }
      try { sessionStorage.setItem('roman-entry-complete', '1') } catch { /* Optional storage. */ }
      navigate('/admin')
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? 'Tidak dapat terhubung ke layanan admin. Jalankan npm run dev dan coba lagi.'
          : requestError instanceof Error
            ? requestError.message
            : 'Koneksi layanan gagal. Coba lagi.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const showGate = step === 'gate' || (journeyComplete && step === 'story')

  return (
    <main className={`roman-entry-page ${staticStory ? 'is-static' : ''} ${step !== 'story' ? 'is-settled' : ''}`}>
      <section ref={storyRef} className="roman-entry-scroll" aria-label="Kisah pembuka arsitek Romawi">
        <div ref={stageRef} className="roman-entry-stage">
          <div className="roman-entry-camera">
            <div className="roman-entry-backdrop" aria-hidden="true" />

            <figure className="roman-entry-portrait">
              <img
                src="/images/vitruvius-standing.jpg"
                alt="Foto patung Vitruvius berdiri dengan buku di Verona"
                fetchPriority="high"
              />
              <figcaption>Marcus Vitruvius · architectus</figcaption>
              <span className="roman-entry-idea">Sebuah gagasan.</span>
            </figure>

            <figure className="roman-entry-paper">
              <img
                src="/images/roman-ruins-sketch.jpg"
                alt="Gambar perspektif reruntuhan dan lengkung arsitektur Romawi"
              />
              <svg className="roman-entry-perspective" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
                <path d="M30 400H970M30 400 500 240 970 400M30 400 500 850 970 400" />
                <path d="M220 335 500 240 780 335M220 582 500 850 780 582" />
                <path d="M220 335V582M500 240V850M780 335V582" />
                <path d="M30 400 500 460 970 400M30 400 500 650 970 400" />
                <path d="M360 288V716M640 288V716" />
              </svg>
              <span className="roman-entry-pencil" aria-hidden="true"><img src="/images/pencil.svg" alt="" /></span>
              <figcaption>Ide menjadi garis. Garis menjadi ruang.</figcaption>
            </figure>

            <div className="roman-entry-copy">
              <p className="roman-entry-kicker roman-entry-copy-kicker">XII DPIB 2 · KEDIRI</p>
              <h1 className="roman-login-title roman-entry-copy-title">Sebuah gagasan<br />mengubah ruang.</h1>
              <p className="roman-entry-copy-description">Ikuti jejak seorang arsitek Romawi, dari selembar sketsa hingga gerbang kelas.</p>
            </div>

            <section ref={panelRef} className={`roman-entry-final ${showGate || step !== 'story' ? 'is-visible' : ''}`} aria-live="polite">
              <img
                className="roman-entry-final-art"
                src="/images/roman-ruins-sketch.jpg"
                alt=""
                aria-hidden="true"
              />
              <img className="roman-entry-final-figure" src="/images/vitruvius-standing.jpg" alt="" aria-hidden="true" />
              <div className="roman-entry-mist" aria-hidden="true" />
              <div className="roman-entry-final-shade" aria-hidden="true" />

              {showGate && (
                <div className="roman-entry-panel" key="gate">
                  <p className="roman-entry-kicker">AD ASTRA PER ARCHITECTURAM</p>
                  <h2 className="roman-login-title">Gerbang kelas<br />telah terbuka.</h2>
                  <p className="roman-entry-panel-copy">Sketsa selesai. Bagaimana kamu ingin melanjutkan?</p>
                  <div className="roman-entry-actions">
                    <button type="button" className="roman-entry-primary" onClick={() => setStep('role')}>
                      Lanjut ke beranda <ArrowRight className="h-4 w-4" />
                    </button>
                    <button type="button" className="roman-entry-secondary" onClick={() => setStep('cancelled')}>
                      Tidak jadi
                    </button>
                  </div>
                  <p className="roman-entry-credit">
                    Visual: {IMAGE_SOURCES.map((source, index) => (
                      <React.Fragment key={source.href}>
                        {index > 0 ? ' · ' : ''}
                        <a href={source.href} target="_blank" rel="noreferrer">{source.label}</a>
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              )}

              {step === 'cancelled' && (
                <div className="roman-entry-panel">
                  <p className="roman-entry-kicker">SAMPAI JUMPA LAGI</p>
                  <h2 className="roman-login-title">Berhenti di sini.</h2>
                  <p className="roman-entry-panel-copy">Kamu belum masuk ke beranda. Gerbang ini tetap terbuka kapan pun kamu siap.</p>
                  <div className="roman-entry-actions">
                    <button className="roman-entry-primary" onClick={() => setStep('role')}>Lanjutkan</button>
                    <button className="roman-entry-secondary" onClick={replay}>Ulangi cerita</button>
                  </div>
                </div>
              )}

              {step === 'role' && (
                <div className="roman-entry-panel" key="role">
                  <button type="button" className="roman-entry-back" onClick={() => setStep('gate')}>
                    <ArrowLeft className="h-4 w-4" /> Kembali
                  </button>
                  <p className="roman-entry-kicker">PILIH JALANMU</p>
                  <h2 className="roman-login-title">Masuk sebagai</h2>
                  <div className="roman-entry-role-list">
                    <button type="button" className="roman-entry-role" onClick={() => setStep('admin')}>
                      <LockKeyhole className="h-5 w-5" />
                      <span><strong>Admin</strong><small>Kelola isi situs kelas</small></span>
                      <ArrowRight className="ml-auto h-4 w-4" />
                    </button>
                    <button type="button" className="roman-entry-role" onClick={enterHome}>
                      <Users className="h-5 w-5" />
                      <span><strong>Pengunjung</strong><small>Jelajahi situs kelas</small></span>
                      <ArrowRight className="ml-auto h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 'admin' && (
                <div className="roman-entry-panel roman-entry-admin-panel" key="admin">
                  <button type="button" className="roman-entry-back" onClick={() => setStep('role')}>
                    <ArrowLeft className="h-4 w-4" /> Pilih peran lain
                  </button>
                  <p className="roman-entry-kicker">RUANG KURATOR</p>
                  <h2 className="roman-login-title">Masuk admin</h2>
                  <p className="roman-entry-panel-copy">Gunakan password admin yang dibagikan oleh pengelola.</p>
                  <form onSubmit={handleSubmit} className="roman-entry-login-form">
                    <label htmlFor="admin-password">Password admin</label>
                    <div className="roman-entry-password-row">
                      <div className="roman-entry-password-wrap">
                        <input
                          id="admin-password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="current-password"
                          value={password}
                          onChange={(event) => {
                            setPassword(event.target.value)
                            if (error) setError('')
                          }}
                          aria-invalid={Boolean(error)}
                          aria-describedby={error ? 'login-error' : undefined}
                          placeholder="Masukkan password admin"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((visible) => !visible)}
                          aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <button type="submit" disabled={submitting} className="roman-entry-primary">
                        {submitting ? 'Memeriksa…' : 'Masuk'}
                      </button>
                    </div>
                    {error && <p id="login-error" role="alert" className="roman-entry-error">{error}</p>}
                    <p className="roman-entry-session-note">Sesi admin berakhir otomatis setelah 12 jam.</p>
                  </form>
                </div>
              )}
            </section>

            <div className={`roman-entry-scroll-hint ${journeyComplete ? 'is-hidden' : ''}`} aria-hidden="true">
              <span>Gulir perlahan untuk melanjutkan</span>
              <ArrowDown className="h-4 w-4" />
            </div>
            {step === 'story' && !journeyComplete && (
              <button type="button" className="roman-entry-skip" onClick={() => setStep('gate')}>Lewati animasi <ArrowRight size={14} /></button>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
