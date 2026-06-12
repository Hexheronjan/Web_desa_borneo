'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Landmark, CheckCircle2, Award } from 'lucide-react';

const COLOR = '#283593';

const culturalIndicators = [
  { name: 'Kondisi Fisik Rumah Adat Huma Betang', target: '90%', actual: '85%', status: 'Tercapai', color: 'bg-green-500' },
  { name: 'Digitalisasi Dokumen & Sejarah Adat', target: '80%', actual: '78%', status: 'Hampir Tercapai', color: 'bg-amber-500' },
  { name: 'Keaktifan Rapat & Musyawarah Adat', target: '100%', actual: '90%', status: 'Tercapai', color: 'bg-green-500' },
  { name: 'Penyelenggaraan Festival Adat Tahunan', target: '100%', actual: '67%', status: 'Perlu Usaha', color: 'bg-amber-500' }
];

export default function SDGs18Page() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="SDGs 18 — Kelembagaan Adat & Kelestarian Budaya" modul="Pemdes / Kepala Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Capaian SDGs 18" value="80%" satuan="skor kearifan lokal" barColor="orange" progress={80} />
        <StatCard label="Pengurus Lembaga" value="24" satuan="tokoh adat" barColor="green" progress={100} />
        <StatCard label="Arsip Digital" value="156" satuan="dokumen adat" barColor="purple" progress={78} />
        <StatCard label="Agenda Adat" value="12" satuan="rapat tahunan" barColor="blue" progress={60} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Landmark size={16} className="text-amber-600" /> Detail Capaian Kelestarian Adat Dayak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {culturalIndicators.map((ind, i) => (
                <div key={i} className="p-3 border rounded-xl bg-slate-50/50">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                    <span>{ind.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      ind.status === 'Tercapai' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>{ind.status}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${ind.color}`} style={{ width: ind.actual }} />
                    </div>
                    <div className="w-24 text-right text-xs">
                      <span className="text-slate-400 font-medium">Target: {ind.target}</span>
                      <span className="block font-black text-slate-800">{ind.actual}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Award size={16} /> Struktur Kelembagaan Adat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 leading-normal">
            <p>Pilar pelaksana pelestarian adat diatur oleh Lembaga Adat Desa:</p>
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
              <p className="font-bold text-amber-800 mb-1">Struktur Pemimpin Adat</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                <li>Damang Kepala Adat</li>
                <li>Mantir / Tetua Adat</li>
                <li>Pangkalima / Pengawal Adat</li>
              </ul>
            </div>
            <p className="pt-2 text-[10px] text-slate-400">
              *Tiap putusan hukum adat dicatat digital dalam arsip database desa (Modul 37).
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
