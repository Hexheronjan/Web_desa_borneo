'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { ShieldAlert, CheckCircle2, XCircle, Info, Target } from 'lucide-react';

const COLOR = '#1565c0';

export default function RekomendasiPendidikanPage() {
  return (
    <div className="flex flex-col gap-5 text-xs pb-10">
      <PageTitle fitur="Rekomendasi Pendidikan" modul="Guru/Tenaga Pendidikan" color={COLOR} />

      {/* KEWENANGAN & BATASAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hak Guru */}
        <Card className="border-green-200">
          <CardHeader className="py-2.5 border-b border-green-100 bg-green-50/50">
            <CardTitle className="text-xs font-bold text-green-800 flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-green-600" /> Aktor Guru Dapat
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 space-y-1.5 text-slate-700">
            {[
              'Melihat rekomendasi bidang pendidikan dan literasi digital.',
              'Memberi data dukung dan pertimbangan kelayakan sasaran.',
              'Menilai kesesuaian rekomendasi program pendidikan dengan kondisi riil.',
              'Melihat status tindak lanjut rekomendasi oleh pemdes.',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 size={11} className="text-green-600 flex-shrink-0 mt-0.5" />
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Batas Guru */}
        <Card className="border-red-200">
          <CardHeader className="py-2.5 border-b border-red-100 bg-red-50/50">
            <CardTitle className="text-xs font-bold text-red-800 flex items-center gap-1.5">
              <XCircle size={13} className="text-red-600" /> Batas Kewenangan Guru
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 space-y-1.5 text-slate-700">
            {[
              'Tidak diperkenankan mengubah bobot kriteria AHP dalam sistem.',
              'Tidak menetapkan keputusan resmi desa (hak pimpinan desa / musyawarah).',
              'Tidak mengakses rekomendasi sensitif bidang lain (seperti adat/keamanan).',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <XCircle size={11} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Peringatan DSS */}
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-955 flex items-start gap-2">
        <ShieldAlert size={14} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          <strong>Rekomendasi Sistem Pendukung Keputusan (DSS):</strong> Hasil rekomendasi bersifat alat bantu keputusan kependidikan. Guru memberikan data primer ke dalam sistem agar rekomendasi menjadi akurat bagi pimpinan desa.
        </p>
      </div>

      {/* Daftar Rekomendasi Terkini */}
      <Card>
        <CardHeader className="py-3 border-b">
          <CardTitle className="text-sm font-bold text-slate-700 uppercase flex items-center gap-1">
            <Target size={14} className="text-blue-700" /> Rekomendasi Sistem Bidang Pendidikan
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {[
            { no: 1, rek: 'Optimalkan Chromebook Mandiri UNBK di Dusun 3', urg: 'Tinggi', status: 'Ditinjau Pemdes' },
            { no: 2, rek: 'Pendampingan Guru Digital Intensif SDN 006', urg: 'Tinggi', status: 'Disetujui' },
            { no: 3, rek: 'Beasiswa Coding Anak Berprestasi', urg: 'Sedang', status: 'Usulan Musrenbang' },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-slate-50 border rounded-lg flex justify-between items-center gap-3">
              <div>
                <p className="font-bold text-slate-800">#{item.no} {item.rek}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Urgensi: {item.urg}</p>
              </div>
              <span className="text-[9px] font-bold text-blue-755 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">{item.status}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
