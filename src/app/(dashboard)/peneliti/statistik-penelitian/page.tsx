'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  ScatterChart, Scatter, ZAxis, LineChart, Line,
} from 'recharts';
import { Calculator, TrendingUp, Database, BarChart3 } from 'lucide-react';

const COLOR = '#1a365d';

const deskriptifReadiness = [
  { stat: 'N (Sampel)', nilai: '146', satuan: '' },
  { stat: 'Mean', nilai: '74.30', satuan: 'skor' },
  { stat: 'Median', nilai: '72.50', satuan: 'skor' },
  { stat: 'Mode', nilai: '71.00', satuan: 'skor' },
  { stat: 'Std. Deviation', nilai: '5.20', satuan: '' },
  { stat: 'Variance', nilai: '27.04', satuan: '' },
  { stat: 'Min', nilai: '58.20', satuan: 'skor' },
  { stat: 'Max', nilai: '89.40', satuan: 'skor' },
  { stat: 'Range', nilai: '31.20', satuan: '' },
  { stat: 'Skewness', nilai: '0.142', satuan: '(Positif)' },
  { stat: 'Kurtosis', nilai: '-0.318', satuan: '(Platykurtic)' },
];

const reabilitasData = [
  { indikator: 'Readiness Framework', alpha: 0.892, items: 20, status: 'Reliabel' },
  { indikator: 'Maturity Assessment', alpha: 0.874, items: 15, status: 'Reliabel' },
  { indikator: 'Quality of Life', alpha: 0.861, items: 15, status: 'Reliabel' },
  { indikator: 'DSS AHP Consistency', alpha: 0.908, items: 4, status: 'Reliabel' },
];

const kmoData = [
  { uji: 'KMO (Kaiser-Meyer-Olkin)', nilai: 0.847, interpretasi: 'Baik (> 0.80)', warna: '#276749' },
  { uji: "Bartlett's Test (p-value)", nilai: 0.000, interpretasi: 'Signifikan (< 0.05)', warna: '#2b6cb0' },
  { uji: 'Cronbach Alpha', nilai: 0.892, interpretasi: 'Reliabel (> 0.80)', warna: '#553c9a' },
  { uji: 'R-Square (R²)', nilai: 0.756, interpretasi: 'Kuat (> 0.50)', warna: '#c05621' },
];

const distribusiNilai = [
  { range: '55–60', frekuensi: 8, color: '#e53e3e' },
  { range: '61–65', frekuensi: 12, color: '#c05621' },
  { range: '66–70', frekuensi: 24, color: '#d69e2e' },
  { range: '71–75', frekuensi: 45, color: '#276749' },
  { range: '76–80', frekuensi: 38, color: '#2b6cb0' },
  { range: '81–85', frekuensi: 14, color: '#553c9a' },
  { range: '86–90', frekuensi: 5, color: '#6a1b9a' },
];

export default function StatistikPenelitianPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Statistik Deskriptif" modul="Analitik Penelitian" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Dataset', value: '4', sub: 'Kategori Dataset', color: COLOR, icon: Database },
          { label: 'Total Responden', value: '146', sub: 'Data Sampel', color: '#276749', icon: Database },
          { label: 'Cronbach Alpha', value: '0.892', sub: 'Reliabel (> 0.80)', color: '#2b6cb0', icon: Calculator },
          { label: 'KMO', value: '0.847', sub: 'Baik (> 0.80)', color: '#553c9a', icon: BarChart3 },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Statistik Deskriptif */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Calculator size={16} /> Statistik Deskriptif — Dataset Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {deskriptifReadiness.map((stat, i) => (
                <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <span className="text-[12px] text-slate-600 font-medium">{stat.stat}</span>
                  <div className="text-right">
                    <span className="font-black font-mono text-[13px] text-blue-800">{stat.nilai}</span>
                    {stat.satuan && <span className="text-[10px] text-gray-400 ml-1">{stat.satuan}</span>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Distribusi Nilai */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart3 size={16} /> Distribusi Frekuensi Nilai Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={distribusiNilai} margin={{ top: 5, right: 5, left: -20, bottom: 5 }} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="range" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [v, 'Frekuensi']} />
                <Bar dataKey="frekuensi" radius={[4, 4, 0, 0]}>
                  {distribusiNilai.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center text-[10px] text-gray-400 mt-1">Distribusi nilai normal (mean = 74.30)</p>
          </CardContent>
        </Card>

        {/* Uji Statistik */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Hasil Uji Statistik
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {kmoData.map((uji, i) => (
                <div key={i} className="p-3 rounded-xl border" style={{ borderColor: uji.warna + '40', backgroundColor: uji.warna + '08' }}>
                  <p className="text-[11px] text-gray-500 font-medium">{uji.uji}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xl font-black" style={{ color: uji.warna }}>{uji.nilai.toFixed(3)}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: uji.warna + '20', color: uji.warna }}>
                      {uji.interpretasi}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reliabilitas */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Calculator size={16} /> Uji Reliabilitas — Cronbach Alpha per Instrumen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  {['Instrumen', 'Jumlah Item', 'Cronbach Alpha', 'Interpretasi', 'Status'].map((h, i) => (
                    <th key={i} className="text-left py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reabilitasData.map((r, i) => (
                  <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                    <td className="py-2.5 px-3 font-semibold text-[12px] text-slate-800">{r.indikator}</td>
                    <td className="py-2.5 px-3 text-[12px] text-slate-600">{r.items} item</td>
                    <td className="py-2.5 px-3 font-black font-mono text-[14px] text-blue-700">{r.alpha.toFixed(3)}</td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-600">
                      {r.alpha >= 0.90 ? 'Sangat Tinggi' : r.alpha >= 0.80 ? 'Tinggi' : 'Cukup'}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">{r.status}</span>
                    </td>
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
