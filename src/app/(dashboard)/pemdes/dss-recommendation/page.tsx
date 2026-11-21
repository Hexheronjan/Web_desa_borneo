'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { ListOrdered, RefreshCw, ArrowRight, AlertTriangle, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { DSS_KRITERIA_SAW } from '@/lib/bab4-data';

const COLOR = '#283593';

type StatusRek = 'Baru' | 'Diverifikasi' | 'Dijadwalkan untuk Musyawarah' | 'Diputuskan' | 'Ditindaklanjuti';

const ALUR_STATUS: StatusRek[] = ['Baru', 'Diverifikasi', 'Dijadwalkan untuk Musyawarah', 'Diputuskan', 'Ditindaklanjuti'];

const STATUS_COLOR: Record<StatusRek, string> = {
  'Baru': 'bg-sky-100 text-sky-700',
  'Diverifikasi': 'bg-yellow-100 text-yellow-700',
  'Dijadwalkan untuk Musyawarah': 'bg-orange-100 text-orange-700',
  'Diputuskan': 'bg-teal-100 text-teal-700',
  'Ditindaklanjuti': 'bg-purple-100 text-purple-700',
};

const PROGRAMS = [
  {
    id: 'A08-JJ',
    desa: 'Desa Jonggon Jaya',
    rank: 1,
    name: 'A08 — Dasbor SDGs Desa 3, 4, dan 18',
    score: 0.950907,
    cost: 'Rp 220.000.000',
    waktu: 'Implementasi Bertahap 2026',
    risiko: 'Rendah–Sedang (Butuh konsistensi pembaruan data lintas layanan)',
    prasyarat: 'Integrasi data Puskesmas Jonggon Jaya, satuan pendidikan, dan verifikasi Pemdes',
    sensitivitas: '13/13 skenario uji sensitivitas bobot ±10% tetap stabil pada peringkat #1',
    kontribusiKriteria: 'C1=0,250000 (r1=1,0000) · C2=0,178180 (r2=0,8909) · C3=0,150000 · C4=0,150000 · C5=0,150000 · C6=0,072727 (r6=160/220)',
    status: 'Dijadwalkan untuk Musyawarah' as StatusRek,
  },
  {
    id: 'A02-KI',
    desa: 'Desa Kedang Ipil',
    rank: 1,
    name: 'A02 — Penguatan Konektivitas dan Perangkat',
    score: 0.920042,
    cost: 'Rp 195.000.000',
    waktu: 'Implementasi Bertahap 2026',
    risiko: 'Sedang (Menghubungkan modal adat D5=86,58 dengan integrasi data D4=47,44)',
    prasyarat: 'Koordinasi Pemdes, Kutai Adat Lawas Sumping Layang, Pustu/Polindes & sekolah',
    sensitivitas: '13/13 skenario uji sensitivitas bobot ±10% tetap stabil pada peringkat #1',
    kontribusiKriteria: 'Kesenjangan D2 (48,40) & D4 (47,44) dengan bobot tertinggi AHP D2 (0,17308)',
    status: 'Diverifikasi' as StatusRek,
  },
  {
    id: 'A02-LA',
    desa: 'Desa Lung Anai',
    rank: 1,
    name: 'A02 — Penguatan Konektivitas dan Perangkat (Mode Luring-Utama)',
    score: 0.911694,
    cost: 'Rp 185.000.000',
    waktu: 'Implementasi Bertahap 2026',
    risiko: 'Tinggi konektivitas (2.928 menit luring/4 minggu); perlu perangkat hemat daya & cadangan listrik',
    prasyarat: 'Persetujuan Lembaga Adat Dayak Kenyah (D5=89,73), arsitektur luring-utama & pendampingan sebaya',
    sensitivitas: '13/13 skenario uji sensitivitas bobot ±10% tetap stabil pada peringkat #1',
    kontribusiKriteria: 'Kesenjangan D2 terbesar (skor 30,75; gap 69,25) + bobot dimensi D2 tertinggi (0,17308)',
    status: 'Dijadwalkan untuk Musyawarah' as StatusRek,
  },
];

export default function RekomendasiDSSPage() {
  const [data, setData] = useState(PROGRAMS);
  const [selectedProg, setSelectedProg] = useState<typeof PROGRAMS[0] | null>(PROGRAMS[0]);

  const updateStatus = (id: string, newStatus: StatusRek) => {
    setData((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
    if (selectedProg && selectedProg.id === id) {
      setSelectedProg((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    alert(`✅ Status keputusan musyawarah program diperbarui ke: ${newStatus}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Rekomendasi DSS Metode SAW (Artefak 4 — Bab IV Tabel 4.24–4.26)" modul="Pemerintah Desa" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <AlertTriangle size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Prinsip Kendali Manusia pada DSS SAW (Bab IV)</p>
          <p className="text-amber-800 mt-0.5 font-medium leading-relaxed">
            Sistem Pendukung Keputusan (DSS) berbasis <strong>Simple Additive Weighting (SAW)</strong> tidak menetapkan keputusan secara otomatis. Nilai preferensi <em>Vᵢ = Σ(wⱼ · rᵢⱼ)</em> mengurutkan alternatif di dalam desa yang sama sebagai bahan musyawarah Pemerintah Desa, Lembaga Adat, dan aktor terkait.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Kriteria SAW" value="6 Kriteria" satuan="C1–C5 Benefit, C6 Cost" barColor="blue" progress={100} />
        <StatCard label="Konsistensi AHP" value="CR 0,00144" satuan="Matriks Dimensi (≤ 0,10)" barColor="green" progress={98} />
        <StatCard label="Sensitivitas ±10%" value="39 / 39" satuan="13 Skenario × 3 Desa Stabil" barColor="purple" progress={100} />
        <StatCard label="Evaluasi Formatif" value="4,09 / 5" satuan="21 Pengguna + 3 Pakar" barColor="orange" progress={82} />
      </div>

      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
        <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Tahapan Alur Keputusan Musyawarah Program:</p>
        <div className="flex items-center flex-wrap gap-1">
          {ALUR_STATUS.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${STATUS_COLOR[s]}`}>{s}</span>
              {i < ALUR_STATUS.length - 1 && <ArrowRight size={12} className="text-slate-400" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <ListOrdered size={16} /> Rekomendasi Prioritas #1 SAW per Desa (Tabel 4.25 — Dataset SLV 2)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border border-slate-100">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-left">
                    <tr>
                      <th className="p-2.5">Desa Penelitian</th>
                      <th className="p-2.5">Alternatif Peringkat #1</th>
                      <th className="p-2.5 text-right">Skor SAW (Vᵢ)</th>
                      <th className="p-2.5">Status Musyawarah</th>
                      <th className="p-2.5">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.map((p) => (
                      <tr
                        key={p.id}
                        onClick={() => setSelectedProg(p)}
                        className={`cursor-pointer hover:bg-slate-50/50 transition-colors ${selectedProg?.id === p.id ? 'bg-indigo-50/40' : ''}`}
                      >
                        <td className="p-2.5 font-bold text-slate-700 whitespace-nowrap">{p.desa}</td>
                        <td className="p-2.5 font-semibold text-slate-800">{p.name}</td>
                        <td className="p-2.5 text-right font-black text-indigo-700 font-mono">{p.score.toFixed(6)}</td>
                        <td className="p-2.5"><span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap ${STATUS_COLOR[p.status]}`}>{p.status}</span></td>
                        <td className="p-2.5">
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedProg(p); }}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[9px] font-bold"
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Bobot 6 Kriteria SAW (Tabel 4.24 — Total Bobot = 1,00)
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
              {DSS_KRITERIA_SAW.map((k) => (
                <div key={k.kode} className="p-2.5 rounded-lg border bg-slate-50/60 flex justify-between items-center gap-2">
                  <div>
                    <p className="font-bold text-slate-800"><span className="text-indigo-700 font-mono">{k.kode}</span> — {k.nama}</p>
                    <p className="text-[10px] text-slate-500">{k.atribut} · {k.sumber}</p>
                  </div>
                  <span className="font-mono font-black text-indigo-700 text-sm">{k.bobot.toFixed(2)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          {selectedProg ? (
            <Card className="border-indigo-200">
              <CardHeader className="pb-2 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">{selectedProg.desa} • Rank #{selectedProg.rank} • SAW: {selectedProg.score.toFixed(6)}</span>
                <CardTitle className="text-xs font-bold text-slate-800 leading-snug mt-1">{selectedProg.name}</CardTitle>
                <div className="mt-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${STATUS_COLOR[selectedProg.status]}`}>{selectedProg.status}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-4 text-xs space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-slate-500 font-semibold">Estimasi Biaya (C6):</span>
                    <span className="font-bold text-slate-800">{selectedProg.cost}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-slate-500 font-semibold">Tahap Pelaksanaan:</span>
                    <span className="font-semibold text-slate-800">{selectedProg.waktu}</span>
                  </div>
                  <div className="py-1 border-b space-y-0.5">
                    <span className="text-slate-500 font-semibold block">Catatan Risiko &amp; Konteks:</span>
                    <span className="text-slate-700 font-medium leading-relaxed block">{selectedProg.risiko}</span>
                  </div>
                  <div className="py-1 border-b space-y-0.5">
                    <span className="text-slate-500 font-semibold block">Prasyarat Kelembagaan/Adat:</span>
                    <span className="text-slate-700 font-medium leading-relaxed block">{selectedProg.prasyarat}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border">
                  <p className="font-bold text-slate-700 text-[10px] uppercase tracking-wider mb-1">Penelusuran Kontribusi Kriteria:</p>
                  <p className="text-slate-600 leading-relaxed font-semibold">{selectedProg.kontribusiKriteria}</p>
                </div>

                <div className="p-2.5 bg-indigo-50/50 border border-indigo-100 rounded-lg">
                  <p className="font-bold text-indigo-700 text-[10px] uppercase tracking-wider mb-1">Uji Sensitivitas (±10%):</p>
                  <p className="text-slate-600 leading-relaxed italic">&quot;{selectedProg.sensitivitas}&quot;</p>
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <p className="font-bold text-slate-800">Tindak Lanjut Musyawarah Pemdes:</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button onClick={() => updateStatus(selectedProg.id, 'Diverifikasi')} className="py-1.5 bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 rounded-lg text-[9px]">Verifikasi Bukti</button>
                    <button onClick={() => updateStatus(selectedProg.id, 'Dijadwalkan untuk Musyawarah')} className="py-1.5 bg-orange-600 text-white font-bold hover:bg-orange-700 rounded-lg text-[9px]">Bawa ke Musdes</button>
                    <button onClick={() => updateStatus(selectedProg.id, 'Diputuskan')} className="py-1.5 bg-teal-700 text-white font-bold hover:bg-teal-800 rounded-lg text-[9px]">Tetapkan Musyawarah</button>
                    <button onClick={() => updateStatus(selectedProg.id, 'Ditindaklanjuti')} className="py-1.5 bg-purple-700 text-white font-bold hover:bg-purple-800 rounded-lg text-[9px]">Tindaklanjuti</button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-[250px] border border-dashed rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-white">
              <HelpCircle size={28} className="mb-2 text-slate-300" />
              <p className="font-bold text-sm text-slate-600">Pilih Alternatif</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} /> Sumber: Dataset SLV 2 v1.2 — Sheet DSS Matriks Raw, Normalisasi, Hasil &amp; Sensitivitas</span>
        <span>Keputusan akhir tetap melalui Musyawarah Desa &amp; Lembaga Adat</span>
      </div>
    </div>
  );
}
