import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Landmark, Menu, X, Users, BookOpen, Info, Mail, LogIn } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'
import { GlowMenu } from './ui/glow-menu'

const NAV_ITEMS = [
  { label: 'Beranda', to: '/', icon: Compass },
  { label: 'Anggota Kelas', to: '/members', icon: Users },
  { label: 'Materi & Karya', to: '/courses', icon: BookOpen },
  { label: 'Tentang Kami', to: '/about', icon: Info },
  { label: 'Hubungi Kami', to: '/contact', icon: Mail },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const onRomanHero = location.pathname === '/' && !scrolled

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none transition-all duration-300 p-3 md:p-4">
      <div className="max-w-6xl mx-auto">
        <div className="hidden md:flex justify-end items-center gap-2 pointer-events-auto">
          <GlowMenu items={NAV_ITEMS} activePath={location.pathname} />
          <RouterLink
            to="/login"
            aria-label="Masuk"
            title="Masuk"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#b58b4c]/20 bg-white/70 text-slate-600 shadow-sm backdrop-blur-lg transition hover:bg-white hover:text-[#872c2b]"
          >
            <LogIn className="h-3.5 w-3.5" />
          </RouterLink>
        </div>

        <div
          className={`md:hidden flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 border border-white/80 pointer-events-auto ${
            onRomanHero ? 'roman-nav-on-hero' : scrolled ? 'neu-flat backdrop-blur-md bg-[#E9EEF2]/90' : 'neu-flat bg-[#E9EEF2]'
          }`}
        >
          {/* Logo Mark */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl neu-button flex items-center justify-center text-[#4589C6] group-hover:scale-105 transition-transform">
              <Landmark className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 tracking-tight text-sm leading-none flex items-center gap-1.5">
                <span>XII DPIB 2</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4589C6]" />
              </div>
              <div className="text-[10px] font-mono font-bold text-[#7D9BB9] uppercase tracking-wider">
                SMKN 1 KEDIRI
              </div>
            </div>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl neu-button text-slate-700"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 p-4 rounded-2xl neu-flat bg-[#E9EEF2] border border-white/80 space-y-2 pointer-events-auto"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.to
                const Icon = item.icon

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'neu-pressed text-[#2563EB]'
                        : 'text-slate-700 hover:bg-white/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#4589C6]" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-slate-700">
                <LogIn className="h-4 w-4 text-[#872c2b]" />
                <span>Masuk / Admin</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
