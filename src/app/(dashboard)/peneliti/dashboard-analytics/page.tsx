'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { BarChart3, TrendingUp, Activity, Award, Database, Shield } from 'lucide-react';
import { DESA_BAB4, LOG_4_MINGGU_BAB4 } from '@/lib/bab4-data';

const COLOR = '#1a365d';

const sdgsCards = [
  { sdg: 'SDGs 3', nama: 'Desa Sehat & Sejahtera (18 KPI)', awal: 74.70, nilai: 82.24, color: '#2e7d32' },
  { sdg: 'SDGs 4', nama: 'Pendidikan Desa Berkualitas (18 KPI)', awal: 66.68, nilai: 74.90, color: '#1565c0' },
  { sdg: 'SDGs 18', nama: 'Kelembagaan & Budaya Adaptif (18 KPI)', awal: 76.92, nilai: 84.86, color: '#6a1b9a' },
];

const radarKPI = [
  { aspek: 'Readiness (Pasca)', nilai: 60.45 },
  { aspek: 'Kematangan (×20)', nilai: 50.60 },
  { aspek: 'Manfaat QoL', nilai: 69.97 },
  { aspek: 'SDGs 3, 4, 18', nilai: 80.67 },
  { aspek: 'UAT Relevan', nilai: 86.65 },
  { aspek: 'SUS Score', nilai: 67.58 },
];

export default function DashboardAnalyticsPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Analitik Penelitian (Bab IV)" modul="Dashboard Analytics" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Readiness (Pasca)', value: '60,45', sub: 'Pra 58,18 (+2,27 NS)', color: '#2b6cb0', icon: BarChart3 },
          { label: 'Kematangan (N=121)', value: '2,53', sub: 'Pra 1,94 (+0,59 sig)', color: '#276749', icon: Activity },
          { label: 'Manfaat Awal QoL', value: '69,97', sub: 'Pra 68,43 (+1,54 sig)', color: '#c05621', icon: Award },
          { label: 'SDGs 3, 4, 18', value: '80,67%', sub: 'Awal 72,76% (+7,90 poin)', color: '#553c9a', icon: Shield },
          { label: 'UAT / SUS', value: '86,65%', sub: 'SUS 67,58 (α=0,955)', color: '#c53030', icon: TrendingUp },
          { label: 'Partisipan', value: '126', sub: '3 Desa · 7 Peran × 18', color: '#d69e2e', icon: Database },
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
              <p className="text-[10px] text-slate-500 font-semibold">{kpi.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Tren Log 4 Minggu */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <TrendingUp size={16} /> Perkembangan Siklus Uji Lapangan 4 Minggu (Dataset SLV 3)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={[...LOG_4_MINGGU_BAB4]} margin={{ top: 5, right: 15, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="periode" tick={{ fontSize: 10, fill: '#334155' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 115]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Line type="monotone" dataKey="tingkat" name="Tingkat Penyelesaian (%)" stroke="#276749" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="kesalahan" name="Jumlah Kesalahan" stroke="#e53e3e" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="bantuan" name="Permintaan Bantuan" stroke="#c05621" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Activity size={16} /> Radar Metrik Utama RQ3
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarKPI} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="#bee3f8" />
                <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 9, fill: '#1a365d', fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar dataKey="nilai" stroke="#2b6cb0" fill="#2b6cb0" fillOpacity={0.2} strokeWidth={2} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Shield size={16} /> Capaian SDGs Desa 3, 4, dan 18 (54 KPI)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sdgsCards.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <span className="text-xs font-bold text-slate-800">{s.sdg}</span>
                    <span className="text-[10px] text-slate-500 ml-1.5">{s.nama}</span>
                  </div>
                  <span className="text-xs font-black" style={{ color: s.color }}>{s.nilai.toFixed(2)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${s.nilai}%`, backgroundColor: s.color }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">Awal: {s.awal.toFixed(2)}% (Δ +{(s.nilai - s.awal).toFixed(2)}%)</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Award size={16} /> Peringkat Kesiapan 3 Desa Penelitian (RQ1)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {DESA_BAB4.map((d, i) => {
              const color = ['#276749', '#2b6cb0', '#c05621'][i];
              return (
                <div key={d.id}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-black" style={{ backgroundColor: color }}>
                        {i + 1}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block leading-tight">{d.nama}</span>
                        <span className="text-[10px] text-slate-400">Kec. {d.kecamatan} · {d.kategoriKesiapan}</span>
                      </div>
                    </div>
                    <span className="text-xs font-black" style={{ color }}>{d.skorKesiapan.toFixed(2)}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden ml-7">
                    <div className="h-full rounded-full" style={{ width: `${d.skorKesiapan}%`, backgroundColor: color }} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
