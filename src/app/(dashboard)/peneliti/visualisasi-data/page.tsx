'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ScatterChart, Scatter, ZAxis, PieChart, Pie, Cell,
} from 'recharts';
import { BarChart3, TrendingUp, Activity, PieChart as PieIcon } from 'lucide-react';

const COLOR = '#1a365d';

const trenReadiness = [
  { tahun: '2022', nilai: 48.20 },
  { tahun: '2023', nilai: 55.30 },
  { tahun: '2024', nilai: 63.10 },
  { tahun: '2025', nilai: 74.30 },
];

const trenQoL = [
  { tahun: '2022', nilai: 52.10 },
  { tahun: '2023', nilai: 58.40 },
  { tahun: '2024', nilai: 64.80 },
  { tahun: '2025', nilai: 71.28 },
];

const trenMaturity = [
  { tahun: '2022', nilai: 1.8 },
  { tahun: '2023', nilai: 2.3 },
  { tahun: '2024', nilai: 2.8 },
  { tahun: '2025', nilai: 3.15 },
];

const scatterData = [
  { readiness: 58, qol: 52, z: 10 }, { readiness: 63, qol: 58, z: 10 },
  { readiness: 68, qol: 62, z: 10 }, { readiness: 70, qol: 65, z: 10 },
  { readiness: 72, qol: 68, z: 10 }, { readiness: 74, qol: 71, z: 10 },
  { readiness: 76, qol: 73, z: 10 }, { readiness: 80, qol: 77, z: 10 },
  { readiness: 84, qol: 80, z: 10 },
];

const distribusiDimensi = [
  { name: 'SDM & Literasi (21%)', value: 21, color: '#2b6cb0' },
  { name: 'Infrastruktur (16%)', value: 16, color: '#276749' },
  { name: 'Kesehatan (15%)', value: 15, color: '#c05621' },
  { name: 'Ekonomi (17%)', value: 17, color: '#c53030' },
  { name: 'Lingkungan (9%)', value: 9, color: '#553c9a' },
  { name: 'Sosial Budaya (13%)', value: 13, color: '#d69e2e' },
  { name: 'Kelembagaan (9%)', value: 9, color: '#0694a2' },
];

const radarDimensi = [
  { aspek: 'SDM & Literasi', nilai: 68.8 },
  { aspek: 'Infrastruktur', nilai: 72.6 },
  { aspek: 'Kesehatan', nilai: 75.7 },
  { aspek: 'Ekonomi', nilai: 62.9 },
  { aspek: 'Lingkungan', nilai: 71.7 },
  { aspek: 'Sosial Budaya', nilai: 80.5 },
  { aspek: 'Kelembagaan', nilai: 70.8 },
];

const grafik = [
  { jenis: 'Bar Chart', jumlah: 8, warna: '#2b6cb0' },
  { jenis: 'Line Chart', jumlah: 5, warna: '#276749' },
  { jenis: 'Pie/Donut', jumlah: 4, warna: '#553c9a' },
  { jenis: 'Radar Chart', jumlah: 3, warna: '#c05621' },
  { jenis: 'Scatter Plot', jumlah: 2, warna: '#d69e2e' },
];

export default function VisualisasiDataPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Grafik Visualisasi Data" modul="Analitik Penelitian" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Grafik', value: '22', sub: '5 Jenis Visualisasi', color: COLOR, icon: BarChart3 },
          { label: 'Dataset', value: '4', sub: 'Kategori Dataset', color: '#276749', icon: Activity },
          { label: 'Tren Readiness', value: '+19.0', sub: '2022–2025', color: '#2b6cb0', icon: TrendingUp },
          { label: 'R² Korelasi', value: '0.756', sub: 'Readiness vs QoL', color: '#553c9a', icon: PieIcon },
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

      {/* Tren Readiness & QoL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Tren Readiness Index (2022–2025)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={trenReadiness} margin={{ top: 5, right: 15, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="tahun" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[40, 80]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${v}`, 'Readiness']} />
                <Line type="monotone" dataKey="nilai" stroke="#2b6cb0" strokeWidth={3} dot={{ r: 5, fill: '#2b6cb0' }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {trenReadiness.map((t, i) => (
                <div key={i} className="text-center p-1.5 rounded-lg bg-blue-50">
                  <p className="text-[9px] text-blue-600 font-bold">{t.tahun}</p>
                  <p className="text-sm font-black text-blue-800">{t.nilai}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Tren Quality of Life Index (2022–2025)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={trenQoL} margin={{ top: 5, right: 15, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="tahun" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[40, 80]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${v}`, 'QoL']} />
                <Line type="monotone" dataKey="nilai" stroke="#276749" strokeWidth={3} dot={{ r: 5, fill: '#276749' }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {trenQoL.map((t, i) => (
                <div key={i} className="text-center p-1.5 rounded-lg bg-green-50">
                  <p className="text-[9px] text-green-600 font-bold">{t.tahun}</p>
                  <p className="text-sm font-black text-green-800">{t.nilai}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scatter + Radar + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Scatter Readiness vs QoL */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Activity size={16} /> Korelasi Readiness vs QoL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <ScatterChart margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="readiness" type="number" domain={[55, 90]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} name="Readiness" label={{ value: 'Readiness', position: 'bottom', fontSize: 10, fill: '#94a3b8' }} />
                <YAxis dataKey="qol" type="number" domain={[50, 85]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} name="QoL" />
                <ZAxis range={[30, 30]} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any, name: any) => [v, name === 'readiness' ? 'Readiness' : 'QoL']} />
                <Scatter data={scatterData} fill="#553c9a" />
              </ScatterChart>
            </ResponsiveContainer>
            <p className="text-center text-[11px] text-purple-700 font-black mt-1">R² = 0.756 (Korelasi Kuat)</p>
          </CardContent>
        </Card>

        {/* Radar dimensi */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Activity size={16} /> Radar Chart 7 Dimensi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarDimensi} margin={{ top: 10, right: 25, bottom: 10, left: 25 }}>
                <PolarGrid stroke="#bee3f8" />
                <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 9, fill: '#1a365d', fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[55, 90]} tick={false} />
                <Radar dataKey="nilai" stroke="#2b6cb0" fill="#2b6cb0" fillOpacity={0.2} strokeWidth={2} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${v}`, 'Nilai']} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie distribusi bobot dimensi */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <PieIcon size={16} /> Distribusi Bobot Dimensi Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={distribusiDimensi} dataKey="value" cx="50%" cy="50%" outerRadius={60} stroke="none">
                  {distribusiDimensi.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${v}%`, 'Bobot']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1 mt-2">
              {distribusiDimensi.map((d, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-[9px] text-gray-500 truncate">{d.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tren Maturity */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <BarChart3 size={16} /> Tren Maturity Level (2022–2025) & Ringkasan Grafik
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={trenMaturity} margin={{ top: 5, right: 5, left: -20, bottom: 5 }} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="tahun" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 5]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} ticks={[0,1,2,3,4,5]} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`Level ${v}`, 'Maturity']} />
                <Bar dataKey="nilai" fill="#c05621" radius={[4, 4, 0, 0]}>
                  {trenMaturity.map((_, i) => <Cell key={i} fill={['#e53e3e','#d69e2e','#2b6cb0','#276749'][i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-gray-500 uppercase">Ringkasan Jenis Grafik</p>
              {grafik.map((g, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.warna }} />
                    <span className="text-[12px] font-semibold text-slate-700">{g.jenis}</span>
                  </div>
                  <span className="font-black text-[13px]" style={{ color: g.warna }}>{g.jumlah} grafik</span>
                </div>
              ))}
              <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 flex justify-between">
                <span className="text-[11px] font-bold text-blue-700">Total</span>
                <span className="font-black text-[14px] text-blue-800">{grafik.reduce((s,g) => s+g.jumlah, 0)} grafik</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
