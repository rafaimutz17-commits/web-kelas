import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Compass, Award, Building, Users, CheckCircle2, ShieldCheck, Monitor, Cpu } from 'lucide-react'
import Navbar from '../components/Navbar'
import ParticleField from '../ParticleField'
import { useSiteContent } from '../lib/siteContent'

export default function About() {
  const { content } = useSiteContent()
  const officers = content.students.filter((m) => m.category === 'Pengurus Kelas')

  const FACILITIES = [
    { title: 'Studio Komputer CAD & BIM', desc: '36 unit PC Workstation dengan GPU dedicated untuk rendering real-time Lumion dan Revit.', icon: Monitor },
    { title: 'Studio Gambar Manual', desc: 'Dilengkapi meja gambar hidrolik standar arsitektur dan mesin drafting Mutoh Jepang.', icon: Compass },
    { title: 'Laboratorium Surveying & Pemetaan', desc: 'Total Station digital, Theodolite optik, dan Waterpass otomatis untuk praktikum kontur lahan.', icon: Building },
    { title: 'Unit Pembuatan Maket & 3D Print', desc: 'Mesin laser cutting akrilik presisi tinggi dan 3D printer untuk visualisasi fisik rancangan.', icon: Cpu },
  ]

  return (
    <div className="relative min-h-screen cad-grid-bg text-slate-800">
      <ParticleField />
      <Navbar />

      <main className="relative z-10 pt-28 md:pt-36 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-flat-sm text-xs font-mono font-bold text-[#4589C6] mb-4">
            <Building className="w-3.5 h-3.5" />
            <span>PROFIL JURUSAN & KELAS</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Tentang <span className="gradient-blue-text">{content.classInfo.name}</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Menempa generasi muda SMKN 1 Kediri menjadi drafter, BIM modeler, dan
            teknisi rancang bangun yang kompeten, beretika kerja tinggi, dan siap industri.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-3xl neu-flat border border-white/80 flex flex-col justify-between">
            <div>
              <span className="cad-tag mb-3 inline-block">VISI KELAS & JURUSAN</span>
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                Pusat Keunggulan Rancang Bangun & Pemodelan Digital
              </h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Mewujudkan lulusan Desain Pemodelan dan Informasi Bangunan yang unggul
                dalam kompetensi teknologi konstruksi digital (BIM), berwawasan ramah
                lingkungan (Green Architecture), dan berdaya saing di kancah nasional maupun global.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-mono font-bold text-[#4589C6]">
              <ShieldCheck className="w-4 h-4" />
              <span>TERAKREDITASI 'A' UNGGUL</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl neu-flat border border-white/80 flex flex-col justify-between">
            <div>
              <span className="cad-tag mb-3 inline-block">MISI KELAS & JURUSAN</span>
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                Pilar Pembelajaran & Integritas Kerja
              </h3>
              <ul className="space-y-3 text-slate-600 text-xs md:text-sm">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4589C6] flex-shrink-0 mt-0.5" />
                  <span>Menguasai software industri standar (AutoCAD, Revit BIM, SketchUp, Lumion).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4589C6] flex-shrink-0 mt-0.5" />
                  <span>Menanamkan budaya keselamatan kerja (K3LH) dan disiplin gambar kerja SNI.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4589C6] flex-shrink-0 mt-0.5" />
                  <span>Membangun kolaborasi tim solid dalam penyelesaian proyek arsitektur nyata.</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-mono font-bold text-[#4589C6]">
              <Award className="w-4 h-4" />
              <span>SERTIFIKASI PROFESI BNSP</span>
            </div>
          </div>
        </div>

        {/* Officers Grid */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="cad-tag mb-2 inline-block">STRUKTUR KEPENGURUSAN</span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900">
              Pengurus Inti Kelas XII DPIB 2
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {officers.map((officer) => (
              <div
                key={officer.id}
                className="p-6 rounded-2xl neu-flat border border-white/80 text-center flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-2xl neu-flat-sm p-1.5 overflow-hidden mb-4 border border-white">
                  <img
                    src={officer.avatar}
                    alt={officer.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <span className="font-mono text-xs font-bold text-[#4589C6] mb-1">
                  {officer.role}
                </span>
                <h4 className="text-sm font-black text-slate-900 mb-1">
                  {officer.name}
                </h4>
                <p className="text-xs text-slate-500 italic">
                  "{officer.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Studio Facilities */}
        <div>
          <div className="text-center mb-10">
            <span className="cad-tag mb-2 inline-block">SARANA & PRASARANA</span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900">
              Fasilitas Studio & Laboratorium
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACILITIES.map((fac, idx) => {
              const Icon = fac.icon
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl neu-flat border border-white/80"
                >
                  <div className="w-12 h-12 rounded-xl neu-button flex items-center justify-center text-[#4589C6] mb-4">
                    <Icon className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    {fac.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {fac.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-300/80 py-8 px-4 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} XII DPIB 2 SMKN 1 KEDIRI • DESAIN PEMODELAN DAN INFORMASI BANGUNAN
      </footer>
    </div>
  )
}
