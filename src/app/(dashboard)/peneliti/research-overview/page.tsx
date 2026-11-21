'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  MapPin, Users, Database, Calendar,
  CheckCircle2, BookOpen, Microscope,
} from 'lucide-react';
import { DESA_BAB4 } from '@/lib/bab4-data';

const COLOR = '#1a365d';

const timeline = [
  { fase: 'Tahap RQ1: SLR, Validasi Isi Pakar (P1–P3) & Survei Kesiapan 3 Desa', periode: 'Dataset SLV 1 (v1.2)', status: 'Selesai' },
  { fase: 'Tahap RQ2: Model Konseptual, Arsitektur 8 Lapisan, DSS SAW & Dasbor 7 Peran', periode: 'Dataset SLV 2 (v1.2)', status: 'Selesai' },
  { fase: 'Tahap RQ2–RQ3: Prototipe Web Final (35 Kelompok Fitur) & 4 Diagram UML', periode: 'Artefak A6', status: 'Selesai' },
  { fase: 'Tahap RQ3: Uji 4 Minggu (126 Partisipan), UAT, SUS, Kematangan & 54 KPI SDGs', periode: 'Dataset SLV 3 (v1.2)', status: 'Selesai' },
];

const lokasiSampel = [
  { label: 'Lokus 3 Desa Penelitian', nilai: 'Jonggon Jaya, Kedang Ipil, Lung Anai' },
  { label: 'Kecamatan', nilai: 'Loa Kulu & Kota Bangun Darat' },
  { label: 'Kabupaten / Provinsi', nilai: 'Kutai Kartanegara, Kalimantan Timur' },
  { label: 'Total Penduduk 3 Desa (BPS 2025)', nilai: '4.538 jiwa (2.553 + 1.505 + 480)' },
  { label: 'Jumlah Partisipan Evaluasi', nilai: '126 orang (42 partisipan / desa)' },
  { label: 'Komposisi 7 Peran Utama UML', nilai: '7 peran × 18 partisipan (6/peran/desa)' },
  { label: 'Panel Pakar Validasi', nilai: '3 Pakar (P1–P3)' },
  { label: 'Kematangan Complete-Case', nilai: 'N = 121 (5 responden missing parsial)' },
];

const informasiPenelitian = [
  { label: 'Fokus Penelitian', nilai: 'Pengembangan Kerangka Kesiapan, Model Konseptual, Arsitektur, DSS SAW, Dasbor 7 Peran, dan Prototipe Web Smart Living Village (Bab IV)' },
  { label: 'Metode Penelitian', nilai: 'Design Science Research Methodology (DSRM) + Kerangka Input–Process–Output (IPO)' },
  { label: 'Pendekatan', nilai: 'Mixed Method (Kuantitatif: AHP, SAW, Uji Berpasangan + Kualitatif: Validasi Pakar & Musyawarah)' },
  { label: 'Struktur Kerangka', nilai: '6 Dimensi (D1–D6), 24 Indikator (I01–I24), 6 Artefak (A1–A6), 35 Kelompok Fitur (F-001–F-035)' },
  { label: 'Paket Dataset Resmi', nilai: 'Dataset SLV 1, Dataset SLV 2, dan Dataset SLV 3 (Versi Final Terkunci v1.2)' },
  { label: 'Periode Penelitian', nilai: '2025 – 2026 (Evaluasi Lapangan Siklus 4 Minggu)' },
];

export default function ResearchOverviewPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Profil Penelitian (Bab IV)" modul="Research Overview" color={COLOR} />

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: MapPin, label: 'Lokus Penelitian', value: '3 Desa', sub: 'Kab. Kutai Kartanegara', color: COLOR },
          { icon: Users, label: 'Partisipan', value: '126', sub: '42/desa · 7 peran × 18', color: '#276749' },
          { icon: Database, label: 'Dataset Resmi', value: '3 Paket', sub: 'SLV 1, SLV 2, SLV 3 v1.2', color: '#553c9a' },
          { icon: CheckCircle2, label: 'Artefak DSRM', value: '6 Artefak', sub: 'A1–A6 · 35 Fitur UML', color: '#c05621' },
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
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <BookOpen size={16} /> Informasi Penelitian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {informasiPenelitian.map((item, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5 leading-snug">{item.nilai}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <MapPin size={16} /> Lokasi &amp; Karakteristik Sampel (Tabel 4.3)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {lokasiSampel.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-2 p-2.5 rounded-lg border border-gray-100 bg-gray-50">
                  <span className="text-xs text-slate-600">{item.label}</span>
                  <span className="text-xs font-bold text-slate-800 text-right">{item.nilai}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ringkasan 3 Desa */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <MapPin size={16} /> Profil Singkat 3 Desa Penelitian (BPS Kutai Kartanegara 2025 &amp; RQ1)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DESA_BAB4.map((d) => (
              <div key={d.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <p className="font-black text-slate-800">{d.nama}</p>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">{d.skorKesiapan.toFixed(2)} ({d.kategoriKesiapan})</span>
                </div>
                <p className="text-[11px] text-slate-500">Kec. {d.kecamatan} · {d.luasKm2.toFixed(2)} km² · {d.penduduk.toLocaleString('id-ID')} jiwa · {d.rt} RT</p>
                <p className="text-[11px] text-slate-600 leading-relaxed">{d.konteks}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline Penelitian */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Calendar size={16} /> Alur Tahapan RQ1 – RQ3
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

      {/* Metode DSRM */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Microscope size={16} /> Metode Design Science Research Methodology (DSRM + IPO)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { no: '1', nama: 'Identifikasi Masalah & Motivasi', color: '#2b6cb0' },
              { no: '2', nama: 'Tujuan Solusi (RQ1–RQ3)', color: '#276749' },
              { no: '3', nama: 'Desain & Pengembangan (A1–A6)', color: '#553c9a' },
              { no: '4', nama: 'Demonstrasi Prototipe (3 Desa)', color: '#c05621' },
              { no: '5', nama: 'Evaluasi 4 Minggu (N=126)', color: '#c53030' },
              { no: '6', nama: 'Komunikasi & Dokumentasi', color: '#d69e2e' },
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
