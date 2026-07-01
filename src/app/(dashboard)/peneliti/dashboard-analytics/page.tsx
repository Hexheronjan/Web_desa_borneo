'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie,
} from 'recharts';
import { BarChart3, TrendingUp, Activity, Award, Database, Shield } from 'lucide-react';

const COLOR = '#1a365d';

// Tren 6 bulan
const trenBulan = [
  { bulan: 'Jan 2026', readiness: 70.0, maturity: 3.05, qol: 68.4, slv: 70.4, sdgs: 74.38 },
  { bulan: 'Feb 2026', bulanShort: 'Feb', readiness: 70.5, maturity: 3.08, qol: 68.7, slv: 70.8, sdgs: 74.52 },
  { bulan: 'Mar 2026', bulanShort: 'Mar', readiness: 72.0, maturity: 3.10, qol: 69.5, slv: 71.2, sdgs: 75.10 },
  { bulan: 'Apr 2026', bulanShort: 'Apr', readiness: 73.1, maturity: 3.12, qol: 70.2, slv: 71.8, sdgs: 76.20 },
  { bulan: 'Mei 2026', bulanShort: 'Mei', readiness: 73.8, maturity: 3.13, qol: 70.8, slv: 72.3, sdgs: 77.50 },
  { bulan: 'Jun 2026', bulanShort: 'Jun', readiness: 74.3, maturity: 3.15, qol: 71.28, slv: 72.61, sdgs: 78.60 },
];

const sdgsCards = [
  { sdg: 'SDGs 3', nama: 'Kesehatan', nilai: 82.4, color: '#e53935', sub: 'Baik' },
  { sdg: 'SDGs 4', nama: 'Pendidikan & Pekerjaan', nilai: 76.8, color: '#e65100', sub: 'Baik' },
  { sdg: 'SDGs 8', nama: 'Pekerjaan & Ekonomi', nilai: 79.1, color: '#f9a825', sub: 'Baik' },
  { sdg: 'SDGs 11', nama: 'Kota & Komunitas', nilai: 75.2, color: '#388e3c', sub: 'Baik' },
  { sdg: 'SDGs 13', nama: 'Aksi Iklim', nilai: 74.0, color: '#1565c0', sub: 'Baik' },
  { sdg: 'SDGs 18', nama: 'Keberlanjutan Desa', nilai: 85.6, color: '#6a1b9a', sub: 'Sangat Baik' },
];

const radarKPI = [
  { aspek: 'Readiness', nilai: 74.3 },
  { aspek: 'Maturity', nilai: 63.0 },
  { aspek: 'QoL', nilai: 71.28 },
  { aspek: 'SLV Index', nilai: 72.61 },
  { aspek: 'SDGs', nilai: 78.60 },
];

const top5Desa = [
  { nama: 'Janggon Jaya', nilai: 91.45, color: '#276749' },
  { nama: 'Kedang Ipil', nilai: 85.32, color: '#2b6cb0' },
  { nama: 'Lung Anai', nilai: 81.23, color: '#c05621' },
  { nama: 'Desa Mulawarman', nilai: 78.54, color: '#553c9a' },
  { nama: 'Desa Bukit Raya', nilai: 77.08, color: '#d69e2e' },
];

export default function DashboardAnalyticsPage() {
  const latestData = trenBulan[trenBulan.length - 1];

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Analitik" modul="Dashboard Analytics" color={COLOR} />

      {/* KPI — Seluruh KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Readiness Index', value: `${latestData.readiness}`, sub: '↑ 3,21 bln lalu', color: '#2b6cb0', icon: BarChart3 },
          { label: 'Maturity Index', value: `${latestData.maturity}`, sub: '↑ 0,32 bln lalu', color: '#276749', icon: Activity },
          { label: 'QoL Index', value: `${latestData.qol}`, sub: '↑ 2,18 bln lalu', color: '#c05621', icon: Award },
          { label: 'SLV Index', value: `${latestData.slv}`, sub: 'Composite Index', color: '#553c9a', icon: TrendingUp },
          { label: 'SDGs Achievement', value: `${latestData.sdgs}%`, sub: '↑ 4,12 bln lalu', color: '#c53030', icon: Shield },
          { label: 'Dataset', value: '146', sub: 'Responden', color: '#d69e2e', icon: Database },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: kpi.color }}>
                  <Icon size={12} className="text-white" />
                </div>
                <span className="text-[9px] font-semibold text-gray-500 uppercase leading-none">{kpi.label}</span>
              </div>
              <p className="text-xl font-black text-gray-900">{kpi.value}</p>
              <p className="text-[10px] text-green-600 font-semibold">{kpi.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Trend Multi-Line */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <TrendingUp size={16} /> Trend Indeks Nasional (6 Bulan Terakhir)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trenBulan} margin={{ top: 5, right: 15, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 90]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Line type="monotone" dataKey="readiness" name="Readiness Index" stroke="#2b6cb0" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="qol" name="QoL Index" stroke="#c05621" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="slv" name="SLV Index" stroke="#553c9a" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="sdgs" name="SDGs Achievement" stroke="#276749" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Radar KPI */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Activity size={16} /> Radar Seluruh KPI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarKPI} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="#bee3f8" />
                <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 10, fill: '#1a365d', fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[55, 85]} tick={false} />
                <Radar dataKey="nilai" stroke="#2b6cb0" fill="#2b6cb0" fillOpacity={0.2} strokeWidth={2} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${v}`, 'Nilai']} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* SDGs Achievement */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Shield size={16} /> SDGs Achievement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sdgsCards.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-0.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-[10px] font-bold text-slate-700">{s.sdg}</span>
                      <span className="text-[10px] text-slate-400">{s.nama}</span>
                    </div>
                    <span className="text-[11px] font-black" style={{ color: s.color }}>{s.nilai}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${s.nilai}%`, backgroundColor: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top 5 Desa */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Award size={16} /> Top 5 Desa Readiness Tertinggi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {top5Desa.map((d, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-0.5">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-black" style={{ backgroundColor: d.color }}>
                        {i + 1}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700">{d.nama}</span>
                    </div>
                    <span className="text-[11px] font-black" style={{ color: d.color }}>{d.nilai}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden ml-7">
                    <div className="h-full rounded-full" style={{ width: `${d.nilai}%`, backgroundColor: d.color }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Penelitian */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Database size={16} /> Status Penelitian — Monitoring Hasil Penelitian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Dataset Terkumpul', value: '100%', icon: Database, color: '#2b6cb0' },
              { label: 'Artefak Tervalidasi', value: '6 / 6', icon: Shield, color: '#276749' },
              { label: 'Validator Aktif', value: '3 Orang', icon: Award, color: '#c05621' },
              { label: 'UAT & SUS Selesai', value: '100%', icon: Activity, color: '#553c9a' },
              { label: 'Sistem Optimal', value: 'Optimal', icon: TrendingUp, color: '#c53030' },
              { label: 'Sinkronisasi Terakhir', value: '27/06/2026', icon: BarChart3, color: '#d69e2e' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center p-3 rounded-xl border" style={{ borderColor: stat.color + '40', backgroundColor: stat.color + '08' }}>
                  <div className="w-8 h-8 rounded-lg mx-auto flex items-center justify-center mb-1.5" style={{ backgroundColor: stat.color }}>
                    <Icon size={15} className="text-white" />
                  </div>
                  <p className="text-base font-black" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-[9px] text-slate-500 font-medium mt-0.5 leading-snug">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
