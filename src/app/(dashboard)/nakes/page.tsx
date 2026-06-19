'use client';

import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  AlertTriangle, CheckCircle2, Info, ArrowUpRight, ChevronRight,
  Activity, ShieldCheck, FileText, TrendingUp, RefreshCw, Award,
  Target, Zap, Calendar, Users, HeartPulse, Baby,
  Stethoscope, ClipboardList, BarChart2, Camera, Film, Image,
} from 'lucide-react';

// ─── Warna tema Nakes ────────────────────────────────────────────────────────
const C = {
  primary: '#276749',
  secondary: '#2f855a',
  light: '#c6f6d5',
  red: '#c53030',
  orange: '#c05621',
  blue: '#2b6cb0',
};

// ─── DATA MOCK ───────────────────────────────────────────────────────────────

const pengumumanKesehatan = [
  { id: 1, teks: 'Posyandu Balita Bulan Juni: Akan dilaksanakan 12 Juni 2025', tgl: '08/06/2025' },
  { id: 2, teks: 'Pemeriksaan IVA Test Gratis: Untuk Ibu Usia 30-50 Tahun', tgl: '07/06/2025' },
  { id: 3, teks: 'Edukasi Ganti Tangan Pakai Sabun: Di Sekolah Dasar Desa Lung Anai', tgl: '05/06/2025' },
  { id: 4, teks: 'Vaksinasi Campak Rubella (MR): Untuk Anak Usia 9 Bulan - 12 Tahun', tgl: '03/06/2025' },
  { id: 5, teks: 'Fogging Pencegahan DBD: Di Wilayah RT 02 dan RT 03', tgl: '01/06/2025' },
];

// Radar monitoring kesehatan masyarakat
const radarKesehatan = [
  { aspek: 'Gizi Masyarakat', nilai: 72 },
  { aspek: 'Sanitasi Lingkungan', nilai: 68 },
  { aspek: 'Air Bersih', nilai: 75 },
  { aspek: 'Pelayanan Kesehatan', nilai: 76 },
  { aspek: 'Kesehatan Ibu & Anak', nilai: 78 },
  { aspek: 'Kesehatan Lansia', nilai: 71 },
];

// Program Kesehatan Desa
const programKesehatan = [
  { program: 'Posyandu Digital', kategori: 'Ibu & Anak', status: 'Berjalan', progress: 70, target: '30/07/2025' },
  { program: 'Pencegahan Stunting', kategori: 'Gizi', status: 'Berjalan', progress: 60, target: '30/08/2025' },
  { program: 'Sanitasi Sehat', kategori: 'Lingkungan', status: 'Berjalan', progress: 65, target: '30/08/2025' },
  { program: 'Pemeriksaan Gratis', kategori: 'Edukasi', status: 'Berjalan', progress: 40, target: '15/06/2025' },
  { program: 'Imunisasi Lengkap', kategori: 'Lansia', status: 'Berjalan', progress: 55, target: '31/07/2025' },
  { program: 'Penyuluhan PHBS', kategori: 'Edukasi', status: 'Berjalan', progress: 70, target: '31/07/2025' },
];

// Dampak Kesehatan terhadap Indeks
const dampakKesehatan = [
  { program: 'Posyandu Digital', readiness: '+2,40', qol: '-3,50', maturity: '-0,40' },
  { program: 'Pencegahan Stunting', readiness: '+1,80', qol: '+4,20', maturity: '+0,30' },
  { program: 'Sanitasi Sehat', readiness: '+2,50', qol: '+2,00', maturity: '+0,30' },
  { program: 'Edukasi Gizi Seimbang', readiness: '+1,50', qol: '+2,50', maturity: '+0,15' },
  { program: 'Imunisasi Lengkap', readiness: '+1,70', qol: '+3,20', maturity: '+0,25' },
  { program: 'Kesehatan Lansia', readiness: '+1,20', qol: '+2,50', maturity: '+0,15' },
  { program: 'Penyuluhan PHBS', readiness: '+1,60', qol: '+2,90', maturity: '+0,20' },
];

// Monitoring Stunting
const stuntingTrend = [
  { bln: 'Jan 25', persen: 20.1 },
  { bln: 'Feb 25', persen: 18.3 },
  { bln: 'Mar 25', persen: 15.6 },
  { bln: 'Apr 25', persen: 12.4 },
  { bln: 'Mei 25', persen: 13.4 },
  { bln: 'Jun 25', persen: 12.4 },
];

// Rekomendasi DSS Bidang Kesehatan
const rekomendasiDSS = [
  { no: 1, rekomendasi: 'Penguatan Stunting', deskripsi: 'Peningkatan intervensi gizi spesifik dan sensitif pada 1000 HPK', status: 'Berjalan', prioritas: 'Tinggi' },
  { no: 2, rekomendasi: 'Sanitasi Berkesinamb.', deskripsi: 'Pembangunan akses sanitasi layak menyeluruh', status: 'Berjalan', prioritas: 'Tinggi' },
  { no: 3, rekomendasi: 'Kesehatan Desa', deskripsi: 'Implementasi layanan telemedicine dan digital', status: 'Berjalan', prioritas: 'Tinggi' },
  { no: 4, rekomendasi: 'Kader Posyandu Digital', deskripsi: 'Pelatihan kader posyandu berbasis digital dan inovasi', status: 'Berjalan', prioritas: 'Sedang' },
  { no: 5, rekomendasi: 'PHBS', deskripsi: 'Edukasi gizi monitoring dan pencegahan penyakit menular', status: 'Berjalan', prioritas: 'Sedang' },
];

// Health Gap Analysis
const gapAnalysis = [
  { dimensi: 'Stunting Rate', saat: '12,4%', target: '10,0%', gap: '2,4%', prioritas: 'Tinggi' },
  { dimensi: 'Sanitasi Layak', saat: '68%', target: '85%', gap: '17%', prioritas: 'Tinggi' },
  { dimensi: 'Cakupan Posyandu', saat: '78%', target: '90%', gap: '12%', prioritas: 'Tinggi' },
  { dimensi: 'Air Bersih Layak', saat: '75%', target: '90%', gap: '15%', prioritas: 'Sedang' },
  { dimensi: 'Pelayanan Kesehatan', saat: '72%', target: '90%', gap: '18%', prioritas: 'Sedang' },
  { dimensi: 'Kesehatan Ibu Hamil', saat: '82%', target: '90%', gap: '8%', prioritas: 'Sedang' },
  { dimensi: 'Kesehatan Lansia', saat: '71%', target: '85%', gap: '14%', prioritas: 'Sedang' },
];

// Posyandu Digital
const posyanduData = {
  jadwal: { tgl: '12 JUN', waktu: '08.00 - 11.00 WITA', sisa: '3 Hari Lagi', lokasi: 'Posyandu Melati, Dusun Lung Anai' },
  kunjungan: { target: 142, persen: '18% dari target' },
  statusBalita: [
    { name: 'Sehat', value: 109, persen: '88%', color: '#276749' },
    { name: 'Gizi Buruk', value: 3, persen: '2.17%', color: '#c53030' },
    { name: 'Risiko Tinggi', value: 9, persen: '7.24%', color: '#c05621' },
    { name: 'Perlu Pantau', value: 3, persen: '1.99%', color: '#d69e2e' },
  ],
};

// Target QoL Kesehatan
const targetQoL = [
  { tahun: '2024\n(Capai)', readiness: 72, qol: 74 },
  { tahun: '2025\n(Target)', readiness: 76, qol: 78 },
  { tahun: '2026\n(Target)', readiness: 80, qol: 82 },
  { tahun: '2027\n(Target)', readiness: 85, qol: 87 },
];

// Dokumentasi Kesehatan
const dokumentasi = [
  { judul: 'Posyandu Melati', tgl: '03/06/2025', tipe: 'Foto', emoji: '🏥' },
  { judul: 'Edukasi Gizi', tgl: '01/06/2025', tipe: 'Foto', emoji: '🥗' },
  { judul: 'Penyuluhan PHBS', tgl: '28/05/2025', tipe: 'Video', emoji: '🧼' },
  { judul: 'Pemeriksaan Nik', tgl: '25/05/2025', tipe: 'Dokumen', emoji: '📋' },
];

// Siklus SLV Bidang Kesehatan
const siklusKesehatan = [
  { no: 1, judul: 'Assessment Kesehatan', sub: 'Pengumpulan data dan kondisi kesehatan masyarakat', icon: ClipboardList, done: true },
  { no: 2, judul: 'Analisis & DSS Kesehatan', sub: 'Analisis data dan rekomendasi prioritas kesehatan', icon: BarChart2, done: true },
  { no: 3, judul: 'Program Kesehatan', sub: 'Implementasi program berbasis rekomendasi DSS', icon: HeartPulse, done: true },
  { no: 4, judul: 'Monitoring & Intervensi', sub: 'Monitoring berkala dan intervensi tepat sasaran', icon: Activity, active: true },
  { no: 5, judul: 'Evaluasi QoL Kesehatan', sub: 'Evaluasi dampak terhadap kualitas hidup masyarakat', icon: TrendingUp, done: false },
  { no: 6, judul: 'Reassessment', sub: 'Penilaian ulang untuk perbaikan berkelanjutan', icon: RefreshCw, done: false },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function SectionHeader({ title, href, label = 'Lihat Semua →' }: { title: string; href?: string; label?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">{title}</h3>
      {href && <Link href={href} className="text-[11px] font-semibold text-green-700 hover:text-green-900 transition-colors">{label}</Link>}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = { 'Berjalan': 'bg-green-100 text-green-700', 'Selesai': 'bg-blue-100 text-blue-700', 'Belum Dimulai': 'bg-gray-100 text-gray-500' };
  return <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap ${map[status] ?? 'bg-gray-100 text-gray-500'}`}>{status}</span>;
}

function PriorityBadge({ p }: { p: string }) {
  const map: Record<string, string> = { 'Tinggi': 'bg-red-100 text-red-700', 'Sedang': 'bg-yellow-100 text-yellow-700' };
  return <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap ${map[p] ?? 'bg-gray-100 text-gray-500'}`}>{p}</span>;
}

function ProgressBar({ value, color = '#276749' }: { value: number; color?: string }) {
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

export default function NakesDashboardPage() {
  return (
    <div className="flex flex-col gap-4 pb-8">

      {/* ── WELCOME + PENGUMUMAN ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Welcome banner */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden relative shadow-md bg-gradient-to-br from-green-800 via-green-700 to-green-500">
          <div className="p-5 flex items-center justify-between gap-4 text-white relative z-10">
            <div className="flex-1">
              <h2 className="text-lg font-black leading-tight mb-1">Selamat datang, Tenaga Kesehatan Desa Lung Anai 🩺</h2>
              <p className="text-sm text-green-100 leading-relaxed">
                Berikut ringkasan kondisi kesehatan masyarakat dan kualitas hidup<br />
                untuk mendukung peningkatan derajat kesehatan Desa Lung Anai.
              </p>
            </div>
            <div className="hidden sm:flex items-center justify-center w-36 h-24 rounded-xl bg-white/10 border border-white/20 flex-shrink-0">
              <div className="text-center">
                <div className="text-4xl">🏥</div>
                <p className="text-[10px] font-bold mt-1 text-green-100">PUSKESMAS LUNG ANAI</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/5" />
          <div className="absolute -left-4 -bottom-6 w-24 h-24 rounded-full bg-white/5" />
        </div>

        {/* Pengumuman Kesehatan */}
        <div className="rounded-xl border border-green-200 bg-white shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Pengumuman Kesehatan</p>
            <Link href="/nakes/kalender-kesehatan" className="text-[11px] font-semibold text-green-700 hover:text-green-900">Lihat Semua →</Link>
          </div>
          <div className="space-y-2">
            {pengumumanKesehatan.map((n) => (
              <div key={n.id} className="flex items-start gap-2 p-2 rounded-lg bg-green-50 border border-green-100">
                <div className="w-5 h-5 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <HeartPulse size={10} className="text-green-700" />
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
          { label: 'Health Readiness Index', value: '72,60', sub: 'Kategori', cat: 'Baik', icon: BarChart2, color: '#276749', href: '/nakes/monitoring-kesehatan' },
          { label: 'Quality of Life Index', value: '74,30', sub: 'Kategori', cat: 'Baik', icon: TrendingUp, color: '#2f855a', href: '/nakes/target-qol-kesehatan' },
          { label: 'Stunting Rate', value: '12,4%', sub: 'Kategori', cat: 'Sedang', icon: AlertTriangle, color: '#c05621', href: '/nakes/stunting' },
          { label: 'Posyandu Coverage', value: '78,5%', sub: 'Kategori', cat: 'Baik', icon: HeartPulse, color: '#2b6cb0', href: '/nakes/posyandu' },
          { label: 'Ibu Hamil Terpantau', value: '86', sub: 'Orang', cat: '', icon: Baby, color: '#805ad5', href: '/nakes/ibu-hamil' },
          { label: 'Program Kesehatan Aktif', value: '12', sub: 'Program', cat: '', icon: Stethoscope, color: '#276749', href: '/nakes/program-kesehatan-desa' },
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
              {card.cat && <span className={`text-[11px] font-bold ${card.cat === 'Sedang' ? 'text-orange-600' : 'text-green-700'}`}>{card.cat}</span>}
              <Link href={card.href} className="text-[10px] text-green-600 hover:underline mt-1">Lihat Detail →</Link>
            </div>
          );
        })}
      </div>

      {/* ── MONITORING KESEHATAN + PROGRAM + DAMPAK ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Monitoring Kesehatan Masyarakat — Radar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Monitoring Kesehatan Masyarakat" href="/nakes/monitoring-kesehatan" label="Lihat Detail →" />
          <ResponsiveContainer width="100%" height={210}>
            <RadarChart data={radarKesehatan} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="#c6f6d5" />
              <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 9, fill: '#276749' }} />
              <PolarRadiusAxis angle={30} domain={[60, 85]} tick={{ fontSize: 8, fill: '#48bb78' }} />
              <Radar name="Skor" dataKey="nilai" stroke="#276749" fill="#276749" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} formatter={(v: any) => [`${v}`, 'Skor']} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-1 text-[10px] text-gray-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-600" /> Skor Saat Ini</span>
            <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-green-300" /> Skor Ideal</span>
          </div>
        </div>

        {/* Program Kesehatan Desa */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Program Kesehatan Desa" href="/nakes/program-kesehatan-desa" />
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
                {programKesehatan.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-1.5 pr-1 font-medium text-gray-700 leading-snug" style={{ maxWidth: 90, whiteSpace: 'normal' }}>{row.program}</td>
                    <td className="py-1.5 pr-1 text-[10px] text-gray-500 whitespace-nowrap">{row.kategori}</td>
                    <td className="py-1.5 pr-1"><StatusBadge status={row.status} /></td>
                    <td className="py-1.5 pr-1 w-16"><ProgressBar value={row.progress} /></td>
                    <td className="py-1.5 text-[10px] text-gray-400 whitespace-nowrap">{row.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dampak Kesehatan terhadap Indeks */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Dampak Kesehatan terhadap Indeks" href="/nakes/target-qol-kesehatan" label="Lihat Analisis →" />
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-1.5 pr-1 text-[9px] font-bold text-gray-400 uppercase">Program Kesehatan</th>
                <th className="text-center py-1.5 pr-1 text-[9px] font-bold text-green-600 uppercase">Dampak ke Readiness</th>
                <th className="text-center py-1.5 pr-1 text-[9px] font-bold text-blue-600 uppercase">Dampak ke QoL</th>
                <th className="text-center py-1.5 text-[9px] font-bold text-purple-600 uppercase">Dampak ke Maturity</th>
              </tr>
            </thead>
            <tbody>
              {dampakKesehatan.map((row, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-1.5 pr-1 font-medium text-gray-700 leading-snug" style={{ maxWidth: 90, whiteSpace: 'normal' }}>{row.program}</td>
                  <td className="py-1.5 pr-1 text-center font-bold text-green-700 whitespace-nowrap">{row.readiness}</td>
                  <td className="py-1.5 pr-1 text-center font-bold whitespace-nowrap" style={{ color: row.qol.startsWith('-') ? '#c53030' : '#2b6cb0' }}>{row.qol}</td>
                  <td className="py-1.5 text-center font-bold whitespace-nowrap" style={{ color: row.maturity.startsWith('-') ? '#c53030' : '#6a1b9a' }}>{row.maturity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── STUNTING + DSS + GAP ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Monitoring Stunting */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Monitoring Stunting" href="/nakes/stunting" label="Lihat Detail →" />
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[
              { label: 'Balita Terdaftar', value: '186', sub: 'Anak', icon: Baby, color: '#276749' },
              { label: 'Balita Stunting', value: '23', sub: 'Anak', icon: AlertTriangle, color: '#c05621' },
              { label: 'Risiko Tinggi', value: '17', sub: 'Anak', icon: AlertTriangle, color: '#c53030' },
              { label: 'Intervensi Aktif', value: '21', sub: 'Anak', icon: HeartPulse, color: '#2b6cb0' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="text-center p-2 bg-gray-50 rounded-lg">
                  <Icon size={14} className="mx-auto mb-1" style={{ color: s.color }} />
                  <p className="text-lg font-black text-gray-900">{s.value}</p>
                  <p className="text-[9px] text-gray-400">{s.sub}</p>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-gray-400 mb-1 font-semibold uppercase">Tren Stunting (%)</p>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={stuntingTrend} margin={{ top: 0, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fff4" />
              <XAxis dataKey="bln" tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[8, 25]} tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} formatter={(v: any) => [`${v}%`, 'Stunting']} />
              <Line type="monotone" dataKey="persen" stroke="#c53030" strokeWidth={2} dot={{ r: 3, fill: '#c53030' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Rekomendasi DSS Bidang Kesehatan */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Rekomendasi DSS Bidang Kesehatan" href="/nakes/dss-kesehatan" />
          <div className="space-y-2">
            {rekomendasiDSS.map((row, i) => (
              <div key={i} className="p-2 border border-gray-100 rounded-lg">
                <div className="flex items-start gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-green-600 text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">{row.no}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-gray-800 leading-snug">{row.rekomendasi}</p>
                    <p className="text-[10px] text-gray-400 leading-snug">{row.deskripsi}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-7">
                  <StatusBadge status={row.status} />
                  <PriorityBadge p={row.prioritas} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Gap Analysis */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Health Gap Analysis" href="/nakes/health-gap-analysis" label="Lihat Detail →" />
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-1.5 pr-1 text-[9px] font-bold text-gray-400 uppercase">Dimensi Kesehatan</th>
                <th className="text-center py-1.5 pr-1 text-[9px] font-bold text-green-600 uppercase">Saat Ini</th>
                <th className="text-center py-1.5 pr-1 text-[9px] font-bold text-blue-600 uppercase">Target</th>
                <th className="text-center py-1.5 pr-1 text-[9px] font-bold text-red-600 uppercase">Gap</th>
                <th className="text-center py-1.5 text-[9px] font-bold text-gray-400 uppercase">Prioritas</th>
              </tr>
            </thead>
            <tbody>
              {gapAnalysis.map((row, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-1.5 pr-1 font-medium text-gray-700 leading-snug">{row.dimensi}</td>
                  <td className="py-1.5 pr-1 text-center text-green-700 font-bold">{row.saat}</td>
                  <td className="py-1.5 pr-1 text-center text-blue-700 font-bold">{row.target}</td>
                  <td className="py-1.5 pr-1 text-center text-red-600 font-bold">{row.gap}</td>
                  <td className="py-1.5 text-center"><PriorityBadge p={row.prioritas} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── POSYANDU + TARGET QoL + DOKUMENTASI ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Posyandu Digital */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Posyandu Digital" href="/nakes/posyandu" label="Lihat Detail →" />
          <div className="flex gap-3 mb-3">
            {/* Jadwal */}
            <div className="flex-shrink-0 p-2 rounded-lg bg-green-50 border border-green-200 text-center w-20">
              <p className="text-xs font-black text-green-800 leading-none">{posyanduData.jadwal.tgl.split(' ')[0]}</p>
              <p className="text-[9px] font-bold text-green-600">{posyanduData.jadwal.tgl.split(' ')[1]}</p>
              <p className="text-[8px] text-green-500 mt-0.5">{posyanduData.jadwal.waktu}</p>
              <div className="mt-1 px-1 py-0.5 rounded bg-green-200 text-[8px] font-bold text-green-800">{posyanduData.jadwal.sisa}</div>
            </div>
            {/* Kunjungan donut */}
            <div className="flex-1 flex items-center gap-2">
              <div className="text-[10px] text-gray-500 space-y-1 flex-1">
                <p><span className="font-bold text-gray-700">{posyanduData.jadwal.lokasi}</span></p>
                <p>Kunjungan Bulan Ini: <span className="font-bold text-green-700">Target {posyanduData.kunjungan.target}</span></p>
                <p className="text-[9px] text-gray-400">{posyanduData.kunjungan.persen}</p>
              </div>
            </div>
          </div>
          {/* Status Balita donut */}
          <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Status Balita</p>
          <div className="flex items-center gap-3">
            <ResponsiveContainer width={90} height={90}>
              <PieChart>
                <Pie data={posyanduData.statusBalita} dataKey="value" cx="50%" cy="50%" innerRadius={25} outerRadius={40} stroke="none">
                  {posyanduData.statusBalita.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-1">
              {posyanduData.statusBalita.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-700">{item.value} ({item.persen})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Target QoL Kesehatan */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Target QoL Kesehatan" href="/nakes/target-qol-kesehatan" label="Lihat Detail →" />
          <p className="text-[10px] text-gray-400 mb-1">Health Readiness Index (Target)</p>
          <ResponsiveContainer width="100%" height={90}>
            <BarChart data={targetQoL} margin={{ top: 0, right: 5, left: -20, bottom: 0 }} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fff4" />
              <XAxis dataKey="tahun" tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 90]} tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} />
              <Bar dataKey="readiness" name="Readiness" fill="#276749" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-gray-400 mt-2 mb-1">Quality of Life Index - Kesehatan (Target)</p>
          <ResponsiveContainer width="100%" height={90}>
            <BarChart data={targetQoL} margin={{ top: 0, right: 5, left: -20, bottom: 0 }} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fff4" />
              <XAxis dataKey="tahun" tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 90]} tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} />
              <Bar dataKey="qol" name="QoL" fill="#2f855a" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Dokumentasi Kesehatan */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Dokumentasi Kesehatan" href="/nakes/dokumentasi-kesehatan" />
          <div className="grid grid-cols-2 gap-2">
            {dokumentasi.map((dok, i) => (
              <div key={i} className="rounded-lg border border-gray-100 overflow-hidden">
                <div className="w-full h-20 bg-green-50 flex items-center justify-center text-4xl">{dok.emoji}</div>
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
        </div>
      </div>

      {/* ── SIKLUS SLV BIDANG KESEHATAN ──────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-green-200 shadow-sm p-5">
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">
          Siklus Smart Living Village Bidang Kesehatan
        </h3>
        <div className="flex flex-wrap items-start gap-0">
          {siklusKesehatan.map((step, i) => {
            const Icon = step.icon;
            const isActive = step.active;
            const isDone = step.done;
            const isLast = i === siklusKesehatan.length - 1;
            return (
              <div key={i} className="flex items-center gap-0 flex-1 min-w-0">
                <div className="flex flex-col items-center text-center flex-shrink-0 w-24 sm:w-28">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-2 border-2 transition-all ${
                    isActive
                      ? 'bg-green-600 border-green-600 shadow-green-200 shadow-md'
                      : isDone
                      ? 'bg-green-500 border-green-500'
                      : 'bg-gray-100 border-gray-200'
                  }`}>
                    {isDone && !isActive
                      ? <CheckCircle2 size={16} className="text-white" />
                      : <Icon size={16} className={isActive || isDone ? 'text-white' : 'text-gray-400'} />
                    }
                  </div>
                  <p className={`text-[10px] font-bold leading-tight mb-0.5 ${isActive ? 'text-green-700' : isDone ? 'text-green-600' : 'text-gray-400'}`}>
                    {i + 1}. {step.judul}
                  </p>
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