import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Layers, Laptop, Compass, CheckCircle2, ArrowRight, Download, Clock, Users } from 'lucide-react'
import Navbar from '../components/Navbar'
import ParticleField from '../ParticleField'

const COURSES_DATA = [
  {
    id: 1,
    code: 'DPIB-01',
    title: 'Aplikasi Perangkat Lunak & BIM',
    category: 'Digital Drafting',
    description: 'Penguasaan menyeluruh software Autodesk AutoCAD 2D/3D dan Autodesk Revit Architecture untuk menghasilkan model informasi bangunan (BIM) terintegrasi.',
    software: ['AutoCAD 2024', 'Revit BIM', 'SketchUp Pro'],
    hours: '144 Jam Pelajaran',
    icon: Laptop,
    accent: '#4589C6'
  },
  {
    id: 2,
    code: 'DPIB-02',
    title: 'Perancangan Bangunan Gedung (PBG)',
    category: 'Arsitektur & Regulasi',
    description: 'Prinsip tata ruang, standar SNI gambar kerja bestek, zonasi lahan, denah, tampak, potongan, dan kelengkapan dokumen perizinan PBG.',
    software: ['AutoCAD Architecture', 'Ms. Office'],
    hours: '180 Jam Pelajaran',
    icon: Layers,
    accent: '#2563EB'
  },
  {
    id: 3,
    code: 'DPIB-03',
    title: 'Estimasi Biaya Konstruksi (RAB)',
    category: 'Manajemen Biaya',
    description: 'Perhitungan volume pekerjaan tanah, pondasi, struktur beton, rangka atap, analisa harga satuan pekerjaan (AHSP), hingga penyusunan kurva S.',
    software: ['Ms. Excel Advance', 'Ms. Project'],
    hours: '108 Jam Pelajaran',
    icon: BookOpen,
    accent: '#059669'
  },
  {
    id: 4,
    code: 'DPIB-04',
    title: 'Konstruksi & Utilitas Gedung (MEP)',
    category: 'Teknik Utilitas',
    description: 'Sistem instalasi plambing air bersih dan kotor, jaringan kelistrikan penerangan, tata udara (HVAC), proteksi kebakaran, dan sistem penangkal petir.',
    software: ['AutoCAD MEP', 'Revit MEP'],
    hours: '108 Jam Pelajaran',
    icon: Compass,
    accent: '#D97706'
  },
  {
    id: 5,
    code: 'DPIB-05',
    title: 'Desain Interior & Lanskap Arsitektur',
    category: 'Ruang & Estetika',
    description: 'Eksplorasi tata perabot ergonomis, pencahayaan alami/buatan, pemilihan material finishing ramah lingkungan, dan perencanaan taman tapak.',
    software: ['V-Ray', 'Enscape', 'Lumion'],
    hours: '144 Jam Pelajaran',
    icon: Layers,
    accent: '#0284C7'
  },
  {
    id: 6,
    code: 'DPIB-06',
    title: 'Mekanika Teknik & Elemen Struktur',
    category: 'Analisis Struktur',
    description: 'Dasar-dasar statika bangunan, beban mati dan hidup, analisis gaya batang rangka, serta penulangan beton bertulang pada sloof, kolom, dan balok.',
    software: ['Manual SNI', 'AutoCAD Structure'],
    hours: '108 Jam Pelajaran',
    icon: BookOpen,
    accent: '#7C3AED'
  }
]

export default function Courses() {
  return (
    <div className="relative min-h-screen cad-grid-bg text-slate-800">
      <ParticleField />
      <Navbar />

      <main className="relative z-10 pt-28 md:pt-36 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-flat-sm text-xs font-mono font-bold text-[#4589C6] mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>KURIKULUM KEAHLIAN TEKNIK</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Mata Pelajaran <span className="gradient-blue-text">XII DPIB 2</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Kurikulum berbasis industri konstruksi 4.0 yang membekali siswa SMKN 1 Kediri
            dengan standar keahlian gambar teknik, pemodelan digital, dan manajemen biaya.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES_DATA.map((course, idx) => {
            const Icon = course.icon
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-7 rounded-3xl neu-flat flex flex-col justify-between border border-white/80 group hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {course.code}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/80 text-[#4589C6] border border-slate-200">
                      {course.category}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl neu-button flex items-center justify-center text-[#4589C6] mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-[#2563EB]" />
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-[#4589C6] transition-colors leading-tight">
                    {course.title}
                  </h3>

                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-5">
                    {course.description}
                  </p>

                  <div className="mb-4">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block mb-1.5">
                      SOFTWARE TERKAIT
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {course.software.map((sw, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md neu-pressed text-slate-700"
                        >
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#4589C6]" />
                    <span>{course.hours}</span>
                  </div>

                  <Link
                    to={`/course/${course.id}`}
                    className="text-xs font-bold text-[#4589C6] hover:text-[#2563EB] flex items-center gap-1"
                  >
                    <span>Detail Silabus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </main>

      <footer className="border-t border-slate-300/80 py-8 px-4 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} XII DPIB 2 SMKN 1 KEDIRI • BIDANG KEAHLIAN KONSTRUKSI & PROPERTI
      </footer>
    </div>
  )
}
