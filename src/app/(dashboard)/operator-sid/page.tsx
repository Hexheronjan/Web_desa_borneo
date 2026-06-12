'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import {
  Users, GraduationCap, HeartPulse, Wallet, Building2, Landmark,
  CheckCircle2, AlertTriangle, XCircle, Clock, Database,
} from 'lucide-react';
import Link from 'next/link';

const COLOR = '#00695c';

const pertumbuhanData = [
  { bulan: 'Jan', value: 320 }, { bulan: 'Feb', value: 410 },
  { bulan: 'Mar', value: 380 }, { bulan: 'Apr', value: 520 },
  { bulan: 'Mei', value: 610 }, { bulan: 'Jun', value: 580 },
  { bulan: 'Jul', value: 720 }, { bulan: 'Agu', value: 690 },
  { bulan: 'Sep', value: 810 }, { bulan: 'Okt', value: 780 },
  { bulan: 'Nov', value: 870 }, { bulan: 'Des', value: 950 },
];

const validasiPie = [
  { name: 'Tervalidasi', value: 80, color: '#16a34a' },
  { name: 'Valid Sebagian', value: 15, color: '#eab308' },
  { name: 'Tidak Valid', value: 5, color: '#dc2626' },
];

const dataTerbaru = [
  { id: 1, nama: 'Andi Saputra', modul: 'Penduduk', aksi: 'Data baru ditambahkan', waktu: '5 menit lalu', status: 'Tervalidasi' },
  { id: 2, nama: 'Siti Nurhaliza', modul: 'Kesehatan', aksi: 'Rekam medis diperbarui', waktu: '12 menit lalu', status: 'Tervalidasi' },
  { id: 3, nama: 'UMKM Batik Dayak', modul: 'Ekonomi', aksi: 'Usaha baru didaftarkan', waktu: '30 menit lalu', status: 'Valid Sebagian' },
  { id: 4, nama: 'SDN 01 Borneo', modul: 'Pendidikan', aksi: 'Data siswa diperbarui', waktu: '1 jam lalu', status: 'Tervalidasi' },
  { id: 5, nama: 'Jalan Desa RT 03', modul: 'Infrastruktur', aksi: 'Status kondisi diperbarui', waktu: '2 jam lalu', status: 'Tidak Valid' },
  { id: 6, nama: 'Upacara Tiwah', modul: 'Budaya', aksi: 'Kegiatan baru ditambahkan', waktu: '3 jam lalu', status: 'Tervalidasi' },
];

const modulSummary = [
  { icon: Users, label: 'Penduduk', value: 2345, total: 2500, color: '#00695c' },
  { icon: GraduationCap, label: 'Pendidikan', value: 785, total: 1000, color: '#1565c0' },
  { icon: HeartPulse, label: 'Kesehatan', value: 620, total: 800, color: '#c62828' },
  { icon: Wallet, label: 'Ekonomi', value: 456, total: 600, color: '#e65100' },
  { icon: Building2, label: 'Infrastruktur', value: 230, total: 350, color: '#6a1b9a' },
  { icon: Landmark, label: 'Budaya', value: 120, total: 200, color: '#2e7d32' },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Tervalidasi: 'bg-green-100 text-green-700',
    'Valid Sebagian': 'bg-yellow-100 text-yellow-700',
    'Tidak Valid': 'bg-red-100 text-red-700',
  };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${map[status] || 'bg-slate-100 text-slate-600'}`}>{status}</span>;
}

function ModulBadge({ modul }: { modul: string }) {
  const map: Record<string, string> = {
    Penduduk: 'bg-teal-100 text-teal-700',
    Pendidikan: 'bg-blue-100 text-blue-700',
    Kesehatan: 'bg-rose-100 text-rose-700',
    Ekonomi: 'bg-amber-100 text-amber-700',
    Infrastruktur: 'bg-purple-100 text-purple-700',
    Budaya: 'bg-emerald-100 text-emerald-700',
  };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${map[modul] || 'bg-slate-100 text-slate-600'}`}>{modul}</span>;
}

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return percent > 0.08 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

export default function OperatorSidPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Operator SID" modul="Sistem Informasi Desa" color={COLOR} />

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label="Penduduk" value="2.345" satuan="jiwa" barColor="teal" progress={100} sparkData={[280,300,320,340,350,2345]} trend="up" />
        <StatCard label="Pendidikan" value="785" satuan="data" barColor="blue" progress={85} sparkData={[600,640,680,720,760,785]} trend="up" />
        <StatCard label="Kesehatan" value="620" satuan="data" barColor="red" progress={75} sparkData={[500,530,560,590,610,620]} trend="up" />
        <StatCard label="Ekonomi" value="456" satuan="data" barColor="orange" progress={60} sparkData={[380,400,420,435,445,456]} trend="up" />
        <StatCard label="Infrastruktur" value="230" satuan="data" barColor="purple" progress={45} sparkData={[180,195,205,215,225,230]} trend="up" />
        <StatCard label="Budaya" value="120" satuan="data" barColor="green" progress={30} sparkData={[80,90,100,108,115,120]} trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* AREA CHART */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Database size={16} /> Grafik Pertumbuhan Data Bulanan
              </CardTitle>
              <Link href="/operator-sid/validasi-data" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Lihat Selengkapnya →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={pertumbuhanData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradTeal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00695c" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00695c" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
                <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: number) => [v.toLocaleString('id-ID'), 'Entri Data']} />
                <Area type="monotone" dataKey="value" name="Entri Data" stroke="#00695c" strokeWidth={2.5} fill="url(#gradTeal)" dot={{ r: 3, fill: '#00695c' }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-[10px] text-slate-400 mt-1 text-center">
              Total data masuk tahun ini: <strong className="text-slate-600">7.640</strong> entri
            </p>
          </CardContent>
        </Card>

        {/* PIE CHART Validasi */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <CheckCircle2 size={16} /> Validasi Data
              </CardTitle>
              <Link href="/operator-sid/validasi-data" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3">
            <ResponsiveContainer width="100%" height={170}>
              <PieChart>
                <Pie data={validasiPie} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={75} labelLine={false} label={renderCustomLabel}>
                  {validasiPie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full space-y-1.5">
              {validasiPie.map((v, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: v.color }} />
                    <span className="text-slate-600">{v.name}</span>
                  </div>
                  <span className="font-bold text-slate-700">{v.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DATA TERBARU */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Clock size={16} /> Data Terbaru Masuk
            </CardTitle>
            <Link href="/operator-sid/validasi-data" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              Lihat Semua →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  {['Nama/Item', 'Modul', 'Aksi', 'Waktu', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 px-3 text-xs font-bold text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataTerbaru.map((d, i) => (
                  <tr key={d.id} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                    <td className="py-2.5 px-3 font-semibold text-slate-700">{d.nama}</td>
                    <td className="py-2.5 px-3"><ModulBadge modul={d.modul} /></td>
                    <td className="py-2.5 px-3 text-slate-600">{d.aksi}</td>
                    <td className="py-2.5 px-3 text-slate-400 text-xs">{d.waktu}</td>
                    <td className="py-2.5 px-3"><StatusBadge status={d.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* RINGKASAN PER MODUL */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Database size={16} /> Ringkasan Data per Modul
            </CardTitle>
            <Link href="/operator-sid/data-penduduk" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              Kelola Modul →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {modulSummary.map((m, i) => (
              <div key={i} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <m.icon size={16} style={{ color: m.color }} />
                  <span className="text-xs font-bold text-slate-600">{m.label}</span>
                </div>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-xl font-black text-slate-800">{m.value.toLocaleString('id-ID')}</span>
                  <span className="text-[10px] text-slate-400 pb-0.5">/ {m.total.toLocaleString('id-ID')}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(m.value / m.total) * 100}%`, backgroundColor: m.color }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{Math.round((m.value / m.total) * 100)}% terisi</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
