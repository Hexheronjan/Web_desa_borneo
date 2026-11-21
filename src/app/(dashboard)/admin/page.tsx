'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Users, Layers, Database, Server, Activity,
  Settings, Clock, BarChart3, TrendingUp, Info, ShieldAlert,
  Globe, FileText
} from 'lucide-react';
import Link from 'next/link';

const TREN_DATA = [
  { bulan: 'Pra (Baseline)', kesiapan: 58.18, qol: 68.43 },
  { bulan: 'Minggu 1', kesiapan: 58.65, qol: 68.80 },
  { bulan: 'Minggu 2', kesiapan: 59.20, qol: 69.18 },
  { bulan: 'Minggu 3', kesiapan: 59.85, qol: 69.56 },
  { bulan: 'Minggu 4 (Pasca)', kesiapan: 60.45, qol: 69.97 },
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
          { label: 'Partisipan Uji 3 Desa', val: '126', detail: '42/desa · 7 peran × 18', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
          { label: 'Kelompok Fitur Inti', val: '35 Fitur', detail: 'F-001 s.d. F-035 (UML)', icon: Layers, color: 'text-green-600', bg: 'bg-green-50 border-green-100' },
          { label: 'Tugas UAT Relevan', val: '837 / 966', detail: '86,65% lulus · F-029 retest', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
          { label: 'Selesai Minggu 4', val: '98,41%', detail: '248/252 tugas · 0 kesalahan', icon: Database, color: 'text-cyan-600', bg: 'bg-cyan-50 border-cyan-100' },
          { label: 'Skor SUS / Kualitas', val: '67,58', detail: 'α=0,955 · Kualitas 3,39/5', icon: Server, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
          { label: 'Tindak Lanjut Kritis', val: '1 Fitur', detail: 'F-029 Nakes perlu retest', icon: ShieldAlert, color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
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
                <p className="text-[9px] text-slate-500 font-semibold mt-1">{k.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── BARIS 2: INDEKS RATA-RATA TIGA DESA IMPLEMENTASI (4 KARTU) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Skor Kesiapan Rata-rata (N=126)', val: '60,45', sub: 'Pra 58,18 (+2,27 · p=0,0900 NS)', color: '#1e88e5', progress: 60.5 },
          { label: 'Tingkat Kematangan (N=121)', val: '2,53', sub: 'Pra 1,94 (+0,59 · Berkembang)', color: '#2e7d32', progress: 50.6 },
          { label: 'Manfaat Awal QoL (N=126)', val: '69,97', sub: 'Pra 68,43 (+1,54 · Signifikan)', color: '#f57c00', progress: 70.0 },
          { label: 'Capaian SDGs 3, 4, 18 (54 KPI)', val: '80,67%', sub: 'Awal 72,76% (+7,90 poin)', color: '#7b1fa2', progress: 80.7 }
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
        <span>Ringkasan selaras Bab IV (Dataset SLV 1, SLV 2, SLV 3 v1.2) — Lokus <strong>Desa Jonggon Jaya, Desa Kedang Ipil, dan Desa Lung Anai</strong> (Kab. Kutai Kartanegara).</span>
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
                  { label: 'Desa Penelitian', val: '3 Desa' },
                  { label: 'Dimensi / Indikator', val: '6 / 24' },
                  { label: 'Panel Pakar', val: '3 Pakar (P1–P3)' },
                  { label: 'CR Dimensi AHP', val: '0,00144' },
                  { label: 'Versi Kerangka', val: 'v1.2 Final' },
                  { label: 'Artefak DSRM', val: '6 Artefak (A1–A6)' },
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
                  <TrendingUp size={14} /> Status Rekomendasi DSS (SAW)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 grid grid-cols-2 gap-3.5">
                {[
                  { label: 'Kriteria SAW', val: '6 (C1–C6)' },
                  { label: 'Alternatif Dinilai', val: '30 Baris (3×10)' },
                  { label: 'Jonggon Jaya #1', val: 'A08 (0,9509)' },
                  { label: 'Kedang Ipil / Lung Anai', val: 'A02 (0,92 / 0,91)' },
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