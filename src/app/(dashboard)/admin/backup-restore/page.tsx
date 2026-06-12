'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Database, Plus, RefreshCw, HardDrive, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#1a237e';

const initialBackups = [
  { id: 'BK009', date: '11 Jun 2026, 03:00', file: 'backup_slv_prod_20260611_0300.sql.gz', size: '12.4 MB', type: 'Otomatis', status: 'Sukses' },
  { id: 'BK008', date: '10 Jun 2026, 03:00', file: 'backup_slv_prod_20260610_0300.sql.gz', size: '12.3 MB', type: 'Otomatis', status: 'Sukses' },
  { id: 'BK007', date: '09 Jun 2026, 15:45', file: 'backup_slv_manual_revisi_ahp.sql.gz', size: '12.2 MB', type: 'Manual', status: 'Sukses' },
  { id: 'BK006', date: '09 Jun 2026, 03:00', file: 'backup_slv_prod_20260609_0300.sql.gz', size: '12.1 MB', type: 'Otomatis', status: 'Sukses' },
  { id: 'BK005', date: '08 Jun 2026, 03:00', file: 'backup_slv_prod_20260608_0300.sql.gz', size: '12.0 MB', type: 'Otomatis', status: 'Sukses' },
  { id: 'BK004', date: '07 Jun 2026, 03:00', file: 'backup_slv_prod_20260607_0300.sql.gz', size: '11.9 MB', type: 'Otomatis', status: 'Sukses' }
];

export default function BackupRestorePage() {
  const [backups, setBackups] = useState(initialBackups);
  const [creating, setCreating] = useState(false);

  const handleBackup = () => {
    setCreating(true);
    setTimeout(() => {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      const timeStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
      const newBackup = {
        id: `BK${String(backups.length + 4).padStart(3, '0')}`,
        date: now.toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        file: `backup_slv_manual_${timeStr}.sql.gz`,
        size: '12.4 MB',
        type: 'Manual',
        status: 'Sukses'
      };
      setBackups([newBackup, ...backups]);
      setCreating(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Backup & Restore" modul="Backup & Recovery Data" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Backup" value={backups.length} satuan="arsip" barColor="blue" progress={100} />
        <StatCard label="Ukuran Storage" value="73.3 MB" satuan="digunakan" barColor="purple" progress={65} />
        <StatCard label="Backup Terjadwal" value="Harian" satuan="03:00 WIB" barColor="green" progress={90} />
        <StatCard label="Status Terakhir" value="Sukses" satuan="11 Jun 2026" barColor="green" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Database size={16} /> Riwayat Pencadangan Database (PostgreSQL)
              </CardTitle>
              <button
                disabled={creating}
                onClick={handleBackup}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1"
              >
                {creating ? <RefreshCw size={12} className="animate-spin" /> : <Plus size={12} />}
                {creating ? 'Mencadangkan...' : 'Buat Backup Baru'}
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4">ID</th>
                    <th className="pb-2 pr-4">Tanggal Backup</th>
                    <th className="pb-2 pr-4">Nama File</th>
                    <th className="pb-2 pr-4">Ukuran</th>
                    <th className="pb-2 pr-4">Tipe</th>
                    <th className="pb-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {backups.map((b, i) => (
                    <tr key={b.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-3 pr-4 font-mono font-bold text-xs text-indigo-700">{b.id}</td>
                      <td className="py-3 pr-4 text-xs font-mono text-slate-500">{b.date}</td>
                      <td className="py-3 pr-4 text-xs font-mono text-slate-700">{b.file}</td>
                      <td className="py-3 pr-4 text-xs font-mono text-slate-600">{b.size}</td>
                      <td className="py-3 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.type === 'Manual' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {b.type}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <RefreshCw size={16} /> Pemulihan Sistem (Restore)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex gap-2">
              <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-800 mb-1">Peringatan Penting</p>
                <p>Tindakan pemulihan data (Restore) akan menimpa seluruh database berjalan. Pastikan server dalam mode pemeliharaan (Maintenance Mode) sebelum menjalankan restore.</p>
              </div>
            </div>
            <div className="p-4 border rounded-xl bg-slate-50 space-y-3">
              <label className="block text-xs font-bold text-slate-700">PILIH FILE ARSIP (.SQL.GZ):</label>
              <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 text-xs">
                {backups.map(b => (
                  <option key={b.id} value={b.file}>{b.file} ({b.size})</option>
                ))}
              </select>
              <button
                disabled={creating}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1 shadow-sm"
              >
                Mulai Pemulihan Data
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
