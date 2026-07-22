'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { FileCheck, Plus, CheckCircle2, MessageSquare, AlertTriangle, Eye, Trash2, Pencil, X } from 'lucide-react';

const COLOR = '#5c3d11'; // Cokelat Kayu Adat

interface TelaahProgramRecord {
  id: string;
  namaProgram: string;
  pemberiUsulan: string;
  kesimpulan: 'sesuai nilai adat' | 'sesuai dengan penyesuaian' | 'perlu musyawarah' | 'belum sesuai';
  alasanKeputusan: string;
  tindakLanjut: string;
  tanggalTelaah: string;
}

const INITIAL_RECORDS: TelaahProgramRecord[] = [
  { id: 'TL-01', namaProgram: 'Pembangunan Menara Internet Desa', pemberiUsulan: 'Pemerintah Desa Jonggon Jaya', kesimpulan: 'sesuai nilai adat', alasanKeputusan: 'Mendukung akses literasi digital pemuda adat tanpa mengganggu ritus sakral', tindakLanjut: 'Gunakan filter konten lokal positif', tanggalTelaah: '2026-07-12' },
  { id: 'TL-02', namaProgram: 'Pengembangan Wisata Desa Goa Adat', pemberiUsulan: 'Dinas Pariwisata Daerah', kesimpulan: 'sesuai dengan penyesuaian', alasanKeputusan: 'Potensi pariwisata tinggi namun kawasan ritus Hudoq harus dibatasi dari turis umum', tindakLanjut: 'Buat papan larangan masuk di area pemakaman tua & pasang pagar batas fisik', tanggalTelaah: '2026-07-14' },
  { id: 'TL-03', namaProgram: 'Pembangunan Gedung Olahraga Serbaguna', pemberiUsulan: 'Tokoh Pemuda Desa', kesimpulan: 'perlu musyawarah', alasanKeputusan: 'Lokasi rencana berada di batas hutan larangan adat Lung Anai', tindakLanjut: 'Agendakan Rapat Adat di Rumah Betang minggu depan', tanggalTelaah: '2026-07-16' },
  { id: 'TL-04', namaProgram: 'Kemitraan Perkebunan Kelapa Sawit Swasta', pemberiUsulan: 'Investor Swasta', kesimpulan: 'belum sesuai', alasanKeputusan: 'Skema pembagian wilayah mengancam wilayah hutan adat leluhur', tindakLanjut: 'Usulan ditolak total, cari skema kemitraan ekowisata mandiri', tanggalTelaah: '2026-07-17' },
];

export default function TelaahPersetujuanAdatPage() {
  const [items, setItems] = useState<TelaahProgramRecord[]>(INITIAL_RECORDS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TelaahProgramRecord | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form states
  const [namaProgram, setNamaProgram] = useState('');
  const [pemberiUsulan, setPemberiUsulan] = useState('');
  const [kesimpulan, setKesimpulan] = useState<TelaahProgramRecord['kesimpulan']>('sesuai nilai adat');
  const [alasanKeputusan, setAlasanKeputusan] = useState('');
  const [tindakLanjut, setTindakLanjut] = useState('');

  const openAdd = () => {
    setEditingItem(null);
    setNamaProgram(''); setPemberiUsulan(''); setKesimpulan('sesuai nilai adat');
    setAlasanKeputusan(''); setTindakLanjut('');
    setIsModalOpen(true);
  };

  const openEdit = (item: TelaahProgramRecord) => {
    setEditingItem(item);
    setNamaProgram(item.namaProgram); setPemberiUsulan(item.pemberiUsulan);
    setKesimpulan(item.kesimpulan); setAlasanKeputusan(item.alasanKeputusan); setTindakLanjut(item.tindakLanjut);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { namaProgram, pemberiUsulan, kesimpulan, alasanKeputusan, tindakLanjut };
    if (editingItem) {
      setItems(prev => prev.map(x => x.id === editingItem.id ? { ...x, ...payload } : x));
      setNotification('Hasil telaah program berhasil diperbarui!');
    } else {
      setItems(prev => [...prev, {
        id: `TL-0${prev.length + 1}`, ...payload, tanggalTelaah: new Date().toISOString().split('T')[0]
      }]);
      setNotification('Hasil telaah program baru berhasil dicatat!');
    }
    setIsModalOpen(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus arsip telaah adat ini?')) {
      setItems(prev => prev.filter(x => x.id !== id));
      setNotification('Hasil telaah program berhasil dihapus.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const getKesimpulanColor = (k: string) => {
    switch (k) {
      case 'sesuai nilai adat': return 'bg-green-50 text-green-700 border-green-200';
      case 'sesuai dengan penyesuaian': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'perlu musyawarah': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'belum sesuai': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-500';
    }
  };

  return (
    <div className="flex flex-col gap-5 text-xs">
      <PageTitle fitur="Telaah dan Persetujuan Adat" modul="Penelitian &amp; Evaluasi" color={COLOR} />

      {/* Banner informasi */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <AlertTriangle size={15} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          📋 <strong>Telaah Keselarasan Budaya:</strong> Lembaga Adat tidak memvalidasi seluruh program pemerintah desa secara teknis atau administratif, melainkan menelaah program kerja berdasarkan keselarasan dengan <strong>norma hukum adat, kearifan lokal, dan kelestarian Betang</strong>.
        </p>
      </div>

      <Card>
        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <FileCheck size={14} /> Arsip Telaah Keselarasan Program dengan Nilai Adat
          </CardTitle>
          <Button onClick={openAdd} size="sm" className="h-8 text-xs font-bold bg-[#5c3d11] hover:bg-[#432c0c] text-white">
            <Plus size={13} className="mr-1" /> Catat Telaah Program
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  {['ID', 'Nama Program Kerja', 'Pemberi Usulan', 'Kesimpulan Telaah', 'Alasan Keputusan Adat', 'Rekomendasi Tindak Lanjut', 'Tgl Keputusan', 'Aksi'].map(h => (
                    <TableHead key={h} className="font-bold text-slate-700">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map(item => (
                  <TableRow key={item.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono font-bold text-slate-500">{item.id}</TableCell>
                    <TableCell className="font-bold text-slate-800">{item.namaProgram}</TableCell>
                    <TableCell className="font-semibold text-slate-700">{item.pemberiUsulan}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border capitalize whitespace-nowrap ${getKesimpulanColor(item.kesimpulan)}`}>
                        {item.kesimpulan}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-slate-550" title={item.alasanKeputusan}>{item.alasanKeputusan}</TableCell>
                    <TableCell className="max-w-[150px] truncate text-slate-600 font-semibold" title={item.tindakLanjut}>{item.tindakLanjut}</TableCell>
                    <TableCell className="font-mono">{item.tanggalTelaah}</TableCell>
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
              <CardTitle className="text-sm font-bold text-slate-800">{editingItem ? 'Edit Catatan Telaah Adat' : 'Catat Telaah Program Desa'}</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsModalOpen(false)}>✕</Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Nama Program Kerja</Label>
                  <Input required value={namaProgram} onChange={e => setNamaProgram(e.target.value)} className="h-9 text-xs" placeholder="Contoh: Pembangunan Menara Internet Desa" />
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Pemberi Usulan / Instansi</Label>
                  <Input required value={pemberiUsulan} onChange={e => setPemberiUsulan(e.target.value)} className="h-9 text-xs" placeholder="Contoh: Pemerintah Desa Jonggon Jaya" />
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Kesimpulan Telaah Adat</Label>
                  <select value={kesimpulan} onChange={e => setKesimpulan(e.target.value as any)} className="w-full h-9 rounded-md border bg-white px-2 text-xs">
                    <option value="sesuai nilai adat">sesuai nilai adat</option>
                    <option value="sesuai dengan penyesuaian">sesuai dengan penyesuaian</option>
                    <option value="perlu musyawarah">perlu musyawarah</option>
                    <option value="belum sesuai">belum sesuai</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Alasan Keputusan Adat</Label>
                  <Textarea required value={alasanKeputusan} onChange={e => setAlasanKeputusan(e.target.value)} className="min-h-[60px] text-xs" placeholder="Jelaskan alasan kecocokan atau benturan adat..." />
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Rekomendasi Tindak Lanjut</Label>
                  <Input required value={tindakLanjut} onChange={e => setTindakLanjut(e.target.value)} className="h-9 text-xs" placeholder="Contoh: Perlu buat zonasi fisik" />
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="h-8 text-xs font-bold">Batal</Button>
                  <Button type="submit" className="h-8 text-xs font-bold bg-[#5c3d11] text-white hover:bg-[#432c0c]">Simpan Telaah</Button>
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
