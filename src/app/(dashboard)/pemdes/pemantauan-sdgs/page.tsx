'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Heart, GraduationCap, RefreshCw, AlertTriangle, Lock, ShieldCheck, Landmark } from 'lucide-react';
import { useState } from 'react';
import { DESA_BAB4 } from '@/lib/bab4-data';

const COLOR = '#283593';

type SDG_TYPE = 'sdg3' | 'sdg4' | 'sdg18';

const SDG_CONFIG = {
  sdg3: {
    title: 'SDGs Desa 3 — Desa Sehat dan Sejahtera (18 Unit KPI — 6 KPI/Desa)',
    ikon: <Heart size={16} className="text-red-600" />,
    awal: 74.70,
    akhir: 82.24,
    delta: '+7,55 pp',
    kesenjangan: 'Validasi data agregat kesehatan (F-029) masih perlu perbaikan dan uji ulang (retest); pembaruan data Posyandu, ANC, dan stunting perlu konsistensi.',
    program: 'Posyandu Digital, Pemantauan Stunting & ANC Ibu Hamil, Verifikasi Data Agregat Kesehatan (F-026–F-030)',
    tindakLanjut: 'Perbaikan aturan validasi agregat F-029, pendampingan kader Posyandu, dan integrasi pelaporan ke Puskesmas/Pustu.',
    perDesa: [
      { desa: 'Jonggon Jaya', pasca: 85.5 },
      { desa: 'Kedang Ipil', pasca: 80.9 },
      { desa: 'Lung Anai', pasca: 80.4 },
    ],
    agregat: [
      { label: 'Capaian Awal (% Target)', value: '74,70%' },
      { label: 'Capaian Pasca (% Target)', value: '82,24%' },
      { label: 'Perubahan (4 Minggu)', value: '+7,55 pp' },
    ],
  },
  sdg4: {
    title: 'SDGs Desa 4 — Pendidikan Desa Berkualitas (18 Unit KPI — 6 KPI/Desa)',
    ikon: <GraduationCap size={16} className="text-blue-600" />,
    awal: 66.68,
    akhir: 74.90,
    delta: '+8,22 pp',
    kesenjangan: 'Capaian akhir terendah di antara 3 tujuan SDGs (74,90%); angka putus sekolah (indikator biaya) dan UAT Guru (79,86%) menuntut pendampingan khusus.',
    program: 'Penguatan Literasi Digital, Sumber Belajar, Kompetensi SDM Pendidikan, dan Pendampingan Guru (F-021–F-025)',
    tindakLanjut: 'Prioritaskan mutu data pendidikan, panduan tugas sederhana bagi guru, pelatihan literasi digital, dan pencegahan putus sekolah.',
    perDesa: [
      { desa: 'Jonggon Jaya', pasca: 76.1 },
      { desa: 'Kedang Ipil', pasca: 75.0 },
      { desa: 'Lung Anai', pasca: 73.6 },
    ],
    agregat: [
      { label: 'Capaian Awal (% Target)', value: '66,68%' },
      { label: 'Capaian Pasca (% Target)', value: '74,90%' },
      { label: 'Perubahan (Terbesar)', value: '+8,22 pp' },
    ],
  },
  sdg18: {
    title: 'SDGs Desa 18 — Kelembagaan Desa Dinamis & Budaya Adaptif (18 Unit KPI)',
    ikon: <Landmark size={16} className="text-emerald-600" />,
    awal: 76.92,
    akhir: 84.86,
    delta: '+7,94 pp',
    kesenjangan: 'Pelindungan data budaya (klasifikasi publik/terbatas/rahasia, persetujuan komunitas, dan jejak audit) harus terus dijaga konsisten lintas aktor.',
    program: 'Persetujuan & Klasifikasi Data Budaya, Dokumentasi Pengetahuan Dayak Kenyah & Kutai Adat Lawas, Musyawarah Adat (F-011–F-015)',
    tindakLanjut: 'Pertahankan kewenangan verifikasi Lembaga Adat dalam setiap pemanfaatan data budaya dan musyawarah program desa.',
    perDesa: [
      { desa: 'Jonggon Jaya', pasca: 83.7 },
      { desa: 'Kedang Ipil', pasca: 83.5 },
      { desa: 'Lung Anai', pasca: 87.4 },
    ],
    agregat: [
      { label: 'Capaian Awal (% Target)', value: '76,92%' },
      { label: 'Capaian Pasca (% Target)', value: '84,86%' },
      { label: 'Perubahan (4 Minggu)', value: '+7,94 pp' },
    ],
  },
};

export default function PemantauanSDGsPage() {
  const [activeTab, setActiveTab] = useState<SDG_TYPE>('sdg3');
  const cfg = SDG_CONFIG[activeTab];

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Pemantauan SDGs Desa 3, 4, dan 18 (54 Unit KPI — Bab IV Tabel 4.45 &amp; Gambar 4.23)" modul="Pemerintah Desa" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <Lock size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-medium leading-relaxed text-amber-800">
          Pemerintah Desa hanya melihat <strong>informasi agregat, kesenjangan, program, dan tindak lanjut</strong>. Capaian keseluruhan 54 unit KPI (18 KPI × 3 desa) meningkat dari <strong>72,76%</strong> menjadi <strong>80,67% (+7,90 pp)</strong> selama periode pengamatan empat minggu.
        </p>
      </div>

      <div className="flex gap-2 border-b pb-2 flex-wrap">
        <button onClick={() => setActiveTab('sdg3')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 border ${activeTab === 'sdg3' ? 'bg-indigo-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>
          <Heart size={13} /> SDGs Desa 3 — Kesehatan (82,24%)
        </button>
        <button onClick={() => setActiveTab('sdg4')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 border ${activeTab === 'sdg4' ? 'bg-indigo-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>
          <GraduationCap size={13} /> SDGs Desa 4 — Pendidikan (74,90%)
        </button>
        <button onClick={() => setActiveTab('sdg18')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 border ${activeTab === 'sdg18' ? 'bg-indigo-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>
          <Landmark size={13} /> SDGs Desa 18 — Budaya &amp; Kelembagaan (84,86%)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-bold text-slate-800 leading-snug flex items-center gap-2">
                {cfg.ikon} {cfg.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {cfg.agregat.map((a, i) => (
                  <div key={i} className="p-3 bg-slate-50 border rounded-xl">
                    <p className="text-[10px] text-slate-400 font-semibold">{a.label}</p>
                    <p className="font-black text-slate-800 text-[15px] mt-0.5">{a.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="font-bold text-slate-700 mb-2">Capaian KPI Pascaimplementasi Menurut Desa (Gambar 4.23):</p>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cfg.perDesa} barSize={44}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="desa" tick={{ fontSize: 10, fill: '#64748b' }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
                      <Tooltip contentStyle={{ fontSize: 10 }} formatter={(v: any) => [`${v}%`, 'Capaian Pasca']} />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
                      <Bar dataKey="pasca" name="Capaian Pasca terhadap Target (%)" fill={COLOR} radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-1">
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2" style={{ color: COLOR }}>
              <AlertTriangle size={16} /> Analisis Kesenjangan &amp; Tindak Lanjut
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5 text-xs">
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
              <p className="font-bold text-red-700">Kesenjangan &amp; Catatan Audit:</p>
              <p className="text-[10px] text-red-800 leading-relaxed font-medium">{cfg.kesenjangan}</p>
            </div>
            <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-1">
              <p className="font-bold text-indigo-900">Kelompok Fitur &amp; Program:</p>
              <p className="text-[10px] text-slate-600 leading-relaxed font-semibold">{cfg.program}</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl space-y-1">
              <p className="font-bold text-green-700">Rencana Tindak Lanjut:</p>
              <p className="text-[10px] text-green-800 leading-relaxed font-medium">{cfg.tindakLanjut}</p>
            </div>
            <div className="p-2.5 bg-slate-50 border rounded-xl space-y-1 text-[10px] text-slate-600">
              {DESA_BAB4.map((d) => (
                <div key={d.id} className="flex justify-between">
                  <span className="font-semibold">{d.nama}</span>
                  <span className="font-mono font-bold text-indigo-700">{d.sdgKPI.awal.toFixed(2)}% → {d.sdgKPI.akhir.toFixed(2)}%</span>
                </div>
              ))}
            </div>
            <div className="p-2.5 bg-slate-50 border rounded-xl flex items-center gap-2">
              <ShieldCheck size={14} className="text-indigo-700 flex-shrink-0" />
              <span className="text-[10px] text-slate-500 font-semibold">Perubahan implementatif 4 minggu (Dataset SLV 3 — 10_SDG_KPI).</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} /> Sumber: Dataset SLV 3 v1.2 — 54 Unit KPI SDGs Desa (3, 4, dan 18)</span>
        <span>Keseluruhan: 72,76% → 80,67% (+7,90 pp)</span>
      </div>
    </div>
  );
}
