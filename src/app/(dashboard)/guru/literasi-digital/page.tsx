'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Cpu, ShieldCheck, Activity, Users, Info, Calendar } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const COLOR = '#1565c0';

const kelompokData = [
  { kelompok: 'Anak Sekolah', skor: 72.5, ideal: 85, status: 'Baik' },
  { kelompok: 'Pemuda/Remaja', skor: 78.2, ideal: 90, status: 'Sangat Baik' },
  { kelompok: 'Usia Produktif', skor: 64.0, ideal: 80, status: 'Cukup' },
  { kelompok: 'Lansia', skor: 28.5, ideal: 60, status: 'Butuh Pendampingan' },
];

const programLiterasi = [
  { nama: 'Internet Sehat & Keamanan Password', peserta: '45 Pemuda', progres: 85, hasil: '90% Lolos Uji' },
  { nama: 'Pemanfaatan Web Desa & Portal Layanan', peserta: '35 Warga', progres: 70, hasil: 'Belum Uji Akhir' },
  { nama: 'Penggunaan Gadget Dasar Lansia', peserta: '20 Warga', progres: 40, hasil: 'Butuh Pendampingan' },
];

export default function LiterasiDigitalPage() {
  return (
    <div className="flex flex-col gap-5 text-xs pb-10">
      <PageTitle fitur="Literasi Digital" modul="Guru/Tenaga Pendidikan" color={COLOR} />

      {/* Banner Penting */}
      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex items-start gap-2">
        <Info size={14} className="text-blue-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          <strong>Istilah Terkalibrasi:</strong> Gunakan istilah <strong>"Skor Literasi Digital"</strong>, bukan <em>Digital Literacy Index</em>, kecuali indeks tersebut telah memiliki formula dan validasi khusus yang disetujui.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Skor Literasi Digital" value="68.30" satuan="skor rata-rata" barColor="blue" progress={68.3} />
        <StatCard label="Kemampuan Dasar TIK" value="70.5%" satuan="pengguna perangkat" barColor="green" progress={70.5} />
        <StatCard label="Keamanan Digital" value="62.0%" satuan="paham privasi" barColor="orange" progress={62} />
        <StatCard label="Pemanfaatan Layanan" value="65.8%" satuan="pendidikan/kes" barColor="purple" progress={65.8} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* KIRI (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Chart Profil Literasi per Kelompok */}
          <Card>
            <CardHeader className="py-2.5 border-b">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase">Skor Literasi Digital per Kelompok Sasaran</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={kelompokData} margin={{ left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="kelompok" tick={{ fontSize: 9 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 9 }} />
                    <Bar name="Skor Saat Ini" dataKey="skor" fill="#1565c0" radius={[2, 2, 0, 0]} />
                    <Bar name="Skor Ideal" dataKey="ideal" fill="#cbd5e1" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Program Literasi */}
          <Card>
            <CardHeader className="py-2.5 border-b">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase">Program Literasi Digital Berjalan</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {programLiterasi.map((p, i) => (
                <div key={i} className="p-3 bg-slate-50 border rounded-lg flex flex-col gap-1.5">
                  <div className="flex justify-between items-start gap-2">
                    <p className="font-bold text-slate-800 leading-snug">{p.nama}</p>
                    <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{p.peserta}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500">
                    <span>Progres Pelatihan:</span>
                    <span className="font-bold">{p.progres}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${p.progres}%` }} />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-450 mt-0.5">
                    <span>Evaluasi Terkini: <strong>{p.hasil}</strong></span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* KANAN (1/3) */}
        <div className="space-y-4">
          
          {/* Keamanan & Pemanfaatan */}
          <Card>
            <CardHeader className="py-2.5 border-b">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase">Fokus Peningkatan Keamanan</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {[
                { title: 'Kesadaran Kata Sandi', text: 'Menghindari password sederhana dan berbagi akun posyandu/sekolah.' },
                { title: 'Privasi Data Pribadi', text: 'Perlindungan NIK siswa dan rekam medis keluarga agar tidak diunggah sembarangan.' },
                { title: 'Risiko Penipuan Digital', text: 'Edukasi membedakan pesan palsu/phishing dari layanan pemerintah desa resmi.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-2">
                  <ShieldCheck size={14} className="text-blue-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-800">{item.title}</h5>
                    <p className="text-slate-500 leading-relaxed mt-0.5">{item.text}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Kelompok Prioritas */}
          <Card className="border-orange-200">
            <CardHeader className="py-2.5 border-b border-orange-100 bg-orange-50/50">
              <CardTitle className="text-xs font-bold text-orange-950 uppercase flex items-center gap-1">
                <Users size={12} className="text-orange-700" /> Kelompok Pendampingan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <p className="text-slate-500">Kelompok berikut memerlukan pendampingan offline intensif karena keterbatasan perangkat:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 font-medium">
                <li>Kelompok Warga Lansia Dusun 1</li>
                <li>Ibu Rumah Tangga non-gadget Dusun 3</li>
                <li>Relawan Pendidikan Baru</li>
              </ul>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
