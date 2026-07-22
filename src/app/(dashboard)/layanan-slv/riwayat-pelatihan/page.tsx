'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Calendar, CheckCircle, Clock, XCircle, Filter,
  ArrowRight, Award, RefreshCw, BookOpen
} from 'lucide-react';
import { useState, useMemo } from 'react';
import Link from 'next/link';

const COLOR = '#2e7d32';

interface RiwayatBelajar {
  id: string;
  nama: string;
  penyelenggara: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  status: 'Selesai' | 'Dalam Proses' | 'Dibatalkan';
  nilaiEvaluasi: number | null;
  hasSertifikat: boolean;
  kategori: string;
  tahun: string;
}

const MOCK_RIWAYAT: RiwayatBelajar[] = [
  { id: 'R-01', nama: 'Pelatihan E-Commerce untuk Penjualan Lokal', penyelenggara: 'BUMDes & Dinkop', tanggalMulai: '10 Mei 2026', tanggalSelesai: '18 Mei 2026', status: 'Selesai', nilaiEvaluasi: 88, hasSertifikat: true, kategori: 'Teknologi', tahun: '2026' },
  { id: 'R-02', nama: 'Pembuatan Pupuk Organik Cair Mandiri', penyelenggara: 'Balai Pelatihan Pertanian', tanggalMulai: '01 Juni 2026', tanggalSelesai: '08 Juni 2026', status: 'Selesai', nilaiEvaluasi: 95, hasSertifikat: true, kategori: 'Pertanian', tahun: '2026' },
  { id: 'R-03', nama: 'Pencegahan Demam Berdarah & Malaria Sektoral', penyelenggara: 'Dinas Kesehatan Kabupaten', tanggalMulai: '15 April 2026', tanggalSelesai: '20 April 2026', status: 'Selesai', nilaiEvaluasi: 90, hasSertifikat: true, kategori: 'Kesehatan', tahun: '2026' },
  { id: 'R-04', nama: 'Dasar Pemrograman Web & Aplikasi Desa', penyelenggara: 'Kasi Pemerintahan Desa', tanggalMulai: '12 Juni 2026', tanggalSelesai: 'Sekarang', status: 'Dalam Proses', nilaiEvaluasi: null, hasSertifikat: false, kategori: 'Teknologi', tahun: '2026' },
  { id: 'R-05', nama: 'Pelatihan Budidaya Ikan Nila Kolam Terpal', penyelenggara: 'Dinas Kelautan & Perikanan', tanggalMulai: '10 Oktober 2025', tanggalSelesai: '12 Oktober 2025', status: 'Dibatalkan', nilaiEvaluasi: null, hasSertifikat: false, kategori: 'Pertanian', tahun: '2025' },
];

export default function RiwayatPelatihanPage() {
  const [list] = useState<RiwayatBelajar[]>(MOCK_RIWAYAT);
  const [filterTahun, setFilterTahun] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterKategori, setFilterKategori] = useState('Semua');

  const filtered = useMemo(() => {
    return list.filter(item => {
      const matchTahun = filterTahun === 'Semua' || item.tahun === filterTahun;
      const matchStatus = filterStatus === 'Semua' || item.status === filterStatus;
      const matchKategori = filterKategori === 'Semua' || item.kategori === filterKategori;
      return matchTahun && matchStatus && matchKategori;
    });
  }, [list, filterTahun, filterStatus, filterKategori]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Riwayat Pelatihan" modul="Masyarakat Umum" color={COLOR} />

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Pelatihan Diikuti" value={list.length} satuan="Program Terdaftar" barColor="purple" progress={100} />
        <StatCard label="Selesai (Lulus)" value={list.filter(item => item.status === 'Selesai').length} satuan="Kompeten" barColor="green" progress={60} />
        <StatCard label="Dalam Proses" value={list.filter(item => item.status === 'Dalam Proses').length} satuan="Modul Berjalan" barColor="blue" progress={20} />
        <StatCard label="Sertifikat Diterbitkan" value={list.filter(item => item.hasSertifikat).length} satuan="Siap Diunduh" barColor="orange" progress={60} />
      </div>

      {/* FILTERS */}
      <Card className="border border-slate-200">
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          
          <div className="space-y-1">
            <label className="font-bold text-slate-550 uppercase">Tahun:</label>
            <select value={filterTahun} onChange={e => setFilterTahun(e.target.value)} className="w-full p-2 border rounded-lg bg-white">
              <option value="Semua">Semua Tahun</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-550 uppercase">Status Kelulusan:</label>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="w-full p-2 border rounded-lg bg-white">
              <option value="Semua">Semua Status</option>
              <option value="Selesai">Selesai</option>
              <option value="Dalam Proses">Dalam Proses</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-550 uppercase">Kategori Bidang:</label>
            <select value={filterKategori} onChange={e => setFilterKategori(e.target.value)} className="w-full p-2 border rounded-lg bg-white">
              <option value="Semua">Semua Kategori</option>
              <option value="Teknologi">Teknologi</option>
              <option value="Pertanian">Pertanian</option>
              <option value="Kesehatan">Kesehatan</option>
            </select>
          </div>

        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
        
        {/* LIST VERTIKAL RIWAYAT */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold text-slate-650 uppercase tracking-wider">Berkas Riwayat Pelatihan Anda</h2>

          <div className="space-y-3">
            {filtered.map(item => (
              <Card key={item.id} className="border border-slate-200 shadow-none">
                <CardContent className="p-4 space-y-3.5">
                  
                  <div className="flex justify-between items-start gap-2 flex-wrap">
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 font-bold mr-2">{item.id}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        item.status === 'Selesai' ? 'bg-green-50 text-green-700 border border-green-200' :
                        item.status === 'Dalam Proses' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-red-50 text-red-750'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{item.tanggalMulai} - {item.tanggalSelesai}</span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-805 text-sm">{item.nama}</h3>
                    <p className="text-[10px] text-slate-500 mt-1 font-semibold">Penyelenggara: {item.penyelenggara}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-450 border-t pt-2.5">
                    <p>Bidang: <strong>{item.kategori}</strong></p>
                    <p>Nilai Ujian Evaluasi: <strong>{item.nilaiEvaluasi !== null ? `${item.nilaiEvaluasi}/100` : 'N/A'}</strong></p>
                  </div>

                  <div className="border-t pt-2.5 flex justify-end">
                    {item.hasSertifikat ? (
                      <Link
                        href="/layanan-slv/sertifikasi"
                        className="px-2.5 py-1 bg-indigo-700 text-white rounded font-bold hover:bg-indigo-800 flex items-center gap-1.5"
                      >
                        <Award size={12} /> Lihat Sertifikat
                      </Link>
                    ) : (
                      <span className="text-[10px] text-slate-450 italic">Sertifikat Belum Rilis</span>
                    )}
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* REKOMENDASI LANJUTAN */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-650 uppercase tracking-wider">Rekomendasi Lanjutan</h2>

          <Card className="border-l-4 border-l-orange-500 bg-orange-50/10">
            <CardHeader className="py-2.5 px-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <BookOpen size={13} className="text-orange-600" /> Pelatihan yang Disarankan:
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3 space-y-2 leading-relaxed">
              <div className="p-2 bg-white border rounded">
                <p className="font-bold text-slate-800">1. Digital Marketing untuk UMKM Desa</p>
                <p className="text-[9px] text-slate-450">Tingkat: Menengah • Durasi: 14 Jam</p>
              </div>
              <div className="p-2 bg-white border rounded">
                <p className="font-bold text-slate-800">2. Irigasi Tetes Cerdas Lahan Gambut</p>
                <p className="text-[9px] text-slate-450">Tingkat: Mahir • Durasi: 20 Jam</p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
