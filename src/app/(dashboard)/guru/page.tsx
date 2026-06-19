'use client';

import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, Legend,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  AlertTriangle, CheckCircle2, Info, Bell, ArrowUpRight, ChevronRight,
  Activity, ShieldCheck, FileText, TrendingUp, RefreshCw, Award,
  Target, Zap, BookOpen, Calendar, Users, GraduationCap,
  Monitor, Camera, Film, Image, ClipboardList, BarChart2, Heart,
  Laptop, MessageSquare, UserCheck,
} from 'lucide-react';

// ─── Warna tema Guru ─────────────────────────────────────────────────────────
const C = {
  primary: '#1565c0',
  secondary: '#1e88e5',
  green: '#2e7d32',
  orange: '#e65100',
  purple: '#6a1b9a',
};

// ─── DATA MOCK ───────────────────────────────────────────────────────────────

const pengumuman = [
  { id: 1, type: 'event', teks: 'Pelatihan Komputer Lanjutan Batch 2', tgl: '20/06/2025' },
  { id: 2, type: 'event', teks: 'Workshop Literasi Digital', tgl: '18/06/2025' },
  { id: 3, type: 'info', teks: 'Pelatihan Guru Digital', tgl: '17/06/2025' },
  { id: 4, type: 'info', teks: 'Seminar Pendidikan Desa', tgl: '15/06/2025' },
  { id: 5, type: 'info', teks: 'Kelas UMKM Digital - Sesi 3', tgl: '14/06/2025' },
];

// Radar monitoring literasi digital
const radarLiterasi = [
  { dimensi: 'Dimensi Literasi Digital', skor: 70.0 },
  { dimensi: 'Internet', skor: 70.0 },
  { dimensi: 'Perangkat Digital', skor: 65.0 },
  { dimensi: 'Keterampilan Digital', skor: 68.0 },
  { dimensi: 'Pemanfaatan Teknologi', skor: 69.0 },
  { dimensi: 'Keterampilan Digital', skor: 68.3 },
];

// Radar data for chart
const radarChartData = [
  { aspek: 'Internet', nilai: 70 },
  { aspek: 'Perangkat Digital', nilai: 65 },
  { aspek: 'Keterampilan Digital', nilai: 68 },
  { aspek: 'Pemanfaatan Teknologi', nilai: 69 },
  { aspek: 'Keterampilan Digital', nilai: 68 },
  { aspek: 'Rata-rata', nilai: 68.3 },
];

// Program Pendidikan Desa
const programPendidikan = [
  { program: 'Pelatihan Komputer Dasar', kategori: 'Literasi Digital', status: 'Berjalan', progress: 75, tglSelesai: '30/09/2025', targetSelesai: '30/09/2025' },
  { program: 'Literasi Digital Masyarakat', kategori: 'Literasi Digital', status: 'Berjalan', progress: 60, tglSelesai: '30/08/2025', targetSelesai: '30/08/2025' },
  { program: 'Kelas UMKM Digital', kategori: 'Ekonomi Digital', status: 'Selesai', progress: 100, tglSelesai: '10/06/2025', targetSelesai: '10/06/2025' },
  { program: 'Pelatihan Desain Grafis', kategori: 'Literasi Digital', status: 'Berjalan', progress: 45, tglSelesai: '30/08/2025', targetSelesai: '30/08/2025' },
  { program: 'Pendampingan Guru Digital', kategori: 'Pendidikan', status: 'Berjalan', progress: 55, tglSelesai: '30/08/2025', targetSelesai: '30/08/2025' },
  { program: 'Kelas Bahasa Inggris', kategori: 'Pendidikan', status: 'Berjalan', progress: 35, tglSelesai: '30/08/2025', targetSelesai: '30/08/2025' },
  { program: 'Program Beasiswa Desa', kategori: 'Beasiswa', status: 'Berjalan', progress: 55, tglSelesai: '15/11/2025', targetSelesai: '15/11/2025' },
  { program: 'Pelatihan Coding untuk Anak', kategori: 'Literasi Digital', status: 'Berjalan', progress: 25, tglSelesai: '30/10/2025', targetSelesai: '30/10/2025' },
  { program: 'Penguatan Perpustakaan Desa', kategori: 'Sarana Pendidikan', status: 'Berjalan', progress: 70, tglSelesai: '30/10/2025', targetSelesai: '30/10/2025' },
];

// Dampak Pendidikan terhadap Indeks
const dampakPendidikan = [
  { program: 'Pelatihan Komputer Dasar', readiness: '+3,20', qol: '+1,80', maturity: '+0,70' },
  { program: 'Literasi Digital Masyarakat', readiness: '+2,80', qol: '+2,40', maturity: '+0,60' },
  { program: 'Kelas UMKM Digital', readiness: '+3,60', qol: '+2,10', maturity: '+0,80' },
  { program: 'Sertifikasi SDM Desa', readiness: '+2,20', qol: '+1,20', maturity: '-0,50' },
  { program: 'Program Beasiswa Desa', readiness: '+1,80', qol: '+2,90', maturity: '+0,40' },
  { program: 'Penguatan Perpustakaan Desa', readiness: '+1,50', qol: '+1,60', maturity: '+0,30' },
  { program: 'Pelatihan Coding untuk Anak', readiness: '+2,50', qol: '+2,20', maturity: '+0,60' },
];

// Rekomendasi DSS Bidang Pendidikan
const rekomendasiDSS = [
  { no: 1, rekomendasi: 'Literasi Digital Masyarakat', deskripsi: 'Meningkatkan program literasi digital untuk semua kelompok usia', status: 'Berjalan', prioritas: 'Tinggi' },
  { no: 2, rekomendasi: 'Pelatihan Guru Digital', deskripsi: 'Meningkatkan kapasitas digital bagi guru di desa', status: 'Berjalan', prioritas: 'Tinggi' },
  { no: 3, rekomendasi: 'Sertifikasi SDM Desa', deskripsi: 'Mendorong lebih banyak warga mencapai sertifikasi digital', status: 'Belum Dimulai', prioritas: 'Sedang' },
  { no: 4, rekomendasi: 'Penguatan Sarana TIK Sekolah', deskripsi: 'Melengkapi perangkat dan jaringan di sekolah', status: 'Berjalan', prioritas: 'Sedang' },
];

// Target Readiness Pendidikan
const targetReadiness = [
  { tahun: '2024\n(Capai)', edu: 64.20, digital: 58.30 },
  { tahun: '2025\n(Target)', edu: 72.00, digital: 66.00 },
  { tahun: '2026\n(Target)', edu: 76.00, digital: 70.00 },
  { tahun: '2027\n(Target)', edu: 85.00, digital: 75.00 },
];

// Education Gap Analysis
const gapAnalysis = [
  { dimensi: 'Literasi Digital', skorSaat: 68.3, skorIdeal: 80.0, gap: 11.70, prioritas: 'Tinggi' },
  { dimensi: 'Kompetensi Guru', skorSaat: 70.10, skorIdeal: 80.0, gap: 9.90, prioritas: 'Tinggi' },
  { dimensi: 'Sertifikasi SDM', skorSaat: 58.00, skorIdeal: 75.0, gap: 17.00, prioritas: 'Sedang' },
  { dimensi: 'Akses Sarana TIK', skorSaat: 65.00, skorIdeal: 80.0, gap: 15.00, prioritas: 'Sedang' },
  { dimensi: 'Kurikulum Digital', skorSaat: 62.00, skorIdeal: 75.0, gap: 13.00, prioritas: 'Sedang' },
  { dimensi: 'Literasi Anak', skorSaat: 66.00, skorIdeal: 80.0, gap: 14.00, prioritas: 'Sedang' },
];

// Monitoring SDM Desa - donut
const sdmData = [
  { name: 'Guru (9)', value: 7, color: '#1565c0' },
  { name: 'Tenaga Kependidikan (6)', value: 3, color: '#42a5f5' },
  { name: 'Relawan Pendidikan (12)', value: 1, color: '#90caf9' },
  { name: 'Warga Terdidik Digital (68%)', value: 36, color: '#bbdefb' },
  { name: 'Sertifikasi Digital (58)', value: 36, color: '#e3f2fd' },
];

// Kalender pendidikan
const kalenderPendidikan = [
  { tgl: '20 JUN', nama: 'Pelatihan Komputer Dasar - Batch 2', waktu: '09:00 - 12:00 WITA' },
  { tgl: '24 JUN', nama: 'Workshop Literasi Digital', waktu: '10:00 - 16:00 WITA' },
  { tgl: '28 JUN', nama: 'Pendampingan Guru Digital', waktu: '09:00 - 11:00 WITA' },
  { tgl: '05 JUL', nama: 'Kelas UMKM Digital - Sesi 3', waktu: '13:00 - 16:00 WITA' },
  { tgl: '10 JUL', nama: 'Seminar Pendidikan Desa', waktu: '09:00 - 12:00 WITA' },
];

// Dokumentasi pendidikan
const dokumentasi = [
  { judul: 'Pelatihan Komputer Dasar', tgl: '15/06/2025', tipe: 'Foto', emoji: '💻' },
  { judul: 'Literasi Digital Masyarakat', tgl: '10/06/2025', tipe: 'Foto', emoji: '📱' },
  { judul: 'Kelas UMKM Digital', tgl: '08/06/2025', tipe: 'Video', emoji: '🛍️' },
  { judul: 'Sertifikasi Digital', tgl: '05/06/2025', tipe: 'Dokumen', emoji: '📜' },
];

// Kontribusi pendidikan dalam SLV
const kontribusiSLV = [
  { no: 1, judul: 'Peningkatan SDM', sub: 'Meningkatkan kompetensi dan kapasitas SDM desa', icon: Users, color: '#1565c0', done: true },
  { no: 2, judul: 'Literasi Digital', sub: 'Meningkatkan kemampuan digital masyarakat', icon: Monitor, color: '#2e7d32', done: true },
  { no: 3, judul: 'Inovasi & Kreativitas', sub: 'Mendorong inovasi berbasis pengetahuan', icon: Zap, color: '#e65100', done: false, active: true },
  { no: 4, judul: 'Produktivitas Masyarakat', sub: 'Meningkatkan produktivitas dan daya saing', icon: TrendingUp, color: '#6a1b9a', done: false },
  { no: 5, judul: 'Kualitas Hidup', sub: 'Meningkatkan kualitas hidup masyarakat desa', icon: Heart, color: '#c62828', done: false },
  { no: 6, judul: 'Smart Living Village', sub: 'Mendukung terwujudnya desa cerdas dan berkelanjutan', icon: Award, color: '#1b5e20', done: false },
];

// ─── HELPER ──────────────────────────────────────────────────────────────────

function SectionHeader({ title, href, label = 'Lihat Semua →' }: { title: string; href?: string; label?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">{title}</h3>
      {href && (
        <Link href={href} className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors">{label}</Link>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'Berjalan': 'bg-blue-100 text-blue-700',
    'Selesai': 'bg-green-100 text-green-700',
    'Belum Dimulai': 'bg-gray-100 text-gray-500',
    'Terlambat': 'bg-red-100 text-red-700',
  };
  return <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap ${map[status] ?? 'bg-gray-100 text-gray-500'}`}>{status}</span>;
}

function PriorityBadge({ prioritas }: { prioritas: string }) {
  const map: Record<string, string> = {
    'Tinggi': 'bg-red-100 text-red-700',
    'Sedang': 'bg-yellow-100 text-yellow-700',
    'Rendah': 'bg-green-100 text-green-700',
  };
  return <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap ${map[prioritas] ?? 'bg-gray-100 text-gray-500'}`}>{prioritas}</span>;
}

function ProgressBar({ value, color = '#1565c0' }: { value: number; color?: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: value >= 100 ? '#2e7d32' : color }} />
      </div>
      <span className="text-[9px] text-gray-400 w-6 text-right">{value}%</span>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function GuruDashboardPage() {
  return (
    <div className="flex flex-col gap-4 pb-8">

      {/* ── WELCOME + PENGUMUMAN ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Welcome banner */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden relative shadow-md bg-gradient-to-br from-blue-800 via-blue-700 to-blue-500">
          <div className="p-5 flex items-center justify-between gap-4 text-white relative z-10">
            <div className="flex-1">
              <h2 className="text-lg font-black leading-tight mb-1">Selamat datang, Guru Desa Lung Anai! 👋</h2>
              <p className="text-sm text-blue-100 leading-relaxed">
                Berikut ringkasan kondisi pendidikan dan literasi digital<br />
                untuk mendukung peningkatan kualitas SDM Desa Lung Anai.
              </p>
            </div>
            <div className="hidden sm:flex items-center justify-center w-36 h-24 rounded-xl bg-white/10 border border-white/20 flex-shrink-0">
              <div className="text-center">
                <div className="text-4xl">🏫</div>
                <p className="text-[10px] font-bold mt-1 text-blue-100">DESA LUNG ANAI</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/5" />
          <div className="absolute -left-4 -bottom-6 w-24 h-24 rounded-full bg-white/5" />
        </div>

        {/* Pengumuman Pendidikan */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Pengumuman Pendidikan</p>
            <Link href="/guru/kalender-pendidikan" className="text-[11px] font-semibold text-blue-600 hover:text-blue-800">Lihat Semua →</Link>
          </div>
          <div className="space-y-2">
            {pengumuman.map((n) => (
              <div key={n.id} className="flex items-start gap-2 p-2 rounded-lg bg-blue-50 border border-blue-100">
                <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <GraduationCap size={10} className="text-blue-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-700 leading-snug">{n.teks}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{n.tgl}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── KARTU INDEKS ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Education Readiness Index', value: '72,40', sub: 'Kategori', cat: 'Baik', icon: BarChart2, color: '#1565c0', href: '/guru/kontribusi-readiness' },
          { label: 'Digital Literacy Index', value: '68,30', sub: 'Kategori', cat: 'Baik', icon: Monitor, color: '#1e88e5', href: '/guru/literasi-digital' },
          { label: 'SDM Competency Index', value: '70,10', sub: 'Kategori', cat: 'Baik', icon: Users, color: '#2e7d32', href: '/guru/monitoring-sdm-desa' },
          { label: 'Peserta Pelatihan Aktif', value: '134', sub: 'Orang', cat: '', icon: UserCheck, color: '#e65100', href: '/guru/pelatihan-sertifikasi' },
          { label: 'Sertifikasi Digital', value: '58', sub: 'Orang', cat: '', icon: Award, color: '#6a1b9a', href: '/guru/pelatihan-sertifikasi' },
          { label: 'Program Pendidikan Aktif', value: '9', sub: 'Program', cat: '', icon: BookOpen, color: '#0277bd', href: '/guru/program-pendidikan-desa' },
        ].map((card, i) => {
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
              {card.cat && <span className="text-[11px] font-bold text-blue-600">{card.cat}</span>}
              <Link href={card.href} className="text-[10px] text-blue-500 hover:underline mt-1">Lihat Detail →</Link>
            </div>
          );
        })}
      </div>

      {/* ── MONITORING LITERASI + PROGRAM + DAMPAK ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Monitoring Literasi Digital — Radar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Monitoring Literasi Digital" href="/guru/literasi-digital" />
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarChartData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="#dbeafe" />
              <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 9, fill: '#1e40af' }} />
              <PolarRadiusAxis angle={30} domain={[60, 80]} tick={{ fontSize: 8, fill: '#3b82f6' }} />
              <Radar name="Skor" dataKey="nilai" stroke="#1565c0" fill="#1565c0" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} formatter={(v: any) => [`${v}`, 'Skor']} />
            </RadarChart>
          </ResponsiveContainer>
          <Link href="/guru/literasi-digital" className="mt-1 flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold">
            Lihat Detail Literasi Digital <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Program Pendidikan Desa */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Program Pendidikan Desa" href="/guru/program-pendidikan-desa" />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-1.5 pr-1 text-[9px] font-bold text-gray-400 uppercase">Program</th>
                  <th className="text-left py-1.5 pr-1 text-[9px] font-bold text-gray-400 uppercase">Kategori</th>
                  <th className="text-left py-1.5 pr-1 text-[9px] font-bold text-gray-400 uppercase">Status</th>
                  <th className="text-left py-1.5 pr-1 text-[9px] font-bold text-gray-400 uppercase">Progress</th>
                  <th className="text-left py-1.5 text-[9px] font-bold text-gray-400 uppercase">Target Selesai</th>
                </tr>
              </thead>
              <tbody>
                {programPendidikan.slice(0, 8).map((row, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-1.5 pr-1 font-medium text-gray-700 leading-snug" style={{ maxWidth: 90, whiteSpace: 'normal' }}>{row.program}</td>
                    <td className="py-1.5 pr-1 text-[10px] text-gray-500 whitespace-nowrap">{row.kategori}</td>
                    <td className="py-1.5 pr-1"><StatusBadge status={row.status} /></td>
                    <td className="py-1.5 pr-1 w-16"><ProgressBar value={row.progress} /></td>
                    <td className="py-1.5 text-[10px] text-gray-400 whitespace-nowrap">{row.tglSelesai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href="/guru/program-pendidikan-desa" className="mt-2 flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold">
            Lihat Semua Program <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Dampak Pendidikan terhadap Indeks */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Dampak Pendidikan terhadap Indeks" href="/guru/dampak-pendidikan" label="Lihat Analisis →" />
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-1.5 pr-1 text-[9px] font-bold text-gray-400 uppercase">Program</th>
                <th className="text-center py-1.5 pr-1 text-[9px] font-bold text-blue-600 uppercase">ke Readiness</th>
                <th className="text-center py-1.5 pr-1 text-[9px] font-bold text-green-600 uppercase">Dampak ke QoL</th>
                <th className="text-center py-1.5 text-[9px] font-bold text-purple-600 uppercase">Dampak ke Maturity</th>
              </tr>
            </thead>
            <tbody>
              {dampakPendidikan.map((row, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-1.5 pr-1 font-medium text-gray-700 leading-snug" style={{ maxWidth: 95, whiteSpace: 'normal' }}>{row.program}</td>
                  <td className="py-1.5 pr-1 text-center font-bold text-blue-600 whitespace-nowrap">{row.readiness}</td>
                  <td className="py-1.5 pr-1 text-center font-bold text-green-600 whitespace-nowrap">{row.qol}</td>
                  <td className="py-1.5 text-center font-bold whitespace-nowrap" style={{ color: row.maturity.startsWith('-') ? '#c62828' : '#6a1b9a' }}>{row.maturity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/guru/dampak-pendidikan" className="mt-2 flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold">
            Lihat Analisis Dampak <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>

      {/* ── DSS + TARGET READINESS + GAP ANALYSIS ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Rekomendasi DSS Bidang Pendidikan */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Rekomendasi DSS Bidang Pendidikan" href="/guru/kontribusi-readiness" />
          <div className="space-y-2">
            {rekomendasiDSS.map((row, i) => (
              <div key={i} className="p-2.5 border border-gray-100 rounded-lg">
                <div className="flex items-start gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">{row.no}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-gray-800 leading-snug">{row.rekomendasi}</p>
                    <p className="text-[10px] text-gray-400 leading-snug">{row.deskripsi}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-7">
                  <StatusBadge status={row.status} />
                  <PriorityBadge prioritas={row.prioritas} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Readiness Pendidikan */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Target Readiness Pendidikan" href="/guru/kontribusi-readiness" label="Lihat Roadmap →" />
          <p className="text-[10px] text-gray-400 mb-2">Education Readiness Index (Target)</p>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={targetReadiness} margin={{ top: 0, right: 5, left: -20, bottom: 0 }} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="tahun" tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 90]} tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} />
              <Bar dataKey="edu" name="Education Readiness" fill="#1565c0" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-gray-400 mt-2 mb-1">Digital Literacy Index (Target)</p>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={targetReadiness} margin={{ top: 0, right: 5, left: -20, bottom: 0 }} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="tahun" tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 80]} tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} />
              <Bar dataKey="digital" name="Digital Literacy" fill="#42a5f5" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Education Gap Analysis */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Education Gap Analysis" href="/guru/kontribusi-readiness" label="Lihat Detail →" />
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-1.5 pr-1 text-[9px] font-bold text-gray-400 uppercase">Dimensi Pendidikan</th>
                <th className="text-center py-1.5 pr-1 text-[9px] font-bold text-blue-600 uppercase">Skor Saat Ini</th>
                <th className="text-center py-1.5 pr-1 text-[9px] font-bold text-green-600 uppercase">Skor Ideal</th>
                <th className="text-center py-1.5 pr-1 text-[9px] font-bold text-red-600 uppercase">Gap</th>
                <th className="text-center py-1.5 text-[9px] font-bold text-gray-400 uppercase">Prioritas</th>
              </tr>
            </thead>
            <tbody>
              {gapAnalysis.map((row, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-1.5 pr-1 font-medium text-gray-700 leading-snug">{row.dimensi}</td>
                  <td className="py-1.5 pr-1 text-center text-blue-700 font-bold">{row.skorSaat.toFixed(2)}</td>
                  <td className="py-1.5 pr-1 text-center text-green-700 font-bold">{row.skorIdeal.toFixed(2)}</td>
                  <td className="py-1.5 pr-1 text-center text-red-600 font-bold">{row.gap.toFixed(2)}</td>
                  <td className="py-1.5 text-center"><PriorityBadge prioritas={row.prioritas} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MONITORING SDM + KALENDER + DOKUMENTASI ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Monitoring SDM Desa */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Monitoring SDM Desa" href="/guru/monitoring-sdm-desa" label="Lihat Detail →" />
          <div className="flex items-center gap-4">
            {/* Stats */}
            <div className="flex-1 space-y-2">
              {[
                { label: 'Jumlah Guru', value: '16 Orang' },
                { label: 'Tenaga Kependidikan', value: '6 Orang' },
                { label: 'Relawan Pendidikan', value: '12 Orang' },
                { label: 'Warga Terdidik Digital', value: '134 Orang' },
                { label: 'Sertifikasi Digital', value: '58 Orang' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-600">{item.label}</span>
                  <span className="text-[11px] font-bold text-blue-700">{item.value}</span>
                </div>
              ))}
            </div>
            {/* Donut */}
            <div className="relative flex-shrink-0">
              <ResponsiveContainer width={100} height={100}>
                <PieChart>
                  <Pie data={sdmData} dataKey="value" cx="50%" cy="50%" innerRadius={30} outerRadius={45} stroke="none">
                    {sdmData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-[8px] font-bold text-gray-500">Total</p>
                <p className="text-lg font-black text-gray-900">226</p>
                <p className="text-[8px] text-gray-400">Orang</p>
              </div>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            {sdmData.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] text-gray-500">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kalender Pendidikan */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Kalender Pendidikan" href="/guru/kalender-pendidikan" label="Lihat Kalender Lengkap →" />
          <div className="space-y-2">
            {kalenderPendidikan.map((kal, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 border border-blue-100 rounded-lg bg-blue-50">
                <div className="flex-shrink-0 text-center w-10 p-1 rounded-lg bg-blue-100">
                  <p className="text-[8px] font-bold text-blue-600 leading-none">{kal.tgl.split(' ')[1]}</p>
                  <p className="text-sm font-black text-blue-800 leading-tight">{kal.tgl.split(' ')[0]}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-gray-800 leading-snug">{kal.nama}</p>
                  <p className="text-[10px] text-gray-500">{kal.waktu}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dokumentasi Pendidikan */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Dokumentasi Pendidikan" href="/guru/dokumentasi-pendidikan" />
          <div className="grid grid-cols-2 gap-2">
            {dokumentasi.map((dok, i) => (
              <div key={i} className="rounded-lg border border-gray-100 overflow-hidden">
                <div className="w-full h-20 bg-blue-50 flex items-center justify-center text-4xl">
                  {dok.emoji}
                </div>
                <div className="p-1.5">
                  <p className="text-[10px] font-semibold text-gray-700 leading-tight truncate">{dok.judul}</p>
                  <p className="text-[9px] text-gray-400">{dok.tgl}</p>
                  <span className={`inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded mt-0.5 ${
                    dok.tipe === 'Video' ? 'bg-red-100 text-red-700' :
                    dok.tipe === 'Dokumen' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {dok.tipe === 'Video' ? <Film size={8} /> : dok.tipe === 'Dokumen' ? <FileText size={8} /> : <Camera size={8} />}
                    &nbsp;{dok.tipe}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/guru/dokumentasi-pendidikan" className="mt-3 flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold">
            Lihat Semua <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>

      {/* ── KONTRIBUSI PENDIDIKAN DALAM SLV ──────────────────────────────── */}
      <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-5">
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">
          Kontribusi Pendidikan dalam Smart Living Village
        </h3>
        <div className="flex flex-wrap items-start gap-0">
          {kontribusiSLV.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === kontribusiSLV.length - 1;
            return (
              <div key={i} className="flex items-center gap-0 flex-1 min-w-0">
                <div className="flex flex-col items-center text-center flex-shrink-0 w-24 sm:w-28">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-2 border-2 ${
                    step.active ? 'shadow-md' : ''
                  }`} style={{
                    backgroundColor: step.done || step.active ? step.color : '#f1f5f9',
                    borderColor: step.done || step.active ? step.color : '#e2e8f0'
                  }}>
                    {step.done && !step.active
                      ? <CheckCircle2 size={16} className="text-white" />
                      : <Icon size={16} className={step.done || step.active ? 'text-white' : 'text-gray-400'} />
                    }
                  </div>
                  <p className={`text-[10px] font-bold leading-tight mb-0.5`} style={{
                    color: step.done || step.active ? step.color : '#94a3b8'
                  }}>
                    {i + 1}. {step.judul}
                  </p>
                  <p className="text-[9px] text-gray-400 leading-snug hidden sm:block">{step.sub}</p>
                </div>
                {!isLast && (
                  <div className="flex-1 flex items-center justify-center pb-6">
                    <div className={`h-0.5 w-full ${step.done ? 'bg-blue-300' : 'bg-gray-200'}`} />
                    <ChevronRight size={12} className={`flex-shrink-0 -ml-1 ${step.done ? 'text-blue-400' : 'text-gray-300'}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-2 border-t border-gray-100">
        <span>APL-SLV Borneo © 2025 · Smart Living Village for Borneo</span>
        <span>Desa Lung Anai, Kecamatan Loa Kuluu, Kabupaten Kutai Kartanegara, Kalimantan Timur</span>
      </div>

    </div>
  );
}
