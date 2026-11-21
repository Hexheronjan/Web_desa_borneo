'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, Legend,
} from 'recharts';
import { Activity, TrendingUp, Target, AlertCircle, CheckCircle2 } from 'lucide-react';
import { DESA_BAB4, DIMENSI_BAB4, INDIKATOR_24_BAB4 } from '@/lib/bab4-data';

const COLOR = '#1a365d';

const DIM_COLORS: Record<string, string> = {
  D1: '#1a365d',
  D2: '#2b6cb0',
  D3: '#276749',
  D4: '#0694a2',
  D5: '#553c9a',
  D6: '#c05621',
};

export default function AnalisisReadinessPage() {
  const [selectedDesaId, setSelectedDesaId] = useState<string>(DESA_BAB4[0].id);
  const desa = DESA_BAB4.find((d) => d.id === selectedDesaId) ?? DESA_BAB4[0];

  const radarData = DIMENSI_BAB4.map((dim) => ({
    aspek: dim.singkat,
    kode: dim.kode,
    jonggonJaya: DESA_BAB4[0].dimensi[dim.kode],
    kedangIpil: DESA_BAB4[1].dimensi[dim.kode],
    lungAnai: DESA_BAB4[2].dimensi[dim.kode],
    terpilih: desa.dimensi[dim.kode],
  }));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PageTitle fitur="Analisis Readiness (6 Dimensi · 24 Indikator)" modul="Analisis Framework RQ1" color={COLOR} />
        <div className="flex gap-1.5">
          {DESA_BAB4.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDesaId(d.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                d.id === selectedDesaId
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {d.nama.replace('Desa ', '')} ({d.skorKesiapan.toFixed(2)})
            </button>
          ))}
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Struktur Kerangka', value: '6 / 24', sub: 'Dimensi · Indikator (CR 0,00144)', color: COLOR, icon: Target },
          { label: `Skor ${desa.nama.replace('Desa ', '')}`, value: desa.skorKesiapan.toFixed(2), sub: `Kategori: ${desa.kategoriKesiapan} (Gap ${desa.kesenjangan.toFixed(2)})`, color: '#276749', icon: TrendingUp },
          { label: 'Kekuatan Relatif', value: desa.kekuatanRelatif.split('—')[0].trim(), sub: desa.kekuatanRelatif.split('—')[1]?.trim() ?? '', color: '#553c9a', icon: CheckCircle2 },
          { label: 'Prioritas Perbaikan', value: desa.prioritasPerbaikan.split('—')[0].trim(), sub: desa.prioritasPerbaikan.split('—')[1]?.trim() ?? '', color: '#c53030', icon: AlertCircle },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: kpi.color + '18' }}>
                <Icon size={18} style={{ color: kpi.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-gray-400 font-semibold uppercase">{kpi.label}</p>
                <p className="text-base font-black text-gray-900 leading-tight truncate">{kpi.value}</p>
                <p className="text-[10px] text-gray-500 leading-snug">{kpi.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Radar Chart 6 Dimensi */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Activity size={16} /> Radar Chart — Perbandingan 6 Dimensi (D1–D6) 3 Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid stroke="#bee3f8" />
                <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 10, fill: '#1a365d', fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8, fill: '#94a3b8' }} />
                <Radar name="Jonggon Jaya (68,04)" dataKey="jonggonJaya" stroke="#2b6cb0" fill="#2b6cb0" fillOpacity={0.18} strokeWidth={2} />
                <Radar name="Kedang Ipil (58,11)" dataKey="kedangIpil" stroke="#276749" fill="#276749" fillOpacity={0.14} strokeWidth={2} />
                <Radar name="Lung Anai (48,39)" dataKey="lungAnai" stroke="#c05621" fill="#c05621" fillOpacity={0.14} strokeWidth={2} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart per dimensi desa terpilih */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Skor 6 Dimensi — {desa.nama}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={radarData} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="aspek" tick={{ fontSize: 10, fill: '#374151' }} axisLine={false} tickLine={false} width={110} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${v}`, 'Skor Dimensi']} />
                <Bar dataKey="terpilih" radius={[0, 4, 4, 0]}>
                  {radarData.map((r) => (
                    <Cell key={r.kode} fill={DIM_COLORS[r.kode]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabel 24 Indikator */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Target size={16} /> Daftar Lengkap 24 Indikator Readiness &amp; Bobot AHP (Dataset SLV 1 v1.2)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-2 px-2 text-[10px] font-bold text-gray-500 uppercase">Kode</th>
                  <th className="text-left py-2 px-2 text-[10px] font-bold text-gray-500 uppercase">Dimensi</th>
                  <th className="text-left py-2 px-2 text-[10px] font-bold text-gray-500 uppercase">Indikator &amp; Definisi Operasional</th>
                  <th className="text-right py-2 px-2 text-[10px] font-bold text-gray-500 uppercase">Bobot Lokal</th>
                  <th className="text-right py-2 px-2 text-[10px] font-bold text-blue-600 uppercase">Bobot Global</th>
                </tr>
              </thead>
              <tbody>
                {INDIKATOR_24_BAB4.map((ind, i) => (
                  <tr key={ind.kode} className={`border-b border-gray-50 hover:bg-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                    <td className="py-2.5 px-2 font-mono font-bold text-indigo-700">{ind.kode}</td>
                    <td className="py-2.5 px-2 whitespace-nowrap">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ color: DIM_COLORS[ind.dimensiKode], backgroundColor: DIM_COLORS[ind.dimensiKode] + '15' }}
                      >
                        {ind.dimensiKode}
                      </span>
                    </td>
                    <td className="py-2.5 px-2">
                      <p className="font-semibold text-slate-800">{ind.nama}</p>
                      <p className="text-[10px] text-slate-500">{ind.definisi}</p>
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-600">{ind.bobotLokal.toFixed(6)}</td>
                    <td className="py-2.5 px-2 text-right font-mono font-black text-blue-700">{(ind.bobotGlobal * 100).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
