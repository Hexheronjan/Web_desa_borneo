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

// 6 Dimensi Kesiapan Final
const RADAR_DATA = [
  { dimension: 'SDM & Literasi', value: 52.4 },
  { dimension: 'Budaya & Tata Kelola Adat', value: 68.2 },
  { dimension: 'Layanan & Kualitas Hidup', value: 58.7 },
  { dimension: 'Data & Sistem Informasi', value: 48.9 },
  { dimension: 'Tata Kelola', value: 55.6 },
  { dimension: 'Ekonomi', value: 44.1 },
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
            <p className="text-[10px] text-slate-400 mt-0.5">Kamis, 18 Juli 2026, 10:24 WIB</p>
          </div>
          <RefreshCw size={14} className="text-indigo-700 animate-spin" />
        </div>
      </div>

      {/* TOP CARDS / 5 KEY METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* 1. Skor Kesiapan SLV */}
        <Card className="p-4 border-l-4 border-l-blue-600 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Skor Kesiapan SLV</p>
            <Target size={15} className="text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-800">53,50</p>
          <span className="text-[9px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">Cukup Siap</span>
          <p className="text-[9px] text-green-600 flex items-center gap-0.5 mt-1.5 font-bold">
            <ArrowUpRight size={10} /> +1,25% dari Des 2025
          </p>
        </Card>

        {/* 2. Tingkat Kematangan */}
        <Card className="p-4 border-l-4 border-l-purple-600 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tingkat Kematangan</p>
            <Compass size={15} className="text-purple-600" />
          </div>
          <p className="text-2xl font-black text-slate-800">2,10</p>
          <span className="text-[9px] font-bold bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded">Berkembang</span>
          <p className="text-[9px] text-purple-600 flex items-center gap-0.5 mt-1.5 font-bold">
            <ArrowUpRight size={10} /> +0,10% dari Des 2025
          </p>
        </Card>

        {/* 3. Skor Kualitas Hidup */}
        <Card className="p-4 border-l-4 border-l-green-600 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Skor Kualitas Hidup</p>
            <Heart size={15} className="text-green-600" />
          </div>
          <p className="text-2xl font-black text-slate-800">61,80</p>
          <span className="text-[9px] font-bold bg-green-50 text-green-700 px-1.5 py-0.5 rounded">Baik</span>
          <p className="text-[9px] text-green-600 flex items-center gap-0.5 mt-1.5 font-bold">
            <ArrowUpRight size={10} /> +1,02% dari Des 2025
          </p>
        </Card>

        {/* 4. Progres Tindak Lanjut */}
        <Card className="p-4 border-l-4 border-l-orange-600 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Progres Rencana Tindak Lanjut</p>
            <Activity size={15} className="text-orange-600" />
          </div>
          <p className="text-2xl font-black text-slate-800">67,8%</p>
          <div className="w-full bg-slate-100 rounded-full h-1 mt-1.5">
            <div className="bg-orange-600 h-1 rounded-full" style={{ width: '67.8%' }} />
          </div>
          <p className="text-[9px] text-slate-500 font-semibold mt-1">24 program berjalan</p>
        </Card>

        {/* 5. Kualitas Data */}
        <Card className="p-4 border-l-4 border-l-teal-600 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Kualitas Data</p>
            <FolderOpen size={15} className="text-teal-600" />
          </div>
          <p className="text-2xl font-black text-slate-800">82%</p>
          <div className="text-[8px] text-slate-450 mt-1 font-semibold space-y-0.5 grid grid-cols-2">
            <span>Lengkap: 82%</span>
            <span>Diperbarui: 74%</span>
            <span>Terverifikasi: 68%</span>
            <span>Konsisten: 81%</span>
          </div>
        </Card>

      </div>

      {/* MIDDLE ROW: SDGs & NOTIFIKASI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* SDGs PEMANTAUAN */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} className="text-indigo-700" /> Pemantauan SDG Desa Prioritas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5 text-xs">
            
            {/* SDG 3 */}
            <div className="p-3 bg-red-50/50 border border-red-100 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-red-650" />
                <div>
                  <p className="font-bold text-slate-800">SDG Desa 3 — Kesehatan</p>
                  <p className="text-[10px] text-slate-500">Program Penanganan Stunting & Ibu Hamil</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-800 text-[13px]">64,2</p>
                <span className="text-[9px] font-bold text-green-700">Baik (+2,1 dari Des 2025)</span>
              </div>
            </div>

            {/* SDG 4 */}
            <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-blue-600" />
                <div>
                  <p className="font-bold text-slate-800">SDG Desa 4 — Pendidikan</p>
                  <p className="text-[10px] text-slate-500">Kelas Literasi Digital & PAUD Adat</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-800 text-[13px]">58,7</p>
                <span className="text-[9px] font-bold text-green-700">Cukup Baik (+1,9 dari Des 2025)</span>
              </div>
            </div>

            {/* SDG 18 */}
            <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Landmark size={16} className="text-emerald-700" />
                <div>
                  <p className="font-bold text-slate-800">SDG Desa 18 — Kelembagaan & Kebudayaan</p>
                  <p className="text-[10px] text-slate-500">Digitalisasi Hukum Adat & Huma Betang</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-800 text-[13px]">55,1</p>
                <span className="text-[9px] font-bold text-green-700">Cukup Baik (+1,3 dari Des 2025)</span>
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
                <p className="text-[10px] text-yellow-750">Access point WiFi Balai Adat belum diperpanjang langganan bulan ini.</p>
              </div>
              <span className="text-[9px] text-slate-400">10:15</span>
            </div>

            <div className="flex items-start gap-2 p-2 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-800">
              <Calendar size={14} className="flex-shrink-0 mt-0.5 text-indigo-600" />
              <div className="flex-1">
                <p className="font-bold text-[11px]">Musyawarah Desa (Musdes)</p>
                <p className="text-[10px] text-indigo-750">Agenda RKP Desa Tahun 2027 dijadwalkan tanggal 25 Juli 2026.</p>
              </div>
              <span className="text-[9px] text-slate-400">09:00</span>
            </div>

            <div className="flex items-start gap-2 p-2 bg-green-50 border border-green-200 rounded-lg text-green-800">
              <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5 text-green-600" />
              <div className="flex-1">
                <p className="font-bold text-[11px]">2 Program Mencapai Target</p>
                <p className="text-[10px] text-green-750">Program sekolah adat & BUMDes digital tuntas 100%.</p>
              </div>
              <span className="text-[9px] text-slate-400">Kemarin</span>
            </div>

            <div className="flex items-start gap-2 p-2 bg-red-50 border border-red-200 rounded-lg text-red-800">
              <Clock size={14} className="flex-shrink-0 mt-0.5 text-red-650" />
              <div className="flex-1">
                <p className="font-bold text-[11px]">1 Program Terlambat</p>
                <p className="text-[10px] text-red-750">Pemasangan tower internet Dusun C terlambat karena kendala vendor.</p>
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
              { nama: 'Peningkatan Layanan Kesehatan Dasar', skor: 0.234 },
              { nama: 'Penguatan Literasi Digital & Pendidikan', skor: 0.197 },
              { nama: 'Penguatan Kelembagaan Adat & Budaya', skor: 0.182 }
            ].map((d, i) => (
              <div key={i} className="p-2 border rounded-lg bg-slate-50/50 space-y-1">
                <p className="font-bold text-slate-800 text-[11px] leading-snug">{d.nama}</p>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400 font-semibold">Skor Preferensi:</span>
                  <span className="font-bold text-indigo-700">{d.skor}</span>
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
                <div key={idx} className="flex justify-between items-center py-0.5 border-b text-[10px] text-slate-650">
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