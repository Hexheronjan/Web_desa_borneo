'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';
import {
  MapPin, TrendingUp, Target, Heart, BookOpen, Landmark,
  CheckCircle2, AlertTriangle, ArrowUpRight, Users,
  FileText, Activity, Calendar, DollarSign, Shield, Clock,
  Database, Server, Settings, Bell, Zap, Globe, BarChart3,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const COLOR = '#1a237e';

interface DashboardData {
  totalDesa?: number;
  totalWarga?: number;
  avgReadiness?: number;
  avgMaturity?: number;
  avgQoL?: number;
  slvIndex?: number;
  sdg3Index?: number;
  sdg4Index?: number;
  sdg18Index?: number;
  periode?: string;
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch('/api/dashboard-nasional');
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  // Use API data if available, otherwise use mock data
  const keyMetrics = dashboardData ? {
    totalDesa: dashboardData.totalDesa || 247,
    readinessIndex: dashboardData.avgReadiness || 73.45,
    maturityIndex: dashboardData.avgMaturity || 2.85,
    qualityOfLifeIndex: dashboardData.avgQoL || 71.20,
    slvIndex: dashboardData.slvIndex || 72.61,
    sdgsAchievement: dashboardData.sdg3Index || 78.6,
  } : {
    totalDesa: 247,
    readinessIndex: 73.45,
    maturityIndex: 2.85,
    qualityOfLifeIndex: 71.20,
    slvIndex: 72.61,
    sdgsAchievement: 78.6,
  };

  // Mock data for ringkasan assessment
  const ringkasanAssessment = {
    jumlahDesa: 247,
    jumlahAssessment: 247,
    jumlahValidator: 36,
    jumlahRekomendasiDSS: 1124,
    jumlahSiklusAssessment: 3,
    jumlahArtefak: 6,
  };

  // Mock data for status rekomendasi DSS
  const statusRekomendasiDSS = {
    priorityProgram: 245,
    recommendationExecuted: 512,
    recommendationPending: 612,
  };

  // Mock data for pengumuman sistem
  const pengumumanSistem = [
    { judul: 'Maintenance Sistem', tanggal: '26/06/2026', kategori: 'Info', deskripsi: 'Sistem akan maintenance pada 30 Juni 2026 pukul 00:00 - 02:00 WIB.' },
    { judul: 'Rilis Fitur Baru', tanggal: '24/06/2026', kategori: 'Update', deskripsi: 'Four Dashboard SDGs Desa telah tersedia.' },
    { judul: 'Update Data Nasional', tanggal: '23/06/2026', kategori: 'Info', deskripsi: 'Pembaharuan data indikator nasional per Juni 2026.' },
  ];

  // Mock data for aktivitas terbaru
  const aktivitasTerbaru = [
    { user: 'Admin', aksi: 'Data desa Jonggon Jaya diperbarui', waktu: '08:45', status: 'success' },
    { user: 'Admin', aksi: 'Assessment periode Juni 2026 dibuat', waktu: '07:30', status: 'success' },
    { user: 'Admin', aksi: 'Validator baru ditambahkan', waktu: 'Kemarin', status: 'success' },
    { user: 'System', aksi: 'Rekomendasi DSS dijalankan', waktu: 'Sistem', status: 'success' },
    { user: 'System', aksi: 'Backup sistem berhasil', waktu: '2 hari lalu', status: 'success' },
  ];

  // Mock data for statistik assessment
  const statistikData = [
    { name: 'Jumlah Desa', value: 247 },
    { name: 'Jumlah Assessment', value: 247 },
    { name: 'Jumlah Validator', value: 36 },
    { name: 'Jumlah Rekomendasi DSS', value: 1124 },
    { name: 'Jumlah Siklus Assessment', value: 3 },
  ];

  // Mock data for modul utama sistem
  const modulSistem = [
    { icon: Database, title: 'Master Framework', description: 'Kelola framework assessment', link: '/admin/master-framework' },
    { icon: Activity, title: 'Framework Versioning', description: 'Versi dan rilis framework', link: '/admin/framework-versioning' },
    { icon: Calendar, title: 'Manajemen Periode', description: 'Kelola periode assessment', link: '/admin/manajemen-periode' },
    { icon: CheckCircle2, title: 'Validasi Data', description: 'Validasi data assessment', link: '/admin/validasi-data' },
    { icon: Globe, title: 'Integrasi Data Desa', description: 'Integrasi data multi-desa', link: '/admin/integrasi-data-desa' },
    { icon: Landmark, title: 'Governance Management', description: 'Manajemen tata kelola', link: '/admin/governance-management' },
    { icon: BookOpen, title: 'DSS Knowledge Base', description: 'Basis pengetahuan DSS', link: '/admin/dss-knowledge-base' },
    { icon: FileText, title: 'DSS Recommendation', description: 'Rekomendasi program', link: '/admin/dss-recommendation' },
  ];

  // Mock data for research insight trend
  const researchTrendData = [
    { bulan: 'Jan', readiness: 70.24, maturity: 2.53, qol: 69.02, sdgs: 74.48 },
    { bulan: 'Feb', readiness: 70.89, maturity: 2.58, qol: 69.67, sdgs: 75.13 },
    { bulan: 'Mar', readiness: 71.54, maturity: 2.63, qol: 70.32, sdgs: 75.78 },
    { bulan: 'Apr', readiness: 72.19, maturity: 2.68, qol: 70.97, sdgs: 76.43 },
    { bulan: 'Mei', readiness: 72.84, maturity: 2.73, qol: 71.62, sdgs: 77.08 },
    { bulan: 'Jun', readiness: 73.45, maturity: 2.85, qol: 71.20, sdgs: 78.60 },
  ];

  // Sparkline data for each metric
  const sparklineData = {
    readiness: [70.24, 70.89, 71.54, 72.19, 72.84, 73.45],
    maturity: [2.53, 2.58, 2.63, 2.68, 2.73, 2.85],
    qol: [69.02, 69.67, 70.32, 70.97, 71.62, 71.20],
    slv: [69.13, 69.78, 70.43, 71.08, 71.73, 72.61],
    sdgs: [74.48, 75.13, 75.78, 76.43, 77.08, 78.60],
  };

  // Sebaran level maturity desa
  const maturityLevelData = [
    { level: 'Level 1', jumlah: 45, persentase: 18.2 },
    { level: 'Level 2', jumlah: 78, persentase: 31.6 },
    { level: 'Level 3', jumlah: 89, persentase: 36.0 },
    { level: 'Level 4', jumlah: 28, persentase: 11.3 },
    { level: 'Level 5', jumlah: 7, persentase: 2.8 },
  ];

  // Status sistem desa
  const statusSistemDesa = [
    { status: 'Online', jumlah: 235, persentase: 95.1, color: 'green' },
    { status: 'Offline', jumlah: 8, persentase: 3.2, color: 'red' },
    { status: 'Maintenance', jumlah: 4, persentase: 1.6, color: 'yellow' },
  ];

  // Top 5 desa (Quick Access)
  const topDesa = [
    { nama: 'Desa Jonggon Jaya', kecamatan: 'Tenggarong Seberang', readiness: 85.2, maturity: 4.2, rank: 1 },
    { nama: 'Desa Loa Janan Ilir', kecamatan: 'Loa Janan', readiness: 82.7, maturity: 4.0, rank: 2 },
    { nama: 'Desa Muara Muntai', kecamatan: 'Muara Muntai', readiness: 80.5, maturity: 3.8, rank: 3 },
    { nama: 'Desa Tenggarong', kecamatan: 'Tenggarong', readiness: 78.9, maturity: 3.6, rank: 4 },
    { nama: 'Desa Kutai Kartanegara', kecamatan: 'Kota Bangun', readiness: 76.3, maturity: 3.5, rank: 5 },
  ];

  // Mock data for keterkaitan artefak penelitian
  const artefakFlow = [
    { step: '1', label: 'Pedoman Wawancara', icon: FileText },
    { step: '2', label: 'Hasil FGD', icon: Users },
    { step: '3', label: 'Kuesioner Readiness', icon: CheckCircle2 },
    { step: '4', label: 'Validasi Ahli', icon: Shield },
    { step: '5', label: 'Observasi Desa', icon: MapPin },
    { step: '6', label: 'APL-SLV Borneo', icon: Globe },
  ];

  // Mock data for prinsip pengembangan
  const prinsipPengembangan = [
    { icon: Database, title: 'Berbasis Data & Bukti', description: 'Keputusan berdasarkan data' },
    { icon: Users, title: 'Partisipatif & Kolaboratif', description: 'Melibatkan semua stakeholder' },
    { icon: Shield, title: 'Transparan & Akuntabel', description: 'Keterbukaan dalam pengelolaan' },
    { icon: TrendingUp, title: 'Berkelanjutan & Adaptif', description: 'Terus berkembang dan beradaptasi' },
    { icon: Heart, title: 'Berorientasi pada Kesejahteraan Desa', description: 'Fokus pada kesejahteraan' },
  ];

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Super Admin</h1>
          <p className="text-sm text-slate-500 mt-1">Modul: APL-SLV BORNEO Smart Living Village</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200">
            <Calendar size={16} className="text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Periode: Juni 2026</span>
          </div>
        </div>
      </div>

      {/* Key Metrics - 6 Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="p-4 border-l-4 border-l-blue-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Total Desa Terintegrasi</p>
            <MapPin size={16} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.totalDesa}</p>
          <p className="text-xs text-slate-500 mt-1">12 desa baru dari bulan lalu</p>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Readiness Index</p>
            <Target size={16} className="text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.readinessIndex}</p>
          <p className="text-xs text-slate-500 mt-1">Rata-rata Nasional</p>
          <div className="flex items-center gap-2 mt-2">
            <ResponsiveContainer width={80} height={30}>
              <LineChart data={sparklineData.readiness.map((v, i) => ({ value: v }))}>
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <ArrowUpRight size={10} /> ↑ 3.21 poin
            </p>
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-green-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Maturity Index</p>
            <TrendingUp size={16} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.maturityIndex}</p>
          <p className="text-xs text-slate-500 mt-1">Rata-rata Nasional</p>
          <div className="flex items-center gap-2 mt-2">
            <ResponsiveContainer width={80} height={30}>
              <LineChart data={sparklineData.maturity.map((v, i) => ({ value: v }))}>
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <ArrowUpRight size={10} /> ↑ 0.32 level
            </p>
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-orange-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Quality of Life Index</p>
            <Heart size={16} className="text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.qualityOfLifeIndex}</p>
          <p className="text-xs text-slate-500 mt-1">Rata-rata Nasional</p>
          <div className="flex items-center gap-2 mt-2">
            <ResponsiveContainer width={80} height={30}>
              <LineChart data={sparklineData.qol.map((v, i) => ({ value: v }))}>
                <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <ArrowUpRight size={10} /> ↑ 2.18 poin
            </p>
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-blue-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Smart Living Village Index</p>
            <Globe size={16} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.slvIndex}</p>
          <p className="text-xs text-slate-500 mt-1">Composite Index</p>
          <div className="flex items-center gap-2 mt-2">
            <ResponsiveContainer width={80} height={30}>
              <LineChart data={sparklineData.slv.map((v, i) => ({ value: v }))}>
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <ArrowUpRight size={10} /> ↑ 3.47 poin
            </p>
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-green-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">SDGs Achievement</p>
            <Landmark size={16} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.sdgsAchievement}%</p>
          <p className="text-xs text-slate-500 mt-1">Rata-rata Nasional</p>
          <div className="flex items-center gap-2 mt-2">
            <ResponsiveContainer width={80} height={30}>
              <LineChart data={sparklineData.sdgs.map((v, i) => ({ value: v }))}>
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <ArrowUpRight size={10} /> ↑ 4.12%
            </p>
          </div>
        </Card>
      </div>

      {/* Sebaran Level Maturity Desa & Status Sistem Desa */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Sebaran Level Maturity Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {maturityLevelData.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-24 text-xs font-semibold text-slate-700">{item.level}</div>
                  <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full flex items-center justify-end pr-2"
                      style={{ 
                        width: `${item.persentase}%`,
                        backgroundColor: index === 4 ? '#10b981' : index === 3 ? '#3b82f6' : index === 2 ? '#8b5cf6' : index === 1 ? '#f97316' : '#ef4444'
                      }}
                    >
                      <span className="text-[10px] font-bold text-white">{item.persentase}%</span>
                    </div>
                  </div>
                  <div className="w-16 text-xs text-slate-600 text-right">{item.jumlah} desa</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Server size={16} /> Status Sistem Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusSistemDesa.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.color === 'green' ? 'bg-green-500' : 
                      item.color === 'red' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.status}</p>
                      <p className="text-xs text-slate-500">{item.jumlah} desa</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-800">{item.persentase}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access - Top 5 Desa */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <MapPin size={16} /> Quick Access - Top 5 Desa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {topDesa.map((desa, index) => (
              <Link key={index} href={`/admin/master-desa`} className="block">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-slate-400' : 
                      index === 2 ? 'bg-orange-600' : 'bg-slate-300'
                    }`}>
                      {desa.rank}
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-green-600">↑ {desa.readiness}</p>
                    </div>
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 mb-1 line-clamp-2">{desa.nama}</h3>
                  <p className="text-[10px] text-slate-500 mb-2">{desa.kecamatan}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-600">Level {desa.maturity}</span>
                    <TrendingUp size={12} className="text-green-600" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ringkasan Assessment & Penelitian */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Activity size={16} /> Ringkasan Assessment & Penelitian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Jumlah Desa</p>
              <p className="text-2xl font-bold text-slate-800">{ringkasanAssessment.jumlahDesa}</p>
              <p className="text-[10px] text-slate-500 mt-1">Total Terdaftar</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Jumlah Assessment</p>
              <p className="text-2xl font-bold text-slate-800">{ringkasanAssessment.jumlahAssessment}</p>
              <p className="text-[10px] text-slate-500 mt-1">Periode Aktif</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Validator</p>
              <p className="text-2xl font-bold text-slate-800">{ringkasanAssessment.jumlahValidator}</p>
              <p className="text-[10px] text-slate-500 mt-1">Ahli & Pakar</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Rekomendasi DSS</p>
              <p className="text-2xl font-bold text-slate-800">{ringkasanAssessment.jumlahRekomendasiDSS}</p>
              <p className="text-[10px] text-slate-500 mt-1">Total Rekomendasi</p>
            </div>
            <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Siklus Assessment</p>
              <p className="text-2xl font-bold text-slate-800">{ringkasanAssessment.jumlahSiklusAssessment}</p>
              <p className="text-[10px] text-slate-500 mt-1">Siklus Aktif</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Jumlah Artefak</p>
              <p className="text-2xl font-bold text-slate-800">{ringkasanAssessment.jumlahArtefak}</p>
              <p className="text-[10px] text-slate-500 mt-1">Artefak Penelitian</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Rekomendasi DSS */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <BookOpen size={16} /> Status Rekomendasi DSS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Priority Program</p>
              <p className="text-2xl font-bold text-slate-800">{statusRekomendasiDSS.priorityProgram}</p>
              <p className="text-[10px] text-slate-500 mt-1">Program Prioritas</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Recommendation Executed</p>
              <p className="text-2xl font-bold text-slate-800">{statusRekomendasiDSS.recommendationExecuted}</p>
              <p className="text-[10px] text-slate-500 mt-1">Telah Dieksekusi (45.4%)</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Recommendation Pending</p>
              <p className="text-2xl font-bold text-slate-800">{statusRekomendasiDSS.recommendationPending}</p>
              <p className="text-[10px] text-slate-500 mt-1">Menunggu Eksekusi (54.4%)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modul Utama Sistem - 8 Modules */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Database size={16} /> Modul Utama Sistem
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {modulSistem.slice(0, 8).map((modul, index) => (
              <Link key={index} href={modul.link} className="block">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border border-slate-200">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <modul.icon size={24} className="text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-slate-800 mb-1">{modul.title}</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pengumuman Sistem */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Bell size={16} /> Pengumuman Sistem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pengumumanSistem.map((pengumuman, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Bell size={14} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">{pengumuman.judul}</p>
                    <p className="text-xs text-slate-600 mt-1">{pengumuman.deskripsi}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{pengumuman.tanggal}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Aktivitas Terbaru */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Clock size={16} /> Aktivitas Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aktivitasTerbaru.map((aktivitas, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle2 size={14} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">{aktivitas.aksi}</p>
                    <p className="text-xs text-slate-500">{aktivitas.user}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{aktivitas.waktu}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Research Insight - Trend Utama */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <BarChart3 size={16} /> Research Insight (Trend Utama)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={researchTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="readiness" fill="#8b5cf6" name="Readiness Index" radius={[3, 3, 0, 0]} />
              <Bar dataKey="maturity" fill="#10b981" name="Maturity Index" radius={[3, 3, 0, 0]} />
              <Bar dataKey="qol" fill="#f97316" name="Quality of Life" radius={[3, 3, 0, 0]} />
              <Bar dataKey="sdgs" fill="#3b82f6" name="SDGs Achievement" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tren Indeks Nasional - 6 Bulan Terakhir */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <TrendingUp size={16} /> Tren Indeks Nasional (6 Bulan Terakhir)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={researchTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="readiness" fill="#8b5cf6" name="Readiness" radius={[3, 3, 0, 0]} />
              <Bar dataKey="maturity" fill="#10b981" name="Maturity" radius={[3, 3, 0, 0]} />
              <Bar dataKey="qol" fill="#f97316" name="QoL" radius={[3, 3, 0, 0]} />
              <Bar dataKey="sdgs" fill="#3b82f6" name="SDGs" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}