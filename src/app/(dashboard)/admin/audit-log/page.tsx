'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, Search, RefreshCw, ShieldAlert, FileText, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COLOR = '#1a237e';

// Jejak Audit yang mencatat data sesuai spesifikasi revisi
const LOGS_DATA = [
  { id: 'AUD-001', user: 'admin_super', role: 'Administrator Sistem', waktu: '18 Jul 2026, 12:05 WITA', perangkat: 'Chrome on Windows 11', ip: '192.168.1.100', modul: 'Manajemen Periode', tindakan: 'Mengubah status periode assessment 2025 menjadi Tutup', nilaiSebelum: 'Status: Buka', nilaiSesudah: 'Status: Tutup', alasan: 'Instruksi ketua komite penelitian dan evaluasi', status: 'Sukses' },
  { id: 'AUD-002', user: 'pemdes_hasan', role: 'Pemerintah Desa', waktu: '18 Jul 2026, 11:20 WITA', perangkat: 'Safari on macOS', ip: '192.168.1.102', modul: 'Layanan Publik', tindakan: 'Menyetujui usulan pengajuan surat pengantar warga', nilaiSebelum: 'Status: Baru', nilaiSesudah: 'Status: Disetujui', alasan: 'Dokumen prasyarat lengkap dan divalidasi', status: 'Sukses' },
  { id: 'AUD-003', user: 'adat_buyung', role: 'Lembaga Adat', waktu: '18 Jul 2026, 08:15 WITA', perangkat: 'Chrome on Android', ip: '192.168.1.105', modul: 'Arsip Budaya', tindakan: 'Unggah naskah digital hukum adat Kedang Ipil', nilaiSebelum: '—', nilaiSesudah: 'File: hukum_adat_v1.pdf', alasan: 'Penyelamatan dokumen digital sejarah', status: 'Sukses' },
  { id: 'AUD-004', user: 'nakes_kartini', role: 'Tenaga Kesehatan', waktu: '18 Jul 2026, 09:30 WITA', perangkat: 'Firefox on Windows 10', ip: '192.168.1.110', modul: 'Posyandu Digital', tindakan: 'Mengubah tinggi badan balita umur 24 bulan', nilaiSebelum: 'Tinggi: 80cm', nilaiSesudah: 'Tinggi: 85cm', alasan: 'Koreksi kesalahan input pengukuran manual', status: 'Sukses' },
  { id: 'AUD-005', user: 'guru_dewi', role: 'Guru/Tenaga Pendidikan', waktu: '18 Jul 2026, 10:55 WITA', perangkat: 'Safari on iPadOS', ip: '192.168.1.112', modul: 'Literasi Digital', tindakan: 'Menginput sertifikat kelulusan kelas TIK', nilaiSebelum: 'Status: Menunggu', nilaiSesudah: 'Status: Lulus (Sertifikat Diterbitkan)', alasan: 'Ujian akhir diselesaikan dengan nilai 90', status: 'Sukses' },
  { id: 'AUD-006', user: 'unknown_user', role: 'Tamu', waktu: '15 Jul 2026, 11:45 WITA', perangkat: 'Chrome on Linux', ip: '202.152.33.45', modul: 'Autentikasi', tindakan: 'Gagal login: Salah kata sandi sebanyak 3x', nilaiSebelum: 'Percobaan: 2', nilaiSesudah: 'Akun dikunci otomatis', alasan: 'Proteksi keamanan brute-force', status: 'Gagal' },
];

export default function AuditLogPage() {
  const [search, setSearch] = useState('');
  const [logs, setLogs] = useState(LOGS_DATA);
  const [notification, setNotification] = useState<string | null>(null);

  const filtered = logs.filter(l =>
    l.user.toLowerCase().includes(search.toLowerCase()) ||
    l.modul.toLowerCase().includes(search.toLowerCase()) ||
    l.tindakan.toLowerCase().includes(search.toLowerCase()) ||
    l.role.toLowerCase().includes(search.toLowerCase())
  );

  const exportLogs = () => {
    setNotification('Ekspor Jejak Audit berhasil diunduh (PDF/CSV).');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Jejak Audit" modul="Administrasi Sistem" color={COLOR} />

      {/* Banner proteksi & kebijakan retensi log */}
      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-950 text-xs flex items-start gap-2.5">
        <ShieldAlert size={16} className="text-red-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 font-semibold leading-relaxed">
          <p>🚫 <strong>Keamanan Log:</strong> Jejak audit ini adalah rekaman hukum aktivitas sistem. Log tidak dapat diubah atau dihapus oleh pengguna biasa.</p>
          <p>Kebijakan retensi: Penghapusan log mengikuti kebijakan masa penyimpanan <strong>(5 tahun)</strong>, dan setiap penghapusan arsip lama harus tercatat dalam jejak audit ini.</p>
        </div>
      </div>

      {/* Ringkasan */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Log Terdaftar" value={4820} satuan="aktivitas" barColor="blue" progress={75} />
        <StatCard label="Aktivitas Sukses" value="99.2%" satuan="tingkat keberhasilan" barColor="green" progress={99} />
        <StatCard label="Aktivitas Gagal" value="0.8%" satuan="kejadian keamanan" barColor="orange" progress={1} />
        <StatCard label="Masa Penyimpanan" value="5 Tahun" satuan="kebijakan retensi" barColor="purple" progress={100} />
      </div>

      <Card>
        <CardHeader className="py-3 px-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Clock size={14} /> Riwayat Jejak Audit Transaksi &amp; Akses Sistem
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari log..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 w-48 h-8"
              />
            </div>
            <Button onClick={exportLogs} size="sm" className="h-8 text-xs font-bold bg-indigo-600 hover:bg-indigo-700">
              <Download size={13} className="mr-1" /> Ekspor Log
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-bold text-slate-700">Kode AUD</TableHead>
                  <TableHead className="font-bold text-slate-700">Pengguna</TableHead>
                  <TableHead className="font-bold text-slate-700">Peran Aktif</TableHead>
                  <TableHead className="font-bold text-slate-700">Waktu</TableHead>
                  <TableHead className="font-bold text-slate-700">Perangkat</TableHead>
                  <TableHead className="font-bold text-slate-700">Alamat IP</TableHead>
                  <TableHead className="font-bold text-slate-700">Modul</TableHead>
                  <TableHead className="font-bold text-slate-700">Tindakan</TableHead>
                  <TableHead className="font-bold text-slate-700">Nilai Sebelum</TableHead>
                  <TableHead className="font-bold text-slate-700">Nilai Sesudah</TableHead>
                  <TableHead className="font-bold text-slate-700">Alasan Perubahan</TableHead>
                  <TableHead className="font-bold text-slate-700 text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((l) => (
                  <TableRow key={l.id} className={`hover:bg-slate-50/50 ${l.status === 'Gagal' ? 'bg-red-50/40 hover:bg-red-50/60' : ''}`}>
                    <TableCell className="font-mono font-bold text-slate-500">{l.id}</TableCell>
                    <TableCell className="font-bold text-slate-800">{l.user}</TableCell>
                    <TableCell className="font-semibold text-indigo-750">{l.role}</TableCell>
                    <TableCell className="font-mono text-[10px] whitespace-nowrap">{l.waktu}</TableCell>
                    <TableCell className="whitespace-nowrap">{l.perangkat}</TableCell>
                    <TableCell className="font-mono text-[10px]">{l.ip}</TableCell>
                    <TableCell className="font-bold text-indigo-650">{l.modul}</TableCell>
                    <TableCell className="min-w-[150px] leading-normal">{l.tindakan}</TableCell>
                    <TableCell className="font-mono text-slate-500">{l.nilaiSebelum}</TableCell>
                    <TableCell className="font-mono text-indigo-700">{l.nilaiSesudah}</TableCell>
                    <TableCell className="text-slate-600 min-w-[130px] leading-normal">{l.alasan}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        l.status === 'Sukses' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {l.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {notification && (
        <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border border-green-200 bg-white text-xs font-bold">
          <FileText className="text-green-600" size={16} /> {notification}
        </div>
      )}
    </div>
  );
}
