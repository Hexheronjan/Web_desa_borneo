'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend,
  AreaChart, Area,
} from 'recharts';
import { Landmark, Users, Calendar, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const COLOR = '#4a148c';

export default function AdatDashboardPage() {
  const [kegiatanBulanan, setKegiatanBulanan] = useState<any[]>([]);
  const [kelembagaanRadar, setKelembagaanRadar] = useState<any[]>([]);
  const [anggotaData, setAnggotaData] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/adat-dashboard');
      const result = await res.json();
      if (result.success) {
        setKegiatanBulanan(result.data.kegiatanBulanan);
        setKelembagaanRadar(result.data.kelembagaanRadar);
        setAnggotaData(result.data.anggotaData);
        setStats(result.data.stats);
      }
    } catch (error) {
      console.error('Error loading adat data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Budaya Adat" modul="Lembaga Adat Dayak Borneo" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Smart Living Index" value="80%" satuan="nilai adat" barColor="purple" progress={80} sparkData={[70,72,74,76,78,80]} trend="up" />
        <StatCard label="Kelembagaan Aktif" value={stats.totalPengurus || 12} satuan="lembaga" barColor="blue" progress={80} />
        <StatCard label="Musyawarah" value={stats.totalMusyawarah || 5} satuan="agenda" barColor="orange" progress={50} />
        <StatCard label="Didokumentasikan" value={stats.totalArsipAdat || 28} satuan="arsip adat" barColor="green" progress={70} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Kegiatan adat bulanan */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Calendar size={16} /> Kegiatan Adat per Bulan
              </CardTitle>
              <Link href="/adat/kalender-adat" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={kegiatanBulanan} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradPurple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4a148c" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4a148c" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f3ff" />
                <XAxis dataKey="bln" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [v, 'Kegiatan']} />
                <Area type="monotone" dataKey="kegiatan" name="Kegiatan Adat" stroke="#4a148c" strokeWidth={2.5} fill="url(#gradPurple)" dot={{ r: 3, fill: '#4a148c' }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radar Kelembagaan */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Landmark size={16} /> Profil Kelembagaan Adat
              </CardTitle>
              <Link href="/adat/kelembagaan-adat" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={kelembagaanRadar}>
                <PolarGrid stroke="#ede9fe" />
                <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 10, fill: '#64748b' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 8, fill: '#94a3b8' }} />
                <Radar name="Nilai" dataKey="nilai" stroke="#4a148c" fill="#4a148c" fillOpacity={0.3} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Anggota Lembaga Adat */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Users size={16} /> Struktur Lembaga Adat
            </CardTitle>
            <Link href="/adat/kelembagaan-adat" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              Lihat Detail →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {anggotaData.map((a, i) => (
              <div key={i} className="p-3 border rounded-xl flex items-center gap-3" style={{ borderLeftWidth: 4, borderLeftColor: COLOR }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{ backgroundColor: COLOR }}>
                  {a.nama.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{a.jabatan}</p>
                  <p className="text-sm font-bold text-slate-800">{a.nama}</p>
                  <p className="text-[10px] text-slate-400">{a.masa} · <span className="text-green-600 font-semibold">{a.status}</span></p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Huma Betang */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <BookOpen size={16} /> Filosofi Huma Betang & Kearifan Lokal
            </CardTitle>
            <Link href="/adat/huma-betang" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              Eksplorasi →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: '🏠 Huma Betang', desc: 'Rumah Betang sebagai simbol kebersamaan, kesetaraan, dan persatuan masyarakat Dayak Borneo dalam kehidupan kolektif.', color: '#4a148c' },
              { title: '⚖️ Hukum Adat', desc: 'Aturan tidak tertulis yang mengatur kehidupan sosial, kepemilikan tanah ulayat, dan penyelesaian konflik secara damai.', color: '#1565c0' },
              { title: '🌿 Handep Hapakat', desc: 'Nilai gotong royong murni tanpa pamrih dalam membangun desa, menjaga alam, dan merayakan kehidupan bersama.', color: '#2E7D32' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: `${item.color}08`, borderColor: `${item.color}25` }}>
                <p className="text-sm font-bold mb-2" style={{ color: item.color }}>{item.title}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
