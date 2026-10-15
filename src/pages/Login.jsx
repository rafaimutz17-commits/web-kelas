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
  const timelineRef = useRef(null)

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
        setStaticStory(false)
        context = gsap.context(() => {
          const stage = stageRef.current
          const portrait = stage.querySelector('.roman-entry-portrait')
          const paper = stage.querySelector('.roman-entry-paper')
          // Measure the untransformed layout, so focal points survive resize.
          const focus = (element, fill = false) => {
            const scale = fill
              ? Math.max(stage.clientWidth / element.offsetWidth, stage.clientHeight / element.offsetHeight) * 1.12
              : Math.min(1.7, stage.clientHeight * 0.84 / element.offsetHeight)
            return {
              scale,
              x: (stage.clientWidth / 2 - element.offsetLeft - element.offsetWidth / 2) * scale,
              y: (stage.clientHeight / 2 - element.offsetTop - element.offsetHeight / 2) * scale,
            }
          }
          gsap.set('.roman-entry-perspective path', {
            strokeDasharray: (_, path) => path.getTotalLength(),
            strokeDashoffset: (_, path) => path.getTotalLength(),
          })
          gsap.set('.roman-entry-camera', { transformOrigin: '50% 50%' })
          gsap.set([portrait, paper], { transformOrigin: '50% 50%' })

          const timeline = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            onUpdate: () => setJourneyComplete(timeline.progress() >= 0.94),
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top top',
              end: () => `+=${Math.max(2200, stage.clientHeight * 4.2)}`,
              scrub: 0.65,
              pin: stage,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          timelineRef.current = timeline

          // Establish → approach → travel into the drawing → reveal the gate.
          // Each shot holds before moving; the next scene is already underneath.
          timeline
            .fromTo('.roman-entry-copy > *', { y: 18, autoAlpha: 0 }, {
              y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out',
            }, 0)
            .to('.roman-entry-copy', { y: -35, autoAlpha: 0, duration: 0.5 }, 1.1)
            .to('.roman-entry-scroll-hint', { autoAlpha: 0, duration: 0.3 }, 1.1)
            .to('.roman-entry-camera', {
              scale: () => focus(portrait).scale,
              x: () => focus(portrait).x,
              y: () => focus(portrait).y,
              duration: 1.2,
            }, 1.15)
            .to('.roman-entry-backdrop', { scale: 1.1, duration: 2.4, ease: 'none' }, 1.15)
            .to('.roman-entry-camera', {
              scale: () => focus(paper).scale,
              x: () => focus(paper).x,
              y: () => focus(paper).y,
              duration: 1.35, ease: 'power3.inOut',
            }, 2.8)
            .to(portrait, { autoAlpha: 0, duration: 0.65 }, 3)
            .to('.roman-entry-paper img', {
              clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'none',
            }, 3.1)
            .to('.roman-entry-perspective path', {
              strokeDashoffset: 0, autoAlpha: 0.72, stagger: 0.14,
              duration: 0.65, ease: 'none',
            }, 3.6)
            .to('.roman-entry-camera', {
              scale: () => focus(paper, true).scale,
              x: () => focus(paper, true).x,
              y: () => focus(paper, true).y,
              duration: 1.6, ease: 'power3.inOut',
            }, 5.1)
            .to('.roman-entry-paper figcaption', { autoAlpha: 0, duration: 0.3 }, 5.1)
            .to('.roman-entry-perspective', { autoAlpha: 0, duration: 0.4 }, 5.9)
            .fromTo('.roman-entry-final', {
              autoAlpha: 1, clipPath: 'inset(50% 50% 50% 50%)',
            }, {
              clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power3.inOut',
            }, 6.25)
            .fromTo('.roman-entry-final-art', { scale: 1.2, xPercent: 4 }, {
              scale: 1, xPercent: 0, duration: 1.65, ease: 'power2.out',
            }, 6.25)
            .to('.roman-entry-camera', { autoAlpha: 0, duration: 0.2 }, 7.4)
            .to({}, { duration: 0.65 })
        }, storyRef)

      } catch (animationError) {
        if (!cancelled) {
          context?.revert()
          timelineRef.current = null
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
      timelineRef.current = null
    }
  }, [prefersReducedMotion])

  function skipStory() {
    const timeline = timelineRef.current
    if (timeline?.scrollTrigger) {
      timeline.scrollTrigger.scroll(timeline.scrollTrigger.end)
      timeline.progress(1)
    }
    setJourneyComplete(true)
    setStep('gate')
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

          </div>

            <section data-interactive={step !== 'story' || staticStory} className={`roman-entry-final ${showGate || step !== 'story' ? 'is-visible' : ''}`} aria-live="polite">
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
            {step === 'story' && !journeyComplete && (
              <button type="button" className="roman-entry-skip" onClick={skipStory}>
                Lewati animasi <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
            <Link to="/" className="roman-entry-exit" aria-label="Kembali ke beranda">
              <Landmark className="h-4 w-4" />
            </Link>
        </div>
      </section>
    </main>
  )
}
