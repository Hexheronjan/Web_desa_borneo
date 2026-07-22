'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Users, Layers, Database, ShieldCheck, Server, AlertTriangle, Activity,
  Settings, Clock, ChevronRight, BarChart3, TrendingUp, Info, ShieldAlert,
  FolderOpen, GitBranch, ArrowUp, ArrowDown, Award, Globe, FileText, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

const COLOR = '#1a237e';

const TREN_DATA = [
  { bulan: 'Jan', kesiapan: 54.2, qol: 68.5 },
  { bulan: 'Feb', kesiapan: 55.0, qol: 69.0 },
  { bulan: 'Mar', kesiapan: 55.8, qol: 69.8 },
  { bulan: 'Apr', kesiapan: 56.5, qol: 70.3 },
  { bulan: 'Mei', kesiapan: 57.0, qol: 70.9 },
  { bulan: 'Jun', kesiapan: 57.33, qol: 71.20 },
];

export default function AdminDashboardPage() {
  const [periode, setPeriode] = useState('Juni 2026');

  return (
    <div className="flex flex-col gap-4 pb-8 text-xs">
      
      {/* ── HEADER DASBOR ADMINISTRATOR SISTEM ── */}
      <div className="flex justify-between items-center border-b pb-3 flex-wrap gap-2">
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">DASHBOARD ADMINISTRATOR SISTEM</h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Dasbor Operasional Sistem Smart Living Village</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Activity size={12} className="animate-pulse" /> Sistem Online
          </span>
          <select
            value={periode}
            onChange={e => setPeriode(e.target.value)}
            className="h-8 px-3 rounded-lg border border-slate-200 text-xs font-bold bg-white text-slate-700 focus:outline-none"
          >
            {['Juni 2026', 'Mei 2026', 'April 2026'].map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── BARIS 1: METRIKS TEKNIS OPERASIONAL (6 KARTU) ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {[
          { label: 'Pengguna Uji Aktif', val: '42', detail: '+ 1 dari bulan lalu', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
          { label: 'Modul Utama Aktif', val: '9 dari 9', detail: 'Semua modul aktif', icon: Layers, color: 'text-green-600', bg: 'bg-green-50 border-green-100' },
          { label: 'Data Menunggu Validasi', val: '128', detail: '0 dari bulan lalu', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
          { label: 'Sinkronisasi Berhasil', val: '96,8%', detail: '+ 1,2% dari bulan lalu', icon: Database, color: 'text-cyan-600', bg: 'bg-cyan-50 border-cyan-100' },
          { label: 'Pencadangan Terakhir', val: '16 Jul 2026', detail: '00:00 WITA', icon: Server, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
          { label: 'Notifikasi Keamanan', val: '5', detail: 'Perlu perhatian', icon: ShieldAlert, color: 'text-red-650', bg: 'bg-red-50 border-red-150' },
        ].map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} className={`p-3.5 rounded-xl border bg-white flex flex-col justify-between gap-2 shadow-sm ${k.bg}`}>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide leading-tight">{k.label}</span>
                <Icon size={16} className={k.color} />
              </div>
              <div>
                <p className="text-xl font-black text-slate-800 leading-none">{k.val}</p>
                <p className="text-[9px] text-slate-450 font-semibold mt-1">{k.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── BARIS 2: INDEKS RATA-RATA TIGA DESA IMPLEMENTASI (4 KARTU) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Skor Kesiapan Rata-rata Tiga Desa', val: '57,33', sub: '- 2,11 dari bulan lalu', color: '#1e88e5', progress: 57.3 },
          { label: 'Tingkat Kematangan Rata-rata', val: '2,85', sub: '+ 0,24 dari bulan lalu', color: '#2e7d32', progress: 57.0 }, // (2.85 dari skala 5) = ~57%
          { label: 'Skor Kualitas Hidup Rata-rata', val: '71,20', sub: '- 1,05 dari bulan lalu', color: '#f57c00', progress: 71.2 },
          { label: 'Capaian SDGs Desa Rata-rata', val: '78,6%', sub: '+ 2,55 dari bulan lalu', color: '#7b1fa2', progress: 78.6 }
        ].map((ind, i) => (
          <Card key={i} className="border border-slate-200">
            <CardContent className="p-3.5 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                <span>{ind.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-800 leading-none">{ind.val}</span>
              </div>
              <div className="space-y-1">
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${ind.progress}%`, backgroundColor: ind.color }} />
                </div>
                <div className="flex justify-between items-center text-[9px] text-slate-400 font-semibold leading-none pt-0.5">
                  <span>{ind.sub}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── METADATA SIMULASI BANNER ── */}
      <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-950 font-semibold text-center flex items-center justify-center gap-1">
        <Info size={14} className="text-indigo-700" />
        <span>Catatan: seluruh angka dan parameter visual pada dasbor ini merupakan <strong>data simulasi terkendali</strong> untuk memisahkan kewenangan operasional.</span>
      </div>

      {/* ── METADATA OPERASIONAL GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* KOLOM KIRI (2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Ringkasan Assessment & Rekomendasi DSS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ringkasan Assessment */}
            <Card>
              <CardHeader className="py-2.5 px-4 bg-slate-50/50 border-b">
                <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart3 size={14} /> Ringkasan Assessment &amp; Penelitian
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 grid grid-cols-2 gap-3.5">
                {[
                  { label: 'Desa Implementasi', val: '3 Desa' },
                  { label: 'Jumlah Assessment', val: '247 Kali' },
                  { label: 'Pakar Validator', val: '36 Pakar' },
                  { label: 'Laporan FGD', val: '1.124 Berkas' },
                  { label: 'Versi Kerangka', val: '3 Rilis' },
                  { label: 'Arsip Repositori', val: '6 Dokumen' },
                ].map((a, idx) => (
                  <div key={idx} className="border-b pb-1.5">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{a.label}</p>
                    <p className="text-base font-black text-slate-800 mt-0.5">{a.val}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Status DSS */}
            <Card>
              <CardHeader className="py-2.5 px-4 bg-slate-50/50 border-b">
                <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp size={14} /> Status Rekomendasi DSS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 grid grid-cols-2 gap-3.5">
                {[
                  { label: 'Program Prioritas', val: '245 Program' },
                  { label: 'Rekomendasi Dievaluasi', val: '512 Item' },
                  { label: 'Menunggu Tinjauan', val: '186 Berkas' },
                  { label: 'Ditunda / Evaluasi', val: '31 Program' },
                ].map((d, idx) => (
                  <div key={idx} className="border-b pb-1.5">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{d.label}</p>
                    <p className="text-base font-black text-slate-800 mt-0.5">{d.val}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Log Peringatan Sistem */}
          <Card className="border-red-200">
            <CardHeader className="py-2.5 px-4 bg-red-50/50 border-b border-red-100 flex flex-row justify-between items-center">
              <CardTitle className="text-xs font-bold text-red-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert size={14} className="text-red-700" /> Peringatan Sistem &amp; Masalah Log Keamanan
              </CardTitle>
              <Link href="/admin/audit-log" className="text-[10px] font-bold text-red-700 hover:underline">Lihat Semua</Link>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {[
                { waktu: '18 Jul 2026, 09:12 WITA', item: 'Kegagalan login berturut-turut pada akun adat_jafar (3 kali)', status: 'Akun Terkunci Sementara' },
                { waktu: '17 Jul 2026, 17:15 WITA', item: 'Kapasitas cloud storage tersisa 12% (Mendekati limit 250GB)', status: 'Pembersihan Log Berjalan' },
                { waktu: '16 Jul 2026, 03:10 WITA', item: 'Kegagalan pencadangan otomatis (Database PostgreSQL timeout)', status: 'Percobaan Ulang Sukses' },
                { waktu: '15 Jul 2026, 22:45 WITA', item: 'Sertifikat SSL domain apl.slvborneo.com akan kedaluwarsa dalam 10 hari', status: 'Auto-Renew Terjadwal' },
              ].map((p, idx) => (
                <div key={idx} className="flex justify-between items-start gap-2 border-b pb-2 last:border-0 last:pb-0 bg-red-50/20 p-2 rounded-lg border border-red-50">
                  <div>
                    <p className="font-bold text-slate-800">{p.item}</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">{p.waktu}</p>
                  </div>
                  <span className="text-[9px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 flex-shrink-0">{p.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tren Kesiapan Rata-rata & QoL */}
          <Card>
            <CardHeader className="py-2.5 px-4 bg-slate-50/50 border-b">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 size={14} /> Tren Skor Kesiapan Rata-rata &amp; Skor Kualitas Hidup Rata-rata (Read-Only)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[200px] w-full text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={TREN_DATA}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bulan" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 9 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 9 }} />
                    <Line name="Skor Kesiapan Rata-rata" type="monotone" dataKey="kesiapan" stroke="#1e88e5" strokeWidth={2} />
                    <Line name="Skor Kualitas Hidup Rata-rata" type="monotone" dataKey="qol" stroke="#2e7d32" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* KOLOM KANAN (1/3 width) */}
        <div className="space-y-4">
          
          {/* Status Operasional Sistem */}
          <Card>
            <CardHeader className="py-2.5 px-4 bg-slate-50/50 border-b">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Settings size={14} /> Status Operasional Sistem
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 font-semibold">
              {[
                { label: 'Status Server', val: 'Optimal', color: 'text-green-600 bg-green-50 border-green-200' },
                { label: 'API Integrasi', val: 'Berjalan', color: 'text-green-600 bg-green-50 border-green-200' },
                { label: 'Layanan Backup', val: 'Normal', color: 'text-green-600 bg-green-50 border-green-200' },
                { label: 'Keamanan Sistem', val: 'Aman', color: 'text-green-600 bg-green-50 border-green-200' },
                { label: 'Beban Penyimpanan', val: '68 %', color: 'text-amber-700 bg-amber-50 border-amber-200' },
              ].map((op, idx) => (
                <div key={idx} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                  <span className="text-slate-600 font-bold">{op.label}</span>
                  <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${op.color}`}>{op.val}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Aktivitas Terbaru */}
          <Card>
            <CardHeader className="py-2.5 px-4 bg-slate-50/50 border-b">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={14} /> Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3.5">
              {[
                { time: '18 Jul 2026, 03:00 WITA', text: 'Backup sistem otomatis berhasil diunggah ke cloud storage AWS Jakarta' },
                { time: '17 Jul 2026, 23:45 WITA', text: 'Sinkronisasi data siswa sekolah adat Lung Anai dengan API Kemendikbud' },
                { time: '17 Jul 2026, 22:30 WITA', text: 'Validasi teknis data posyandu Kedang Ipil selesai dilakukan oleh Admin' },
                { time: '17 Jul 2026, 21:00 WITA', text: 'Pengguna baru ditambahkan dengan peran Guru/Tenaga Pendidikan' },
                { time: '15 Jul 2026, 20:00 WITA', text: 'Pembaruan konfigurasi notifikasi sistem jika sinkronisasi database gagal' },
              ].map((act, idx) => (
                <div key={idx} className="border-b pb-2.5 last:border-0 last:pb-0">
                  <p className="text-slate-700 font-bold leading-normal">{act.text}</p>
                  <p className="text-[9px] text-slate-400 mt-1">{act.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Integrasi & Sinkronisasi */}
          <Card>
            <CardHeader className="py-2.5 px-4 bg-slate-50/50 border-b">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Globe size={14} /> Integrasi &amp; Sinkronisasi Data
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3.5">
              {[
                { label: 'SID Kemendagri', progress: 100, update: 'Hari ini, 03:20' },
                { label: 'Open Data Dinsos', progress: 100, update: 'Kemarin, 22:30' },
                { label: 'Geoportal Desa', progress: 97, update: '16 Jul, 02:40' },
                { label: 'Sistem Pihak Ketiga Lainnya', progress: 92, update: '15 Jul, 18:00' },
              ].map((s, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-slate-700">{s.label}</span>
                    <span className="font-black text-indigo-700">{s.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${s.progress}%` }} />
                  </div>
                  <p className="text-[8px] text-slate-400 font-semibold text-right">Update: {s.update}</p>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}