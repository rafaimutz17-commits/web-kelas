import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Sun } from 'lucide-react'

const ICARUS_ARTWORK = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Herbert_Draper_-_The_Lament_for_Icarus_-_Google_Art_Project.jpg/1280px-Herbert_Draper_-_The_Lament_for_Icarus_-_Google_Art_Project.jpg'
const ICARUS_ARTWORK_SOURCE = 'https://commons.wikimedia.org/wiki/File:Herbert_Draper_-_The_Lament_for_Icarus_-_Google_Art_Project.jpg'

function IcarusArtwork({ progress }) {
  const fall = useTransform(progress, [0, 0.28, 0.68, 1], [0, 0, 270, 520])
  const fade = useTransform(progress, [0, 0.58, 0.9, 1], [1, 1, 0.72, 0])
  const tilt = useTransform(progress, [0, 0.32, 0.68, 1], [0, 0, 13, 28])

  return (
    <motion.figure
      className="icarus-figure"
      style={{ y: fall, opacity: fade, rotate: tilt }}
    >
      <img
        src={ICARUS_ARTWORK}
        alt="The Lament for Icarus, lukisan karya Herbert Draper"
        draggable="false"
      />
      <figcaption>
        <a href={ICARUS_ARTWORK_SOURCE} target="_blank" rel="noreferrer">
          The Lament for Icarus · Herbert Draper
        </a>
      </figcaption>
    </motion.figure>
  )
}

const WAX_FLAKES = [
  { left: '24%', top: '28%', endX: -80, endY: 280, rotate: -36 },
  { left: '39%', top: '18%', endX: 40, endY: 345, rotate: 44 },
  { left: '58%', top: '32%', endX: 98, endY: 300, rotate: 75 },
  { left: '72%', top: '20%', endX: 145, endY: 400, rotate: 18 },
  { left: '45%', top: '10%', endX: -35, endY: 225, rotate: -64 },
  { left: '66%', top: '42%', endX: 130, endY: 190, rotate: 55 },
]

function WaxFlake({ flake, progress }) {
  const x = useTransform(progress, [0, 0.42, 1], [0, 0, flake.endX])
  const y = useTransform(progress, [0, 0.42, 1], [0, 0, flake.endY])
  const rotate = useTransform(progress, [0, 0.42, 1], [0, 0, flake.rotate])
  const opacity = useTransform(progress, [0, 0.3, 0.56, 1], [0, 0, 0.9, 0.2])

  return (
    <motion.span
      className="icarus-wax-flake"
      style={{ left: flake.left, top: flake.top, x, y, rotate, opacity }}
      aria-hidden="true"
    />
  )
}

function MeltedWax({ progress }) {
  return WAX_FLAKES.map((flake, index) => (
    <WaxFlake key={index} flake={flake} progress={progress} />
  ))
}

export default function IcarusScrollStory() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const sunScale = useTransform(scrollYProgress, [0, 0.6, 1], [0.84, 1.2, 1.35])
  const sunGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.85, 1])
  const captionY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -35, -85])

  return (
    <section ref={sectionRef} className="icarus-scroll-section relative h-[175vh]" aria-label="Kisah Icarus mengikuti guliran">
      <div className="icarus-scroll-stage sticky top-0 flex h-[100svh] min-h-[620px] items-center overflow-hidden">
        <div className="icarus-sky absolute inset-0" />
        <motion.div className="icarus-sun" style={{ scale: sunScale, opacity: sunGlow }}>
          <Sun className="h-full w-full" strokeWidth={0.5} />
        </motion.div>
        <div className="icarus-constellation" aria-hidden="true" />
        <IcarusArtwork progress={scrollYProgress} />
        <MeltedWax progress={scrollYProgress} />

        <motion.div className="icarus-copy" style={{ y: captionY }}>
          <span className="icarus-eyebrow">Mythos · No. II</span>
          <h2 className="icarus-title">Icarus</h2>
          <p className="icarus-latin">Alis volat propriis</p>
          <p className="icarus-description">
            Ia merentangkan sayap menuju matahari. Keberanian membawanya tinggi; kebijaksanaan menjaganya tetap utuh.
          </p>
          <div className="icarus-scroll-cue">
            <span>Gulir untuk melihat kisahnya</span>
            <ArrowDown className="h-4 w-4" />
          </div>
        </motion.div>
        <div className="icarus-index">II <span>/</span> MYTHOS</div>
      </div>
    </section>
  )
}
