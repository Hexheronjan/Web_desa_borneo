'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';
import {
  TrendingUp, AlertTriangle, CheckCircle2, Clock, DollarSign,
  FileText, Activity, Shield, Target, Users, MessageSquare,
  ArrowUpRight, ArrowDownRight, Bell, Zap, Heart, Calendar,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const COLOR = '#283593';

export default function PemdesPage() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Mock data for key metrics
  const keyMetrics = {
    readinessIndex: 74.20,
    maturityIndex: 2.95,
    maturityLabel: 'Berkembang',
    qualityOfLifeIndex: 72.35,
    qualityOfLifeLabel: 'Baik',
    progressRTL: 67.80,
    totalProgram: 9,
    programTerlambat: 2,
    programSelesai: 15,
  };

  // Mock data for notifications
  const notifications = [
    { id: 1, type: 'warning', title: 'Program "Internet Desa" tertunda', message: 'Realisasi hanya 45% dari target', time: '2 jam lalu' },
    { id: 2, type: 'info', title: 'Dokumentasi program lengkap', message: '5 program telah terverifikasi', time: '5 jam lalu' },
    { id: 3, type: 'alert', title: 'Verifikasi evidence pending', message: '3 program butuh verifikasi', time: '1 hari lalu' },
    { id: 4, type: 'success', title: 'DSS Recommendation selesai', message: '12 rekomendasi telah ditindaklanjuti', time: '2 hari lalu' },
  ];

  // Mock data for DSS monitoring
  const dssMonitoring = [
    { id: 1, rekomendasi: 'Peningkatan infrastruktur digital', status: 'Selesai', progress: 100 },
    { id: 2, rekomendasi: 'Pelatihan SDM digital', status: 'Berjalan', progress: 75 },
    { id: 3, rekomendasi: 'Integrasi sistem layanan', status: 'Berjalan', progress: 60 },
    { id: 4, rekomendasi: 'Penguatan governance', status: 'Pending', progress: 0 },
  ];

  // Mock data for program monitoring
  const programDesa = [
    { id: 1, nama: 'Internet Desa', anggaran: 150000000, realisasi: 67500000, progress: 45, status: 'Terlambat' },
    { id: 2, nama: 'Digitalisasi Layanan Desa', anggaran: 200000000, realisasi: 160000000, progress: 80, status: 'Berjalan' },
    { id: 3, nama: 'Pelatihan Digital Perangkat Desa', anggaran: 50000000, realisasi: 50000000, progress: 100, status: 'Selesai' },
    { id: 4, nama: 'Posyandu Digital', anggaran: 75000000, realisasi: 56250000, progress: 75, status: 'Berjalan' },
    { id: 5, nama: 'Bank Sampah Digital', anggaran: 30000000, realisasi: 18000000, progress: 60, status: 'Berjalan' },
  ];

  // Mock data for program impact
  const programImpact = [
    { program: 'Internet Desa', readiness: 5.2, maturity: 0.8, qol: 3.5 },
    { program: 'Digitalisasi Layanan', readiness: 8.5, maturity: 1.2, qol: 6.8 },
    { program: 'Pelatihan Digital', readiness: 4.3, maturity: 0.9, qol: 2.1 },
    { program: 'Posyandu Digital', readiness: 6.7, maturity: 1.1, qol: 5.4 },
    { program: 'Bank Sampah Digital', readiness: 3.8, maturity: 0.6, qol: 2.9 },
  ];

  // Mock data for evidence monitoring
  const evidenceProgram = [
    { id: 1, program: 'Internet Desa', evidence: 'Foto instalasi', status: 'Terverifikasi', verifiedBy: 'Admin' },
    { id: 2, program: 'Digitalisasi Layanan', evidence: 'Screenshot aplikasi', status: 'Terverifikasi', verifiedBy: 'Admin' },
    { id: 3, program: 'Pelatihan Digital', evidence: 'Dokumentasi pelatihan', status: 'Pending', verifiedBy: '-' },
    { id: 4, program: 'Posyandu Digital', evidence: 'Laporan bulanan', status: 'Terverifikasi', verifiedBy: 'Admin' },
  ];

  // Mock data for aspirasi masyarakat
  const aspirasiData = [
    { name: 'Infrastruktur', value: 4, color: '#283593' },
    { name: 'Pendidikan', value: 3, color: '#5E35B1' },
    { name: 'Kesehatan', value: 2, color: '#7B1FA2' },
    { name: 'Lingkungan', value: 2, color: '#9C27B0' },
    { name: 'Budaya', value: 1, color: '#BA68C8' },
  ];

  // Mock data for budget transparency
  const budgetData = [
    { program: 'Internet Desa', anggaran: 150, realisasi: 67.5 },
    { program: 'Digitalisasi Layanan', anggaran: 200, realisasi: 160 },
    { program: 'Pelatihan Digital', anggaran: 50, realisasi: 50 },
    { program: 'Posyandu Digital', anggaran: 75, realisasi: 56.25 },
    { program: 'Bank Sampah', anggaran: 30, realisasi: 18 },
  ];

  // Mock data for Readiness Assessment (radar chart)
  const readinessData = [
    { dimension: 'SDM', value: 75 },
    { dimension: 'Tata Kelola', value: 80 },
    { dimension: 'Ekonomi', value: 65 },
    { dimension: 'Lingkungan', value: 70 },
    { dimension: 'Infrastruktur', value: 72 },
    { dimension: 'Teknologi', value: 68 },
  ];

  // Mock data for Trend Assessment (line chart)
  const trendData = [
    { period: 'Q1 2024', readiness: 68.5, maturity: 2.3, qol: 65.2 },
    { period: 'Q2 2024', readiness: 70.2, maturity: 2.5, qol: 67.8 },
    { period: 'Q3 2024', readiness: 72.1, maturity: 2.7, qol: 69.5 },
    { period: 'Q4 2024', readiness: 74.2, maturity: 2.95, qol: 72.35 },
  ];

  // Mock data for Program Prioritas DSS
  const programPrioritas = [
    { id: 1, program: 'Internet Desa', skor: 8.5, dampak: 'Tinggi', prioritas: 'P1' },
    { id: 2, program: 'Digitalisasi Layanan', skor: 7.8, dampak: 'Tinggi', prioritas: 'P2' },
    { id: 3, program: 'Pelatihan SDM', skor: 7.2, dampak: 'Sedang', prioritas: 'P3' },
    { id: 4, program: 'Posyandu Digital', skor: 6.8, dampak: 'Sedang', prioritas: 'P4' },
    { id: 5, program: 'Bank Sampah Digital', skor: 6.2, dampak: 'Rendah', prioritas: 'P5' },
  ];

  // Mock data for Progress Implementasi Program (donut chart)
  const progressImplementasi = [
    { name: 'Belum Dimulai', value: 3, color: '#ef4444' },
    { name: 'Berjalan', value: 5, color: '#3b82f6' },
    { name: 'Selesai', value: 7, color: '#22c55e' },
  ];

  // Mock data for Roadmap
  const roadmapData = {
    tahun1: [
      { program: 'Internet Desa', status: 'Berjalan', progress: 45 },
      { program: 'Digitalisasi Layanan', status: 'Berjalan', progress: 80 },
      { program: 'Pelatihan SDM', status: 'Selesai', progress: 100 },
    ],
    tahun2: [
      { program: 'Posyandu Digital', status: 'Berjalan', progress: 75 },
      { program: 'Bank Sampah Digital', status: 'Berjalan', progress: 60 },
      { program: 'Smart Agriculture', status: 'Belum', progress: 0 },
    ],
    tahun3: [
      { program: 'Smart Tourism', status: 'Belum', progress: 0 },
      { program: 'Digital Governance', status: 'Belum', progress: 0 },
      { program: 'AI Integration', status: 'Belum', progress: 0 },
    ],
  };

  // Mock data for Agenda Terdekat
  const agendaData = [
    { id: 1, judul: 'Rapat Koordinasi Program', tanggal: '20 Jun 2026', waktu: '09:00', lokasi: 'Balai Desa' },
    { id: 2, judul: 'Monitoring Internet Desa', tanggal: '22 Jun 2026', waktu: '10:00', lokasi: 'Lokasi Tower' },
    { id: 3, judul: 'Evaluasi Q2', tanggal: '25 Jun 2026', waktu: '13:00', lokasi: 'Aula Desa' },
  ];

  // Mock data for Upload Evidence Terbaru
  const evidenceTerbaru = [
    { id: 1, program: 'Internet Desa', deskripsi: 'Foto instalasi tower', tanggal: '18 Jun 2026', status: 'Terverifikasi' },
    { id: 2, program: 'Digitalisasi Layanan', deskripsi: 'Screenshot aplikasi', tanggal: '17 Jun 2026', status: 'Terverifikasi' },
    { id: 3, program: 'Pelatihan SDM', deskripsi: 'Dokumentasi pelatihan', tanggal: '15 Jun 2026', status: 'Pending' },
  ];

  // Mock data for Progress Tindak Lanjut Rekomendasi
  const progressRekomendasi = [
    { tahap: 'DSS Recommendations', total: 12, selesai: 12, progress: 100 },
    { tahap: 'Implementation', total: 9, selesai: 6, progress: 67 },
    { tahap: 'Completion', total: 9, selesai: 4, progress: 44 },
  ];

  // Mock data for Laporan Desa Terbaru
  const laporanDesa = [
    { id: 1, judul: 'Laporan Q2 2026', tanggal: '15 Jun 2026', ukuran: '2.5 MB', tipe: 'PDF' },
    { id: 2, judul: 'Laporan Readiness Assessment', tanggal: '10 Jun 2026', ukuran: '1.8 MB', tipe: 'PDF' },
    { id: 3, judul: 'Laporan Monitoring Program', tanggal: '05 Jun 2026', ukuran: '3.2 MB', tipe: 'PDF' },
  ];

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Pemerintah Desa" modul="Smart Living Village" color={COLOR} />

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-blue-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-missing required error components, refreshing...slate-500 font-semibold">Readiness Index</p>
            <TrendingUp size={16} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.readinessIndex}</p>
          <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
            <ArrowUpRight size={12} /> +2.3% dari bulan lalu
          </p>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Maturity Index</p>
            <Target size={16} className="text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.maturityIndex}</p>
          <p className="text-xs text-purple-600 font-medium mt-1">{keyMetrics.maturityLabel}</p>
        </Card>

        <Card className="p-4 border-l-4 border-l-green-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Quality of Life Index</p>
            <Heart size={16} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.qualityOfLifeIndex}</p>
          <p className="text-xs text-green-600 font-medium mt-1">{keyMetrics.qualityOfLifeLabel}</p>
        </Card>

        <Card className="p-4 border-l-4 border-l-orange-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Progress RTL</p>
            <Activity size={16} className="text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.progressRTL}%</p>
          <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2">
            <div className="h-full rounded-full bg-orange-600" style={{ width: `${keyMetrics.progressRTL}%` }} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Hasil Readiness Assessment - Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Target size={16} /> Hasil Readiness Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={readinessData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10, fill: '#64748b' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                <Radar name="Skor" dataKey="value" stroke={COLOR} fill={COLOR} fillOpacity={0.3} strokeWidth={2} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trend Assessment Desa - Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Trend Assessment Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="period" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 9 }} />
                <Line type="monotone" dataKey="readiness" stroke="#3b82f6" strokeWidth={2} name="Readiness" />
                <Line type="monotone" dataKey="maturity" stroke="#8b5cf6" strokeWidth={2} name="Maturity" />
                <Line type="monotone" dataKey="qol" stroke="#22c55e" strokeWidth={2} name="QoL" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Kategori Kesiapan Desa */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600 mb-1">Kategori Kesiapan Desa</p>
              <p className="text-3xl font-bold text-slate-800">Siap</p>
              <p className="text-xs text-slate-500 mt-1">Readiness Index: {keyMetrics.readinessIndex}</p>
            </div>
            <div className="text-right">
              <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{keyMetrics.readinessIndex}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Program Prioritas DSS */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Zap size={16} /> Program Prioritas DSS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {programPrioritas.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      item.prioritas === 'P1' ? 'bg-red-500' :
                      item.prioritas === 'P2' ? 'bg-orange-500' :
                      item.prioritas === 'P3' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}>
                      {item.prioritas}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.program}</p>
                      <p className="text-xs text-slate-500">Skor: {item.skor} | Dampak: {item.dampak}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Implementasi Program - Donut Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Activity size={16} /> Progress Implementasi Program
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={progressImplementasi}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${value}`}
                  labelLine={false}
                >
                  {progressImplementasi.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: any) => [`${v} program`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full space-y-1.5 mt-2">
              {progressImplementasi.map((item, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-700">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roadmap Smart Living Village Desa */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <FileText size={16} /> Roadmap Smart Living Village Desa Lung Anai
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-bold text-blue-800 mb-3">Tahun 1 (2025)</h4>
              <div className="space-y-2">
                {roadmapData.tahun1.map((item, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-700">{item.program}</span>
                      <span className={`font-bold ${
                        item.status === 'Selesai' ? 'text-green-600' :
                        item.status === 'Berjalan' ? 'text-blue-600' :
                        'text-slate-400'
                      }`}>{item.status}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="text-sm font-bold text-purple-800 mb-3">Tahun 2 (2026)</h4>
              <div className="space-y-2">
                {roadmapData.tahun2.map((item, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-700">{item.program}</span>
                      <span className={`font-bold ${
                        item.status === 'Selesai' ? 'text-green-600' :
                        item.status === 'Berjalan' ? 'text-blue-600' :
                        'text-slate-400'
                      }`}>{item.status}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full">
                      <div
                        className="h-full rounded-full bg-purple-600"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="text-sm font-bold text-green-800 mb-3">Tahun 3 (2027)</h4>
              <div className="space-y-2">
                {roadmapData.tahun3.map((item, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-700">{item.program}</span>
                      <span className={`font-bold ${
                        item.status === 'Selesai' ? 'text-green-600' :
                        item.status === 'Berjalan' ? 'text-blue-600' :
                        'text-slate-400'
                      }`}>{item.status}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full">
                      <div
                        className="h-full rounded-full bg-green-600"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monitoring Program Berjalan */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Activity size={16} /> Monitoring Program Berjalan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Program</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Status</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Progress</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Target Selesai</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Dampak</th>
                </tr>
              </thead>
              <tbody>
                {programDesa.map((prog) => (
                  <tr key={prog.id} className="border-b border-slate-100">
                    <td className="py-3 px-3 font-semibold text-slate-700">{prog.nama}</td>
                    <td className="py-3 px-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        prog.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                        prog.status === 'Terlambat' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {prog.status}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${prog.progress}%`,
                              backgroundColor: prog.status === 'Selesai' ? '#22c55e' : prog.status === 'Terlambat' ? '#ef4444' : '#3b82f6'
                            }}
                          />
                        </div>
                        <span className="text-xs text-slate-600">{prog.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 text-xs">Des 2026</td>
                    <td className="py-3 px-3 text-xs font-bold text-green-600">Tinggi</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Notifikasi Program Prioritas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Bell size={16} /> Notifikasi Program Prioritas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className={`p-3 rounded-lg border ${
                  notif.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  notif.type === 'alert' ? 'bg-red-50 border-red-200' :
                  notif.type === 'success' ? 'bg-green-50 border-green-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-start gap-3">
                    {notif.type === 'warning' && <AlertTriangle size={16} className="text-yellow-600 mt-0.5" />}
                    {notif.type === 'alert' && <AlertTriangle size={16} className="text-red-600 mt-0.5" />}
                    {notif.type === 'success' && <CheckCircle2 size={16} className="text-green-600 mt-0.5" />}
                    {notif.type === 'info' && <Bell size={16} className="text-blue-600 mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">{notif.title}</p>
                      <p className="text-xs text-slate-600">{notif.message}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agenda Terdekat */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Calendar size={16} /> Agenda Terdekat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {agendaData.map((item) => (
                <div key={item.id} className="p-3 border rounded-lg bg-slate-50">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Clock size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">{item.judul}</p>
                      <p className="text-xs text-slate-600">{item.tanggal} • {item.waktu}</p>
                      <p className="text-xs text-slate-500">{item.lokasi}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Upload Evidence Terbaru */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Shield size={16} /> Upload Evidence Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {evidenceTerbaru.map((item) => (
                <div key={item.id} className="p-3 border rounded-lg bg-slate-50">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <FileText size={16} className="text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">{item.program}</p>
                      <p className="text-xs text-slate-600">{item.deskripsi}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-400">{item.tanggal}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          item.status === 'Terverifikasi' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Tindak Lanjut Rekomendasi */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Zap size={16} /> Progress Tindak Lanjut Rekomendasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progressRekomendasi.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-700">{item.tahap}</span>
                    <span className="text-xs text-slate-500">{item.selesai}/{item.total}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-600"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{item.progress}% selesai</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Laporan Desa Terbaru */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <FileText size={16} /> Laporan Desa Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {laporanDesa.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <FileText size={16} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{item.judul}</p>
                    <p className="text-xs text-slate-500">{item.tanggal} • {item.ukuran} • {item.tipe}</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Download
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}