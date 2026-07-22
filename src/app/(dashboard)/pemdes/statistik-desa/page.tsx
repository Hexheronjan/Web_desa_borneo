'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  Users, Building2, Landmark, GraduationCap, Heart, Calendar, Globe,
  Activity, RefreshCw, Layers
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

type StatType = 'penduduk' | 'keluarga' | 'usia' | 'fasilitas' | 'pelayanan' | 'pendidikan' | 'kesehatan' | 'budaya' | 'program' | 'digital';

const STATS_CONFIG: Record<StatType, {
  label: string;
  sumber: string;
  periode: string;
  status: string;
  icon: React.ReactNode;
  data: { name: string; value: number }[];
}> = {
  penduduk: {
    label: 'Statistik Penduduk',
    sumber: 'Dukcapil Kab. Pulang Pisau',
    periode: 'Semester I 2026',
    status: 'Terverifikasi',
    icon: <Users size={16} />,
    data: [
      { name: 'Laki-laki', value: 1450 },
      { name: 'Perempuan', value: 1397 },
    ]
  },
  keluarga: {
    label: 'Statistik Keluarga',
    sumber: 'Regsosek 2026',
    periode: 'Semester I 2026',
    status: 'Terverifikasi',
    icon: <Landmark size={16} />,
    data: [
      { name: 'Keluarga Sejahtera', value: 450 },
      { name: 'Keluarga Pra-Sejahtera', value: 292 },
    ]
  },
  usia: {
    label: 'Kelompok Usia',
    sumber: 'Profil Desa 2026',
    periode: 'Tahun 2026',
    status: 'Terverifikasi',
    icon: <Layers size={16} />,
    data: [
      { name: 'Anak (0-14)', value: 650 },
      { name: 'Produktif (15-64)', value: 1850 },
      { name: 'Lansia (65+)', value: 347 },
    ]
  },
  fasilitas: {
    label: 'Fasilitas Umum',
    sumber: 'Pemerintah Desa',
    periode: 'Tahun 2026',
    status: 'Terverifikasi',
    icon: <Building2 size={16} />,
    data: [
      { name: 'Pendidikan', value: 3 },
      { name: 'Kesehatan', value: 4 },
      { name: 'Rumah Ibadah', value: 5 },
      { name: 'Balai Pertemuan', value: 2 },
    ]
  },
  pelayanan: {
    label: 'Pelayanan Publik',
    sumber: 'Sistem Informasi Desa',
    periode: 'Juli 2026',
    status: 'Real-time',
    icon: <Activity size={16} />,
    data: [
      { name: 'Surat Keterangan', value: 350 },
      { name: 'Administrasi Kependudukan', value: 210 },
      { name: 'Izin Usaha Desa', value: 45 },
    ]
  },
  pendidikan: {
    label: 'Pendidikan Terakhir',
    sumber: 'Dapodik & Dukcapil',
    periode: 'Semester I 2026',
    status: 'Terverifikasi',
    icon: <GraduationCap size={16} />,
    data: [
      { name: 'SD/Sederajat', value: 920 },
      { name: 'SMP/Sederajat', value: 850 },
      { name: 'SMA/Sederajat', value: 710 },
      { name: 'Perguruan Tinggi', value: 367 },
    ]
  },
  kesehatan: {
    label: 'Kondisi Kesehatan',
    sumber: 'Nakes & Posyandu Desa',
    periode: 'Juli 2026',
    status: 'Diperbarui Bulanan',
    icon: <Heart size={16} />,
    data: [
      { name: 'Balita Sehat', value: 180 },
      { name: 'Stunting Ringan', value: 28 },
      { name: 'Rujukan Puskesmas', value: 5 },
    ]
  },
  budaya: {
    label: 'Kegiatan Budaya',
    sumber: 'Lembaga Adat',
    periode: 'Tahun 2026',
    status: 'Terverifikasi',
    icon: <Landmark size={16} />,
    data: [
      { name: 'Upacara Adat', value: 12 },
      { name: 'Festival Seni', value: 4 },
      { name: 'Sekolah Adat', value: 3 },
    ]
  },
  program: {
    label: 'Program Pembangunan',
    sumber: 'Kasi Pembangunan',
    periode: 'Tahun Anggaran 2026',
    status: 'Diperbarui Mingguan',
    icon: <Calendar size={16} />,
    data: [
      { name: 'Selesai', value: 3 },
      { name: 'Berjalan', value: 5 },
      { name: 'Belum Mulai', value: 1 },
    ]
  },
  digital: {
    label: 'Penggunaan Layanan Digital',
    sumber: 'Log Aplikasi SID',
    periode: 'Juli 2026',
    status: 'Real-time',
    icon: <Globe size={16} />,
    data: [
      { name: 'Akses Portal Desa', value: 1250 },
      { name: 'Pengajuan Surat Mandiri', value: 380 },
      { name: 'Aduan Masalah Warga', value: 92 },
    ]
  },
};

const COLORS = ['#283593', '#1565C0', '#0288D1', '#0097A7', '#00897B'];

export default function StatistikDesaPage() {
  const [activeStat, setActiveStat] = useState<StatType>('penduduk');
  const activeData = STATS_CONFIG[activeStat];

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Statistik Desa" modul="Pemerintah Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Kategori" value="10" satuan="Bidang Statistik" barColor="purple" progress={100} />
        <StatCard label="Total Penduduk" value="2,847" satuan="Jiwa" barColor="blue" progress={100} />
        <StatCard label="Total Keluarga" value="742" satuan="Kepala Keluarga" barColor="green" progress={100} />
        <StatCard label="Status Validasi" value="98%" satuan="Terverifikasi Pemda" barColor="orange" progress={98} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        
        {/* STAT TABS SIDEBAR */}
        <div className="lg:col-span-1 space-y-2">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Pilih Kategori Statistik</h2>
          {Object.keys(STATS_CONFIG).map(key => {
            const cfg = STATS_CONFIG[key as StatType];
            return (
              <button
                key={key}
                onClick={() => setActiveStat(key as StatType)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-2.5 ${activeStat === key ? 'border-indigo-400 bg-indigo-50/50 text-indigo-900 shadow-sm font-bold' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'}`}
              >
                {cfg.icon}
                <span className="text-xs">{cfg.label}</span>
              </button>
            );
          })}
        </div>

        {/* STATS DETAIL / CHART DISPLAY */}
        <Card className="lg:col-span-3">
          <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between flex-wrap gap-2 py-4">
            <div>
              <CardTitle className="text-sm font-bold text-slate-800 leading-snug flex items-center gap-2">
                {activeData.icon} {activeData.label}
              </CardTitle>
            </div>
            
            {/* METADATA PERIODE & SUMBER */}
            <div className="flex gap-2 flex-wrap text-[10px]">
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">Periode: {activeData.periode}</span>
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">Sumber: {activeData.sumber}</span>
              <span className="bg-green-150 text-green-700 px-2 py-0.5 rounded font-bold">{activeData.status}</span>
            </div>
          </CardHeader>

          <CardContent className="pt-5 space-y-6">
            
            {/* CHART */}
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeData.data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Bar dataKey="value" fill={COLOR} radius={[4, 4, 0, 0]}>
                    {activeData.data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* TABEL DATA */}
            <div>
              <p className="font-bold text-slate-700 text-xs mb-2">Tabel Rincian Data:</p>
              <div className="overflow-x-auto rounded-lg border border-slate-150">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-left">
                    <tr>
                      <th className="p-2.5">Kategori / Nilai</th>
                      <th className="p-2.5 text-right">Jumlah / Skor</th>
                      <th className="p-2.5 text-right">Persentase</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(() => {
                      const total = activeData.data.reduce((sum, item) => sum + item.value, 0);
                      return activeData.data.map((item, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="p-2.5 font-semibold text-slate-800">{item.name}</td>
                          <td className="p-2.5 text-right font-bold text-slate-700">{item.value.toLocaleString('id-ID')}</td>
                          <td className="p-2.5 text-right font-semibold text-purple-700">{total > 0 ? ((item.value / total) * 100).toFixed(1) : 0}%</td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>

          </CardContent>
        </Card>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Sinkronisasi data Dukcapil dan Kementerian Desa</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
