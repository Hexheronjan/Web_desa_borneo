'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Target, TrendingDown, Users, AlertTriangle, ChevronRight } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const CLR = '#0369a1';

const KESENJANGAN_DATA = [
  {
    id: 1,
    indikator: 'Cakupan Kunjungan ANC Lengkap',
    kondisiAktual: 72,
    target: 100,
    kesenjangan: 28,
    kelompokPrioritas: 'Ibu Hamil Trimester 2-3',
    wilayah: 'Dusun 1',
    kualitasData: 'Baik',
    kemungkinanPenyebab: 'Jarak ke Puskesmas jauh, kendala transportasi',
    alternatifTindakLanjut: 'Kunjungan rumah bidan, jadwal ANC mobile',
    penangungJawab: 'Bidan Desa + Kader',
  },
  {
    id: 2,
    indikator: 'Cakupan Imunisasi Dasar Lengkap Balita',
    kondisiAktual: 78,
    target: 95,
    kesenjangan: 17,
    kelompokPrioritas: 'Bayi 0-12 Bulan',
    wilayah: 'Dusun 2 & 3',
    kualitasData: 'Cukup',
    kemungkinanPenyebab: 'Orang tua belum mengetahui jadwal, vaksin sempat kosong',
    alternatifTindakLanjut: 'Sweeping imunisasi, sosialisasi jadwal via kader',
    penangungJawab: 'Nakes + Kader Kesehatan',
  },
  {
    id: 3,
    indikator: 'Balita Ditimbang Rutin (D/S)',
    kondisiAktual: 65,
    target: 85,
    kesenjangan: 20,
    kelompokPrioritas: 'Balita 6-24 Bulan',
    wilayah: 'Dusun 3',
    kualitasData: 'Perlu Pembaruan',
    kemungkinanPenyebab: 'Waktu Posyandu bersamaan dengan kegiatan pertanian',
    alternatifTindakLanjut: 'Jadwal ulang Posyandu, tambah frekuensi',
    penangungJawab: 'Kader Posyandu + Kepala Dusun',
  },
  {
    id: 4,
    indikator: 'Skrining Kesehatan Lansia',
    kondisiAktual: 55,
    target: 80,
    kesenjangan: 25,
    kelompokPrioritas: 'Lansia ≥60 Tahun',
    wilayah: 'Seluruh Dusun',
    kualitasData: 'Perlu Pembaruan',
    kemungkinanPenyebab: 'Posyandu Lansia baru 1x per bulan, akses terbatas',
    alternatifTindakLanjut: 'Tambah frekuensi Posyandu Lansia, kunjungan rumah',
    penangungJawab: 'Nakes + Kader',
  },
  {
    id: 5,
    indikator: 'Akses Sanitasi Layak',
    kondisiAktual: 82,
    target: 100,
    kesenjangan: 18,
    kelompokPrioritas: 'KK Dusun 3',
    wilayah: 'Dusun 3',
    kualitasData: 'Baik',
    kemungkinanPenyebab: 'Keterbatasan ekonomi, lahan sempit',
    alternatifTindakLanjut: 'Koordinasi dengan Program Desa, bantuan jamban sehat',
    penangungJawab: 'Pemdes + Nakes',
  },
];

const RADAR_DATA = [
  { aspek: 'ANC Lengkap', kondisi: 72, target: 100 },
  { aspek: 'Imunisasi', kondisi: 78, target: 95 },
  { aspek: 'D/S Posyandu', kondisi: 65, target: 85 },
  { aspek: 'Lansia Skrining', kondisi: 55, target: 80 },
  { aspek: 'Sanitasi', kondisi: 82, target: 100 },
];

const KUALITAS_COLOR: Record<string, string> = {
  'Baik': '#16a34a',
  'Cukup': '#d97706',
  'Perlu Pembaruan': '#dc2626',
};

export default function AnalisisKesenjangan() {
  const [selected, setSelected] = useState<number | null>(null);
  const avgKesenjangan = Math.round(KESENJANGAN_DATA.reduce((s, d) => s + d.kesenjangan, 0) / KESENJANGAN_DATA.length);

  return (
    <div className="flex flex-col gap-4 pb-8 text-xs">

      {/* HEADER */}
      <div className="border-b pb-3">
        <h1 className="text-xl font-black text-slate-800">Analisis Kesenjangan Kesehatan</h1>
        <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Tenaga Kesehatan — Selisih Kondisi Aktual vs. Target Layanan Kesehatan</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Indikator Dianalisis', val: KESENJANGAN_DATA.length, icon: Target, color: '#0369a1' },
          { label: 'Rata-rata Kesenjangan', val: `${avgKesenjangan}%`, icon: TrendingDown, color: '#dc2626' },
          { label: 'Prioritas Wilayah', val: 'Dusun 3', icon: Users, color: '#d97706', isText: true },
          { label: 'Data Perlu Diperbarui', val: KESENJANGAN_DATA.filter(d => d.kualitasData === 'Perlu Pembaruan').length, icon: AlertTriangle, color: '#ea580c' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide leading-tight">{s.label}</p>
                <Icon size={13} style={{ color: s.color }} />
              </div>
              <p className="text-2xl font-black text-slate-800">{s.val}</p>
            </div>
          );
        })}
      </div>

      {/* RADAR CHART */}
      <Card>
        <CardHeader className="py-2.5 border-b">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Peta Kesenjangan — Kondisi Aktual vs. Target</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR_DATA}>
                <PolarGrid />
                <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 9 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 8 }} />
                <Radar name="Kondisi Aktual" dataKey="kondisi" stroke={CLR} fill={CLR} fillOpacity={0.3} />
                <Radar name="Target" dataKey="target" stroke="#64748b" fill="#64748b" fillOpacity={0.1} strokeDasharray="4 2" />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* DAFTAR KESENJANGAN */}
      <Card>
        <CardHeader className="py-2.5 border-b">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Detail Kesenjangan per Indikator</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {KESENJANGAN_DATA.map(k => (
            <div key={k.id}
              className={`border rounded-xl p-3 cursor-pointer transition-all ${selected === k.id ? 'border-sky-400 bg-sky-50/30' : 'border-slate-200 hover:border-sky-300'}`}
              onClick={() => setSelected(selected === k.id ? null : k.id)}>
              <div className="flex justify-between items-start gap-2">
                <p className="font-bold text-slate-800 leading-snug flex-1">{k.indikator}</p>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded border flex-shrink-0"
                  style={{ color: KUALITAS_COLOR[k.kualitasData], borderColor: KUALITAS_COLOR[k.kualitasData], background: KUALITAS_COLOR[k.kualitasData] + '15' }}>
                  {k.kualitasData}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-[9px] font-semibold text-slate-500">
                  <span>Kondisi Aktual: <strong className="text-slate-800">{k.kondisiAktual}%</strong></span>
                  <span>Target: <strong className="text-slate-800">{k.target}%</strong></span>
                  <span className="text-red-600 font-bold">Kesenjangan: {k.kesenjangan}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden relative">
                  <div className="h-full rounded-full bg-sky-500" style={{ width: `${k.kondisiAktual}%` }} />
                  <div className="absolute top-0 h-full border-r-2 border-dashed border-slate-400" style={{ left: `${k.target}%` }} />
                </div>
              </div>

              {/* Expandable detail */}
              {selected === k.id && (
                <div className="mt-3 pt-3 border-t border-sky-200 grid grid-cols-1 gap-2">
                  <div><span className="text-slate-400 font-semibold">Kelompok Prioritas:</span> <span className="font-bold text-slate-700">{k.kelompokPrioritas}</span></div>
                  <div><span className="text-slate-400 font-semibold">Wilayah Prioritas:</span> <span className="font-bold text-slate-700">{k.wilayah}</span></div>
                  <div><span className="text-slate-400 font-semibold">Kemungkinan Penyebab:</span> <span className="font-semibold text-slate-700">{k.kemungkinanPenyebab}</span></div>
                  <div><span className="text-slate-400 font-semibold">Alternatif Tindak Lanjut:</span> <span className="font-bold text-sky-700">{k.alternatifTindakLanjut}</span></div>
                  <div><span className="text-slate-400 font-semibold">Penanggung Jawab:</span> <span className="font-bold text-slate-700">{k.penangungJawab}</span></div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2">
        <Info size={14} className="text-blue-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          Analisis ini menampilkan selisih antara kondisi aktual dan target layanan kesehatan secara agregat. Data digunakan sebagai dasar perencanaan program dan koordinasi lintas sektor — bukan sebagai penilaian individual masyarakat.
        </p>
      </div>

    </div>
  );
}
