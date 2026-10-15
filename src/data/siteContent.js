import { CLASS_INFO, CLASS_MEMBERS, CLASS_STATS, SCHEDULE_DATA } from './classData'
import colosseumIllustration from '../assets/colosseum-illustration.png'
import icarusFall from '../assets/icarus-fall.png'

export const FEATURED_PROJECTS = [
  {
    id: 1,
    title: 'Desain Rumah Tropis 2 Lantai',
    author: 'Achmad Farhan & Tim Arsitektur',
    software: 'AutoCAD & Revit BIM',
    category: 'Arsitektur Residensial',
    elevation: '+7.50 m',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    description: 'Rancangan hunian ramah energi dengan bukaan optimal, fasad secondary skin, dan detail struktur bertulang tahan gempa.',
  },
  {
    id: 2,
    title: 'Gedung Olahraga Bentang Lebar',
    author: 'Kevin Jonathan & Tim Struktur',
    software: 'AutoCAD Structure & Tekla',
    category: 'Struktur Baja WF',
    elevation: '+12.00 m',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80',
    description: 'Analisis dan gambar kerja kuda-kuda rangka baja pipa ruang untuk fasilitas serbaguna sekolah berkapasitas 1.500 penonton.',
  },
  {
    id: 3,
    title: 'Visualisasi Interior Kafe Industrial',
    author: 'Anggita Citra & Bintang Alamsyah',
    software: 'SketchUp, V-Ray & Lumion',
    category: 'Desain Interior',
    elevation: '+3.80 m',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
    description: 'Konsep ruang komersial kontemporer dengan perpaduan bata ekspos, lighting warm ambient, dan tata furnitur ergonomis.',
  },
]

export const DEFAULT_SITE_CONTENT = {
  home: {
    eyebrow: 'Ad astra per architecturam',
    titleLine1: 'Ars',
    titleLine2: 'Aedificandi.',
    description: 'Setiap peradaban besar dimulai dari sebuah rancangan. Selamat datang di dunia XII DPIB 2.',
    enterLabel: 'Memasuki Colosseum',
    heroSceneImage: colosseumIllustration,
    icarusImage: icarusFall,
    ctaTitle: 'Ingin Mengenal Lebih Jauh Kelas Kami?',
    ctaDescription: 'Kunjungi profil lengkap sekolah, materi kurikulum arsitektur, atau kirim pesan langsung kepada kami.',
  },
  classInfo: { ...CLASS_INFO, homeroomTeacher: { ...CLASS_INFO.homeroomTeacher } },
  students: CLASS_MEMBERS.map((student) => ({ ...student, skills: [...student.skills] })),
  stats: CLASS_STATS.map((stat) => ({ ...stat })),
  projects: FEATURED_PROJECTS.map((project) => ({ ...project })),
  schedule: Object.fromEntries(
    Object.entries(SCHEDULE_DATA).map(([day, lessons]) => [day, lessons.map((lesson) => ({ ...lesson }))]),
  ),
}
