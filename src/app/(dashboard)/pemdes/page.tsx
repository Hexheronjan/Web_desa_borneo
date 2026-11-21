'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';
import {
  TrendingUp, AlertTriangle, CheckCircle2, Clock, DollarSign,
  FileText, Activity, Shield, Target, Users, MessageSquare,
  ArrowUpRight, ArrowDownRight, Bell, Zap, Heart, Calendar, Landmark,
  FolderOpen, Gavel, HelpCircle, ShieldCheck, Download, Plus, Sparkles, PlusCircle, ArrowRight,
  RefreshCw, Compass, BarChart2, Upload
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const COLOR = '#283593';

// 6 Dimensi Kesiapan Final sesuai Bab IV (Tabel 4.11 & Tabel 4.17 — Profil Tiga Desa)
const RADAR_DATA = [
  { dimension: 'D1 Tata Kelola', value: 61.39 },
  { dimension: 'D2 Infrastruktur', value: 49.69 },
  { dimension: 'D3 SDM & Literasi', value: 54.27 },
  { dimension: 'D4 Data & Layanan', value: 48.71 },
  { dimension: 'D5 Tata Kelola Adat', value: 83.12 },
  { dimension: 'D6 SDGs & DSS', value: 51.62 },
];

// Status Rapat / Musyawarah Donut
const PIE_DATA = [
  { name: 'Diterima', value: 2, color: '#10b981' },
  { name: 'Diterima dengan Perubahan', value: 1, color: '#3b82f6' },
  { name: 'Ditunda', value: 1, color: '#f59e0b' },
  { name: 'Ditolak', value: 0, color: '#ef4444' },
];

export default function PemdesDashboardPage() {
  const [importing, setImporting] = useState(false);

  const handleImport = () => {
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      alert('✅ Penilaian Kesiapan Smart Living Village terbaru berhasil di-import dari pusat data.');
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-5">
      
      {/* HEADER DASBOR STRATEGIS */}
      <div className="flex justify-between items-start flex-wrap gap-4 border-b pb-4">
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase">PEMERINTAH DESA</h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Dasbor Strategis Pemerintah Desa | Smart Living Village</p>
        </div>
        <div className="flex items-center gap-3 text-right text-[11px] text-slate-500 font-semibold bg-slate-50 p-2.5 rounded-xl border">
          <div>
            <p>Periode Data: <span className="text-indigo-700">Januari – Juni 2026</span></p>
            <p className="text-[10px] text-slate-400 mt-0.5">Kamis, 18 Juli 2026, 10:24 WITA</p>
          </div>
          <RefreshCw size={14} className="text-indigo-700 animate-spin" />
        </div>
      </div>

      {/* TOP CARDS / 5 KEY METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* 1. Skor Kesiapan SLV */}
        <Card className="p-4 border-l-4 border-l-blue-600 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Skor Kesiapan SLV (N=126)</p>
            <Target size={15} className="text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-800">60,45</p>
          <span className="text-[9px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">Pra 58,18 (3 Desa)</span>
          <p className="text-[9px] text-green-600 flex items-center gap-0.5 mt-1.5 font-bold">
            <ArrowUpRight size={10} /> +2,27 poin (p=0,0900 NS)
          </p>
        </Card>

        {/* 2. Tingkat Kematangan */}
        <Card className="p-4 border-l-4 border-l-purple-600 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tingkat Kematangan (N=121)</p>
            <Compass size={15} className="text-purple-600" />
          </div>
          <p className="text-2xl font-black text-slate-800">2,53</p>
          <span className="text-[9px] font-bold bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded">Berkembang (Rubrik: 2,40–2,68)</span>
          <p className="text-[9px] text-purple-600 flex items-center gap-0.5 mt-1.5 font-bold">
            <ArrowUpRight size={10} /> +0,59 dari Pra 1,94 (Signifikan)
          </p>
        </Card>

        {/* 3. Skor Manfaat Awal Kualitas Hidup */}
        <Card className="p-4 border-l-4 border-l-green-600 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Manfaat Awal Kualitas Hidup</p>
            <Heart size={15} className="text-green-600" />
          </div>
          <p className="text-2xl font-black text-slate-800">69,97</p>
          <span className="text-[9px] font-bold bg-green-50 text-green-700 px-1.5 py-0.5 rounded">Pra 68,43 (Signifikan)</span>
          <p className="text-[9px] text-green-600 flex items-center gap-0.5 mt-1.5 font-bold">
            <ArrowUpRight size={10} /> +1,54 poin (Median Δ +4,30)
          </p>
        </Card>

        {/* 4. Penyelesaian Tugas 4 Minggu */}
        <Card className="p-4 border-l-4 border-l-orange-600 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Penyelesaian Log Minggu 4</p>
            <Activity size={15} className="text-orange-600" />
          </div>
          <p className="text-2xl font-black text-slate-800">98,41%</p>
          <div className="w-full bg-slate-100 rounded-full h-1 mt-1.5">
            <div className="bg-orange-600 h-1 rounded-full" style={{ width: '98.4%' }} />
          </div>
          <p className="text-[9px] text-slate-500 font-semibold mt-1">248/252 tugas · 0 kesalahan</p>
        </Card>

        {/* 5. Evaluasi Peran Pemdes */}
        <Card className="p-4 border-l-4 border-l-teal-600 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">UAT &amp; SUS Pemdes (N=18)</p>
            <FolderOpen size={15} className="text-teal-600" />
          </div>
          <p className="text-2xl font-black text-slate-800">87,50%</p>
          <div className="text-[8px] text-slate-500 mt-1 font-semibold space-y-0.5 grid grid-cols-2">
            <span>SUS: 70,83</span>
            <span>Kualitas: 3,46/5</span>
            <span>SDGs KPI: 80,67%</span>
            <span>Integrasi: +7,71</span>
          </div>
        </Card>

      </div>

      {/* MIDDLE ROW: SDGs & NOTIFIKASI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* SDGs PEMANTAUAN */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} className="text-indigo-700" /> Pemantauan SDG Desa Prioritas (54 Unit KPI — Bab IV)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5 text-xs">
            
            {/* SDG 3 */}
            <div className="p-3 bg-red-50/50 border border-red-100 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-red-700" />
                <div>
                  <p className="font-bold text-slate-800">SDG Desa 3 — Kesehatan (18 Unit KPI)</p>
                  <p className="text-[10px] text-slate-500">Jonggon Jaya 85,5% · Kedang Ipil 80,9% · Lung Anai 80,4%</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-800 text-[13px]">82,24%</p>
                <span className="text-[9px] font-bold text-green-700">Awal 74,70% (+7,55 poin)</span>
              </div>
            </div>

            {/* SDG 4 */}
            <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-blue-600" />
                <div>
                  <p className="font-bold text-slate-800">SDG Desa 4 — Pendidikan (18 Unit KPI)</p>
                  <p className="text-[10px] text-slate-500">Jonggon Jaya 76,1% · Kedang Ipil 75,0% · Lung Anai 73,6%</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-800 text-[13px]">74,90%</p>
                <span className="text-[9px] font-bold text-green-700">Awal 66,68% (+8,22 poin)</span>
              </div>
            </div>

            {/* SDG 18 */}
            <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Landmark size={16} className="text-emerald-700" />
                <div>
                  <p className="font-bold text-slate-800">SDG Desa 18 — Kelembagaan &amp; Kebudayaan (18 Unit KPI)</p>
                  <p className="text-[10px] text-slate-500">Lung Anai 87,4% · Jonggon Jaya 83,7% · Kedang Ipil 83,5%</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-800 text-[13px]">84,86%</p>
                <span className="text-[9px] font-bold text-green-700">Awal 76,92% (+7,94 poin)</span>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* NOTIFIKASI & PERINGATAN */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Bell size={14} className="text-indigo-700" /> Peringatan & Notifikasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            
            <div className="flex items-start gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
              <AlertTriangle size={14} className="flex-shrink-0 mt-0.5 text-yellow-600" />
              <div className="flex-1">
                <p className="font-bold text-[11px]">WiFi Belum Diperbarui</p>
                <p className="text-[10px] text-yellow-800">Access point WiFi Balai Adat belum diperpanjang langganan bulan ini.</p>
              </div>
              <span className="text-[9px] text-slate-400">10:15</span>
            </div>

            <div className="flex items-start gap-2 p-2 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-800">
              <Calendar size={14} className="flex-shrink-0 mt-0.5 text-indigo-600" />
              <div className="flex-1">
                <p className="font-bold text-[11px]">Musyawarah Desa (Musdes)</p>
                <p className="text-[10px] text-indigo-800">Agenda RKP Desa Tahun 2027 dijadwalkan tanggal 25 Juli 2026.</p>
              </div>
              <span className="text-[9px] text-slate-400">09:00</span>
            </div>

            <div className="flex items-start gap-2 p-2 bg-green-50 border border-green-200 rounded-lg text-green-800">
              <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5 text-green-600" />
              <div className="flex-1">
                <p className="font-bold text-[11px]">2 Program Mencapai Target</p>
                <p className="text-[10px] text-green-800">Program sekolah adat & BUMDes digital tuntas 100%.</p>
              </div>
              <span className="text-[9px] text-slate-400">Kemarin</span>
            </div>

            <div className="flex items-start gap-2 p-2 bg-red-50 border border-red-200 rounded-lg text-red-800">
              <Clock size={14} className="flex-shrink-0 mt-0.5 text-red-700" />
              <div className="flex-1">
                <p className="font-bold text-[11px]">1 Program Terlambat</p>
                <p className="text-[10px] text-red-800">Pemasangan tower internet Dusun C terlambat karena kendala vendor.</p>
              </div>
              <span className="text-[9px] text-slate-400">Kemarin</span>
            </div>

          </CardContent>
        </Card>

      </div>

      {/* BOTTOM ROW: RADAR, DSS, PIE, ASPIRASI */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        
        {/* RADAR KESIAPAN */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
              <BarChart2 size={13} /> Radar Kesiapan (6 Dimensi)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={RADAR_DATA}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 7, fill: '#64748b' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 6 }} />
                  <Radar name="Skor" dataKey="value" stroke={COLOR} fill={COLOR} fillOpacity={0.25} strokeWidth={1.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* REKOMENDASI DSS TERATAS */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
              <Activity size={13} /> Rekomendasi DSS Teratas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5 text-xs">
            {[
              { nama: 'A08 — Dasbor SDGs Desa 3, 4, dan 18 (Jonggon Jaya)', skor: '0,9509' },
              { nama: 'A02 — Penguatan Konektivitas & Perangkat (Kedang Ipil)', skor: '0,9200' },
              { nama: 'A02 — Penguatan Konektivitas & Perangkat (Lung Anai)', skor: '0,9117' }
            ].map((d, i) => (
              <div key={i} className="p-2 border rounded-lg bg-slate-50/50 space-y-1">
                <p className="font-bold text-slate-800 text-[11px] leading-snug">{d.nama}</p>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400 font-semibold">Skor Preferensi SAW:</span>
                  <span className="font-bold text-indigo-700 font-mono">{d.skor}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* STATUS MUSYAWARAH */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
              <Gavel size={13} /> Status Musyawarah & Keputusan
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center space-y-2">
            <div className="h-[120px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={PIE_DATA} innerRadius={35} outerRadius={50} paddingAngle={2} dataKey="value">
                    {PIE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 9 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[9px] grid grid-cols-2 gap-x-3 gap-y-1 text-slate-500 font-semibold">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full" /> Diterima (2)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full" /> Perubahan (1)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 rounded-full" /> Ditunda (1)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full" /> Ditolak (0)</span>
            </div>
          </CardContent>
        </Card>

        {/* ASPIRASI WARGA */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
              <MessageSquare size={13} /> Aspirasi Masyarakat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5 text-xs">
            
            {/* STATS COUNT */}
            <div className="grid grid-cols-4 gap-1 text-center font-bold">
              {[
                { label: 'Baru', val: 5, bg: 'bg-sky-50 text-sky-700 border-sky-100' },
                { label: 'Bahas', val: 8, bg: 'bg-orange-50 text-orange-700 border-orange-100' },
                { label: 'Proses', val: 12, bg: 'bg-blue-50 text-blue-700 border-blue-100' },
                { label: 'Selesai', val: 23, bg: 'bg-green-50 text-green-700 border-green-100' },
              ].map((s, i) => (
                <div key={i} className={`p-1.5 border rounded-lg ${s.bg}`}>
                  <p className="text-[13px]">{s.val}</p>
                  <p className="text-[8px] uppercase">{s.label}</p>
                </div>
              ))}
            </div>

            {/* ISU TERATAS LIST */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Isu Teratas:</p>
              {[
                'Penyediaan Layanan Kesehatan',
                'Peningkatan Infrastruktur Jalan',
                'Akses Internet & Sinyal',
                'Pendidikan & Pelatihan',
                'Air Bersih & Sanitasi'
              ].map((isu, idx) => (
                <div key={idx} className="flex justify-between items-center py-0.5 border-b text-[10px] text-slate-700">
                  <span className="truncate">{isu}</span>
                  <span className="font-bold text-indigo-700">{5 - idx}</span>
                </div>
              ))}
            </div>

          </CardContent>
        </Card>

      </div>

      {/* QUICK ACTIONS BUTTONS */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Aksi Cepat</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          
          <button onClick={handleImport} disabled={importing} className="p-2 border rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold flex flex-col items-center justify-center text-center gap-1 shadow-sm transition-colors min-h-[56px]">
            <Download size={14} className="text-indigo-700" />
            <span>{importing ? 'Mengimport...' : 'Import Penilaian'}</span>
          </button>

          <Link href="/pemdes/dss-recommendation" className="p-2 border rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold flex flex-col items-center justify-center text-center gap-1 shadow-sm transition-colors min-h-[56px]">
            <Activity size={14} className="text-indigo-700" />
            <span>Lihat Rekomendasi DSS</span>
          </Link>

          <Link href="/pemdes/musyawarah-keputusan" className="p-2 border rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold flex flex-col items-center justify-center text-center gap-1 shadow-sm transition-colors min-h-[56px]">
            <Gavel size={14} className="text-indigo-700" />
            <span>Buat Agenda Musyawarah</span>
          </Link>

          <Link href="/pemdes/rkpdes" className="p-2 border rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold flex flex-col items-center justify-center text-center gap-1 shadow-sm transition-colors min-h-[56px]">
            <PlusCircle size={14} className="text-indigo-700" />
            <span>Tambah Program RTL</span>
          </Link>

          <Link href="/pemdes/upload-evidence" className="p-2 border rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold flex flex-col items-center justify-center text-center gap-1 shadow-sm transition-colors min-h-[56px]">
            <Upload size={14} className="text-indigo-700" />
            <span>Unggah Bukti Kegiatan</span>
          </Link>

          <Link href="/pemdes/laporan-desa" className="p-2 border rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold flex flex-col items-center justify-center text-center gap-1 shadow-sm transition-colors min-h-[56px]">
            <FileText size={14} className="text-indigo-700" />
            <span>Lihat Laporan</span>
          </Link>

          <Link href="/pemdes/aspirasi-partisipasi" className="p-2 border rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold flex flex-col items-center justify-center text-center gap-1 shadow-sm transition-colors min-h-[56px]">
            <MessageSquare size={14} className="text-indigo-700" />
            <span>Balas Aspirasi</span>
          </Link>

        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} /> Seluruh data merupakan agregat dan dikelola untuk simulasi terkendali smart village</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}