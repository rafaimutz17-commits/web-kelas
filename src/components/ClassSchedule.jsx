import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, BookOpen, UserCheck } from 'lucide-react'
import { useSiteContent } from '../lib/siteContent'

export default function ClassSchedule() {
  const [activeDay, setActiveDay] = useState('Senin')
  const { content } = useSiteContent()
  const days = Object.keys(content.schedule)
  const selectedDay = days.includes(activeDay) ? activeDay : days[0]
  const currentSchedule = content.schedule[selectedDay] || []

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-flat-sm text-xs font-mono font-bold text-[#4589C6] mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>JADWAL PELAJARAN XII DPIB 2</span>
        </div>
        <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
          Agenda Akademik & <span className="gradient-blue-text">Praktik Studio</span>
        </h3>
      </div>

      {/* Day Tabs */}
      <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {days.map((day) => {
          const isActive = selectedDay === day
          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
                isActive
                  ? 'btn-primary-blue shadow-lg scale-105'
                  : 'neu-button text-slate-600 hover:text-slate-900'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Schedule Timeline Cards */}
      <div className="space-y-4">
        {currentSchedule.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="p-5 md:p-6 rounded-2xl neu-flat flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/80 hover:translate-x-1 transition-transform"
          >
            <div className="flex items-start md:items-center gap-4">
              <div className="w-12 h-12 rounded-xl neu-pressed flex items-center justify-center text-[#4589C6] flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-[#4589C6]">
                  {item.jam}
                </span>
                <h4 className="text-base md:text-lg font-black text-slate-900 mt-0.5">
                  {item.mapel}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto px-4 py-2 rounded-xl bg-white/70 border border-slate-200">
              <UserCheck className="w-4 h-4 text-[#7D9BB9]" />
              <span className="text-xs font-semibold text-slate-700">
                {item.guru}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
