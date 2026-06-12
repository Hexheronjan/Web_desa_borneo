'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Smile, Heart, GraduationCap, Users, ShieldAlert, Sparkles } from 'lucide-react';

const COLOR = '#283593';

const qolMetrics = [
  { name: 'Kesehatan Masyarakat', value: 4.35, max: 5.0, icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
  { name: 'Pendidikan & Literasi', value: 4.10, max: 5.0, icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-50' },
  { name: 'Keterikatan Sosial Adat', value: 4.00, max: 5.0, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
  { name: 'Kebersihan Lingkungan', value: 3.80, max: 5.0, icon: ShieldAlert, color: 'text-green-500', bg: 'bg-green-50' },
  { name: 'Kemakmuran Ekonomi', value: 3.80, max: 5.0, icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-50' }
];

export default function PemdesQoLPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Quality of Life Index" modul="Pemdes / Kepala Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="QoL Index Desa" value="76.80" satuan="Skor Baik" barColor="purple" progress={77} />
        <StatCard label="Indikator Terbaik" value="Kesehatan" satuan="4.35 / 5.0" barColor="green" progress={87} />
        <StatCard label="Total Responden" value={146} satuan="kepala keluarga" barColor="blue" progress={90} />
        <StatCard label="Margin of Error" value="4.8%" satuan="sangat presisi" barColor="green" progress={95} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Smile size={16} /> Skor Kualitas Hidup Warga per Kategori Penilaian
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {qolMetrics.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.bg} flex-shrink-0`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>{item.name}</span>
                    <span>{item.value.toFixed(2)} / {item.max.toFixed(1)}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${COLOR === '#283593' ? 'bg-indigo-700' : 'bg-teal-600'} transition-all`} style={{ width: `${(item.value / item.max) * 100}%` }} />
                  </div>
                </div>
                <span className="text-xs font-bold font-mono text-slate-700 w-10 text-right">
                  {Math.round((item.value / item.max) * 100)}%
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Users size={16} /> Survei Kepuasan Warga
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 leading-normal">
            <p>Hasil survei berkala (Modul 50) yang diisi secara online oleh warga membuktikan:</p>
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg space-y-1">
              <p className="font-bold text-indigo-900">Kesimpulan Kualitatif:</p>
              <p>Kepuasan hidup tergolong <strong>BAIK</strong>. Pelayanan administrasi surat online (Modul 48) dan monitoring Posyandu (Modul 45) adalah pendorong kepuasan utama.</p>
            </div>
            <p className="pt-2 text-[10px] text-slate-400">
              *Survei dijalankan secara anonim demi menjamin objektivitas tanggapan warga.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
