'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { 
  ShieldCheck, Heart, GraduationCap, Users2, Shield, Calendar, RefreshCw, BarChart2, Smile, TrendingUp
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLOR = '#6a1b9a';

const qolAggregateData = [
  { aspek: 'Kesehatan', skor: 72.4, target: 80 },
  { aspek: 'Pendidikan', skor: 70.8, target: 80 },
  { aspek: 'Ekonomi', skor: 72.1, target: 75 },
  { aspek: 'Lingkungan', skor: 69.3, target: 75 },
  { aspek: 'Sosial Budaya', skor: 70.5, target: 85 },
  { aspek: 'Kepuasan Layanan', skor: 74.5, target: 80 },
];

export default function HasilQoLPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Ringkasan Kualitas Hidup Masyarakat" modul="Tokoh Masyarakat" color={COLOR} />

      {/* PRIVACY WARNING */}
      <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold flex items-start gap-2.5 shadow-sm">
        <ShieldCheck size={16} className="text-purple-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Penyajian Data Agregat Tingkat Desa</p>
          <p className="text-purple-600 mt-0.5 font-medium leading-relaxed">
            Seluruh data kualitas hidup (QoL) di bawah ini disajikan pada tingkat desa atau kelompok besar masyarakat untuk melindungi kerahasiaan dan privasi data individu warga.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Indeks QoL Agregat" value="71,28" satuan="Skor Baik" barColor="purple" progress={71} />
        <StatCard label="Tingkat Kepuasan" value="74,50" satuan="Skor Kepuasan" barColor="green" progress={74} />
        <StatCard label="Partisipasi Warga" value="95%" satuan="Keikutsertaan Survei" barColor="blue" progress={95} />
        <StatCard label="Perubahan Indeks" value="+2,50%" satuan="dari semester lalu" barColor="orange" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* GRAFIK SKOR DIMENSI */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart2 size={16} /> Skor Agregat Kualitas Hidup per Bidang
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={qolAggregateData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="aspek" tick={{ fontSize: 9, fill: '#64748b', fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[50, 90]} tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8 }} />
                  <Bar dataKey="skor" fill="#6a1b9a" radius={[4, 4, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-2 italic">
              Grafik perbandingan skor kualitas hidup per bidang (Semester I 2026)
            </p>
          </CardContent>
        </Card>

        {/* STATISTIK AGREGAT KESEHATAN & SOSIAL */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Smile size={16} /> Indikator Sosial & Pelayanan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="space-y-2">
              <p className="font-bold text-slate-700">Kondisi Kesehatan Agregat:</p>
              <div className="p-2.5 bg-slate-50 border rounded-lg space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-500">Imunisasi Lengkap Balita:</span>
                  <span className="font-bold text-slate-700">92%</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-slate-500">Tingkat Penurunan Stunting:</span>
                  <span className="font-bold text-slate-700">14% (Kategori Aman)</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-slate-700">Akses & Keberlanjutan Budaya:</p>
              <div className="p-2.5 bg-slate-50 border rounded-lg space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-500">Akses Pendidikan Adat:</span>
                  <span className="font-bold text-slate-700">88% Terjangkau</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-slate-500">Partisipasi Musyawarah Adat:</span>
                  <span className="font-bold text-slate-700">94% Keterlibatan</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-slate-500">Keamanan & Kenyamanan Lingkungan:</span>
                  <span className="font-bold text-slate-700">98% Sangat Aman</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* PERUBAHAN ANTARPERIODE */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Tren Perubahan Antarperiode (Semester)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
            <p>
              Dibandingkan semester sebelumnya, Indeks Kualitas Hidup Masyarakat mengalami peningkatan sebesar <b>+2,50%</b> (dari 69.54 menjadi 71.28). Kenaikan ini utamanya dipicu oleh perbaikan akses internet desa yang berdampak langsung pada kelancaran layanan administrasi dan pendidikan online.
            </p>
            <p>
              Dimensi yang masih memerlukan fokus perhatian adalah <b>Kondisi Kebersihan Lingkungan</b> (skor 69.3) berkaitan dengan pengelolaan dan pengangkutan sampah di TPS dusun.
            </p>
          </CardContent>
        </Card>

        {/* SATISFACTION SUMMARY */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Heart size={16} /> Akses & Kepuasan Pelayanan Publik
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
            <p>
              Hasil agregat survei menunjukkan indeks kepuasan terhadap pelayanan publik desa mencapai <b>74.50 (Baik)</b>. Akses pelayanan kesehatan Posyandu digital memperoleh skor kepuasan tertinggi sebesar 4.35 dari 5.00.
            </p>
            <p>
              Warga berharap adanya perbaikan pada layanan prasarana jalan yang rusak guna menunjang transportasi hasil tani anyaman rotan dan akses darurat kesehatan di malam hari.
            </p>
          </CardContent>
        </Card>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50 mt-1">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Data bersumber dari agregasi survei kepuasan berkala warga</span>
        <span>Semester I Tahun 2026</span>
      </div>

    </div>
  );
}
