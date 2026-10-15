import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_SITE_CONTENT } from '../data/siteContent'

const SiteContentContext = createContext(null)

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_SITE_CONTENT)
  const [loading, setLoading] = useState(true)
  const [connectionError, setConnectionError] = useState('')

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/content')
      if (!response.ok) throw new Error(`Gagal memuat data situs (${response.status}).`)
      const data = await response.json()
      setContent(data.content || DEFAULT_SITE_CONTENT)
      setConnectionError('')
    } catch (error) {
      setConnectionError(error instanceof Error ? error.message : 'Koneksi layanan situs gagal.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const save = useCallback(async (nextContent) => {
    const response = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(nextContent),
    })
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}))
      throw new Error(payload.error || `Gagal menyimpan perubahan (${response.status}).`)
    }
    setContent(nextContent)
    setConnectionError('')
  }, [])

  const uploadImage = useCallback(async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch('/api/upload', {
      method: 'POST',
      credentials: 'same-origin',
      body: formData,
    })
    const payload = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(payload.error || `Gagal mengunggah gambar (${response.status}).`)
    return payload.url
  }, [])

  const value = useMemo(() => ({
    content,
    loading,
    connectionError,
    refresh,
    save,
    uploadImage,
  }), [content, loading, connectionError, refresh, save, uploadImage])

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}

export function useSiteContent() {
  const value = useContext(SiteContentContext)
  if (!value) throw new Error('useSiteContent harus digunakan di dalam SiteContentProvider.')
  return value
}
