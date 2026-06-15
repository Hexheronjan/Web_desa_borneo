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
import { useState, useEffect } from 'react';

const COLOR = '#283593';

export default function PemdesPage() {
  const [apbdesData, setApbdesData] = useState<any[]>([]);
  const [radarData, setRadarData] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/pemdes-dashboard');
      const result = await res.json();
      if (result.success) {
        setApbdesData(result.data.apbdesData);
        setRadarData(result.data.radarData);
        setStats(result.data.stats);
      }
    } catch (error) {
      console.error('Error loading pemdes data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Pemerintah Desa" modul="Executive Dashboard" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Warga" value={stats.totalWarga || 125} satuan="penduduk" barColor="blue" progress={75} />
        <StatCard label="User Sistem" value={stats.totalUsers || 24} satuan="pengguna aktif" barColor="green" progress={80} />
        <StatCard label="APBD Realisasi" value="85%" satuan="dari target" barColor="purple" progress={85} />
        <StatCard label="SLI Index" value="76,80" satuan="smart living" barColor="orange" progress={77} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* APBDES Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <LayoutDashboard size={16} /> Realisasi APBDES
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
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`Rp ${v}jt`, '']} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="anggaran" name="Anggaran" fill="#9FA8DA" radius={[3, 3, 0, 0]} />
                <Bar dataKey="realisasi" name="Realisasi" fill="#283593" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radar Kelembagaan */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <BarChart3 size={16} /> Kinerja Pemerintahan
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <PolarGrid stroke="#e0e7ff" />
                <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 10, fill: '#64748b' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 8, fill: '#94a3b8' }} />
                <Radar name="Nilai" dataKey="nilai" stroke="#283593" fill="#283593" fillOpacity={0.3} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}