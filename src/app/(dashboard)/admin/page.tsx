'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar, Legend,
} from 'recharts';
import {
  Users, MapPin, Activity, Database, Server, HardDrive, Cpu,
  CheckCircle2, BookOpen, Heart, Landmark, TrendingUp, Globe,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const COLOR = '#1a237e';

const aktivitasTerbaru = [
  { user: 'Admin Super', aksi: 'Login ke sistem', modul: 'Auth', waktu: '2 menit lalu', status: 'success' },
  { user: 'Operator SID', aksi: 'Input data warga baru', modul: 'Data Desa', waktu: '15 menit lalu', status: 'success' },
  { user: 'Nakes Posyandu', aksi: 'Update rekam medis #045', modul: 'Smart Sehat', waktu: '32 menit lalu', status: 'success' },
  { user: 'Guru Fasilitator', aksi: 'Upload materi budaya Dayak', modul: 'Smart Belajar', waktu: '1 jam lalu', status: 'success' },
  { user: 'Pemerintah Desa', aksi: 'Approve surat keterangan', modul: 'Layanan Publik', waktu: '2 jam lalu', status: 'warning' },
  { user: 'Lembaga Adat', aksi: 'Tambah agenda musyawarah', modul: 'Smart Adat', waktu: '3 jam lalu', status: 'success' },
];

const sparkUser = [80, 90, 95, 100, 108, 112, 115, 118, 120, 122, 124, 125];
const sparkDesa = [18, 19, 20, 21, 22, 23, 23, 24, 24, 24, 24, 24];

export default function AdminDashboardPage() {
  const [trendBulanan, setTrendBulanan] = useState<any[]>([]);
  const [sdgsData, setSdgsData] = useState<any[]>([]);
  const [sistemData, setSistemData] = useState<any[]>([]);
  const [masterDataItems, setMasterDataItems] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/admin-dashboard');
      const result = await res.json();
      if (result.success) {
        setTrendBulanan(result.data.trendBulanan);
        setSdgsData(result.data.sdgsData);
        setSistemData(result.data.sistemData);
        setMasterDataItems(result.data.masterDataItems);
        setStats(result.data.stats);
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Transform master data for display
  const displayMasterData = [
    { icon: Users, label: 'Data Warga', count: stats.totalWarga || 0, color: 'bg-blue-500' },
    { icon: Activity, label: 'User Sistem', count: stats.totalUsers || 0, color: 'bg-green-500' },
    { icon: BookOpen, label: 'Kelas Aktif', count: stats.totalKelas || 0, color: 'bg-amber-500' },
    { icon: Heart, label: 'Rekam Medis', count: stats.totalRekamMedis || 0, color: 'bg-red-500' },
  ];

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Sistem — Super Admin" modul="Modul 1: Dashboard Utama" color={COLOR} />

      {/* Stat Cards Row 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total User" value={stats.totalUsers || 125} satuan="pengguna aktif" barColor="blue" progress={85} sparkData={sparkUser} trend="up" />
        <StatCard label="Data Warga" value={stats.totalWarga || 24} satuan="terdaftar" barColor="green" progress={80} sparkData={sparkDesa} trend="up" />
        <StatCard label="Smart Living Index" value="78,45" satuan="Baik" barColor="purple" progress={78} sparkData={[70,72,74,75,76,77,78,78,78,78,78,78]} trend="up" />
        <StatCard label="Total Data" value="52.430" satuan="record" barColor="orange" progress={90} sparkData={[38,41,43,45,47,49,50,51,51.5,52,52.2,52.4]} trend="up" />
      </div>

      {/* Stat Cards Row 2 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Readiness Score" value="75,20" satuan="skor kesiapan" barColor="teal" progress={75} />
        <StatCard label="Maturity Level" value="3,25" satuan="dari 5,00" barColor="yellow" progress={65} />
        <StatCard label="QoL Index" value="76,80" satuan="kualitas hidup" barColor="green" progress={77} />
        <StatCard label="SDGs Achievement" value="79%" satuan="rata-rata capaian" barColor="blue" progress={79} />
      </div>

      {/* Grafik Tren + SDGs Radial */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Activity size={16} /> Tren Pertumbuhan Sistem — 12 Bulan Terakhir
              </CardTitle>
              <Link href="/admin/dashboard-analytics" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Lihat Selengkapnya →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={trendBulanan} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradUser" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a237e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1a237e" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradDesa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2E7D32" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="user" name="Pengguna" stroke="#1a237e" strokeWidth={2} fill="url(#gradUser)" />
                <Area type="monotone" dataKey="desa" name="Desa" stroke="#2E7D32" strokeWidth={2} fill="url(#gradDesa)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                🎯 Capaian SDGs Desa
              </CardTitle>
              <Link href="/admin/sdgs-desa" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={140}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={sdgsData} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" background={{ fill: '#f1f5f9' }} cornerRadius={4} />
                <Tooltip formatter={(v: any) => `${v}%`} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {sdgsData.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.fill }} />
                    <span className="text-slate-600">{s.name.replace('\n', ' ')}</span>
                  </div>
                  <span className="font-bold" style={{ color: s.fill }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monitoring Sistem + Aktivitas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Server size={16} /> Monitoring Sistem — Resource Usage
              </CardTitle>
              <Link href="/admin/monitoring-sistem" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={160}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={sistemData} startAngle={180} endAngle={-180}>
                <RadialBar dataKey="value" background={{ fill: '#f8fafc' }} cornerRadius={4} label={{ position: 'insideStart', fill: '#fff', fontSize: 9, fontWeight: 'bold' }} />
                <Legend iconSize={8} formatter={(v) => <span style={{ fontSize: 10, color: '#64748b' }}>{v}</span>} />
                <Tooltip formatter={(v: any) => `${v}%`} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                📋 Aktivitas Terbaru
              </CardTitle>
              <Link href="/admin/audit-log" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Lihat Semua →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {aktivitasTerbaru.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${a.status === 'success' ? 'bg-green-500' : a.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700">{a.user}</p>
                    <p className="text-[10px] text-slate-500 truncate">{a.aksi} · {a.modul}</p>
                  </div>
                  <span className="text-[10px] text-slate-400">{a.waktu}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Master Data Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Database size={16} /> Ringkap Master Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayMasterData.map((item, i) => (
              <div key={i} className="p-3 rounded-lg border flex items-center gap-3" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${item.color}`}>
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">{item.label}</p>
                  <p className="text-lg font-bold text-slate-800">{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}