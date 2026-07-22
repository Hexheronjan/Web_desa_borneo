'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  ListOrdered, CheckCircle2, RefreshCw, BarChart2, ShieldAlert,
  ArrowRight, Landmark, Calendar, Clock, AlertTriangle, Play, HelpCircle
} from 'lucide-react';
import { useState } from 'react';

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
    id: 'PRG-01', rank: 1, name: 'Peningkatan Infrastruktur Internet Dusun C', score: 0.232, cost: 'Rp 80.000.000',
    waktu: '3 Bulan (Q3 2026)', risiko: 'Rendah (Hanya kendala cuaca)', prasyarat: 'Ketersediaan lahan tower hibah warga',
    sensitivitas: 'Sangat stabil terhadap perubahan bobot kriteria (+/- 15%)',
    kontribusiKriteria: 'Infrastruktur (45%), Pendidikan (30%), Ekonomi (25%)',
    status: 'Dijadwalkan untuk Musyawarah' as StatusRek
  },
  {
    id: 'PRG-02', rank: 2, name: 'Pengembangan Literasi & PAUD Digital', score: 0.198, cost: 'Rp 15.000.000',
    waktu: '2 Bulan (Q4 2026)', risiko: 'Sedang (Butuh adaptasi kader/guru)', prasyarat: 'Pelatihan dasar TIK untuk pendidik',
    sensitivitas: 'Peka terhadap perubahan bobot kriteria SDM',
    kontribusiKriteria: 'Pendidikan (60%), SDM (25%), Infrastruktur (15%)',
    status: 'Diverifikasi' as StatusRek
  },
  {
    id: 'PRG-03', rank: 3, name: 'Digitalisasi Layanan BUMDes Adat', score: 0.175, cost: 'Rp 25.000.000',
    waktu: '4 Bulan (Q1 2027)', risiko: 'Tinggi (Koneksi e-commerce eksternal)', prasyarat: 'Izin usaha BUMDes terverifikasi',
    sensitivitas: 'Sangat dipengaruhi oleh stabilitas listrik desa',
    kontribusiKriteria: 'Ekonomi (50%), Kelembagaan (30%), Teknologi (20%)',
    status: 'Baru' as StatusRek
  },
  {
    id: 'PRG-04', rank: 4, name: 'Penyediaan Apotek & Vitamin Posyandu', score: 0.116, cost: 'Rp 50.000.000',
    waktu: '1 Bulan (Q3 2026)', risiko: 'Rendah', prasyarat: 'Izin Dinas Kesehatan',
    sensitivitas: 'Sangat stabil',
    kontribusiKriteria: 'Kesehatan (70%), Pelayanan (20%), Tata Kelola (10%)',
    status: 'Diputuskan' as StatusRek
  },
];

export default function RekomendasiDSSPage() {
  const [data, setData] = useState(PROGRAMS);
  const [selectedProg, setSelectedProg] = useState<typeof PROGRAMS[0] | null>(PROGRAMS[0]);

  const updateStatus = (id: string, newStatus: StatusRek) => {
    setData(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    if (selectedProg && selectedProg.id === id) {
      setSelectedProg(prev => prev ? { ...prev, status: newStatus } : null);
    }
    alert(`✅ Status keputusan program berhasil diperbarui ke: ${newStatus}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Rekomendasi DSS" modul="Pemerintah Desa" color={COLOR} />

      {/* WARNING NOTIFICATION */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <AlertTriangle size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Sifat Keputusan DSS</p>
          <p className="text-amber-700 mt-0.5 font-medium leading-relaxed">
            Sistem Pendukung Keputusan (DSS) **tidak menetapkan keputusan secara otomatis**. Pemerintah Desa menggunakan rekomendasi ini sebagai dasar alternatif dalam musyawarah pembangunan desa.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Consistency Ratio" value="0.08" satuan="Valid (CR &lt; 0.1)" barColor="green" progress={80} />
        <StatCard label="Total Alternatif" value={data.length} satuan="Program Dievaluasi" barColor="blue" progress={100} />
        <StatCard label="Dijadwalkan Musdes" value={data.filter(p => p.status === 'Dijadwalkan untuk Musyawarah').length} satuan="Program Prioritas" barColor="orange" progress={25} />
        <StatCard label="Skor Preferensi" value="AHP SAW" satuan="Engine Terverifikasi" barColor="purple" progress={100} />
      </div>

      {/* ALUR STATUS INFORMASIONAL */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
        <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Tahapan Alur Keputusan Program:</p>
        <div className="flex items-center flex-wrap gap-1">
          {ALUR_STATUS.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${STATUS_COLOR[s]}`}>{s}</span>
              {i < ALUR_STATUS.length - 1 && <ArrowRight size={12} className="text-slate-350" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* ALTERNATIF PROGRAM LIST */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <ListOrdered size={16} /> Daftar Alternatif Program (Berdasarkan Nilai Preferensi)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold text-left">
                  <tr>
                    <th className="p-2.5 text-center">Rank</th>
                    <th className="p-2.5">Nama Alternatif Program</th>
                    <th className="p-2.5 text-right">Nilai Preferensi</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.map((p) => (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedProg(p)}
                      className={`cursor-pointer hover:bg-slate-50/50 transition-colors ${selectedProg?.id === p.id ? 'bg-indigo-50/30' : ''}`}
                    >
                      <td className="p-2.5 text-center font-bold">
                        <span className="w-5 h-5 rounded bg-indigo-700 text-white flex items-center justify-center text-[10px] mx-auto">{p.rank}</span>
                      </td>
                      <td className="p-2.5 font-semibold text-slate-800">{p.name}</td>
                      <td className="p-2.5 text-right font-bold text-indigo-700 font-mono">{p.score.toFixed(3)}</td>
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

        {/* DETAIL UTAMA & KEPUTUSAN */}
        <div className="lg:col-span-1">
          {selectedProg ? (
            <Card className="border-indigo-200">
              <CardHeader className="pb-2 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Rank {selectedProg.rank} • Preferensi: {selectedProg.score.toFixed(3)}</span>
                <CardTitle className="text-xs font-bold text-slate-800 leading-snug mt-1">{selectedProg.name}</CardTitle>
                <div className="mt-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${STATUS_COLOR[selectedProg.status]}`}>{selectedProg.status}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-4 text-xs space-y-4">
                
                {/* DETAIL BIAYA, WAKTU, RISIKO, PRASYARAT */}
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-slate-500 font-semibold">Estimasi Biaya:</span>
                    <span className="font-bold text-slate-800">{selectedProg.cost}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-slate-500 font-semibold">Waktu Pelaksanaan:</span>
                    <span className="font-semibold text-slate-800">{selectedProg.waktu}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-slate-500 font-semibold">Risiko Implementasi:</span>
                    <span className="font-semibold text-slate-800">{selectedProg.risiko}</span>
                  </div>
                  <div className="py-1 border-b space-y-0.5">
                    <span className="text-slate-500 font-semibold block">Prasyarat Sosial/Lahan:</span>
                    <span className="text-slate-700 font-medium leading-relaxed block">{selectedProg.prasyarat}</span>
                  </div>
                </div>

                {/* KONTRIBUSI KRITERIA */}
                <div className="p-2.5 bg-slate-50 rounded-lg border">
                  <p className="font-bold text-slate-650 text-[10px] uppercase tracking-wider mb-1">Kontribusi Kriteria:</p>
                  <p className="text-slate-600 leading-relaxed font-semibold">{selectedProg.kontribusiKriteria}</p>
                </div>

                {/* ANALISIS SENSITIVITAS */}
                <div className="p-2.5 bg-indigo-50/50 border border-indigo-100 rounded-lg">
                  <p className="font-bold text-indigo-700 text-[10px] uppercase tracking-wider mb-1">Analisis Sensitivitas:</p>
                  <p className="text-slate-600 leading-relaxed italic">"{selectedProg.sensitivitas}"</p>
                </div>

                {/* HAK TINDAKAN PEMDES */}
                <div className="space-y-2 pt-2 border-t">
                  <p className="font-bold text-slate-750">Tindakan Pemerintah Desa:</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => updateStatus(selectedProg.id, 'Diverifikasi')}
                      className="py-1.5 bg-white border border-slate-350 text-slate-700 font-bold hover:bg-slate-50 rounded-lg text-[9px]"
                    >
                      Verifikasi Program
                    </button>
                    <button
                      onClick={() => updateStatus(selectedProg.id, 'Dijadwalkan untuk Musyawarah')}
                      className="py-1.5 bg-orange-700 text-white font-bold hover:bg-orange-850 rounded-lg text-[9px]"
                    >
                      Bawa ke Musdes
                    </button>
                    <button
                      onClick={() => updateStatus(selectedProg.id, 'Diputuskan')}
                      className="py-1.5 bg-teal-700 text-white font-bold hover:bg-teal-850 rounded-lg text-[9px]"
                    >
                      Putuskan Program
                    </button>
                    <button
                      onClick={() => updateStatus(selectedProg.id, 'Ditindaklanjuti')}
                      className="py-1.5 bg-purple-700 text-white font-bold hover:bg-purple-850 rounded-lg text-[9px]"
                    >
                      Tindaklanjuti
                    </button>
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
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Algoritma AHP SAW divalidasi berkala oleh dinas pengawas</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
