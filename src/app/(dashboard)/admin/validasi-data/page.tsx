'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2, XCircle, ShieldAlert, FileText, Info, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COLOR = '#1a237e';

interface DataTeknis {
  id: string;
  namaData: string;
  sumberData: string;
  formatData: string;
  kolomWajib: string;
  kodeWilayah: string;
  waktuPembaruan: string;
  statusSinkronisasi: string;
  statusValidasiTeknis: 'Valid' | 'Tidak Valid' | 'Menunggu';
}

const MOCK_DATA: DataTeknis[] = [
  { id: 'DT-01', namaData: 'Readiness Assessment 2026 – Jonggon Jaya', sumberData: 'SID', formatData: 'JSON', kolomWajib: 'Lengkap', kodeWilayah: '6404012001', waktuPembaruan: '01 Juli 2026', statusSinkronisasi: 'Tersinkronisasi', statusValidasiTeknis: 'Valid' },
  { id: 'DT-02', namaData: 'Posyandu Balita – Kedang Ipil', sumberData: 'EHDW', formatData: 'XML', kolomWajib: 'Lengkap', kodeWilayah: '6404012002', waktuPembaruan: '02 Juli 2026', statusSinkronisasi: 'Tersinkronisasi', statusValidasiTeknis: 'Valid' },
  { id: 'DT-03', namaData: 'Data Pendidikan – Lung Anai', sumberData: 'Kemendikbud', formatData: 'CSV', kolomWajib: 'Ada kolom kosong', kodeWilayah: '6404012003', waktuPembaruan: '03 Juli 2026', statusSinkronisasi: 'Tertunda', statusValidasiTeknis: 'Tidak Valid' },
  { id: 'DT-04', namaData: 'Kalender Adat – Upacara Mecaq Undat', sumberData: 'Lembaga Adat', formatData: 'Form Digital', kolomWajib: 'Lengkap', kodeWilayah: '6404012001', waktuPembaruan: '05 Juli 2026', statusSinkronisasi: 'Menunggu', statusValidasiTeknis: 'Menunggu' },
];

const VERIFIKATOR_SUBSTANTIF = [
  { bidang: 'Pemerintahan', verifikator: 'Pemerintah Desa' },
  { bidang: 'Pendidikan', verifikator: 'Guru / Tenaga Pendidikan' },
  { bidang: 'Kesehatan', verifikator: 'Tenaga Kesehatan' },
  { bidang: 'Budaya', verifikator: 'Lembaga Adat' },
  { bidang: 'Aspirasi Sosial', verifikator: 'Tokoh Masyarakat atau Pemerintah Desa' },
  { bidang: 'Keputusan', verifikator: 'Pemerintah Desa dan pihak yang berwenang' },
];

export default function ValidasiDataPage() {
  const [data, setData] = useState<DataTeknis[]>(MOCK_DATA);
  const [notification, setNotification] = useState<string | null>(null);

  const handleValidasi = (id: string, status: 'Valid' | 'Tidak Valid') => {
    setData(prev => prev.map(d => d.id === id ? { ...d, statusValidasiTeknis: status } : d));
    setNotification(`Validasi teknis berhasil: ${status}`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Validasi Teknis dan Kualitas Data" modul="Framework &amp; Assessment" color={COLOR} />

      {/* Banner batasan */}
      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5">
        <ShieldAlert size={15} className="text-blue-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 font-semibold">
          <p>ℹ️ <strong>Administrator hanya melakukan validasi teknis</strong>, meliputi: format data, kolom wajib, duplikasi, kode wilayah, tipe data, sumber, waktu pembaruan, dan status sinkronisasi.</p>
          <p>Validasi substantif (kebenaran isi) dilakukan oleh <strong>pemilik bidang</strong> yang berwenang — bukan Administrator Sistem.</p>
        </div>
      </div>

      {/* Tab 1: Validasi Teknis */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <FileText size={14} /> Validasi Teknis Data (Kewenangan Administrator)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  {['ID', 'Nama Data', 'Sumber', 'Format', 'Kolom Wajib', 'Kode Wilayah', 'Waktu Pembaruan', 'Status Sinkronisasi', 'Validasi Teknis', 'Aksi'].map(h => (
                    <TableHead key={h} className="font-bold text-slate-700">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map(d => (
                  <TableRow key={d.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono font-bold text-slate-500">{d.id}</TableCell>
                    <TableCell className="font-bold text-slate-800 max-w-[180px] truncate" title={d.namaData}>{d.namaData}</TableCell>
                    <TableCell>{d.sumberData}</TableCell>
                    <TableCell>{d.formatData}</TableCell>
                    <TableCell>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${d.kolomWajib === 'Lengkap' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {d.kolomWajib}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono">{d.kodeWilayah}</TableCell>
                    <TableCell>{d.waktuPembaruan}</TableCell>
                    <TableCell>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${d.statusSinkronisasi === 'Tersinkronisasi' ? 'bg-green-50 text-green-700 border-green-200' : d.statusSinkronisasi === 'Tertunda' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                        {d.statusSinkronisasi}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${d.statusValidasiTeknis === 'Valid' ? 'bg-green-50 text-green-700 border-green-200' : d.statusValidasiTeknis === 'Tidak Valid' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                        {d.statusValidasiTeknis}
                      </span>
                    </TableCell>
                    <TableCell>
                      {d.statusValidasiTeknis === 'Menunggu' && (
                        <div className="flex gap-1">
                          <Button onClick={() => handleValidasi(d.id, 'Valid')} size="sm" variant="ghost" className="h-7 px-2 hover:bg-green-50">
                            <CheckCircle2 size={13} className="text-green-600" />
                          </Button>
                          <Button onClick={() => handleValidasi(d.id, 'Tidak Valid')} size="sm" variant="ghost" className="h-7 px-2 hover:bg-red-50">
                            <XCircle size={13} className="text-red-600" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Tab 2: Verifikator Substantif */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Users size={14} /> Verifikator Substantif Per Bidang (Bukan Kewenangan Administrator)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-xs text-slate-500 mb-3 font-semibold bg-slate-50 p-2.5 rounded-lg border">
            ℹ️ Validasi substantif (kebenaran dan kewajaran isi data) <strong>harus dilakukan oleh pemilik bidang</strong> yang berwenang — bukan Administrator Sistem. Tabel berikut adalah panduan referensi.
          </p>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-bold text-slate-700">Jenis Data / Bidang</TableHead>
                <TableHead className="font-bold text-slate-700">Verifikator Substantif yang Berwenang</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {VERIFIKATOR_SUBSTANTIF.map((v, i) => (
                <TableRow key={i} className="hover:bg-slate-50/50">
                  <TableCell className="font-bold text-slate-800">{v.bidang}</TableCell>
                  <TableCell className="text-indigo-700 font-semibold">{v.verifikator}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {notification && (
        <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border border-green-200 bg-white text-xs font-bold">
          <CheckCircle2 className="text-green-600" size={16} /> {notification}
        </div>
      )}
    </div>
  );
}
