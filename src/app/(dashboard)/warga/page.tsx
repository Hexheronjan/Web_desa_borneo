'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell,
} from 'recharts';
import { Home, FileText, MessageSquare, Star, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const COLOR = '#e65100';

export default function WargaPage() {
  const [qolData, setQolData] = useState<any[]>([]);
  const [statusSurat, setStatusSurat] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/citizen-dashboard');
      const result = await res.json();
      if (result.success) {
        setQolData(result.data.qolData);
        setStatusSurat(result.data.statusSurat);
        setStats(result.data.stats);
      }
    } catch (error) {
      console.error('Error loading citizen data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Portal Warga Desa" modul="Akses Layanan Mandiri Warga" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Warga" value={stats.totalWarga || 125} satuan="terdaftar" barColor="orange" progress={80}
          sparkData={[3.5,3.6,3.7,3.8,3.9,4.0,4.02]} trend="up" />
        <StatCard label="Surat Online" value={stats.totalAspirasi || 45} satuan="permohonan" barColor="blue" progress={65} />
        <StatCard label="Pengaduan" value={12} satuan="laporan aktif" barColor="red" progress={40} />
        <StatCard label="Survey QoL" value="4,02" satuan="rata-rata skor" barColor="green" progress={80} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* QoL per dimensi */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Star size={16} /> Skor Quality of Life per Dimensi (Survey Warga)
              </CardTitle>
              <Link href="/warga/survey-qol" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={qolData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fff7ed" horizontal={false} />
                <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} width={75} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${(v as number).toFixed(2)} / 5.00`, 'Skor']} />
                <Bar dataKey="nilai" name="Skor" radius={[0,4,4,0]}
                  label={{ position: 'right', fontSize: 9, fill: '#64748b', formatter: (v: any) => v.toFixed(2) }}>
                  {qolData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Surat */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <FileText size={16} /> Status Layanan Surat
              </CardTitle>
              <Link href="/warga/surat-online" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={statusSurat} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={65}
                  label={({ name, value }) => `${value}%`} labelLine={false}>
                  {statusSurat.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v: any) => `${v}%`} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full space-y-1.5 mt-2">
              {statusSurat.map((s, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-slate-600">{s.name}</span>
                  </div>
                  <span className="font-bold" style={{ color: s.color }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Layanan Cepat */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Home size={16} /> Layanan Mandiri Warga
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: FileText, label: 'Surat Online', sub: '45 permohonan', color: '#1565C0', bg: '#e3f2fd', path: '/warga/surat-online' },
              { icon: MessageSquare, label: 'Pengaduan', sub: '12 laporan', color: '#b71c1c', bg: '#ffebee', path: '/warga/pengaduan' },
              { icon: ClipboardList, label: 'Aspirasi', sub: '28 usulan', color: '#2E7D32', bg: '#e8f5e9', path: '/warga/aspirasi' },
              { icon: Star, label: 'Survey QoL', sub: 'Skor: 4,02', color: '#e65100', bg: '#fff3e0', path: '/warga/survey-qol' },
            ].map((item, i) => (
              <Link key={i} href={item.path} className="p-4 rounded-xl cursor-pointer hover:shadow-md transition-shadow flex flex-col items-center text-center gap-2" style={{ backgroundColor: item.bg }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: item.color }}>
                  <item.icon size={22} className="text-white" />
                </div>
                <p className="text-sm font-bold" style={{ color: item.color }}>{item.label}</p>
                <p className="text-[11px] text-slate-500">{item.sub}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
