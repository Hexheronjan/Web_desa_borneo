'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Heart, AlertTriangle, CheckCircle2, ShieldCheck, RefreshCw, BarChart2
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

const KUALITAS_HIDUP_DATA = [
  { aspek: 'Akses Pelayanan', skor: 78, keterangan: 'Kemudahan menjangkau fasilitas kesehatan, pendidikan, dan balai desa' },
  { aspek: 'Kualitas Pelayanan', skor: 82, keterangan: 'Tingkat kepuasan layanan administrasi & kebersihan fasilitas publik' },
  { aspek: 'Kemudahan Informasi', skor: 85, keterangan: 'Kecepatan warga mendapat info pengumuman & transparansi APBDes' },
  { aspek: 'Kondisi Kesehatan', skor: 70, keterangan: 'Tingkat kebersihan air, angka stunting, dan partisipasi posyandu' },
  { aspek: 'Akses Pendidikan', skor: 76, keterangan: 'Ketersediaan kuota sekolah, beasiswa desa, dan fasilitas TBM' },
  { aspek: 'Partisipasi Warga', skor: 80, keterangan: 'Kehadiran dan masukan dalam musyawarah adat maupun musdes' },
  { aspek: 'Keamanan Sosial', skor: 90, keterangan: 'Tingkat kerukunan antardusun, zero kriminalitas dalam 1 tahun terakhir' },
  { aspek: 'Keberlanjutan Budaya', skor: 88, keterangan: 'Pelestarian bahasa Kenyah, upacara adat Belian, dan tari Dayak' },
  { aspek: 'Manfaat Sistem (SID)', skor: 74, keterangan: 'Tingkat efisiensi pengurusan surat mandiri via portal SLV' },
];

export default function PenilaianKualitasHidupPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Penilaian Kualitas Hidup" modul="Pemerintah Desa" color={COLOR} />

      {/* TERMINOLOGY WARNING BANNER */}
      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5">
        <AlertTriangle size={16} className="text-blue-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Ketentuan Istilah Skor Kualitas Hidup</p>
          <p className="text-blue-700 mt-0.5 font-medium leading-relaxed">
            Halaman ini menggunakan istilah <strong>Skor Kualitas Hidup</strong>, bukan *Indeks Kualitas Hidup*, sesuai ketentuan validasi formula yang disetujui Bappeda/Dinas PMD.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Rata-rata Skor QoL" value="71.28" satuan="Skor (Baik)" barColor="green" progress={71} />
        <StatCard label="Aspek Dinilai" value="9 Aspek" satuan="Kategori Penilaian" barColor="purple" progress={100} />
        <StatCard label="Aspek Tertinggi" value="Keamanan Sosial" satuan="Skor: 90" barColor="blue" progress={90} />
        <StatCard label="Aspek Terendah" value="Kondisi Kesehatan" satuan="Skor: 70" barColor="orange" progress={70} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* CHART UTAMA */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart2 size={16} /> Grafik Rincian Skor Kualitas Hidup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={KUALITAS_HIDUP_DATA} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 9, fill: '#64748b' }} />
                  <YAxis dataKey="aspek" type="category" width={120} tick={{ fontSize: 9, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8 }} />
                  <Bar dataKey="skor" fill={COLOR} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* DAFTAR ASPEK KUALITAS HIDUP */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Heart size={16} /> Detail Aspek & Keterangan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5 text-xs max-h-[300px] overflow-y-auto pr-1">
            {KUALITAS_HIDUP_DATA.map((k, i) => (
              <div key={i} className="p-2.5 border rounded-lg bg-slate-50/50">
                <div className="flex justify-between items-center font-bold text-slate-800 mb-1">
                  <span>{k.aspek}</span>
                  <span className="text-purple-700">{k.skor}</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-snug">{k.keterangan}</p>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Data dihitung secara periodik berdasarkan survei QoL masyarakat</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
