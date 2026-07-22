'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  GraduationCap, Award, ShieldCheck, Monitor, Users, BookOpen,
  ArrowUpRight, ChevronRight, AlertTriangle, CheckCircle2, Bell,
  FileText, CheckCircle, HelpCircle, Info
} from 'lucide-react';

const CLR = {
  primary: '#1565c0',
  secondary: '#1e88e5',
  green: '#2e7d32',
  orange: '#e65100',
  red: '#c62828',
};

const pengumumanData = [
  { id: 1, judul: 'Rapat Koordinasi Pendidikan Desa 4 Tahun 2026', tgl: '10/07/2026' },
  { id: 2, judul: 'Pelatihan Literasi Digital untuk Guru Tahap 2', tgl: '08/07/2026' },
  { id: 3, judul: 'Pendataan Sarpras Pendidikan Semester I Tahun 2026', tgl: '05/07/2026' },
  { id: 4, judul: 'Workshop Penguatan Kurikulum Merdeka di Desa 4', tgl: '02/07/2026' },
  { id: 5, judul: 'Monitoring dan Evaluasi Program Pendidikan Triwulan II Tahun 2026', tgl: '30/06/2026' },
];

export default function GuruDashboardPage() {
  const [periode, setPeriode] = useState('Periode 2026');

  return (
    <div className="flex flex-col gap-4 pb-8 text-xs bg-slate-50/50">

      {/* ── HEADER ── */}
      <div className="flex justify-between items-center border-b pb-3 flex-wrap gap-2">
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">GURU / TENAGA PENDIDIKAN</h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Dasbor Pendidikan dan SDG Desa 4</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={periode}
            onChange={e => setPeriode(e.target.value)}
            className="h-8 px-3 rounded-lg border border-slate-200 text-xs font-bold bg-white text-slate-700 focus:outline-none"
          >
            <option>Periode 2026</option>
            <option>Semester 1 2026</option>
            <option>Semester 2 2026</option>
          </select>
        </div>
      </div>

      {/* ── BARIS 1: WELCOME BANNER & PENGUMUMAN ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Welcome Banner */}
        <div className="lg:col-span-2 rounded-xl p-6 text-white relative overflow-hidden bg-gradient-to-r from-blue-700 to-blue-500 flex items-center justify-between shadow-sm">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-lg font-black leading-tight mb-2">Selamat datang, Guru Fasilitator Desa! 👋</h2>
            <p className="text-xs text-blue-50 leading-relaxed">
              Mari bersama meningkatkan kualitas pendidikan dan literasi digital di Desa 4 untuk mendukung target SDG 4: Pendidikan Berkualitas.
            </p>
          </div>
          <div className="hidden sm:block text-7xl opacity-90 pr-4 select-none">🏫</div>
        </div>

        {/* Pengumuman List */}
        <Card className="shadow-sm">
          <CardHeader className="py-2.5 border-b flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
              Pengumuman Pendidikan
            </CardTitle>
            <Link href="/guru/notifikasi" className="text-[10px] text-blue-600 font-bold hover:underline">Lihat Semua →</Link>
          </CardHeader>
          <CardContent className="p-3 space-y-2">
            {pengumumanData.map(n => (
              <div key={n.id} className="flex gap-2 p-2 rounded-lg bg-blue-50/40 border border-blue-100">
                <span className="text-blue-700 mt-0.5">📢</span>
                <div>
                  <p className="font-bold text-slate-800 leading-snug">{n.judul}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5 font-mono">{n.tgl}</p>
                </div>
              </div>
            ))}
            <Link href="/guru/notifikasi" className="block text-center w-full py-1.5 border border-dashed rounded-lg text-blue-700 font-bold hover:bg-blue-50 mt-2 text-[10px]">
              Lihat Semua Pengumuman →
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* ── BARIS 2: 6 KARTU INDEKS UTAMA ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Skor Kesiapan Bidang Pendidikan', val: '72,40', sub: 'Baik ⬆', diff: '6,20 pts dari Apr 2026', prog: 72.4, color: '#1565c0', icon: GraduationCap },
          { label: 'Capaian SDG Desa 4', val: '68,30%', sub: 'Cukup ⬆', diff: '4,80% dari Apr 2026', prog: 68.3, color: '#2e7d32', icon: Award },
          { label: 'Kualitas Data Pendidikan', val: '85,10%', sub: 'Baik ⬆', diff: '7,30% dari Apr 2026', prog: 85.1, color: '#7c3aed', icon: ShieldCheck },
          { label: 'Skor Literasi Digital', val: '58,20', sub: 'Cukup ⬆', diff: '5,10 pts dari Apr 2026', prog: 58.2, color: '#0284c7', icon: Monitor },
          { label: 'Skor Kompetensi SDM Pendidikan', val: '70,10', sub: 'Baik ⬆', diff: '5,10 pts dari Apr 2026', prog: 70.1, color: '#db2777', icon: Users },
          { label: 'Program Pendidikan Aktif', val: '12', sub: 'Aktif ⬆', diff: '2 program dari Apr 2026', prog: 100, color: '#e65100', icon: BookOpen },
        ].map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col justify-between gap-1.5">
              <div className="flex justify-between items-start gap-1">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wide leading-tight">{k.label}</span>
                <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: k.color + '15' }}>
                  <Icon size={12} style={{ color: k.color }} />
                </div>
              </div>
              <div>
                <p className="text-xl font-black text-slate-800 leading-none">{k.val}</p>
                <div className="flex items-center gap-1 mt-1 text-[9px]">
                  <span className="font-bold" style={{ color: k.color }}>{k.sub}</span>
                  <span className="text-slate-400 font-medium">{k.diff}</span>
                </div>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full">
                <div className="h-full rounded-full" style={{ width: `${k.prog}%`, backgroundColor: k.color }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── BARIS 3: MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* KIRI: Aksi Cepat & Kesenjangan / Tindak Lanjut (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Aksi Cepat */}
          <Card className="shadow-sm">
            <CardHeader className="py-2.5 border-b">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase">Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="p-3 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Input Data', desc: 'Tambah atau perbarui data', path: '/guru/data-pendidikan-desa', icon: '📝', color: 'bg-blue-50 border-blue-200 text-blue-900' },
                { label: 'Verifikasi Data', desc: 'Validasi & kelengkapan data', path: '/guru/data-pendidikan-desa', icon: '✅', color: 'bg-green-50 border-green-200 text-green-900' },
                { label: 'Program Prioritas', desc: 'Kelola program prioritas', path: '/guru/program-tindak-lanjut', icon: '📂', color: 'bg-amber-50 border-amber-200 text-amber-900' },
                { label: 'Laporan', desc: 'Unduh & lihat laporan', path: '/guru/laporan', icon: '📊', color: 'bg-purple-50 border-purple-200 text-purple-900' },
              ].map((item, i) => (
                <Link key={i} href={item.path} className={`p-3 border rounded-xl flex gap-2.5 items-center hover:shadow-md transition-all bg-white`}>
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 text-[11px] leading-tight">{item.label}</p>
                    <p className="text-[9px] text-slate-400 mt-0.5 truncate">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Grid Kesenjangan & Tindak Lanjut */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Kesenjangan Prioritas */}
            <Card className="border-red-100 shadow-sm">
              <CardHeader className="py-2.5 border-b bg-red-50/20">
                <CardTitle className="text-xs font-bold text-red-900 uppercase flex items-center gap-1.5">
                  <AlertTriangle size={13} className="text-red-650" /> Kesenjangan Prioritas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {[
                  'Literasi digital peserta didik dan guru masih terbatas di sebagian wilayah.',
                  'Pembaruan data pendidikan belum lengkap dan belum konsisten.',
                  'Partisipasi pelatihan dan pengembangan SDM pendidikan tidak merata.',
                ].map((text, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-red-500 mt-0.5">⚠️</span>
                    <p className="text-slate-650 leading-relaxed font-semibold">{text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Prioritas Tindak Lanjut */}
            <Card className="border-green-100 shadow-sm">
              <CardHeader className="py-2.5 border-b bg-green-50/20">
                <CardTitle className="text-xs font-bold text-green-900 uppercase flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-green-600" /> Prioritas Tindak Lanjut
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {[
                  'Perluasan pelatihan literasi digital untuk guru dan peserta didik.',
                  'Tingkatkan kelengkapan dan ketepatan pembaruan data pendidikan.',
                  'Perluas akses dan partisipasi pelatihan SDM pendidikan di seluruh wilayah.',
                ].map((text, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-green-600 mt-0.5">✔️</span>
                    <p className="text-slate-650 leading-relaxed font-semibold">{text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>

        </div>

        {/* KANAN: Rekomendasi Pendidikan & Batasan (1/3) */}
        <div className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader className="py-2.5 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1">
                Rekomendasi Pendidikan
              </CardTitle>
              <Link href="/guru/rekomendasi" className="text-[10px] text-blue-600 font-bold hover:underline">Lihat Semua →</Link>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {[
                { no: 1, text: 'Optimalkan penyediaan sarana Chromebook untuk sekolah di Dusun 3', prioritas: 'Tinggi' },
                { no: 2, text: 'Jadwalkan pendampingan guru digital intensif untuk SD Lung Anai', prioritas: 'Tinggi' },
                { no: 3, text: 'Gunakan dana desa untuk beasiswa coding anak berprestasi', prioritas: 'Sedang' },
              ].map((item, i) => (
                <div key={i} className="space-y-1 pb-2 border-b last:border-0 last:pb-0">
                  <p className="font-bold text-slate-800 leading-snug">#{item.no} {item.text}</p>
                  <span className={`inline-block text-[8px] font-bold px-1.5 py-0.2 rounded border ${
                    item.prioritas === 'Tinggi' ? 'bg-red-50 text-red-750 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>{item.prioritas}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>

      {/* ── WATERMARK DATA SIMULASI ── */}
      <p className="text-center text-[10px] text-slate-400 font-medium tracking-wide mt-2">
        Data simulasi terkendali untuk ilustrasi Artefak 6
      </p>

      {/* ── FOOTER ── */}
      <div className="flex items-center justify-between text-[9px] text-slate-400 pt-2 border-t">
        <span>APL-SLV Borneo © 2026 · Smart Living Village for Borneo</span>
        <span>Desa Lung Anai, Kecamatan Loa Kuluu, Kabupaten Kutai Kartanegara</span>
      </div>

    </div>
  );
}
