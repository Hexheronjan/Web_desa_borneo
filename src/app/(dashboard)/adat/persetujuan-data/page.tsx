'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { ShieldCheck, Plus, CheckCircle2, Lock, Eye, Trash2, Pencil, X, Info } from 'lucide-react';

const COLOR = '#5c3d11'; // Cokelat Kayu Adat

interface DataBudayaRecord {
  id: string;
  namaPengetahuan: string;
  sumberPemilik: string; // Sumber & Pemilik Pengetahuan
  tujuanPenggunaan: string; // Tujuan Penggunaan
  klasifikasi: 'Publik' | 'Terbatas' | 'Rahasia'; // Klasifikasi
  status: 'Draf' | 'Menunggu Pemeriksaan' | 'Disetujui' | 'Terbatas' | 'Ditolak' | 'Dicabut' | 'Tidak Didigitalisasi';
  tanggalPengajuan: string;
}

const INITIAL_RECORDS: DataBudayaRecord[] = [
  { id: 'DB-01', namaPengetahuan: 'Silsilah Suku Dayak Kenyah Lung Anai', sumberPemilik: 'Tetua Adat Buyung', tujuanPenggunaan: 'Dokumentasi internal dan edukasi turunan', klasifikasi: 'Terbatas', status: 'Terbatas', tanggalPengajuan: '2026-07-10' },
  { id: 'DB-02', namaPengetahuan: 'Musik Dan Lagu Pengiring Tari Hudoq', sumberPemilik: 'Sanggar Seni Lung Anai', tujuanPenggunaan: 'Publikasi pariwisata daerah', klasifikasi: 'Publik', status: 'Disetujui', tanggalPengajuan: '2026-07-12' },
  { id: 'DB-03', namaPengetahuan: 'Mantra & Pengobatan Tradisional Baliean', sumberPemilik: 'Pawang Adat Jafar', tujuanPenggunaan: 'Warisan turun-temurun eksklusif keluarga pawang', klasifikasi: 'Rahasia', status: 'Tidak Didigitalisasi', tanggalPengajuan: '2026-07-15' },
  { id: 'DB-04', namaPengetahuan: 'Peta Geospasial Wilayah Hutan Lindung Adat', sumberPemilik: 'Lembaga Adat Lung Anai', tujuanPenggunaan: 'Assessment legalitas wilayah adat di PMD', klasifikasi: 'Terbatas', status: 'Menunggu Pemeriksaan', tanggalPengajuan: '2026-07-18' },
];

export default function PersetujuanKlasifikasiDataBudayaPage() {
  const [items, setItems] = useState<DataBudayaRecord[]>(INITIAL_RECORDS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DataBudayaRecord | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form states
  const [namaPengetahuan, setNamaPengetahuan] = useState('');
  const [sumberPemilik, setSumberPemilik] = useState('');
  const [tujuanPenggunaan, setTujuanPenggunaan] = useState('');
  const [klasifikasi, setKlasifikasi] = useState<'Publik' | 'Terbatas' | 'Rahasia'>('Terbatas');
  const [status, setStatus] = useState<DataBudayaRecord['status']>('Menunggu Pemeriksaan');

  const openAdd = () => {
    setEditingItem(null);
    setNamaPengetahuan(''); setSumberPemilik(''); setTujuanPenggunaan('');
    setKlasifikasi('Terbatas'); setStatus('Menunggu Pemeriksaan');
    setIsModalOpen(true);
  };

  const openEdit = (item: DataBudayaRecord) => {
    setEditingItem(item);
    setNamaPengetahuan(item.namaPengetahuan); setSumberPemilik(item.sumberPemilik);
    setTujuanPenggunaan(item.tujuanPenggunaan); setKlasifikasi(item.klasifikasi); setStatus(item.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { namaPengetahuan, sumberPemilik, tujuanPenggunaan, klasifikasi, status };
    if (editingItem) {
      setItems(prev => prev.map(x => x.id === editingItem.id ? { ...x, ...payload } : x));
      setNotification('Berkas data budaya berhasil diperbarui!');
    } else {
      setItems(prev => [...prev, {
        id: `DB-0${prev.length + 1}`, ...payload, tanggalPengajuan: new Date().toISOString().split('T')[0]
      }]);
      setNotification('Berkas data budaya baru berhasil didaftarkan!');
    }
    setIsModalOpen(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus arsip klasifikasi ini?')) {
      setItems(prev => prev.filter(x => x.id !== id));
      setNotification('Data budaya berhasil dihapus dari daftar.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disetujui': return 'bg-green-50 text-green-700 border-green-200';
      case 'Terbatas': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Ditolak': return 'bg-red-50 text-red-700 border-red-200';
      case 'Dicabut': return 'bg-slate-100 text-slate-650 border-slate-200';
      case 'Tidak Didigitalisasi': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Menunggu Pemeriksaan': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-500';
    }
  };

  return (
    <div className="flex flex-col gap-5 text-xs">
      <PageTitle fitur="Persetujuan dan Klasifikasi Data Budaya" modul="Penelitian &amp; Evaluasi" color={COLOR} />

      {/* Banner perlindungan */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <Info size={15} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          🔒 <strong>Aturan Kebijakan Data Adat:</strong> Seluruh pengetahuan tradisional, warisan budaya fisik/non-fisik, dan data tokoh adat wajib ditetapkan kepemilikan, klasifikasi akses, dan tujuan pemanfaatannya demi mencegah eksploitasi budaya tanpa izin.
        </p>
      </div>

      <Card>
        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck size={14} /> Daftar Dokumen, Kepemilikan &amp; Status Akses Budaya
          </CardTitle>
          <Button onClick={openAdd} size="sm" className="h-8 text-xs font-bold bg-[#5c3d11] hover:bg-[#432c0c] text-white">
            <Plus size={13} className="mr-1" /> Klasifikasikan Data Baru
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  {['ID', 'Nama Pengetahuan/Dokumen', 'Sumber / Pemilik Pengetahuan', 'Tujuan Penggunaan', 'Klasifikasi', 'Status Akses', 'Tanggal Kirim', 'Aksi'].map(h => (
                    <TableHead key={h} className="font-bold text-slate-700">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map(item => (
                  <TableRow key={item.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono font-bold text-slate-500">{item.id}</TableCell>
                    <TableCell className="font-bold text-slate-800">{item.namaPengetahuan}</TableCell>
                    <TableCell className="font-semibold text-slate-700">{item.sumberPemilik}</TableCell>
                    <TableCell className="max-w-[200px] truncate text-slate-500" title={item.tujuanPenggunaan}>{item.tujuanPenggunaan}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                        item.klasifikasi === 'Publik' ? 'bg-green-50 text-green-700 border-green-200' :
                        item.klasifikasi === 'Terbatas' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {item.klasifikasi}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono">{item.tanggalPengajuan}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button onClick={() => openEdit(item)} size="sm" variant="ghost" className="h-7 w-7 p-0"><Pencil size={13} className="text-blue-600" /></Button>
                        <Button onClick={() => handleDelete(item.id)} size="sm" variant="ghost" className="h-7 w-7 p-0"><Trash2 size={13} className="text-red-650" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white shadow-2xl border">
            <CardHeader className="py-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800">{editingItem ? 'Edit Klasifikasi & Persetujuan' : 'Klasifikasikan Data Budaya Baru'}</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsModalOpen(false)}>✕</Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Nama Pengetahuan / Berkas Budaya</Label>
                  <Input required value={namaPengetahuan} onChange={e => setNamaPengetahuan(e.target.value)} className="h-9 text-xs" placeholder="Contoh: Upacara Ritual Mecaq Undat" />
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Sumber / Pemilik Pengetahuan</Label>
                  <Input required value={sumberPemilik} onChange={e => setSumberPemilik(e.target.value)} className="h-9 text-xs" placeholder="Contoh: Tetua Adat Lung Anai" />
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Tujuan Penggunaan &amp; Pemanfaatan</Label>
                  <Textarea required value={tujuanPenggunaan} onChange={e => setTujuanPenggunaan(e.target.value)} className="min-h-[60px] text-xs" placeholder="Deskripsikan tujuan dan batasan penggunaan..." />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Klasifikasi Keamanan</Label>
                    <select value={klasifikasi} onChange={e => setKlasifikasi(e.target.value as any)} className="w-full h-9 rounded-md border bg-white px-2 text-xs">
                      <option value="Publik">Publik</option>
                      <option value="Terbatas">Terbatas</option>
                      <option value="Rahasia">Rahasia</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Status Keputusan Lembaga</Label>
                    <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full h-9 rounded-md border bg-white px-2 text-xs">
                      <option value="Draf">Draf</option>
                      <option value="Menunggu Pemeriksaan">Menunggu Pemeriksaan</option>
                      <option value="Disetujui">Disetujui</option>
                      <option value="Terbatas">Terbatas</option>
                      <option value="Ditolak">Ditolak</option>
                      <option value="Dicabut">Dicabut</option>
                      <option value="Tidak Didigitalisasi">Tidak Didigitalisasi</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="h-8 text-xs font-bold">Batal</Button>
                  <Button type="submit" className="h-8 text-xs font-bold bg-[#5c3d11] text-white hover:bg-[#432c0c]">Simpan Keputusan</Button>
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
