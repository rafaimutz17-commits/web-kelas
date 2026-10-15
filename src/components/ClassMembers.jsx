import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Search, Users, Award, Compass, Laptop, Filter, X, Heart, ExternalLink, Sparkles, Crown } from 'lucide-react'
import { useSiteContent } from '../lib/siteContent'
import ekaPortrait from '../assets/eka-portrait.png'
import ekaCardBackground from '../assets/eka-card-background.jpg'

const CATEGORIES = [
  { id: 'all', label: 'Semua Anggota' },
  { id: 'Pengurus Kelas', label: 'Pengurus Kelas' },
  { id: 'Drafter Arsitektur', label: 'Drafter Arsitektur' },
  { id: 'Pemodelan 3D & BIM', label: 'BIM & 3D Visualizer' },
  { id: 'Estimator RAB', label: 'Estimator & RAB' },
  { id: 'Interior & Eksterior', label: 'Desain Interior & Lanskap' },
]

function LaurelSprig() {
  return (
    <svg viewBox="0 0 36 120" fill="none" aria-hidden="true">
      <path d="M8 114C26 82 27 43 16 8" />
      <path d="M17 94C6 94 2 87 3 78c9 1 14 6 14 16ZM22 77c-10-2-13-9-11-18 9 3 13 9 11 18ZM24 58c-9-4-11-12-7-20 8 5 11 12 7 20ZM23 39c-7-6-7-13-2-20 7 6 8 13 2 20ZM12 103c-1-10 4-16 13-18 1 9-4 15-13 18ZM17 83c0-10 6-15 15-15-1 9-7 14-15 15ZM19 62c2-9 9-13 17-10-3 8-9 12-17 10ZM17 42c4-8 11-10 18-5-4 7-11 9-18 5Z" />
    </svg>
  )
}

function StudentAvatar({ member, detail = false }) {
  const nameParts = member.name.trim().split(/\s+/).filter(Boolean)
  const initials = nameParts.length > 1
    ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
    : nameParts[0]?.slice(0, 2) || '?'
  const frameClass = detail
    ? 'w-20 h-20 rounded-2xl neu-flat-sm p-1.5 flex-shrink-0'
    : 'w-13 h-13 rounded-xl neu-flat-sm p-1 flex-shrink-0'

  return (
    <div className={`${frameClass} overflow-hidden border border-white`}>
      {member.avatar ? (
        <img
          src={member.avatar}
          alt={member.name}
          className={`w-full h-full object-cover ${detail ? 'rounded-xl' : 'rounded-lg group-hover:scale-105 transition-transform'}`}
          loading="lazy"
        />
      ) : (
        <span className={`grid h-full w-full place-items-center bg-gradient-to-br from-[#f5ead1] to-[#dfc796] font-serif font-bold text-[#755327] ${detail ? 'rounded-xl text-2xl' : 'rounded-lg text-sm'}`} aria-hidden="true">
          {initials}
        </span>
      )}
    </div>
  )
}

export default function ClassMembers({ limit }) {
  const { content } = useSiteContent()
  const { students, classInfo } = content
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMember, setSelectedMember] = useState(null)
  const [likes, setLikes] = useState({})

  // Filtered members
  const filteredMembers = useMemo(() => {
    return students.filter((member) => {
      const matchSearch =
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.nickname.toLowerCase().includes(search.toLowerCase()) ||
        member.role.toLowerCase().includes(search.toLowerCase()) ||
        member.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))

      const matchCategory =
        selectedCategory === 'all' || member.category === selectedCategory

      return matchSearch && matchCategory
    })
  }, [students, search, selectedCategory])

  const displayedMembers = limit ? filteredMembers.slice(0, limit) : filteredMembers

  const handleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#4589C6', '#2563EB', '#7D9BB9']
      })
    } catch (e) {}
  }

  return (
    <section id="anggota" className="roster-section relative py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="roster-ornament-layer" aria-hidden="true">
      </div>
      {/* Section Header */}
      <div className="roster-content text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-flat-sm text-xs font-mono font-bold text-[#4589C6] mb-4">
          <Users className="w-3.5 h-3.5" />
          <span>ROSTER RESMI SISWA & SISWI</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Daftar Anggota <span className="gradient-blue-text">XII DPIB 2</span>
        </h2>
        <p className="text-slate-600 text-base md:text-lg">
          {classInfo.totalStudents} talenta muda rancang bangun SMKN 1 Kediri yang siap berkontribusi
          dalam dunia arsitektur, teknik sipil, dan industri konstruksi modern.
        </p>
      </div>

      {/* Homeroom Teacher Spotlight Card */}
      <div className="roster-content mb-14 p-6 md:p-8 rounded-3xl neu-flat border border-white/80 max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-sky-400/10 to-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 relative z-10">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl neu-flat-sm p-1.5 overflow-hidden border border-white/90">
              <img
                src={classInfo.homeroomTeacher.image}
                alt={classInfo.homeroomTeacher.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#4589C6] text-white font-mono text-[10px] font-bold shadow">
              PEMBIMBING
            </span>
          </div>

          <div className="text-center md:text-left flex-1">
            <span className="text-xs font-mono font-bold text-[#4589C6] uppercase tracking-wider">
              {classInfo.homeroomTeacher.role}
            </span>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
              {classInfo.homeroomTeacher.name}
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              NIP. {classInfo.homeroomTeacher.nip} • Pengampu: {classInfo.homeroomTeacher.subject}
            </p>
            <p className="text-slate-600 text-sm italic mt-3 bg-white/60 p-3 rounded-xl border border-slate-100">
              "{classInfo.homeroomTeacher.quote}"
            </p>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="roster-content flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, absen, atau skill CAD..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl neu-pressed text-sm text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:border-[#4589C6]/40 transition-all font-medium"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'btn-primary-blue shadow-md'
                    : 'neu-button text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Member Cards Grid */}
      <div className="roster-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {displayedMembers.map((member, index) => {
            const isLiked = likes[member.id] || 0
            const isFeaturedMember = member.name === 'EKA ARIF BAGOS PRAYOGA'

            return (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                style={isFeaturedMember ? { '--featured-member-photo': `url(${ekaCardBackground})` } : undefined}
                className={`member-card group relative rounded-2xl p-5 neu-flat border border-white/90 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${isFeaturedMember ? 'member-card-featured' : ''}`}
              >
                {isFeaturedMember && (
                  <>
                    <div className="member-laurel member-laurel-left"><LaurelSprig /></div>
                    <div className="member-laurel member-laurel-right"><LaurelSprig /></div>
                    <span className="member-crown" aria-label="Anggota kelas pilihan">
                      <Crown className="h-4 w-4" />
                    </span>
                  </>
                )}
                <div>
                  {/* Top Bar: Absen & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md neu-pressed text-[#4589C6]">
                      #{member.absen}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-white/70 px-2 py-0.5 rounded-full border border-slate-200">
                      {member.category}
                    </span>
                  </div>

                  {/* Avatar & Identity */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <StudentAvatar member={member} />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-[#4589C6] transition-colors">
                        {member.name}
                      </h4>
                      <p className="text-xs text-[#7D9BB9] font-semibold truncate">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {member.skills.slice(0, 3).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-200/60 text-slate-700 border border-slate-300/40"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between mt-2">
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="text-xs font-bold text-[#4589C6] hover:text-[#2563EB] flex items-center gap-1 transition-colors"
                  >
                    <span>Detail Profil</span>
                    <span>→</span>
                  </button>

                  <button
                    onClick={() => handleLike(member.id)}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-500 transition-colors p-1.5 rounded-lg hover:bg-rose-50"
                    title="Kirim Semangat"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span className="font-mono text-[11px] font-bold">{isLiked || ''}</span>
                  </button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {displayedMembers.length === 0 && (
        <div className="roster-content text-center py-16 neu-flat rounded-3xl max-w-md mx-auto p-8">
          <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-slate-800">Tidak ada anggota ditemukan</h4>
          <p className="text-sm text-slate-500 mt-1">
            Coba ketik kata kunci lain atau pilih kategori "Semua Anggota".
          </p>
          <button
            onClick={() => {
              setSearch('')
              setSelectedCategory('all')
            }}
            className="mt-4 px-4 py-2 rounded-xl btn-primary-blue text-xs font-bold"
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl neu-flat-lg p-6 md:p-8 bg-[#E9EEF2] border border-white/90 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-5 right-5 p-2 rounded-full neu-button text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-start gap-4 mb-6">
                <StudentAvatar member={selectedMember} detail />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#4589C6]">
                      ABSEN #{selectedMember.absen}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-white/70 px-2 py-0.5 rounded-full border border-slate-200">
                      {selectedMember.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    {selectedMember.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#7D9BB9]">
                    {selectedMember.role} • Panggilan: "{selectedMember.nickname}"
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/80 mb-5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
                  MOTTO / PRINSIP KERJA
                </span>
                <p className="text-slate-700 text-sm italic font-medium">
                  "{selectedMember.quote}"
                </p>
              </div>

              {/* Project & Software */}
              <div className="space-y-3 mb-6">
                <div className="p-3.5 rounded-2xl neu-flat-sm">
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block mb-1">
                    STUDI KARYA / PROYEK UTAMA
                  </span>
                  <p className="text-slate-800 text-sm font-bold">
                    🏗️ {selectedMember.project}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl neu-flat-sm">
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block mb-1">
                    PERANGKAT LUNAK ANDALAN
                  </span>
                  <p className="text-slate-800 text-sm font-semibold">
                    💻 {selectedMember.favoriteSoftware}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block mb-2">
                  KOMPETENSI TEKNIS
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl text-xs font-semibold bg-white neu-flat-sm text-slate-700 border border-slate-200"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-300">
                <button
                  onClick={() => handleLike(selectedMember.id)}
                  className="px-4 py-2.5 rounded-xl neu-button text-xs font-bold text-rose-600 flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  <span>Kirim Semangat ({likes[selectedMember.id] || 0})</span>
                </button>

                <button
                  onClick={() => setSelectedMember(null)}
                  className="px-5 py-2.5 rounded-xl btn-primary-blue text-xs font-bold"
                >
                  Tutup Profil
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
