import React, { useLayoutEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, Eye, EyeOff, Landmark, LockKeyhole, Users } from 'lucide-react'

const IMAGE_SOURCES = [
  {
    href: 'https://commons.wikimedia.org/wiki/File:Marcus_Vitruvius_Roman._portrait.jpg',
    label: 'Vitruvius',
  },
  {
    href: 'https://commons.wikimedia.org/wiki/File:Drawing,_Roman_Ruins_with_Figures,_ca._1745_(CH_18357879).jpg',
    label: 'Sketsa reruntuhan',
  },
  {
    href: 'https://commons.wikimedia.org/wiki/File:Roman_Procession_MET_DP811261.jpg',
    label: 'Prosesi Romawi · CC0',
  },
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

  useLayoutEffect(() => {
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
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ])
        if (cancelled) return

        gsap.registerPlugin(ScrollTrigger)
        context = gsap.context(() => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top top',
              end: '+=3200',
              scrub: 1.25,
              pin: stageRef.current,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: ({ progress }) => {
                  if (progress >= 0.985) setJourneyComplete(true)
                if (progress < 0.94) setJourneyComplete(false)
              },
            },
          })

          timeline
            .fromTo('.roman-entry-backdrop', {
              scale: 1.04,
              xPercent: 0,
              yPercent: 0,
            }, {
              scale: 1.16,
              xPercent: -3,
              yPercent: 2,
              duration: 0.9,
              ease: 'none',
            }, 0)
            .fromTo('.roman-entry-portrait', {
              autoAlpha: 1,
              x: -24,
              y: 18,
              scale: 0.96,
            }, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.16,
              ease: 'power2.out',
            }, 0)
            .fromTo('.roman-entry-copy-kicker', {
              autoAlpha: 0.72,
              y: 8,
            }, {
              autoAlpha: 1,
              y: 0,
              duration: 0.1,
              ease: 'power2.out',
            }, 0.05)
            .fromTo('.roman-entry-copy-title', {
              autoAlpha: 0.94,
              y: 10,
              filter: 'blur(0px)',
            }, {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.18,
              ease: 'power3.out',
            }, 0.09)
            .fromTo('.roman-entry-copy-description', {
              autoAlpha: 0.9,
              y: 8,
            }, {
              autoAlpha: 1,
              y: 0,
              duration: 0.13,
              ease: 'power2.out',
            }, 0.16)
            .fromTo('.roman-entry-paper', {
              autoAlpha: 1,
              x: 45,
              y: 12,
              rotate: 1.5,
              scale: 0.97,
            }, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              duration: 0.2,
              ease: 'power3.out',
            }, 0.19)
            .fromTo('.roman-entry-paper img', {
              clipPath: 'inset(0 53% 0 0)',
            }, {
              clipPath: 'inset(0 0% 0 0)',
              duration: 0.25,
              ease: 'none',
            }, 0.26)
            .fromTo('.roman-entry-paper figcaption', {
              autoAlpha: 0,
              y: 12,
            }, {
              autoAlpha: 1,
              y: 0,
              duration: 0.1,
              ease: 'power2.out',
            }, 0.48)
            .fromTo('.roman-entry-perspective path', {
              strokeDashoffset: (index, element) => element.getTotalLength(),
              autoAlpha: 0,
            }, {
              strokeDashoffset: 0,
              autoAlpha: 0.72,
              duration: 0.07,
              stagger: 0.035,
              ease: 'power1.out',
            }, 0.47)
            .to('.roman-entry-pencil-light', {
              autoAlpha: 0.9,
              left: '100%',
              duration: 0.25,
              ease: 'none',
            }, 0.26)
            .to('.roman-entry-camera', {
              scale: 1.12,
              x: '-1.5vw',
              y: '1vh',
              duration: 0.2,
              ease: 'power2.inOut',
            }, 0.42)
            .to('.roman-entry-camera', {
              scale: 2.2,
              x: '-9vw',
              y: '-1vh',
              duration: 0.15,
              ease: 'power3.in',
            }, 0.62)
            .to('.roman-entry-portrait', {
              scale: 2.2,
              x: '-11vw',
              filter: 'blur(10px)',
              autoAlpha: 0,
              duration: 0.12,
              ease: 'power3.in',
            }, 0.65)
            .to('.roman-entry-paper', {
              scale: 2.5,
              x: '-9vw',
              y: '3vh',
              rotate: -1.2,
              duration: 0.19,
              ease: 'power2.in',
            }, 0.59)
            .to('.roman-entry-perspective path', {
              autoAlpha: 0,
              duration: 0.08,
              stagger: 0.01,
              ease: 'power1.in',
            }, 0.7)
            .to('.roman-entry-camera', {
              scale: 1.12,
              x: '4vw',
              y: '-1vh',
              rotate: 6,
              filter: 'blur(5px)',
              duration: 0.1,
              ease: 'power3.in',
            }, 0.76)
            .to('.roman-entry-final', {
              autoAlpha: 1,
              duration: 0.14,
              ease: 'power1.out',
            }, 0.79)
            .to('.roman-entry-mist', {
              autoAlpha: 1,
              yPercent: -5,
              duration: 0.18,
              ease: 'power2.out',
            }, 0.8)
            .fromTo('.roman-entry-final-art', {
              xPercent: 3,
              scale: 1.04,
            }, {
              xPercent: -2,
              scale: 1,
              duration: 0.22,
              ease: 'power1.out',
            }, 0.78)
            .to('.roman-entry-camera', {
              scale: 1,
              x: 0,
              y: 0,
              rotate: 0,
              filter: 'blur(0px)',
              duration: 0.17,
              ease: 'power3.out',
            }, 0.81)
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
  }, [prefersReducedMotion])

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
    <main className={`roman-entry-page ${staticStory ? 'is-static' : ''}`}>
      <section ref={storyRef} className="roman-entry-scroll" aria-label="Kisah pembuka arsitek Romawi">
        <div ref={stageRef} className="roman-entry-stage">
          <div className="roman-entry-camera">
            <div className="roman-entry-backdrop" aria-hidden="true" />

            <figure className="roman-entry-portrait">
              <img
                src="/images/vitruvius-portrait.jpg"
                alt="Ilustrasi Marcus Vitruvius Roman, arsitek dan insinyur Romawi"
                fetchPriority="high"
              />
              <figcaption>Marcus Vitruvius · architectus</figcaption>
            </figure>

            <figure className="roman-entry-paper">
              <img
                src="/images/roman-ruins-sketch.jpg"
                alt="Gambar perspektif reruntuhan dan lengkung arsitektur Romawi"
              />
              <svg className="roman-entry-perspective" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
                <path d="M72 530 492 414 930 526" />
                <path d="M492 414 492 138M492 414 492 875" />
                <path d="m72 530 0 235 420 110M930 526v240L492 875" />
                <path d="M180 500v276m626-270v270M300 467v348m410-345v344" />
                <path d="m492 414 0 461" />
              </svg>
              <span className="roman-entry-pencil-light" aria-hidden="true" />
              <figcaption>Ide menjadi garis. Garis menjadi ruang.</figcaption>
            </figure>

            <div className="roman-entry-copy">
              <p className="roman-entry-kicker roman-entry-copy-kicker">XII DPIB 2 · KEDIRI</p>
              <h1 className="roman-login-title roman-entry-copy-title">Sebuah gagasan<br />mengubah ruang.</h1>
              <p className="roman-entry-copy-description">Ikuti jejak seorang arsitek Romawi, dari selembar sketsa hingga gerbang kelas.</p>
            </div>

            <section className={`roman-entry-final ${showGate || step !== 'story' ? 'is-visible' : ''}`} aria-live="polite">
              <img
                className="roman-entry-final-art"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Roman_Procession_MET_DP811261.jpg/1280px-Roman_Procession_MET_DP811261.jpg"
                alt=""
                aria-hidden="true"
              />
              <div className="roman-entry-mist" aria-hidden="true" />
              <div className="roman-entry-final-shade" aria-hidden="true" />

              {showGate && (
                <div className="roman-entry-panel" key="gate">
                  <p className="roman-entry-kicker">AD ASTRA PER ARCHITECTURAM</p>
                  <h2 className="roman-login-title">Gerbang kelas<br />telah terbuka.</h2>
                  <p className="roman-entry-panel-copy">Sketsa selesai. Bagaimana kamu ingin melanjutkan?</p>
                  <div className="roman-entry-actions">
                    <button type="button" className="roman-entry-primary" onClick={() => setStep('role')}>
                      Lanjutkan <ArrowRight className="h-4 w-4" />
                    </button>
                    <button type="button" className="roman-entry-secondary" onClick={() => navigate('/')}>
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
                    <button type="button" className="roman-entry-role" onClick={() => navigate('/')}>
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
            <Link to="/" className="roman-entry-exit" aria-label="Kembali ke beranda">
              <Landmark className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
