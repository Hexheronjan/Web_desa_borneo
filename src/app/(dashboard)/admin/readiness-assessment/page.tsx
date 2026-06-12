'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { AlertCircle, HelpCircle, Layers, CheckCircle } from 'lucide-react';

const COLOR = '#1a237e';

const readinessCriteria = [
  { no: 1, kriteria: 'Regulasi & Hukum Adat Tertulis', bobot: '15%', skor: '4.50/5', status: 'Selesai' },
  { no: 2, kriteria: 'Infrastruktur Konektivitas Internet Desa', bobot: '20%', skor: '3.25/5', status: 'Proses' },
  { no: 3, kriteria: 'Kompetensi Operator & SDM Desa', bobot: '15%', skor: '3.75/5', status: 'Selesai' },
  { no: 4, kriteria: 'Partisipasi & Penerimaan Warga Lokal', bobot: '10%', skor: '4.00/5', status: 'Selesai' },
  { no: 5, kriteria: 'Ketersediaan Anggaran APBDesa', bobot: '15%', skor: '3.50/5', status: 'Selesai' },
  { no: 6, kriteria: 'Dukungan Lembaga Adat & Damang', bobot: '15%', skor: '4.75/5', status: 'Selesai' },
  { no: 7, kriteria: 'Sistem Backup & Keandalan Daya Listrik', bobot: '10%', skor: '2.50/5', status: 'Rendah' }
];

export default function ReadinessAssessmentPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Readiness Assessment" modul="Modul 8: Kesiapan Smart Living" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Readiness Score" value="75.20" satuan="dari 100" barColor="teal" progress={75} />
        <StatCard label="Kriteria Dievaluasi" value={7} satuan="aspek" barColor="blue" progress={100} />
        <StatCard label="Status Kesiapan" value="Siap" satuan="menengah-tinggi" barColor="green" progress={80} />
        <StatCard label="Aspek Perlu Upgrade" value={2} satuan="kriteria" barColor="red" progress={28} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Layers size={16} /> Lembar Evaluasi Kesiapan Smart Living Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4">No</th>
                    <th className="pb-2 pr-4">Kriteria Penilaian</th>
                    <th className="pb-2 pr-4">Bobot</th>
                    <th className="pb-2 pr-4">Skor Aktual</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {readinessCriteria.map((c, i) => (
                    <tr key={c.no} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 text-slate-400 font-mono text-xs">{c.no}</td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700">{c.kriteria}</td>
                      <td className="py-2.5 pr-4 text-slate-500 text-xs">{c.bobot}</td>
                      <td className="py-2.5 pr-4 font-bold text-slate-800 font-mono text-xs">{c.skor}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                          c.status === 'Proses' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <AlertCircle size={16} /> Analisis & Solusi Kesiapan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs leading-relaxed text-slate-600">
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="font-bold text-red-800 mb-1 flex items-center gap-1">⚠️ Daya Listrik & Backup (2.50/5)</p>
              <p>Desa mengalami pemadaman listrik berkala dan belum memiliki UPS sentral untuk server SID.</p>
              <p className="font-semibold text-slate-700 mt-2">Rekomendasi: Alokasikan APBDesa untuk instalasi solar panel backup 3KVA.</p>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
              <p className="font-bold text-amber-800 mb-1 flex items-center gap-1">⚠️ Konektivitas Internet (3.25/5)</p>
              <p>Bandwidth internet desa saat ini hanya 20Mbps, tidak mencukupi untuk video streaming pembelajaran adat.</p>
              <p className="font-semibold text-slate-700 mt-2">Rekomendasi: Upgrade langganan VSAT / Fiber Optic ke paket 100Mbps.</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
              <p className="font-bold text-green-800 mb-1 flex items-center gap-1">✔️ Kelembagaan Adat (4.75/5)</p>
              <p>Dukungan Damang dan para Mantir sangat kuat terhadap digitalisasi warisan budaya Dayak.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
