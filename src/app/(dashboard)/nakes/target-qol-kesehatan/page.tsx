'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Target, CheckCircle2, Clock, XCircle, ChevronRight, TrendingUp } from 'lucide-react';

const CLR = '#7c3aed';

const TARGET_DATA = [
  {
    id: 1,
    kondisiAwal: 'Cakupan ANC Lengkap: 72%',
    target: 'Semua ibu hamil mendapat ≥4 kali ANC sebelum melahirkan',
    indikatorHasil: 'Persentase ibu hamil dengan ANC ≥4 kali',
    periodeTarget: 'Desember 2026',
    programTerkait: 'ANC Mobile + Kunjungan Rumah Bidan',
    penangungJawab: 'Bidan Desa + Kader Kesehatan',
    progres: 72,
    targetNilai: 100,
    status: 'Berkembang',
    evaluasi: 'Meningkat 5% dari bulan sebelumnya',
  },
  {
    id: 2,
    kondisiAwal: 'Prevalensi stunting: 18,2%',
    target: 'Turunkan prevalensi stunting menjadi < 14% (target nasional)',
    indikatorHasil: 'Persentase balita dengan tinggi badan normal sesuai usia',
    periodeTarget: 'Desember 2026',
    programTerkait: 'PMT, Gizi Seimbang, Posyandu Balita',
    penangungJawab: 'Nakes + Kader + TP-PKK',
    progres: 60,
    targetNilai: 100,
    status: 'Berkembang',
    evaluasi: 'Turun 2,4% sejak awal tahun',
  },
  {
    id: 3,
    kondisiAwal: 'Cakupan imunisasi dasar lengkap: 78%',
    target: 'Semua bayi 0-12 bulan mendapat imunisasi dasar lengkap (≥95%)',
    indikatorHasil: 'Persentase bayi dengan IDL',
    periodeTarget: 'Oktober 2026',
    programTerkait: 'Sweeping Imunisasi + Posyandu Rutin',
    penangungJawab: 'Nakes + Kader Posyandu',
    progres: 78,
    targetNilai: 95,
    status: 'Berkembang',
    evaluasi: 'Perlu 4 bayi lagi untuk mencapai target',
  },
  {
    id: 4,
    kondisiAwal: 'Posyandu Lansia: 1x/bulan, cakupan 55%',
    target: 'Skrining lansia ≥80% dengan frekuensi 2x/bulan',
    indikatorHasil: 'Persentase lansia yang diskrining per periode',
    periodeTarget: 'September 2026',
    programTerkait: 'Posyandu Lansia Tambah Jadwal + Kunjungan Rumah',
    penangungJawab: 'Nakes + Kader + Kepala Dusun',
    progres: 55,
    targetNilai: 80,
    status: 'Tertunda',
    evaluasi: 'Menunggu persetujuan penambahan jadwal',
  },
  {
    id: 5,
    kondisiAwal: 'Kualitas data kesehatan desa: 84,5%',
    target: 'Data kesehatan lengkap, terbarukan, dan terverifikasi 100%',
    indikatorHasil: 'Persentase rekam data terverifikasi tanpa duplikasi',
    periodeTarget: 'Desember 2026',
    programTerkait: 'Pembaruan Data Rutin + Verifikasi Bulanan',
    penangungJawab: 'Nakes + Operator Data',
    progres: 85,
    targetNilai: 100,
    status: 'Berkembang',
    evaluasi: 'Konsisten meningkat setiap bulan',
  },
];

const STATUS_CONFIG: Record<string, { color: string; bg: string; border: string; icon: typeof CheckCircle2 }> = {
  'Tercapai': { color: '#16a34a', bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle2 },
  'Berkembang': { color: '#d97706', bg: 'bg-amber-50', border: 'border-amber-200', icon: TrendingUp },
  'Tertunda': { color: '#dc2626', bg: 'bg-red-50', border: 'border-red-200', icon: XCircle },
  'Perlu Revisi': { color: '#7c3aed', bg: 'bg-purple-50', border: 'border-purple-200', icon: Clock },
};

export default function TargetPeningkatanKualitasHidupPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4 pb-8 text-xs">

      {/* HEADER */}
      <div className="border-b pb-3">
        <h1 className="text-xl font-black text-slate-800">Target Peningkatan Kualitas Hidup</h1>
        <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Tenaga Kesehatan — Target Hasil Kesehatan dan Kualitas Hidup Masyarakat Desa</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Target', val: TARGET_DATA.length, color: CLR },
          { label: 'Berkembang', val: TARGET_DATA.filter(t => t.status === 'Berkembang').length, color: '#d97706' },
          { label: 'Tercapai', val: TARGET_DATA.filter(t => t.status === 'Tercapai').length, color: '#16a34a' },
          { label: 'Tertunda', val: TARGET_DATA.filter(t => t.status === 'Tertunda').length, color: '#dc2626' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">{s.label}</p>
            <p className="text-3xl font-black" style={{ color: s.color }}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* TARGET LIST */}
      <Card>
        <CardHeader className="py-2.5 border-b">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Daftar Target Peningkatan Kualitas Hidup</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {TARGET_DATA.map(t => {
            const conf = STATUS_CONFIG[t.status] || STATUS_CONFIG['Berkembang'];
            const Icon = conf.icon;
            const progressPct = Math.round((t.progres / t.targetNilai) * 100);
            return (
              <div key={t.id}
                className={`border rounded-xl p-3 cursor-pointer transition-all ${selected === t.id ? 'border-purple-400 bg-purple-50/20' : 'border-slate-200 hover:border-purple-300'}`}
                onClick={() => setSelected(selected === t.id ? null : t.id)}>

                <div className="flex justify-between items-start gap-2 mb-2">
                  <p className="font-bold text-slate-800 leading-snug flex-1">{t.target}</p>
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded border flex-shrink-0 ${conf.bg} ${conf.border}`}>
                    <Icon size={10} style={{ color: conf.color }} />
                    <span className="text-[9px] font-bold" style={{ color: conf.color }}>{t.status}</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-semibold text-slate-500">
                    <span>Progres: <strong className="text-slate-800">{t.progres}% / {t.targetNilai}%</strong></span>
                    <span className="font-bold" style={{ color: conf.color }}>{progressPct}% Tercapai</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${progressPct}%`, backgroundColor: conf.color }} />
                  </div>
                </div>

                {/* Expandable */}
                {selected === t.id && (
                  <div className="mt-3 pt-3 border-t border-purple-200 grid grid-cols-1 gap-2">
                    <div><span className="text-slate-400 font-semibold">Kondisi Awal:</span> <span className="font-bold text-slate-700">{t.kondisiAwal}</span></div>
                    <div><span className="text-slate-400 font-semibold">Indikator Hasil:</span> <span className="font-bold text-slate-700">{t.indikatorHasil}</span></div>
                    <div><span className="text-slate-400 font-semibold">Periode Target:</span> <span className="font-bold text-slate-700">{t.periodeTarget}</span></div>
                    <div><span className="text-slate-400 font-semibold">Program Terkait:</span> <span className="font-bold text-purple-700">{t.programTerkait}</span></div>
                    <div><span className="text-slate-400 font-semibold">Penanggung Jawab:</span> <span className="font-bold text-slate-700">{t.penangungJawab}</span></div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 font-semibold">Evaluasi Terkini: </span>
                      <span className="font-bold text-slate-700 italic">{t.evaluasi}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Info */}
      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2">
        <Info size={14} className="text-blue-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          <strong>Catatan:</strong> Area halaman yang tampak kosong pada tangkapan layar harus diisi atau menu dinonaktifkan sementara. Halaman kosong menunjukkan fungsi belum selesai. Target yang berstatus "Tertunda" perlu dibahas dalam Musyawarah Desa atau koordinasi lintas program.
        </p>
      </div>

    </div>
  );
}
