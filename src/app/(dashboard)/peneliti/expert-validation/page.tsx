'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { User, Award, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

const COLOR = '#1a365d';

const panelPakar = [
  {
    kode: 'Pakar P1',
    peran: 'Pakar Sistem Informasi & Smart Village',
    cakupan: 'Validitas isi 6 dimensi & 24 indikator (RQ1), perbandingan berpasangan AHP, serta paket evaluasi A2–A6',
    buktiRQ1: 'I-CVI & S-CVI/Ave pasca-revisi = 1,000; berkontribusi pada CR AHP dimensi = 0,001436',
    statusFormalA2A6: 'Instrumen Siap Verifikasi Formal (Tabel 4.27A)',
    color: '#2b6cb0',
  },
  {
    kode: 'Pakar P2',
    peran: 'Pakar Tata Kelola Desa & Kebijakan Pembangunan',
    cakupan: 'Validitas relevansi tata kelola pemerintahan desa, SDGs Desa 3, 4, 18, dan mekanisme musyawarah (DSS SAW)',
    buktiRQ1: 'I-CVI & S-CVI/Ave pasca-revisi = 1,000; revisi redaksi 6 indikator kandidat v1.0 → v1.2',
    statusFormalA2A6: 'Instrumen Siap Verifikasi Formal (Tabel 4.27A)',
    color: '#276749',
  },
  {
    kode: 'Pakar P3',
    peran: 'Pakar Sosial Budaya, Partisipasi & Tata Kelola Adat',
    cakupan: 'Validitas etika, persetujuan, klasifikasi data budaya (D5: I17–I20), dan keterlibatan multiaktor',
    buktiRQ1: 'I-CVI & S-CVI/Ave pasca-revisi = 1,000; penguatan indikator klasifikasi publik/terbatas/rahasia',
    statusFormalA2A6: 'Instrumen Siap Verifikasi Formal (Tabel 4.27A)',
    color: '#553c9a',
  },
];

const ringkasanValidasi = [
  { tahap: 'Validitas Isi Kerangka Kesiapan (RQ1 — Pra Revisi)', metrik: 'S-CVI/Ave = 0,9167', catatan: '18 indikator I-CVI 1,00; 6 indikator I-CVI 0,67 direvisi redaksi & definisinya', status: 'Direvisi' },
  { tahap: 'Validitas Isi Kerangka Kesiapan (RQ1 — Pasca Revisi v1.2)', metrik: 'S-CVI/Ave = 1,000', catatan: 'Seluruh 24 indikator mencapai I-CVI = 1,00 dari 3 pakar (P1–P3)', status: 'Terverifikasi' },
  { tahap: 'Konsistensi Pembobotan AHP (7 Matriks)', metrik: 'CR Dimensi = 0,00144', catatan: 'Seluruh 7 matriks (1 dimensi + 6 indikator) memiliki CR jauh di bawah 0,10 (maks 0,01739)', status: 'Terverifikasi' },
  { tahap: 'Validasi Formal Artefak A2–A6 (Tabel 4.27A)', metrik: 'Formulir Siap', catatan: 'Instrumen evaluasi pakar A2–A6 tersedia; pengesahan formal pakar belum diklaim selesai sampai lembar terautentikasi', status: 'Menunggu Pengesahan' },
];

export default function ExpertValidationPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Panel Validasi Pakar (P1–P3)" modul="Validasi &amp; Evaluasi Bab IV" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Panel Pakar', value: '3 Pakar', sub: 'P1, P2, dan P3', color: COLOR, icon: User },
          { label: 'S-CVI/Ave RQ1', value: '1,000', sub: 'Pra 0,9167 → Pasca 1,000', color: '#276749', icon: CheckCircle2 },
          { label: 'CR Dimensi AHP', value: '0,00144', sub: '7/7 Matriks Konsisten (< 0,10)', color: '#2b6cb0', icon: Award },
          { label: 'Status A2–A6', value: 'Instrumen Siap', sub: 'Menunggu lembar sah (Tabel 4.27A)', color: '#c05621', icon: AlertTriangle },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: kpi.color + '18' }}>
                <Icon size={18} style={{ color: kpi.color }} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">{kpi.label}</p>
                <p className="text-base font-black text-gray-900 leading-tight">{kpi.value}</p>
                <p className="text-[10px] text-gray-500">{kpi.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Card per Pakar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {panelPakar.map((exp) => (
          <Card key={exp.kode} className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: exp.color }}>
                <User size={16} /> {exp.kode}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-3 rounded-xl" style={{ backgroundColor: exp.color + '10' }}>
                <p className="font-black text-slate-800">{exp.peran}</p>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{exp.cakupan}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-green-50 border border-green-200">
                <p className="text-[10px] font-bold text-green-800 uppercase mb-0.5">Kontribusi RQ1 Terverifikasi</p>
                <p className="text-[11px] text-green-900">{exp.buktiRQ1}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                <p className="text-[10px] font-bold text-amber-800 uppercase mb-0.5">Status Artefak A2–A6</p>
                <p className="text-[11px] text-amber-900">{exp.statusFormalA2A6}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ringkasan Status Validasi */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <FileText size={16} /> Ringkasan Hasil &amp; Gerbang Bukti Validasi Pakar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th className="text-left py-2.5 px-3 text-[10px] font-bold text-gray-500 uppercase">Tahap Validasi</th>
                  <th className="text-left py-2.5 px-3 text-[10px] font-bold text-blue-700 uppercase">Capaian / Metrik</th>
                  <th className="text-left py-2.5 px-3 text-[10px] font-bold text-gray-500 uppercase">Keterangan Bab IV</th>
                  <th className="text-center py-2.5 px-3 text-[10px] font-bold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {ringkasanValidasi.map((r, i) => (
                  <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                    <td className="py-2.5 px-3 font-bold text-slate-800">{r.tahap}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-700">{r.metrik}</td>
                    <td className="py-2.5 px-3 text-slate-600">{r.catatan}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        r.status === 'Terverifikasi' ? 'bg-green-100 text-green-700' :
                        r.status === 'Direvisi' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {r.status}
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
  );
}
