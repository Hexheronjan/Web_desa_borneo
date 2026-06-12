'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Leaf, Sun, Trash2, Droplets, Award } from 'lucide-react';

const COLOR = '#2e7d32';

const envTrend = [
  { bln: 'Jan', air: 82, sampah: 55, solar: 28 },
  { bln: 'Feb', air: 84, sampah: 57, solar: 30 },
  { bln: 'Mar', air: 85, sampah: 58, solar: 31 },
  { bln: 'Apr', air: 86, sampah: 60, solar: 32 },
  { bln: 'Mei', air: 87, sampah: 61, solar: 33 },
  { bln: 'Jun', air: 88, sampah: 62, solar: 35 },
];

const energiData = [
  { name: 'Solar Panel', value: 35, color: '#E65100' },
  { name: 'PLN Grid', value: 55, color: '#1565C0' },
  { name: 'Genset Desa', value: 10, color: '#94a3b8' },
];

const sdgsProgress = [
  { sdg: 'SDGs 6 — Air Bersih', capaian: 88, target: 90, color: '#1565C0' },
  { sdg: 'SDGs 7 — Energi Bersih', capaian: 35, target: 50, color: '#E65100' },
  { sdg: 'SDGs 11 — Kota Layak Huni', capaian: 72, target: 80, color: '#7B1FA2' },
  { sdg: 'SDGs 13 — Iklim', capaian: 65, target: 70, color: '#2E7D32' },
  { sdg: 'SDGs 15 — Ekosistem', capaian: 78, target: 80, color: '#00695C' },
];

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return percent > 0.08 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

export default function SmartSustainabilityPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Smart Sustainability" modul="Lintas Peran — Pemdes / Admin / Dinas" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Skor Lingkungan" value="78" satuan="poin baik" barColor="green" progress={78}
          sparkData={[70,72,74,75,76,77,78]} trend="up" />
        <StatCard label="Energi Terbarukan" value="35%" satuan="solar power" barColor="orange" progress={35}
          sparkData={[25,27,28,30,31,33,35]} trend="up" />
        <StatCard label="Pengelolaan Sampah" value="62%" satuan="terproses" barColor="purple" progress={62}
          sparkData={[50,53,55,57,59,61,62]} trend="up" />
        <StatCard label="Akses Air Bersih" value="88%" satuan="layanan layak" barColor="blue" progress={88}
          sparkData={[80,82,83,84,85,87,88]} trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Area Chart Tren Lingkungan */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Leaf size={16} /> Tren Indikator Lingkungan (6 Bulan)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={envTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradAir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1565C0" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#1565C0" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradSampah" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7B1FA2" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7B1FA2" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradSolar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E65100" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#E65100" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
                <XAxis dataKey="bln" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: number) => [`${v}%`, '']} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Area type="monotone" dataKey="air" name="Air Bersih (%)" stroke="#1565C0" strokeWidth={2} fill="url(#gradAir)" />
                <Area type="monotone" dataKey="sampah" name="Sampah Terkelola (%)" stroke="#7B1FA2" strokeWidth={2} fill="url(#gradSampah)" />
                <Area type="monotone" dataKey="solar" name="Energi Solar (%)" stroke="#E65100" strokeWidth={2} fill="url(#gradSolar)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Komposisi Energi Pie */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Sun size={16} /> Komposisi Sumber Energi Desa
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={energiData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={68} label={renderLabel} labelLine={false}>
                  {energiData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full space-y-1.5 mt-2">
              {energiData.map((e, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: e.color }} />
                    <span className="text-slate-600">{e.name}</span>
                  </div>
                  <span className="font-bold" style={{ color: e.color }}>{e.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SDGs Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Award size={16} /> Capaian SDGs Terkait Keberlanjutan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sdgsProgress.map((s, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-700">{s.sdg}</span>
                <div className="flex items-center gap-3 text-xs">
                  <span style={{ color: s.color }} className="font-black">{s.capaian}%</span>
                  <span className="text-slate-400">/ target {s.target}%</span>
                </div>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden relative">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${s.capaian}%`, backgroundColor: s.color }} />
                <div className="absolute top-0 h-full w-0.5 bg-red-400/70" style={{ left: `${s.target}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
