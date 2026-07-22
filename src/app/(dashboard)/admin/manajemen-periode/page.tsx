'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Lock, Unlock, ShieldAlert, Calendar, CheckCircle2 } from 'lucide-react';

const COLOR = '#1a237e';

interface Periode {
  id: string;
  namaPeriode: string;
  tanggalMulai: string;
  tanggalBerakhir: string;
  kondisiAwal: string;
  periodeImplementasi: string;
  periodeEvaluasi: string;
  jadwalPembaruan: string;
  status: 'Terbuka' | 'Ditutup';
}

const MOCK: Periode[] = [
  {
    id: 'PD-01',
    namaPeriode: 'Periode Penilaian I — 2025',
    tanggalMulai: '01 Januari 2025',
    tanggalBerakhir: '30 Juni 2025',
    kondisiAwal: 'Baseline data awal desa diambil dari SID',
    periodeImplementasi: '01 Jan — 31 Mar 2025',
    periodeEvaluasi: '01 Apr — 30 Jun 2025',
    jadwalPembaruan: 'Setiap akhir bulan',
    status: 'Ditutup',
  },
  {
    id: 'PD-02',
    namaPeriode: 'Periode Penilaian II — 2025',
    tanggalMulai: '01 Juli 2025',
    tanggalBerakhir: '31 Desember 2025',
    kondisiAwal: 'Mengacu skor akhir periode I',
    periodeImplementasi: '01 Jul — 30 Sep 2025',
    periodeEvaluasi: '01 Okt — 31 Des 2025',
    jadwalPembaruan: 'Setiap akhir bulan',
    status: 'Ditutup',
  },
  {
    id: 'PD-03',
    namaPeriode: 'Periode Penilaian I — 2026',
    tanggalMulai: '01 Januari 2026',
    tanggalBerakhir: '30 Juni 2026',
    kondisiAwal: 'Mengacu skor akhir periode II 2025',
    periodeImplementasi: '01 Jan — 31 Mar 2026',
    periodeEvaluasi: '01 Apr — 30 Jun 2026',
    jadwalPembaruan: 'Setiap akhir bulan',
    status: 'Terbuka',
  },
];

export default function ManajemenPeriodePage() {
  const [periodes, setPeriodes] = useState<Periode[]>(MOCK);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Periode | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form states
  const [namaPeriode, setNamaPeriode] = useState('');
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [tanggalBerakhir, setTanggalBerakhir] = useState('');
  const [kondisiAwal, setKondisiAwal] = useState('');
  const [periodeImpl, setPeriodeImpl] = useState('');
  const [periodeEval, setPeriodeEval] = useState('');
  const [jadwalPembaruan, setJadwalPembaruan] = useState('Setiap akhir bulan');

  const openAdd = () => {
    setEditingItem(null);
    setNamaPeriode(''); setTanggalMulai(''); setTanggalBerakhir('');
    setKondisiAwal(''); setPeriodeImpl(''); setPeriodeEval('');
    setJadwalPembaruan('Setiap akhir bulan');
    setIsModalOpen(true);
  };

  const openEdit = (p: Periode) => {
    if (p.status === 'Ditutup') {
      alert('⚠️ Periode yang sudah ditutup tidak dapat diubah tanpa prosedur pembukaan kembali dan jejak audit.');
      return;
    }
    setEditingItem(p);
    setNamaPeriode(p.namaPeriode); setTanggalMulai(p.tanggalMulai); setTanggalBerakhir(p.tanggalBerakhir);
    setKondisiAwal(p.kondisiAwal); setPeriodeImpl(p.periodeImplementasi); setPeriodeEval(p.periodeEvaluasi);
    setJadwalPembaruan(p.jadwalPembaruan);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const data: Omit<Periode, 'id' | 'status'> = {
      namaPeriode, tanggalMulai, tanggalBerakhir,
      kondisiAwal, periodeImplementasi: periodeImpl,
      periodeEvaluasi: periodeEval, jadwalPembaruan,
    };
    if (editingItem) {
      setPeriodes(prev => prev.map(p => p.id === editingItem.id ? { ...p, ...data } : p));
      setNotification('Periode berhasil diperbarui!');
    } else {
      setPeriodes(prev => [...prev, { id: `PD-0${prev.length + 1}`, ...data, status: 'Terbuka' }]);
      setNotification('Periode baru berhasil ditambahkan!');
    }
    setIsModalOpen(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleStatus = (id: string) => {
    const p = periodes.find(x => x.id === id);
    if (!p) return;
    if (p.status === 'Ditutup') {
      if (!confirm('Membuka kembali periode yang sudah ditutup memerlukan jejak audit. Tindakan ini akan dicatat. Lanjutkan?')) return;
      setPeriodes(prev => prev.map(x => x.id === id ? { ...x, status: 'Terbuka' } : x));
      setNotification('Periode dibuka kembali. Jejak audit dicatat.');
    } else {
      if (!confirm('Tutup periode ini? Data periode yang telah ditutup tidak boleh diubah tanpa prosedur pembukaan kembali.')) return;
      setPeriodes(prev => prev.map(x => x.id === id ? { ...x, status: 'Ditutup' } : x));
      setNotification('Periode berhasil ditutup. Jejak audit dicatat.');
    }
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Manajemen Periode" modul="Framework &amp; Assessment" color={COLOR} />

      {/* Banner aturan */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <ShieldAlert size={15} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          ⚠️ Admin dapat membuka atau menutup periode berdasarkan keputusan pengelola penelitian atau pemerintah desa. <strong>Data periode yang telah ditutup tidak boleh diubah tanpa prosedur pembukaan kembali dan jejak audit.</strong>
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar size={14} /> Daftar Periode Penilaian &amp; Evaluasi
          </CardTitle>
          <Button onClick={openAdd} size="sm" className="h-8 font-bold text-xs">
            <Plus size={14} className="mr-1" /> Tambah Periode
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  {['ID', 'Nama Periode', 'Tgl Mulai', 'Tgl Berakhir', 'Kondisi Awal', 'Periode Implementasi', 'Periode Evaluasi', 'Jadwal Pembaruan', 'Status', 'Aksi'].map(h => (
                    <TableHead key={h} className="font-bold text-slate-700">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {periodes.map(p => (
                  <TableRow key={p.id} className={p.status === 'Ditutup' ? 'opacity-70' : ''}>
                    <TableCell className="font-mono font-bold text-slate-500">{p.id}</TableCell>
                    <TableCell className="font-bold text-slate-800">{p.namaPeriode}</TableCell>
                    <TableCell>{p.tanggalMulai}</TableCell>
                    <TableCell>{p.tanggalBerakhir}</TableCell>
                    <TableCell className="max-w-[150px] truncate" title={p.kondisiAwal}>{p.kondisiAwal}</TableCell>
                    <TableCell>{p.periodeImplementasi}</TableCell>
                    <TableCell>{p.periodeEvaluasi}</TableCell>
                    <TableCell>{p.jadwalPembaruan}</TableCell>
                    <TableCell>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${p.status === 'Terbuka' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                        {p.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button onClick={() => toggleStatus(p.id)} size="sm" variant="ghost" className="h-7 w-7 p-0" title={p.status === 'Terbuka' ? 'Tutup Periode' : 'Buka Kembali'}>
                          {p.status === 'Terbuka' ? <Lock size={13} className="text-orange-600" /> : <Unlock size={13} className="text-emerald-600" />}
                        </Button>
                        <Button onClick={() => openEdit(p)} size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <Pencil size={13} className="text-blue-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg bg-white shadow-2xl border">
            <CardHeader className="py-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800">{editingItem ? 'Edit Periode' : 'Tambah Periode Penilaian'}</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsModalOpen(false)}>✕</Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Nama Periode</Label>
                  <Input required value={namaPeriode} onChange={e => setNamaPeriode(e.target.value)} placeholder="Contoh: Periode Penilaian I — 2026" className="h-9 text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Tanggal Mulai</Label>
                    <Input required value={tanggalMulai} onChange={e => setTanggalMulai(e.target.value)} placeholder="01 Januari 2026" className="h-9 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Tanggal Berakhir</Label>
                    <Input required value={tanggalBerakhir} onChange={e => setTanggalBerakhir(e.target.value)} placeholder="30 Juni 2026" className="h-9 text-xs" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Kondisi Awal</Label>
                  <Input value={kondisiAwal} onChange={e => setKondisiAwal(e.target.value)} placeholder="Contoh: Baseline data dari SID" className="h-9 text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Periode Implementasi</Label>
                    <Input value={periodeImpl} onChange={e => setPeriodeImpl(e.target.value)} placeholder="01 Jan — 31 Mar 2026" className="h-9 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Periode Evaluasi</Label>
                    <Input value={periodeEval} onChange={e => setPeriodeEval(e.target.value)} placeholder="01 Apr — 30 Jun 2026" className="h-9 text-xs" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Jadwal Pembaruan Data</Label>
                  <Input value={jadwalPembaruan} onChange={e => setJadwalPembaruan(e.target.value)} placeholder="Setiap akhir bulan" className="h-9 text-xs" />
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="h-8 text-xs font-bold">Batal</Button>
                  <Button type="submit" className="h-8 text-xs font-bold">Simpan Periode</Button>
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
