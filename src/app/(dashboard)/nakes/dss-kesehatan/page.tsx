'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, ShieldAlert, CheckCircle2, XCircle, Eye, MessageSquare, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

const CLR = '#0369a1';

const REKOMENDASI_DATA = [
  {
    id: 1,
    rekomendasi: 'Tingkatkan frekuensi Posyandu Balita menjadi 2x per bulan untuk Dusun 2',
    alasan: 'Cakupan D/S (65%) di bawah target 85%, tren penurunan kehadiran 3 bulan terakhir',
    nilaiPreferensi: 0.82,
    peringkat: 1,
    prasyarat: 'SDM: 2 Kader aktif; Sarana: alat timbang portabel; Waktu: fleksibel; Biaya: Rp 500rb/sesi',
    sensitivitas: 'Stabil — tidak banyak berubah jika jadwal digeser 1 minggu',
    status: 'Baru',
    masukan: '',
    alternatif: 'Posyandu mobile ke dusun',
  },
  {
    id: 2,
    rekomendasi: 'Lakukan sweeping imunisasi untuk 4 bayi yang belum IDL di Dusun 3',
    alasan: 'Cakupan IDL (78%) masih 17% di bawah target. Risiko KLB jika tidak segera diselesaikan',
    nilaiPreferensi: 0.78,
    peringkat: 2,
    prasyarat: 'SDM: Bidan Desa; Sarana: Vaksin tersedia; Waktu: minggu ini; Biaya: dari dana BOK',
    sensitivitas: 'Tinggi — setiap minggu keterlambatan meningkatkan risiko penularan',
    status: 'Dibahas',
    masukan: 'Sudah koordinasi dengan Puskesmas, jadwal sweeping 25 Juli 2026',
    alternatif: 'Imunisasi di Puskesmas dengan jemputan kader',
  },
  {
    id: 3,
    rekomendasi: 'Distribusikan PMT tambahan untuk 6 balita gizi kurang di Dusun 1 dan 3',
    alasan: 'Status gizi kurang masih 12 balita dari target 0. PMT sebelumnya habis bulan lalu',
    nilaiPreferensi: 0.74,
    peringkat: 3,
    prasyarat: 'SDM: Kader Gizi; Sarana: PMT lokal (telur, kacang); Waktu: 2 minggu; Biaya: Rp 750rb',
    sensitivitas: 'Sedang — dampak terlihat setelah 4 minggu pemberian rutin',
    status: 'Diterima',
    masukan: 'Disetujui dalam rapat bulanan, PMT akan didistribusikan minggu depan',
    alternatif: 'Edukasi gizi keluarga + pendampingan kader',
  },
];

const STATUS_COLOR: Record<string, { bg: string; text: string; border: string }> = {
  'Baru': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'Dibahas': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  'Diterima': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'Ditunda': { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
  'Ditolak': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
};

export default function DSSKesehatanPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [masukanInput, setMasukanInput] = useState<Record<number, string>>({});

  return (
    <div className="flex flex-col gap-4 pb-8 text-xs">

      {/* HEADER */}
      <div className="border-b pb-3">
        <h1 className="text-xl font-black text-slate-800">DSS Rekomendasi Kesehatan</h1>
        <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Tenaga Kesehatan — Sistem Pendukung Keputusan Bidang Kesehatan (Hanya Alat Bantu)</p>
      </div>

      {/* KEWENANGAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Yang boleh */}
        <Card className="border-green-200">
          <CardHeader className="py-2.5 border-b border-green-100 bg-green-50/50">
            <CardTitle className="text-xs font-bold text-green-800 flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-green-600" /> Tenaga Kesehatan Dapat
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 space-y-1.5">
            {[
              'Melihat rekomendasi bidang kesehatan',
              'Memberi data dan penilaian kelayakan',
              'Memberi masukan terhadap alternatif',
              'Memberi alasan dan kontribusi kriteria',
              'Melihat status rekomendasi',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 size={11} className="text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-green-900 font-semibold">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Yang tidak boleh */}
        <Card className="border-red-200">
          <CardHeader className="py-2.5 border-b border-red-100 bg-red-50/50">
            <CardTitle className="text-xs font-bold text-red-800 flex items-center gap-1.5">
              <XCircle size={13} className="text-red-600" /> Tenaga Kesehatan Tidak Dapat
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 space-y-1.5">
            {[
              'Mengubah bobot AHP',
              'Mengubah formula DSS',
              'Menetapkan keputusan akhir',
              'Mengakses alternatif bidang lain tanpa kewenangan',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <XCircle size={11} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-900 font-semibold">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Peringatan */}
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2">
        <ShieldAlert size={14} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="text-amber-900 font-semibold leading-relaxed">
          DSS ini berfungsi sebagai <strong>alat bantu</strong>, bukan penentu kebijakan. Keputusan akhir tetap dilakukan oleh pimpinan program atau Musyawarah Desa. Gunakan rekomendasi sebagai bahan pertimbangan pelayanan.
        </p>
      </div>

      {/* DAFTAR REKOMENDASI */}
      <Card>
        <CardHeader className="py-2.5 border-b">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Rekomendasi Program Kesehatan</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {REKOMENDASI_DATA.map(r => {
            const sc = STATUS_COLOR[r.status] || STATUS_COLOR['Baru'];
            const isOpen = expanded === r.id;
            return (
              <div key={r.id} className="border border-slate-200 rounded-xl overflow-hidden">

                {/* Header rekomen */}
                <div
                  className="p-3 flex justify-between items-start gap-2 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : r.id)}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[9px] font-bold text-slate-400">#{r.peringkat}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${sc.bg} ${sc.text} ${sc.border}`}>{r.status}</span>
                      <span className="text-[9px] font-bold text-sky-600 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">Nilai: {r.nilaiPreferensi}</span>
                    </div>
                    <p className="font-bold text-slate-800 leading-snug">{r.rekomendasi}</p>
                  </div>
                  {isOpen ? <ChevronUp size={14} className="text-slate-400 flex-shrink-0" /> : <ChevronDown size={14} className="text-slate-400 flex-shrink-0" />}
                </div>

                {/* Detail */}
                {isOpen && (
                  <div className="border-t border-slate-200 p-3 bg-slate-50/30 space-y-3">
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Alasan / Kriteria yang Mempengaruhi</p>
                        <p className="font-semibold text-slate-700">{r.alasan}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Prasyarat (Data, SDM, Sarana, Waktu, Biaya)</p>
                        <p className="font-semibold text-slate-700">{r.prasyarat}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Sensitivitas Rekomendasi</p>
                        <p className="font-semibold text-slate-700">{r.sensitivitas}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Alternatif Tindak Lanjut</p>
                        <p className="font-semibold text-sky-700">{r.alternatif}</p>
                      </div>
                    </div>

                    {/* Input Masukan */}
                    <div className="pt-2 border-t border-slate-200">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1.5 flex items-center gap-1">
                        <MessageSquare size={10} /> Masukan / Penilaian Kelayakan Anda
                      </p>
                      {r.masukan && (
                        <div className="mb-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                          <p className="font-semibold text-green-800 italic">{r.masukan}</p>
                        </div>
                      )}
                      <textarea
                        className="w-full rounded-lg border border-slate-200 text-xs p-2 min-h-[60px] focus:outline-none focus:border-sky-400"
                        placeholder="Tulis masukan, penilaian kelayakan, atau alasan penolakan..."
                        value={masukanInput[r.id] || ''}
                        onChange={e => setMasukanInput(prev => ({ ...prev, [r.id]: e.target.value }))}
                      />
                      <button className="mt-1.5 px-3 py-1.5 bg-sky-700 text-white font-bold text-[10px] rounded-lg hover:bg-sky-800 transition-colors">
                        Kirim Masukan
                      </button>
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
          Status rekomendasi: <strong>Baru</strong> (belum dibahas) → <strong>Dibahas</strong> (dalam pertimbangan) → <strong>Diterima</strong> (disetujui) → <strong>Ditunda</strong> atau <strong>Ditolak</strong>. Tenaga Kesehatan hanya dapat memberi masukan dan tidak menetapkan keputusan akhir.
        </p>
      </div>

    </div>
  );
}
