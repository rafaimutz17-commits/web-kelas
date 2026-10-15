import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useSiteContent } from './lib/siteContent'

function FallingIcarus({ progress, src }) {
  const y = useTransform(progress, [0, 0.18, 0.62, 1], [0, 24, 250, 650])
  const rotate = useTransform(progress, [0, 0.2, 0.65, 1], [-5, 0, 17, 34])
  const opacity = useTransform(progress, [0, 0.08, 0.58, 0.9, 1], [0.86, 1, 0.96, 0.48, 0])

  return (
    <motion.figure
      className="roman-icarus-fall"
      style={{ y, rotate, opacity }}
      aria-label="Sketsa Icarus yang terjatuh dari langit"
    >
      <img src={src} alt="Sketsa Icarus jatuh dengan sayap yang terlepas" draggable="false" />
    </motion.figure>
  )
}

function CurtainPanel({ side, progress }) {
  const isLeft = side === 'left'
  const x = useTransform(progress, [0, 0.2, 0.55, 1], [isLeft ? '-26%' : '26%', isLeft ? '-62%' : '62%', isLeft ? '-108%' : '108%', isLeft ? '-116%' : '116%'])

  return (
    <motion.div className={`roman-curtain roman-curtain-${side}`} style={{ x }}>
      <span className="curtain-fold curtain-fold-one" />
      <span className="curtain-fold curtain-fold-two" />
      <span className="curtain-fold curtain-fold-three" />
      <span className="curtain-trim" />
    </motion.div>
  )
}

export default function RomanScrollExperience() {
  const { content } = useSiteContent()
  const { home } = content
  const sceneRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  })
  const colosseumY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const colosseumScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const colosseumOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.94, 0.72])
  const sunY = useTransform(scrollYProgress, [0, 1], [0, -38])
  const sunScale = useTransform(scrollYProgress, [0, 1], [1, 1.14])
  const copyY = useTransform(scrollYProgress, [0, 0.6, 1], [0, -45, -90])
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3], [1, 0.65, 0])

  return (
    <section
      ref={sceneRef}
      className="roman-scroll-section relative h-[190vh]"
      aria-label="Gerbang Romawi, adegan pembuka yang bergerak mengikuti guliran"
    >
      <div className="roman-scroll-stage sticky top-0 h-[100svh] min-h-[620px] overflow-hidden">
        <div className="roman-photo-scene">
          <motion.img
            src={home.heroSceneImage}
            alt=""
            fetchPriority="high"
            style={{ y: colosseumY, scale: colosseumScale, opacity: colosseumOpacity }}
          />
        </div>
        <div className="roman-sky absolute inset-0" />
        <motion.div className="roman-sun" style={{ y: sunY, scale: sunScale }} />
        <div className="roman-vignette absolute inset-0" />

        <div className="roman-curtain-frame" />
        <CurtainPanel side="left" progress={scrollYProgress} />
        <CurtainPanel side="right" progress={scrollYProgress} />
        <FallingIcarus progress={scrollYProgress} src={home.icarusImage} />

        <motion.div className="roman-scroll-copy" style={{ y: copyY }}>
          <div className="roman-eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#d2ad70]" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#e9cf9e]">{home.eyebrow}</span>
          </div>
          <h1 className="roman-display text-[clamp(2.8rem,7.8vw,7.1rem)] leading-[0.83]">
            {home.titleLine1}
            <span className="mt-2 block text-[#f0d9ac]">{home.titleLine2}</span>
          </h1>
          <p className="mt-6 max-w-sm text-xs leading-6 text-[#f0e5d2]/85 sm:text-sm sm:leading-7">
            {home.description}
          </p>
          <div className="roman-hero-actions mt-7">
            <a href="#anggota" className="roman-enter inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.19em] text-[#fff2d6] transition-colors hover:text-white">
              {home.enterLabel} <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              to="/courses"
              className="roman-portfolio-link inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#fff2d6] transition-all"
            >
              Lihat portofolio <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>

        <motion.div className="roman-scroll-hint" style={{ opacity: scrollHintOpacity }}>
          <span>Gulir untuk membuka gerbang</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
        <div className="roman-scroll-rule" aria-hidden="true">
          <motion.span style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  )
}
