'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { AlertTriangle, Filter, ClipboardList } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DESA_BAB4 } from '@/lib/bab4-data';

const COLOR = '#1565c0';

const targetData = DESA_BAB4.map((d) => ({
  indicator: d.nama.replace('Desa ', ''),
  aktual: d.sdgKPI.sdg4,
  d3: d.dimensi.D3,
  target: 100,
}));

export default function MonitoringPendidikanPage() {
  const [filterDesa, setFilterDesa] = useState('Semua');
  const [filterPeriode, setFilterPeriode] = useState('Siklus Evaluasi 2026');

  const filteredData = filterDesa === 'Semua'
    ? targetData
    : targetData.filter((t) => t.indicator === filterDesa);

  return (
    <div className="flex flex-col gap-5 text-xs pb-10">
      <PageTitle fitur="Monitoring Pendidikan & SDG Desa 4 (Bab IV)" modul="Guru/Tenaga Pendidikan" color={COLOR} />

      <div className="p-3 bg-white border rounded-xl shadow-sm flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-1 text-slate-500 font-bold">
          <Filter size={13} /> Filter Desa Penelitian:
        </div>
        <select value={filterDesa} onChange={(e) => setFilterDesa(e.target.value)} className="h-8 px-2 border rounded-lg bg-white">
          <option value="Semua">Semua 3 Desa Penelitian</option>
          <option value="Jonggon Jaya">Desa Jonggon Jaya</option>
          <option value="Kedang Ipil">Desa Kedang Ipil</option>
          <option value="Lung Anai">Desa Lung Anai</option>
        </select>
        <select value={filterPeriode} onChange={(e) => setFilterPeriode(e.target.value)} className="h-8 px-2 border rounded-lg bg-white">
          <option>Siklus Evaluasi 2026</option>
          <option>Semester I 2026</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Capaian SDG Desa 4" value="74,90%" satuan="Awal 66,68% (+8,22 poin)" barColor="green" progress={75} />
        <StatCard label="Skor D3 SDM & Literasi" value="54,27" satuan="JJ 65,8 · KI 53,7 · LA 43,4" barColor="blue" progress={54} />
        <StatCard label="UAT Peran Guru (N=18)" value="79,86%" satuan="SUS 71,11 · Kualitas 3,19/5" barColor="orange" progress={80} />
        <StatCard label="Unit KPI Pendidikan" value="18 KPI" satuan="6 KPI × 3 Desa Penelitian" barColor="purple" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="py-2.5 border-b">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase">Capaian SDGs Desa 4 &amp; Dimensi D3 Antar Desa (Gambar 4.23)</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 9 }} />
                    <YAxis type="category" dataKey="indicator" tick={{ fontSize: 10 }} width={95} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 9 }} />
                    <Bar name="Capaian SDG 4 (%)" dataKey="aktual" fill="#1565c0" radius={[0, 3, 3, 0]} />
                    <Bar name="Kesiapan D3 Literasi" dataKey="d3" fill="#0ea5e9" radius={[0, 3, 3, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-2.5 border-b">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase">Temuan Empiris Bab IV (SDGs Desa 4)</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="p-2.5 bg-slate-50 border rounded-lg">
                <p className="font-bold text-slate-800">Capaian Terendah dari 3 Tujuan SDGs (74,90%):</p>
                <p className="text-slate-600 mt-0.5">Meskipun mengalami kenaikan tertinggi (+8,22 poin dari 66,68%), angka putus sekolah (cost indicator) dan keterbatasan literasi digital di Lung Anai (73,6%) dan Kedang Ipil (75,0%) tetap menekan capaian.</p>
              </div>
              <div className="p-2.5 bg-slate-50 border rounded-lg">
                <p className="font-bold text-slate-800">Kebutuhan Pendampingan Peran Guru:</p>
                <p className="text-slate-600 mt-0.5">Tingkat kelulusan UAT peran Guru/Tenaga Pendidikan tercatat 79,86% (terendah di antara 7 peran) sehingga memerlukan panduan tugas sederhana dan pendampingan berkelanjutan.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-red-200">
            <CardHeader className="py-2.5 border-b border-red-100 bg-red-50/50">
              <CardTitle className="text-xs font-bold text-red-900 uppercase flex items-center gap-1">
                <AlertTriangle size={12} className="text-red-700" /> Peringatan Layanan (Bab IV)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <div className="p-2.5 bg-red-50 border border-red-100 rounded-lg">
                <p className="font-bold text-slate-800 leading-tight">Prioritas Penguatan SDGs Desa 4</p>
                <p className="text-[10px] text-slate-600 mt-0.5">Capaian akhir 74,90% (Jonggon Jaya 76,1%, Kedang Ipil 75,0%, Lung Anai 73,6%) memerlukan pemantauan rutin mutu data pendidikan.</p>
              </div>
              <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-lg">
                <p className="font-bold text-slate-800 leading-tight">Dukungan Koneksi Luring Sekolah</p>
                <p className="text-[10px] text-slate-600 mt-0.5">Keterbatasan konektivitas di Lung Anai (D2 = 30,75) membutuhkan modul input data pendidikan yang tetap dapat dipakai secara luring.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-2.5 border-b">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1">
                <ClipboardList size={12} /> Agenda Penyempurnaan (Tabel 4.52)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {[
                { program: 'Panduan Tugas Sederhana & Pendampingan Guru', pj: 'Pemdes + Guru', status: 'Prioritas' },
                { program: 'Penguatan Literasi Digital & Pembaruan Data KPI', pj: 'Guru + Operator', status: 'Berjalan' },
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
