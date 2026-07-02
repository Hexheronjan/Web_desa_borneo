'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  MapPin, Users, Database, FileText, Calendar, Target,
  CheckCircle2, Clock, FlaskConical, BookOpen, Microscope
} from 'lucide-react';

const COLOR = '#1a365d';

const timeline = [
  { fase: 'Fase 1: Studi Literatur & Desain Framework', periode: 'Jan – Mar 2025', status: 'Selesai' },
  { fase: 'Fase 2: Pengumpulan Data & Assessment Lapangan', periode: 'Apr – Jun 2025', status: 'Selesai' },
  { fase: 'Fase 3: Analisis & Validasi Ahli', periode: 'Jul – Sep 2025', status: 'Selesai' },
  { fase: 'Fase 4: Evaluasi Sistem & Penyusunan Laporan', periode: 'Okt – Des 2025', status: 'Selesai' },
];

const lokasiSampel = [
  { label: 'Nama Desa', nilai: 'Desa Lung Anai' },
  { label: 'Kecamatan', nilai: 'Loa Kulu' },
  { label: 'Kabupaten / Kota', nilai: 'Kutai Kartanegara' },
  { label: 'Provinsi', nilai: 'Kalimantan Timur' },
  { label: 'Jumlah Penduduk', nilai: '±1.200 jiwa' },
  { label: 'Jumlah Responden', nilai: '146 orang' },
  { label: 'Teknik Sampling', nilai: 'Purposive Sampling' },
  { label: 'Tingkat Respons', nilai: '100%' },
];

const informasiPenelitian = [
  { label: 'Judul Penelitian', nilai: 'Pengembangan Framework Smart Living Village Readiness berbasis DSR untuk Desa Adat Borneo', fullRow: true },
  { label: 'Peneliti Utama', nilai: 'Joy Nashar' },
  { label: 'Institusi', nilai: 'Binus University' },
  { label: 'Metode Penelitian', nilai: 'Design Science Research (DSR)' },
  { label: 'Pendekatan', nilai: 'Mixed Method (Kuantitatif & Kualitatif)' },
  { label: 'Periode Penelitian', nilai: 'Januari – Desember 2025' },
  { label: 'Status', nilai: 'Selesai' },
];

export default function ResearchOverviewPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Profil Penelitian" modul="Research Overview" color={COLOR} />

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: MapPin, label: 'Lokasi', value: '1 Desa', sub: 'Desa Lung Anai', color: COLOR },
          { icon: Users, label: 'Sampel', value: '146', sub: 'Responden', color: '#276749' },
          { icon: Database, label: 'Dataset', value: '4', sub: 'Kategori Lengkap', color: '#553c9a' },
          { icon: CheckCircle2, label: 'Status', value: '100%', sub: 'Terkumpul', color: '#c05621' },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: kpi.color + '18' }}>
                <Icon size={20} style={{ color: kpi.color }} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">{kpi.label}</p>
                <p className="text-xl font-black text-gray-900 leading-tight">{kpi.value}</p>
                <p className="text-[11px] text-gray-500">{kpi.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Informasi Penelitian */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <BookOpen size={16} /> Informasi Penelitian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {informasiPenelitian.map((item, i) => (
                <div key={i} className={`p-2.5 rounded-lg bg-slate-50 border border-slate-100 ${item.fullRow ? '' : ''}`}>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5 leading-snug">{item.nilai}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lokasi & Sampel */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <MapPin size={16} /> Lokasi & Karakteristik Sampel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {lokasiSampel.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 bg-gray-50">
                  <span className="text-sm text-slate-600">{item.label}</span>
                  <span className="text-sm font-bold text-slate-800">{item.nilai}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Penelitian */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Calendar size={16} /> Timeline Penelitian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {timeline.map((t, i) => (
              <div key={i} className="relative p-3 rounded-xl border border-green-200 bg-green-50">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-[10px] font-bold text-green-700 uppercase">{t.status}</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 leading-snug mb-1">{t.fase}</p>
                <p className="text-[11px] text-slate-500 font-medium">{t.periode}</p>
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-green-200 flex items-center justify-center">
                  <span className="text-[9px] font-black text-green-800">{i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metode DSR */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Microscope size={16} /> Metode Design Science Research (DSR)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { no: '1', nama: 'Identifikasi Masalah', color: '#2b6cb0' },
              { no: '2', nama: 'Desain Framework', color: '#276749' },
              { no: '3', nama: 'Pengembangan Artefak', color: '#553c9a' },
              { no: '4', nama: 'Demonstrasi', color: '#c05621' },
              { no: '5', nama: 'Evaluasi', color: '#c53030' },
              { no: '6', nama: 'Komunikasi', color: '#d69e2e' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center p-3 rounded-xl border" style={{ borderColor: step.color + '40', backgroundColor: step.color + '08' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2 text-white text-sm font-black" style={{ backgroundColor: step.color }}>
                  {step.no}
                </div>
                <p className="text-[11px] font-semibold text-slate-700 leading-snug">{step.nama}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
