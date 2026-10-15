import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Compass, Sparkles, Building2, Layers, Cpu, CheckCircle2, ArrowRight, Download, Eye, ChevronRight } from 'lucide-react'
import ParticleField from '../ParticleField'
import RomanScrollExperience from '../RomanScrollExperience'
import Navbar from '../components/Navbar'
import ClassMembers from '../components/ClassMembers'
import ClassSchedule from '../components/ClassSchedule'
import IcarusScrollStory from '../components/IcarusScrollStory'
import ScrollReveal from '../components/ScrollReveal'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { useSiteContent } from '../lib/siteContent'
// CC0 artwork from The Met: Bust of a Roman (204856) and Helmet of Boeotian Type (777855).
import romanBust from '../assets/roman-bust.png'
import romanHelmet from '../assets/roman-helmet.png'

export default function Home() {
  const { content } = useSiteContent()
  const { classInfo, stats, projects, home } = content
  // Scroll Progress Bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <div className="relative min-h-screen cad-grid-bg text-slate-800">
      {/* Top Scroll Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4589C6] via-[#2563EB] to-[#7D9BB9] z-50 origin-left"
        style={{ scaleX }}
      />

      <ParticleField />
      <Navbar />
      <RomanScrollExperience />

      <main className="relative z-10">
        {/* ========================================================
            MARQUEE ARCHITECTURAL TECH TICKER
            ======================================================== */}
        <ScrollReveal className="roman-scroll-reveal">
        <div className="py-4 overflow-hidden border-y border-slate-300/70 bg-white/40 backdrop-blur-sm my-8">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="flex gap-10 whitespace-nowrap font-mono text-xs font-bold text-slate-500 uppercase tracking-widest"
          >
            {[
              'AUTODESK AUTOCAD 2024',
              'AUTODESK REVIT BIM',
              'SKETCHUP PRO 3D',
              'LUMION 12 ARCHITECTURAL RENDER',
              'TWINMOTION REAL-TIME',
              'ESTIMASI RAB SNI 2024',
              'METODE PELAKSANAAN KONSTRUKSI',
              'DETAIL GAMBAR STRUKTUR BETON & BAJA',
              'SMKN 1 KEDIRI - BISA HEBAT',
            ].map((text, idx) => (
              <span key={idx} className="flex items-center gap-4">
                <span>{text}</span>
                <span className="text-[#4589C6]">◆</span>
              </span>
            ))}
          </motion.div>
        </div>
        </ScrollReveal>

        {/* ========================================================
            STATS COUNTERS
            ======================================================== */}
        <ScrollReveal className="roman-scroll-reveal">
        <section className="px-4 md:px-8 max-w-6xl mx-auto py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl neu-flat text-center border border-white/80"
              >
                <div className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                  <span className="gradient-blue-text">{stat.value}</span>
                  <span className="text-sm font-semibold text-slate-500 ml-1">{stat.suffix}</span>
                </div>
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-2 font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>
        </ScrollReveal>

        {/* ========================================================
            CLASS MEMBERS ROSTER (Full Interactive Section)
            ======================================================== */}
        <ScrollReveal className="roman-scroll-reveal">
          <ClassMembers />
        </ScrollReveal>

        {/* ========================================================
            FEATURED CAD & ARCHITECTURAL WORKS
            ======================================================== */}
        <ContainerScroll
          titleComponent={
            <div className="mx-auto mb-12 max-w-4xl px-4">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6b378]/40 bg-[#211a15]/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d6b378]">
                <Building2 className="h-3.5 w-3.5" />
                Galeri Karya Siswa
              </div>
              <h2 className="roman-display text-4xl leading-tight text-[#f5e6cc] md:text-6xl">
                Portofolio Proyek
                <span className="mt-2 block text-[#d6b378]">Rancang Bangun</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#f5e6cc]/70">
                Jelajahi rancangan arsitektur dan karya konstruksi siswa XII DPIB 2.
              </p>
            </div>
          }
        >
          <div className="grid h-full grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
            {projects.map((project) => (
              <Link
                key={project.id}
                to="/courses"
                className="group relative min-h-0 overflow-hidden rounded-xl bg-[#211a15] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6b378]"
                aria-label={`${project.title}, lihat semua proyek`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.15em] text-white/90 backdrop-blur-sm md:left-5 md:top-5">
                  {project.category}
                </span>
                <span className="absolute right-4 top-4 font-mono text-[10px] text-white/80 md:right-5 md:top-5">
                  {project.elevation}
                </span>
                <div className="absolute inset-x-4 bottom-4 text-left md:inset-x-5 md:bottom-6">
                  <span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-[#e4c58d] md:text-[10px]">
                    {project.software}
                  </span>
                  <h3 className="roman-display text-base leading-tight text-white md:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 hidden text-xs leading-5 text-white/75 md:block">
                    {project.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="truncate text-[8px] text-white/70 md:text-[10px]">
                      Oleh: {project.author}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#e4c58d] md:text-[9px] md:tracking-[0.16em]">
                      Lihat <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ContainerScroll>

        <IcarusScrollStory />

        {/* ========================================================
            SCHEDULE COMPONENT
            ======================================================== */}
        <ScrollReveal className="roman-scroll-reveal">
          <ClassSchedule />
        </ScrollReveal>

        {/* ========================================================
            CALL TO ACTION SECTION
            ======================================================== */}
        <ScrollReveal className="roman-scroll-reveal">
        <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
          <div className="rounded-3xl neu-flat-lg p-8 md:p-14 border border-white text-center relative overflow-hidden">
            <img className="roman-cta-artifact roman-cta-bust" src={romanBust} alt="" aria-hidden="true" loading="lazy" />
            <img className="roman-cta-artifact roman-cta-helmet" src={romanHelmet} alt="" aria-hidden="true" loading="lazy" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl btn-primary-blue flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                {home.ctaTitle}
              </h3>
              <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto mb-8 font-medium">
                {home.ctaDescription}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/about"
                  className="px-8 py-3.5 rounded-2xl btn-primary-blue text-sm font-bold shadow-lg"
                >
                  Tentang SMKN 1 Kediri
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3.5 rounded-2xl neu-button text-sm font-bold text-slate-700"
                >
                  Kirim Pesan
                </Link>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>
      </main>

      {/* ========================================================
          NEUMORPHIC FOOTER
          ======================================================== */}
      <footer className="border-t border-slate-300/80 py-12 px-4 md:px-8 bg-[#E9EEF2] relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl neu-button flex items-center justify-center text-[#4589C6]">
              <Compass className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <div className="font-black text-slate-900 text-sm">
                {classInfo.name} {classInfo.school}
              </div>
              <div className="text-xs text-slate-500 font-mono">
                {classInfo.location}
              </div>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs text-slate-500 font-medium">
              © {new Date().getFullYear()} {classInfo.name} {classInfo.school}. Rancang Bangun & Arsitektur.
            </p>
            <p className="text-[11px] font-mono text-slate-400 mt-1">
              Didesain dengan Prinsip Neumorphism & Presisi CAD
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
