'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Landmark, Search, Filter, Download } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#0d47a1';

const allDesa = [
  { no: 1, nama: 'Desa Borneo Adat', kecamatan: 'Kec. Kahayan Tengah', index: 78.45, readiness: 75.20, maturity: 3.25, status: 'Mandiri' },
  { no: 2, nama: 'Desa Loksado Adat', kecamatan: 'Kec. Loksado', index: 77.10, readiness: 74.00, maturity: 3.10, status: 'Mandiri' },
  { no: 3, nama: 'Desa Betang Jaya', kecamatan: 'Kec. Tewah', index: 75.60, readiness: 73.15, maturity: 3.00, status: 'Maju' },
  { no: 4, nama: 'Desa Rungan Sari', kecamatan: 'Kec. Rungan', index: 74.20, readiness: 71.50, maturity: 2.95, status: 'Maju' },
  { no: 5, nama: 'Desa Mentaya Hulu', kecamatan: 'Kec. Mentaya Hulu', index: 70.80, readiness: 68.20, maturity: 2.80, status: 'Berkembang' },
  { no: 6, nama: 'Desa Kahayan Ilir', kecamatan: 'Kec. Kahayan Hilir', index: 68.50, readiness: 65.00, maturity: 2.50, status: 'Berkembang' },
  { no: 7, nama: 'Desa Tewah Baru', kecamatan: 'Kec. Tewah', index: 65.40, readiness: 62.40, maturity: 2.30, status: 'Berkembang' },
  { no: 8, nama: 'Desa Pulang Pisau Indah', kecamatan: 'Kec. Kahayan Tengah', index: 62.10, readiness: 58.00, maturity: 2.10, status: 'Berkembang' }
];

export default function MonitoringMultiDesaPage() {
  const [search, setSearch] = useState('');

  const filtered = allDesa.filter(d =>
    d.nama.toLowerCase().includes(search.toLowerCase()) ||
    d.kecamatan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Monitoring Multi Desa" modul="Monitoring Regional" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Desa Dimonitor" value={8} satuan="desa evaluasi" barColor="blue" progress={100} />
        <StatCard label="Status Mandiri" value={2} satuan="desa" barColor="green" progress={25} />
        <StatCard label="Status Maju" value={2} satuan="desa" barColor="blue" progress={25} />
        <StatCard label="Status Berkembang" value={4} satuan="desa" barColor="orange" progress={50} />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Landmark size={16} /> Lembar Pemantauan Indikator Smart Living Lintas Wilayah
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari desa..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-48"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4 text-center">No</th>
                    <th className="pb-2 pr-4">Nama Desa Adat</th>
                    <th className="pb-2 pr-4">Wilayah Kecamatan</th>
                    <th className="pb-2 pr-4 text-right">Smart Living Index</th>
                    <th className="pb-2 pr-4 text-right">Readiness Score</th>
                    <th className="pb-2 pr-4 text-right">Maturity Level</th>
                    <th className="pb-2 text-center">Status IDM</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d, i) => (
                    <tr key={d.no} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 text-center text-slate-400 font-mono text-xs">{d.no}</td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700">{d.nama}</td>
                      <td className="py-2.5 pr-4 text-xs text-slate-500">{d.kecamatan}</td>
                      <td className="py-2.5 pr-4 text-right font-bold font-mono text-xs text-indigo-700">{d.index.toFixed(2)}</td>
                      <td className="py-2.5 pr-4 text-right font-mono text-xs text-slate-600">{d.readiness.toFixed(2)}</td>
                      <td className="py-2.5 pr-4 text-right font-mono text-xs text-slate-600">{d.maturity.toFixed(2)}</td>
                      <td className="py-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          d.status === 'Mandiri' ? 'bg-green-100 text-green-700' :
                          d.status === 'Maju' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
