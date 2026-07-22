'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Database, Plus, RefreshCw, HardDrive, AlertCircle, CheckCircle2, History, ShieldAlert, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const COLOR = '#1a237e';

interface BackupRecord {
  id: string;
  tanggal: string;
  namaBerkas: string;
  ukuran: string;
  tipe: 'Otomatis' | 'Manual';
  status: 'Sukses' | 'Gagal';
  lokasiPenyimpanan: string;
  masaPenyimpanan: string;
  integritas: 'Valid' | 'Belum Diperiksa';
}

const INITIAL_BACKUPS: BackupRecord[] = [
  { id: 'BK-009', tanggal: '18 Jul 2026, 03:00 WITA', namaBerkas: 'backup_slv_prod_20260718_0300.sql.gz', ukuran: '12.6 MB', tipe: 'Otomatis', status: 'Sukses', lokasiPenyimpanan: 'Cloud Storage (AWS Jakarta)', masaPenyimpanan: '5 Tahun', integritas: 'Valid' },
  { id: 'BK-008', tanggal: '17 Jul 2026, 03:00 WITA', namaBerkas: 'backup_slv_prod_20260717_0300.sql.gz', ukuran: '12.5 MB', tipe: 'Otomatis', status: 'Sukses', lokasiPenyimpanan: 'Cloud Storage (AWS Jakarta)', masaPenyimpanan: '5 Tahun', integritas: 'Valid' },
  { id: 'BK-007', tanggal: '16 Jul 2026, 15:45 WITA', namaBerkas: 'backup_slv_manual_revisi_dss.sql.gz', ukuran: '12.4 MB', tipe: 'Manual', status: 'Sukses', lokasiPenyimpanan: 'Local NAS Server', masaPenyimpanan: 'Permanen', integritas: 'Valid' },
  { id: 'BK-006', tanggal: '16 Jul 2026, 03:00 WITA', namaBerkas: 'backup_slv_prod_20260716_0300.sql.gz', ukuran: '12.4 MB', tipe: 'Otomatis', status: 'Sukses', lokasiPenyimpanan: 'Cloud Storage (AWS Jakarta)', masaPenyimpanan: '5 Tahun', integritas: 'Valid' },
];

export default function BackupRestorePage() {
  const [backups, setBackups] = useState<BackupRecord[]>(INITIAL_BACKUPS);
  const [creating, setCreating] = useState(false);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);
  const [restoreFile, setRestoreFile] = useState(INITIAL_BACKUPS[0].namaBerkas);
  const [confirmText, setConfirmText] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const handleBackupManual = () => {
    setCreating(true);
    setTimeout(() => {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      const timeStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
      const newBackup: BackupRecord = {
        id: `BK-0${backups.length + 6}`,
        tanggal: now.toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WITA',
        namaBerkas: `backup_slv_manual_${timeStr}.sql.gz`,
        ukuran: '12.7 MB',
        tipe: 'Manual',
        status: 'Sukses',
        lokasiPenyimpanan: 'Local NAS Server',
        masaPenyimpanan: 'Permanen',
        integritas: 'Valid'
      };
      setBackups([newBackup, ...backups]);
      setCreating(false);
      setNotification('Pencadangan manual sukses dilakukan & dicatat di Jejak Audit.');
      setTimeout(() => setNotification(null), 3000);
    }, 1500);
  };

  const handleRestoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmText !== 'PULIHKAN') {
      alert('Ketik "PULIHKAN" untuk mengonfirmasi tindakan pemulihan!');
      return;
    }
    // Simulasi restore
    setNotification(`Sistem berhasil dipulihkan ke titik arsip: ${restoreFile}. Log pemulihan dicatat di Jejak Audit.`);
    setShowRestoreConfirm(false);
    setConfirmText('');
    setTimeout(() => setNotification(null), 4000);
  };

  const runIntegrityCheck = (id: string) => {
    setBackups(prev => prev.map(b => b.id === id ? { ...b, integritas: 'Valid' } : b));
    alert(`Pemeriksaan integritas untuk file ${id} berhasil. Status berkas: VALID.`);
  };

  return (
    <div className="flex flex-col gap-5 text-xs">
      <PageTitle fitur="Pencadangan dan Pemulihan" modul="Administrasi Sistem" color={COLOR} />

      {/* Banner info */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <ShieldAlert size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 font-semibold leading-relaxed">
          <p>⚠️ <strong>Kebijakan Pemulihan Data:</strong> Tindakan pemulihan data (restore) akan menimpa seluruh basis data aktif sistem.</p>
          <p>Tindakan ini sangat berisiko tinggi, wajib membutuhkan konfirmasi keamanan ganda dan tercatat permanen di dalam Jejak Audit.</p>
        </div>
      </div>

      {/* Ringkasan */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Berkas Cadangan" value={backups.length} satuan="arsip SQL" barColor="blue" progress={100} />
        <StatCard label="Pencadangan Terjadwal" value="Harian" satuan="Pukul 03:00 WITA" barColor="green" progress={90} />
        <StatCard label="Simulasi Pemulihan" value="Sukses" satuan="Terakhir: 10 Jul 2026" barColor="purple" progress={100} />
        <StatCard label="Status Layanan AWS" value="Terhubung" satuan="AWS Cloud Storage" barColor="green" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Detail database backups */}
        <Card className="lg:col-span-2">
          <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Database size={14} /> Log Arsip Pencadangan Database &amp; Integritas Berkas
            </CardTitle>
            <Button
              disabled={creating}
              onClick={handleBackupManual}
              size="sm"
              className="h-8 text-xs font-bold bg-indigo-600 hover:bg-indigo-700"
            >
              {creating ? <RefreshCw size={12} className="animate-spin mr-1" /> : <Plus size={12} className="mr-1" />}
              {creating ? 'Mencadangkan...' : 'Buat Pencadangan Manual'}
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    {['ID', 'Tanggal', 'Nama Berkas', 'Ukuran', 'Tipe', 'Penyimpanan', 'Masa Simpan', 'Integritas', 'Aksi'].map(h => (
                      <TableHead key={h} className="font-bold text-slate-700">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backups.map((b) => (
                    <TableRow key={b.id} className="hover:bg-slate-50/50">
                      <TableCell className="font-mono font-bold text-slate-500">{b.id}</TableCell>
                      <TableCell className="font-mono whitespace-nowrap">{b.tanggal}</TableCell>
                      <TableCell className="font-mono text-slate-700">{b.namaBerkas}</TableCell>
                      <TableCell className="font-mono">{b.ukuran}</TableCell>
                      <TableCell>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${
                          b.tipe === 'Manual' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-slate-50 text-slate-650'
                        }`}>
                          {b.tipe}
                        </span>
                      </TableCell>
                      <TableCell>{b.lokasiPenyimpanan}</TableCell>
                      <TableCell className="font-semibold">{b.masaPenyimpanan}</TableCell>
                      <TableCell>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${
                          b.integritas === 'Valid' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {b.integritas}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => runIntegrityCheck(b.id)} size="sm" variant="ghost" className="h-7 w-7 p-0" title="Uji Integritas">
                          <CheckSquare size={13} className="text-indigo-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pemulihan Data */}
        <Card className="h-fit">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <RefreshCw size={14} /> Pemulihan Sistem (Restore)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-[11px] text-red-950 leading-relaxed font-semibold">
              ⚠️ Peringatan: Pemulihan data akan mengganti seluruh tabel di database utama dengan versi backup yang Anda pilih.
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="font-bold text-slate-700">PILIH FILE ARSIP DATABASE:</Label>
                <select
                  value={restoreFile}
                  onChange={e => setRestoreFile(e.target.value)}
                  className="w-full p-2 border rounded-lg h-9 bg-white text-xs"
                >
                  {backups.map(b => (
                    <option key={b.id} value={b.namaBerkas}>{b.namaBerkas} ({b.ukuran})</option>
                  ))}
                </select>
              </div>

              <div className="p-3 border rounded-lg bg-slate-50 space-y-2">
                <p className="font-bold text-[10px] text-indigo-850 uppercase">Simulasi Pemulihan:</p>
                <p className="text-[10px] text-slate-500 font-semibold leading-normal">
                  Sistem mendeteksi arsitektur PostgreSQL valid, file kompresi utuh, dan siap didekripsi tanpa downtime database cadangan.
                </p>
              </div>

              <Button
                onClick={() => setShowRestoreConfirm(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-9 text-xs"
              >
                Mulai Pemulihan Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog Konfirmasi Restore */}
      {showRestoreConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white shadow-2xl border">
            <CardHeader className="py-3 bg-red-50 flex flex-row items-center justify-between border-b">
              <CardTitle className="text-sm font-bold text-red-800 flex items-center gap-1.5">
                <ShieldAlert size={16} /> Konfirmasi Keamanan Restore
              </CardTitle>
              <Button onClick={() => setShowRestoreConfirm(false)} size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-800">✕</Button>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <p className="font-semibold text-slate-805 leading-normal">
                Anda memilih untuk memulihkan database menggunakan berkas:<br />
                <strong className="text-red-700 font-mono text-[11px] block mt-1">{restoreFile}</strong>
              </p>
              <div className="p-3 bg-red-50/50 rounded-lg text-[11px] text-red-900 leading-normal font-semibold">
                Tindakan ini tidak bisa dibatalkan! Semua input data setelah tanggal backup tersebut akan hilang permanen.
              </div>
              <form onSubmit={handleRestoreSubmit} className="space-y-3">
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700 block">Ketik "PULIHKAN" (huruf besar) untuk melanjutkan:</Label>
                  <Input
                    required
                    value={confirmText}
                    onChange={e => setConfirmText(e.target.value)}
                    placeholder="PULIHKAN"
                    className="h-9 text-xs text-center font-bold tracking-widest border-red-300 focus:ring-red-400"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t">
                  <Button type="button" variant="outline" onClick={() => setShowRestoreConfirm(false)} className="h-8 font-bold">Batal</Button>
                  <Button type="submit" className="h-8 bg-red-600 hover:bg-red-700 text-white font-bold">Saya Setuju, Pulihkan</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {notification && (
        <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border border-green-200 bg-white text-xs font-bold">
          <CheckCircle2 className="text-green-600" size={16} /> {notification}
        </div>
      )}
    </div>
  );
}
