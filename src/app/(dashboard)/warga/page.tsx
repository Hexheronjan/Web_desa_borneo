'use client';

import Link from 'next/link';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  Bell, ArrowUpRight, ChevronRight, CheckCircle2,
  Activity, FileText, TrendingUp, RefreshCw,
  Calendar, Users, MessageSquare, ClipboardList,
  Heart, Home, BookOpen, Leaf, Map, Send,
  AlertTriangle, Clock, Megaphone,
} from 'lucide-react';

// ─── Warna tema Warga ────────────────────────────────────────────────────────
const C = { primary: '#276749', secondary: '#2f855a', orange: '#c05621' };

// ─── DATA MOCK ───────────────────────────────────────────────────────────────

const notifikasiDesa = [
  { id: 1, teks: 'Musrenbangdes 2025 akan dilaksanakan pada 25 Mei 2025', badge: 'Baru', color: 'bg-green-600' },
  { id: 2, teks: 'Survei Quality of Life Triwulan II sudah tersedia. Yuk berpartisipasi!', badge: 'Baru', color: 'bg-green-600' },
  { id: 3, teks: 'Pelatihan Literasi Digital untuk Masyarakat 22 Mei 2025', badge: null, color: '' },
  { id: 4, teks: 'Posyandu Balita: 27 Mei 2025 | 1 jam lalu', badge: null, color: '' },
  { id: 5, teks: 'Festival Adat Lung Anai 2025 7 Juni 2025 | 2 jam lalu', badge: null, color: '' },
];

// Radar SLV Desa
const radarDesa = [
  { aspek: 'SDM & Literasi Digital', nilai: 68 },
  { aspek: 'Infrastruktur Digital', nilai: 72 },
  { aspek: 'Kesehatan', nilai: 75 },
  { aspek: 'Ekonomi', nilai: 70 },
  { aspek: 'Lingkungan', nilai: 69 },
  { aspek: 'Sosial Budaya', nilai: 73 },
  { aspek: 'Kelembagaan', nilai: 71 },
];

// Stat cards
const statCards = [
  { label: 'Ringkasan Skor Kesiapan Desa', value: '74,30', sub: 'Indeks Kesiapan', cat: 'Kategori: Baik', icon: TrendingUp, color: '#276749', href: '/warga/hasil-readiness-desa' },
  { label: 'Skor Kualitas Hidup Masyarakat', value: '71,28', sub: 'Indeks Kualitas', cat: 'Kategori: Baik', icon: Heart, color: '#2b6cb0', href: '/warga/hasil-quality-of-life-desa' },
  { label: 'Program Desa Berjalan', value: '16', sub: 'Program', cat: '', icon: ClipboardList, color: '#c05621', href: '/warga/program-desa', link: 'Lihat Program' },
  { label: 'Aspirasi dalam Tindak Lanjut', value: '23', sub: '5 Baru · 8 Belum Ditanggapi', cat: '', icon: MessageSquare, color: '#6a1b9a', href: '/warga/aspirasi-masyarakat', link: 'Lihat Aspirasi' },
  { label: 'Agenda dan Musyawarah Mendatang', value: '7', sub: 'Kegiatan', cat: '', icon: Calendar, color: '#c05621', href: '/warga/agenda-desa', link: 'Lihat Agenda' },
  { label: 'Partisipasi Survei Masyarakat', value: '85%', sub: '85% Partisipasi (320 Warga)', cat: '', icon: Users, color: '#276749', href: '/warga/survei-quality-of-life', link: 'Isi Survei' },
];

// Program Desa Berjalan
const programBerjalan = [
  { nama: 'Internet Desa (Prioritas Utama)', sub: 'Pemasangan Jaringan Internet', progress: 75, status: 'Berjalan', color: '#2b6cb0', emoji: '🌐' },
  { nama: 'Posyandu Digital (Prioritas Utama)', sub: 'Layanan Kesehatan Ibu & Anak', progress: 80, status: 'Berjalan', color: '#276749', emoji: '🏥' },
  { nama: 'Literasi Digital Masyarakat', sub: 'Pelatihan Digital untuk Warga', progress: 60, status: 'Berjalan', color: '#276749', emoji: '💻' },
  { nama: 'Pengelolaan Sampah Desa', sub: 'Program Lingkungan Bersih', progress: 50, status: 'Ditunda', color: '#c05621', emoji: '♻️' },
  { nama: 'Penguatan UMKM Desa', sub: 'Pendampingan Usaha Masyarakat', progress: 40, status: 'Terlambat', color: '#e53e3e', emoji: '🛍️' },
];

// Aspirasi Masyarakat
const aspirasiData = [
  { judul: 'Perbaikan Jalan Poros Dusun', kategori: 'Infrastruktur', status: 'Diproses', tgl: '20 Mei 2025', statusColor: 'bg-blue-100 text-blue-700' },
  { judul: 'Penambahan Lampu Jalan', kategori: 'Infrastruktur', status: 'Diterima', tgl: '18 Mei 2025', statusColor: 'bg-green-100 text-green-700' },
  { judul: 'Pengadaan Tempat Sampah', kategori: 'Lingkungan', status: 'Diproses', tgl: '17 Mei 2025', statusColor: 'bg-blue-100 text-blue-700' },
  { judul: 'Pelatihan Komputer untuk Pemula', kategori: 'Pendidikan', status: 'Selesai', tgl: '16 Mei 2025', statusColor: 'bg-gray-100 text-gray-600' },
  { judul: 'Perbaikan Jaringan Internet', kategori: 'Infrastruktur', status: 'Diterima', tgl: '15 Mei 2025', statusColor: 'bg-green-100 text-green-700' },
];

// QoL Survei
const qolDimensi = [
  { dimensi: 'Kesehatan', skor: 72.40, kategori: 'Baik' },
  { dimensi: 'Pendidikan', skor: 70.80, kategori: 'Baik' },
  { dimensi: 'Ekonomi', skor: 72.10, kategori: 'Baik' },
  { dimensi: 'Lingkungan', skor: 69.30, kategori: 'Cukup' },
  { dimensi: 'Sosial Budaya', skor: 70.50, kategori: 'Baik' },
  { dimensi: 'Kelembagaan', skor: 71.20, kategori: 'Baik' },
  { dimensi: 'Kepuasan Pelayanan', skor: 74.50, kategori: 'Baik' },
];

// Pelaporan masalah
const pelaporanMasalah = [
  { judul: 'Jalan Rusak di Dusun Loa Kulu', kategori: 'Infrastruktur (Prioritas Utama)', status: 'Diproses', tgl: '20 Mei 2025', img: '🛣️', statusColor: 'bg-red-100 text-red-700' },
  { judul: 'Sampah Menumpuk di TPS', kategori: 'Lingkungan', status: 'Diterima', tgl: '19 Mei 2025', img: '🗑️', statusColor: 'bg-green-100 text-green-700' },
  { judul: 'Lampu Jalan Mati', kategori: 'Infrastruktur', status: 'Diproses', tgl: '18 Mei 2025', img: '💡', statusColor: 'bg-blue-100 text-blue-700' },
];

// Agenda Desa
const agendaDesa = [
  { nama: 'Musrenbangdes 2025 (Pembahasan RPJMDes & Usulan)', sub: 'Balai Desa', tgl: '25', bln: 'MEI' },
  { nama: 'Posyandu Balita (Layanan Kesehatan KIA)', sub: 'Posyandu Desa', tgl: '27', bln: 'MEI', waktu: '08.00 - 11.00 WITA' },
  { nama: 'Pelatihan Literasi Digital (Peningkatan Skill Warga)', sub: 'Balai Desa', tgl: '17', bln: 'JUL', waktu: '09.00 - 12.00 WITA' },
  { nama: 'Kerja Bakti Desa (Gotong Royong Lingkungan)', sub: 'Lingkungan Desa', tgl: '31', bln: 'MEI', waktu: '07.00 - 10.00 WITA' },
];

// Informasi Desa
const infoDesa = [
  { judul: 'Informasi Adat & Budaya', sub: 'Mengenal adat dan budaya Lung Anai untuk generasi mendatang.', emoji: '🏠', href: '/warga/informasi-adat-budaya' },
  { judul: 'Informasi Pendidikan', sub: 'Informasi sekolah, beasiswa, dan kegiatan pendidikan desa.', emoji: '📚', href: '/warga/informasi-pendidikan' },
  { judul: 'Informasi Kesehatan', sub: 'Layanan kesehatan, posyandu dan pola hidup sehat.', emoji: '🏥', href: '/warga/informasi-kesehatan' },
  { judul: 'Informasi Pembangunan', sub: 'Informasi rencana pembangunan fisik, sarana prasarana, dan infrastruktur desa.', emoji: '🏗️', href: '/warga/profil-desa' },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function ProgressBar({ value, color = '#276749' }: { value: number; color?: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="text-[9px] text-gray-400 w-6 text-right">{value}%</span>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function WargaDashboardPage() {
  return (
    <div className="flex flex-col gap-4 pb-8">

      {/* ── WELCOME BANNER ───────────────────────────────────────────────── */}
      <div className="rounded-xl overflow-hidden relative shadow-md bg-gradient-to-br from-green-800 via-green-700 to-green-500">
        <div className="p-5 flex items-center justify-between gap-4 text-white relative z-10">
          <div className="flex-1">
            <h2 className="text-xl font-black leading-tight mb-1">Selamat datang, Tokoh/Perwakilan Masyarakat Desa Lung Anai 👋</h2>
            <p className="text-sm text-green-100 leading-relaxed">
              Bersama membangun desa yang cerdas, mandiri, berbudaya dan sejahtera.
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-center justify-center w-40 h-24 rounded-xl bg-white/10 border border-white/20 flex-shrink-0 p-2 text-center">
            <p className="text-base font-black leading-none">LUNG ANAI</p>
            <p className="text-[10px] font-semibold text-green-100 mt-0.5">Smart Living Village</p>
            <p className="text-[9px] italic text-green-200 mt-1 leading-snug">"Bersama Warga, Membangun Masa Depan Desa Yang Cerdas, Mandiri, Berbudaya dan Sejahtera"</p>
          </div>
        </div>
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/5" />
      </div>

      {/* ── STAT CARDS ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: card.color }}>
                  <Icon size={12} className="text-white" />
                </div>
                <span className="text-[9px] font-semibold text-gray-500 uppercase leading-none">{card.label}</span>
              </div>
              <p className="text-2xl font-black text-gray-900">{card.value}</p>
              <p className="text-[10px] text-gray-500">{card.sub}</p>
              {card.cat && <span className="text-[10px] font-bold text-green-600">{card.cat}</span>}
              {card.link && (
                <Link href={card.href} className="text-[10px] text-green-600 hover:underline mt-1 font-semibold">
                  {card.link} →
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* ── RINGKASAN SLV + PROGRAM + NOTIFIKASI + ASPIRASI ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

        {/* Ringkasan SLV Desa - Radar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Ringkasan Smart Living Village Desa</h3>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <RadarChart data={radarDesa} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
              <PolarGrid stroke="#c6f6d5" />
              <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 8, fill: '#276749' }} />
              <PolarRadiusAxis angle={30} domain={[60, 80]} tick={false} />
              <Radar name="Nilai" dataKey="nilai" stroke="#276749" fill="#276749" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} formatter={(v: any) => [`${v}`, 'Skor']} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-2 p-2 bg-green-50 rounded-lg border border-green-200">
            <p className="text-[10px] text-gray-600">
              Desa Lung Anai telah mencapai kategori <span className="font-bold text-green-700">BAIK</span> dalam kesopanan Smart Living Village.
            </p>
            <Link href="/warga/roadmap-desa" className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-green-700 hover:underline">
              Selengkapnya <ArrowUpRight size={10} />
            </Link>
          </div>
        </div>

        {/* Program Desa Berjalan */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Program Desa Berjalan</h3>
            <Link href="/warga/program-desa" className="text-[11px] font-semibold text-green-700 hover:text-green-900">Lihat Semua →</Link>
          </div>
          <div className="space-y-2.5">
            {programBerjalan.map((p, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{p.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold text-gray-700 truncate">{p.nama}</p>
                      <span className={`ml-1 px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap flex-shrink-0 ${
                        p.status === 'Berjalan' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>{p.status}</span>
                    </div>
                    <p className="text-[10px] text-gray-400">{p.sub}</p>
                  </div>
                </div>
                <ProgressBar value={p.progress} color={p.color} />
              </div>
            ))}
          </div>
        </div>

        {/* Notifikasi Desa */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Notifikasi Desa</h3>
            <Link href="/warga/notifikasi-desa" className="text-[11px] font-semibold text-green-700 hover:text-green-900">Lihat Semua →</Link>
          </div>
          <div className="space-y-2">
            {notifikasiDesa.map((n) => (
              <div key={n.id} className="flex items-start gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bell size={10} className="text-green-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-700 leading-snug">{n.teks}</p>
                  {n.badge && (
                    <span className={`mt-0.5 inline-block px-1.5 py-0.5 rounded text-[9px] font-bold text-white ${n.color}`}>{n.badge}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aspirasi Masyarakat */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Aspirasi Masyarakat</h3>
            <Link href="/warga/aspirasi-masyarakat" className="text-[11px] font-semibold text-green-700 hover:text-green-900">Lihat Semua →</Link>
          </div>
          {/* Tab */}
          <div className="flex gap-1 mb-2">
            {['Terbaru', 'Diterima', 'Diproses', 'Selesai'].map((t) => (
              <span key={t} className={`px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer ${t === 'Terbaru' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'}`}>{t}</span>
            ))}
          </div>
          <div className="space-y-1.5">
            {aspirasiData.map((a, i) => (
              <div key={i} className="flex items-start gap-2 p-1.5 border border-gray-100 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-1.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-[11px] font-semibold text-gray-700 leading-snug truncate">{a.judul}</p>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap flex-shrink-0 ${a.statusColor}`}>{a.status}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">{a.kategori} · {a.tgl}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SURVEI QoL + PELAPORAN + AGENDA ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Survei Quality of Life */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Survei Quality of Life</h3>
            <Link href="/warga/survei-readiness" className="text-[11px] font-semibold text-green-700 hover:text-green-900">Lihat Hasil Lengkap →</Link>
          </div>
          <div className="flex items-center gap-4">
            {/* Donut */}
            <div className="relative flex-shrink-0">
              <ResponsiveContainer width={90} height={90}>
                <PieChart>
                  <Pie data={[{ value: 71.28 }, { value: 28.72 }]} dataKey="value" cx="50%" cy="50%" innerRadius={28} outerRadius={42} stroke="none" startAngle={90} endAngle={-270}>
                    <Cell fill="#276749" />
                    <Cell fill="#e2e8f0" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-[9px] text-gray-400">Rata-rata QoL</p>
                <p className="text-base font-black text-gray-900">71,28</p>
                <p className="text-[9px] font-bold text-green-600">Baik</p>
              </div>
            </div>
            {/* Table */}
            <div className="flex-1">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-1 text-[9px] font-bold text-gray-400">Dimensi</th>
                    <th className="text-center py-1 text-[9px] font-bold text-gray-400">Skor</th>
                    <th className="text-center py-1 text-[9px] font-bold text-gray-400">Kategori</th>
                  </tr>
                </thead>
                <tbody>
                  {qolDimensi.map((d, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-1 text-gray-700 font-medium">{d.dimensi}</td>
                      <td className="py-1 text-center font-bold text-green-700">{d.skor.toFixed(2)}</td>
                      <td className="py-1 text-center">
                        <span className={`px-1 py-0.5 rounded text-[9px] font-bold ${d.kategori === 'Baik' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{d.kategori}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Link href="/warga/survei-quality-of-life" className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-colors">
            Isi Survei Sekarang
          </Link>
        </div>

        {/* Pelaporan Masalah Desa */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Pelaporan Masalah Desa</h3>
            <Link href="/warga/pelaporan-masalah-desa" className="text-[11px] font-semibold text-green-700 hover:text-green-900">Lihat Semua →</Link>
          </div>
          <div className="space-y-2.5">
            {pelaporanMasalah.map((p, i) => (
              <div key={i} className="flex items-start gap-3 p-2 border border-gray-100 rounded-lg">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">{p.img}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-gray-800 leading-snug">{p.judul}</p>
                  <p className="text-[10px] text-gray-400">{p.kategori} · {p.tgl}</p>
                  <span className={`mt-1 inline-block px-1.5 py-0.5 rounded text-[9px] font-bold ${p.statusColor}`}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50 text-xs font-bold transition-colors">
            + Ajukan Laporan Baru
          </button>
        </div>

        {/* Agenda Desa */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Agenda Desa</h3>
            <Link href="/warga/agenda-desa" className="text-[11px] font-semibold text-green-700 hover:text-green-900">Lihat Semua →</Link>
          </div>
          {/* Mini calendar */}
          <div className="bg-gray-50 rounded-lg p-2 mb-3 text-center">
            <p className="text-[10px] font-bold text-gray-600 mb-1">Mei 2025</p>
            <div className="grid grid-cols-7 gap-0.5 text-[9px] text-gray-400 mb-1">
              {['Min','Sen','Sel','Rab','Kam','Jum','Sab'].map(d => <div key={d} className="text-center font-bold">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-[9px]">
              {[...Array(4).fill(''), ...Array(31).fill(0).map((_, i) => i + 1), ...Array(1).fill('')].map((d, i) => (
                <div key={i} className={`text-center py-0.5 rounded ${
                  d === 22 ? 'bg-green-600 text-white font-bold' :
                  [25, 27].includes(d as number) ? 'bg-green-100 text-green-700 font-bold' : 'text-gray-600'
                }`}>{d || ''}</div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {agendaDesa.map((ag, i) => (
              <div key={i} className="flex items-start gap-2 p-2 border border-gray-100 rounded-lg">
                <div className="flex-shrink-0 w-10 text-center p-1 rounded bg-green-50">
                  <p className="text-[8px] font-bold text-green-600">{ag.bln}</p>
                  <p className="text-sm font-black text-green-800 leading-none">{ag.tgl}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-gray-800 leading-snug">{ag.nama}</p>
                  <p className="text-[10px] text-gray-400">{ag.sub}{ag.waktu ? ' · ' + ag.waktu : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── INFORMASI DESA + SUARA WARGA ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Informasi Desa */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Informasi Publik & Pembangunan Desa</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {infoDesa.map((info, i) => (
              <div key={i} className="rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="w-full h-20 bg-green-50 flex items-center justify-center text-4xl">{info.emoji}</div>
                <div className="p-2">
                  <p className="text-[10px] font-bold text-gray-800 leading-snug mb-1">{info.judul}</p>
                  <p className="text-[9px] text-gray-400 leading-snug">{info.sub}</p>
                  <Link href={info.href} className="mt-1 flex items-center gap-0.5 text-[9px] text-green-600 font-semibold hover:underline">
                    Lihat Informasi <ArrowUpRight size={8} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suara Anda, Membangun Desa Kita */}
        <div className="rounded-xl bg-gradient-to-br from-green-700 via-green-600 to-green-500 p-5 text-white shadow-md flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-green-200 mb-1">Suara Anda, Membangun Desa Kita</p>
            <h3 className="text-base font-black leading-snug mb-2">
              Partisipasi Anda sangat berarti untuk kemajuan Desa Lung Anai. Mari bersama-sama mewujudkan desa yang cerdas, mandiri, berbudaya dan sejahtera.
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-4xl">👨‍👩‍👧‍👦</div>
            <Link href="/warga/aspirasi-masyarakat" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-green-700 font-black text-sm hover:bg-green-50 transition-colors">
              <Send size={14} /> Sampaikan Aspirasi Anda
            </Link>
          </div>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-400 pt-2 border-t border-gray-100 gap-1">
        <span>© 2025 Pemerintah Desa Lung Anai. All rights reserved.</span>
        <div className="flex gap-3">
          {['Smart Living Village', 'Partisipasi Warga', 'Transparansi', 'Kolaborasi', 'Keberlanjutan'].map((t, i) => (
            <span key={i} className="hover:text-gray-600 cursor-pointer">{t}</span>
          ))}
        </div>
        <span>Versi 1.0.0</span>
      </div>

    </div>
  );
}
