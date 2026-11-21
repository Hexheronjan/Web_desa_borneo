'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie,
} from 'recharts';
import { Brain, Target, TrendingUp, Award, ListOrdered } from 'lucide-react';
import { DESA_BAB4, DSS_KRITERIA_SAW } from '@/lib/bab4-data';

const COLOR = '#1a365d';
const PIE_COLORS = ['#1a365d', '#2b6cb0', '#276749', '#0694a2', '#553c9a', '#c05621'];

const topRecommendations = [
  {
    rank: 1,
    desa: 'Desa Jonggon Jaya',
    kode: 'A08',
    program: 'Dasbor SDGs Desa 3, 4, dan 18',
    skor: 0.950907,
    biaya: 'Rp 220 Juta',
    stabilitas: '13/13 skenario stabil',
    color: '#2b6cb0',
  },
  {
    rank: 1,
    desa: 'Desa Kedang Ipil',
    kode: 'A02',
    program: 'Penguatan Konektivitas dan Perangkat',
    skor: 0.920042,
    biaya: 'Rp 195 Juta',
    stabilitas: '13/13 skenario stabil',
    color: '#276749',
  },
  {
    rank: 1,
    desa: 'Desa Lung Anai',
    kode: 'A02',
    program: 'Penguatan Konektivitas dan Perangkat (Luring-Utama)',
    skor: 0.911694,
    biaya: 'Rp 185 Juta',
    stabilitas: '13/13 skenario stabil',
    color: '#c05621',
  },
];

export default function AnalisisDSSPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Analisis DSS SAW (6 Kriteria · 30 Alternatif)" modul="Artefak 4 — Dataset SLV 2" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Kriteria SAW', value: '6 (C1–C6)', sub: '5 Benefit · 1 Cost · Σw = 1,00', color: COLOR, icon: Target },
          { label: 'Alternatif Dinilai', value: '30 Baris', sub: '3 desa × 10 alternatif program', color: '#276749', icon: ListOrdered },
          { label: 'Uji Sensitivitas ±10%', value: '39 / 39', sub: '100% stabil di semua skenario', color: '#c05621', icon: Award },
          { label: 'Evaluasi Formatif DSS', value: '4,09 / 5', sub: '24 penilai (8/desa)', color: '#553c9a', icon: Brain },
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
        {/* Tabel 6 Kriteria SAW */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Brain size={16} /> 6 Kriteria Pembobotan DSS SAW (Tabel 4.19)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    {['Kode', 'Nama Kriteria', 'Atribut', 'Bobot', 'Sumber Data'].map((h, i) => (
                      <th key={i} className="text-left py-2 px-2 text-[10px] font-bold text-gray-400 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DSS_KRITERIA_SAW.map((k, i) => (
                    <tr key={k.kode} className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="py-2.5 px-2 font-mono font-bold text-indigo-700">{k.kode}</td>
                      <td className="py-2.5 px-2 font-semibold text-slate-800">{k.nama}</td>
                      <td className="py-2.5 px-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${k.atribut.startsWith('Cost') ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                          {k.atribut.startsWith('Cost') ? 'Cost' : 'Benefit'}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 font-mono font-bold text-blue-700">{(k.bobot * 100).toFixed(0)}%</td>
                      <td className="py-2.5 px-2 text-[10px] text-slate-500">{k.sumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <p className="text-[11px] font-bold text-gray-500 uppercase mb-2">Distribusi Bobot Kriteria SAW (CR AHP Dimensi = 0,00144)</p>
              <div className="flex items-center gap-3">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie data={[...DSS_KRITERIA_SAW]} dataKey="bobot" cx="50%" cy="50%" outerRadius={52} stroke="none">
                      {DSS_KRITERIA_SAW.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} formatter={(v: any) => [`${(v * 100).toFixed(0)}%`, 'Bobot']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 grid grid-cols-2 gap-1.5">
                  {DSS_KRITERIA_SAW.map((k, i) => (
                    <div key={k.kode} className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                        <span className="text-gray-600">{k.kode}</span>
                      </div>
                      <span className="font-mono font-bold text-gray-800">{(k.bobot * 100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prioritas #1 per Desa */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <ListOrdered size={16} /> Rekomendasi Prioritas #1 per Desa Penelitian
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topRecommendations.map((p, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl border" style={{ borderColor: p.color + '40', backgroundColor: p.color + '08' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-black" style={{ backgroundColor: p.color }}>
                  {p.kode}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">{p.desa}</p>
                  <p className="text-[12px] font-bold text-slate-800 leading-snug">{p.program}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] text-gray-600">
                    <span>Skor SAW: <strong style={{ color: p.color }}>{p.skor.toFixed(6)}</strong></span>
                    <span>·</span>
                    <span>Estimasi: <strong>{p.biaya}</strong></span>
                    <span>·</span>
                    <span><strong>{p.stabilitas}</strong></span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${p.skor * 100}%`, backgroundColor: p.color }} />
                  </div>
                </div>
              </div>
            ))}

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-950 leading-relaxed">
              <strong>Prinsip Human-in-the-Loop Bab IV:</strong> Keluaran DSS SAW bersifat <em>pendukung keputusan</em> yang transparan beserta penjelasan alasan; penetapan akhir tetap melalui musyawarah desa dan lembaga adat.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart Skor Preferensi Top #1 3 Desa */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <TrendingUp size={16} /> Perbandingan Skor Preferensi SAW Peringkat #1 Antar Desa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={DESA_BAB4.map((d, i) => ({
                label: `${d.nama.replace('Desa ', '')} (${d.dssPrioritas.kode})`,
                skor: Number((d.dssPrioritas.skorSAW * 100).toFixed(2)),
                color: ['#2b6cb0', '#276749', '#c05621'][i],
              }))}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              barSize={44}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#334155' }} axisLine={false} tickLine={false} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${(v / 100).toFixed(4)}`, 'Skor SAW']} />
              <Bar dataKey="skor" radius={[4, 4, 0, 0]}>
                {DESA_BAB4.map((_, i) => <Cell key={i} fill={['#2b6cb0', '#276749', '#c05621'][i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
