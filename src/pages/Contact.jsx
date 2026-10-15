import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Mail, MapPin, Phone, Send, CheckCircle2, Clock } from 'lucide-react'
import Navbar from '../components/Navbar'
import ParticleField from '../ParticleField'
import { useSiteContent } from '../lib/siteContent'

export default function Contact() {
  const { content } = useSiteContent()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4589C6', '#2563EB', '#7D9BB9']
        })
      } catch (e) {}
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1200)
  }

  return (
    <div className="relative min-h-screen cad-grid-bg text-slate-800">
      <ParticleField />
      <Navbar />

      <main className="relative z-10 pt-28 md:pt-36 pb-24 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-flat-sm text-xs font-mono font-bold text-[#4589C6] mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>SALURAN KOMUNIKASI RESMI</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Hubungi <span className="gradient-blue-text">Kelas Kami</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Terbuka untuk diskusi proyek arsitektur sekolah, kolaborasi karya,
            kunjungan industri, atau sekadar bertukar sapa dengan XII DPIB 2.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-7 rounded-3xl neu-flat border border-white/80">
              <h3 className="text-xl font-black text-slate-900 mb-6">
                Informasi Kontak
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl neu-button flex items-center justify-center text-[#4589C6] flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                      LOKASI KAMPUS
                    </span>
                    <p className="text-xs md:text-sm font-semibold text-slate-800">
                      {content.classInfo.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl neu-button flex items-center justify-center text-[#4589C6] flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                      SURAT ELEKTRONIK
                    </span>
                    <p className="text-xs md:text-sm font-semibold text-slate-800">
                      {content.classInfo.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl neu-button flex items-center justify-center text-[#4589C6] flex-shrink-0">
                    <Instagram className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                      MEDIA SOSIAL KELAS
                    </span>
                    <p className="text-xs md:text-sm font-semibold text-slate-800">
                      {content.classInfo.instagram}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl neu-button flex items-center justify-center text-[#4589C6] flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                      JAM PRAKTIK STUDIO
                    </span>
                    <p className="text-xs md:text-sm font-semibold text-slate-800">
                      Senin - Jumat: 07.00 - 15.30 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* School Credential Card */}
            <div className="p-6 rounded-3xl neu-flat border border-white/80">
              <span className="text-[10px] font-mono font-bold text-[#4589C6] uppercase block mb-1">
                SEKOLAH INDUK
              </span>
              <h4 className="text-base font-black text-slate-900 mb-1">
                SMK Negeri 1 Kediri
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sekolah Menengah Kejuruan Pusat Keunggulan dengan jurusan teknik
                konstruksi bangunan terkemuka di wilayah Karesidenan Kediri.
              </p>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-3xl neu-flat border border-white/80">
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Kirimkan Pesan
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Isi formulir di bawah ini dan kami akan membalas sesegera mungkin.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 font-mono">
                      NAMA LENGKAP *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Masukkan nama Anda"
                      className="w-full px-4 py-3 rounded-2xl neu-pressed text-sm text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:border-[#4589C6]/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 font-mono">
                      EMAIL AKTIF *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="contoh@gmail.com"
                      className="w-full px-4 py-3 rounded-2xl neu-pressed text-sm text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:border-[#4589C6]/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 font-mono">
                    SUBJEK PESAN
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Contoh: Diskusi Portofolio Gambar Kerja"
                    className="w-full px-4 py-3 rounded-2xl neu-pressed text-sm text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:border-[#4589C6]/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 font-mono">
                    PESAN LENGKAP *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                    className="w-full px-4 py-3 rounded-2xl neu-pressed text-sm text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:border-[#4589C6]/50 transition-all resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-2xl btn-primary-blue text-sm font-bold flex items-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pesan Sekarang'}</span>
                  </button>

                  <AnimatePresence>
                    {isSuccess && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-emerald-600 font-bold text-xs"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Pesan Berhasil Terkirim!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-300/80 py-8 px-4 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} XII DPIB 2 SMKN 1 KEDIRI • LAYANAN INFORMASI DIGITAL
      </footer>
    </div>
  )
}
