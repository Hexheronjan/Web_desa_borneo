'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
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

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Mock data for key metrics
  const keyMetrics = {
    totalDesa: 247,
    readinessIndex: 73.45,
    maturityIndex: 2.85,
    qualityOfLifeIndex: 71.20,
  };

  // Mock data for ringkasan assessment
  const ringkasanAssessment = {
    jumlahDesa: 247,
    jumlahAssessment: 247,
    jumlahValidator: 36,
    jumlahRekomendasiDSS: 1124,
    jumlahSiklusAssessment: 3,
  };

  // Mock data for aktivitas terbaru
  const aktivitasTerbaru = [
    { user: 'Super Admin', aksi: 'Login ke sistem', waktu: '2 menit lalu', status: 'success' },
    { user: 'System', aksi: 'Data SID berhasil disinkronkan', waktu: '15 menit lalu', status: 'success' },
    { user: 'Super Admin', aksi: 'Periode 2025 dibuka untuk assessment', waktu: '1 jam lalu', status: 'success' },
    { user: 'Super Admin', aksi: 'User baru ditambahkan: Operator SID', waktu: '2 jam lalu', status: 'success' },
    { user: 'System', aksi: 'Backup sistem berhasil dibuat', waktu: '3 jam lalu', status: 'success' },
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
    { icon: Users, title: 'Manajemen User & Role', description: 'Kelola pengguna dan role', link: '/admin/user-management' },
    { icon: CheckCircle2, title: 'Validasi Data', description: 'Validasi data assessment', link: '/admin/validasi-data' },
    { icon: Globe, title: 'Integrasi Data Desa', description: 'Integrasi data multi-desa', link: '/admin/integrasi-data-desa' },
    { icon: FileText, title: 'Audit Log', description: 'Log aktivitas sistem', link: '/admin/audit-log' },
    { icon: Landmark, title: 'Governance Management', description: 'Manajemen tata kelola', link: '/admin/governance-management' },
    { icon: BookOpen, title: 'DSS Knowledge Base', description: 'Basis pengetahuan DSS', link: '/admin/dss-knowledge-base' },
    { icon: TrendingUp, title: 'Readiness, Maturity & QoL Analytics', description: 'Analisis indeks desa', link: '/admin/analytics' },
    { icon: FileText, title: 'Evaluasi Artefak', description: 'Evaluasi artefak penelitian', link: '/admin/evaluasi-artefak' },
    { icon: Shield, title: 'Expert Validation', description: 'Validasi ahli', link: '/admin/expert-validation' },
    { icon: CheckCircle2, title: 'UAT Results (SUS & Feedback)', description: 'Hasil UAT dan feedback', link: '/admin/uat-results' },
    { icon: BookOpen, title: 'Research Repository', description: 'Repositori penelitian', link: '/admin/research-repository' },
    { icon: Settings, title: 'Konfigurasi Sistem', description: 'Pengaturan sistem', link: '/admin/konfigurasi-sistem' },
    { icon: Server, title: 'Backup & Restore', description: 'Backup dan restore data', link: '/admin/backup-restore' },
    { icon: Bell, title: 'Pengaturan Notifikasi', description: 'Kelola notifikasi', link: '/admin/pengaturan-notifikasi' },
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
      <PageTitle fitur="Dashboard Super Admin" modul="APL-SLV BORNEO Smart Living Village" color={COLOR} />

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-blue-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Total Desa</p>
            <MapPin size={16} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.totalDesa}</p>
          <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
            <ArrowUpRight size={12} /> +12 desa baru
          </p>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Readiness Index</p>
            <Target size={16} className="text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.readinessIndex}</p>
          <p className="text-xs text-purple-600 font-medium mt-1">Rata-rata nasional</p>
        </Card>

        <Card className="p-4 border-l-4 border-l-green-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Maturity Index</p>
            <TrendingUp size={16} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.maturityIndex}</p>
          <p className="text-xs text-green-600 font-medium mt-1">Level 3 dari 5</p>
        </Card>

        <Card className="p-4 border-l-4 border-l-orange-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Quality of Life Index</p>
            <Heart size={16} className="text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.qualityOfLifeIndex}</p>
          <p className="text-xs text-orange-600 font-medium mt-1">Kategori Baik</p>
        </Card>
      </div>

      {/* Ringkasan Assessment & Penelitian */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Activity size={16} /> Ringkasan Assessment & Penelitian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Jumlah Desa</p>
              <p className="text-2xl font-bold text-slate-800">{ringkasanAssessment.jumlahDesa}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Jumlah Assessment</p>
              <p className="text-2xl font-bold text-slate-800">{ringkasanAssessment.jumlahAssessment}</p>
              <p className="text-[10px] text-slate-500 mt-1">Periode Aktif</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Jumlah Validator</p>
              <p className="text-2xl font-bold text-slate-800">{ringkasanAssessment.jumlahValidator}</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Jumlah Rekomendasi DSS</p>
              <p className="text-2xl font-bold text-slate-800">{ringkasanAssessment.jumlahRekomendasiDSS}</p>
            </div>
            <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Jumlah Siklus Assessment</p>
              <p className="text-2xl font-bold text-slate-800">{ringkasanAssessment.jumlahSiklusAssessment}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modul Utama Sistem */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Database size={16} /> Modul Utama Sistem
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modulSistem.map((modul, index) => (
              <Link key={index} href={modul.link} className="block">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <modul.icon size={18} className="text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-slate-800 mb-1">{modul.title}</h3>
                      <p className="text-xs text-slate-500">{modul.description}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <span className="text-xs text-indigo-600 font-medium">Kelola →</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle2 size={14} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">{aktivitas.user}</p>
                    <p className="text-xs text-slate-600">{aktivitas.aksi}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{aktivitas.waktu}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistik Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart3 size={16} /> Statistik Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statistikData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Bar dataKey="value" fill="#1a237e" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Peran Super Admin */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Shield size={16} /> Peran Super Admin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-700 leading-relaxed">
              Super Admin memiliki otoritas penuh untuk mengelola seluruh sistem APL-SLV Borneo, termasuk manajemen pengguna, konfigurasi framework, monitoring sistem, dan pengawasan seluruh proses assessment desa. Super Admin bertanggung jawab atas keamanan, integritas data, dan kelancaran operasional sistem secara keseluruhan.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Keterkaitan Artefak Penelitian */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <BookOpen size={16} /> Keterkaitan Artefak Penelitian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-2 overflow-x-auto py-4">
            {artefakFlow.map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className="flex flex-col items-center min-w-[120px]">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                    <item.icon size={20} className="text-indigo-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 text-center">{item.label}</span>
                </div>
                {index < artefakFlow.length - 1 && (
                  <div className="w-8 h-0.5 bg-slate-300 mx-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prinsip Pengembangan APL-SLV Borneo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Zap size={16} /> Prinsip Pengembangan APL-SLV Borneo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {prinsipPengembangan.map((prinsip, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center mx-auto mb-3">
                  <prinsip.icon size={20} className="text-white" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">{prinsip.title}</h3>
                <p className="text-xs text-slate-600">{prinsip.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}