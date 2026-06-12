'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Cpu, CheckCircle, Search, Filter } from 'lucide-react';

const COLOR = '#1565c0';

const skillBreakdown = [
  { level: 'Basic (Pengoperasian Windows & Office)', pct: 65, status: 'Cukup Baik', color: 'bg-green-500' },
  { level: 'Intermediate (Browsing & Web Desa)', pct: 42, status: 'Butuh Peningkatan', color: 'bg-amber-500' },
  { level: 'Advanced (Pemrograman / Desain Grafis)', pct: 25, status: 'Sangat Kurang', color: 'bg-red-500' }
];

const trainingPrograms = [
  { no: 1, program: 'Pelatihan Microsoft Office Dasar', tanggal: '15 Mei 2026', siswa: 24, status: 'Selesai' },
  { no: 2, program: 'Pengenalan Internet Sehat & Portal Warga', tanggal: '02 Jun 2026', siswa: 30, status: 'Selesai' },
  { no: 3, program: 'Desain Grafis Canva untuk Promosi Budaya', tanggal: '25 Jun 2026', siswa: 18, status: 'Mendatang' }
];

export default function LiterasiDigitalPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Literasi Digital" modul="Guru / Fasilitator Belajar" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Literasi Digital" value="48%" satuan="skor pencapaian" barColor="orange" progress={48} />
        <StatCard label="Basic Skill" value="65%" satuan="rata-rata" barColor="green" progress={65} />
        <StatCard label="Intermediate Skill" value="42%" satuan="rata-rata" barColor="yellow" progress={42} />
        <StatCard label="Advanced Skill" value="25%" satuan="rata-rata" barColor="red" progress={25} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Cpu size={16} /> Pembagian Kemampuan Literasi Digital Warga & Siswa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillBreakdown.map((item, i) => (
              <div key={i} className="p-3 border rounded-xl bg-slate-50/50">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                  <span>{item.level}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    item.pct >= 60 ? 'bg-green-100 text-green-700' :
                    item.pct >= 40 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>{item.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color} transition-all`} style={{ width: `${item.pct}%` }} />
                  </div>
                  <span className="text-xs font-bold w-10 text-right">{item.pct}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <CheckCircle size={16} /> Pelatihan Terlaksana
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trainingPrograms.map((p, i) => (
              <div key={i} className="p-3 border rounded-lg bg-white">
                <div className="flex justify-between items-center mb-1 text-[10px]">
                  <span className="font-mono text-indigo-700 font-bold">{p.tanggal}</span>
                  <span className={`font-bold px-1.5 py-0.5 rounded-full ${
                    p.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>{p.status}</span>
                </div>
                <p className="text-xs font-semibold text-slate-700">{p.program}</p>
                <p className="text-[10px] text-slate-400 mt-1">Siswa Terdaftar: {p.siswa} anak</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
