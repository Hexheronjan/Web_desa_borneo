'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie,
} from 'recharts';
import { Brain, Target, TrendingUp, Award, ListOrdered } from 'lucide-react';

const COLOR = '#1a365d';

// Bobot AHP (Rule DSS)
const kriteria = [
  { kode: 'C1', nama: 'Kesiapan Infrastruktur', bobot: 0.320, cr: 0.196, ri: 1.632, cr_ratio: 0.120, status: 'Konsisten' },
  { kode: 'C2', nama: 'Kesiapan Layanan Digital', bobot: 0.218, cr: 0.218, ri: 1.632, cr_ratio: 0.133, status: 'Konsisten' },
  { kode: 'C3', nama: 'Kesiapan SDM & Organisasi', bobot: 0.198, cr: 0.218, ri: 1.632, cr_ratio: 0.133, status: 'Konsisten' },
  { kode: 'C4', nama: 'Dampak Kualitas Hidup', bobot: 0.264, cr: 0.218, ri: 1.632, cr_ratio: 0.133, status: 'Konsisten' },
];

// Ranking Program
const rankingProgram = [
  { rank: 1, program: 'Infrastruktur Jaringan Internet Desa', bobot: 0.312, skor: 88.5, prioritas: 'Sangat Tinggi', color: '#e53e3e' },
  { rank: 2, program: 'Pelatihan Literasi Digital Masyarakat', bobot: 0.248, skor: 82.3, prioritas: 'Tinggi', color: '#c05621' },
  { rank: 3, program: 'Digitalisasi Layanan Administrasi Desa', bobot: 0.186, skor: 76.8, prioritas: 'Tinggi', color: '#d69e2e' },
  { rank: 4, program: 'Program Kesehatan Digital (Posyandu)', bobot: 0.142, skor: 72.4, prioritas: 'Sedang', color: '#276749' },
  { rank: 5, program: 'E-Commerce & UMKM Digital', bobot: 0.112, skor: 68.9, prioritas: 'Sedang', color: '#2b6cb0' },
];

// Status rekomendasi
const statusRekDSS = [
  { label: 'Rekomendasi Tereksekusi', value: 512, persen: 45.6, color: '#276749' },
  { label: 'Rekomendasi Pending', value: 612, persen: 54.4, color: '#e53e3e' },
];

export default function AnalisisDSSPage() {
  const totalBobot = kriteria.reduce((s, k) => s + k.bobot, 0).toFixed(3);
  const avgCR = (kriteria.reduce((s, k) => s + k.cr_ratio, 0) / kriteria.length).toFixed(3);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Ranking Program" modul="Analisis Framework" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Kriteria AHP', value: '4', sub: 'Bobot Total = 1.000', color: COLOR, icon: Target },
          { label: 'Consistency Ratio', value: `${avgCR}`, sub: 'CR < 0.10 — Konsisten', color: '#276749', icon: Award },
          { label: 'Ranking Program', value: '5', sub: 'Program Prioritas', color: '#c05621', icon: ListOrdered },
          { label: 'Total Rekomendasi', value: '1.124', sub: '512 Tereksekusi', color: '#553c9a', icon: Brain },
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
        {/* Tabel Bobot AHP */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Brain size={16} /> Bobot AHP — Rule DSS (Consistency Ratio)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    {['Kriteria', 'CI', 'RI', 'CR (CI/RI)', 'Keterangan'].map((h, i) => (
                      <th key={i} className="text-left py-2 px-2 text-[10px] font-bold text-gray-400 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {kriteria.map((k, i) => (
                    <tr key={i} className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="py-2.5 px-2 text-[12px] font-semibold text-slate-800">{k.kode} — {k.nama}</td>
                      <td className="py-2.5 px-2 font-mono text-[11px] text-blue-700 font-bold">{k.cr.toFixed(3)}</td>
                      <td className="py-2.5 px-2 font-mono text-[11px] text-slate-600">{k.ri.toFixed(3)}</td>
                      <td className="py-2.5 px-2 font-mono text-[11px] font-bold text-green-700">{k.cr_ratio.toFixed(3)}</td>
                      <td className="py-2.5 px-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">{k.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-blue-50 border-t-2 border-blue-200">
                    <td colSpan={4} className="py-2 px-2 text-[11px] font-bold text-blue-800">CR = 0.08 &lt; 0.10 → Konsistensi dapat diterima (Good Consistency)</td>
                    <td className="py-2 px-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-600 text-white">✓ Valid</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Pie bobot */}
            <div className="mt-4">
              <p className="text-[11px] font-bold text-gray-500 uppercase mb-2">Distribusi Bobot Kriteria AHP</p>
              <div className="flex items-center gap-3">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie data={kriteria} dataKey="bobot" cx="50%" cy="50%" outerRadius={52} stroke="none">
                      {kriteria.map((_, i) => (
                        <Cell key={i} fill={['#2b6cb0','#276749','#c05621','#553c9a'][i]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} formatter={(v: any) => [`${(v * 100).toFixed(1)}%`, 'Bobot']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-1.5">
                  {kriteria.map((k, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: ['#2b6cb0','#276749','#c05621','#553c9a'][i] }} />
                        <span className="text-[10px] text-gray-600">{k.kode}</span>
                      </div>
                      <span className="font-mono text-[11px] font-bold text-gray-800">{(k.bobot * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ranking Program */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <ListOrdered size={16} /> Ranking Program Prioritas DSS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              {rankingProgram.map((p, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl border" style={{ borderColor: p.color + '40', backgroundColor: p.color + '08' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-black" style={{ backgroundColor: p.color }}>
                    {p.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-slate-800 leading-snug">{p.program}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-gray-500">Bobot: <strong>{(p.bobot * 100).toFixed(1)}%</strong></span>
                      <span className="text-[10px] text-gray-500">Skor: <strong>{p.skor}</strong></span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${p.skor}%`, backgroundColor: p.color }} />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: p.color + '20', color: p.color }}>
                    {p.prioritas}
                  </span>
                </div>
              ))}
            </div>

            {/* Status eksekusi */}
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-[11px] font-bold text-gray-500 uppercase mb-2">Status Rekomendasi DSS</p>
              {statusRekDSS.map((s, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-700">{s.label}</span>
                    <span className="font-black" style={{ color: s.color }}>{s.value} ({s.persen}%)</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${s.persen}%`, backgroundColor: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart Skor Program */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <TrendingUp size={16} /> Skor Akhir Program Prioritas (DSS Output)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={rankingProgram} margin={{ top: 5, right: 20, left: -10, bottom: 60 }} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="program" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} angle={-25} textAnchor="end" height={70} interval={0} />
              <YAxis domain={[60, 95]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${v}`, 'Skor']} />
              <Bar dataKey="skor" radius={[4, 4, 0, 0]}>
                {rankingProgram.map((p, i) => <Cell key={i} fill={p.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
