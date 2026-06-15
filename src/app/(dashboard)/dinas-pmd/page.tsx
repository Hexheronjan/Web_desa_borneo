'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend,
  LineChart, Line,
} from 'recharts';
import { MapPin, TrendingUp, BarChart3, Award, Globe, Compass } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const COLOR = '#0d47a1';

export default function DinasPMDPage() {
  const [mapDesaData, setMapDesaData] = useState<any[]>([]);
  const [benchmarkData, setBenchmarkData] = useState<any[]>([]);
  const [trendRegional, setTrendRegional] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/dinas-pmd-dashboard');
      const result = await res.json();
      if (result.success) {
        setMapDesaData(result.data.mapDesaData);
        setBenchmarkData(result.data.benchmarkData);
        setTrendRegional(result.data.trendRegional);
        setStats(result.data.stats);
      }
    } catch (error) {
      console.error('Error loading dinas pmd data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Dinas PMD" modul="Monitoring Multi-Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Desa" value={stats.totalDesa || 24} satuan="terdaftar" barColor="blue" progress={75} />
        <StatCard label="Monitoring Aktif" value={stats.totalMonitoring || 18} satuan="desa dipantau" barColor="green" progress={65} />
        <StatCard label="SLI Regional" value="74,80" satuan="rata-rata" barColor="purple" progress={75} />
        <StatCard label="Desa Mandiri" value="6" satuan="status tercapai" barColor="orange" progress={25} />
      </div>

      {/* Monitoring Multi-Desa */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <MapPin size={16} /> Monitoring Multi-Desa SLI
              </CardTitle>
              <Link href="/dinas-pmd/monitoring-multi-desa" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={mapDesaData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="nama" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="index" name="SLI" fill="#0d47a1" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Benchmarking */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Award size={16} /> Benchmarking Peringkat Desa
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {benchmarkData.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">{d.rank}</div>
                    <div>
                      <p className="text-xs font-semibold text-slate-700">{d.desa}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold" style={{ color: d.trend === 'up' ? '#16a34a' : '#dc2626' }}>{d.sli}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}