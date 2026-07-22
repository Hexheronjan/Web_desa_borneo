'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, ShieldAlert, CheckCircle2, Landmark } from 'lucide-react';

const COLOR = '#1a237e';

interface TataKelola {
  id: string;
  pemilikData: string;
  pengelola: string;
  verifikator: string;
  pemberiPersetujuan: string;
  jadwalPembaruan: string;
  masaPenyimpanan: string;
  klasifikasi: 'Publik' | 'Terbatas' | 'Rahasia';
  prosedurPenggunaan: string;
  prosedurPublikasi: string;
}

const MOCK: TataKelola[] = [
  { id: 'TK-01', pemilikData: 'Pemerintah Desa Jonggon Jaya', pengelola: 'Operator SID', verifikator: 'Pemerintah Desa', pemberiPersetujuan: 'Kepala Desa', jadwalPembaruan: 'Setiap bulan', masaPenyimpanan: '5 tahun', klasifikasi: 'Terbatas', prosedurPenggunaan: 'SK Desa No. 12/2025', prosedurPublikasi: 'Rapat Musyawarah Desa' },
  { id: 'TK-02', pemilikData: 'Lembaga Adat Dayak Benuaq', pengelola: 'Ketua Lembaga Adat', verifikator: 'Lembaga Adat', pemberiPersetujuan: 'Majelis Adat', jadwalPembaruan: 'Per event budaya', masaPenyimpanan: 'Permanen', klasifikasi: 'Publik', prosedurPenggunaan: 'Peraturan Adat 01/2024', prosedurPublikasi: 'Portal Budaya Desa' },
];

export default function GovernanceManagementPage() {
  const [items, setItems] = useState<TataKelola[]>(MOCK);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TataKelola | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form states
  const [pemilikData, setPemilikData] = useState('');
  const [pengelola, setPengelola] = useState('');
  const [verifikator, setVerifikator] = useState('');
  const [pemberiPersetujuan, setPemberiPersetujuan] = useState('');
  const [jadwalPembaruan, setJadwalPembaruan] = useState('');
  const [masaPenyimpanan, setMasaPenyimpanan] = useState('');
  const [klasifikasi, setKlasifikasi] = useState<'Publik' | 'Terbatas' | 'Rahasia'>('Terbatas');
  const [prosedurPenggunaan, setProsedurPenggunaan] = useState('');
  const [prosedurPublikasi, setProsedurPublikasi] = useState('');

  const openAdd = () => {
    setEditingItem(null);
    setPemilikData(''); setPengelola(''); setVerifikator(''); setPemberiPersetujuan('');
    setJadwalPembaruan(''); setMasaPenyimpanan(''); setKlasifikasi('Terbatas');
    setProsedurPenggunaan(''); setProsedurPublikasi('');
    setIsModalOpen(true);
  };

  const openEdit = (item: TataKelola) => {
    setEditingItem(item);
    setPemilikData(item.pemilikData); setPengelola(item.pengelola); setVerifikator(item.verifikator);
    setPemberiPersetujuan(item.pemberiPersetujuan); setJadwalPembaruan(item.jadwalPembaruan);
    setMasaPenyimpanan(item.masaPenyimpanan); setKlasifikasi(item.klasifikasi);
    setProsedurPenggunaan(item.prosedurPenggunaan); setProsedurPublikasi(item.prosedurPublikasi);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { pemilikData, pengelola, verifikator, pemberiPersetujuan, jadwalPembaruan, masaPenyimpanan, klasifikasi, prosedurPenggunaan, prosedurPublikasi };
    if (editingItem) {
      setItems(prev => prev.map(x => x.id === editingItem.id ? { ...x, ...data } : x));
      setNotification('Konfigurasi tata kelola berhasil diperbarui!');
    } else {
      setItems(prev => [...prev, { id: `TK-0${prev.length + 1}`, ...data }]);
      setNotification('Konfigurasi tata kelola baru berhasil ditambahkan!');
    }
    setIsModalOpen(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus konfigurasi tata kelola ini?')) {
      setItems(prev => prev.filter(x => x.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Konfigurasi Tata Kelola Sistem" modul="Governance &amp; DSS" color={COLOR} />

      {/* Banner batasan */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <ShieldAlert size={15} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          ⚠️ <strong>Batas Kewenangan:</strong> Administrator menerapkan konfigurasi tata kelola yang telah disetujui. Admin tidak menetapkan sendiri kewenangan pemerintah desa atau lembaga adat.
        </p>
      </div>

      <Card>
        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Landmark size={14} /> Master Konfigurasi Tata Kelola Sistem
          </CardTitle>
          <Button onClick={openAdd} size="sm" className="h-8 text-xs font-bold">
            <Plus size={13} className="mr-1" /> Tambah Konfigurasi
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  {['ID', 'Pemilik Data', 'Pengelola', 'Verifikator', 'Pemberi Persetujuan', 'Jadwal Pembaruan', 'Masa Penyimpanan', 'Klasifikasi', 'Prosedur Penggunaan', 'Prosedur Publikasi', 'Aksi'].map(h => (
                    <TableHead key={h} className="font-bold text-slate-700">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map(item => (
                  <TableRow key={item.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono font-bold text-slate-500">{item.id}</TableCell>
                    <TableCell className="font-bold text-slate-800">{item.pemilikData}</TableCell>
                    <TableCell>{item.pengelola}</TableCell>
                    <TableCell>{item.verifikator}</TableCell>
                    <TableCell>{item.pemberiPersetujuan}</TableCell>
                    <TableCell>{item.jadwalPembaruan}</TableCell>
                    <TableCell>{item.masaPenyimpanan}</TableCell>
                    <TableCell>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${item.klasifikasi === 'Publik' ? 'bg-green-50 text-green-700 border-green-200' : item.klasifikasi === 'Terbatas' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {item.klasifikasi}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[120px] truncate" title={item.prosedurPenggunaan}>{item.prosedurPenggunaan}</TableCell>
                    <TableCell className="max-w-[120px] truncate" title={item.prosedurPublikasi}>{item.prosedurPublikasi}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button onClick={() => openEdit(item)} size="sm" variant="ghost" className="h-7 w-7 p-0"><Pencil size={13} className="text-blue-600" /></Button>
                        <Button onClick={() => handleDelete(item.id)} size="sm" variant="ghost" className="h-7 w-7 p-0"><Trash2 size={13} className="text-red-600" /></Button>
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
          <Card className="w-full max-w-lg bg-white shadow-2xl border max-h-[90vh] overflow-y-auto">
            <CardHeader className="py-3 flex flex-row items-center justify-between sticky top-0 bg-white border-b">
              <CardTitle className="text-sm font-bold text-slate-800">{editingItem ? 'Edit Konfigurasi Tata Kelola' : 'Tambah Konfigurasi Tata Kelola'}</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsModalOpen(false)}>✕</Button>
            </CardHeader>
            <CardContent className="p-4">
              <form onSubmit={handleSave} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1"><Label className="font-bold text-slate-700">Pemilik Data</Label><Input required value={pemilikData} onChange={e => setPemilikData(e.target.value)} className="h-9 text-xs" placeholder="Contoh: Pemerintah Desa" /></div>
                  <div className="space-y-1"><Label className="font-bold text-slate-700">Pengelola</Label><Input required value={pengelola} onChange={e => setPengelola(e.target.value)} className="h-9 text-xs" placeholder="Contoh: Operator SID" /></div>
                  <div className="space-y-1"><Label className="font-bold text-slate-700">Verifikator</Label><Input required value={verifikator} onChange={e => setVerifikator(e.target.value)} className="h-9 text-xs" placeholder="Contoh: Pemerintah Desa" /></div>
                  <div className="space-y-1"><Label className="font-bold text-slate-700">Pemberi Persetujuan</Label><Input required value={pemberiPersetujuan} onChange={e => setPemberiPersetujuan(e.target.value)} className="h-9 text-xs" placeholder="Contoh: Kepala Desa" /></div>
                  <div className="space-y-1"><Label className="font-bold text-slate-700">Jadwal Pembaruan</Label><Input value={jadwalPembaruan} onChange={e => setJadwalPembaruan(e.target.value)} className="h-9 text-xs" placeholder="Setiap bulan" /></div>
                  <div className="space-y-1"><Label className="font-bold text-slate-700">Masa Penyimpanan</Label><Input value={masaPenyimpanan} onChange={e => setMasaPenyimpanan(e.target.value)} className="h-9 text-xs" placeholder="5 tahun" /></div>
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Klasifikasi Data</Label>
                  <select value={klasifikasi} onChange={e => setKlasifikasi(e.target.value as any)} className="w-full p-2 border rounded-lg h-9 focus:outline-none bg-white">
                    <option value="Publik">Publik</option>
                    <option value="Terbatas">Terbatas</option>
                    <option value="Rahasia">Rahasia</option>
                  </select>
                </div>
                <div className="space-y-1"><Label className="font-bold text-slate-700">Prosedur Penggunaan</Label><Input value={prosedurPenggunaan} onChange={e => setProsedurPenggunaan(e.target.value)} className="h-9 text-xs" placeholder="Contoh: SK Desa No. 12/2025" /></div>
                <div className="space-y-1"><Label className="font-bold text-slate-700">Prosedur Publikasi</Label><Input value={prosedurPublikasi} onChange={e => setProsedurPublikasi(e.target.value)} className="h-9 text-xs" placeholder="Contoh: Rapat Musyawarah Desa" /></div>
                <div className="flex justify-end gap-2 pt-2 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="h-8 text-xs font-bold">Batal</Button>
                  <Button type="submit" className="h-8 text-xs font-bold">Simpan</Button>
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
