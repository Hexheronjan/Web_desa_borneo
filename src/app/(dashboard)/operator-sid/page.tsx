'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  Users, GraduationCap, HeartPulse, Wallet, Building2, Landmark,
  CheckCircle2, AlertTriangle, Clock, Database, RefreshCw,
  Shield, TrendingUp, ArrowUpRight, Calendar, Bell, Globe,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const COLOR = '#00695c';

export default function OperatorSidPage() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Mock data for key metrics
  const keyMetrics = {
    totalDataPenduduk: 2847,
    kelengkapanData: 87.45,
    dataValid: 2492,
    dataBelumValid: 355,
    sinkronisasiTerakhir: '16/06/2025 08:15 WIB',
    assessmentReady: 85.30,
  };

  // Mock data for ringkasan kesiapan
  const ringkasanKesiapan = {
    totalIndikator: 716,
    indikatorTerisi: 708,
    indikatorValid: 612,
    periodeAssessmentAktif: 'Tahun 2025 - Semester 1',
    updateTerakhir: '16/06/2025 08:20 WIB',
  };

  // Mock data for kelengkapan data per dimensi
  const kelengkapanDimensi = [
    { dimensi: 'Kependudukan', persentase: 92, status: 'Baik' },
    { dimensi: 'Pendidikan', persentase: 88, status: 'Baik' },
    { dimensi: 'Kesehatan', persentase: 85, status: 'Baik' },
    { dimensi: 'Ekonomi', persentase: 78, status: 'Sedang' },
    { dimensi: 'Infrastruktur', persentase: 72, status: 'Sedang' },
    { dimensi: 'Sosial & Budaya', persentase: 65, status: 'Kurang' },
    { dimensi: 'Lingkungan', persentase: 58, status: 'Kurang' },
  ];

  // Mock data for sumber data terintegrasi
  const sumberData = [
    { sumber: 'Sistem Informasi Desa (SID)', status: 'Tersinkronisasi', dataTerakhir: '16/06/2025 08:15', kualitas: 'Baik' },
    { sumber: 'Dukcapil (Kependudukan)', status: 'Tersinkronisasi', dataTerakhir: '16/06/2025 07:30', kualitas: 'Baik' },
    { sumber: 'Dapodik (Pendidikan)', status: 'Tersinkronisasi', dataTerakhir: '15/06/2025 16:45', kualitas: 'Baik' },
    { sumber: 'Puskesmas (Kesehatan)', status: 'Tersinkronisasi', dataTerakhir: '15/06/2025 14:20', kualitas: 'Baik' },
    { sumber: 'BPS (Statistik)', status: 'Tersinkronisasi', dataTerakhir: '14/06/2025 10:00', kualitas: 'Baik' },
    { sumber: 'Kemenkes (Sosial)', status: 'Tersinkronisasi', dataTerakhir: '13/06/2025 09:15', kualitas: 'Baik' },
  ];

  // Mock data for aktivitas terbaru
  const aktivitasTerbaru = [
    { aksi: 'Sinkronisasi data SID berhasil', waktu: '2 jam lalu', status: 'success' },
    { aksi: 'Import data Excel dari Dukcapil', waktu: '5 jam lalu', status: 'success' },
    { aksi: 'Validasi data pendidikan selesai', waktu: '8 jam lalu', status: 'success' },
    { aksi: 'Notifikasi: 23 data tidak valid', waktu: '1 hari lalu', status: 'warning' },
    { aksi: 'Sinkronisasi data kesehatan', waktu: '2 hari lalu', status: 'success' },
  ];

  // Mock data for data quality monitoring
  const dataQuality = [
    { metrik: 'Akurasi Data', nilai: 93.12, status: 'Baik' },
    { metrik: 'Konsistensi Data', nilai: 91.25, status: 'Baik' },
    { metrik: 'Data Valid', nilai: 89.47, status: 'Baik' },
    { metrik: 'Data Lengkap', nilai: 87.45, status: 'Baik' },
  ];

  // Mock data for data belum lengkap
  const dataBelumLengkap = [
    { issue: 'Data pekerjaan penduduk', dimensi: 'Kependudukan', indikatorTerdampak: 45, prioritas: 'Tinggi', jumlah: 234 },
    { issue: 'Data penghasilan penduduk', dimensi: 'Ekonomi', indikatorTerdampak: 32, prioritas: 'Tinggi', jumlah: 189 },
    { issue: 'Data sarana transportasi desa', dimensi: 'Infrastruktur', indikatorTerdampak: 18, prioritas: 'Sedang', jumlah: 67 },
    { issue: 'Data sanitasi lingkungan', dimensi: 'Lingkungan', indikatorTerdampak: 24, prioritas: 'Sedang', jumlah: 98 },
    { issue: 'Data kelompok usaha', dimensi: 'Ekonomi', indikatorTerdampak: 15, prioritas: 'Rendah', jumlah: 45 },
  ];

  // Mock data for notifikasi data tidak lengkap
  const notifikasiData = [
    { issue: 'Data pekerjaan penduduk belum lengkap', jumlah: 234, prioritas: 'Tinggi' },
    { issue: 'Data penghasilan penduduk belum lengkap', jumlah: 189, prioritas: 'Tinggi' },
    { issue: 'Data sanitasi lingkungan belum lengkap', jumlah: 98, prioritas: 'Sedang' },
  ];

  // Mock data for tahapan penilaian
  const tahapanPenilaian = [
    { step: '1', label: 'Pengumpulan Data', icon: Database },
    { step: '2', label: 'Validasi Data', icon: CheckCircle2 },
    { step: '3', label: 'Assessment Readiness', icon: Shield },
    { step: '4', label: 'Monitoring Kualitas', icon: TrendingUp },
    { step: '5', label: 'Rekomendasi Perbaikan', icon: Bell },
  ];

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Operator SID" modul="Sistem Informasi Desa Terintegrasi" color={COLOR} />

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-l-blue-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Total Data Penduduk</p>
            <Users size={16} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.totalDataPenduduk.toLocaleString('id-ID')}</p>
          <p className="text-xs text-slate-500 mt-1">Jiwa</p>
        </Card>

        <Card className="p-4 border-l-4 border-l-green-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Kelengkapan Data</p>
            <CheckCircle2 size={16} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.kelengkapanData}%</p>
          <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
            <ArrowUpRight size={12} /> +5.2% dari bulan lalu
          </p>
        </Card>

        <Card className="p-4 border-l-4 border-l-teal-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Data Valid</p>
            <Shield size={16} className="text-teal-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.dataValid.toLocaleString('id-ID')}</p>
          <p className="text-xs text-slate-500 mt-1">Data</p>
        </Card>

        <Card className="p-4 border-l-4 border-l-red-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Data Belum Valid</p>
            <AlertTriangle size={16} className="text-red-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.dataBelumValid.toLocaleString('id-ID')}</p>
          <p className="text-xs text-red-600 mt-1">Perlu perbaikan</p>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Sinkronisasi Terakhir</p>
            <RefreshCw size={16} className="text-purple-600" />
          </div>
          <p className="text-lg font-bold text-slate-800">{keyMetrics.sinkronisasiTerakhir}</p>
          <p className="text-xs text-slate-500 mt-1">WIB</p>
        </Card>

        <Card className="p-4 border-l-4 border-l-orange-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-semibold">Assessment Ready</p>
            <TrendingUp size={16} className="text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{keyMetrics.assessmentReady}%</p>
          <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2">
            <div className="h-full rounded-full bg-orange-600" style={{ width: `${keyMetrics.assessmentReady}%` }} />
          </div>
        </Card>
      </div>

      {/* Ringkasan Kesiapan Data Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Shield size={16} /> Ringkasan Kesiapan Data Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="#e2e8f0" strokeWidth="12" fill="none" />
                <circle
                  cx="80" cy="80" r="70"
                  stroke="#00695c"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - keyMetrics.assessmentReady / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold text-slate-800">{keyMetrics.assessmentReady}%</p>
                <p className="text-xs text-slate-500">Ready Score</p>
              </div>
            </div>
            <div className="w-full space-y-2 mt-4">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Indikator Siap</span>
                <span className="font-bold text-green-600">612</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Indikator Belum Siap</span>
                <span className="font-bold text-yellow-600">96</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Indikator Tidak Valid</span>
                <span className="font-bold text-red-600">8</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Database size={16} /> Detail Kesiapan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-slate-500 font-semibold mb-1">Total Indikator</p>
                <p className="text-2xl font-bold text-slate-800">{ringkasanKesiapan.totalIndikator}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-xs text-slate-500 font-semibold mb-1">Indikator Terisi</p>
                <p className="text-2xl font-bold text-slate-800">{ringkasanKesiapan.indikatorTerisi}</p>
              </div>
              <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                <p className="text-xs text-slate-500 font-semibold mb-1">Indikator Valid</p>
                <p className="text-2xl font-bold text-slate-800">{ringkasanKesiapan.indikatorValid}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-xs text-slate-500 font-semibold mb-1">Periode Assessment Aktif</p>
                <p className="text-xs font-bold text-slate-800">{ringkasanKesiapan.periodeAssessmentAktif}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock size={14} />
              <span>Update Terakhir: {ringkasanKesiapan.updateTerakhir}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kelengkapan Data per Dimensi */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <TrendingUp size={16} /> Kelengkapan Data per Dimensi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {kelengkapanDimensi.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-32 text-xs font-semibold text-slate-700">{item.dimensi}</div>
                <div className="flex-1">
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.persentase}%`,
                        backgroundColor: item.status === 'Baik' ? '#22c55e' : item.status === 'Sedang' ? '#f59e0b' : '#ef4444'
                      }}
                    />
                  </div>
                </div>
                <div className="w-16 text-right">
                  <span className="text-xs font-bold text-slate-800">{item.persentase}%</span>
                </div>
                <div className="w-20">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === 'Baik' ? 'bg-green-100 text-green-700' :
                    item.status === 'Sedang' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sumber Data Terintegrasi */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Globe size={16} /> Sumber Data Terintegrasi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Sumber Data</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Status</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Data Terakhir</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Kualitas Data</th>
                </tr>
              </thead>
              <tbody>
                {sumberData.map((sumber, index) => (
                  <tr key={index} className="border-b border-slate-100">
                    <td className="py-3 px-3 font-semibold text-slate-700">{sumber.sumber}</td>
                    <td className="py-3 px-3">
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
                        {sumber.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{sumber.dataTerakhir}</td>
                    <td className="py-3 px-3">
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                        {sumber.kualitas}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  <div className={`p-2 rounded-lg ${
                    aktivitas.status === 'success' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    {aktivitas.status === 'success' ? (
                      <CheckCircle2 size={14} className="text-green-600" />
                    ) : (
                      <AlertTriangle size={14} className="text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">{aktivitas.aksi}</p>
                    <p className="text-xs text-slate-400 mt-1">{aktivitas.waktu}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Quality Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Shield size={16} /> Data Quality Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dataQuality.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{item.metrik}</p>
                    <p className="text-lg font-bold text-slate-800">{item.nilai}%</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Belum Lengkap */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <AlertTriangle size={16} /> Data Belum Lengkap (Berdasarkan Prioritas)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Issue</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Dimensi</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Indikator Terdampak</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Prioritas</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {dataBelumLengkap.map((item, index) => (
                  <tr key={index} className="border-b border-slate-100">
                    <td className="py-3 px-3 font-semibold text-slate-700">{item.issue}</td>
                    <td className="py-3 px-3 text-slate-600">{item.dimensi}</td>
                    <td className="py-3 px-3 text-slate-600">{item.indikatorTerdampak}</td>
                    <td className="py-3 px-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        item.prioritas === 'Tinggi' ? 'bg-red-100 text-red-700' :
                        item.prioritas === 'Sedang' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {item.prioritas}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{item.jumlah}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Notifikasi Data Tidak Lengkap */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Bell size={16} /> Notifikasi Data Tidak Lengkap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifikasiData.map((notif, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                notif.prioritas === 'Tinggi' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">{notif.issue}</p>
                  <span className="text-xs font-bold text-slate-600">{notif.jumlah} data</span>
                </div>
                <div className="mt-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    notif.prioritas === 'Tinggi' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    Prioritas: {notif.prioritas}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tahapan Penilaian Kesiapan Desa */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <TrendingUp size={16} /> Tahapan Penilaian Kesiapan Desa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-2 overflow-x-auto py-4">
            {tahapanPenilaian.map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className="flex flex-col items-center min-w-[120px]">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-2">
                    <item.icon size={20} className="text-teal-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 text-center">{item.label}</span>
                </div>
                {index < tahapanPenilaian.length - 1 && (
                  <div className="w-8 h-0.5 bg-slate-300 mx-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Butuh Bantuan */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Users size={16} /> Butuh Bantuan?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-700 mb-3">
              Jika Anda mengalami kendala dalam pengelolaan data atau membutuhkan bantuan teknis, silakan hubungi:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users size={16} className="text-teal-600" />
                <span>Dinas PMD Provinsi: (0536) 123456</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Globe size={16} className="text-teal-600" />
                <Link href="/operator-sid/panduan" className="text-teal-600 hover:text-teal-800 font-medium">
                  Panduan Pengguna →
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
