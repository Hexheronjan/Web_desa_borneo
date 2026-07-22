'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Clock, ShieldCheck, CheckCircle2, ChevronRight, HelpCircle, RefreshCw, BarChart2
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#2e7d32';

interface Usulan {
  id: string;
  namaUsulan: string;
  kategori: 'Pembangunan' | 'Sosial Budaya' | 'Kesehatan' | 'Pendidikan';
  status: 'Baru' | 'Diperiksa' | 'Dibahas' | 'Diproses' | 'Selesai';
  tanggal: string;
  keterangan: string;
}

const MOCK_USULAN: Usulan[] = [
  { id: 'USL-01', namaUsulan: 'Penyediaan Alat Kesehatan Posyandu Lansia', kategori: 'Kesehatan', status: 'Selesai', tanggal: '10 Juli 2026', keterangan: 'Alat ukur tensi darah & timbangan digital telah diserahterjemahkan ke Dusun C.' },
  { id: 'USL-02', namaUsulan: 'Pengadaan Kelas Bahasa Inggris Dasar Anak Desa', kategori: 'Pendidikan', status: 'Diproses', tanggal: '12 Juli 2026', keterangan: 'Sedang pencarian relawan pengajar bekerjasama dengan mahasiswa KKN.' },
  { id: 'USL-03', namaUsulan: 'Penyediaan Akses Internet Huma Betang', kategori: 'Pembangunan', status: 'Dibahas', tanggal: '14 Juli 2026', keterangan: 'Dimasukkan ke dalam agenda musyawarah perencanaan anggaran minggu depan.' },
  { id: 'USL-04', namaUsulan: 'Pelatihan Seni Tari Tradisional Kalbar', kategori: 'Sosial Budaya', status: 'Diperiksa', tanggal: '15 Juli 2026', keterangan: 'Berkas usulan sedang dipelajari kelengkapan administrasi oleh Sekdes.' },
  { id: 'USL-05', namaUsulan: 'Perbaikan Saluran Air Bersih Dusun B', kategori: 'Pembangunan', status: 'Baru', tanggal: '18 Juli 2026', keterangan: 'Usulan baru diterima oleh sistem portal desa.' },
];

export default function StatusUsulanPage() {
  const [data] = useState<Usulan[]>(MOCK_USULAN);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Status Usulan" modul="Masyarakat Umum" color={COLOR} />

      {/* BANNER PRIVASI */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-start gap-2.5 shadow-sm">
        <ShieldCheck size={16} className="text-emerald-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          🔒 <strong>Proteksi Transparansi:</strong> Status pelacakan usulan masyarakat disajikan secara transparan. Identitas warga pengusul disembunyikan untuk menjaga keamanan data personal.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Usulan Terdaftar" value={data.length} satuan="Usulan Warga" barColor="purple" progress={100} />
        <StatCard label="Dalam Pemeriksaan" value={data.filter(u => ['Baru', 'Diperiksa'].includes(u.status)).length} satuan="Tahap Awal" barColor="orange" progress={40} />
        <StatCard label="Tahap Tindak Lanjut" value={data.filter(u => ['Dibahas', 'Diproses'].includes(u.status)).length} satuan="Musdes &amp; Anggaran" barColor="blue" progress={40} />
        <StatCard label="Selesai Terealisasi" value={data.filter(u => u.status === 'Selesai').length} satuan="Tuntas 100%" barColor="green" progress={20} />
      </div>

      {/* VISUAL PROGRESS TRACKER AGREGAT */}
      <Card className="border border-slate-200">
        <CardHeader className="py-3 bg-slate-50 border-b">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
            <BarChart2 size={13} /> Progres Tahapan Usulan Masyarakat
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-xs">
          
          <div className="grid grid-cols-5 gap-1.5 text-center font-bold">
            {[
              { label: 'Baru', val: 1, bg: 'bg-slate-100 text-slate-700 border-slate-200' },
              { label: 'Diperiksa', val: 1, bg: 'bg-orange-50 text-orange-700 border-orange-200' },
              { label: 'Dibahas', val: 1, bg: 'bg-purple-50 text-purple-700 border-purple-200' },
              { label: 'Diproses', val: 1, bg: 'bg-blue-50 text-blue-700 border-blue-200' },
              { label: 'Selesai', val: 1, bg: 'bg-green-50 text-green-700 border-green-200' },
            ].map((step, i) => (
              <div key={i} className={`p-2 border rounded-xl ${step.bg}`}>
                <p className="text-sm">{step.val}</p>
                <p className="text-[9px] uppercase mt-0.5">{step.label}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-400 mt-3 pt-2 border-t border-dashed">
            <span>Pembaharuan Terakhir: Hari ini, 10:20 WIB</span>
            <span>Data Simulasi Terkendali</span>
          </div>

        </CardContent>
      </Card>

      <h2 className="text-xs font-bold text-slate-650 uppercase tracking-wider">Daftar Usulan Terdaftar</h2>

      <div className="space-y-3.5 text-xs">
        {data.map(u => (
          <Card key={u.id} className="border border-slate-200 shadow-none">
            <CardContent className="p-4 space-y-3">
              
              <div className="flex justify-between items-start gap-2 flex-wrap text-[10px]">
                <div>
                  <span className="font-mono text-slate-400 font-bold mr-2">{u.id}</span>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">{u.kategori}</span>
                </div>
                <span className={`font-bold px-2 py-0.5 rounded border ${
                  u.status === 'Selesai' ? 'bg-green-50 text-green-755 border-green-200' :
                  u.status === 'Diproses' ? 'bg-blue-50 text-blue-755 border-blue-200' :
                  u.status === 'Dibahas' ? 'bg-purple-50 text-purple-755 border-purple-200' :
                  'bg-orange-50 text-orange-755 border-orange-200'
                }`}>{u.status}</span>
              </div>

              <div>
                <h3 className="font-bold text-slate-805 text-sm">{u.namaUsulan}</h3>
                <p className="text-slate-550 leading-relaxed mt-1 text-[11px] font-medium">{u.keterangan}</p>
              </div>

              <div className="border-t pt-2 flex justify-between items-center text-[9px] text-slate-450">
                <span>Tanggal Terdaftar: {u.tanggal}</span>
                <span className="flex items-center gap-0.5">Status: <strong>{u.status}</strong></span>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
