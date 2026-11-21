'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { Calculator, TrendingUp, Database, BarChart3 } from 'lucide-react';
import { DESA_BAB4, PREPOST_6_KONSTRUK_BAB4 } from '@/lib/bab4-data';

const COLOR = '#1a365d';

const reabilitasData = [
  { indikator: 'Instrumen Kesiapan Smart Living Village (RQ1)', alpha: '0,9367', items: '24 indikator (D1–D6)', status: 'Sangat Reliabel' },
  { indikator: 'System Usability Scale — SUS (RQ3)', alpha: '0,955', items: '10 pernyataan SUS', status: 'Sangat Reliabel' },
  { indikator: 'Instrumen Kualitas Sistem & Layanan (RQ3)', alpha: '0,984', items: 'Skala 1–5 (N=126)', status: 'Sangat Reliabel' },
  { indikator: 'Validitas Isi Panel Pakar (P1–P3)', alpha: 'S-CVI 1,000', items: '24 indikator (pasca revisi)', status: 'Valid Penuh' },
];

const ujiRingkas = [
  { uji: 'CR Matriks Dimensi AHP (n=6)', nilai: '0,001436', interpretasi: 'Sangat Konsisten (< 0,10)', warna: '#276749' },
  { uji: 'CR Maks Matriks Indikator (n=4)', nilai: '0,017385', interpretasi: 'Sangat Konsisten (< 0,10)', warna: '#2b6cb0' },
  { uji: 'Sensitivitas DSS SAW (±10%)', nilai: '39 / 39', interpretasi: '100% Stabil', warna: '#553c9a' },
  { uji: 'Uji Berpasangan RQ3 (Holm)', nilai: '5 / 6 Sig.', interpretasi: 'Kesiapan p=0,0900 NS', warna: '#c05621' },
];

export default function StatistikPenelitianPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Statistik Penelitian Bab IV (Reliabilitas &amp; Uji Pra–Pasca)" modul="Analitik Penelitian" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Paket Dataset', value: '3 Paket', sub: 'SLV 1, SLV 2, SLV 3 v1.2', color: COLOR, icon: Database },
          { label: 'Total Partisipan', value: '126', sub: 'Kematangan N=121 (CC)', color: '#276749', icon: Database },
          { label: 'α Kesiapan / SUS', value: '0,937 / 0,955', sub: 'Kualitas α = 0,984', color: '#2b6cb0', icon: Calculator },
          { label: 'CR AHP Dimensi', value: '0,00144', sub: 'S-CVI/Ave final = 1,000', color: '#553c9a', icon: BarChart3 },
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
        {/* Skor Kesiapan 3 Desa */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart3 size={16} /> Perbandingan Skor Kesiapan Baseline 3 Desa (N=42 / Desa)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={DESA_BAB4.map((d, i) => ({
                  desa: d.nama.replace('Desa ', ''),
                  skor: d.skorKesiapan,
                  color: ['#2b6cb0', '#276749', '#c05621'][i],
                }))}
                margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                barSize={44}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="desa" tick={{ fontSize: 11, fill: '#334155' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 80]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${v}`, 'Skor Kesiapan']} />
                <Bar dataKey="skor" radius={[4, 4, 0, 0]}>
                  {DESA_BAB4.map((_, i) => <Cell key={i} fill={['#2b6cb0', '#276749', '#c05621'][i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center text-[11px] text-gray-500 mt-1">
              Rerata baseline gabungan 3 desa = <strong>58,18</strong> → pasca uji 4 minggu = <strong>60,45</strong> (Δ +2,27; p Holm = 0,0900)
            </p>
          </CardContent>
        </Card>

        {/* Ringkasan Uji Validitas & Konsistensi */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Ringkasan Uji Konsistensi &amp; Sensitivitas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ujiRingkas.map((uji, i) => (
              <div key={i} className="p-3 rounded-xl border" style={{ borderColor: uji.warna + '40', backgroundColor: uji.warna + '08' }}>
                <p className="text-[11px] text-gray-600 font-medium">{uji.uji}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xl font-black font-mono" style={{ color: uji.warna }}>{uji.nilai}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: uji.warna + '20', color: uji.warna }}>
                    {uji.interpretasi}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Reliabilitas */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Calculator size={16} /> Uji Reliabilitas &amp; Validitas Instrumen Bab IV
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  {['Instrumen Penelitian', 'Cakupan Item', 'Koefisien', 'Status'].map((h, i) => (
                    <th key={i} className="text-left py-2.5 px-3 text-[10px] font-bold text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reabilitasData.map((r, i) => (
                  <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{r.indikator}</td>
                    <td className="py-2.5 px-3 text-slate-600">{r.items}</td>
                    <td className="py-2.5 px-3 font-black font-mono text-blue-700">{r.alpha}</td>
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

      {/* Uji Berpasangan 6 Konstruk */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <TrendingUp size={16} /> Hasil Uji Berpasangan Pra–Pasca 6 Konstruk (Koreksi Holm)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  {['Sasaran', 'N', 'Pra', 'Pasca', 'Δ Rerata', 'Median Δ', 'Uji', 'p (Holm)', 'Hasil'].map((h, i) => (
                    <th key={i} className="text-left py-2 px-2.5 text-[10px] font-bold text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PREPOST_6_KONSTRUK_BAB4.map((c, i) => (
                  <tr key={c.sasaran} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                    <td className="py-2.5 px-2.5 font-bold text-slate-800">{c.sasaran}</td>
                    <td className="py-2.5 px-2.5 font-mono">{c.n}</td>
                    <td className="py-2.5 px-2.5 font-mono">{c.sebelum.toFixed(2)}</td>
                    <td className="py-2.5 px-2.5 font-mono font-bold text-blue-700">{c.sesudah.toFixed(2)}</td>
                    <td className="py-2.5 px-2.5 font-mono font-bold text-emerald-700">+{c.delta.toFixed(2)}</td>
                    <td className="py-2.5 px-2.5 font-mono">+{c.medianDelta.toFixed(2)}</td>
                    <td className="py-2.5 px-2.5 text-slate-600">{c.uji}</td>
                    <td className="py-2.5 px-2.5 font-mono">{c.pHolm}</td>
                    <td className="py-2.5 px-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${c.signifikan ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {c.signifikan ? 'Signifikan' : 'Belum Sig.'}
                      </span>
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
