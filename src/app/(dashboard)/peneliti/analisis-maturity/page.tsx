'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { Layers, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';

const COLOR = '#1a365d';

const maturityLevels = [
  { level: 'Level 1 (Pemula)', value: 0, persen: 0, color: '#e53e3e', desc: 'Tidak ada dimensi pada level ini' },
  { level: 'Level 2 (Dasar)', value: 10, persen: 10, color: '#ecc94b', desc: 'Kelembagaan dan Ekonomi digital' },
  { level: 'Level 3 (Berkembang)', value: 60, persen: 60, color: '#4299e1', desc: 'Mayoritas dimensi sudah berkembang' },
  { level: 'Level 4 (Maju)', value: 30, persen: 30, color: '#48bb78', desc: 'Kesehatan & Sosial Budaya maju' },
  { level: 'Level 5 (Unggul)', value: 0, persen: 0, color: '#9f7aea', desc: 'Belum ada dimensi unggul' },
];

const maturityDimensi = [
  { dimensi: 'Smart Governance', level: 3.2, color: '#2b6cb0' },
  { dimensi: 'Smart Living', level: 3.8, color: '#276749' },
  { dimensi: 'Smart Economy', level: 2.9, color: '#c05621' },
  { dimensi: 'Smart Environment', level: 3.4, color: '#c53030' },
  { dimensi: 'Smart Culture', level: 4.0, color: '#553c9a' },
  { dimensi: 'Smart Infrastructure', value: 3.1, color: '#d69e2e' },
  { dimensi: 'Smart Dafurea', level: 2.8, color: '#0694a2' },
].map(d => ({ ...d, level: d.level ?? 3.0 }));

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, persen }: any) => {
  if (persen === 0) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
      {`${persen}%`}
    </text>
  );
};

export default function AnalisisMaturityPage() {
  const rataRata = (maturityDimensi.reduce((s, d) => s + d.level, 0) / maturityDimensi.length).toFixed(2);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Analisis Maturity" modul="Analisis Framework" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Maturity Rata-rata', value: rataRata, sub: 'Level: Berkembang', color: COLOR, icon: Layers },
          { label: 'Level Dominan', value: 'Level 3', sub: '60% — Berkembang', color: '#4299e1', icon: TrendingUp },
          { label: 'Level Tertinggi', value: 'Level 4', sub: 'Smart Culture (4.0)', color: '#48bb78', icon: CheckCircle2 },
          { label: 'Level Terendah', value: 'Level 2.8', sub: 'Smart Dafurea', color: '#c53030', icon: AlertCircle },
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
        {/* Donut Chart */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Layers size={16} /> Maturity Chart — Distribusi Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <ResponsiveContainer width={180} height={180}>
                  <PieChart>
                    <Pie
                      data={maturityLevels.filter(m => m.persen > 0)}
                      dataKey="persen"
                      cx="50%" cy="50%"
                      innerRadius={50} outerRadius={82}
                      labelLine={false}
                      label={renderCustomLabel}
                      stroke="none"
                    >
                      {maturityLevels.filter(m => m.persen > 0).map((m, i) => (
                        <Cell key={i} fill={m.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${v}%`, 'Proporsi']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-[9px] text-gray-400">Rata-rata</p>
                  <p className="text-xl font-black text-gray-900">{rataRata}</p>
                  <p className="text-[9px] font-bold text-blue-600">Berkembang</p>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {maturityLevels.map((m, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: m.color }} />
                        <span className="text-[11px] font-semibold text-slate-700">{m.level}</span>
                      </div>
                      <span className="text-[11px] font-black" style={{ color: m.color }}>{m.persen}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${m.persen}%`, backgroundColor: m.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bar per dimensi */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Level Maturity per Dimensi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={maturityDimensi} layout="vertical" margin={{ top: 0, right: 30, left: 60, bottom: 0 }} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} ticks={[0,1,2,3,4,5]} />
                <YAxis type="category" dataKey="dimensi" tick={{ fontSize: 10, fill: '#374151' }} axisLine={false} tickLine={false} width={70} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`Level ${v}`, 'Maturity']} />
                <Bar dataKey="level" radius={[0, 4, 4, 0]}>
                  {maturityDimensi.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            {/* Garis referensi level */}
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { label: 'Level 1: Pemula', color: '#e53e3e' },
                { label: 'Level 2: Dasar', color: '#ecc94b' },
                { label: 'Level 3: Berkembang', color: '#4299e1' },
                { label: 'Level 4: Maju', color: '#48bb78' },
                { label: 'Level 5: Unggul', color: '#9f7aea' },
              ].map((l, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                  <span className="text-[10px] text-gray-500">{l.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detail per level */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Layers size={16} /> Deskripsi Nilai Maturity — Level 1 s/d 5
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {maturityLevels.map((m, i) => (
              <div key={i} className="p-3 rounded-xl border-2 text-center" style={{ borderColor: m.color + '50', backgroundColor: m.color + '08' }}>
                <div className="w-8 h-8 rounded-full mx-auto flex items-center justify-center mb-2 text-white text-sm font-black" style={{ backgroundColor: m.color }}>
                  {i + 1}
                </div>
                <p className="text-[11px] font-black text-slate-800 mb-1">{m.level.replace('Level ' + (i+1) + ' ', '')}</p>
                <p className="text-2xl font-black mb-1" style={{ color: m.color }}>{m.persen}%</p>
                <p className="text-[10px] text-slate-500 leading-snug">{m.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
