'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import {
  Target, AlertTriangle, ShieldCheck, RefreshCw, BarChart2, CheckCircle2
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

const READINESS_DIMENSI = [
  { dimensi: 'SDM & Literasi Digital', skor: 75, target: 85, indikator: 'Tingkat melek HP/internet, pelatihan perangkat, sertifikasi digital' },
  { dimensi: 'Tata Kelola & Kelembagaan', skor: 80, target: 90, indikator: 'SOP digital, keterbukaan informasi, regulasi perlindungan data' },
  { dimensi: 'Ekonomi & BUMDes', skor: 65, target: 80, indikator: 'Adopsi e-commerce UMKM, digitalisasi keuangan BUMDes' },
  { dimensi: 'Lingkungan & Ketahanan', skor: 70, target: 85, indikator: 'Sistem peringatan dini bencana, pengelolaan sampah digital' },
  { dimensi: 'Infrastruktur TIK', skor: 72, target: 90, indikator: 'Kecepatan internet, rasio jangkauan WiFi, tower BTS mandiri' },
  { dimensi: 'Sistem Informasi & Data', skor: 68, target: 85, indikator: 'Integrasi data SID, akurasi data kemiskinan/kesehatan' },
];

export default function PenilaianKesiapanPage() {
  const [activeTab, setActiveTab] = useState<'dimensi' | 'radar'>('dimensi');

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Penilaian Kesiapan (Readiness Assessment)" modul="Pemerintah Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Skor Kesiapan Desa" value="74.20" satuan="Skor (Baik)" barColor="blue" progress={74} />
        <StatCard label="Target Kesiapan" value="85.00" satuan="Target Smart Village" barColor="purple" progress={85} />
        <StatCard label="Dimensi Dinilai" value="6 Dimensi" satuan="Aspek Penilaian" barColor="green" progress={100} />
        <StatCard label="Status Pembaruan" value="Terverifikasi" satuan="Periode Semester I 2026" barColor="orange" progress={100} />
      </div>

      <div className="flex gap-2">
        <button onClick={() => setActiveTab('dimensi')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors border ${activeTab === 'dimensi' ? 'bg-indigo-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Daftar Dimensi & Indikator</button>
        <button onClick={() => setActiveTab('radar')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors border ${activeTab === 'radar' ? 'bg-indigo-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Grafik Radar Analisis</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* KONTEN UTAMA */}
        <div className="lg:col-span-2">
          {activeTab === 'dimensi' ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                  <BarChart2 size={16} /> Skor Kesiapan per Dimensi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3.5">
                  {READINESS_DIMENSI.map((d, i) => (
                    <div key={i} className="p-3.5 border rounded-xl bg-slate-50/50 space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                        <span>{d.dimensi}</span>
                        <span className="text-indigo-950">{d.skor} / {d.target}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="flex-1 bg-slate-100 rounded-full h-2">
                          <div className="h-2 rounded-full bg-indigo-700" style={{ width: `${d.skor}%` }} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">Target</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-snug">Indikator: {d.indikator}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                  <Target size={16} /> Analisis Radar Kesiapan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={READINESS_DIMENSI}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="dimensi" tick={{ fontSize: 9, fill: '#64748b' }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 8, fill: '#94a3b8' }} />
                      <Radar name="Skor Riil" dataKey="skor" stroke={COLOR} fill={COLOR} fillOpacity={0.3} strokeWidth={2} />
                      <Radar name="Target" dataKey="target" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={1} />
                      <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* REKOMENDASI UMUM KESIAPAN */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <AlertTriangle size={16} /> Prioritas Rekomendasi Kesiapan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5 text-xs">
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
              <p className="font-bold text-red-700">Dimensi Terendah: Ekonomi & BUMDes (65)</p>
              <p className="text-[10px] text-red-650 leading-relaxed font-medium">BUMDes memerlukan pendampingan digitalisasi kas, pemasaran online, dan pembentukan marketplace.</p>
            </div>
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl space-y-1">
              <p className="font-bold text-orange-700">Kedua: Sistem Informasi & Data (68)</p>
              <p className="text-[10px] text-orange-650 leading-relaxed font-medium">Akurasi data pada Regsosek & P3KE harus ditingkatkan untuk menghindari salah sasaran bantuan sosial.</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl space-y-1">
              <p className="font-bold text-green-700">Dimensi Tertinggi: Tata Kelola (80)</p>
              <p className="text-[10px] text-green-650 leading-relaxed font-medium">SOP digital telah berjalan optimal di balai desa, perlu dipertahankan.</p>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Data dikalkulasi otomatis oleh mesin DSS Smart Living Village</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
