'use client';

import Link from 'next/link';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from 'recharts';
import {
  AlertTriangle, CheckCircle2, Info, Bell, ArrowUpRight,
  ChevronRight, Activity, ShieldCheck, FileText, TrendingUp,
  RefreshCw, Award, Target, Zap, BookOpen, Calendar,
  Users, Landmark, Camera, Film, Image, FileCheck,
  MessageSquare, ClipboardList, BarChart2, Heart,
} from 'lucide-react';

// ─── Warna tema Lembaga Adat ─────────────────────────────────────────────────
const C = {
  primary: '#5c3d11',      // cokelat kayu
  secondary: '#b7791f',    // emas
  green: '#276749',
  red: '#c81e1e',
  blue: '#1a56db',
  bg: '#fefce8',           // krem hangat
};

// ─── DATA MOCK ───────────────────────────────────────────────────────────────

const pengumuman = [
  { id: 1, type: 'event', teks: 'Rapat Besar Lembaga Adat: Membahas Festival Hudoq 2025', tgl: '20/06/2025' },
  { id: 2, type: 'event', teks: 'Upacara Adat Ngerun Tahun: Akan dilaksanakan pada 10 Juli 2025', tgl: '18/06/2025' },
  { id: 3, type: 'info', teks: 'Pelatihan Pemandu Wisata Budaya Berbasis Kearifan Lokal', tgl: '17/06/2025' },
  { id: 4, type: 'warning', teks: 'Verifikasi Program Wisata Desa: Perlu penyesuaian dengan nilai adat', tgl: '16/06/2025' },
];

// Radar ketahanan budaya
const radarData = [
  { aspek: 'Tradisi & Upacara', nilai: 74 },
  { aspek: 'Bahasa Lokal', nilai: 72 },
  { aspek: 'Ritual Adat', nilai: 75 },
  { aspek: 'Kelembagaan Adat', nilai: 78 },
  { aspek: 'Pengetahuan Lokal', nilai: 73 },
  { aspek: 'Seni & Budaya', nilai: 69 },
];

// Monitoring kearifan lokal
const kearifanLokal = [
  { dimensi: 'Pengelolaan Sumber Daya Alam', skor: 76.0, kategori: 'Tinggi' },
  { dimensi: 'Sistem Gotong Royong', skor: 78.5, kategori: 'Tinggi' },
  { dimensi: 'Hukum Adat', skor: 74.0, kategori: 'Tinggi' },
  { dimensi: 'Kearifan Ekonomi Lokal', skor: 71.0, kategori: 'Sedang' },
  { dimensi: 'Pengobatan Tradisional', skor: 69.5, kategori: 'Sedang' },
];

// Validasi program desa
const validasiProgram = [
  { program: 'Pembangunan Internet Desa', status: 'Sesuai Adat', ket: 'Mendukung pendidikan dan komunikasi', statusColor: 'bg-green-100 text-green-700' },
  { program: 'Pengembangan Wisata Desa', status: 'Perlu Penyesuaian', ket: 'Perlu pengaturan asosiasi situs adat', statusColor: 'bg-orange-100 text-orange-700' },
  { program: 'Pelatihan Digital Masyarakat', status: 'Sesuai Adat', ket: 'Mendukung peningkatan kapasitas', statusColor: 'bg-green-100 text-green-700' },
  { program: 'Pengelolaan Sampah Desa', status: 'Sesuai Adat', ket: 'Tidak bertentangan dengan nilai adat', statusColor: 'bg-green-100 text-green-700' },
  { program: 'Pembangunan Gedung Serbaguna', status: 'Perlu Penyesuaian', ket: 'Perlu musyawarah adat lebih lanjut', statusColor: 'bg-orange-100 text-orange-700' },
];

// Dampak program terhadap budaya
const dampakProgram = [
  { program: 'Pengembangan Wisata Desa', dampak: '+3,80', ket: 'Meningkatkan promosi budaya lokal' },
  { program: 'Pelatihan Digital Masyarakat', dampak: '+2,40', ket: 'Mendukung pelestarian melalui digitalisasi' },
  { program: 'Festival Budaya & Adat', dampak: '+5,00', ket: 'Sangat meningkatkan ketahanan budaya' },
  { program: 'Internet Desa', dampak: '+1,20', ket: 'Dampak netral terhadap budaya' },
  { program: 'Bank Sampah Digital', dampak: '+1,00', ket: 'Mendukung nilai gotong royong' },
];

// Dokumentasi terbaru
const dokumentasi = [
  { judul: 'Upacara Hudoq', tgl: '15/06/2025', tipe: 'Video', emoji: '🎭' },
  { judul: 'Ritual Ngerun Tahun', tgl: '05/06/2025', tipe: 'Foto', emoji: '🕯️' },
  { judul: 'Tari Gong', tgl: '08/06/2025', tipe: 'Foto', emoji: '🪘' },
  { judul: 'Naskah Lokal', tgl: '01/06/2025', tipe: 'Dokumen', emoji: '📜' },
  { judul: 'Rumah Lamin', tgl: '28/05/2025', tipe: 'Foto', emoji: '🏠' },
];

// Kalender adat
const kalenderAdat = [
  { nama: 'Upacara Ngerun Tahun', sub: 'Ritual ucapan syukur', tgl: '10 JUL 2025' },
  { nama: 'Festival Hudoq', sub: 'Pertunjukan seni dan budaya Hudoq', tgl: '22 JUL 2025' },
  { nama: 'Musyawarah Adat', sub: 'Rapat adat membahas program desa', tgl: '05 AGT 2025' },
  { nama: 'Baliean Adat', sub: 'Upacara pembersihan kampung', tgl: '20 AGT 2025' },
];

// Aspirasi masyarakat adat
const aspirasi = [
  { judul: 'Pelestarian Bahasa Dayak Kenyah', kategori: 'Bahasa', status: 'Diproses', tgl: '16/06/2025', statusColor: 'bg-blue-100 text-blue-700' },
  { judul: 'Pembangunan Balai Adat', kategori: 'Kelembagaan', status: 'Diproses', tgl: '15/06/2025', statusColor: 'bg-blue-100 text-blue-700' },
  { judul: 'Perlindungan Hutan Adat', kategori: 'Lingkungan', status: 'Selesai', tgl: '14/06/2025', statusColor: 'bg-green-100 text-green-700' },
  { judul: 'Pengembangan Kerajinan Lokal', kategori: 'Ekonomi', status: 'Diproses', tgl: '13/06/2025', statusColor: 'bg-blue-100 text-blue-700' },
  { judul: 'Program Pendidikan Budaya Lokal', kategori: 'Pendidikan', status: 'Diproses', tgl: '12/06/2025', statusColor: 'bg-blue-100 text-blue-700' },
];

// Siklus peran lembaga adat
const siklusPeran = [
  { no: 1, judul: 'Assessment', sub: 'Kondisi desa (Readiness, Maturity, QoL, Budaya)', icon: ClipboardList, done: true },
  { no: 2, judul: 'Validasi Nilai Adat', sub: 'Memastikan kesesuaian program dengan nilai adat', icon: ShieldCheck, done: true, tgl: '08/06/2025' },
  { no: 3, judul: 'Rekomendasi Adat', sub: 'Memberikan masukan rekomendasi berbasis kearifan lokal', icon: BookOpen, done: true },
  { no: 4, judul: 'Implementasi Program', sub: 'Program dilaksanakan dengan memperhatikan nilai adat', icon: Zap, active: true },
  { no: 5, judul: 'Monitoring Dampak Budaya', sub: 'Memantau dampak program terhadap budaya dan kearifan lokal', icon: Activity, done: false },
  { no: 6, judul: 'Evaluasi & Perbaikan', sub: 'Evaluasi bersama untuk keberlanjutan budaya dan pembangunan', icon: TrendingUp, done: false },
  { no: 7, judul: 'Reassessment', sub: 'Penilaian ulang untuk peningkatan berkelanjutan', icon: RefreshCw, done: false },
];

// ─── HELPER COMPONENTS ────────────────────────────────────────────────────────

function SectionHeader({ title, href, label = 'Lihat Semua →' }: { title: string; href?: string; label?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">{title}</h3>
      {href && (
        <Link href={href} className="text-[11px] font-semibold text-amber-700 hover:text-amber-900 transition-colors">
          {label}
        </Link>
      )}
    </div>
  );
}

function ScoreBadge({ kategori }: { kategori: string }) {
  const map: Record<string, string> = {
    'Tinggi': 'bg-green-100 text-green-700',
    'Sedang': 'bg-yellow-100 text-yellow-700',
    'Rendah': 'bg-red-100 text-red-700',
  };
  return <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${map[kategori] ?? 'bg-gray-100 text-gray-600'}`}>{kategori}</span>;
}

function ProgressBar({ value, max = 100, color = '#5c3d11' }: { value: number; max?: number; color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, backgroundColor: color }} />
      </div>
      <span className="text-[10px] text-gray-500 w-8 text-right">{value.toFixed(1)}</span>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function AdatDashboardPage() {
  return (
    <div className="flex flex-col gap-4 pb-8">

      {/* ── WELCOME + PENGUMUMAN ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Welcome banner */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden relative shadow-md"
          style={{ background: 'linear-gradient(135deg, #5c3d11 0%, #92400e 50%, #b45309 100%)' }}>
          <div className="p-5 flex items-center justify-between gap-4 text-white relative z-10">
            <div className="flex-1">
              <h2 className="text-lg font-black leading-tight mb-1">Selamat datang, Ketua Lembaga Adat 🏛️</h2>
              <p className="text-sm text-amber-100 leading-relaxed">
                Berikut ringkasan kondisi ketahanan budaya dan kearifan lokal<br />
                Desa Lung Anai untuk mendukung Smart Living Village berbasis nilai adat.
              </p>
            </div>
            <div className="hidden sm:flex items-center justify-center w-36 h-24 rounded-xl bg-white/10 border border-white/20 overflow-hidden flex-shrink-0">
              <div className="text-center">
                <div className="text-4xl">🏠</div>
                <p className="text-[10px] font-bold mt-1 text-amber-100">DESA LUNG ANAI</p>
              </div>
            </div>
          </div>
          {/* Dekorasi batik */}
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/5" />
          <div className="absolute -left-4 -bottom-6 w-24 h-24 rounded-full bg-white/5" />
        </div>

        {/* Pengumuman & Informasi Adat */}
        <div className="rounded-xl border border-amber-200 bg-white shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Pengumuman &amp; Informasi Adat</p>
            <Link href="/adat/kalender-adat" className="text-[11px] font-semibold text-amber-700 hover:text-amber-900">Lihat Semua →</Link>
          </div>
          <div className="space-y-2">
            {pengumuman.map((n) => {
              const iconMap = {
                event: <Calendar size={13} className="text-amber-600 flex-shrink-0 mt-0.5" />,
                info: <Info size={13} className="text-blue-500 flex-shrink-0 mt-0.5" />,
                warning: <AlertTriangle size={13} className="text-orange-500 flex-shrink-0 mt-0.5" />,
              };
              return (
                <div key={n.id} className="flex items-start gap-2 p-2 rounded-lg bg-amber-50 border border-amber-100">
                  {iconMap[n.type as keyof typeof iconMap]}
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-gray-700 leading-snug">{n.teks}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{n.tgl}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── KARTU INDEKS ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Readiness Index */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: '#5c3d11' }}>
              <BarChart2 size={12} className="text-white" />
            </div>
            <span className="text-[10px] font-semibold text-gray-500 uppercase leading-none">Readiness Index</span>
          </div>
          <p className="text-2xl font-black text-gray-900">74,20</p>
          <p className="text-[10px] text-gray-500">Kategori</p>
          <span className="text-[11px] font-bold text-amber-700">Siap</span>
          <Link href="/adat/monitoring-ketahanan-budaya" className="text-[10px] text-amber-600 hover:underline mt-1">Lihat Detail →</Link>
        </div>

        {/* Cultural Resilience Index */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: '#92400e' }}>
              <Landmark size={12} className="text-white" />
            </div>
            <span className="text-[10px] font-semibold text-gray-500 uppercase leading-none">Cultural Resilience Index</span>
          </div>
          <p className="text-2xl font-black text-gray-900">72,80</p>
          <p className="text-[10px] text-gray-500">Kategori</p>
          <span className="text-[11px] font-bold text-amber-600">Tinggi</span>
          <Link href="/adat/monitoring-ketahanan-budaya" className="text-[10px] text-amber-600 hover:underline mt-1">Lihat Detail →</Link>
        </div>

        {/* Local Wisdom Index */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: '#276749' }}>
              <BookOpen size={12} className="text-white" />
            </div>
            <span className="text-[10px] font-semibold text-gray-500 uppercase leading-none">Local Wisdom Index</span>
          </div>
          <p className="text-2xl font-black text-gray-900">75,60</p>
          <p className="text-[10px] text-gray-500">Kategori</p>
          <span className="text-[11px] font-bold text-green-700">Tinggi</span>
          <Link href="/adat/monitoring-kearifan-lokal" className="text-[10px] text-amber-600 hover:underline mt-1">Lihat Detail →</Link>
        </div>

        {/* Program Terverifikasi Adat */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
              <ShieldCheck size={12} className="text-white" />
            </div>
            <span className="text-[10px] font-semibold text-gray-500 uppercase leading-none">Program Terverifikasi Adat</span>
          </div>
          <p className="text-2xl font-black text-gray-900">11</p>
          <p className="text-[10px] text-gray-500">Program</p>
          <span className="text-[11px] font-bold text-blue-600">&nbsp;</span>
          <Link href="/adat/validasi-program-desa" className="text-[10px] text-amber-600 hover:underline mt-1">Lihat Detail →</Link>
        </div>

        {/* Kegiatan Adat Aktif */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-6 h-6 rounded-md bg-purple-600 flex items-center justify-center">
              <Calendar size={12} className="text-white" />
            </div>
            <span className="text-[10px] font-semibold text-gray-500 uppercase leading-none">Kegiatan Adat Aktif</span>
          </div>
          <p className="text-2xl font-black text-gray-900">8</p>
          <p className="text-[10px] text-gray-500">Kegiatan</p>
          <span className="text-[11px] font-bold text-purple-600">&nbsp;</span>
          <Link href="/adat/kalender-adat" className="text-[10px] text-amber-600 hover:underline mt-1">Lihat Detail →</Link>
        </div>

        {/* Aspirasi Masuk */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-6 h-6 rounded-md bg-rose-600 flex items-center justify-center">
              <MessageSquare size={12} className="text-white" />
            </div>
            <span className="text-[10px] font-semibold text-gray-500 uppercase leading-none">Aspirasi Masuk</span>
          </div>
          <p className="text-2xl font-black text-gray-900">14</p>
          <p className="text-[10px] text-gray-500">Masukan</p>
          <span className="text-[11px] font-bold text-rose-600">&nbsp;</span>
          <Link href="/adat/aspirasi-masyarakat-adat" className="text-[10px] text-amber-600 hover:underline mt-1">Lihat Detail →</Link>
        </div>
      </div>

      {/* ── MONITORING BUDAYA + KEARIFAN + VALIDASI + DAMPAK ────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

        {/* Monitoring Ketahanan Budaya — Radar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Monitoring Ketahanan Budaya" href="/adat/monitoring-ketahanan-budaya" label="Lihat Detail Ketahanan Budaya →" />
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="#fde68a" />
              <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 9, fill: '#78350f' }} />
              <PolarRadiusAxis angle={30} domain={[60, 85]} tick={{ fontSize: 8, fill: '#a16207' }} />
              <Radar name="Nilai" dataKey="nilai" stroke="#92400e" fill="#92400e" fillOpacity={0.25} strokeWidth={2} />
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} formatter={(v: any) => [`${v}`, 'Nilai']} />
            </RadarChart>
          </ResponsiveContainer>
          <Link href="/adat/monitoring-ketahanan-budaya" className="mt-1 flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-900 font-semibold">
            Lihat Detail Ketahanan Budaya <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Monitoring Kearifan Lokal */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Monitoring Kearifan Lokal" href="/adat/monitoring-kearifan-lokal" />
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-1.5 pr-2 text-[10px] font-bold text-gray-400 uppercase">Dimensi</th>
                <th className="text-left py-1.5 pr-1 text-[10px] font-bold text-gray-400 uppercase">Skor</th>
                <th className="text-left py-1.5 text-[10px] font-bold text-gray-400 uppercase">Kategori</th>
              </tr>
            </thead>
            <tbody>
              {kearifanLokal.map((row, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2 pr-2 font-medium text-gray-700 leading-snug" style={{ maxWidth: 100, whiteSpace: 'normal' }}>
                    {row.dimensi}
                  </td>
                  <td className="py-2 pr-2">
                    <ProgressBar value={row.skor} color="#92400e" />
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    <ScoreBadge kategori={row.kategori} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/adat/monitoring-kearifan-lokal" className="mt-3 flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-900 font-semibold">
            Lihat Detail Kearifan Lokal <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Validasi Program Desa */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Validasi Program Desa oleh Lembaga Adat" href="/adat/validasi-program-desa" />
          <div className="space-y-2">
            {validasiProgram.map((row, i) => (
              <div key={i} className="p-2 border border-gray-100 rounded-lg">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-[11px] font-semibold text-gray-800 leading-snug">{row.program}</p>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap flex-shrink-0 ${row.statusColor}`}>
                    {row.status}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 leading-snug">{row.ket}</p>
              </div>
            ))}
          </div>
          <Link href="/adat/validasi-program-desa" className="mt-3 flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-900 font-semibold">
            Lihat Semua Validasi Program <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Dampak Program terhadap Budaya */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Dampak Program terhadap Budaya" href="/adat/dampak-program-budaya" label="Lihat Analisis Dampak →" />
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-1.5 pr-2 text-[10px] font-bold text-gray-400 uppercase">Program</th>
                <th className="text-left py-1.5 pr-2 text-[10px] font-bold text-amber-600 uppercase">Dampak Budaya</th>
                <th className="text-left py-1.5 text-[10px] font-bold text-gray-400 uppercase">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {dampakProgram.map((row, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2 pr-2 font-medium text-gray-700 leading-snug" style={{ maxWidth: 90, whiteSpace: 'normal' }}>{row.program}</td>
                  <td className="py-2 pr-2 font-black text-amber-700 whitespace-nowrap">{row.dampak}</td>
                  <td className="py-2 text-[10px] text-gray-400 leading-snug">{row.ket}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/adat/dampak-program-budaya" className="mt-3 flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-900 font-semibold">
            Lihat Analisis Dampak <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>

      {/* ── DOKUMENTASI + KALENDER + ASPIRASI ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Dokumentasi Adat Terbaru */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Dokumentasi Adat Terbaru" href="/adat/arsip" />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {dokumentasi.map((dok, i) => (
              <div key={i} className="flex-shrink-0 w-24">
                <div className="w-24 h-20 rounded-lg flex items-center justify-center text-3xl mb-1.5"
                  style={{ backgroundColor: '#fef3c7', border: '1px solid #fde68a' }}>
                  {dok.emoji}
                </div>
                <p className="text-[10px] font-semibold text-gray-700 leading-tight truncate">{dok.judul}</p>
                <p className="text-[9px] text-gray-400">{dok.tgl}</p>
                <span className={`inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded mt-0.5 ${
                  dok.tipe === 'Video' ? 'bg-red-100 text-red-700' :
                  dok.tipe === 'Dokumen' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {dok.tipe === 'Video' ? <Film size={8} /> : dok.tipe === 'Dokumen' ? <FileText size={8} /> : <Image size={8} />}
                  {dok.tipe}
                </span>
              </div>
            ))}
          </div>
          <Link href="/adat/arsip" className="mt-3 flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-900 font-semibold">
            Lihat Semua Dokumentasi <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Kalender Adat */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Kalender Adat" href="/adat/kalender-adat" label="Lihat Kalender Lengkap →" />
          <div className="space-y-2">
            {kalenderAdat.map((kal, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 border border-amber-100 rounded-lg bg-amber-50">
                <div className="flex-shrink-0 text-center w-12 p-1 rounded-lg bg-amber-100">
                  <p className="text-[9px] font-bold text-amber-700 leading-none">
                    {kal.tgl.split(' ')[1]} {kal.tgl.split(' ')[2]}
                  </p>
                  <p className="text-base font-black text-amber-800 leading-none mt-0.5">
                    {kal.tgl.split(' ')[0]}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-gray-800 leading-snug">{kal.nama}</p>
                  <p className="text-[10px] text-gray-500 leading-snug">{kal.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aspirasi Masyarakat Adat */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Aspirasi Masyarakat Adat" href="/adat/aspirasi-masyarakat-adat" />
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-1.5 pr-1 text-[10px] font-bold text-gray-400 uppercase">Aspirasi</th>
                <th className="text-left py-1.5 pr-1 text-[10px] font-bold text-gray-400 uppercase">Kategori</th>
                <th className="text-left py-1.5 pr-1 text-[10px] font-bold text-gray-400 uppercase">Status</th>
                <th className="text-left py-1.5 text-[10px] font-bold text-gray-400 uppercase">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {aspirasi.map((row, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2 pr-1 font-medium text-gray-700 leading-snug" style={{ maxWidth: 100, whiteSpace: 'normal' }}>{row.judul}</td>
                  <td className="py-2 pr-1 text-gray-500 whitespace-nowrap">{row.kategori}</td>
                  <td className="py-2 pr-1 whitespace-nowrap">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${row.statusColor}`}>{row.status}</span>
                  </td>
                  <td className="py-2 text-[10px] text-gray-400 whitespace-nowrap">{row.tgl}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/adat/aspirasi-masyarakat-adat" className="mt-3 flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-900 font-semibold">
            Lihat Semua Aspirasi <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>

      {/* ── SIKLUS PERAN LEMBAGA ADAT ────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-amber-200 shadow-sm p-5">
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">
          Peran Lembaga Adat dalam Siklus Smart Living Village
        </h3>
        <div className="flex flex-wrap items-start gap-0">
          {siklusPeran.map((step, i) => {
            const Icon = step.icon;
            const isActive = step.active;
            const isDone = step.done;
            const isLast = i === siklusPeran.length - 1;
            return (
              <div key={i} className="flex items-center gap-0 flex-1 min-w-0">
                <div className="flex flex-col items-center text-center flex-shrink-0 w-24 sm:w-28">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-2 border-2 transition-all ${
                    isActive
                      ? 'border-amber-600 shadow-amber-200 shadow-md'
                      : isDone
                      ? 'border-green-500'
                      : 'bg-gray-100 border-gray-200'
                  }`} style={isActive ? { backgroundColor: '#92400e' } : isDone ? { backgroundColor: '#276749' } : {}}>
                    {isDone && !isActive
                      ? <CheckCircle2 size={16} className="text-white" />
                      : <Icon size={16} className={isActive || isDone ? 'text-white' : 'text-gray-400'} />
                    }
                  </div>
                  <p className={`text-[10px] font-bold leading-tight mb-0.5 ${
                    isActive ? 'text-amber-800' : isDone ? 'text-green-700' : 'text-gray-400'
                  }`}>
                    {i + 1}. {step.judul}
                  </p>
                  {'tgl' in step && step.tgl && (
                    <p className="text-[9px] text-amber-600 font-semibold">{step.tgl}</p>
                  )}
                  <p className="text-[9px] text-gray-400 leading-snug hidden sm:block">{step.sub}</p>
                </div>
                {!isLast && (
                  <div className="flex-1 flex items-center justify-center pb-6">
                    <div className={`h-0.5 w-full ${isDone ? 'bg-green-300' : 'bg-gray-200'}`} />
                    <ChevronRight size={12} className={`flex-shrink-0 -ml-1 ${isDone ? 'text-green-400' : 'text-gray-300'}`} />
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
