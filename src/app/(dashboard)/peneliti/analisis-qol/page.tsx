'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell,
} from 'recharts';
import { Heart, Activity, TrendingUp, Award } from 'lucide-react';
import { DESA_BAB4, PREPOST_6_KONSTRUK_BAB4 } from '@/lib/bab4-data';

const COLOR = '#1a365d';

export default function AnalisisQoLPage() {
  const qol = PREPOST_6_KONSTRUK_BAB4.find((c) => c.sasaran === 'Manfaat awal kualitas hidup')!;

  const desaDeltaChart = DESA_BAB4.map((d, i) => ({
    desa: d.nama.replace('Desa ', ''),
    qol: d.prePostDelta.qol,
    integrasi: d.prePostDelta.dataIntegration,
    sdg: d.prePostDelta.sdgMonitoring,
    keputusan: d.prePostDelta.decisionQuality,
    color: ['#2b6cb0', '#276749', '#c05621'][i],
  }));

  const konstrukPersen = PREPOST_6_KONSTRUK_BAB4.filter((c) => c.sasaran !== 'Kematangan digital').map((c) => ({
    nama: c.sasaran.replace('Manfaat awal ', ''),
    Sebelum: c.sebelum,
    Sesudah: c.sesudah,
    delta: c.delta,
  }));

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Manfaat Awal Kualitas Hidup (QoL) &amp; Dampak Proksimal" modul="Evaluasi Pra–Pasca RQ3" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'QoL Pra → Pasca (N=126)', value: '68,43 → 69,97', sub: `Δ Rerata +${qol.delta.toFixed(2)} poin`, color: COLOR, icon: Award },
          { label: 'Median Perubahan (Δ)', value: `+${qol.medianDelta.toFixed(2)}`, sub: 'Proporsi meningkat: 73,8%', color: '#276749', icon: TrendingUp },
          { label: 'Signifikansi (Holm)', value: 'Signifikan', sub: `Exact Sign Test · p = ${qol.pHolm}`, color: '#2b6cb0', icon: Activity },
          { label: 'Δ QoL per Desa', value: '+1,47 s.d. +1,68', sub: 'JJ +1,47 · KI +1,68 · LA +1,47', color: '#553c9a', icon: Heart },
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
        {/* Perbandingan Pra vs Pasca 5 Konstruk Skala 0-100 */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Activity size={16} /> Perbandingan Pra vs Pasca Konstruk RQ3 (Skala 0–100)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={konstrukPersen} margin={{ top: 5, right: 15, left: -10, bottom: 25 }} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="nama" tick={{ fontSize: 9, fill: '#334155' }} axisLine={false} tickLine={false} angle={-12} textAnchor="end" interval={0} />
                <YAxis domain={[40, 80]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="Sebelum" name="Pra (Baseline)" fill="#94a3b8" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Sesudah" name="Pasca (Minggu 4)" fill="#553c9a" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Delta QoL per Desa */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Heart size={16} /> Peningkatan Manfaat Awal QoL per Desa (Δ Poin)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={desaDeltaChart} margin={{ top: 5, right: 15, left: -10, bottom: 5 }} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="desa" tick={{ fontSize: 11, fill: '#334155' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 2.5]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`+${v}`, 'Δ QoL']} />
                <Bar dataKey="qol" radius={[4, 4, 0, 0]}>
                  {desaDeltaChart.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabel Lengkap 6 Konstruk Pra-Pasca Bab IV */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <TrendingUp size={16} /> Ringkasan Uji Berpasangan 6 Konstruk Evaluasi RQ3 (Koreksi Holm)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  {['Konstruk Sasaran', 'N', 'Pra', 'Pasca', 'Δ Rerata', 'Median Δ', 'Metode Uji', 'p-value (Holm)', 'Kesimpulan'].map((h, i) => (
                    <th key={i} className="text-left py-2 px-2.5 text-[10px] font-bold text-gray-500 uppercase whitespace-nowrap">{h}</th>
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
                        {c.signifikan ? 'Signifikan' : 'Belum Signifikan'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
            <strong>Catatan Metodologis Bab IV:</strong> Perubahan skor kualitas hidup (+1,54; median +4,30) diinterpretasikan secara hati-hati sebagai <em>manfaat awal/proksimal</em> selama 4 minggu implementasi, bukan dampak jangka panjang penuh.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
