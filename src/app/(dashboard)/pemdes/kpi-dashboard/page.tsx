'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  RefreshCw, BarChart2, CheckCircle2, AlertTriangle, Layers,
  Compass, ArrowRight, Activity, Landmark, FileText, ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

const KPI_DATA = [
  {
    indikator: 'Jangkauan Internet Desa',
    dimensi: 'Infrastruktur TIK',
    skorAwal: 60.0,
    skorTerkini: 74.2,
    target: 85.0,
    program: 'Pembangunan Jembatan TIK & Tower Dusun C',
    pj: 'Kasi Pemerintahan & Kominfo',
    waktu: 'Q3 2026 — Q4 2026',
    anggaran: 'Rp 80.000.000',
    bukti: 'Foto_Tower_Ready.png',
    progres: 85,
    status: 'berjalan', // direncanakan, berjalan, selesai, tertunda
    evaluasi: 'Tower berhasil dipasang di lahan hibah warga, tinggal menunggu integrasi kabel fiber optik utama.',
  },
  {
    indikator: 'Kapasitas Kader Posyandu Digital',
    dimensi: 'Kesehatan & SDM',
    skorAwal: 65.0,
    skorTerkini: 78.5,
    target: 90.0,
    program: 'Pengadaan Tablet KIA & Pelatihan Kader',
    pj: 'Bidan Desa & Kader Posyandu',
    waktu: 'Juli 2026 — Agustus 2026',
    anggaran: 'Rp 15.000.000',
    bukti: 'SK_Kader_Digital.pdf',
    progres: 100,
    status: 'selesai',
    evaluasi: 'Seluruh kader di 3 dusun telah lulus uji fungsi penginputan data KIA secara digital.',
  },
  {
    indikator: 'Digitasi Naskah Adat & Sastra Lisan',
    dimensi: 'Kelembagaan & Budaya',
    skorAwal: 72.0,
    skorTerkini: 82.15,
    target: 90.0,
    program: 'Perekaman Sastra Adat Dayak Kenyah',
    pj: 'Lembaga Adat & Karang Taruna',
    waktu: 'Oktober 2026',
    anggaran: 'Rp 25.000.000',
    bukti: 'Arsip_Audio_Dayak.mp3',
    progres: 10,
    status: 'direncanakan',
    evaluasi: 'Jadwal perekaman telah disinkronisasikan dengan agenda festival adat.',
  },
];

const STATUS_COLOR: Record<string, string> = {
  direncanakan: 'bg-slate-100 text-slate-650 border-slate-200',
  berjalan: 'bg-blue-100 text-blue-750 border-blue-200',
  selesai: 'bg-green-100 text-green-700 border-green-200',
  tertunda: 'bg-red-100 text-red-700 border-red-200',
};

export default function KpiDashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Progres Indikator" modul="Pemerintah Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Indikator" value={KPI_DATA.length} satuan="Indikator Kunci" barColor="purple" progress={100} />
        <StatCard label="Capaian Selesai" value={KPI_DATA.filter(k => k.status === 'selesai').length} satuan="KPI Terpenuhi" barColor="green" progress={33} />
        <StatCard label="Sedang Berjalan" value={KPI_DATA.filter(k => k.status === 'berjalan').length} satuan="Progres Aktif" barColor="blue" progress={33} />
        <StatCard label="Status KPI" value="Optimal" satuan="Indikator Kunci" barColor="orange" progress={80} />
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Rincian Progres Indikator Kerja Utama (KPI) Desa
        </h2>

        {KPI_DATA.map((k, idx) => (
          <Card key={idx} className="border border-slate-200">
            <CardHeader className="pb-2 border-b bg-slate-50/50 py-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-200 uppercase tracking-wider">{k.dimensi}</span>
                  <CardTitle className="text-xs font-bold text-slate-800 leading-snug mt-1.5">{k.indikator}</CardTitle>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${STATUS_COLOR[k.status]}`}>
                  {k.status.toUpperCase()}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-4 text-xs space-y-4">
              
              {/* SKOR COMPARISON */}
              <div className="grid grid-cols-3 gap-3 text-center border-b pb-3">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Skor Awal</p>
                  <p className="font-bold text-slate-700 text-sm mt-0.5">{k.skorAwal}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Skor Terkini</p>
                  <p className="font-bold text-indigo-700 text-sm mt-0.5">{k.skorTerkini}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Target</p>
                  <p className="font-bold text-slate-700 text-sm mt-0.5">{k.target}</p>
                </div>
              </div>

              {/* PROGRAM DETAILS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <p className="font-bold text-slate-700 text-[11px]">Program Kerja Terkait:</p>
                  <p className="font-semibold text-indigo-900">{k.program}</p>
                  <div className="text-[10px] text-slate-500 space-y-0.5">
                    <p>Penanggung Jawab: <strong>{k.pj}</strong></p>
                    <p>Waktu Pelaksanaan: <strong>{k.waktu}</strong></p>
                    <p>Estimasi Anggaran: <strong>{k.anggaran}</strong></p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-slate-700">Progres Program:</span>
                    <span className="font-bold text-indigo-700">{k.progres}%</span>
                  </div>
                  <div className="w-full bg-slate-105 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-indigo-700" style={{ width: `${k.progres}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-500 leading-snug">Bukti Pendukung: <strong>{k.bukti}</strong></p>
                </div>
              </div>

              {/* EVALUATION SECTION */}
              <div className="p-3 bg-purple-50/50 border border-purple-100 rounded-xl space-y-1.5">
                <p className="font-bold text-purple-900 text-[10px] uppercase tracking-wider">Hasil Evaluasi & Tindak Lanjut:</p>
                <p className="text-slate-650 leading-relaxed italic">"{k.evaluasi}"</p>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Terintegrasi dengan Sistem Informasi Pembangunan Daerah (SIPD)</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
