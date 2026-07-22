'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, AlertTriangle, TrendingUp, TrendingDown, Minus, ChevronRight, ShieldAlert } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const CLR = '#b45309';

const PENYAKIT_DATA = [
  {
    id: 1,
    kondisi: 'ISPA (Infeksi Saluran Pernapasan Atas)',
    periode: 'Jan – Jun 2026',
    wilayah: 'Dusun 1 & 2',
    jumlahAgregat: 47,
    tren: 'naik',
    perhatian: 'Tinggi',
    tindakLanjut: 'Edukasi PHBS, rujukan ke Puskesmas',
    sumber: 'Posyandu & Puskesmas',
    catatanPeriode: 'Meningkat 15% dari periode sebelumnya',
  },
  {
    id: 2,
    kondisi: 'Diare Akut',
    periode: 'Jan – Jun 2026',
    wilayah: 'Dusun 3',
    jumlahAgregat: 23,
    tren: 'tetap',
    perhatian: 'Sedang',
    tindakLanjut: 'Koordinasi sanitasi lingkungan, edukasi ORS',
    sumber: 'Posyandu & Laporan Kader',
    catatanPeriode: 'Stabil dibanding periode sebelumnya',
  },
  {
    id: 3,
    kondisi: 'Malnutrisi (Gizi Kurang)',
    periode: 'Jan – Jun 2026',
    wilayah: 'Seluruh Dusun',
    jumlahAgregat: 18,
    tren: 'turun',
    perhatian: 'Tinggi',
    tindakLanjut: 'Pemantauan tumbuh kembang, distribusi PMT',
    sumber: 'Posyandu & Survei Gizi',
    catatanPeriode: 'Turun 8% berkat program PMT',
  },
  {
    id: 4,
    kondisi: 'Hipertensi (≥140/90 mmHg)',
    periode: 'Jan – Jun 2026',
    wilayah: 'Dusun 1',
    jumlahAgregat: 31,
    tren: 'naik',
    perhatian: 'Sedang',
    tindakLanjut: 'Skrining lansia, edukasi diet rendah garam',
    sumber: 'Pemeriksaan Posyandu Lansia',
    catatanPeriode: 'Meningkat di kelompok ≥50 tahun',
  },
  {
    id: 5,
    kondisi: 'Dermatitis / Penyakit Kulit',
    periode: 'Jan – Jun 2026',
    wilayah: 'Dusun 2',
    jumlahAgregat: 12,
    tren: 'turun',
    perhatian: 'Rendah',
    tindakLanjut: 'Edukasi kebersihan diri, rujukan jika kronik',
    sumber: 'Laporan Kader Kesehatan',
    catatanPeriode: 'Berkurang setelah program air bersih',
  },
];

const GRAFIK_DATA = PENYAKIT_DATA.map(p => ({
  name: p.kondisi.length > 20 ? p.kondisi.substring(0, 20) + '…' : p.kondisi,
  jumlah: p.jumlahAgregat,
  perhatian: p.perhatian,
}));

const PERHATIAN_COLOR: Record<string, string> = {
  Tinggi: '#dc2626',
  Sedang: '#d97706',
  Rendah: '#16a34a',
};

const TREN_ICON = {
  naik: <TrendingUp size={13} className="text-red-600" />,
  tetap: <Minus size={13} className="text-amber-600" />,
  turun: <TrendingDown size={13} className="text-green-600" />,
};

export default function PenyakitPrioritasPage() {
  const [filterPerhatian, setFilterPerhatian] = useState('Semua');

  const filtered = filterPerhatian === 'Semua'
    ? PENYAKIT_DATA
    : PENYAKIT_DATA.filter(p => p.perhatian === filterPerhatian);

  const tinggiCount = PENYAKIT_DATA.filter(p => p.perhatian === 'Tinggi').length;
  const sedangCount = PENYAKIT_DATA.filter(p => p.perhatian === 'Sedang').length;
  const rendahCount = PENYAKIT_DATA.filter(p => p.perhatian === 'Rendah').length;

  return (
    <div className="flex flex-col gap-4 pb-8 text-xs">

      {/* HEADER */}
      <div className="border-b pb-3">
        <h1 className="text-xl font-black text-slate-800">Penyakit Prioritas</h1>
        <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Tenaga Kesehatan — Monitoring Kondisi Kesehatan Prioritas Desa Lung Anai</p>
      </div>

      {/* Peringatan Terminologi */}
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2">
        <ShieldAlert size={14} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="text-amber-900 font-semibold leading-relaxed">
          <strong>Catatan Penting:</strong> Istilah "penyakit prioritas" digunakan untuk perencanaan layanan, bukan untuk memberi label terhadap masyarakat tertentu. Data disajikan secara agregat berdasarkan kewenangan layanan Tenaga Kesehatan.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Perhatian Tinggi', val: tinggiCount, color: '#dc2626', bg: 'bg-red-50 border-red-200' },
          { label: 'Perhatian Sedang', val: sedangCount, color: '#d97706', bg: 'bg-amber-50 border-amber-200' },
          { label: 'Perhatian Rendah', val: rendahCount, color: '#16a34a', bg: 'bg-green-50 border-green-200' },
        ].map((s, i) => (
          <div key={i} className={`rounded-xl p-3 border ${s.bg} flex flex-col gap-1`}>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">{s.label}</p>
            <p className="text-3xl font-black" style={{ color: s.color }}>{s.val}</p>
            <p className="text-[9px] text-slate-500">kondisi</p>
          </div>
        ))}
      </div>

      {/* GRAFIK DISTRIBUSI */}
      <Card>
        <CardHeader className="py-2.5 border-b">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Distribusi Agregat Kondisi Prioritas (Jan–Jun 2026)</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GRAFIK_DATA} margin={{ left: -10, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 8 }} angle={-20} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip />
                <Bar dataKey="jumlah" name="Jumlah Kasus Agregat" radius={[4,4,0,0]}>
                  {GRAFIK_DATA.map((entry, i) => (
                    <Cell key={i} fill={PERHATIAN_COLOR[entry.perhatian] || '#64748b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[9px] text-slate-400 text-center mt-1">Sumber: Posyandu, Puskesmas, Survei, dan Laporan Kader</p>
        </CardContent>
      </Card>

      {/* FILTER + TABEL */}
      <Card>
        <CardHeader className="py-2.5 border-b flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Daftar Kondisi Prioritas</CardTitle>
          <div className="flex gap-1">
            {['Semua', 'Tinggi', 'Sedang', 'Rendah'].map(f => (
              <button key={f} onClick={() => setFilterPerhatian(f)}
                className={`text-[10px] px-2.5 py-1 rounded-lg border font-bold transition-all ${filterPerhatian === f ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400'}`}>
                {f}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {filtered.map(p => (
            <div key={p.id} className="border border-slate-200 rounded-xl p-3 hover:border-amber-300 transition-all">
              <div className="flex justify-between items-start gap-2 mb-2">
                <p className="font-bold text-slate-800 leading-snug flex-1">{p.kondisi}</p>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {TREN_ICON[p.tren as keyof typeof TREN_ICON]}
                  <span className="text-[9px] font-bold capitalize text-slate-500">{p.tren}</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded border"
                    style={{ color: PERHATIAN_COLOR[p.perhatian], borderColor: PERHATIAN_COLOR[p.perhatian], background: PERHATIAN_COLOR[p.perhatian] + '15' }}>
                    {p.perhatian}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
                <div><span className="text-slate-400 font-semibold">Periode:</span> <span className="font-bold text-slate-700">{p.periode}</span></div>
                <div><span className="text-slate-400 font-semibold">Wilayah:</span> <span className="font-bold text-slate-700">{p.wilayah}</span></div>
                <div><span className="text-slate-400 font-semibold">Jumlah Agregat:</span> <span className="font-bold text-slate-700">{p.jumlahAgregat} kasus</span></div>
                <div><span className="text-slate-400 font-semibold">Sumber Data:</span> <span className="font-bold text-slate-700">{p.sumber}</span></div>
                <div className="col-span-2"><span className="text-slate-400 font-semibold">Tindak Lanjut:</span> <span className="font-bold text-slate-700">{p.tindakLanjut}</span></div>
                <div className="col-span-2 text-[9px] italic text-slate-400">{p.catatanPeriode}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Informasi Data */}
      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2">
        <Info size={14} className="text-blue-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          Data penyakit prioritas disajikan secara <strong>agregat</strong> berdasarkan sebaran wilayah tanpa membuka identitas individu. Gunakan data ini untuk perencanaan layanan, edukasi kesehatan, dan koordinasi program — bukan untuk memberi label terhadap masyarakat tertentu.
        </p>
      </div>

    </div>
  );
}
