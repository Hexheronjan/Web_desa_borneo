'use client';

import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  ArrowUpRight, CheckCircle2,
  FileText, TrendingUp, Database, BookOpen,
  ClipboardList, BarChart2, Users, Shield,
  Award, Star,
} from 'lucide-react';
import {
  DESA_BAB4,
  DIMENSI_BAB4,
  ARTEFAK_6_BAB4,
  PREPOST_6_KONSTRUK_BAB4,
  RUBRIK_KEMATANGAN_DIMENSI,
  LOG_4_MINGGU_BAB4,
} from '@/lib/bab4-data';

const radarReadiness = DIMENSI_BAB4.map((d) => ({
  aspek: d.singkat,
  jonggon: DESA_BAB4[0].dimensi[d.kode],
  kedang: DESA_BAB4[1].dimensi[d.kode],
  lung: DESA_BAB4[2].dimensi[d.kode],
}));

const maturityRubrik = DESA_BAB4.map((d, idx) => ({
  name: d.nama.replace('Desa ', ''),
  value: d.kematanganPasca,
  pra: d.kematanganPra,
  color: ['#2b6cb0', '#276749', '#c05621'][idx],
}));

const sdgRingkas = [
  { name: 'SDGs 3 Kesehatan', nilai: 82.24, awal: 74.70, color: '#276749' },
  { name: 'SDGs 4 Pendidikan', nilai: 74.90, awal: 66.68, color: '#2b6cb0' },
  { name: 'SDGs 18 Budaya & Adat', nilai: 84.86, awal: 76.92, color: '#6a1b9a' },
];

const expertValidation = [
  { validator: 'Pakar P1', bidang: 'Smart Village & SI', skor: 'S-CVI 1,000', status: 'RQ1 Valid' },
  { validator: 'Pakar P2', bidang: 'Tata Kelola & Desa', skor: 'CR 0,00144', status: 'RQ1 Valid' },
  { validator: 'Pakar P3', bidang: 'Budaya & Partisipasi', skor: 'A2–A6 Siap', status: 'Instrumen Siap' },
];

const distribusiBobotDimensi = DIMENSI_BAB4.map((d, idx) => ({
  name: `${d.kode} (${(d.bobot * 100).toFixed(1)}%)`,
  value: Number((d.bobot * 100).toFixed(2)),
  color: ['#1a365d', '#2b6cb0', '#276749', '#0694a2', '#553c9a', '#c05621'][idx],
}));

const repository = [
  { nama: 'Dataset SLV 1 (RQ1)', sub: '6 Dimensi, 24 Indikator, AHP & 126 Responden', jumlah: 3, icon: ClipboardList, color: '#2b6cb0' },
  { nama: 'Dataset SLV 2 (RQ2)', sub: 'DSS SAW 6 Kriteria, 30 Alternatif, Sensitivitas 39/39', jumlah: 4, icon: Database, color: '#276749' },
  { nama: 'Dataset SLV 3 (RQ3)', sub: '1.008 Tugas UAT, SUS, 504 Log 4 Minggu, 54 KPI SDGs', jumlah: 6, icon: Shield, color: '#553c9a' },
  { nama: '6 Artefak & 4 Diagram UML', sub: 'A1–A6, 35 Kelompok Fitur (F-001 s.d. F-035)', jumlah: 10, icon: FileText, color: '#c05621' },
];

const publikasi = [
  { tipe: 'Artikel Jurnal', jumlah: '2 Publikasi', icon: BookOpen, color: '#2b6cb0' },
  { tipe: 'Prosiding Konferensi', jumlah: '1 Publikasi', icon: Award, color: '#276749' },
  { tipe: 'Laporan Bab IV & Dataset v1.2', jumlah: '3 Paket Dataset', icon: FileText, color: '#553c9a' },
  { tipe: 'Sitasi', jumlah: '4 Sitasi', icon: Star, color: '#c05621' },
];

function SH({ title, href, label = 'Lihat Analisis Lengkap →' }: { title: string; href?: string; label?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">{title}</h3>
      {href && <Link href={href} className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors">{label}</Link>}
    </div>
  );
}

function SB({ status }: { status: string }) {
  const m: Record<string, string> = {
    'RQ1 Valid': 'bg-green-100 text-green-700',
    'Instrumen Siap': 'bg-amber-100 text-amber-700',
    'Terverifikasi': 'bg-blue-100 text-blue-700',
  };
  return <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap ${m[status] ?? 'bg-gray-100 text-gray-600'}`}>{status}</span>;
}

export default function PenelitiDashboardPage() {
  return (
    <div className="flex flex-col gap-4 pb-8">

      {/* ── WELCOME ──────────────────────────────────────────────────────── */}
      <div className="rounded-xl overflow-hidden relative shadow-md bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-700">
        <div className="p-5 flex items-center justify-between gap-4 text-white relative z-10">
          <div className="flex-1">
            <h2 className="text-xl font-black leading-tight mb-1">Selamat datang, Peneliti Smart Living Village</h2>
            <p className="text-sm text-blue-100">
              Dashboard Evaluasi &amp; Validasi Bab IV — 3 Desa Penelitian Kab. Kutai Kartanegara (Dataset SLV 1, SLV 2, SLV 3 v1.2)
            </p>
          </div>
          <div className="hidden sm:flex items-center justify-center w-44 h-20 rounded-xl bg-white/10 border border-white/20 flex-shrink-0 p-2 text-center">
            <div>
              <p className="text-[10px] font-bold text-blue-200">PENELITI · DSRM + IPO</p>
              <p className="text-[9px] text-blue-300 mt-0.5">N = 126 · 7 Peran × 18</p>
            </div>
          </div>
        </div>
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/5" />
      </div>

      {/* ── STAT CARDS ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { label: 'Desa Penelitian', value: '3 Desa', sub: 'Jonggon Jaya, Kedang Ipil, Lung Anai', icon: Users, color: '#1a365d' },
          { label: 'Partisipan Uji', value: '126', sub: '42/desa · 7 peran × 18', icon: Database, color: '#2b6cb0' },
          { label: 'Readiness (Pra→Pasca)', value: '60,45', sub: 'Pra 58,18 (p=0,0900 NS)', icon: BarChart2, color: '#276749' },
          { label: 'Kematangan (N=121)', value: '2,53', sub: 'Pra 1,94 · Berkembang', icon: TrendingUp, color: '#c05621' },
          { label: 'Manfaat Awal QoL', value: '69,97', sub: 'Pra 68,43 (Δ +1,54 sig)', icon: Award, color: '#553c9a' },
          { label: 'Panel Pakar', value: '3 Pakar', sub: 'P1–P3 · S-CVI 1,000', icon: Shield, color: '#c53030' },
          { label: 'Artefak DSRM', value: '6 Artefak', sub: 'A1–A6 · 35 Fitur UML', icon: CheckCircle2, color: '#276749' },
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
              <p className="text-xl font-black text-gray-900">{card.value}</p>
              <p className="text-[10px] text-gray-500 leading-snug">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* ── ANALISIS READINESS + MATURITY + SDGs/QoL + DSS ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

        {/* Analisis Readiness — Radar 6 Dimensi */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Analisis Readiness (D1–D6)" href="/peneliti/analisis-readiness" />
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={radarReadiness} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="#bee3f8" />
              <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 8, fill: '#1a365d' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
              <Radar name="Jonggon Jaya" dataKey="jonggon" stroke="#2b6cb0" fill="#2b6cb0" fillOpacity={0.18} strokeWidth={2} />
              <Radar name="Lung Anai" dataKey="lung" stroke="#c05621" fill="#c05621" fillOpacity={0.12} strokeWidth={2} />
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-1 p-2 bg-blue-50 rounded-lg text-[10px] text-gray-600">
            <p><span className="font-bold text-blue-700">Jonggon Jaya: 68,04</span> · <span className="font-bold text-green-700">Kedang Ipil: 58,11</span></p>
            <p className="mt-0.5"><span className="font-bold text-orange-700">Lung Anai: 48,39</span> (D5 Adat tertinggi: 89,73)</p>
            <p>CR Dimensi AHP: <span className="font-semibold">0,00144 (&lt; 0,10)</span></p>
          </div>
          <Link href="/peneliti/analisis-readiness" className="mt-2 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Analisis Lengkap <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Analisis Maturity — Rubrik 3 Desa */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Analisis Kematangan (M1–M6)" href="/peneliti/analisis-maturity" />
          <div className="space-y-2.5 my-2">
            {maturityRubrik.map((d, i) => (
              <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-700">{d.name}</span>
                  <span className="font-black" style={{ color: d.color }}>{d.pra.toFixed(2)} → {d.value.toFixed(2)}</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(d.value / 5) * 100}%`, backgroundColor: d.color }} />
                </div>
              </div>
            ))}
            <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-[10px] text-amber-900">
              Individu (N=121): <strong>1,94 → 2,53</strong> (+0,59; <em>p</em> Holm = 2,56×10⁻¹⁶). Tahap: <strong>Berkembang</strong>.
            </div>
          </div>
          <Link href="/peneliti/analisis-maturity" className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Analisis Lengkap <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Analisis QoL & SDGs */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="QoL &amp; SDGs Desa (3, 4, 18)" href="/peneliti/analisis-qol" />
          <div className="space-y-2 my-2">
            {sdgRingkas.map((d, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-[10px] mb-0.5">
                  <span className="font-semibold text-gray-700">{d.name}</span>
                  <span className="font-black" style={{ color: d.color }}>{d.nilai.toFixed(2)}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${d.nilai}%`, backgroundColor: d.color }} />
                </div>
                <p className="text-[9px] text-gray-400">Awal: {d.awal.toFixed(2)}%</p>
              </div>
            ))}
            <div className="p-2 bg-purple-50 rounded-lg border border-purple-200 text-[10px] text-purple-900">
              Manfaat Awal QoL: <strong>68,43 → 69,97</strong> (Median Δ +4,30; 54 KPI SDGs: <strong>80,67%</strong>).
            </div>
          </div>
          <Link href="/peneliti/analisis-qol" className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Analisis Lengkap <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Analisis DSS Recommendation (SAW) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="DSS SAW (6 Kriteria C1–C6)" href="/peneliti/analisis-dss" />
          <div className="space-y-2">
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-[9px] text-gray-400 uppercase font-bold mb-0.5">Prioritas #1 Jonggon Jaya</p>
              <p className="text-[11px] font-bold text-gray-800">A08 — Dasbor SDGs 3, 4, 18</p>
              <p className="text-sm font-black text-blue-700 mt-0.5">SAW: 0,950907</p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg border border-green-100">
              <p className="text-[9px] text-gray-400 uppercase font-bold mb-0.5">Prioritas #1 Kedang Ipil &amp; Lung Anai</p>
              <p className="text-[11px] font-semibold text-gray-700">A02 — Konektivitas &amp; Perangkat</p>
              <p className="text-sm font-black text-green-700 mt-0.5">0,920042 / 0,911694</p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg border border-purple-100">
              <p className="text-[9px] text-gray-400 uppercase font-bold mb-0.5">Stabilitas Sensitivitas (±10%)</p>
              <p className="text-[11px] font-semibold text-gray-700">39/39 Skenario Stabil</p>
              <p className="text-sm font-black text-purple-700 mt-0.5">Evaluasi Formatif: 4,09/5</p>
            </div>
          </div>
          <Link href="/peneliti/analisis-dss" className="mt-2 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Analisis Lengkap <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>

      {/* ── VALIDASI + UAT SUS + EXPERT + STATISTIK ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

        {/* 6 Artefak Resmi Bab IV */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="6 Artefak Utama (A1–A6)" href="/peneliti/validasi-artefak" label="Lihat Detail →" />
          <div className="space-y-1.5">
            {ARTEFAK_6_BAB4.map((a) => (
              <div key={a.kode} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100 gap-2">
                <span className="text-[10px] font-medium text-gray-700 truncate">{a.nama.replace('Artefak ', 'A')}</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-700 whitespace-nowrap">{a.tahap}</span>
              </div>
            ))}
          </div>
          <Link href="/peneliti/validasi-artefak" className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Detail Validasi <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* UAT & SUS Evaluation */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="UAT &amp; SUS (N=126)" href="/peneliti/uat-sus" label="Lihat Detail →" />
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-[9px] text-gray-400 uppercase font-bold">SUS Score</p>
              <p className="text-2xl font-black text-blue-700 mt-1">67,58</p>
              <p className="text-[10px] font-bold text-amber-600">α = 0,955</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-xl border border-green-200">
              <p className="text-[9px] text-gray-400 uppercase font-bold">UAT Relevan</p>
              <p className="text-2xl font-black text-green-700 mt-1">86,65%</p>
              <p className="text-[10px] font-bold text-green-600">837 / 966</p>
            </div>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <p className="text-[10px] text-gray-400">Kualitas Total (Skala 1–5 · α=0,984)</p>
            <p className="text-lg font-black text-gray-900">3,39 / 5,00</p>
            <p className="text-[9px] text-amber-700 font-semibold mt-0.5">Catatan: F-029 Nakes perlu perbaikan &amp; retest</p>
          </div>
          <Link href="/peneliti/uat-sus" className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Detail Evaluasi <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Expert Validation */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Panel 3 Pakar (P1–P3)" href="/peneliti/expert-validation" label="Lihat Detail →" />
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-1.5 pr-1 text-[9px] font-bold text-gray-400 uppercase">Pakar</th>
                <th className="text-left py-1.5 pr-1 text-[9px] font-bold text-gray-400 uppercase">Fokus</th>
                <th className="text-center py-1.5 pr-1 text-[9px] font-bold text-blue-600 uppercase">Bukti</th>
                <th className="text-center py-1.5 text-[9px] font-bold text-gray-400 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {expertValidation.map((v, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2 pr-1 font-medium text-gray-700">{v.validator}</td>
                  <td className="py-2 pr-1 text-gray-500">{v.bidang}</td>
                  <td className="py-2 pr-1 text-center font-bold text-blue-700">{v.skor}</td>
                  <td className="py-2 text-center"><SB status={v.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[9px] text-slate-500 mt-2 leading-snug">
            Validitas isi RQ1: S-CVI/Ave pra 0,9167 → pasca 1,000. Formulir validasi formal A2–A6 menunggu pengesahan pakar.
          </p>
          <Link href="/peneliti/expert-validation" className="mt-2 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Detail Validasi <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Statistik Penelitian */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Statistik Bab IV" href="/peneliti/statistik-penelitian" label="Lihat Detail →" />
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center p-2 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-[8px] text-gray-400 uppercase font-bold">α Kesiapan</p>
              <p className="text-lg font-black text-blue-700">0,9367</p>
              <p className="text-[9px] font-bold text-green-600">24 Item</p>
            </div>
            <div className="text-center p-2 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-[8px] text-gray-400 uppercase font-bold">α SUS</p>
              <p className="text-lg font-black text-purple-700">0,955</p>
              <p className="text-[9px] font-bold text-green-600">10 Item</p>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg border border-green-200">
              <p className="text-[8px] text-gray-400 uppercase font-bold">α Kualitas</p>
              <p className="text-lg font-black text-green-700">0,984</p>
              <p className="text-[9px] font-bold text-green-600">Sangat Tinggi</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-[8px] text-gray-400 uppercase font-bold">CR AHP</p>
              <p className="text-xs font-black text-green-700">0,00144</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-[8px] text-gray-400 uppercase font-bold">Pra–Pasca Sig</p>
              <p className="text-xs font-black text-blue-700">5 / 6</p>
              <p className="text-[8px] text-gray-400">Koreksi Holm</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-[8px] text-gray-400 uppercase font-bold">S-CVI/Ave</p>
              <p className="text-xs font-black text-green-700">1,000</p>
            </div>
          </div>
          <Link href="/peneliti/statistik-penelitian" className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Detail Statistik <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>

      {/* ── VISUALISASI DATA + REPOSITORY + PUBLIKASI ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Visualisasi Data Penelitian */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Visualisasi Data Bab IV" href="/peneliti/visualisasi-data" label="Lihat Semua →" />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-[9px] text-gray-400 font-semibold mb-1">Readiness 3 Desa (RQ1)</p>
              <ResponsiveContainer width="100%" height={75}>
                <BarChart data={DESA_BAB4.map(d => ({ desa: d.nama.replace('Desa ', '').split(' ')[0], nilai: d.skorKesiapan }))} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={16}>
                  <XAxis dataKey="desa" tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 7, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 9 }} />
                  <Bar dataKey="nilai" fill="#2b6cb0" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 font-semibold mb-1">Penyelesaian Log 4 Minggu</p>
              <ResponsiveContainer width="100%" height={75}>
                <BarChart data={[...LOG_4_MINGGU_BAB4]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={14}>
                  <XAxis dataKey="periode" tick={{ fontSize: 7, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[70, 100]} tick={{ fontSize: 7, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 9 }} />
                  <Bar dataKey="tingkat" fill="#276749" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 font-semibold mb-1">Rubrik M1–M6 (Jonggon Jaya)</p>
              <ResponsiveContainer width="100%" height={75}>
                <BarChart data={[...RUBRIK_KEMATANGAN_DIMENSI]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={10}>
                  <XAxis dataKey="kode" tick={{ fontSize: 7, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 7, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 9 }} />
                  <Bar dataKey="jonggonJaya" fill="#553c9a" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 font-semibold mb-1">Bobot AHP 6 Dimensi</p>
              <ResponsiveContainer width="100%" height={75}>
                <PieChart>
                  <Pie data={distribusiBobotDimensi} dataKey="value" cx="50%" cy="50%" outerRadius={32} stroke="none">
                    {distribusiBobotDimensi.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 9 }} formatter={(v: any) => [`${v}%`, 'Bobot']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-[9px] text-slate-500 mt-1 text-center">
            {PREPOST_6_KONSTRUK_BAB4.filter(c => c.signifikan).length} dari {PREPOST_6_KONSTRUK_BAB4.length} konstruk pra–pasca meningkat signifikan
          </p>
          <Link href="/peneliti/visualisasi-data" className="mt-2 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Semua Visualisasi <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Repository Penelitian */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Repository Penelitian (v1.2)" href="/peneliti/repository-penelitian" label="Lihat Repository →" />
          <div className="space-y-3">
            {repository.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-2.5 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: r.color + '15' }}>
                    <Icon size={16} style={{ color: r.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold text-gray-800">{r.nama}</p>
                      <span className="text-[11px] font-black ml-1 flex-shrink-0" style={{ color: r.color }}>{r.jumlah} File</span>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-snug">{r.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <Link href="/peneliti/repository-penelitian" className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Repository <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Publikasi & Sitasi */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Publikasi &amp; Sitasi" href="/peneliti/publikasi-sitasi" label="Lihat Detail →" />
          <div className="space-y-3">
            {publikasi.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="flex items-center gap-3 p-2.5 border border-gray-100 rounded-lg">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: p.color + '15' }}>
                    <Icon size={16} style={{ color: p.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-gray-800">{p.tipe}</p>
                    <p className="text-[10px] font-black mt-0.5" style={{ color: p.color }}>{p.jumlah}</p>
                  </div>
                  <ArrowUpRight size={12} className="text-gray-300" />
                </div>
              );
            })}
          </div>

          <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-[10px] font-bold text-blue-800 mb-1">Informasi Penelitian Bab IV</p>
            <p className="text-[9px] text-gray-600 leading-snug">
              Seluruh ringkasan disinkronkan dengan Dataset SLV 1, SLV 2, dan SLV 3 v1.2 untuk 3 desa penelitian di Kab. Kutai Kartanegara.
            </p>
            <Link href="/peneliti/research-overview" className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:underline">
              Profil Penelitian <ArrowUpRight size={9} />
            </Link>
          </div>

          <Link href="/peneliti/publikasi-sitasi" className="mt-2 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Detail <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-400 pt-2 border-t border-gray-100 gap-1">
        <span>© 2026 Penelitian Smart Living Village — Kab. Kutai Kartanegara. All rights reserved.</span>
        <div className="flex gap-3">
          {['Smart Living Village', 'DSRM + IPO', '7 Aktor UML', 'SDGs 3, 4, 18', 'Bab IV v1.2'].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
        <span>Versi 1.2 (Bab IV)</span>
      </div>

    </div>
  );
}
