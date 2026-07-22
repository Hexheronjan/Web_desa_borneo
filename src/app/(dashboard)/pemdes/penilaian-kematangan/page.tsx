'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { RefreshCw, BarChart2, ShieldCheck } from 'lucide-react';

const COLOR = '#283593';

export default function PenilaianKematanganPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Penilaian Kematangan" modul="Pemerintah Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Tingkat Kematangan" value="2.95 / 5.0" satuan="Level Berkembang" barColor="purple" progress={59} />
        <StatCard label="Dimensi Dinilai" value="5 Dimensi" satuan="Aspek Tata Kelola" barColor="blue" progress={100} />
        <StatCard label="Status Validasi" value="Optimal" satuan="Maturity Level" barColor="green" progress={90} />
        <StatCard label="Periode" value="Semester II 2025" satuan="Tahun Berjalan" barColor="orange" progress={100} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <BarChart2 size={16} /> Detail Tingkat Kematangan Tata Kelola Desa (Maturity Assessment)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>Tingkat Kematangan (Maturity Level) mengukur kemapanan tata kelola dan efisiensi birokrasi digital di Desa Lung Anai. Skor saat ini berada di level <strong>2.95 (Berkembang)</strong>, mendekati target level 3.00 (Mapan).</p>
          <div className="space-y-2">
            {[
              { level: 'Level 1: Rintisan', desc: 'Proses tata kelola belum terstandarisasi digital' },
              { level: 'Level 2: Berkembang (Kini)', desc: 'Layanan administrasi dasar telah berjalan online, data mulai terintegrasi' },
              { level: 'Level 3: Mapan', desc: 'Seluruh sistem desa terintegrasi penuh dengan Dinas PMD' },
            ].map((l, i) => (
              <div key={i} className={`p-2.5 border rounded-lg ${i === 1 ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50'}`}>
                <p className="font-bold text-slate-700">{l.level}</p>
                <p className="text-[10px] text-slate-500">{l.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
