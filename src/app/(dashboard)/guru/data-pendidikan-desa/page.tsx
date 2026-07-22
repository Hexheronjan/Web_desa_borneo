'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, Eye, ShieldAlert, CheckCircle, Clock, RotateCcw, AlertTriangle } from 'lucide-react';

const COLOR = '#1565c0';

interface PendidikanRecord {
  id: number;
  namaSiswa: string;
  nik: string;
  kelas: string;
  sekolah: string;
  statusData: 'Draf' | 'Menunggu Verifikasi' | 'Terverifikasi' | 'Dikembalikan untuk Perbaikan' | 'Arsip';
  lastModifiedBy: string;
  lastModifiedTime: string;
}

const INITIAL_RECORDS: PendidikanRecord[] = [
  {
    id: 1,
    namaSiswa: 'Budi Santoso',
    nik: '640302********01',
    kelas: 'Kelas 4',
    sekolah: 'SDN 006 Lung Anai',
    statusData: 'Terverifikasi',
    lastModifiedBy: 'Guru Fasilitator',
    lastModifiedTime: '18 Jul 2026, 10:15',
  },
  {
    id: 2,
    namaSiswa: 'Siti Aminah',
    nik: '640302********02',
    kelas: 'Kelas 5',
    sekolah: 'SDN 006 Lung Anai',
    statusData: 'Menunggu Verifikasi',
    lastModifiedBy: 'Kader Pendidikan',
    lastModifiedTime: '20 Jul 2026, 14:30',
  },
  {
    id: 3,
    namaSiswa: 'Andi Wijaya',
    nik: '640302********03',
    kelas: 'Kelas 7',
    sekolah: 'SMP Filial Lung Anai',
    statusData: 'Draf',
    lastModifiedBy: 'Guru Fasilitator',
    lastModifiedTime: '21 Jul 2026, 09:00',
  },
  {
    id: 4,
    namaSiswa: 'Dewi Lestari',
    nik: '640302********04',
    kelas: 'Kelas 6',
    sekolah: 'SDN 006 Lung Anai',
    statusData: 'Dikembalikan untuk Perbaikan',
    lastModifiedBy: 'Operator Sekolah',
    lastModifiedTime: '19 Jul 2026, 16:45',
  },
];

export default function DataPendidikanDesaPage() {
  const [records, setRecords] = useState<PendidikanRecord[]>(INITIAL_RECORDS);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PendidikanRecord | null>(null);

  // Form states
  const [formNama, setFormNama] = useState('');
  const [formNik, setFormNik] = useState('');
  const [formKelas, setFormKelas] = useState('');
  const [formSekolah, setFormSekolah] = useState('');

  const handleOpenAdd = () => {
    setSelectedRecord(null);
    setFormNama('');
    setFormNik('');
    setFormKelas('');
    setFormSekolah('');
    setShowModal(true);
  };

  const handleOpenEdit = (rec: PendidikanRecord) => {
    setSelectedRecord(rec);
    setFormNama(rec.namaSiswa);
    setFormNik(rec.nik);
    setFormKelas(rec.kelas);
    setFormSekolah(rec.sekolah);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNama || !formNik || !formKelas || !formSekolah) {
      alert('Semua kolom wajib diisi!');
      return;
    }
    
    // Check duplication (simulated)
    const isDup = records.some(r => r.nik === formNik && r.id !== selectedRecord?.id);
    if (isDup) {
      alert('Peringatan Validasi: NIK sudah terdaftar dalam sistem!');
      return;
    }

    if (selectedRecord) {
      setRecords(prev => prev.map(r => r.id === selectedRecord.id ? {
        ...r,
        namaSiswa: formNama,
        nik: formNik,
        kelas: formKelas,
        sekolah: formSekolah,
        statusData: 'Draf', // Reset to draft on edit
        lastModifiedBy: 'Guru/Tenaga Pendidikan',
        lastModifiedTime: 'Hari ini, Baru saja',
      } : r));
    } else {
      const newRec: PendidikanRecord = {
        id: Date.now(),
        namaSiswa: formNama,
        nik: formNik,
        kelas: formKelas,
        sekolah: formSekolah,
        statusData: 'Draf',
        lastModifiedBy: 'Guru/Tenaga Pendidikan',
        lastModifiedTime: 'Hari ini, Baru saja',
      };
      setRecords(prev => [...prev, newRec]);
    }
    setShowModal(false);
  };

  const handleUpdateStatus = (id: number, status: PendidikanRecord['statusData']) => {
    setRecords(prev => prev.map(r => r.id === id ? {
      ...r,
      statusData: status,
      lastModifiedBy: 'Guru/Tenaga Pendidikan',
      lastModifiedTime: 'Hari ini, Baru saja',
    } : r));
  };

  return (
    <div className="flex flex-col gap-5 text-xs pb-10">
      <PageTitle fitur="Data Pendidikan Desa" modul="Guru/Tenaga Pendidikan" color={COLOR} />

      {/* Banner Privasi Data */}
      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-950 flex items-start gap-2">
        <ShieldAlert size={14} className="text-red-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          <strong>Kebijakan Privasi Penting:</strong> Data peserta didik yang bersifat pribadi (seperti nama lengkap, NIK, alamat lengkap) tidak boleh ditampilkan pada dasbor publik atau diakses pihak luar. Akses data ini dibatasi secara ketat berdasarkan wewenang layanan Anda.
        </p>
      </div>

      {/* ACTION BUTTONS BAR */}
      <div className="flex justify-between items-center bg-white p-3 rounded-xl border flex-wrap gap-2 shadow-sm">
        <div className="flex gap-2">
          <Button onClick={handleOpenAdd} className="bg-blue-700 hover:bg-blue-800 text-white font-bold h-9">
            <Plus size={14} className="mr-1" /> Tambah Data Pendidikan
          </Button>
          <Button variant="outline" className="h-9 font-bold border-blue-200 text-blue-700 hover:bg-blue-50">
            Ekspor Terbatas (.xlsx)
          </Button>
        </div>
        <p className="text-[10px] text-slate-400 font-mono">Ekspor hanya untuk internal dinas/sekolah berwenang</p>
      </div>

      {/* RECORDS LIST */}
      <Card>
        <CardHeader className="py-3 border-b">
          <CardTitle className="text-sm font-bold text-slate-700 uppercase">Manajemen Data Pendidikan</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {records.map(rec => (
            <div key={rec.id} className="p-3 border rounded-xl hover:border-blue-300 transition-all bg-white shadow-sm flex flex-col md:flex-row justify-between gap-3">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-800 text-xs">{rec.namaSiswa}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                    rec.statusData === 'Terverifikasi' ? 'bg-green-50 text-green-700 border-green-200' :
                    rec.statusData === 'Menunggu Verifikasi' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    rec.statusData === 'Dikembalikan untuk Perbaikan' ? 'bg-red-50 text-red-700 border-red-200' :
                    'bg-slate-50 text-slate-600 border-slate-200'
                  }`}>
                    {rec.statusData}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-1 gap-x-4 text-[10px] text-slate-500">
                  <div><strong>NIK:</strong> {rec.nik}</div>
                  <div><strong>Kelas:</strong> {rec.kelas}</div>
                  <div><strong>Sekolah:</strong> {rec.sekolah}</div>
                  <div><strong>Modifikator:</strong> {rec.lastModifiedBy}</div>
                </div>
                <p className="text-[9px] text-slate-400 font-mono">Pembaruan Terakhir: {rec.lastModifiedTime}</p>
              </div>

              <div className="flex gap-1.5 items-center flex-wrap md:flex-nowrap">
                <button onClick={() => handleOpenEdit(rec)} className="p-2 border rounded-lg hover:bg-slate-50 text-slate-700" title="Ubah Data">
                  <Edit2 size={12} />
                </button>
                {rec.statusData === 'Menunggu Verifikasi' && (
                  <>
                    <button onClick={() => handleUpdateStatus(rec.id, 'Terverifikasi')} className="p-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg font-bold flex items-center gap-0.5 text-[9px] hover:bg-green-100 transition-colors">
                      <CheckCircle size={10} /> Verifikasi
                    </button>
                    <button onClick={() => handleUpdateStatus(rec.id, 'Dikembalikan untuk Perbaikan')} className="p-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg font-bold flex items-center gap-0.5 text-[9px] hover:bg-red-100 transition-colors">
                      <RotateCcw size={10} /> Kembalikan
                    </button>
                  </>
                )}
                {rec.statusData === 'Draf' && (
                  <button onClick={() => handleUpdateStatus(rec.id, 'Menunggu Verifikasi')} className="p-1.5 bg-blue-50 text-blue-755 border border-blue-200 rounded-lg font-bold flex items-center gap-0.5 text-[9px] hover:bg-blue-105 transition-colors">
                    <Clock size={10} /> Ajukan Verif
                  </button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* FORM MODAL (Simulated) */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="py-3 border-b">
              <CardTitle className="text-sm font-bold text-slate-800">
                {selectedRecord ? 'Ubah Data Siswa' : 'Tambah Data Siswa'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <form onSubmit={handleSave} className="space-y-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Nama Siswa (Sesuai NIK)</label>
                  <input type="text" value={formNama} onChange={e => setFormNama(e.target.value)} className="w-full border rounded-lg p-2 text-xs" placeholder="Contoh: Budi Santoso" required />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">NIK (16 Digit)</label>
                  <input type="text" value={formNik} onChange={e => setFormNik(e.target.value)} className="w-full border rounded-lg p-2 text-xs" placeholder="Contoh: 640302********01" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Kelas / Jenjang</label>
                    <input type="text" value={formKelas} onChange={e => setFormKelas(e.target.value)} className="w-full border rounded-lg p-2 text-xs" placeholder="Contoh: Kelas 4" required />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Satuan Pendidikan</label>
                    <input type="text" value={formSekolah} onChange={e => setFormSekolah(e.target.value)} className="w-full border rounded-lg p-2 text-xs" placeholder="Contoh: SDN 006 Lung Anai" required />
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-3 border-t">
                  <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 border rounded-lg font-bold hover:bg-slate-50 transition-colors">Batal</button>
                  <button type="submit" className="px-3 py-1.5 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors">Simpan</button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
