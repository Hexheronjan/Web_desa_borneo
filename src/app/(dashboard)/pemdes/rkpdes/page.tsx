'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { ListOrdered, CheckCircle, Search, Filter } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

const rkpPrograms = [
  { no: 1, program: 'Peningkatan Posyandu Balita & Lansia', pagu: 'Rp 45.000.000', pelaksana: 'Nakes Posyandu', target: 'KIA RT 01-05', status: 'Approved' },
  { no: 2, program: 'Pengadaan Akses Internet RT (VSAT)', pagu: 'Rp 80.000.000', pelaksana: 'Operator SID', target: 'Balai & RT 03', status: 'Approved' },
  { no: 3, program: 'Pelatihan Literasi Digital Guru & Siswa', pagu: 'Rp 15.000.000', pelaksana: 'Guru Fasilitator', target: 'Balai Adat', status: 'Approved' },
  { no: 4, program: 'Digitalisasi Arsip Hukum & Sejarah Adat', pagu: 'Rp 25.000.000', pelaksana: 'Lembaga Adat', status: 'Pending Approval', target: 'Kantor Adat' },
  { no: 5, program: 'Pipa Air Bersih Huma Betang RT 02', pagu: 'Rp 50.000.000', pelaksana: 'Kaur Pembangunan', target: 'Kawasan RT 02', status: 'Approved' }
];

export default function RKPDesPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="RKPDes (Rencana Kerja Pemerintah Desa)" modul="Pemdes / Kepala Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Pagu RKP" value="Rp 215 M" satuan="anggaran diajukan" barColor="blue" progress={75} />
        <StatCard label="Program Approved" value={4} satuan="kegiatan" barColor="green" progress={80} />
        <StatCard label="Program Pending" value={1} satuan="verifikasi dinas" barColor="orange" progress={20} />
        <StatCard label="Tahun Anggaran" value="2026" satuan="periode berjalan" barColor="purple" progress={100} />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <ListOrdered size={16} /> Daftar Usulan Kerja RKPDesa Tahun Berjalan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4">No</th>
                    <th className="pb-2 pr-4">Usulan Program Kerja</th>
                    <th className="pb-2 pr-4">Pagu Anggaran</th>
                    <th className="pb-2 pr-4">Pelaksana Teknis</th>
                    <th className="pb-2 pr-4">Target Sasaran</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rkpPrograms.map((p, i) => (
                    <tr key={p.no} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 text-slate-400 font-mono text-xs">{p.no}</td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700 text-xs md:text-sm">{p.program}</td>
                      <td className="py-2.5 pr-4 text-xs font-mono font-bold text-slate-600">{p.pagu}</td>
                      <td className="py-2.5 pr-4 text-xs text-slate-500">{p.pelaksana}</td>
                      <td className="py-2.5 pr-4 text-xs text-slate-600">{p.target}</td>
                      <td className="py-2.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {p.status}
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
