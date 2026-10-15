import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Clock, Laptop, CheckCircle2, FileText, Download, UserCheck } from 'lucide-react'
import Navbar from '../components/Navbar'
import ParticleField from '../ParticleField'

const COURSES_DETAIL_DATA = {
  1: {
    title: 'Aplikasi Perangkat Lunak & BIM',
    code: 'DPIB-01',
    category: 'Digital Drafting & Modeling',
    instructor: 'Drs. Bambang Sudarsono, S.T., M.Pd.',
    hours: '144 Jam Pelajaran',
    software: ['AutoCAD 2024', 'Autodesk Revit BIM', 'SketchUp Pro', 'Enscape'],
    description: 'Mata pelajaran ini fokus pada pembentukan keterampilan digital drafter profesional. Siswa diajarkan menggambar denah berstandar industri dengan layer terstruktur, blok atribut, dimensi toleransi, hingga pemodelan BIM (Building Information Modeling) 3D yang memiliki parameter material dan kuantitas riil.',
    modules: [
      { name: 'Modul 1: Interface & Konfigurasi AutoCAD Lanjutan', desc: 'Pengaturan template .dwt, custom dimension style, dan sheet set manager.' },
      { name: 'Modul 2: Denah Bertingkat & Potongan Struktural', desc: 'Penggunaan xref, layer states, dan penggambaran detail penulangan beton.' },
      { name: 'Modul 3: Dasar Pemodelan 3D Revit Architecture', desc: 'Pembuatan grid level, wall composite, floor slab, dan custom window families.' },
      { name: 'Modul 4: Integrasi Schedule Material & Ekspor Lembar Kerja', desc: 'Perhitungan otomatis luas dinding, volume cor beton, dan pembuatan kop gambar.' }
    ]
  },
  2: {
    title: 'Perancangan Bangunan Gedung (PBG)',
    code: 'DPIB-02',
    category: 'Arsitektur & Regulasi',
    instructor: 'Ir. Hendra Gunawan, S.T.',
    hours: '180 Jam Pelajaran',
    software: ['AutoCAD Architecture', 'Ms. Office Tech'],
    description: 'Membahas regulasi persetujuan bangunan gedung (PBG), garis sempadan bangunan (GSB), koefisien dasar bangunan (KDB), koefisien lantai bangunan (KLB), serta standar kelayakan ruang huni Indonesia.',
    modules: [
      { name: 'Modul 1: Analisis Lahan & Tata Ruang Tapak', desc: 'Orientasi matahari, arah hembusan angin, dan zonasi privat/publik.' },
      { name: 'Modul 2: Gambar Kerja Arsitektur Lengkap (Bestek)', desc: 'Denah, tampak 4 sisi, potongan melintang/membujur, dan rencana plafon.' },
      { name: 'Modul 3: Detail Arsitektural Khusus', desc: 'Detail kusen pintu jendela, detail tangga putar, dan railing kaca tempered.' },
      { name: 'Modul 4: Penyusunan Dokumen Perizinan PBG', desc: 'Kelengkapan administrasi teknis dan formulir kesesuaian tata ruang daerah.' }
    ]
  },
  3: {
    title: 'Estimasi Biaya Konstruksi (RAB)',
    code: 'DPIB-03',
    category: 'Manajemen Biaya',
    instructor: 'Ibu Sri Wahyuni, S.Pd.',
    hours: '108 Jam Pelajaran',
    software: ['Ms. Excel Advance', 'Ms. Project'],
    description: 'Keahlian penting bagi seorang estimator proyek konstruksi untuk menghitung volume pekerjaan secara teliti dan akurat dari gambar kerja bestek.',
    modules: [
      { name: 'Modul 1: Perhitungan Volume Pekerjaan Persiapan & Tanah', desc: 'Pembersihan lahan, pengukuran bowplank, galian tanah pondasi, dan urugan kembali.' },
      { name: 'Modul 2: Volume Pekerjaan Struktur Beton & Besi', desc: 'Analisis pembesian bar bending schedule dan bekisting keliling balok/kolom.' },
      { name: 'Modul 3: Analisa Harga Satuan Pekerjaan (AHSP SNI)', desc: 'Koefisien upah pekerja, mandor, harga bahan material, dan overhead profit.' },
      { name: 'Modul 4: Jadwal Pelaksanaan & Kurva S', desc: 'Perencanaan bobot persentase mingguan untuk monitoring kemajuan fisik proyek.' }
    ]
  },
  4: {
    title: 'Konstruksi & Utilitas Gedung (MEP)',
    code: 'DPIB-04',
    category: 'Teknik Utilitas',
    instructor: 'Bpk. Tri Cahyono, S.T.',
    hours: '108 Jam Pelajaran',
    software: ['AutoCAD MEP', 'Revit MEP'],
    description: 'Memahami sistem urat nadi bangunan modern yang memastikan kenyamanan, sanitasi, dan keselamatan penghuni.',
    modules: [
      { name: 'Modul 1: Jaringan Air Bersih & Kotor', desc: 'Perhitungan debit air, tandon atas/bawah, pompa booster, dan septic tank biofilter.' },
      { name: 'Modul 2: Jaringan Kelistrikan & Tata Cahaya', desc: 'Titik lampu, saklar tunggal/ganda, stop kontak, panel MCB, dan beban daya.' },
      { name: 'Modul 3: Sistem Proteksi Bahaya Kebakaran & Petir', desc: 'Hydrant pilar, APAR, springkler pipa basah, dan grounding penangkal petir elektrostatis.' },
      { name: 'Modul 4: Tata Udara (HVAC) & Pembuangan Asap', desc: 'Ducting exhaust ruang toilet dan penempatan unit outdoor AC ramah lingkungan.' }
    ]
  },
  5: {
    title: 'Desain Interior & Lanskap Arsitektur',
    code: 'DPIB-05',
    category: 'Ruang & Estetika',
    instructor: 'Ibu Maya Kartika, S.Ars.',
    hours: '144 Jam Pelajaran',
    software: ['V-Ray', 'Enscape', 'Lumion', 'SketchUp'],
    description: 'Mempelajari hubungan manusia dengan ruang dalamnya serta koneksi antara bangunan dengan alam terbuka sekelilingnya.',
    modules: [
      { name: 'Modul 1: Psikologi Warna & Pemilihan Material', desc: 'Palet warna ruang, tekstur kayu, granit, marmer, dan material akustik kedap suara.' },
      { name: 'Modul 2: Rancang Desain Kitchen Set & Wardrobe', desc: 'Ergonomi ketinggian meja, laci soft-close, dan detail sambungan HPL.' },
      { name: 'Modul 3: Perancangan Taman Tapak & Hardscape', desc: 'Gazebo minimalis, kolam koi refleksi, jalur pedestrian paving, dan vegetasi peneduh.' },
      { name: 'Modul 4: Render Fotorealistik & Post Processing', desc: 'Pengaturan HDRI matahari, kamera focal length, depth of field, dan color grading.' }
    ]
  },
  6: {
    title: 'Mekanika Teknik & Elemen Struktur',
    code: 'DPIB-06',
    category: 'Analisis Struktur',
    instructor: 'Bpk. Ahmad Fauzi, S.T.',
    hours: '108 Jam Pelajaran',
    software: ['AutoCAD Structure', 'Manual SNI Statika'],
    description: 'Menganalisis keseimbangan gaya-gaya yang bekerja pada bangunan agar bangunan berdiri kokoh, aman dari gempa, dan efisien dalam penggunaan material.',
    modules: [
      { name: 'Modul 1: Gaya Statis Tertentu & Reaksi Tumpuan', desc: 'Tumpuan sendi, rol, jepit, serta garis pengaruh momen lentur dan lintang.' },
      { name: 'Modul 2: Rangka Batang (Truss) Kuda-kuda', desc: 'Metode titik simpul (Ritter/Cremona) untuk menentukan gaya tarik dan tekan batang.' },
      { name: 'Modul 3: Penulangan Komponen Struktur Beton Bertulang', desc: 'Tulangan pokok dan begel sengkang pada kolom pedestal dan balok induk.' },
      { name: 'Modul 4: Struktur Pondasi & Karakteristik Tanah', desc: 'Daya dukung tanah, kedalaman pondasi batu kali, dan pondasi telapak cakar ayam.' }
    ]
  }
}

export default function CourseDetail() {
  const { id } = useParams()
  const course = COURSES_DETAIL_DATA[id] || COURSES_DETAIL_DATA[1]

  return (
    <div className="relative min-h-screen cad-grid-bg text-slate-800">
      <ParticleField />
      <Navbar />

      <main className="relative z-10 pt-28 md:pt-36 pb-24 px-4 md:px-8 max-w-5xl mx-auto">
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#4589C6] hover:text-[#2563EB] mb-8 neu-button px-4 py-2 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Semua Mata Pelajaran</span>
        </Link>

        {/* Header Card */}
        <div className="p-8 md:p-10 rounded-3xl neu-flat border border-white/80 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold px-3 py-1 rounded-full neu-pressed text-[#4589C6]">
              {course.code}
            </span>
            <span className="text-xs font-bold text-slate-500 bg-white/70 px-3 py-1 rounded-full border border-slate-200">
              {course.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            {course.title}
          </h1>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8 font-medium">
            {course.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
            <div className="p-4 rounded-2xl neu-flat-sm">
              <span className="text-[10px] font-mono text-slate-400 font-bold block mb-1">
                GURU PENGAMPU
              </span>
              <p className="text-sm font-bold text-slate-800">{course.instructor}</p>
            </div>

            <div className="p-4 rounded-2xl neu-flat-sm">
              <span className="text-[10px] font-mono text-slate-400 font-bold block mb-1">
                ALOKASI WAKTU
              </span>
              <p className="text-sm font-bold text-slate-800">{course.hours}</p>
            </div>

            <div className="p-4 rounded-2xl neu-flat-sm sm:col-span-2 md:col-span-1">
              <span className="text-[10px] font-mono text-slate-400 font-bold block mb-1">
                PERANGKAT LUNAK
              </span>
              <p className="text-xs font-mono font-bold text-[#4589C6]">
                {course.software.join(' • ')}
              </p>
            </div>
          </div>
        </div>

        {/* Modules Roadmap */}
        <div className="p-8 md:p-10 rounded-3xl neu-flat border border-white/80">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#4589C6]" />
            <span>Silabus & Modul Pembelajaran</span>
          </h2>

          <div className="space-y-4">
            {course.modules.map((mod, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/70 border border-slate-200/80 flex items-start gap-4 hover:bg-white transition-colors"
              >
                <div className="w-8 h-8 rounded-xl neu-pressed flex items-center justify-center font-mono font-bold text-xs text-[#4589C6] flex-shrink-0 mt-0.5">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    {mod.name}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-300/80 py-8 px-4 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} XII DPIB 2 SMKN 1 KEDIRI • MODUL SILABUS RESMI
      </footer>
    </div>
  )
}
