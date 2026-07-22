'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts';
import {
  Globe, Heart, GraduationCap, RefreshCw, AlertTriangle, Lock, ShieldCheck, Landmark
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

type SDG_TYPE = 'sdg3' | 'sdg4' | 'sdg18';

const SDG_CONFIG = {
  sdg3: {
    title: 'SDG Desa 3 — Desa Sehat & Sejahtera',
    ikon: <Heart size={16} className="text-red-600" />,
    skor: 78.5,
    kesenjangan: 'Kebutuhan nutrisi ibu hamil di RT 03 Dusun B masih kurang (selisih 6.5 poin dari target)',
    program: 'Gerakan 1000 HPK, Penguatan Posyandu Digital, Pengadaan Ambulans Desa',
    tindakLanjut: 'Penyaluran PMT (Pemberian Makanan Tambahan) fokus di RT 03 Dusun B mulai Agustus 2026',
    tren: [
      { name: '2023', skor: 72.0 },
      { name: '2024', skor: 74.5 },
      { name: '2025', skor: 76.8 },
      { name: '2026 (Kini)', skor: 78.5 },
    ],
    agregat: [
      { label: 'Cakupan Imunisasi Balita', value: '92%' },
      { label: 'Akses Sanitasi Layak', value: '88%' },
      { label: 'Angka Stunting', value: '14% (Kategori Aman)' },
    ]
  },
  sdg4: {
    title: 'SDG Desa 4 — Pendidikan Desa Berkualitas',
    ikon: <GraduationCap size={16} className="text-blue-600" />,
    skor: 74.20,
    kesenjangan: 'Akses komputer di PAUD Dusun C masih rendah (selisih 10.8 poin dari target)',
    program: 'Beasiswa Kuliah Desa, Sekolah Adat, Kelas Literasi Digital Pemuda',
    tindakLanjut: 'Pengiriman 5 unit laptop ke TBM Dusun C pada September 2026',
    tren: [
      { name: '2023', skor: 68.5 },
      { name: '2024', skor: 70.2 },
      { name: '2025', skor: 72.1 },
      { name: '2026 (Kini)', skor: 74.2 },
    ],
    agregat: [
      { label: 'Angka Melek Aksara', value: '98.5%' },
      { label: 'APK SD / Sederajat', value: '99.0%' },
      { label: 'Tingkat Kelulusan SMA', value: '84.0%' },
    ]
  },
  sdg18: {
    title: 'SDG Desa 18 — Kelembagaan Desa Dinamis & Budaya Adaptif',
    ikon: <Landmark size={16} className="text-emerald-600" />,
    skor: 82.15,
    kesenjangan: 'Dokumentasi digital bahasa daerah Dayak Kenyah belum lengkap (selisih 5.0 poin dari target)',
    program: 'Festival Adat Kenyah, Digitalisasi Huma Betang, Penulisan Kamus Adat',
    tindakLanjut: 'Perekaman audio sastra lisan Dayak Kenyah bersama sesepuh adat mulai Oktober 2026',
    tren: [
      { name: '2023', skor: 78.0 },
      { name: '2024', skor: 79.5 },
      { name: '2025', skor: 81.0 },
      { name: '2026 (Kini)', skor: 82.15 },
    ],
    agregat: [
      { label: 'Keberadaan Lembaga Adat Resmi', value: '1 Lembaga Aktif' },
      { label: 'Dokumentasi Hukum Adat', value: '120 Dokumen Digital' },
      { label: 'Jumlah Kegiatan Budaya/Tahun', value: '6 Agenda Utama' },
    ]
  }
};

export default function PemantauanSDGsPage() {
  const [activeTab, setActiveTab] = useState<SDG_TYPE>('sdg3');
  const cfg = SDG_CONFIG[activeTab];

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Pemantauan SDGs Desa" modul="Pemerintah Desa" color={COLOR} />

      {/* PRIVACY WARNING */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <Lock size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-medium leading-relaxed text-amber-700">
          Pemerintah Desa hanya melihat **informasi agregat, kesenjangan, program, tren, dan tindak lanjut**. Data kesehatan serta pendidikan individu tetap berada pada otoritas aktor sektoral (Bidan/Sekolah) demi menjaga kerahasiaan data pribadi.
        </p>
      </div>

      <div className="flex gap-2 border-b pb-2 flex-wrap">
        <button onClick={() => setActiveTab('sdg3')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 border ${activeTab === 'sdg3' ? 'bg-indigo-700 text-white' : 'bg-white text-slate-650 hover:bg-slate-50'}`}>
          <Heart size={13} /> SDG Desa 3 (Kesehatan)
        </button>
        <button onClick={() => setActiveTab('sdg4')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 border ${activeTab === 'sdg4' ? 'bg-indigo-700 text-white' : 'bg-white text-slate-650 hover:bg-slate-50'}`}>
          <GraduationCap size={13} /> SDG Desa 4 (Pendidikan)
        </button>
        <button onClick={() => setActiveTab('sdg18')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 border ${activeTab === 'sdg18' ? 'bg-indigo-700 text-white' : 'bg-white text-slate-650 hover:bg-slate-50'}`}>
          <Landmark size={13} /> SDG Desa 18 (Budaya & Lembaga)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* DETAIL & TREN */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-bold text-slate-800 leading-snug flex items-center gap-2">
                {cfg.ikon} {cfg.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              
              {/* DATA AGREGAT */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {cfg.agregat.map((a, i) => (
                  <div key={i} className="p-3 bg-slate-50 border rounded-xl">
                    <p className="text-[10px] text-slate-400 font-semibold">{a.label}</p>
                    <p className="font-bold text-slate-800 text-[14px] mt-0.5">{a.value}</p>
                  </div>
                ))}
              </div>

              {/* TREN GRAFIK */}
              <div>
                <p className="font-bold text-slate-700 mb-2">Tren Capaian SDGs (4 Periode Terakhir):</p>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cfg.tren}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} />
                      <YAxis domain={[60, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
                      <Tooltip contentStyle={{ fontSize: 10 }} />
                      <Line type="monotone" dataKey="skor" name="Skor Capaian" stroke={COLOR} strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* ANALISIS KESENJANGAN & PROGRAM */}
        <Card className="lg:col-span-1">
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2" style={{ color: COLOR }}>
              <AlertTriangle size={16} /> Analisis Kesenjangan & RTL
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5 text-xs">
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
              <p className="font-bold text-red-700">Kesenjangan Teridentifikasi:</p>
              <p className="text-[10px] text-red-650 leading-relaxed font-medium">{cfg.kesenjangan}</p>
            </div>

            <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-1">
              <p className="font-bold text-indigo-900">Program Terkait:</p>
              <p className="text-[10px] text-slate-600 leading-relaxed font-semibold">{cfg.program}</p>
            </div>

            <div className="p-3 bg-green-50 border border-green-200 rounded-xl space-y-1">
              <p className="font-bold text-green-700">Rencana Tindak Lanjut:</p>
              <p className="text-[10px] text-green-650 leading-relaxed font-medium">{cfg.tindakLanjut}</p>
            </div>

            <div className="p-2.5 bg-slate-50 border rounded-xl flex items-center gap-2">
              <ShieldCheck size={14} className="text-indigo-700 flex-shrink-0" />
              <span className="text-[10px] text-slate-500 font-semibold">Data terverifikasi aman secara sektoral.</span>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Sinkronisasi otomatis data SDGs Desa Kemendesa PDTT</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
