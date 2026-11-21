'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { Layers, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';
import { DESA_BAB4, RUBRIK_KEMATANGAN_DIMENSI } from '@/lib/bab4-data';

const COLOR = '#1a365d';

const maturityScale = [
  { level: 'Level 1 (Rintisan)', range: '1,00–1,79', color: '#e53e3e', desc: 'Proses ad-hoc, data terisolasi, belum ada standar operasional.' },
  { level: 'Level 2 (Berkembang)', range: '1,80–2,79', color: '#4299e1', desc: 'Tahap aktual ketiga desa penelitian pasca uji 4 minggu (2,40–2,68).' },
  { level: 'Level 3 (Terdefinisi)', range: '2,80–3,59', color: '#276749', desc: 'SOP digital, integrasi lintas sektor, dan klasifikasi adat terdokumentasi konsisten.' },
  { level: 'Level 4 (Terkelola)', range: '3,60–4,39', color: '#553c9a', desc: 'Pemantauan KPI SDGs dan keputusan musyawarah dikelola secara kuantitatif.' },
  { level: 'Level 5 (Optimum)', range: '4,40–5,00', color: '#d69e2e', desc: 'Inovasi berkelanjutan, inklusif, dan pelestarian adat terintegrasi penuh.' },
];

export default function AnalisisMaturityPage() {
  const prePostDesa = DESA_BAB4.map((d) => ({
    desa: d.nama.replace('Desa ', ''),
    Pra: d.kematanganPra,
    Pasca: d.kematanganPasca,
    delta: d.kematanganDelta,
  }));

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Analisis Kematangan Digital (Rubrik M1–M6)" modul="Evaluasi RQ3 — Dataset SLV 3" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Kematangan Individu (N=121)', value: '2,53', sub: 'Pra 1,94 → Δ +0,59 (p=2,56×10⁻¹⁶)', color: COLOR, icon: Layers },
          { label: 'Jonggon Jaya (Rubrik)', value: '2,68', sub: 'Pra 2,21 (+0,47) · Berkembang', color: '#2b6cb0', icon: TrendingUp },
          { label: 'Kedang Ipil (Rubrik)', value: '2,40', sub: 'Pra 1,90 (+0,51) · Berkembang', color: '#276749', icon: CheckCircle2 },
          { label: 'Lung Anai (Rubrik)', value: '2,43', sub: 'Pra 1,80 (+0,63) · Berkembang', color: '#c05621', icon: AlertCircle },
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
        {/* Pra vs Pasca per Desa */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Layers size={16} /> Perbandingan Kematangan Rubrik Desa (Pra vs Pasca Uji 4 Minggu)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={prePostDesa} margin={{ top: 10, right: 15, left: -10, bottom: 5 }} barSize={26}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="desa" tick={{ fontSize: 11, fill: '#334155' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="Pra" name="Skor Pra (Baseline)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Pasca" name="Skor Pasca (Minggu 4)" fill="#2b6cb0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-2 p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-[11px] text-blue-900">
              Peningkatan tertinggi terjadi di <strong>Desa Lung Anai (+0,63)</strong>, diikuti Kedang Ipil (+0,51) dan Jonggon Jaya (+0,47).
            </div>
          </CardContent>
        </Card>

        {/* Rubrik 6 Dimensi M1-M6 */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Skor Rubrik Pasca per Dimensi (M1–M6)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={[...RUBRIK_KEMATANGAN_DIMENSI]} margin={{ top: 10, right: 10, left: -15, bottom: 5 }} barSize={12}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="kode" tick={{ fontSize: 10, fill: '#334155', fontWeight: 700 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 4]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="jonggonJaya" name="Jonggon Jaya" fill="#2b6cb0" radius={[3, 3, 0, 0]} />
                <Bar dataKey="kedangIpil" name="Kedang Ipil" fill="#276749" radius={[3, 3, 0, 0]} />
                <Bar dataKey="lungAnai" name="Lung Anai" fill="#c05621" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[10px] text-slate-600">
              {RUBRIK_KEMATANGAN_DIMENSI.map((m) => (
                <div key={m.kode} className="truncate"><strong>{m.kode}:</strong> {m.nama}</div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skala Kematangan 1-5 */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Layers size={16} /> Interpretasi Skala Kematangan (Level 1 s.d. 5)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {maturityScale.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border-2 text-center ${i === 1 ? 'ring-2 ring-blue-300' : ''}`}
                style={{ borderColor: m.color + '50', backgroundColor: m.color + '08' }}
              >
                <div className="w-8 h-8 rounded-full mx-auto flex items-center justify-center mb-2 text-white text-sm font-black" style={{ backgroundColor: m.color }}>
                  {i + 1}
                </div>
                <p className="text-[11px] font-black text-slate-800">{m.level}</p>
                <p className="text-[10px] font-mono font-bold mb-1" style={{ color: m.color }}>{m.range}</p>
                <p className="text-[10px] text-slate-500 leading-snug">{m.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
