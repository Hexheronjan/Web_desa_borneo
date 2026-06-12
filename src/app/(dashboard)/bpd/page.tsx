'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, PieChart, Pie, Cell,
} from 'recharts';
import { FileText, TrendingUp, Users, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const COLOR = '#1b5e20';

const apbdesData = [
  { name: 'Pemerintahan', anggaran: 250, realisasi: 200 },
  { name: 'Pembangunan', anggaran: 450, realisasi: 340 },
  { name: 'Kemasyarakatan', anggaran: 200, realisasi: 150 },
  { name: 'Pemberdayaan', anggaran: 250, realisasi: 150 },
  { name: 'Bencana', anggaran: 100, realisasi: 60 },
];

const programTrend = [
  { bln: 'Jan', prog: 18 }, { bln: 'Feb', prog: 20 }, { bln: 'Mar', prog: 20 },
  { bln: 'Apr', prog: 22 }, { bln: 'Mei', prog: 22 }, { bln: 'Jun', prog: 24 },
];

const aspirasi = [
  { name: 'Ditindaklanjuti', value: 60, color: '#2E7D32' },
  { name: 'Dalam Proses', value: 28, color: '#E65100' },
  { name: 'Belum Diproses', value: 12, color: '#dc2626' },
];

const programs = [
  { nama: 'Program Posyandu Mandiri', status: 'Selesai', prog: 100, anggaran: 'Rp 75 jt' },
  { nama: 'Perbaikan Jalan RT 03 & 05', status: 'Berjalan', prog: 72, anggaran: 'Rp 150 jt' },
  { nama: 'Pelatihan Digital UMKM', status: 'Berjalan', prog: 55, anggaran: 'Rp 50 jt' },
  { nama: 'Revitalisasi Balai Adat', status: 'Perencanaan', prog: 20, anggaran: 'Rp 200 jt' },
];

export default function BPDDashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Pengawasan BPD" modul="Badan Permusyawaratan Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Program Desa" value={24} satuan="total program" barColor="green" progress={80} sparkData={[18,20,20,22,22,24]} trend="up" />
        <StatCard label="Realisasi APBDes" value="72,45%" satuan="dari anggaran" barColor="teal" progress={72} sparkData={[55,60,63,66,70,72]} trend="up" />
        <StatCard label="Aktualisasi Modul" value={18} satuan="program aktif" barColor="blue" progress={75} />
        <StatCard label="Inspeksi Lapangan" value={15} satuan="kunjungan" barColor="orange" progress={60} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* APBDes BarChart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <TrendingUp size={16} /> Transparansi APBDes (Juta Rupiah)
              </CardTitle>
              <Link href="/bpd/transparansi-apbdes" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={apbdesData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: number) => [`Rp ${v}jt`, '']} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="anggaran" name="Anggaran" fill="#a5d6a7" radius={[3,3,0,0]} />
                <Bar dataKey="realisasi" name="Realisasi" fill="#1b5e20" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Aspirasi Pie */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <MessageSquare size={16} /> Status Aspirasi Masyarakat
              </CardTitle>
              <Link href="/bpd/aspirasi-masyarakat" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={170}>
              <PieChart>
                <Pie data={aspirasi} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={70} label={({ name, value }) => `${value}%`} labelLine={false}>
                  {aspirasi.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full space-y-1.5 mt-1">
              {aspirasi.map((a, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: a.color }} />
                    <span className="text-slate-600">{a.name}</span>
                  </div>
                  <span className="font-bold" style={{ color: a.color }}>{a.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Program Desa */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <FileText size={16} /> Evaluasi Program Desa
            </CardTitle>
            <Link href="/bpd/evaluasi-program" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              Lihat Selengkapnya →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {programs.map((p, i) => {
              const bg = p.prog === 100 ? '#2E7D32' : p.prog >= 50 ? '#E07B2A' : '#7B1FA2';
              return (
                <div key={i} className="p-3 border rounded-xl bg-slate-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold text-slate-700">{p.nama}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${bg}20`, color: bg }}>{p.status}</span>
                      <span className="text-xs font-mono text-slate-500">{p.anggaran}</span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${p.prog}%`, backgroundColor: bg }} />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">{p.prog}% selesai</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
