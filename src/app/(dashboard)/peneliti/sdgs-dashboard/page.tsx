'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { Globe, Heart, BookOpen, Landmark, TrendingUp, CheckCircle2 } from 'lucide-react';

const COLOR = '#1a365d';

const sdgsData = [
  {
    sdg: 'SDGs 3', nama: 'Kesehatan yang Baik', nilai: 72.40, color: '#e53935', icon: Heart,
    indikator: [
      { nama: 'Akses Layanan Kesehatan Dasar', nilai: 74.2 },
      { nama: 'Prevalensi Stunting', nilai: 70.6 },
      { nama: 'Sanitasi & Air Bersih', nilai: 72.5 },
      { nama: 'Posyandu Aktif', nilai: 80.0 },
      { nama: 'Jaminan Kesehatan', nilai: 68.8 },
    ]
  },
  {
    sdg: 'SDGs 4', nama: 'Pendidikan Berkualitas', nilai: 70.80, color: '#e65100', icon: BookOpen,
    indikator: [
      { nama: 'Angka Partisipasi Murni SD', nilai: 78.3 },
      { nama: 'Angka Partisipasi Murni SMP', nilai: 65.4 },
      { nama: 'Literasi Digital', nilai: 68.5 },
      { nama: 'Guru Bersertifikasi', nilai: 72.1 },
      { nama: 'Fasilitas Pendidikan', nilai: 69.7 },
    ]
  },
  {
    sdg: 'SDGs 18', nama: 'Kelembagaan & Budaya', nilai: 70.50, color: '#6a1b9a', icon: Landmark,
    indikator: [
      { nama: 'Ketahanan Budaya Lokal', nilai: 78.6 },
      { nama: 'Lembaga Adat Aktif', nilai: 74.2 },
      { nama: 'Dokumentasi Warisan Budaya', nilai: 65.8 },
      { nama: 'Musyawarah Adat', nilai: 72.5 },
      { nama: 'Partisipasi Budaya', nilai: 61.4 },
    ]
  },
];

const radarSDGs = [
  { aspek: 'SDGs 3 Kesehatan', nilai: 72.40 },
  { aspek: 'SDGs 4 Pendidikan', nilai: 70.80 },
  { aspek: 'SDGs 18 Budaya', nilai: 70.50 },
];

const trendData = [
  { tahun: '2023', sdg3: 65.2, sdg4: 62.8, sdg18: 64.1 },
  { tahun: '2024', sdg3: 68.9, sdg4: 66.4, sdg18: 67.3 },
  { tahun: '2025', sdg3: 72.40, sdg4: 70.80, sdg18: 70.50 },
];

function getKat(nilai: number) {
  if (nilai >= 80) return { label: 'Sangat Baik', cls: 'bg-green-100 text-green-700' };
  if (nilai >= 70) return { label: 'Baik', cls: 'bg-blue-100 text-blue-700' };
  return { label: 'Cukup', cls: 'bg-yellow-100 text-yellow-700' };
}

export default function SDGsDashboardPage() {
  const rataRata = (sdgsData.reduce((s, d) => s + d.nilai, 0) / sdgsData.length).toFixed(2);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard SDGs" modul="Analisis Framework" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'SDGs Desa', value: '3', sub: 'SDGs 3, 4, dan 18', color: COLOR, icon: Globe },
          { label: 'SDGs 3 Kesehatan', value: '72.40', sub: 'Kategori: Baik', color: '#e53935', icon: Heart },
          { label: 'SDGs 4 Pendidikan', value: '70.80', sub: 'Kategori: Baik', color: '#e65100', icon: BookOpen },
          { label: 'SDGs 18 Budaya', value: '70.50', sub: 'Kategori: Baik', color: '#6a1b9a', icon: Landmark },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: kpi.color + '18' }}>
                <Icon size={18} style={{ color: kpi.color }} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">{kpi.label}</p>
                <p className="text-base font-black text-gray-900 leading-tight">{kpi.value}</p>
                <p className="text-[10px] text-gray-500">{kpi.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3 SDGs Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {sdgsData.map((sdg, i) => {
          const Icon = sdg.icon;
          const kat = getKat(sdg.nilai);
          return (
            <Card key={i} className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: sdg.color }}>
                  <Icon size={16} /> {sdg.sdg} — {sdg.nama}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Score besar */}
                <div className="text-center mb-4 p-3 rounded-xl" style={{ backgroundColor: sdg.color + '10' }}>
                  <p className="text-4xl font-black" style={{ color: sdg.color }}>{sdg.nilai.toFixed(2)}</p>
                  <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${kat.cls}`}>{kat.label}</span>
                </div>
                {/* Sub-indikator */}
                <div className="space-y-2">
                  {sdg.indikator.map((ind, j) => (
                    <div key={j}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[11px] text-slate-600 leading-snug">{ind.nama}</span>
                        <span className="text-[11px] font-bold text-slate-800 ml-2 flex-shrink-0">{ind.nilai.toFixed(1)}</span>
                      </div>
                      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${ind.nilai}%`, backgroundColor: sdg.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Tren SDGs */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Tren Data SDGs 2023–2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={trendData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }} barSize={14} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="tahun" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[55, 80]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Bar dataKey="sdg3" name="SDGs 3" fill="#e53935" radius={[3, 3, 0, 0]} />
                <Bar dataKey="sdg4" name="SDGs 4" fill="#e65100" radius={[3, 3, 0, 0]} />
                <Bar dataKey="sdg18" name="SDGs 18" fill="#6a1b9a" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 justify-center mt-2">
              {[{ l: 'SDGs 3', c: '#e53935' }, { l: 'SDGs 4', c: '#e65100' }, { l: 'SDGs 18', c: '#6a1b9a' }].map((x, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: x.c }} />
                  <span className="text-[10px] text-gray-500">{x.l}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monitoring Status */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Globe size={16} /> Monitoring SDGs — Status Capaian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sdgsData.map((sdg, i) => {
                const Icon = sdg.icon;
                const kat = getKat(sdg.nilai);
                return (
                  <div key={i} className="p-3 rounded-xl border" style={{ borderColor: sdg.color + '40', backgroundColor: sdg.color + '05' }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: sdg.color }}>
                          <Icon size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="text-[12px] font-black text-slate-800">{sdg.sdg}</p>
                          <p className="text-[10px] text-slate-500">{sdg.nama}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-black" style={{ color: sdg.color }}>{sdg.nilai.toFixed(2)}</p>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${kat.cls}`}>{kat.label}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${sdg.nilai}%`, backgroundColor: sdg.color }} />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">{sdg.indikator.length} indikator terpantau</p>
                  </div>
                );
              })}
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
                <p className="text-[11px] text-blue-600 font-semibold">Rata-rata SDGs</p>
                <p className="text-2xl font-black text-blue-800">{rataRata}</p>
                <p className="text-[10px] text-blue-600">Kategori: <strong>Baik</strong></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
