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
import { useState, useEffect } from 'react';

const COLOR = '#0d47a1';

export default function GuruPage() {
  const [jenjangnData, setJenjangnData] = useState<any[]>([]);
  const [literasiTrend, setLiterasiTrend] = useState<any[]>([]);
  const [relayPulsa, setRelayPulsa] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/education-dashboard');
      const result = await res.json();
      if (result.success) {
        setJenjangnData(result.data.jenjangnData);
        setLiterasiTrend(result.data.literasiTrend);
        setRelayPulsa(result.data.relayPulsa);
        setStats(result.data.stats);
      }
    } catch (error) {
      console.error('Error loading education data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Pendidikan" modul="Guru & Fasilitator Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Kelas" value={stats.totalKelas || 12} satuan="kelas aktif" barColor="blue" progress={92} sparkData={[85,87,88,90,91,92,92,92.5]} trend="up" />
        <StatCard label="Total Materi" value={stats.totalMateri || 48} satuan="materi pembelajaran" barColor="green" progress={80} />
        <StatCard label="Total Tugas" value={stats.totalTugas || 36} satuan="tugas aktif" barColor="orange" progress={75} />
        <StatCard label="Peserta Kelas" value={stats.totalPesertaKelas || 284} satuan="siswa terdaftar" barColor="purple" progress={85} />
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
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${v}%`, '']} />
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
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${v}%`, '']} />
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
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${v}%`, '']} />
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
