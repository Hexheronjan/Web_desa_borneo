'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from 'recharts';
import { HeartPulse, Baby, Users, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const COLOR = '#b71c1c';

const statusGizi = [
  { name: 'Gizi Baik', value: 78, color: '#2E7D32' },
  { name: 'Gizi Kurang', value: 14, color: '#E65100' },
  { name: 'Gizi Buruk', value: 5, color: '#b71c1c' },
  { name: 'Gizi Lebih', value: 3, color: '#1565C0' },
];

const stuntingPerRT = [
  { rt: 'RT 01', prevalensi: 14 },
  { rt: 'RT 02', prevalensi: 18 },
  { rt: 'RT 03', prevalensi: 22 },
  { rt: 'RT 04', prevalensi: 12 },
  { rt: 'RT 05', prevalensi: 16 },
  { rt: 'RT 06', prevalensi: 9 },
];

const kesehatanTrend = [
  { bln: 'Jan', balita: 120, ibuHamil: 22 },
  { bln: 'Feb', balita: 122, ibuHamil: 24 },
  { bln: 'Mar', balita: 119, ibuHamil: 23 },
  { bln: 'Apr', balita: 121, ibuHamil: 25 },
  { bln: 'Mei', balita: 123, ibuHamil: 26 },
  { bln: 'Jun', balita: 120, ibuHamil: 25 },
];

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return percent > 0.05 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

export default function NakesDashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Kesehatan" modul="Nakes / Bidan / Puskesmas" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Jumlah Balita" value={120} satuan="anak terdaftar" barColor="red" progress={75} sparkData={[110,112,115,117,119,120]} />
        <StatCard label="Ibu Hamil" value={25} satuan="bumil terpantau" barColor="orange" progress={60} sparkData={[18,19,20,22,24,25]} trend="up" />
        <StatCard label="Posyandu Aktif" value={8} satuan="unit posyandu" barColor="green" progress={80} />
        <StatCard label="Prevalensi Stunting" value="14%" satuan="< 14% target" barColor="yellow" progress={14} sparkData={[22,20,19,18,16,14]} trend="down" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Status Gizi Pie */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Baby size={16} /> Status Gizi Balita
              </CardTitle>
              <Link href="/nakes/data-balita" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={statusGizi} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={78} labelLine={false} label={renderCustomLabel}>
                  {statusGizi.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-2 w-full">
              {statusGizi.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-slate-600">{s.name}</span>
                  </div>
                  <span className="font-bold" style={{ color: s.color }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stunting per RT */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <AlertTriangle size={16} /> Prevalensi Stunting per RT (%)
              </CardTitle>
              <Link href="/nakes/stunting" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stuntingPerRT} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fff1f2" />
                <XAxis dataKey="rt" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 30]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: number) => [`${v}%`, 'Stunting']} />
                {/* Reference line at 14% */}
                <Bar dataKey="prevalensi" name="Prevalensi (%)" fill="#b71c1c" radius={[4,4,0,0]}
                  label={{ position: 'top', fontSize: 9, fill: '#64748b' }} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-[10px] text-slate-400 mt-1 text-center">Target nasional: ≤ 14% · Rata-rata desa: <strong className="text-red-600">14%</strong></p>
          </CardContent>
        </Card>
      </div>

      {/* Tren Kesehatan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <HeartPulse size={16} /> Tren Data Kesehatan Bulanan
            </CardTitle>
            <Link href="/nakes/posyandu" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              Lihat Selengkapnya →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={kesehatanTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fff1f2" />
              <XAxis dataKey="bln" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
              <Line type="monotone" dataKey="balita" name="Balita Terpantau" stroke="#b71c1c" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="ibuHamil" name="Ibu Hamil" stroke="#E65100" strokeWidth={2} strokeDasharray="4 2" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
