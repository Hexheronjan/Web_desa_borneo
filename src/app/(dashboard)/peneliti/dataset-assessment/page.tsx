'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { Database, CheckCircle2, Users } from 'lucide-react';
import { DESA_BAB4 } from '@/lib/bab4-data';

const COLOR = '#1a365d';

const datasetList = [
  {
    nama: 'Dataset SLV 1 (v1.2) — Kerangka Kesiapan (RQ1)',
    deskripsi: 'Survei kesiapan 6 dimensi (D1–D6) dan 24 indikator (I01–I24) dari 126 responden lintas 3 desa + validitas isi S-CVI/Ave & pembobotan AHP (7 matriks).',
    records: 126,
    variabel: 24,
    periode: 'RQ1 · v1.2 Terkunci',
    status: 'Lengkap',
    persen: 100,
    color: '#2b6cb0',
  },
  {
    nama: 'Dataset SLV 2 (v1.2) — DSS SAW & Sensitivitas (RQ2)',
    deskripsi: 'Matriks keputusan 6 kriteria (C1–C6) × 30 baris alternatif program (3 desa × 10 alternatif), 39 skenario uji sensitivitas ±10%, dan evaluasi formatif 24 penilai.',
    records: 30,
    variabel: 6,
    periode: 'RQ2 · v1.2 Terkunci',
    status: 'Lengkap',
    persen: 100,
    color: '#276749',
  },
  {
    nama: 'Dataset SLV 3 (v1.2) — Evaluasi Lapangan 4 Minggu (RQ3)',
    deskripsi: '126 partisipan (42/desa; 7 peran × 18), 1.008 baris tugas UAT (966 relevan), 504 log penggunaan 4 minggu, 121 complete-case kematangan, SUS, kualitas, dan 54 unit KPI SDGs.',
    records: 1008,
    variabel: 54,
    periode: 'RQ3 · 4 Minggu',
    status: 'Lengkap',
    persen: 100,
    color: '#553c9a',
  },
];

const statPerUnit = [
  { nama: 'Responden RQ1', records: 126, warna: '#2b6cb0' },
  { nama: 'Kematangan CC', records: 121, warna: '#0694a2' },
  { nama: 'Baris DSS SAW', records: 30, warna: '#276749' },
  { nama: 'Unit KPI SDGs', records: 54, warna: '#c05621' },
  { nama: 'Log 4 Minggu', records: 504, warna: '#d69e2e' },
  { nama: 'Baris Tugas UAT', records: 1008, warna: '#553c9a' },
];

export default function DatasetAssessmentPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dataset Penelitian (SLV 1, SLV 2, SLV 3 v1.2)" modul="Research Overview" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Paket Dataset', value: '3 Paket', sub: 'SLV 1, SLV 2, SLV 3 v1.2', color: COLOR, icon: Database },
          { label: 'Total Partisipan', value: '126', sub: '42/desa · 7 peran × 18', color: '#276749', icon: Users },
          { label: 'Indikator & KPI', value: '24 / 54', sub: '24 Indikator · 54 KPI SDGs', color: '#2b6cb0', icon: CheckCircle2 },
          { label: 'Rekaman UAT / Log', value: '1.008 / 504', sub: '966 tugas UAT relevan', color: '#553c9a', icon: CheckCircle2 },
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
              <Database size={16} /> Struktur 3 Dataset Resmi Bab IV
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {datasetList.map((ds, i) => (
                <div key={i} className="p-3 rounded-xl border" style={{ borderColor: ds.color + '40', backgroundColor: ds.color + '06' }}>
                  <div className="flex items-center justify-between mb-1.5 gap-2">
                    <p className="text-[12px] font-bold text-slate-800">{ds.nama}</p>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <CheckCircle2 size={13} className="text-green-600" />
                      <span className="text-[10px] font-bold text-green-700">{ds.status}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-600 mb-2 leading-relaxed">{ds.deskripsi}</p>
                  <div className="flex gap-4 text-[10px]">
                    <span><strong className="font-bold" style={{ color: ds.color }}>{ds.records}</strong> baris utama</span>
                    <span><strong className="font-bold" style={{ color: ds.color }}>{ds.variabel}</strong> indikator/KPI</span>
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

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Database size={16} /> Volume Observasi per Komponen Dataset
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={statPerUnit} margin={{ top: 5, right: 10, left: -10, bottom: 25 }} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="nama" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} angle={-15} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [v, 'Observasi']} />
                <Bar dataKey="records" radius={[4, 4, 0, 0]}>
                  {statPerUnit.map((d, i) => <Cell key={i} fill={d.warna} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-2 p-3 bg-blue-50 rounded-xl border border-blue-200 text-[11px] text-blue-900">
              <strong>Integritas Data:</strong> Seluruh pengujian statistik RQ3 dilakukan pada 126 partisipan berpasangan (kecuali kematangan digital <em>complete-case</em> N=121) dengan koreksi <strong>Holm</strong>.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ringkasan Agregat 3 Desa */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Database size={16} /> Rekapitulasi Agregat Dataset per Desa (Jonggon Jaya, Kedang Ipil, Lung Anai)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  {['Desa', 'Kecamatan', 'N', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'Skor Kesiapan', 'UAT (%)', 'SUS'].map((h, i) => (
                    <th key={i} className="text-left py-2.5 px-2.5 text-[10px] font-bold text-gray-500 uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DESA_BAB4.map((d, i) => (
                  <tr key={d.id} className={`border-b border-gray-100 hover:bg-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                    <td className="py-2.5 px-2.5 font-bold text-slate-800 whitespace-nowrap">{d.nama}</td>
                    <td className="py-2.5 px-2.5 text-slate-600 whitespace-nowrap">{d.kecamatan}</td>
                    <td className="py-2.5 px-2.5 font-mono font-bold text-slate-700">42</td>
                    <td className="py-2.5 px-2.5 font-mono text-slate-700">{d.dimensi.D1.toFixed(2)}</td>
                    <td className="py-2.5 px-2.5 font-mono text-slate-700">{d.dimensi.D2.toFixed(2)}</td>
                    <td className="py-2.5 px-2.5 font-mono text-slate-700">{d.dimensi.D3.toFixed(2)}</td>
                    <td className="py-2.5 px-2.5 font-mono text-slate-700">{d.dimensi.D4.toFixed(2)}</td>
                    <td className="py-2.5 px-2.5 font-mono font-bold text-emerald-700">{d.dimensi.D5.toFixed(2)}</td>
                    <td className="py-2.5 px-2.5 font-mono text-slate-700">{d.dimensi.D6.toFixed(2)}</td>
                    <td className="py-2.5 px-2.5 font-mono font-black text-blue-700">{d.skorKesiapan.toFixed(2)}</td>
                    <td className="py-2.5 px-2.5 font-mono font-bold text-green-700">{d.evaluasiRQ3.uat.toFixed(2)}%</td>
                    <td className="py-2.5 px-2.5 font-mono font-bold text-purple-700">{d.evaluasiRQ3.sus.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-blue-50 border-t-2 border-blue-200 font-bold text-blue-900">
                  <td colSpan={2} className="py-2.5 px-2.5">Total / Rerata 3 Desa</td>
                  <td className="py-2.5 px-2.5 font-mono">126</td>
                  <td className="py-2.5 px-2.5 font-mono">61,39</td>
                  <td className="py-2.5 px-2.5 font-mono">49,69</td>
                  <td className="py-2.5 px-2.5 font-mono">54,27</td>
                  <td className="py-2.5 px-2.5 font-mono">48,71</td>
                  <td className="py-2.5 px-2.5 font-mono">83,12</td>
                  <td className="py-2.5 px-2.5 font-mono">51,62</td>
                  <td className="py-2.5 px-2.5 font-mono">58,18</td>
                  <td className="py-2.5 px-2.5 font-mono">86,65%</td>
                  <td className="py-2.5 px-2.5 font-mono">67,58</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
