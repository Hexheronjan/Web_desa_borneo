'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { 
  Lock, TrendingUp, AlertCircle, RefreshCw, BarChart2, ShieldAlert, Award, FileText
} from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const COLOR = '#6a1b9a';

const radarData = [
  { aspek: 'SDM & Literasi Digital', nilai: 68, target: 80 },
  { aspek: 'Infrastruktur Digital', nilai: 72, target: 85 },
  { aspek: 'Kesehatan', nilai: 75, target: 80 },
  { aspek: 'Ekonomi', nilai: 70, target: 75 },
  { aspek: 'Lingkungan', nilai: 69, target: 80 },
  { aspek: 'Sosial Budaya', nilai: 73, target: 85 },
  { aspek: 'Kelembagaan', nilai: 71, target: 80 },
];

const gaps = [
  { aspek: 'SDM & Literasi Digital', skor: 68, target: 80, gap: -12, prioritas: 'Sangat Tinggi' },
  { aspek: 'Infrastruktur Digital', skor: 72, target: 85, gap: -13, prioritas: 'Tinggi' },
  { aspek: 'Lingkungan', skor: 69, target: 80, gap: -11, prioritas: 'Sedang' },
];

export default function HasilReadinessPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Ringkasan Kesiapan Desa" modul="Tokoh Masyarakat" color={COLOR} />

      {/* READ ONLY BANNER / RESTRICTION */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-start gap-2.5 shadow-sm">
        <Lock size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Akses Tinjauan Terkunci (Read-Only)</p>
          <p className="text-amber-600 mt-0.5 font-medium leading-relaxed">
            Akun Anda tidak memiliki wewenang untuk: (1) Mengubah jawaban penilaian kesiapan, (2) Mengubah bobot indikator framework, (3) Memverifikasi bukti teknis (evidence), atau (4) Menjalankan ulang perhitungan indeks. Silakan hubungi <b>Administrator Sistem</b> atau <b>Peneliti</b> untuk penyesuaian tersebut.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Skor Kesiapan Akhir" value="74,30" satuan="Skor (0-100)" barColor="purple" progress={74} />
        <StatCard label="Kategori Kesiapan" value="BAIK / SIAP" satuan="Tingkat Desa" barColor="green" progress={100} />
        <StatCard label="Perubahan Indeks" value="+3,40%" satuan="dari periode lalu" barColor="blue" progress={100} />
        <StatCard label="Dimensi Dievaluasi" value="7 Dimensi" satuan="20 Indikator" barColor="orange" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* RADAR CHART DIMENSI */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart2 size={16} /> Grafik Radar Dimensi Kesiapan (Readiness)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 9, fill: '#475569', fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[40, 90]} tick={false} />
                  <Radar name="Skor Riil" dataKey="nilai" stroke="#6a1b9a" fill="#6a1b9a" fillOpacity={0.15} strokeWidth={2} />
                  <Radar name="Target Ideal" dataKey="target" stroke="#94a3b8" fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
                  <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-[10px] font-bold mt-2">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-purple-700 rounded-sm" /> Skor Riil Desa (74.30)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 border-t-2 border-dashed border-slate-400" /> Target Ideal Framework</span>
            </div>
          </CardContent>
        </Card>

        {/* KESENJANGAN & PRIORITAS */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <AlertCircle size={16} /> Kesenjangan Utama & Gaps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed">
              Berikut adalah 3 dimensi dengan kesenjangan (gap) terbesar antara kondisi riil desa saat ini dengan standar ideal:
            </p>
            <div className="space-y-3">
              {gaps.map((g, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">{g.aspek}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-100 text-red-700">{g.prioritas}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Skor: <b>{g.skor}</b> / Target: {g.target}</span>
                    <span className="text-red-600 font-bold">Selisih: {g.gap}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* PRIORITAS PERBAIKAN */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Award size={16} /> Prioritas Program Perbaikan
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-3 text-slate-600">
            <div className="p-3 bg-green-50/50 rounded-lg border border-green-100 space-y-1">
              <p className="font-bold text-green-900">1. Peningkatan Literasi & Kapasitas Digital Perangkat Desa</p>
              <p className="text-green-700 leading-normal">Meningkatkan kesiapan SDM melalui pelatihan rutin penggunaan komputer, layanan persuratan digital, dan pengumpulan bukti fisik terintegrasi.</p>
            </div>
            <div className="p-3 bg-green-50/50 rounded-lg border border-green-100 space-y-1">
              <p className="font-bold text-green-900">2. Pengadaan Booster Sinyal di Dusun Terpencil</p>
              <p className="text-green-700 leading-normal">Membantu mengurangi blank spot di Dusun B & C agar warga dapat mengakses layanan e-kesehatan dan LMS kelas desa secara lancar.</p>
            </div>
          </CardContent>
        </Card>

        {/* PENJELASAN SEDERHANA HASIL */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <FileText size={16} /> Penjelasan Ringkas Hasil
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
            <p>
              Indeks kesiapan (Readiness) Desa Adat Lung Anai mencapai <b>74,30</b> yang berarti desa berada pada kategori <b>BAIK / SIAP</b>. Hal ini menunjukkan infrastruktur dasar, kelembagaan adat, dan kepemimpinan desa cukup solid untuk mengadopsi model *Smart Living Village*.
            </p>
            <p>
              Namun, aspek <b>SDM & Literasi Digital</b> serta <b>Infrastruktur Digital</b> masih menjadi penghambat utama. Rekomendasi prioritas perbaikan dititikberatkan pada edukasi warga dan penutupan area blank spot sinyal seluler di tingkat dusun.
            </p>
          </CardContent>
        </Card>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50 mt-1">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Diperbarui otomatis dari Rekomendasi DSS & Framework Administrator Sistem</span>
        <span>Periode Assessment: Tahun 2026</span>
      </div>

    </div>
  );
}
