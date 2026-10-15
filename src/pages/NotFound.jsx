import React from 'react'
import { Link } from 'react-router-dom'
import { Compass, ArrowLeft, Home as HomeIcon } from 'lucide-react'
import Navbar from '../components/Navbar'
import ParticleField from '../ParticleField'

export default function NotFound() {
  return (
    <div className="relative min-h-screen cad-grid-bg text-slate-800 flex flex-col justify-between">
      <ParticleField />
      <Navbar />

      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-lg p-10 rounded-3xl neu-flat border border-white/80">
          <div className="font-mono text-xs font-bold text-[#4589C6] mb-2 tracking-widest">
            ERROR 404 // TITIK KOORDINAT TIDAK DITEMUKAN
          </div>
          <h1 className="text-7xl md:text-8xl font-black text-slate-900 tracking-tight mb-4 gradient-blue-text">
            404
          </h1>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            Halaman Di Luar Rencana Gambar Kerja
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-8">
            Elevasi atau jalur halaman yang Anda tuju belum terdaftar pada cetak biru
            portal XII DPIB 2 SMKN 1 Kediri.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 rounded-2xl btn-primary-blue text-xs font-bold flex items-center gap-2 shadow"
            >
              <HomeIcon className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>

            <Link
              to="/courses"
              className="px-6 py-3 rounded-2xl neu-button text-xs font-bold text-slate-700"
            >
              Lihat Materi
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-300/80 py-6 px-4 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} XII DPIB 2 SMKN 1 KEDIRI • NAVIGASI SISTEM
      </footer>
    </div>
  )
}
