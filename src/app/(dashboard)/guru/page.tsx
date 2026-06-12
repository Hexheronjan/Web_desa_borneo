'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from 'recharts';
import { GraduationCap, Users, BookOpen, Monitor } from 'lucide-react';
import Link from 'next/link';

const COLOR = '#0d47a1';

const jenjangnData = [
  { jenjang: 'PAUD', aps: 92, apk: 105, siswa: 48 },
  { jenjang: 'SD', aps: 95, apk: 112, siswa: 256 },
  { jenjang: 'SMP', aps: 88, apk: 98, siswa: 134 },
  { jenjang: 'SMA', aps: 82, apk: 90, siswa: 98 },
];

const literasiTrend = [
  { bln: 'Jan', digital: 35, numerasi: 55 },
  { bln: 'Feb', digital: 38, numerasi: 57 },
  { bln: 'Mar', digital: 40, numerasi: 60 },
  { bln: 'Apr', digital: 43, numerasi: 62 },
  { bln: 'Mei', digital: 45, numerasi: 64 },
  { bln: 'Jun', digital: 47, numerasi: 66 },
  { bln: 'Jul', digital: 48, numerasi: 67 },
  { bln: 'Agu', digital: 50, numerasi: 68 },
];

const relayPulsa = [
  { rt: 'RT 01', punya: 85, tidak: 15 },
  { rt: 'RT 02', punya: 72, tidak: 28 },
  { rt: 'RT 03', punya: 60, tidak: 40 },
  { rt: 'RT 04', punya: 78, tidak: 22 },
  { rt: 'RT 05', punya: 55, tidak: 45 },
];

export default function GuruDashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Pendidikan" modul="Guru & Fasilitator Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="APS Rata-rata" value="92,50%" satuan="angka partisipasi" barColor="blue" progress={92} sparkData={[85,87,88,90,91,92,92,92.5]} trend="up" />
        <StatCard label="APK Rata-rata" value="104,20%" satuan="angka kasar" barColor="green" progress={80} />
        <StatCard label="Total Siswa" value={256} satuan="peserta didik" barColor="teal" progress={75} />
        <StatCard label="Literasi Digital" value="78%" satuan="capaian" barColor="purple" progress={78} sparkData={[35,38,40,43,45,47,48,50,55,60,70,78]} trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Bar: APS/APK per jenjang */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <GraduationCap size={16} /> APS & APK per Jenjang Pendidikan
              </CardTitle>
              <Link href="/guru/aps" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={jenjangnData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eff6ff" />
                <XAxis dataKey="jenjang" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 120]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: number) => [`${v}%`, '']} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="aps" name="APS (%)" fill="#0d47a1" radius={[3,3,0,0]} />
                <Bar dataKey="apk" name="APK (%)" fill="#42a5f5" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Line: Tren Literasi */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Monitor size={16} /> Tren Literasi Digital & Numerasi
              </CardTitle>
              <Link href="/guru/literasi-digital" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={literasiTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eff6ff" />
                <XAxis dataKey="bln" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: number) => [`${v}%`, '']} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="digital" name="Literasi Digital" stroke="#0d47a1" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="numerasi" name="Numerasi" stroke="#2E7D32" strokeWidth={2} strokeDasharray="4 2" dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Relay Pulsa per RT */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Monitor size={16} /> Kepemilikan Perangkat Digital per RT
            </CardTitle>
            <Link href="/guru/apk" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              Detail →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={relayPulsa} layout="vertical" margin={{ top: 0, right: 10, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eff6ff" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="rt" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={35} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: number) => [`${v}%`, '']} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="punya" name="Punya Perangkat (%)" fill="#0d47a1" radius={[0,3,3,0]} stackId="a" />
              <Bar dataKey="tidak" name="Belum Punya (%)" fill="#bbdefb" radius={[0,3,3,0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Data Siswa Quick Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
              <span className="flex items-center gap-2"><BookOpen size={16} /> Ringkasan Data Pendidikan</span>
            </CardTitle>
            <Link href="/guru/data-siswa" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              Lihat Siswa →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {jenjangnData.map((j, i) => (
              <div key={i} className="text-center p-4 rounded-xl border" style={{ backgroundColor: `${COLOR}08`, borderColor: `${COLOR}20` }}>
                <p className="text-2xl font-black" style={{ color: COLOR }}>{j.siswa}</p>
                <p className="text-xs font-bold text-slate-600 mt-1">{j.jenjang}</p>
                <p className="text-[10px] text-slate-400">APS: {j.aps}% · APK: {j.apk}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
