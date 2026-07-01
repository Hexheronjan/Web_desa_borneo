'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { Database, CheckCircle2, AlertCircle, Upload, Download, Search, Filter, Users } from 'lucide-react';

const COLOR = '#1a365d';

const datasetList = [
  {
    nama: 'Dataset Readiness Assessment',
    deskripsi: 'Data penilaian 20 indikator readiness dari 146 responden',
    records: 146,
    variabel: 20,
    periode: 'Apr–Jun 2025',
    status: 'Lengkap',
    persen: 100,
    color: '#2b6cb0',
    sampel: [
      { id: 'R001', nama: 'Ahmad S.', rt: 'RT 01', infrastruktur: 72, sdm: 68, kesehatan: 75, ekonomi: 64 },
      { id: 'R002', nama: 'Budi W.', rt: 'RT 01', infrastruktur: 78, sdm: 72, kesehatan: 80, ekonomi: 70 },
      { id: 'R003', nama: 'Cahya M.', rt: 'RT 02', infrastruktur: 65, sdm: 63, kesehatan: 70, ekonomi: 58 },
      { id: 'R004', nama: 'Dewi R.', rt: 'RT 02', infrastruktur: 80, sdm: 76, kesehatan: 82, ekonomi: 72 },
      { id: 'R005', nama: 'Eko P.', rt: 'RT 03', infrastruktur: 70, sdm: 66, kesehatan: 74, ekonomi: 62 },
    ],
  },
  {
    nama: 'Dataset Maturity Assessment',
    deskripsi: 'Data penilaian tingkat maturity 7 dimensi Smart Living Village',
    records: 146,
    variabel: 15,
    periode: 'Apr–Jun 2025',
    status: 'Lengkap',
    persen: 100,
    color: '#276749',
    sampel: [],
  },
  {
    nama: 'Dataset Quality of Life',
    deskripsi: 'Data indikator kualitas hidup masyarakat 5 dimensi utama',
    records: 146,
    variabel: 15,
    periode: 'Apr–Jun 2025',
    status: 'Lengkap',
    persen: 100,
    color: '#c05621',
    sampel: [],
  },
  {
    nama: 'Dataset DSS & AHP',
    deskripsi: 'Data bobot kriteria AHP dan pairwise comparison untuk DSS',
    records: 4,
    variabel: 4,
    periode: 'Jul 2025',
    status: 'Lengkap',
    persen: 100,
    color: '#553c9a',
    sampel: [],
  },
];

const statPerDataset = datasetList.map(d => ({
  nama: d.nama.replace('Dataset ', '').split(' ')[0],
  records: d.records,
  warna: d.color,
}));

export default function DatasetAssessmentPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dataset Responden" modul="Research Overview" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Dataset', value: '4', sub: 'Kategori Data', color: COLOR, icon: Database },
          { label: 'Total Responden', value: '146', sub: 'Data Terkumpul', color: '#276749', icon: Users },
          { label: 'Dataset Valid', value: '4 / 4', sub: '100% Lengkap', color: '#2b6cb0', icon: CheckCircle2 },
          { label: 'Status Assessment', value: 'Selesai', sub: 'Data Assessment', color: '#553c9a', icon: CheckCircle2 },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: kpi.color + '18' }}>
                <Icon size={18} style={{ color: kpi.color }} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">{kpi.label}</p>
                <p className="text-base font-black text-gray-900 leading-tight">{kpi.value}</p>
                <p className="text-[10px] text-gray-500">{kpi.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overview Dataset */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Database size={16} /> Overview Dataset Responden
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {datasetList.map((ds, i) => (
                <div key={i} className="p-3 rounded-xl border" style={{ borderColor: ds.color + '40', backgroundColor: ds.color + '06' }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[12px] font-bold text-slate-800">{ds.nama}</p>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-green-600" />
                      <span className="text-[10px] font-bold text-green-700">{ds.status}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 mb-2">{ds.deskripsi}</p>
                  <div className="flex gap-4 text-[10px]">
                    <span><strong className="font-bold" style={{ color: ds.color }}>{ds.records}</strong> records</span>
                    <span><strong className="font-bold" style={{ color: ds.color }}>{ds.variabel}</strong> variabel</span>
                    <span className="text-slate-400">{ds.periode}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${ds.persen}%`, backgroundColor: ds.color }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart records */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Database size={16} /> Jumlah Records per Dataset
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statPerDataset} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="nama" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [v, 'Records']} />
                <Bar dataKey="records" radius={[4, 4, 0, 0]}>
                  {statPerDataset.map((d, i) => <Cell key={i} fill={d.warna} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-[11px] font-bold text-blue-800">Total Records: <span className="text-base">443</span></p>
              <p className="text-[10px] text-blue-600">Dari 146 responden × 3 dataset utama + 4 kriteria DSS</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pratinjau Data Responden */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center justify-between" style={{ color: COLOR }}>
            <div className="flex items-center gap-2"><Database size={16} /> Pratinjau Data — Readiness Assessment (5 dari 146 Responden)</div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <Search size={12} /> Cari
              </button>
              <button className="flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <Download size={12} /> Export
              </button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  {['ID', 'Nama Responden', 'RT', 'Infrastruktur', 'SDM & Literasi', 'Kesehatan', 'Ekonomi', 'Total'].map((h, i) => (
                    <th key={i} className="text-left py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {datasetList[0].sampel.map((row, i) => {
                  const total = ((row.infrastruktur + row.sdm + row.kesehatan + row.ekonomi) / 4).toFixed(1);
                  return (
                    <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                      <td className="py-2.5 px-3 font-mono text-[11px] font-bold text-gray-500">{row.id}</td>
                      <td className="py-2.5 px-3 font-semibold text-[12px] text-slate-800">{row.nama}</td>
                      <td className="py-2.5 px-3 text-[11px] text-slate-600">{row.rt}</td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-[12px] text-blue-700">{row.infrastruktur}</td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-[12px] text-green-700">{row.sdm}</td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-[12px] text-orange-700">{row.kesehatan}</td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-[12px] text-red-700">{row.ekonomi}</td>
                      <td className="py-2.5 px-3 text-center font-mono font-black text-[13px] text-slate-900">{total}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-blue-50 border-t-2 border-blue-200">
                  <td colSpan={3} className="py-2.5 px-3 text-[11px] font-bold text-blue-800">... dan 141 responden lainnya</td>
                  <td className="py-2.5 px-3 text-center font-black text-blue-800 text-[12px]">72.6</td>
                  <td className="py-2.5 px-3 text-center font-black text-blue-800 text-[12px]">68.8</td>
                  <td className="py-2.5 px-3 text-center font-black text-blue-800 text-[12px]">75.7</td>
                  <td className="py-2.5 px-3 text-center font-black text-blue-800 text-[12px]">62.9</td>
                  <td className="py-2.5 px-3 text-center font-black text-blue-800 text-[12px]">74.30</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 text-center">Menampilkan 5 dari 146 records | Total 4 dataset tersedia</p>
        </CardContent>
      </Card>
    </div>
  );
}
