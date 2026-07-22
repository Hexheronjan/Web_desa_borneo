'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Info, Target, AlertTriangle, Filter, ClipboardList, CheckCircle2, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const COLOR = '#1565c0';

const targetData = [
  { indicator: 'Angka Partisipasi Sekolah (APS)', aktual: 82, target: 95 },
  { indicator: 'Literasi Digital Siswa', aktual: 68, target: 80 },
  { indicator: 'Sertifikasi Keahlian Guru', aktual: 55, target: 75 },
];

export default function MonitoringPendidikanPage() {
  const [filterDusun, setFilterDusun] = useState('Semua');
  const [filterPeriode, setFilterPeriode] = useState('Semester 1 2026');

  return (
    <div className="flex flex-col gap-5 text-xs pb-10">
      <PageTitle fitur="Monitoring Pendidikan dan SDG Desa 4" modul="Guru/Tenaga Pendidikan" color={COLOR} />

      {/* FILTER BAR */}
      <div className="p-3 bg-white border rounded-xl shadow-sm flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-1 text-slate-500 font-bold">
          <Filter size={13} /> Filter Monitoring:
        </div>
        <select value={filterDusun} onChange={e => setFilterDusun(e.target.value)} className="h-8 px-2 border rounded-lg bg-white">
          <option value="Semua">Semua Dusun</option>
          <option value="Dusun 1">Dusun 1 (Sentral)</option>
          <option value="Dusun 2">Dusun 2 (Seberang)</option>
          <option value="Dusun 3">Dusun 3 (Udara)</option>
        </select>
        <select value={filterPeriode} onChange={e => setFilterPeriode(e.target.value)} className="h-8 px-2 border rounded-lg bg-white">
          <option>Semester 1 2026</option>
          <option>Semester 2 2026</option>
          <option>Tahun Ajaran 2025/2026</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Capaian SDG Desa 4" value="76.50%" satuan="kategori: baik" barColor="green" progress={76.5} />
        <StatCard label="Skor Kesiapan Pendidikan" value="72.40" satuan="skor indeks" barColor="blue" progress={72.4} />
        <StatCard label="Rata-rata Kesenjangan" value="15.0%" satuan="aktual vs target" barColor="orange" progress={15} />
        <StatCard label="Target Terpenuhi" value="2 / 5" satuan="indikator sasaran" barColor="purple" progress={40} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* KIRI (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Target dan Realisasi Chart */}
          <Card>
            <CardHeader className="py-2.5 border-b">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase">Perbandingan Target vs Kondisi Aktual</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={targetData} layout="vertical" margin={{ left: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 9 }} />
                    <YAxis type="category" dataKey="indicator" tick={{ fontSize: 9 }} width={120} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 9 }} />
                    <Bar name="Kondisi Aktual (%)" dataKey="aktual" fill="#1565c0" radius={[0, 2, 2, 0]} />
                    <Bar name="Target Sasaran (%)" dataKey="target" fill="#94a3b8" radius={[0, 2, 2, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Kondisi Akses & Sarana */}
          <Card>
            <CardHeader className="py-2.5 border-b">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase">Akses, Sarana &amp; Partisipasi Agregat</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="p-2.5 bg-slate-50 border rounded-lg">
                <p className="font-bold text-slate-800">Partisipasi Pendidikan:</p>
                <p className="text-slate-500 mt-0.5">Sebaran sekolah aktif: 92% siswa Dusun 1 &amp; 2 terlayani, Dusun 3 (seberang sungai) memiliki hambatan geografis transportasi sungai.</p>
              </div>
              <div className="p-2.5 bg-slate-50 border rounded-lg">
                <p className="font-bold text-slate-800">Sarana &amp; Prasarana TIK:</p>
                <p className="text-slate-500 mt-0.5">SMP Filial membutuhkan tambahan 5 unit Chromebook untuk ujian mandiri berbasis komputer semester ganjil.</p>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* KANAN (1/3) */}
        <div className="space-y-4">
          
          {/* Peringatan Kesiapan */}
          <Card className="border-red-200">
            <CardHeader className="py-2.5 border-b border-red-100 bg-red-50/50">
              <CardTitle className="text-xs font-bold text-red-955 uppercase flex items-center gap-1">
                <AlertTriangle size={12} className="text-red-700" /> Peringatan Layanan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <div className="p-2.5 bg-red-50 border border-red-100 rounded-lg">
                <p className="font-bold text-slate-800 leading-tight">Data Laporan Terlambat</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Data tingkat kelulusan SMP Filial belum diinput (Tenggat: 15 Juli 2026).</p>
              </div>
              <div className="p-2.5 bg-red-50 border border-red-100 rounded-lg">
                <p className="font-bold text-slate-800 leading-tight">Capaian Menurun</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Kehadiran Kelas UMKM Digital turun 12% dibanding semester lalu.</p>
              </div>
            </CardContent>
          </Card>

          {/* Tindak Lanjut */}
          <Card>
            <CardHeader className="py-2.5 border-b">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1">
                <ClipboardList size={12} /> Tindak Lanjut Program
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {[
                { program: 'Sweeping Anak Putus Sekolah', pj: 'BPD + Guru', status: 'Direncanakan' },
                { program: 'Pelatihan Keamanan Password Warga', pj: 'Relawan TIK', status: 'Berjalan' },
              ].map((item, i) => (
                <div key={i} className="border-b pb-2 last:border-0 last:pb-0">
                  <p className="font-semibold text-slate-800">{item.program}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] text-slate-400">PJ: {item.pj}</span>
                    <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">{item.status}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
