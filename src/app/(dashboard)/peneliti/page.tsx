'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from 'recharts';
import { BarChart3, FileSearch, Brain, Calculator, ClipboardCheck } from 'lucide-react';
import Link from 'next/link';

const COLOR = '#37474f';

const readinessRadar = [
  { dim: 'Teknologi', aktual: 72, target: 85 },
  { dim: 'Infrastruktur', aktual: 73, target: 85 },
  { dim: 'SDM', aktual: 75, target: 80 },
  { dim: 'Tata Kelola', aktual: 78, target: 80 },
  { dim: 'Budaya', aktual: 80, target: 75 },
];

const maturityData = [
  { dim: 'Smart Admin', level: 3.2 },
  { dim: 'Smart Sehat', level: 2.8 },
  { dim: 'Smart Belajar', level: 3.5 },
  { dim: 'Smart Adat', level: 4.0 },
  { dim: 'Smart PMD', level: 3.1 },
  { dim: 'Smart Warga', level: 2.9 },
];

const uatData = [
  { aspek: 'Kemudahan', sus: 82 },
  { aspek: 'Efisiensi', sus: 78 },
  { aspek: 'Kejelasan', sus: 80 },
  { aspek: 'Pembelajaran', sus: 75 },
  { aspek: 'Kepuasan', sus: 85 },
];

const crTrend = [
  { iter: 'Iter 1', cr: 0.15 }, { iter: 'Iter 2', cr: 0.12 },
  { iter: 'Iter 3', cr: 0.10 }, { iter: 'Iter 4', cr: 0.09 },
  { iter: 'Iter 5', cr: 0.08 },
];

export default function PenelitiDashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Peneliti" modul="Research & DSS Analytics" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Readiness Score" value="75,20" satuan="skor kesiapan" barColor="blue" progress={75}
          sparkData={[65,68,70,72,73,74,75,75.2]} trend="up" />
        <StatCard label="CR Consistency" value="0,08" satuan="CR < 0,10 ✓" barColor="green" progress={92}
          sparkData={[0.15,0.12,0.10,0.09,0.08]} trend="down" />
        <StatCard label="Maturity Level" value="3,25" satuan="dari skala 5" barColor="purple" progress={65} />
        <StatCard label="QoL Index" value="76,80" satuan="kualitas hidup" barColor="orange" progress={77} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Radar Readiness */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <FileSearch size={16} /> Radar Kesiapan 5 Dimensi (Aktual vs Target)
              </CardTitle>
              <Link href="/peneliti/gap-analysis" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={readinessRadar}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="dim" tick={{ fontSize: 10, fill: '#64748b' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 8, fill: '#94a3b8' }} />
                <Radar name="Aktual" dataKey="aktual" stroke="#37474f" fill="#37474f" fillOpacity={0.3} strokeWidth={2} />
                <Radar name="Target" dataKey="target" stroke="#E65100" fill="#E65100" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 2" />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Maturity per dimensi */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Brain size={16} /> Penilaian Maturity per Dimensi SLV
              </CardTitle>
              <Link href="/peneliti/penilaian-maturity" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={maturityData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="dim" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: number) => [`${v.toFixed(1)} / 5.0`, 'Level']} />
                <Bar dataKey="level" name="Maturity Level" fill="#37474f" radius={[0,4,4,0]}
                  label={{ position: 'right', fontSize: 9, fill: '#64748b', formatter: (v: number) => v.toFixed(1) }} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* CR Trend + UAT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Calculator size={16} /> Konvergensi Consistency Ratio (AHP)
              </CardTitle>
              <Link href="/peneliti/consistency-ratio" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={crTrend} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="iter" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0.05, 0.18]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: number) => [v.toFixed(2), 'CR']} />
                <Line type="monotone" dataKey="cr" name="Consistency Ratio" stroke="#37474f" strokeWidth={2.5} dot={{ r: 4, fill: '#37474f' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-[10px] text-center text-slate-400 mt-1">CR akhir: <strong className="text-green-600">0,08</strong> — Konsisten (CR &lt; 0,10)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <ClipboardCheck size={16} /> Hasil UAT & SUS Score per Aspek
              </CardTitle>
              <Link href="/peneliti/uat-sus" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={uatData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="aspek" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 95]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: number) => [`${v}`, 'SUS Score']} />
                <Bar dataKey="sus" name="SUS Score" fill="#37474f" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-[10px] text-center text-slate-400 mt-1">Rata-rata SUS Score: <strong className="text-slate-600">82,75</strong> — Excellent</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
