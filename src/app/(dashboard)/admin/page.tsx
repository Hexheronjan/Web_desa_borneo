'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';
import {
  MapPin, TrendingUp, Target, Heart, BookOpen, Landmark,
  CheckCircle2, AlertTriangle, ArrowUpRight, Users, ArrowUp, ArrowDown,
  FileText, Activity, Calendar, Shield, Clock, Minus,
  Database, Server, Settings, Bell, Zap, Globe, BarChart3,
  Cpu, RefreshCw, Archive, ClipboardList, Star, Award,
  ChevronRight, Layers, GitBranch, Link2, Info,
} from 'lucide-react';
import NextLink from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const COLOR = '#1a237e';

/* ─── DATA ─── */
const trendData = [
  { bulan: 'Jan 2026', readiness: 70.24, maturity: 62.11, qol: 69.02 },
  { bulan: 'Feb 2026', readiness: 70.89, maturity: 63.25, qol: 69.67 },
  { bulan: 'Mar 2026', readiness: 71.54, maturity: 65.53, qol: 70.11 },
  { bulan: 'Apr 2026', readiness: 72.19, maturity: 67.13, qol: 69.02 },
  { bulan: 'Mei 2026', readiness: 72.91, maturity: 69.02, qol: 71.88 },
  { bulan: 'Jun 2026', readiness: 73.45, maturity: 71.88, qol: 73.45 },
];

const maturityPieData = [
  { name: 'Level 1', value: 28, pct: 11.3, color: '#ef4444' },
  { name: 'Level 2', value: 62, pct: 25.1, color: '#f97316' },
  { name: 'Level 3', value: 98, pct: 39.7, color: '#eab308' },
  { name: 'Level 4', value: 45, pct: 18.2, color: '#22c55e' },
  { name: 'Level 5', value: 14, pct: 5.7,  color: '#3b82f6' },
];

const top5Desa = [
  { nama: 'Jonggon Jaya',    nilai: 91.45 },
  { nama: 'Kedang Ipil',     nilai: 85.32 },
  { nama: 'Lung Anai',       nilai: 83.19 },
  { nama: 'Desa Mulawarman', nilai: 79.11 },
  { nama: 'Desa Bukit Raya', nilai: 77.08 },
];

const sparkBase = [60, 63, 66, 70, 72, 73.45];

function MiniSparkline({ color = '#3b82f6' }: { color?: string }) {
  const pts = sparkBase;
  const min = Math.min(...pts); const max = Math.max(...pts);
  const norm = (v: number) => ((v - min) / (max - min)) * 28;
  const w = 60; const h = 32;
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w);
  const ys = pts.map(v => h - norm(v) - 2);
  const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <linearGradient id={`sg${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={d + ` L${xs[xs.length-1]},${h} L0,${h} Z`} fill={`url(#sg${color.replace('#','')})`} />
      <path d={d} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

const kpiCards = [
  { label: 'Total Desa Terdaftar', value: '247', sub: '↑ 12 desa baru dari bulan lalu', icon: MapPin, color: '#1a237e', sparkColor: '#3b82f6' },
  { label: 'Readiness Index Rata-rata Nasional', value: '73.45', sub: '↑ 3.21 poin dari bulan lalu', icon: TrendingUp, color: '#065f46', sparkColor: '#10b981' },
  { label: 'Maturity Index Rata-rata Nasional', value: '2.85', sub: '↑ 0.32 level dari bulan lalu', icon: BarChart3, color: '#92400e', sparkColor: '#f59e0b' },
  { label: 'Quality of Life Index Rata-rata Nasional', value: '71.2', sub: '↑ 2.18 poin dari bulan lalu', icon: Heart, color: '#7f1d1d', sparkColor: '#ef4444' },
  { label: 'Smart Living Village Composite Index', value: '72.61', sub: '↑ 3.47 poin dari bulan lalu', icon: Star, color: '#1e3a5f', sparkColor: '#0ea5e9' },
  { label: 'SDGs Achievement Rata-rata Nasional', value: '78.6%', sub: '↑ 4.12% dari bulan lalu', icon: Award, color: '#3b0764', sparkColor: '#8b5cf6' },
];

const pengumuman = [
  { judul: 'Maintenance Sistem', tanggal: '26/06/2026', desc: 'Sistem akan maintenance pada 30 Juni 2026 pukul 00:00 - 02:00 WIB.' },
  { judul: 'Rilis Fitur Baru', tanggal: '24/06/2026', desc: 'Fitur Dashboard SDGs Desa telah tersedia.' },
  { judul: 'Update Data Nasional', tanggal: '23/06/2026', desc: 'Pembaruan data indikator nasional per Juni 2026.' },
];

const aktivitas = [
  { aksi: 'Data desa Jonggon Jaya diperbarui', oleh: 'Admin', waktu: '08:45' },
  { aksi: 'Assessment periode Juni 2026 dibuat', oleh: 'Dr. Ahmad Surya', waktu: '07:30' },
  { aksi: 'Validator baru ditambahkan', oleh: 'Admin', waktu: 'Kemarin' },
  { aksi: 'Rekomendasi DSS dijalankan', oleh: 'Sistem', waktu: 'Kemarin' },
  { aksi: 'Backup sistem berhasil', oleh: 'Sistem', waktu: '2 hari lalu' },
];

const modulSistem = [
  { icon: Layers,       title: 'Master Framework',    desc: 'Kelola framework readiness, maturity dan QoL.', link: '/admin/master-framework' },
  { icon: GitBranch,    title: 'Framework Versioning', desc: 'Sistem rekomendasi versi dan pembaharuan framework.', link: '/admin/framework-versioning' },
  { icon: Calendar,     title: 'Manajemen Periode',   desc: 'Kelola periode assessment dan evaluasi.', link: '/admin/manajemen-periode' },
  { icon: Database,     title: 'Integrasi Data Desa', desc: 'Sinkronisasi & integrasi data multi-sumber.', link: '/admin/integrasi-data-desa' },
  { icon: ClipboardList, title: 'DSS Recommendation', desc: 'Kelola rekomendasi berbasis A & aturan.', link: '/admin/dss-recommendation' },
  { icon: Shield,       title: 'Evaluasi Artefak',    desc: 'Validasi instrumen dan artefak penelitian.', link: '/admin/evaluasi-artefak' },
  { icon: Users,        title: 'Expert Validation',   desc: 'Validasi instrumen oleh pakar/ahli.', link: '/admin/expert-validation' },
  { icon: CheckCircle2, title: 'UAT Results (SUS)',   desc: 'Kelola usability testing system oleh pengguna.', link: '/admin/uat-results' },
];

const researchTrend = [
  { label: 'Readiness Index', nilai: '73.45', delta: '+3.21', pct: '+4.58%', up: true, color: '#3b82f6' },
  { label: 'Maturity Index',  nilai: '2.85',  delta: '+0.32', pct: '+12.64%', up: true, color: '#f59e0b' },
  { label: 'Quality of Life Index', nilai: '71.20', delta: '+2.18', pct: '+3.16%', up: true, color: '#ef4444' },
  { label: 'SDGs Achievement', nilai: '78.6%', delta: '+4.12%', pct: '+4.12%', up: true, color: '#8b5cf6' },
];

const quickReports = [
  { label: 'Village Report',   icon: Globe,       link: '/admin/master-desa' },
  { label: 'DSS Report',       icon: ClipboardList, link: '/admin/dss-recommendation' },
  { label: 'KPI Report',       icon: BarChart3,   link: '/admin/dashboard-analytics' },
  { label: 'SDGs Report',      icon: Award,       link: '/admin/sdgs-desa' },
  { label: 'Village Report',   icon: MapPin,      link: '/admin/master-desa' },
  { label: 'Executive Report', icon: FileText,    link: '/admin/research-repository' },
  { label: 'Monitoring Report',icon: Activity,    link: '/admin/monitoring-sistem' },
];

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const [periode, setPeriode] = useState('Juni 2026');

  return (
    <div className="flex flex-col gap-4 pb-6">

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Dashboard Super Admin</h1>
          <p className="text-xs text-slate-500">Modul: APL-SLV BORNEO Smart Living Village</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={periode}
            onChange={e => setPeriode(e.target.value)}
            className="h-8 px-3 rounded-lg border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none"
          >
            {['Juni 2026','Mei 2026','April 2026','Maret 2026'].map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── ROW 1: 6 KPI CARDS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpiCards.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 flex flex-col justify-between min-h-[110px]">
              <div className="flex items-start justify-between mb-1">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: kpi.color + '18' }}>
                  <Icon size={14} style={{ color: kpi.color }} />
                </div>
                <MiniSparkline color={kpi.sparkColor} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold leading-tight mb-0.5">{kpi.label}</p>
                <p className="text-2xl font-black leading-none" style={{ color: kpi.color }}>{kpi.value}</p>
                <p className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-0.5">
                  <ArrowUp size={9} />{kpi.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── ROW 2: ASSESSMENT + DSS STATUS + PENGUMUMAN ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px_260px] gap-3">

        {/* Ringkasan Assessment & Penelitian */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-xs font-bold flex items-center gap-1.5" style={{ color: COLOR }}>
              <BarChart3 size={14} /> RINGKASAN ASSESSMENT &amp; PENELITIAN
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {[
                { label: 'Jumlah Desa',        val: '247',   sub: 'Total Terdaftar' },
                { label: 'Jumlah Assessment',   val: '247',   sub: 'Periode Aktif' },
                { label: 'Validator',           val: '36',    sub: 'Ahli & Pakar' },
                { label: 'Rekomendasi DSS',     val: '1.124', sub: 'Total Rekomendasi' },
                { label: 'Siklus Assessment',   val: '3',     sub: 'Siklus Aktif' },
                { label: 'Jumlah Artefak',      val: '6',     sub: 'Artefak Penelitian' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-[10px] text-slate-400 font-semibold">{item.label}</p>
                  <p className="text-2xl font-black text-slate-800 leading-tight">{item.val}</p>
                  <p className="text-[10px] text-slate-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Rekomendasi DSS */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-xs font-bold flex items-center gap-1.5 text-amber-700">
              <Zap size={14} /> STATUS REKOMENDASI DSS
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3 space-y-2">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50 border border-amber-100">
              <div className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center flex-shrink-0">
                <Target size={12} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-amber-600 font-bold">Priority Program</p>
                <p className="text-xl font-black text-amber-700 leading-none">245</p>
                <p className="text-[9px] text-amber-500">Program Prioritas</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 border border-green-100">
              <div className="w-6 h-6 rounded-md bg-green-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={12} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] text-green-600 font-bold">Recommendation Executed</p>
                <p className="text-xl font-black text-green-700 leading-none">512</p>
                <p className="text-[9px] text-green-500">Sudah Dilaksanakan (45.4%)</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-orange-50 border border-orange-100">
              <div className="w-6 h-6 rounded-md bg-orange-400 flex items-center justify-center flex-shrink-0">
                <Clock size={12} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] text-orange-600 font-bold">Recommendation Pending</p>
                <p className="text-xl font-black text-orange-700 leading-none">612</p>
                <p className="text-[9px] text-orange-500">Menunggu Eksekusi (54.4%)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pengumuman Sistem */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-3 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-bold flex items-center gap-1.5 text-slate-700">
                <Bell size={14} /> PENGUMUMAN SISTEM
              </CardTitle>
              <NextLink href="/admin/pengaturan-notifikasi" className="text-[10px] text-blue-600 hover:underline font-semibold">Lihat Semua</NextLink>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-3 space-y-2">
            {pengumuman.map((item, i) => (
              <div key={i} className="flex items-start gap-2 pb-2 border-b border-slate-50 last:border-0 last:pb-0">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-slate-700 leading-tight">{item.judul}</p>
                  <p className="text-[10px] text-slate-400 leading-tight">{item.desc}</p>
                </div>
                <p className="text-[9px] text-slate-400 font-semibold flex-shrink-0">{item.tanggal}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ── ROW 3: MODUL UTAMA + RESEARCH INSIGHT + AKTIVITAS TERBARU ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px_220px] gap-3">

        {/* Modul Utama Sistem */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-xs font-bold flex items-center gap-1.5" style={{ color: COLOR }}>
              <Cpu size={14} /> MODUL UTAMA SISTEM
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {modulSistem.map((m, i) => {
                const Icon = m.icon;
                return (
                  <NextLink key={i} href={m.link}
                    className="flex flex-col gap-1 p-3 rounded-lg border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all group">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: COLOR + '15' }}>
                      <Icon size={14} style={{ color: COLOR }} />
                    </div>
                    <p className="text-[11px] font-bold text-slate-800 leading-tight group-hover:text-blue-700">{m.title}</p>
                    <p className="text-[10px] text-slate-400 leading-tight">{m.desc}</p>
                    <ChevronRight size={11} className="text-slate-300 group-hover:text-blue-500 self-end" />
                  </NextLink>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Research Insight */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-xs font-bold flex items-center gap-1.5 text-slate-700">
              <TrendingUp size={14} /> RESEARCH INSIGHT (TREND UTAMA)
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3 space-y-2">
            {researchTrend.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-slate-500 font-semibold truncate">{item.label}</p>
                  <p className="text-base font-black text-slate-800 leading-none">{item.nilai}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`flex items-center gap-0.5 justify-end ${item.up ? 'text-emerald-600' : 'text-red-500'}`}>
                    {item.up ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                    <p className="text-[10px] font-bold">{item.delta}</p>
                  </div>
                  <p className="text-[9px] font-semibold" style={{ color: item.color }}>{item.pct}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Aktivitas Terbaru */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2 pt-3 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-bold flex items-center gap-1.5 text-slate-700">
                <Activity size={14} /> AKTIVITAS TERBARU
              </CardTitle>
              <NextLink href="/admin/audit-log" className="text-[10px] text-blue-600 hover:underline font-semibold">Lihat Semua</NextLink>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-3 space-y-1.5">
            {aktivitas.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-slate-700 font-semibold leading-tight">{item.aksi}</p>
                  <p className="text-[9px] text-slate-400">oleh {item.oleh}</p>
                </div>
                <p className="text-[9px] text-slate-400 font-semibold flex-shrink-0">{item.waktu}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ── ROW 4: CHART TREN + MATURITY PIE + TOP 5 DESA ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px_280px] gap-3">

        {/* Tren Indeks Nasional */}
        <Card className="shadow-sm">
          <CardHeader className="pb-1 pt-3 px-4">
            <CardTitle className="text-xs font-bold flex items-center gap-1.5" style={{ color: COLOR }}>
              <TrendingUp size={14} /> TREN INDEKS NASIONAL (6 BULAN TERAKHIR)
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-3">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={trendData} margin={{ top: 5, right: 15, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="bulan" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} domain={[55, 80]} />
                <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 9, paddingTop: 4 }} />
                <Line type="monotone" dataKey="readiness" name="Readiness Index" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="maturity"  name="Maturity Index"  stroke="#f59e0b" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="qol"       name="QoL Index"       stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sebaran Level Maturity Desa */}
        <Card className="shadow-sm">
          <CardHeader className="pb-1 pt-3 px-4">
            <CardTitle className="text-xs font-bold flex items-center gap-1.5" style={{ color: COLOR }}>
              <Layers size={14} /> SEBARAN LEVEL MATURITY DESA
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <div className="flex flex-col items-center">
              <div className="relative">
                <ResponsiveContainer width={140} height={140}>
                  <PieChart>
                    <Pie data={maturityPieData} dataKey="value" cx="50%" cy="50%" innerRadius={38} outerRadius={60} stroke="none">
                      {maturityPieData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8 }} formatter={(v: any, n: any) => [`${v} desa`, n]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-lg font-black text-slate-800">247</p>
                  <p className="text-[9px] text-slate-400">Total Desa</p>
                </div>
              </div>
              <div className="w-full space-y-1 mt-1">
                {maturityPieData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-600 font-semibold">{item.name}</span>
                    </div>
                    <span className="text-slate-500">{item.value} ({item.pct}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top 5 Desa Readiness Tertinggi */}
        <Card className="shadow-sm">
          <CardHeader className="pb-1 pt-3 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-bold flex items-center gap-1.5" style={{ color: COLOR }}>
                <Star size={14} /> TOP 5 DESA READINESS TERTINGGI
              </CardTitle>
              <span className="text-[10px] text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded">Top 5</span>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-3 space-y-2">
            {top5Desa.map((desa, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[11px] font-black text-slate-500 w-3 flex-shrink-0">{i + 1}.</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-[11px] font-semibold text-slate-700 truncate">{desa.nama}</p>
                    <p className="text-[11px] font-black text-blue-700 ml-2 flex-shrink-0">{desa.nilai}</p>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${desa.nilai}%` }} />
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-1">
              <ResponsiveContainer width="100%" height={80}>
                <BarChart data={top5Desa} layout="vertical" margin={{ top: 0, right: 5, left: 0, bottom: 0 }}>
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 8 }} />
                  <YAxis type="category" dataKey="nama" tick={{ fontSize: 9 }} width={90} />
                  <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} />
                  <Bar dataKey="nilai" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── STATUS SISTEM & INTEGRASI DATA ── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">STATUS SISTEM &amp; INTEGRASI DATA</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { icon: Link2,      label: 'Integrasi Data',         val: 'Aktif',                  color: '#22c55e' },
            { icon: Database,   label: 'Sumber Data',            val: '15 Sumber Terhubung',    color: '#3b82f6' },
            { icon: RefreshCw,  label: 'Sinkronisasi Terakhir',  val: '27/06/2026 07:45 WIB',   color: '#f59e0b' },
            { icon: Archive,    label: 'Status Backup',          val: 'Berhasil',               color: '#22c55e' },
            { icon: Server,     label: 'Health System',          val: 'Optimal',                color: '#22c55e' },
            { icon: Users,      label: 'Pengguna Aktif',         val: '12 Online',              color: '#8b5cf6' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: item.color + '18' }}>
                  <Icon size={13} style={{ color: item.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] text-slate-400 font-semibold">{item.label}</p>
                  <p className="text-[11px] font-bold truncate" style={{ color: item.color }}>{item.val}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── QUICK ACCESS REPORT ── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">QUICK ACCESS REPORT</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {quickReports.map((rep, i) => {
            const Icon = rep.icon;
            return (
              <NextLink key={i} href={rep.link}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all group text-center">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLOR + '10' }}>
                  <Icon size={16} style={{ color: COLOR }} className="group-hover:text-blue-600" />
                </div>
                <p className="text-[10px] font-semibold text-slate-600 leading-tight group-hover:text-blue-700">{rep.label}</p>
              </NextLink>
            );
          })}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <p className="text-center text-[10px] text-slate-300 font-semibold">
        © 2026 APL-SLV BORNEO - Smart Living Village. All rights reserved. &nbsp; Versi 2.1.0
      </p>
    </div>
  );
}