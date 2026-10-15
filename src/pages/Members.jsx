import React from 'react'
import Navbar from '../components/Navbar'
import ParticleField from '../ParticleField'
import ClassMembers from '../components/ClassMembers'

export default function Members() {
  return (
    <div className="relative min-h-screen cad-grid-bg text-slate-800">
      <ParticleField />
      <Navbar />

      <main className="relative z-10 pt-28 pb-20">
        <ClassMembers />
      </main>

      <footer className="border-t border-slate-300/80 py-8 px-4 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} XII DPIB 2 SMKN 1 KEDIRI • DIREKTORI ANGGOTA RESMI
      </footer>
    </div>
  )
}
