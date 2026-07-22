'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  RefreshCw, BarChart2, CheckCircle2, AlertTriangle, ShieldCheck,
  Compass, ArrowRight, Activity, Landmark, FileText, ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

const EVALUASI_METRICS = [
  { name: 'Kesiapan Desa', awal: 60.0, target: 85.0, akhir: 74.2, perubahan: '+14.2' },
  { name: 'Kematangan Desa', awal: 2.0, target: 4.0, akhir: 2.95, perubahan: '+0.95' },
  { name: 'Kualitas Hidup', awal: 55.0, target: 80.0, akhir: 71.28, perubahan: '+16.28' },
];

const CAPAIAN_PROGRAM = [
  {
    program: 'Peningkatan Infrastruktur Internet Dusun C',
    capaian: 'Tower BTS berdiri, WiFi terpasang di 3 dusun',
    kualitasData: 'Akurasi 98% (terverifikasi Dinas PMD)',
    kendala: 'Keterlambatan pengiriman modul dari pusat',
    manfaat: 'Anak sekolah di Dusun C kini dapat mengakses materi belajar online dari rumah',
    perbaikan: 'Perlu penambahan panel surya cadangan jika listrik desa mati',
  },
  {
    program: 'Pengadaan Tablet KIA & Posyandu Digital',
    capaian: 'Tablet terdistribusikan ke seluruh kader',
    kualitasData: 'Ada inkonsistensi minor dengan data stunting puskesmas',
    kendala: 'Kader lansia memerlukan bimbingan penggunaan tablet berulang kali',
    manfaat: 'Pencatatan kesehatan ibu dan anak kini terpusat dan real-time',
    perbaikan: 'Pelatihan rutin bulanan bagi kader posyandu non-aktif',
  }
];

export default function EvaluasiCapaianPage() {
  const [umpanBalikText, setUmpanBalikText] = useState('');
  const [submittedUB, setSubmittedUB] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Evaluasi Capaian" modul="Pemerintah Desa" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5">
        <ShieldCheck size={16} className="text-blue-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Umpan Balik Evaluasi Periodik</p>
          <p className="text-blue-700 mt-0.5 font-medium leading-relaxed">
            Hasil evaluasi ini digunakan sebagai **umpan balik terhadap kualitas data, perbaikan DSS, efektivitas program**, serta penyesuaian parameter penilaian pada periode berikutnya.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Perubahan Kesiapan" value="+14.20" satuan="Poin Kenaikan" barColor="green" progress={100} />
        <StatCard label="Perubahan QoL" value="+16.28" satuan="Poin Kenaikan" barColor="blue" progress={100} />
        <StatCard label="Program Dievaluasi" value={CAPAIAN_PROGRAM.length} satuan="Program Utama" barColor="purple" progress={100} />
        <StatCard label="Akurasi Bukti" value="98%" satuan="Kualitas Data" barColor="orange" progress={98} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* COMPARISON CHART TABLE */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart2 size={16} /> Perbandingan Nilai Awal vs Target vs Kondisi Akhir
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={EVALUASI_METRICS}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ fontSize: 10 }} />
                  <Bar dataKey="awal" name="Kondisi Awal" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="akhir" name="Kondisi Akhir (Kini)" fill="#283593" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" name="Target" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* TABEL COMPARISON */}
            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold text-left">
                  <tr>
                    <th className="p-2.5">Kategori Penilaian</th>
                    <th className="p-2.5 text-right">Kondisi Awal</th>
                    <th className="p-2.5 text-right">Target</th>
                    <th className="p-2.5 text-right">Kondisi Akhir</th>
                    <th className="p-2.5 text-right text-indigo-700">Perubahan Skor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {EVALUASI_METRICS.map((e, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 font-medium">
                      <td className="p-2.5 text-slate-800 font-bold">{e.name}</td>
                      <td className="p-2.5 text-right text-slate-500">{e.awal}</td>
                      <td className="p-2.5 text-right text-slate-500">{e.target}</td>
                      <td className="p-2.5 text-right font-bold text-slate-700">{e.akhir}</td>
                      <td className="p-2.5 text-right font-bold text-green-700">{e.perubahan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </CardContent>
        </Card>

        {/* FEEDBACK & ACTION FOR NEXT PERIOD */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Compass size={16} /> Umpan Balik Periode Berikutnya
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5 text-xs">
            <p className="text-slate-500 leading-relaxed">
              Tulis masukan, kendala utama, atau rekomendasi perbaikan pembobotan kriteria DSS untuk penyusunan RKPDes periode berikutnya.
            </p>

            {submittedUB ? (
              <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-2">
                <CheckCircle2 size={14} /> Umpan balik Anda telah berhasil disimpan untuk evaluasi RKPDes berikutnya!
              </div>
            ) : (
              <div className="space-y-2">
                <textarea
                  rows={4}
                  value={umpanBalikText}
                  onChange={e => setUmpanBalikText(e.target.value)}
                  placeholder="Contoh: Kriteria pelestarian budaya harus ditingkatkan bobotnya dari 18% ke 20% karena peningkatan partisipasi sekolah adat..."
                  className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300 text-slate-700"
                />
                <button
                  onClick={() => { if (umpanBalikText) setSubmittedUB(true); }}
                  className="w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-bold"
                >
                  Kirim Umpan Balik Evaluasi
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* DETAIL EVALUASI CAPAIAN PROGRAM */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Activity size={16} /> Detail Evaluasi Capaian Program Kerja
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {CAPAIAN_PROGRAM.map((p, idx) => (
                <div key={idx} className="p-3.5 border rounded-xl bg-slate-50/50 space-y-2">
                  <p className="font-bold text-slate-800 text-xs">{p.program}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] pt-1 border-t border-dashed">
                    <div>
                      <span className="font-bold text-slate-500 block">Capaian Realisasi:</span>
                      <span className="text-slate-700 font-medium">{p.capaian}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-500 block">Kualitas Data Eviden:</span>
                      <span className="text-slate-700 font-medium">{p.kualitasData}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-500 block">Kendala Lapangan:</span>
                      <span className="text-red-700 font-medium">{p.kendala}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] pt-2 border-t border-dashed">
                    <div>
                      <span className="font-bold text-slate-500 block">Manfaat Sosial Dirasakan:</span>
                      <span className="text-green-700 font-medium italic">"{p.manfaat}"</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-500 block">Kebutuhan Perbaikan Kedepan:</span>
                      <span className="text-indigo-900 font-semibold">{p.perbaikan}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Hasil evaluasi divalidasi oleh BPD & Dinas Pemberdayaan Masyarakat Desa</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
