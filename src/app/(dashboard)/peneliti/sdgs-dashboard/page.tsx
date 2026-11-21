'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Globe, Heart, BookOpen, Landmark, TrendingUp } from 'lucide-react';
import { DESA_BAB4 } from '@/lib/bab4-data';

const COLOR = '#1a365d';

const sdgsSummary = [
  {
    sdg: 'SDGs Desa 3',
    nama: 'Desa Sehat dan Sejahtera',
    awal: 74.70,
    akhir: 82.24,
    color: '#2e7d32',
    icon: Heart,
    perDesa: [
      { desa: 'Desa Jonggon Jaya', nilai: DESA_BAB4[0].sdgKPI.sdg3 },
      { desa: 'Desa Kedang Ipil', nilai: DESA_BAB4[1].sdgKPI.sdg3 },
      { desa: 'Desa Lung Anai', nilai: DESA_BAB4[2].sdgKPI.sdg3 },
    ],
  },
  {
    sdg: 'SDGs Desa 4',
    nama: 'Pendidikan Desa Berkualitas',
    awal: 66.68,
    akhir: 74.90,
    color: '#1565c0',
    icon: BookOpen,
    perDesa: [
      { desa: 'Desa Jonggon Jaya', nilai: DESA_BAB4[0].sdgKPI.sdg4 },
      { desa: 'Desa Kedang Ipil', nilai: DESA_BAB4[1].sdgKPI.sdg4 },
      { desa: 'Desa Lung Anai', nilai: DESA_BAB4[2].sdgKPI.sdg4 },
    ],
  },
  {
    sdg: 'SDGs Desa 18',
    nama: 'Kelembagaan Desa Dinamis & Budaya Adaptif',
    awal: 76.92,
    akhir: 84.86,
    color: '#6a1b9a',
    icon: Landmark,
    perDesa: [
      { desa: 'Desa Jonggon Jaya', nilai: DESA_BAB4[0].sdgKPI.sdg18 },
      { desa: 'Desa Kedang Ipil', nilai: DESA_BAB4[1].sdgKPI.sdg18 },
      { desa: 'Desa Lung Anai', nilai: DESA_BAB4[2].sdgKPI.sdg18 },
    ],
  },
];

const chartPerDesa = DESA_BAB4.map((d) => ({
  desa: d.nama.replace('Desa ', ''),
  sdg3: d.sdgKPI.sdg3,
  sdg4: d.sdgKPI.sdg4,
  sdg18: d.sdgKPI.sdg18,
  awal: d.sdgKPI.awal,
  akhir: d.sdgKPI.akhir,
}));

export default function SDGsDashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard SDGs Desa 3, 4, dan 18 (54 Unit KPI)" modul="Analisis Framework Bab IV" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Unit KPI', value: '80,67%', sub: '54 unit (Awal 72,76% · +7,90 poin)', color: COLOR, icon: Globe },
          { label: 'SDGs 3 Kesehatan', value: '82,24%', sub: 'Awal 74,70% (Δ +7,55 poin)', color: '#2e7d32', icon: Heart },
          { label: 'SDGs 4 Pendidikan', value: '74,90%', sub: 'Awal 66,68% (Δ +8,22%)', color: '#1565c0', icon: BookOpen },
          { label: 'SDGs 18 Budaya & Adat', value: '84,86%', sub: 'Awal 76,92% (Δ +7,94%)', color: '#6a1b9a', icon: Landmark },
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
        {sdgsSummary.map((sdg, i) => {
          const Icon = sdg.icon;
          return (
            <Card key={i} className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: sdg.color }}>
                  <Icon size={16} /> {sdg.sdg} — {sdg.nama}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4 p-3 rounded-xl" style={{ backgroundColor: sdg.color + '10' }}>
                  <p className="text-3xl font-black" style={{ color: sdg.color }}>{sdg.akhir.toFixed(2)}%</p>
                  <p className="text-[11px] font-semibold text-slate-600 mt-0.5">
                    Awal: {sdg.awal.toFixed(2)}% · Peningkatan: +{(sdg.akhir - sdg.awal).toFixed(2)}%
                  </p>
                </div>
                <div className="space-y-2.5">
                  {sdg.perDesa.map((row, j) => (
                    <div key={j}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[11px] text-slate-600">{row.desa}</span>
                        <span className="text-[11px] font-bold text-slate-800">{row.nilai.toFixed(1)}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${row.nilai}%`, backgroundColor: sdg.color }} />
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
        {/* Perbandingan SDGs 3, 4, 18 antar 3 desa */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Capaian Akhir SDGs 3, 4, dan 18 per Desa (Gambar 4.23)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartPerDesa} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="desa" tick={{ fontSize: 11, fill: '#334155' }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 95]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${v}%`, '']} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="sdg3" name="SDGs 3 Kesehatan" fill="#2e7d32" radius={[3, 3, 0, 0]} />
                <Bar dataKey="sdg4" name="SDGs 4 Pendidikan" fill="#1565c0" radius={[3, 3, 0, 0]} />
                <Bar dataKey="sdg18" name="SDGs 18 Budaya & Adat" fill="#6a1b9a" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Awal vs Akhir per Desa */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Globe size={16} /> Pergerakan KPI SDGs Gabungan per Desa (Awal → Akhir)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {DESA_BAB4.map((d) => (
              <div key={d.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/70">
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <p className="text-xs font-black text-slate-800">{d.nama}</p>
                    <p className="text-[10px] text-slate-500">Kec. {d.kecamatan} · 18 unit KPI SDGs</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-indigo-800">{d.sdgKPI.akhir.toFixed(2)}%</p>
                    <p className="text-[10px] font-bold text-emerald-700">Awal {d.sdgKPI.awal.toFixed(2)}% (Δ +{d.sdgKPI.delta.toFixed(2)}%)</p>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-indigo-700" style={{ width: `${d.sdgKPI.akhir}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
