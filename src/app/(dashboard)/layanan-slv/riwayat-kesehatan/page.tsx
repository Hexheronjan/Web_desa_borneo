'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  FileText, Calendar, Clock, MapPin, ShieldAlert,
  ArrowRight, CheckCircle2, Download, AlertTriangle, RefreshCw
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#2e7d32';

interface RiwayatMedis {
  id: string;
  namaLayanan: string;
  tanggal: string;
  lokasi: string;
  petugas: string;
  statusTindakLanjut: 'Selesai' | 'Jadwal Kontrol' | 'Perlu Rujukan';
  jadwalBerikutnya: string | null;
  dokumen: string;
  rujukanKewenangan: string | null;
}

const MOCK_USER_RIWAYAT: RiwayatMedis[] = [
  {
    id: 'RM-01',
    namaLayanan: 'Pemeriksaan Tumbuh Kembang & Imunisasi DPT-HB-Hib 3',
    tanggal: '10 Juni 2026',
    lokasi: 'Gedung Posyandu Dusun A',
    petugas: 'Bidan Rina',
    statusTindakLanjut: 'Selesai',
    jadwalBerikutnya: '10 Juli 2026 (Imunisasi Campak/MR)',
    dokumen: 'KIA_Imunisasi_DPT3_AnandaAhmad.pdf',
    rujukanKewenangan: null
  },
  {
    id: 'RM-02',
    namaLayanan: 'Konsultasi Nutrisi & Pencegahan Stunting Balita',
    tanggal: '15 Mei 2026',
    lokasi: 'Puskesmas Pembantu Lung Anai',
    petugas: 'Kader Gizi Ani',
    statusTindakLanjut: 'Jadwal Kontrol',
    jadwalBerikutnya: '15 Juni 2026 (Pengukuran Berat Badan Ulang)',
    dokumen: 'Laporan_Nutrisi_Posyandu_Mei.pdf',
    rujukanKewenangan: null
  },
  {
    id: 'RM-03',
    namaLayanan: 'Pemeriksaan Kesehatan Lansia Berkala',
    tanggal: '05 April 2026',
    lokasi: 'Balai Adat Dusun C',
    petugas: 'Perawat Dedi',
    statusTindakLanjut: 'Perlu Rujukan',
    jadwalBerikutnya: '12 April 2026 (Pemeriksaan Spesialis Gula Darah)',
    dokumen: 'Hasil_Skrining_Lansia_Ahmad.pdf',
    rujukanKewenangan: 'Surat Rujukan Puskesmas Kecamatan No. Ref: RJK-8821'
  },
];

export default function RiwayatLayananKesehatanSayaPage() {
  const [data] = useState<RiwayatMedis[]>(MOCK_USER_RIWAYAT);

  const handleDownload = (filename: string) => {
    alert(`📥 Mengunduh dokumen medis Anda: ${filename}\n(Simulasi Unduhan Terproteksi Kriptografi)`);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Riwayat Layanan Kesehatan Saya" modul="Masyarakat Umum" color={COLOR} />

      {/* BANNER PRIVASI MERAH */}
      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-950 text-xs flex items-start gap-2.5 shadow-sm">
        <ShieldAlert size={16} className="text-red-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          Data kesehatan bersifat sensitif dan hanya dapat diakses oleh pengguna yang sah untuk tujuan pelayanan.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Kunjungan Medis" value={`${data.length} Kunjungan`} satuan="Tahun 2026" barColor="green" progress={100} />
        <StatCard label="Tindak Lanjut Aktif" value={data.filter(d => d.statusTindakLanjut !== 'Selesai').length} satuan="Butuh Perhatian" barColor="orange" progress={66} />
        <StatCard label="Dokumen Tersimpan" value={`${data.length} Berkas`} satuan="Format Terenkripsi" barColor="blue" progress={90} />
        <StatCard label="Rujukan Aktif" value={data.filter(d => d.rujukanKewenangan !== null).length} satuan="Kewenangan Puskesmas" barColor="purple" progress={33} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* TABLE RIWAYAT */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Berkas Rekam Layanan Anda</h2>

          <div className="space-y-3.5">
            {data.map(d => (
              <Card key={d.id} className="border border-slate-200">
                <CardContent className="p-4 space-y-3 text-xs">
                  
                  <div className="flex justify-between items-start gap-2 flex-wrap">
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 font-bold mr-2">{d.id}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        d.statusTindakLanjut === 'Selesai' ? 'bg-green-50 text-green-700 border border-green-200' :
                        d.statusTindakLanjut === 'Jadwal Kontrol' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-red-50 text-red-750 border border-red-200'
                      }`}>
                        {d.statusTindakLanjut}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{d.tanggal}</span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 text-sm leading-snug">{d.namaLayanan}</h3>
                    <div className="flex items-center gap-4 text-[10px] text-slate-500 mt-1 font-semibold">
                      <p className="flex items-center gap-1"><MapPin size={11} /> {d.lokasi}</p>
                      <p>PJ Petugas: {d.petugas}</p>
                    </div>
                  </div>

                  {/* Rujukan */}
                  {d.rujukanKewenangan && (
                    <div className="p-2 bg-red-50/50 border border-red-200 rounded text-red-800 text-[10px] font-bold">
                      ℹ️ Rujukan: {d.rujukanKewenangan}
                    </div>
                  )}

                  {/* Footer Action */}
                  <div className="border-t pt-2.5 flex justify-between items-center flex-wrap gap-2 text-[10px]">
                    <div>
                      <p className="text-slate-400 font-semibold">Jadwal Kontrol/Layanan Berikutnya:</p>
                      <p className="font-bold text-indigo-700 mt-0.5">{d.jadwalBerikutnya ?? 'Tidak ada'}</p>
                    </div>

                    <button
                      onClick={() => handleDownload(d.dokumen)}
                      className="px-2.5 py-1 bg-indigo-700 text-white rounded font-bold hover:bg-indigo-800 flex items-center gap-1.5"
                    >
                      <Download size={11} /> Unduh Berkas
                    </button>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* REMINDER PANEL */}
        <div className="space-y-4">
          
          {/* Jadwal Berikutnya */}
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="py-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={14} className="text-orange-500" /> Jadwal Berikutnya
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-3 bg-orange-50/50 border border-orange-200 rounded-lg">
                <p className="font-bold text-slate-800">Imunisasi Campak & MR Balita</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Saran Tanggal: 10 Juli 2026</p>
                <p className="text-[10px] text-slate-500">Lokasi: Gedung Posyandu Dusun A</p>
                <p className="text-[10px] text-orange-700 font-bold mt-2">❗ Wajib membawa Buku KIA dan kartu pendaftaran digital.</p>
              </div>
            </CardContent>
          </Card>

          {/* Edukasi Keamanan Data */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Perlindungan Data Medis</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-slate-500 space-y-2 leading-relaxed">
              <p>Portal Smart Living Village mengenkripsi seluruh pertukaran berkas Rekam Medis (RM) menggunakan protokol SSL/TLS.</p>
              <p>Jika Anda melihat ketidaksesuaian data pada riwayat di atas, silakan hubungi Bidan Desa atau Puskesmas Pembantu setempat.</p>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
