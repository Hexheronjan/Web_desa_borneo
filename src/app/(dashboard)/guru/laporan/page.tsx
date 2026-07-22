'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { FileText, Download, ShieldCheck, Info } from 'lucide-react';

const COLOR = '#1565c0';

export default function LaporanPendidikanPage() {
  return (
    <div className="flex flex-col gap-5 text-xs pb-10">
      <PageTitle fitur="Laporan Pendidikan" modul="Guru/Tenaga Pendidikan" color={COLOR} />

      {/* Kebijakan Ekspor Data Sensitif */}
      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex items-start gap-2">
        <Info size={14} className="text-blue-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          <strong>Kebijakan Ekspor Laporan:</strong> Ekspor laporan harus mengikuti kewenangan yang diberikan. Data sensitif peserta didik (seperti detail NIK atau alamat pribadi) tidak boleh ikut dilampirkan dalam laporan umum yang dapat diakses publik.
        </p>
      </div>

      <Card>
        <CardHeader className="py-3 border-b">
          <CardTitle className="text-sm font-bold text-slate-700 uppercase">Daftar Dokumen Laporan Kependidikan</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {[
            { nama: 'Laporan Capaian SDG Desa 4 (Semester 1 2026)', format: 'PDF / XLSX', ukuran: '2.4 MB' },
            { nama: 'Laporan Evaluasi Pelatihan Literasi Digital Warga', format: 'PDF', ukuran: '1.8 MB' },
            { nama: 'Statistik Angka Partisipasi Sekolah (APK/APS) 2026', format: 'XLSX', ukuran: '950 KB' },
            { nama: 'Daftar Penerima Sertifikasi Kompetensi Digital Desa', format: 'PDF', ukuran: '1.2 MB' },
          ].map((doc, i) => (
            <div key={i} className="p-3 border rounded-xl hover:border-blue-300 transition-all bg-white shadow-sm flex justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-blue-700 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">{doc.nama}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Format: {doc.format} | Ukuran: {doc.ukuran}</p>
                </div>
              </div>
              <button className="flex items-center gap-1 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 px-2.5 py-1.5 rounded-lg font-bold transition-all text-[10px]">
                <Download size={11} /> Unduh
              </button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
