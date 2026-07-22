'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts';
import {
  ShieldCheck, RefreshCw, BarChart2, CheckCircle2, AlertTriangle, Layers,
  Compass, ArrowRight, Activity, Landmark, FileText, ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

// 6 Dimensi & 24 Indikator
const INDIKATOR_24 = [
  { dimensi: 'SDM & Literasi', ind: 'Tingkat Melek Digital Warga', skor: 75, target: 85, wilayah: 'Dusun B' },
  { dimensi: 'SDM & Literasi', ind: 'Pelatihan Perangkat Desa', skor: 80, target: 90, wilayah: 'Dusun A' },
  { dimensi: 'Tata Kelola', ind: 'Implementasi SOP Digital', skor: 82, target: 90, wilayah: 'Dusun A' },
  { dimensi: 'Infrastruktur', ind: 'Kecepatan Koneksi Internet', skor: 70, target: 85, wilayah: 'Dusun C' },
  { dimensi: 'Kesehatan', ind: 'Partisipasi Posyandu', skor: 72, target: 90, wilayah: 'Dusun B' },
  { dimensi: 'Ekonomi', ind: 'Adopsi FinTech BUMDes', skor: 64, target: 80, wilayah: 'Dusun A' },
];

export default function HasilPenilaianDesaPage() {
  const [compMode, setCompMode] = useState<'periode' | 'dimensi' | 'wilayah' | 'target'>('periode');

  // Comparison Data
  const compData = {
    periode: [
      { name: 'Q1 2025', kesiapan: 68.2, kematangan: 2.3, qol: 65.5 },
      { name: 'Q2 2025', kesiapan: 70.5, kematangan: 2.5, qol: 67.8 },
      { name: 'Q3 2025', kesiapan: 72.1, kematangan: 2.7, qol: 69.4 },
      { name: 'Q4 2025 (Kini)', kesiapan: 74.2, kematangan: 2.95, qol: 71.28 },
    ],
    dimensi: [
      { name: 'SDM', kesiapan: 75, kematangan: 2.8, qol: 72 },
      { name: 'Tata Kelola', kesiapan: 80, kematangan: 3.2, qol: 78 },
      { name: 'Ekonomi', kesiapan: 65, kematangan: 2.4, qol: 68 },
      { name: 'Lingkungan', kesiapan: 70, kematangan: 2.6, qol: 70 },
      { name: 'Infrastruktur', kesiapan: 72, kematangan: 2.9, qol: 74 },
      { name: 'Sistem Data', kesiapan: 68, kematangan: 2.5, qol: 66 },
    ],
    wilayah: [
      { name: 'Dusun A', kesiapan: 78.4, kematangan: 3.1, qol: 75.2 },
      { name: 'Dusun B', kesiapan: 73.1, kematangan: 2.8, qol: 70.8 },
      { name: 'Dusun C', kesiapan: 68.5, kematangan: 2.5, qol: 66.4 },
    ],
    target: [
      { name: 'Awal (Kondisi Awal)', kesiapan: 60.0, kematangan: 2.0, qol: 55.0 },
      { name: 'Realisasi (Kini)', kesiapan: 74.2, kematangan: 2.95, qol: 71.28 },
      { name: 'Target (Smart Village)', kesiapan: 85.0, kematangan: 4.0, qol: 80.0 },
    ]
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Hasil Penilaian Desa" modul="Pemerintah Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Skor Kesiapan" value="74.20" satuan="Skor (Baik)" barColor="blue" progress={74} />
        <StatCard label="Tingkat Kematangan" value="Berkembang" satuan="Level 2.95 / 5.0" barColor="purple" progress={59} />
        <StatCard label="Skor Kualitas Hidup" value="71.28" satuan="Skor (Baik)" barColor="green" progress={71} />
        <StatCard label="Kualitas Data" value="Sangat Baik" satuan="Verifikasi Kemendagri" barColor="orange" progress={95} />
      </div>

      {/* FILTER PERBANDINGAN */}
      <div className="flex items-center justify-between flex-wrap gap-2 p-3 bg-slate-50 border rounded-xl">
        <span className="text-xs font-bold text-slate-700">Fungsi Perbandingan Hasil Penilaian:</span>
        <div className="flex gap-1">
          {[
            { key: 'periode', label: 'Antarperiode' },
            { key: 'dimensi', label: 'Antardimensi' },
            { key: 'wilayah', label: 'Antarwilayah / Dusun' },
            { key: 'target', label: 'Kondisi Awal vs Target' }
          ].map(opt => (
            <button
              key={opt.key}
              onClick={() => setCompMode(opt.key as any)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors ${compMode === opt.key ? 'bg-indigo-700 text-white' : 'bg-white border text-slate-600 hover:bg-slate-100'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* GRAFIK PERBANDINGAN */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart2 size={16} /> Grafik Perbandingan ({compMode === 'periode' ? 'Tren Waktu' : compMode === 'dimensi' ? 'Skor per Dimensi' : compMode === 'wilayah' ? 'Analisis Wilayah' : 'Kondisi Awal vs Target'})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={compData[compMode]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="kesiapan" name="Kesiapan (Skor)" fill="#283593" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="qol" name="Kualitas Hidup (Skor)" fill="#2e7d32" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* RINGKASAN KESENJANGAN & PRIORITAS TINDAKAN */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <AlertTriangle size={16} /> Kesenjangan & Prioritas Tindakan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5 text-xs">
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
              <p className="font-bold text-red-700">Kesenjangan Tertinggi (Ekonomi)</p>
              <p className="text-[10px] text-red-650 leading-relaxed font-medium">Selisih skor ekonomi riil (65) dengan target (80) adalah 15 poin. Tindakan prioritas: revitalisasi BUMDes.</p>
            </div>
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl space-y-1">
              <p className="font-bold text-orange-700">Prioritas Tindakan TIK</p>
              <p className="text-[10px] text-orange-650 leading-relaxed font-medium">Meningkatkan koneksi internet di Dusun C karena skor TIK di dusun tersebut masih tertinggal dibanding Dusun A.</p>
            </div>
            <div className="p-3 bg-slate-50 border rounded-xl space-y-1.5">
              <p className="font-bold text-slate-700">Sumber & Bukti Assessment</p>
              <p className="text-[10px] text-slate-500 leading-snug flex items-center gap-1"><FileText size={11} /> Dokumen Eviden: <em>SK_Layanan_Digital_2026.pdf</em></p>
              <p className="text-[10px] text-slate-500 leading-snug flex items-center gap-1"><ShieldCheck size={11} /> Status: Terverifikasi oleh Dinas PMD</p>
            </div>
          </CardContent>
        </Card>

        {/* 6 DIMENSI & 24 INDIKATOR DETAIL */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Layers size={16} /> Rincian 6 Dimensi & Sampel Indikator (Total 24 Indikator)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold text-left">
                  <tr>
                    <th className="p-2.5">Dimensi</th>
                    <th className="p-2.5">Indikator Kunci</th>
                    <th className="p-2.5">Wilayah Sampel</th>
                    <th className="p-2.5 text-right">Skor Riil</th>
                    <th className="p-2.5 text-right">Target</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {INDIKATOR_24.map((i, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-2.5 font-semibold text-slate-700">{i.dimensi}</td>
                      <td className="p-2.5 text-slate-600">{i.ind}</td>
                      <td className="p-2.5 text-slate-500">{i.wilayah}</td>
                      <td className="p-2.5 text-right font-bold text-slate-700">{i.skor}</td>
                      <td className="p-2.5 text-right font-bold text-slate-450">{i.target}</td>
                      <td className="p-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${i.skor >= i.target - 5 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {i.skor >= i.target - 5 ? 'Optimal' : 'Kesenjangan'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Data hasil penilaian tersinkronisasi dengan dasbor strategis kabupaten</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
