'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { Heart, Activity, TrendingUp, Award } from 'lucide-react';

const COLOR = '#1a365d';

const qolDimensions = [
  { name: 'Kesehatan', nilai: 72.40, color: '#2b6cb0', sub: [
    { indikator: 'Akses Layanan Kesehatan', nilai: 74.2 },
    { indikator: 'Status Gizi Keluarga', nilai: 70.6 },
    { indikator: 'Sanitasi & Air Bersih', nilai: 72.4 },
  ]},
  { name: 'Pendidikan', nilai: 70.80, color: '#276749', sub: [
    { indikator: 'Angka Partisipasi Sekolah', nilai: 72.3 },
    { indikator: 'Literasi Digital', nilai: 68.5 },
    { indikator: 'Akses Buku & Perpustakaan', nilai: 71.6 },
  ]},
  { name: 'Ekonomi', nilai: 72.10, color: '#c05621', sub: [
    { indikator: 'Pendapatan Keluarga', nilai: 68.9 },
    { indikator: 'Akses Modal Usaha', nilai: 73.4 },
    { indikator: 'UMKM Aktif', nilai: 74.0 },
  ]},
  { name: 'Lingkungan', nilai: 69.30, color: '#c53030', sub: [
    { indikator: 'Kualitas Udara & Air', nilai: 71.2 },
    { indikator: 'Pengelolaan Sampah', nilai: 67.8 },
    { indikator: 'Ruang Terbuka Hijau', nilai: 69.0 },
  ]},
  { name: 'Sosial Budaya', nilai: 70.50, color: '#553c9a', sub: [
    { indikator: 'Gotong Royong', nilai: 80.2 },
    { indikator: 'Kearifan Lokal', nilai: 76.5 },
    { indikator: 'Partisipasi Masyarakat', nilai: 64.8 },
  ]},
];

const radarQoL = qolDimensions.map(d => ({ aspek: d.name, nilai: d.nilai }));

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return null; // Labels managed via legend
};

function getKat(nilai: number) {
  if (nilai >= 80) return { label: 'Sangat Baik', cls: 'bg-green-100 text-green-700' };
  if (nilai >= 70) return { label: 'Baik', cls: 'bg-blue-100 text-blue-700' };
  if (nilai >= 60) return { label: 'Cukup', cls: 'bg-yellow-100 text-yellow-700' };
  return { label: 'Kurang', cls: 'bg-red-100 text-red-700' };
}

export default function AnalisisQoLPage() {
  const rataRata = (qolDimensions.reduce((s, d) => s + d.nilai, 0) / qolDimensions.length).toFixed(2);
  const tertinggi = qolDimensions.reduce((a, b) => a.nilai > b.nilai ? a : b);
  const terendah = qolDimensions.reduce((a, b) => a.nilai < b.nilai ? a : b);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="QoL Dashboard" modul="Analisis Framework" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'QoL Rata-rata', value: rataRata, sub: 'Kategori: Baik', color: COLOR, icon: Award },
          { label: 'Indikator QoL', value: '15', sub: '5 Dimensi Utama', color: '#276749', icon: Activity },
          { label: 'Dimensi Tertinggi', value: tertinggi.name, sub: `${tertinggi.nilai.toFixed(2)}`, color: '#2b6cb0', icon: TrendingUp },
          { label: 'Dimensi Terendah', value: terendah.name, sub: `${terendah.nilai.toFixed(2)}`, color: '#c53030', icon: Heart },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Donut QoL */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Heart size={16} /> QoL Dashboard — 5 Dimensi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie data={qolDimensions} dataKey="nilai" cx="50%" cy="50%" innerRadius={45} outerRadius={72} stroke="none">
                      {qolDimensions.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${v}`, 'Skor QoL']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-[8px] text-gray-400">Rata-rata</p>
                  <p className="text-lg font-black text-gray-900">{rataRata}</p>
                  <p className="text-[9px] font-bold text-green-600">Baik</p>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {qolDimensions.map((d, i) => {
                  const kat = getKat(d.nilai);
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                          <span className="text-[11px] font-semibold text-slate-700">{d.name}</span>
                        </div>
                        <span className="text-[11px] font-black" style={{ color: d.color }}>{d.nilai.toFixed(2)}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${d.nilai}%`, backgroundColor: d.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Radar QoL */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Activity size={16} /> Radar Chart Nilai QoL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={230}>
              <RadarChart data={radarQoL} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 11, fill: '#1a365d', fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[60, 80]} tick={{ fontSize: 8, fill: '#94a3b8' }} />
                <Radar name="QoL" dataKey="nilai" stroke="#553c9a" fill="#553c9a" fillOpacity={0.2} strokeWidth={2} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${v}`, 'Nilai QoL']} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabel Sub-Indikator */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Activity size={16} /> Nilai QoL — Sub-Indikator per Dimensi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {qolDimensions.map((dim, i) => {
              const kat = getKat(dim.nilai);
              return (
                <div key={i} className="p-3 rounded-xl border" style={{ borderColor: dim.color + '40', backgroundColor: dim.color + '05' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dim.color }} />
                      <span className="text-[12px] font-black text-slate-800">{dim.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black" style={{ color: dim.color }}>{dim.nilai.toFixed(2)}</span>
                      <span className={`ml-1 px-1.5 py-0.5 rounded text-[9px] font-bold ${kat.cls}`}>{kat.label}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full mb-2 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${dim.nilai}%`, backgroundColor: dim.color }} />
                  </div>
                  <div className="space-y-1">
                    {dim.sub.map((s, j) => (
                      <div key={j} className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-600">{s.indikator}</span>
                        <span className="font-bold text-slate-800">{s.nilai.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
