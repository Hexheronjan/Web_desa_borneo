'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Compass, RefreshCw, BarChart2, CheckCircle2, AlertTriangle, ShieldCheck,
  Calendar, Clock, User, Link, FileText, ArrowRight, Activity
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

const RTL_DATA = [
  {
    id: 'RTL-01',
    dasarTindakan: 'Kesenjangan', // Kesenjangan, Rekomendasi, Keputusan
    kesenjangan: 'Ketersediaan sinyal internet di Dusun C tertinggal jauh dibanding Dusun A (selisih 15 poin)',
    tren: 'Meningkat perlahan setelah pemasangan tiang utama di awal Q2 2026',
    programTerkait: 'Pembangunan Jembatan TIK & Tower Dusun C',
    buktiPerubahan: 'Laporan_Instalasi_Tower_Dusun_C.pdf',
    kualitasData: 'Akurasi 98% (Diverifikasi Operator SID)',
    statusPencapaian: 'Dalam Pelaksanaan (Fisik 85% selesai)',
    dimensi: 'Infrastruktur TIK',
    indikatorRq1: 'Rasio jangkauan WiFi per Dusun (Indikator 14 dari 24 RQ1)',
  },
  {
    id: 'RTL-02',
    dasarTindakan: 'Rekomendasi DSS',
    kesenjangan: 'Skor Literasi Digital Guru PAUD rendah (skor 62 dari target 80)',
    tren: 'Stagnan dalam 2 periode terakhir karena tidak ada pelatihan terstruktur',
    programTerkait: 'Pelatihan Literasi Digital & Pengadaan Tablet KIA',
    buktiPerubahan: 'Sertifikat_Pelatihan_Guru_PAUD.pdf',
    kualitasData: 'Akurasi 92% (Data Dapodik Sektoral)',
    statusPencapaian: 'Telah Terealisasi 100%',
    dimensi: 'SDM & Literasi Digital',
    indikatorRq1: 'Persentase guru PAUD terlatih TIK (Indikator 05 dari 24 RQ1)',
  },
  {
    id: 'RTL-03',
    dasarTindakan: 'Keputusan Musdes',
    kesenjangan: 'BUMDes belum terintegrasi FinTech, transaksi masih 100% tunai',
    tren: 'Mulai beralih ke digital setelah go-live aplikasi POS di awal Juli 2026',
    programTerkait: 'Digitalisasi Layanan BUMDes Adat',
    buktiPerubahan: 'Screenshot_Aplikasi_BUMDes_LungAnai.png',
    kualitasData: 'Akurasi 100% (Verifikasi Rekening Bank BUMDes)',
    statusPencapaian: 'Telah Terealisasi 100%',
    dimensi: 'Ekonomi & BUMDes',
    indikatorRq1: 'Persentase transaksi non-tunai BUMDes (Indikator 18 dari 24 RQ1)',
  },
];

export default function RencanaTindakLanjutPage() {
  const [filterDasar, setFilterDasar] = useState('Semua');

  const filtered = filterDasar === 'Semua' ? RTL_DATA : RTL_DATA.filter(r => r.dasarTindakan === filterDasar);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Rencana Tindak Lanjut" modul="Pemerintah Desa" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-start gap-2.5">
        <Activity size={16} className="text-indigo-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Penelusuran Indikator RQ1</p>
          <p className="text-indigo-700 mt-0.5 font-medium leading-relaxed">
            Setiap rencana tindak lanjut (RTL) yang disusun harus dapat **ditelusuri secara langsung ke 6 dimensi kesiapan dan 24 indikator RQ1** yang telah disepakati dalam penilaian smart village.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Rencana (RTL)" value={RTL_DATA.length} satuan="Rencana Tercatat" barColor="purple" progress={100} />
        <StatCard label="Dasar Kesenjangan" value={RTL_DATA.filter(r => r.dasarTindakan === 'Kesenjangan').length} satuan="Hasil Evaluasi" barColor="red" progress={33} />
        <StatCard label="Dasar Rekomendasi" value={RTL_DATA.filter(r => r.dasarTindakan === 'Rekomendasi DSS').length} satuan="Alternatif AHP" barColor="blue" progress={33} />
        <StatCard label="Terealisasi" value={RTL_DATA.filter(r => r.statusPencapaian.includes('100%')).length} satuan="Rencana Selesai" barColor="green" progress={67} />
      </div>

      {/* FILTER DASAR TINDAKAN */}
      <div className="flex items-center justify-between flex-wrap gap-2 p-3 bg-slate-50 border rounded-xl">
        <span className="text-xs font-bold text-slate-705">Saring Berdasarkan Dasar Tindakan:</span>
        <div className="flex gap-1">
          {['Semua', 'Kesenjangan', 'Rekomendasi DSS', 'Keputusan Musdes'].map(d => (
            <button
              key={d}
              onClick={() => setFilterDasar(d)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors ${filterDasar === d ? 'bg-indigo-700 text-white' : 'bg-white border text-slate-600 hover:bg-slate-100'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* LIST RTL */}
      <div className="space-y-4">
        {filtered.map(r => (
          <Card key={r.id} className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-2 border-b bg-slate-50/50 py-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-200 uppercase tracking-wider">{r.dasarTindakan}</span>
                  <CardTitle className="text-xs font-bold text-slate-800 leading-snug mt-1.5">{r.programTerkait}</CardTitle>
                </div>
                <span className="text-[10px] text-slate-400 font-mono font-bold">{r.id}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-4 text-xs space-y-3.5">
              
              {/* DETAILS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <span className="font-bold text-slate-500 block">Kesenjangan Awal:</span>
                    <span className="text-slate-800 font-medium leading-relaxed block">{r.kesenjangan}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 block">Tren Perkembangan:</span>
                    <span className="text-slate-800 font-medium leading-relaxed block">{r.tren}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="font-bold text-slate-500 block">Kualitas Data Eviden:</span>
                    <span className="text-slate-800 font-medium leading-relaxed block">{r.kualitasData}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 block">Status Pencapaian Rencana:</span>
                    <span className="font-bold text-green-700 flex items-center gap-1 mt-0.5">
                      <CheckCircle2 size={13} /> {r.statusPencapaian}
                    </span>
                  </div>
                </div>
              </div>

              {/* BUKTI PERUBAHAN */}
              <div className="p-2.5 bg-slate-50 border rounded-lg flex items-center justify-between gap-4 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-500">Bukti Perubahan:</span>
                  <span className="font-semibold text-indigo-750 flex items-center gap-0.5"><FileText size={12} /> {r.buktiPerubahan}</span>
                </div>
                <span className="text-[10px] text-slate-400">Verifikasi Dokumen: OK</span>
              </div>

              {/* PENELUSURAN RQ1 */}
              <div className="p-3 bg-purple-50/50 border border-purple-100 rounded-xl">
                <p className="font-bold text-purple-900 text-[10px] uppercase tracking-wider mb-1">Ditelusuri ke Indikator Kunci (RQ1):</p>
                <p className="font-semibold text-purple-800 flex items-center gap-1.5">
                  <Compass size={13} className="text-purple-700" /> Dimensi: {r.dimensi} <ArrowRight size={11} /> {r.indikatorRq1}
                </p>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Rencana tindak lanjut terikat secara otomatis dengan RKPD Kabupaten</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
