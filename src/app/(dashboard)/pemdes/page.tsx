'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, Legend,
} from 'recharts';
import {
  LayoutDashboard, TrendingUp, Target, Heart, BookOpen, Landmark,
  BarChart3, CheckCircle2, AlertTriangle, ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';

const COLOR = '#283593';

const dssPrograms = [
  { rank: 1, name: 'Layanan Kesehatan', score: 0.232, priority: 'Sangat Tinggi' },
  { rank: 2, name: 'Literasi Digital', score: 0.198, priority: 'Tinggi' },
  { rank: 3, name: 'Infrastruktur Internet', score: 0.175, priority: 'Tinggi' },
  { rank: 4, name: 'Pelestarian Budaya Adat', score: 0.116, priority: 'Sedang' },
  { rank: 5, name: 'Lingkungan Sehat', score: 0.098, priority: 'Sedang' },
];

const radarData = [
  { dim: 'Governance', score: 78, target: 80 },
  { dim: 'Technology', score: 72, target: 85 },
  { dim: 'Culture', score: 80, target: 75 },
  { dim: 'Sustainability', score: 75, target: 80 },
  { dim: 'QoL', score: 77, target: 80 },
];

const apbdesData = [
  { name: 'Pemerintahan', anggaran: 250, realisasi: 200 },
  { name: 'Pembangunan', anggaran: 450, realisasi: 340 },
  { name: 'Kemasyarakatan', anggaran: 200, realisasi: 150 },
  { name: 'Pemberdayaan', anggaran: 250, realisasi: 150 },
  { name: 'Bencana', anggaran: 100, realisasi: 60 },
];

const kpiTrend = [
  { bln: 'Jan', sli: 72, readiness: 68 },
  { bln: 'Feb', sli: 73, readiness: 70 },
  { bln: 'Mar', sli: 74, readiness: 71 },
  { bln: 'Apr', sli: 75, readiness: 72 },
  { bln: 'Mei', sli: 76, readiness: 73 },
  { bln: 'Jun', sli: 76, readiness: 73.5 },
  { bln: 'Jul', sli: 77, readiness: 74 },
  { bln: 'Agu', sli: 77.5, readiness: 74.5 },
  { bln: 'Sep', sli: 78, readiness: 75 },
  { bln: 'Okt', sli: 78.2, readiness: 75.1 },
  { bln: 'Nov', sli: 78.4, readiness: 75.2 },
  { bln: 'Des', sli: 78.45, readiness: 75.2 },
];

export default function PemdesDashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Smart Living Village" modul="Pemdes / Kepala Desa" color={COLOR} />

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Smart Living Index" value="78,45" satuan="Baik" barColor="blue" progress={78}
          sparkData={[72,73,74,75,76,76,77,77.5,78,78.2,78.4,78.45]} trend="up" />
        <StatCard label="Readiness Score" value="75,20" satuan="poin" barColor="green" progress={75}
          sparkData={[68,70,71,72,73,73.5,74,74.5,75,75.1,75.2,75.2]} trend="up" />
        <StatCard label="Maturity Level" value="3,25" satuan="dari 5" barColor="orange" progress={65} />
        <StatCard label="Quality of Life Index" value="76,80" satuan="poin" barColor="purple" progress={77}
          sparkData={[72,73,74,75,75.5,76,76.2,76.5,76.7,76.8,76.8,76.8]} trend="up" />
      </div>

      {/* KPI Trend + SDGs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <TrendingUp size={16} /> Tren KPI Smart Living (12 Bulan)
              </CardTitle>
              <Link href="/pemdes/kpi-dashboard" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Lihat Selengkapnya →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={kpiTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="bln" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[65, 82]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="sli" name="Smart Living Index" stroke="#283593" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="readiness" name="Readiness Score" stroke="#2E7D32" strokeWidth={2} strokeDasharray="4 2" dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Target size={16} /> KPI Radar — 5 Dimensi Smart Living
              </CardTitle>
              <Link href="/pemdes/kpi-dashboard" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="dim" tick={{ fontSize: 10, fill: '#64748b' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 8, fill: '#94a3b8' }} />
                <Radar name="Skor Aktual" dataKey="score" stroke="#283593" fill="#283593" fillOpacity={0.25} strokeWidth={2} />
                <Radar name="Target" dataKey="target" stroke="#E65100" fill="#E65100" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 2" />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* APBDes BarChart + DSS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <TrendingUp size={16} /> Realisasi APBDes (Juta Rupiah)
              </CardTitle>
              <Link href="/pemdes/apbdes" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={apbdesData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: number) => [`Rp ${v}jt`, '']} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="anggaran" name="Anggaran" fill="#9FA8DA" radius={[3, 3, 0, 0]} />
                <Bar dataKey="realisasi" name="Realisasi" fill="#283593" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <BarChart3 size={16} /> Top 5 Prioritas Program (DSS)
              </CardTitle>
              <Link href="/pemdes/dss-recommendation" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Lihat Selengkapnya →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dssPrograms.map((p) => (
                <div key={p.rank} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: COLOR }}>
                    {p.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">{p.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${p.score * 400}%`, backgroundColor: p.rank <= 2 ? '#283593' : p.rank <= 4 ? '#5C6BC0' : '#9FA8DA' }} />
                      </div>
                      <span className="text-xs text-slate-500 font-mono w-12 text-right">{p.score.toFixed(3)}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${p.priority === 'Sangat Tinggi' ? 'bg-red-100 text-red-700' : p.priority === 'Tinggi' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                    {p.priority}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 size={12} className="text-green-500" />
              <span>Consistency Ratio (CR): <strong className="text-indigo-700">0,08</strong> — Valid</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            📊 Ringkasan Data Desa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Total Penduduk', value: '2.345', unit: 'jiwa' },
              { label: 'Total Desa', value: '24', unit: 'desa' },
              { label: 'Data Entries', value: '52.430', unit: 'record' },
              { label: 'Pengguna Aktif', value: '125', unit: 'user' },
              { label: 'Posyandu', value: '8', unit: 'unit' },
              { label: 'Literasi Digital', value: '48%', unit: 'capaian' },
            ].map((item, i) => (
              <div key={i} className="text-center p-3 rounded-lg" style={{ backgroundColor: `${COLOR}10` }}>
                <p className="text-lg font-extrabold" style={{ color: COLOR }}>{item.value}</p>
                <p className="text-[10px] text-slate-500 font-medium">{item.label}</p>
                <p className="text-[9px] text-slate-400">{item.unit}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
