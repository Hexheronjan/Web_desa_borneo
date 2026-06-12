'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Smile, Heart, GraduationCap, Users, ShieldAlert, Sparkles } from 'lucide-react';

const COLOR = '#1a237e';

const qolDimensions = [
  { name: 'Kesehatan Desa', value: 4.35, max: 5.0, icon: Heart, color: 'text-red-500', bg: 'bg-red-50', barColor: 'bg-red-500' },
  { name: 'Pendidikan Budaya & Umum', value: 4.10, max: 5.0, icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-50', barColor: 'bg-blue-500' },
  { name: 'Interaksi & Modal Sosial', value: 4.00, max: 5.0, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50', barColor: 'bg-purple-500' },
  { name: 'Keberlanjutan Lingkungan', value: 3.80, max: 5.0, icon: ShieldAlert, color: 'text-green-500', bg: 'bg-green-50', barColor: 'bg-green-500' },
  { name: 'Kesejahteraan Ekonomi', value: 3.80, max: 5.0, icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-50', barColor: 'bg-amber-500' }
];

export default function QualityOfLifePage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Quality of Life Index" modul="Modul 11: Kualitas Hidup" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Quality of Life Index" value="76.80" satuan="dari 100" barColor="purple" progress={77} />
        <StatCard label="Tingkat Kepuasan" value="Baik" satuan="tingkat kepuasan" barColor="green" progress={82} />
        <StatCard label="Indikator Unggul" value="Kesehatan" satuan="skor 4.35" barColor="blue" progress={87} />
        <StatCard label="Aspek Ditingkatkan" value="Energi & Sampah" satuan="skor 3.80" barColor="orange" progress={76} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Smile size={16} /> Skor Kualitas Hidup per Dimensi (Skala Likert 1.00 - 5.00)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {qolDimensions.map((dim, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${dim.bg} flex-shrink-0`}>
                  <dim.icon className={`w-5 h-5 ${dim.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>{dim.name}</span>
                    <span>{dim.value.toFixed(2)} / {dim.max.toFixed(1)}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${dim.barColor} transition-all`} style={{ width: `${(dim.value / dim.max) * 100}%` }} />
                  </div>
                </div>
                <span className="text-sm font-extrabold text-slate-800 font-mono w-10 text-right">
                  {Math.round((dim.value / dim.max) * 100)}%
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Users size={16} /> Data Pengukuran Warga
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-600 leading-normal space-y-4">
            <p>Index ini diperoleh dari survei digital berkala warga (Modul 50) yang meliputi:</p>
            <div className="space-y-2.5">
              {[
                { label: 'Jumlah Responden Warga', val: '146 responden' },
                { label: 'Consistency Rate Jawaban', val: '92.4% (Konsisten)' },
                { label: 'Frekuensi Pengukuran', val: '6 Bulan Sekali' },
                { label: 'Tanggal Survei Terakhir', val: '28 Mei 2026' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between border-b pb-1">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="font-semibold text-slate-700">{item.val}</span>
                </div>
              ))}
            </div>
            <p className="pt-2 border-t text-slate-400 text-[10px]">
              *Data dihitung secara otomatis oleh DSS Engine menggunakan kuesioner skala Likert terstandardisasi.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
