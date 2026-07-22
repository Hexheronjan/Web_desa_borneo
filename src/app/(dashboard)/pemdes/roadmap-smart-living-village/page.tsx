'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Compass, RefreshCw, BarChart2, CheckCircle2, AlertTriangle, ShieldCheck,
  Calendar, Clock, User, Server, Layers, Link
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

const ROADMAP_STEPS = [
  {
    tahap: '1. Tahap Fondasi',
    program: 'Instalasi jaringan intranet desa & tower BTS',
    standardisasiData: 'Standardisasi format data profil kependudukan (KTP/KK)',
    integrasi: 'Integrasi awal database lokal dengan server kecamatan',
    pemantauan: 'Uji fungsi berkala koneksi jaringan harian',
    dss: 'Uji coba pembobotan kriteria AHP tingkat perangkat desa',
    perluasan: 'Pemasangan access point WiFi gratis di Balai Desa',
    evaluasi: 'Evaluasi kesiapan infrastruktur fisik (Readiness skor 70)',
    targetWaktu: 'Q1 - Q2 2025 (Selesai)',
    pj: 'Kasi Pemerintahan & Dinas Kominfo',
    ketergantungan: 'Penyelesaian lahan hibah tower warga',
    status: 'Selesai',
  },
  {
    tahap: '2. Peningkatan Kapasitas',
    program: 'Pelatihan literasi digital kader posyandu & guru PAUD',
    standardisasiData: 'Penyusunan format digital rekam medis posyandu & KIA',
    integrasi: 'Integrasi data kesehatan desa dengan aplikasi KIA Dinas',
    pemantauan: 'Pemantauan bulanan input data posyandu oleh Bidan Desa',
    dss: 'Penerapan DSS untuk penentuan prioritas program stunting',
    perluasan: 'Pembagian 12 unit tablet KIA untuk kader di 3 dusun',
    evaluasi: 'Evaluasi peningkatan literasi digital guru & kader (Maturity skor 2.5)',
    targetWaktu: 'Q3 - Q4 2025 (Selesai)',
    pj: 'Bidan Desa & Guru Fasilitator',
    ketergantungan: 'Kelancaran pasokan listrik desa harian',
    status: 'Selesai',
  },
  {
    tahap: '3. Integrasi & DSS Mapan',
    program: 'Digitalisasi manajemen keuangan BUMDes & e-commerce rotan',
    standardisasiData: 'Penyusunan kode produk dan data inventori BUMDes digital',
    integrasi: 'Integrasi POS BUMDes dengan gerbang pembayaran digital',
    pemantauan: 'Pemantauan transaksi mingguan oleh pengawas BUMDes',
    dss: 'Penggunaan DSS AHP SAW terintegrasi penuh untuk alokasi ADD 2026',
    perluasan: 'Peluncuran marketplace online anyaman rotan Lung Anai',
    evaluasi: 'Evaluasi efisiensi pelayanan & kenaikan pendapatan (QoL skor 71.28)',
    targetWaktu: 'Q1 - Q4 2026 (Kini Berjalan)',
    pj: 'Direktur BUMDes & Kasi Pembangunan',
    ketergantungan: 'Penyelesaian izin usaha BUMDes dari Kemenkumham',
    status: 'Berjalan',
  },
];

export default function RoadmapSmartLivingVillagePage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Roadmap Smart Living Village" modul="Pemerintah Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Tahapan" value="5 Tahap" satuan="Hingga Tahun 2028" barColor="purple" progress={100} />
        <StatCard label="Tahap Selesai" value="2 Tahap" satuan="Fondasi & Kapasitas" barColor="green" progress={40} />
        <StatCard label="Tahap Berjalan" value="Tahap 3" satuan="Integrasi & DSS" barColor="blue" progress={60} />
        <StatCard label="Status Kerja" value="Optimal" satuan="Roadmap Realistis" barColor="orange" progress={90} />
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-705 uppercase tracking-wider">
          Peta Jalan Implementasi *Roadmap Smart Living Village*
        </h2>

        <div className="relative border-l-2 border-indigo-200 pl-6 ml-2 space-y-6">
          {ROADMAP_STEPS.map((s, idx) => (
            <div key={idx} className="relative">
              {/* TIMELINE BULLET */}
              <div className={`absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full border-2 border-white flex items-center justify-center ${s.status === 'Selesai' ? 'bg-green-600' : 'bg-indigo-750'}`}>
                {s.status === 'Selesai' && <CheckCircle2 size={10} className="text-white" />}
              </div>

              <Card className={`border ${s.status === 'Berjalan' ? 'border-indigo-400 bg-indigo-50/10 shadow-sm' : ''}`}>
                <CardHeader className="pb-2 bg-slate-50/50 py-3 flex flex-row justify-between items-center flex-wrap gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-wider">{s.tahap}</span>
                    <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1"><Clock size={10} /> Target Waktu: {s.targetWaktu}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${s.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-750'}`}>{s.status}</span>
                </CardHeader>
                <CardContent className="pt-4 text-xs space-y-3">
                  
                  {/* GRID TAHAPAN */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                    <div className="p-2 bg-white border rounded-lg">
                      <p className="font-bold text-slate-500 uppercase text-[9px]">Program Utama</p>
                      <p className="text-slate-700 font-semibold mt-0.5">{s.program}</p>
                    </div>
                    <div className="p-2 bg-white border rounded-lg">
                      <p className="font-bold text-slate-500 uppercase text-[9px]">Standardisasi Data</p>
                      <p className="text-slate-700 font-semibold mt-0.5">{s.standardisasiData}</p>
                    </div>
                    <div className="p-2 bg-white border rounded-lg">
                      <p className="font-bold text-slate-500 uppercase text-[9px]">Integrasi</p>
                      <p className="text-slate-700 font-medium mt-0.5">{s.integrasi}</p>
                    </div>
                    <div className="p-2 bg-white border rounded-lg">
                      <p className="font-bold text-slate-500 uppercase text-[9px]">Pemantauan</p>
                      <p className="text-slate-700 font-medium mt-0.5">{s.pemantauan}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] border-t pt-2.5">
                    <div className="p-2 bg-indigo-50/20 border border-indigo-100 rounded-lg">
                      <p className="font-bold text-indigo-900 uppercase text-[9px] flex items-center gap-0.5"><Layers size={10} /> DSS Recommendation</p>
                      <p className="text-slate-650 font-semibold mt-0.5">{s.dss}</p>
                    </div>
                    <div className="p-2 bg-slate-50 border rounded-lg">
                      <p className="font-bold text-slate-500 uppercase text-[9px]">Perluasan Layanan</p>
                      <p className="text-slate-650 font-medium mt-0.5">{s.perluasan}</p>
                    </div>
                  </div>

                  {/* METADATA */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[10px] text-slate-500 pt-2 border-t border-dashed">
                    <p className="flex items-center gap-1"><User size={10} /> Penanggung Jawab: <strong>{s.pj}</strong></p>
                    <p className="flex items-center gap-1"><Link size={10} /> Ketergantungan Program: <strong>{s.ketergantungan}</strong></p>
                    <p className="flex items-center gap-1"><Compass size={10} /> Indikator Evaluasi: <strong>{s.evaluasi}</strong></p>
                  </div>

                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Peta jalan divalidasi berkala oleh tenaga ahli Smart Living Village</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
