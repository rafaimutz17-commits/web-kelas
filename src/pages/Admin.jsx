import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Check, ChevronDown, ImagePlus, LoaderCircle, LogOut, Plus, Save, Trash2, Users, Landmark, CalendarDays, LayoutDashboard } from 'lucide-react'
import { useSiteContent } from '../lib/siteContent'

const TABS = [
  { id: 'intro', label: 'Beranda & kelas', icon: LayoutDashboard },
  { id: 'students', label: 'Daftar siswa', icon: Users },
  { id: 'projects', label: 'Karya siswa', icon: BookOpen },
  { id: 'schedule', label: 'Jadwal', icon: CalendarDays },
]

function Field({ label, value, onChange, multiline = false, type = 'text', hint }) {
  const common = {
    value: value ?? '',
    onChange: (event) => onChange(event.target.value),
    className: 'admin-field w-full rounded-xl border border-[#b58b4c]/25 bg-[#fffaf0]/75 px-3.5 py-3 text-sm text-[#34291f] outline-none transition focus:border-[#872c2b]/55 focus:ring-2 focus:ring-[#872c2b]/10',
  }
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-[#594a39]">{label}</span>
      {multiline ? <textarea {...common} rows={3} /> : <input {...common} type={type} />}
      {hint && <span className="mt-1 block text-[11px] text-[#89785e]">{hint}</span>}
    </label>
  )
}

function ImageField({ label, value, uploadImage, onChange, setNotice }) {
  const [uploading, setUploading] = useState(false)
  async function handleFile(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setUploading(true)
    try {
      onChange(await uploadImage(file))
      setNotice({ type: 'success', message: 'Foto berhasil diunggah. Simpan perubahan untuk menerapkannya.' })
    } catch (error) {
      setNotice({ type: 'error', message: error.message })
    } finally {
      setUploading(false)
    }
  }
  return (
    <div>
      <span className="mb-1.5 block text-xs font-bold text-[#594a39]">{label}</span>
      <div className="flex flex-wrap items-center gap-3">
        {value && <img src={value} alt="" className="h-16 w-16 rounded-xl border border-[#b58b4c]/25 bg-white/50 object-cover" />}
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#b58b4c]/30 bg-white/45 px-3.5 py-2.5 text-xs font-bold text-[#6e392d] transition hover:bg-white/80">
          {uploading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          {uploading ? 'Mengunggah…' : 'Pilih foto'}
          <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" onChange={handleFile} disabled={uploading} />
        </label>
        <span className="text-[11px] text-[#89785e]">JPG, PNG, WebP, GIF · maks. 8 MB</span>
      </div>
      <Field label="atau tempel tautan foto" value={value} onChange={onChange} />
    </div>
  )
}

export default function Admin() {
  const { content, loading, connectionError, save, uploadImage } = useSiteContent()
  const [draft, setDraft] = useState(content)
  const [activeTab, setActiveTab] = useState('intro')
  const [selectedStudent, setSelectedStudent] = useState('')
  const [selectedDay, setSelectedDay] = useState('Senin')
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState(null)
  const [authenticated, setAuthenticated] = useState(null)
  const navigate = useNavigate()

  useEffect(() => setDraft(content), [content])
  useEffect(() => {
    let active = true
    fetch('/api/admin/session', { credentials: 'same-origin' })
      .then(async (response) => {
        if (!response.ok) throw new Error('Gagal memeriksa sesi admin.')
        return response.json()
      })
      .then((result) => { if (active) setAuthenticated(result.authenticated) })
      .catch((error) => { if (active) { setAuthenticated(false); setNotice({ type: 'error', message: error.message }) } })
    return () => { active = false }
  }, [])

  const selected = useMemo(
    () => draft.students.find((student) => String(student.id) === selectedStudent) || draft.students[0],
    [draft.students, selectedStudent],
  )

  function updateSection(section, key, value) {
    setDraft((current) => ({ ...current, [section]: { ...current[section], [key]: value } }))
  }

  function updateListItem(section, id, key, value) {
    setDraft((current) => ({
      ...current,
      [section]: current[section].map((item) => item.id === id ? { ...item, [key]: value } : item),
    }))
  }

  function updateStudent(key, value) {
    if (!selected) return
    const nextValue = key === 'skills' ? value.split(',').map((skill) => skill.trim()).filter(Boolean) : value
    updateListItem('students', selected.id, key, nextValue)
  }

  async function handleSave(event) {
    event.preventDefault()
    setSaving(true)
    setNotice(null)
    try {
      await save({ ...draft, classInfo: { ...draft.classInfo, totalStudents: draft.students.length } })
      setNotice({ type: 'success', message: 'Berhasil disimpan. Perubahan sudah tampil di situs pengunjung.' })
    } catch (error) {
      setNotice({ type: 'error', message: error.message })
    } finally {
      setSaving(false)
    }
  }

  async function handleLogout() {
    const response = await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' })
    if (!response.ok) {
      setNotice({ type: 'error', message: 'Tidak dapat mengakhiri sesi admin. Coba lagi.' })
      return
    }
    navigate('/login')
  }

  function addStudent() {
    const id = Math.max(0, ...draft.students.map((student) => Number(student.id) || 0)) + 1
    const student = {
      id,
      absen: String(id).padStart(2, '0'),
      name: 'Nama siswa baru',
      nickname: 'Nama panggilan',
      role: 'Anggota kelas',
      category: 'Drafter Arsitektur',
      skills: [],
      favoriteSoftware: '',
      quote: '',
      gender: '',
      avatar: '',
      project: '',
    }
    setDraft((current) => ({ ...current, students: [...current.students, student] }))
    setSelectedStudent(String(id))
  }

  function deleteStudent() {
    if (!selected || !window.confirm(`Hapus profil ${selected.name} dari daftar? Perubahan berlaku setelah disimpan.`)) return
    setDraft((current) => ({ ...current, students: current.students.filter((student) => student.id !== selected.id) }))
    setSelectedStudent('')
  }

  function addProject() {
    const id = Math.max(0, ...draft.projects.map((project) => Number(project.id) || 0)) + 1
    setDraft((current) => ({
      ...current,
      projects: [...current.projects, { id, title: 'Judul karya baru', author: '', software: '', category: 'Karya siswa', elevation: '', image: '', description: '' }],
    }))
  }

  function updateLesson(index, key, value) {
    setDraft((current) => ({
      ...current,
      schedule: {
        ...current.schedule,
        [selectedDay]: current.schedule[selectedDay].map((lesson, lessonIndex) => lessonIndex === index ? { ...lesson, [key]: value } : lesson),
      },
    }))
  }

  if (authenticated === null || loading) {
    return <main className="flex min-h-screen items-center justify-center text-[#725a3d]"><LoaderCircle className="mr-3 h-5 w-5 animate-spin" />Memeriksa akses admin…</main>
  }
  if (!authenticated) {
    return <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center"><Landmark className="mb-4 h-10 w-10 text-[#872c2b]" /><h1 className="roman-login-title text-3xl text-[#34291f]">Sesi admin diperlukan</h1><p className="mt-2 max-w-md text-sm text-[#746550]">{notice?.message || 'Masuk melalui gerbang kelas untuk membuka panel admin.'}</p><Link to="/login" className="mt-5 rounded-xl bg-[#872c2b] px-5 py-3 text-sm font-bold text-[#fff4df]">Buka halaman masuk</Link></main>
  }

  const currentTab = TABS.find((tab) => tab.id === activeTab)
  const Icon = currentTab.icon

  return (
    <main className="admin-page min-h-screen px-4 pb-16 pt-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link to="/" className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-[#745c3e] hover:text-[#872c2b]"><ArrowLeft className="h-4 w-4" /> Lihat situs</Link>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9b733b]">Panel pengelola · XII DPIB 2</p>
            <h1 className="roman-login-title mt-1 text-4xl text-[#34291f] md:text-5xl">Ruang Kurator</h1>
            <p className="mt-2 text-sm text-[#746550]">Ubah informasi situs di bawah, lalu simpan agar pengunjung melihat pembaruan.</p>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-xl border border-[#b58b4c]/30 bg-white/50 px-4 py-3 text-sm font-bold text-[#6e392d] hover:bg-white/90"><LogOut className="h-4 w-4" /> Keluar admin</button>
        </header>

        {connectionError && <div role="status" className="mb-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">Data belum tersambung: {connectionError}</div>}
        {notice && <div role="status" className={`mb-5 rounded-xl border px-4 py-3 text-sm ${notice.type === 'success' ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-red-300 bg-red-50 text-red-900'}`}>{notice.message}</div>}

        <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="admin-panel h-fit rounded-2xl p-3">
            <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a17c46]">Pilih bagian</p>
            {TABS.map(({ id, label, icon: TabIcon }) => (
              <button key={id} onClick={() => setActiveTab(id)} className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition ${activeTab === id ? 'bg-[#872c2b] text-[#fff4df] shadow-md' : 'text-[#69563c] hover:bg-white/65'}`}>
                <TabIcon className="h-4 w-4" />{label}
              </button>
            ))}
            <div className="mt-4 rounded-xl border border-[#b58b4c]/20 bg-white/30 p-3 text-xs leading-5 text-[#78674e]">
              <strong className="text-[#5f4930]">Petunjuk</strong><br />
              Isi kolom seperti formulir biasa. Foto akan tersimpan di Cloudflare R2 saat layanan dikonfigurasi.
            </div>
          </aside>

          <form onSubmit={handleSave} className="admin-panel min-w-0 rounded-2xl p-5 md:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#b58b4c]/20 pb-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#872c2b]/10 text-[#872c2b]"><Icon className="h-5 w-5" /></span>
                <div><h2 className="text-xl font-bold text-[#34291f]">{currentTab.label}</h2><p className="text-xs text-[#85745c]">Bagian ini tampil di halaman utama.</p></div>
              </div>
              <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-[#872c2b] px-5 py-3 text-sm font-bold text-[#fff4df] shadow-md transition hover:bg-[#6f2423] disabled:opacity-60">
                {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{saving ? 'Menyimpan…' : 'Simpan perubahan'}
              </button>
            </div>

            {activeTab === 'intro' && (
              <div className="space-y-8">
                <fieldset className="grid gap-4 sm:grid-cols-2"><legend className="mb-4 text-sm font-bold text-[#765b36]">Tampilan pembuka</legend>
                  <Field label="Kalimat kecil di atas judul" value={draft.home.eyebrow} onChange={(value) => updateSection('home', 'eyebrow', value)} />
                  <Field label="Baris pertama judul" value={draft.home.titleLine1} onChange={(value) => updateSection('home', 'titleLine1', value)} />
                  <Field label="Baris kedua judul" value={draft.home.titleLine2} onChange={(value) => updateSection('home', 'titleLine2', value)} />
                  <Field label="Teks tombol pembuka" value={draft.home.enterLabel} onChange={(value) => updateSection('home', 'enterLabel', value)} />
                  <div className="sm:col-span-2"><Field label="Deskripsi pembuka" value={draft.home.description} onChange={(value) => updateSection('home', 'description', value)} multiline /></div>
                  <div className="sm:col-span-2"><ImageField label="Ilustrasi Colosseum" value={draft.home.heroSceneImage} onChange={(value) => updateSection('home', 'heroSceneImage', value)} uploadImage={uploadImage} setNotice={setNotice} /></div>
                  <div className="sm:col-span-2"><ImageField label="Ilustrasi Icarus" value={draft.home.icarusImage} onChange={(value) => updateSection('home', 'icarusImage', value)} uploadImage={uploadImage} setNotice={setNotice} /></div>
                </fieldset>
                <fieldset className="grid gap-4 sm:grid-cols-2"><legend className="mb-4 text-sm font-bold text-[#765b36]">Tentang kelas</legend>
                  <Field label="Nama kelas" value={draft.classInfo.name} onChange={(value) => updateSection('classInfo', 'name', value)} />
                  <Field label="Nama sekolah" value={draft.classInfo.school} onChange={(value) => updateSection('classInfo', 'school', value)} />
                  <Field label="Program keahlian" value={draft.classInfo.major} onChange={(value) => updateSection('classInfo', 'major', value)} />
                  <Field label="Tahun ajaran" value={draft.classInfo.academicYear} onChange={(value) => updateSection('classInfo', 'academicYear', value)} />
                  <Field label="Slogan kelas" value={draft.classInfo.tagline} onChange={(value) => updateSection('classInfo', 'tagline', value)} />
                  <Field label="Alamat sekolah" value={draft.classInfo.location} onChange={(value) => updateSection('classInfo', 'location', value)} />
                  <Field label="Email kelas" value={draft.classInfo.email} onChange={(value) => updateSection('classInfo', 'email', value)} />
                  <Field label="Instagram" value={draft.classInfo.instagram} onChange={(value) => updateSection('classInfo', 'instagram', value)} />
                  <Field label="Nama wali kelas" value={draft.classInfo.homeroomTeacher.name} onChange={(value) => setDraft((current) => ({ ...current, classInfo: { ...current.classInfo, homeroomTeacher: { ...current.classInfo.homeroomTeacher, name: value } } }))} />
                  <Field label="Nomor induk wali kelas" value={draft.classInfo.homeroomTeacher.nip} onChange={(value) => setDraft((current) => ({ ...current, classInfo: { ...current.classInfo, homeroomTeacher: { ...current.classInfo.homeroomTeacher, nip: value } } }))} />
                  <Field label="Jabatan wali kelas" value={draft.classInfo.homeroomTeacher.role} onChange={(value) => setDraft((current) => ({ ...current, classInfo: { ...current.classInfo, homeroomTeacher: { ...current.classInfo.homeroomTeacher, role: value } } }))} />
                  <Field label="Mata pelajaran wali kelas" value={draft.classInfo.homeroomTeacher.subject} onChange={(value) => setDraft((current) => ({ ...current, classInfo: { ...current.classInfo, homeroomTeacher: { ...current.classInfo.homeroomTeacher, subject: value } } }))} />
                  <Field label="Kutipan wali kelas" value={draft.classInfo.homeroomTeacher.quote} onChange={(value) => setDraft((current) => ({ ...current, classInfo: { ...current.classInfo, homeroomTeacher: { ...current.classInfo.homeroomTeacher, quote: value } } }))} multiline />
                  <div className="sm:col-span-2"><ImageField label="Foto wali kelas" value={draft.classInfo.homeroomTeacher.image} onChange={(value) => setDraft((current) => ({ ...current, classInfo: { ...current.classInfo, homeroomTeacher: { ...current.classInfo.homeroomTeacher, image: value } } }))} uploadImage={uploadImage} setNotice={setNotice} /></div>
                </fieldset>
                <fieldset className="grid gap-4 sm:grid-cols-2"><legend className="mb-4 text-sm font-bold text-[#765b36]">Pesan di bagian bawah</legend>
                  <Field label="Judul ajakan" value={draft.home.ctaTitle} onChange={(value) => updateSection('home', 'ctaTitle', value)} />
                  <Field label="Deskripsi ajakan" value={draft.home.ctaDescription} onChange={(value) => updateSection('home', 'ctaDescription', value)} multiline />
                </fieldset>
                <fieldset className="space-y-3"><legend className="mb-4 text-sm font-bold text-[#765b36]">Angka ringkasan di beranda</legend>
                  {draft.stats.map((stat, index) => <div key={`${stat.label}-${index}`} className="grid gap-3 rounded-xl border border-[#b58b4c]/20 bg-white/20 p-3 sm:grid-cols-[1fr_1fr_100px]">
                    <Field label="Judul angka" value={stat.label} onChange={(value) => setDraft((current) => ({ ...current, stats: current.stats.map((item, itemIndex) => itemIndex === index ? { ...item, label: value } : item) }))} />
                    <Field label="Nilai" value={stat.value} onChange={(value) => setDraft((current) => ({ ...current, stats: current.stats.map((item, itemIndex) => itemIndex === index ? { ...item, value: value === '' ? '' : Number(value) || value } : item) }))} />
                    <Field label="Akhiran" value={stat.suffix} onChange={(value) => setDraft((current) => ({ ...current, stats: current.stats.map((item, itemIndex) => itemIndex === index ? { ...item, suffix: value } : item) }))} />
                  </div>)}
                </fieldset>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="space-y-5">
                <div className="flex flex-wrap gap-3">
                  <label className="min-w-0 flex-1"><span className="mb-1.5 block text-xs font-bold text-[#594a39]">Pilih siswa</span><span className="relative block"><select value={selectedStudent || String(selected?.id || '')} onChange={(event) => setSelectedStudent(event.target.value)} className="admin-field w-full appearance-none rounded-xl border border-[#b58b4c]/25 bg-[#fffaf0]/75 px-3.5 py-3 pr-9 text-sm text-[#34291f]">{draft.students.map((student) => <option key={student.id} value={student.id}>Absen {student.absen} · {student.name}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-[#7d684a]" /></span></label>
                  <button type="button" onClick={addStudent} className="mt-auto inline-flex items-center gap-2 rounded-xl border border-[#b58b4c]/30 px-4 py-3 text-sm font-bold text-[#6e392d] hover:bg-white/60"><Plus className="h-4 w-4" /> Tambah siswa</button>
                  <button type="button" onClick={deleteStudent} disabled={!selected} className="mt-auto inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-700 hover:bg-red-50 disabled:opacity-40"><Trash2 className="h-4 w-4" /> Hapus</button>
                </div>
                {selected && <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nomor absen" value={selected.absen} onChange={(value) => updateStudent('absen', value)} />
                  <Field label="Nama lengkap" value={selected.name} onChange={(value) => updateStudent('name', value)} />
                  <Field label="Nama panggilan" value={selected.nickname} onChange={(value) => updateStudent('nickname', value)} />
                  <Field label="Peran di kelas" value={selected.role} onChange={(value) => updateStudent('role', value)} />
                  <Field label="Bidang" value={selected.category} onChange={(value) => updateStudent('category', value)} />
                  <Field label="Keahlian (pisahkan dengan koma)" value={selected.skills.join(', ')} onChange={(value) => updateStudent('skills', value)} />
                  <Field label="Software favorit" value={selected.favoriteSoftware} onChange={(value) => updateStudent('favoriteSoftware', value)} />
                  <Field label="Proyek siswa" value={selected.project} onChange={(value) => updateStudent('project', value)} />
                  <Field label="Kutipan / motto" value={selected.quote} onChange={(value) => updateStudent('quote', value)} multiline />
                  <ImageField label="Foto profil" value={selected.avatar} onChange={(value) => updateStudent('avatar', value)} uploadImage={uploadImage} setNotice={setNotice} />
                </div>}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-5">
                <button type="button" onClick={addProject} className="inline-flex items-center gap-2 rounded-xl border border-[#b58b4c]/30 px-4 py-3 text-sm font-bold text-[#6e392d] hover:bg-white/60"><Plus className="h-4 w-4" /> Tambah karya</button>
                {draft.projects.map((project) => <fieldset key={project.id} className="grid gap-4 rounded-xl border border-[#b58b4c]/20 bg-white/20 p-4 sm:grid-cols-2">
                  <legend className="px-2 text-xs font-bold text-[#765b36]">{project.title || 'Karya siswa'}</legend>
                  <Field label="Judul karya" value={project.title} onChange={(value) => updateListItem('projects', project.id, 'title', value)} />
                  <Field label="Nama siswa / tim" value={project.author} onChange={(value) => updateListItem('projects', project.id, 'author', value)} />
                  <Field label="Kategori" value={project.category} onChange={(value) => updateListItem('projects', project.id, 'category', value)} />
                  <Field label="Perangkat lunak" value={project.software} onChange={(value) => updateListItem('projects', project.id, 'software', value)} />
                  <Field label="Keterangan elevasi" value={project.elevation} onChange={(value) => updateListItem('projects', project.id, 'elevation', value)} />
                  <Field label="Deskripsi" value={project.description} onChange={(value) => updateListItem('projects', project.id, 'description', value)} multiline />
                  <ImageField label="Foto karya" value={project.image} onChange={(value) => updateListItem('projects', project.id, 'image', value)} uploadImage={uploadImage} setNotice={setNotice} />
                  <div className="sm:col-span-2"><button type="button" onClick={() => setDraft((current) => ({ ...current, projects: current.projects.filter((item) => item.id !== project.id) }))} className="inline-flex items-center gap-2 text-xs font-bold text-red-700 hover:text-red-900"><Trash2 className="h-3.5 w-3.5" /> Hapus karya ini</button></div>
                </fieldset>)}
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-5">
                <label className="block max-w-xs"><span className="mb-1.5 block text-xs font-bold text-[#594a39]">Pilih hari</span><select value={selectedDay} onChange={(event) => setSelectedDay(event.target.value)} className="admin-field w-full rounded-xl border border-[#b58b4c]/25 bg-[#fffaf0]/75 px-3.5 py-3 text-sm text-[#34291f]">{Object.keys(draft.schedule).map((day) => <option key={day}>{day}</option>)}</select></label>
                <button type="button" onClick={() => setDraft((current) => ({ ...current, schedule: { ...current.schedule, [selectedDay]: [...current.schedule[selectedDay], { jam: '07.00 - 08.00', mapel: 'Mata pelajaran baru', guru: 'Nama guru' }] } }))} className="inline-flex items-center gap-2 rounded-xl border border-[#b58b4c]/30 px-4 py-3 text-sm font-bold text-[#6e392d] hover:bg-white/60"><Plus className="h-4 w-4" /> Tambah pelajaran</button>
                {(draft.schedule[selectedDay] || []).map((lesson, index) => <fieldset key={`${selectedDay}-${index}`} className="grid gap-4 rounded-xl border border-[#b58b4c]/20 bg-white/20 p-4 sm:grid-cols-3">
                  <Field label="Waktu" value={lesson.jam} onChange={(value) => updateLesson(index, 'jam', value)} />
                  <Field label="Mata pelajaran" value={lesson.mapel} onChange={(value) => updateLesson(index, 'mapel', value)} />
                  <div><Field label="Guru" value={lesson.guru} onChange={(value) => updateLesson(index, 'guru', value)} /><button type="button" onClick={() => setDraft((current) => ({ ...current, schedule: { ...current.schedule, [selectedDay]: current.schedule[selectedDay].filter((_, lessonIndex) => lessonIndex !== index) } }))} className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-red-700"><Trash2 className="h-3.5 w-3.5" /> Hapus pelajaran</button></div>
                </fieldset>)}
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#b58b4c]/20 pt-5">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#745c3e] hover:text-[#872c2b]"><ArrowLeft className="h-4 w-4" /> Kembali ke situs</Link>
              <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-[#872c2b] px-5 py-3 text-sm font-bold text-[#fff4df] shadow-md transition hover:bg-[#6f2423] disabled:opacity-60">{saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}{saving ? 'Menyimpan…' : 'Simpan semua perubahan'}</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
