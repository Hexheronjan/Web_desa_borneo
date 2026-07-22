'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Send, Trash2, Bell, Users, Globe, Pencil, X, CheckCircle2, ShieldAlert } from 'lucide-react';

const COLOR = '#1a237e';

interface NotifSistem {
  id: string;
  judul: string;
  isi: string;
  jenis: 'layanan tidak tersedia' | 'sinkronisasi gagal' | 'pencadangan gagal' | 'kapasitas hampir penuh' | 'login berulang gagal' | 'akun tidak aktif' | 'akses tanpa izin' | 'perubahan konfigurasi' | 'data menunggu validasi' | 'pembaruan versi';
  target: 'Semua Peran' | 'Administrator Sistem' | 'Pemerintah Desa' | 'Lembaga Adat' | 'Tenaga Kesehatan' | 'Masyarakat Umum';
  tanggal: string;
  status: 'Terkirim' | 'Terjadwal' | 'Draft';
}

const INITIAL_NOTIFS: NotifSistem[] = [
  { id: 'NT-01', judul: 'Peringatan Kapasitas Cloud Storage Hampir Penuh', isi: 'Kapasitas penyimpanan server AWS sudah mencapai 88%. Pembersihan log backup lama akan otomatis berjalan.', jenis: 'kapasitas hampir penuh', target: 'Administrator Sistem', tanggal: '2026-07-18', status: 'Terkirim' },
  { id: 'NT-02', judul: 'Percobaan Login Gagal Berulang Kali', isi: 'Akun adat_jafar telah dikunci sementara karena salah password 3 kali berturut-turut.', jenis: 'login berulang gagal', target: 'Administrator Sistem', tanggal: '2026-07-15', status: 'Terkirim' },
  { id: 'NT-03', judul: 'Data SDGs & Kesiapan Menunggu Validasi Teknis', isi: 'Dataset Jonggon Jaya v2.0 semester I telah diunggah dan membutuhkan validasi dari Admin.', jenis: 'data menunggu validasi', target: 'Administrator Sistem', tanggal: '2026-07-18', status: 'Terjadwal' },
  { id: 'NT-04', judul: 'Pencadangan Otomatis PostgreSQL Gagal', isi: 'Pencadangan database terjadwal tanggal 16 Juli gagal dikarenakan server timeout.', jenis: 'pencadangan gagal', target: 'Administrator Sistem', tanggal: '2026-07-16', status: 'Terkirim' },
  { id: 'NT-05', judul: 'Pembaruan Aplikasi ke Versi v2.1', isi: 'Sistem SLV Borneo telah berhasil diperbarui ke versi v2.1 dengan penyempurnaan fitur administrasi.', jenis: 'pembaruan versi', target: 'Semua Peran', tanggal: '2026-07-18', status: 'Terkirim' },
];

export default function PengaturanNotifikasiPage() {
  const [notifikasis, setNotifikasis] = useState<NotifSistem[]>(INITIAL_NOTIFS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NotifSistem | null>(null);
  const [formData, setFormData] = useState<Partial<NotifSistem>>({});
  const [notification, setNotification] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ judul: '', isi: '', jenis: 'layanan tidak tersedia', target: 'Semua Peran', tanggal: new Date().toISOString().split('T')[0], status: 'Terkirim' });
    setIsModalOpen(true);
  };

  const handleEdit = (item: NotifSistem) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setNotifikasis(prev => prev.map(n => n.id === editingItem.id ? { ...formData, id: editingItem.id } as NotifSistem : n));
      setNotification('Notifikasi sistem berhasil diperbarui!');
    } else {
      const newNotif: NotifSistem = {
        id: `NT-0${notifikasis.length + 1}`,
        judul: formData.judul || '',
        isi: formData.isi || '',
        jenis: formData.jenis || 'layanan tidak tersedia',
        target: formData.target || 'Semua Peran',
        tanggal: formData.tanggal || new Date().toISOString().split('T')[0],
        status: formData.status || 'Terkirim',
      };
      setNotifikasis([newNotif, ...notifikasis]);
      setNotification('Notifikasi sistem baru berhasil dibuat!');
    }
    setIsModalOpen(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus notifikasi ini?')) {
      setNotifikasis(prev => prev.filter(n => n.id !== id));
      setNotification('Notifikasi berhasil dihapus.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-5 text-xs">
      <PageTitle fitur="Notifikasi Sistem" modul="Administrasi Sistem" color={COLOR} />

      <Card>
        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Bell size={14} /> Riwayat Log Notifikasi &amp; Kejadian Sistem
          </CardTitle>
          <Button onClick={handleAdd} size="sm" className="h-8 text-xs font-bold bg-indigo-600 hover:bg-indigo-700">
            <Plus size={13} className="mr-1" /> Buat Notifikasi Baru
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-bold text-slate-700">ID</TableHead>
                  <TableHead className="font-bold text-slate-700">Judul Pengumuman</TableHead>
                  <TableHead className="font-bold text-slate-700">Jenis Notifikasi Sistem</TableHead>
                  <TableHead className="font-bold text-slate-700">Target Peran</TableHead>
                  <TableHead className="font-bold text-slate-700">Isi Pesan</TableHead>
                  <TableHead className="font-bold text-slate-700">Tanggal</TableHead>
                  <TableHead className="font-bold text-slate-700">Status</TableHead>
                  <TableHead className="text-right font-bold text-slate-700">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifikasis.map((n) => (
                  <TableRow key={n.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono font-bold text-slate-500">{n.id}</TableCell>
                    <TableCell className="font-bold text-slate-800">{n.judul}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border capitalize whitespace-nowrap ${
                        n.jenis.includes('gagal') || n.jenis.includes('tidak tersedia') || n.jenis.includes('tanpa izin')
                          ? 'bg-red-50 text-red-700 border-red-200' 
                          : n.jenis.includes('penuh') || n.jenis.includes('menunggu') 
                          ? 'bg-amber-50 text-amber-700 border-amber-200' 
                          : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      }`}>
                        {n.jenis}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-slate-700 whitespace-nowrap">{n.target}</TableCell>
                    <TableCell className="text-slate-650 max-w-xs truncate" title={n.isi}>{n.isi}</TableCell>
                    <TableCell className="font-mono">{n.tanggal}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                        n.status === 'Terkirim' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {n.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button onClick={() => handleEdit(n)} size="sm" variant="ghost" className="h-7 w-7 p-0"><Pencil size={13} className="text-blue-650" /></Button>
                        <Button onClick={() => handleDelete(n.id)} size="sm" variant="ghost" className="h-7 w-7 p-0"><Trash2 size={13} className="text-red-650" /></Button>
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
          <Card className="w-full max-w-lg bg-white shadow-2xl border">
            <CardHeader className="py-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800">
                {editingItem ? 'Edit Notifikasi Sistem' : 'Buat Notifikasi Sistem Baru'}
              </CardTitle>
              <Button onClick={() => setIsModalOpen(false)} size="sm" variant="ghost" className="h-8 w-8 p-0">✕</Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Judul Pengumuman</Label>
                  <Input required value={formData.judul || ''} onChange={e => setFormData({ ...formData, judul: e.target.value })} placeholder="Contoh: Pemeliharaan Server Terjadwal" className="h-9 text-xs" />
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Isi Pengumuman / Pesan</Label>
                  <Textarea required value={formData.isi || ''} onChange={e => setFormData({ ...formData, isi: e.target.value })} placeholder="Tuliskan deskripsi notifikasi..." className="min-h-[70px] text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Jenis Kejadian Sistem</Label>
                    <select
                      value={formData.jenis || 'layanan tidak tersedia'}
                      onChange={e => setFormData({ ...formData, jenis: e.target.value as any })}
                      className="w-full h-9 rounded-md border bg-white px-2 text-xs"
                    >
                      <option value="layanan tidak tersedia">layanan tidak tersedia</option>
                      <option value="sinkronisasi gagal">sinkronisasi gagal</option>
                      <option value="pencadangan gagal">pencadangan gagal</option>
                      <option value="kapasitas hampir penuh">kapasitas hampir penuh</option>
                      <option value="login berulang gagal">login berulang gagal</option>
                      <option value="akun tidak aktif">akun tidak aktif</option>
                      <option value="akses tanpa izin">akses tanpa izin</option>
                      <option value="perubahan konfigurasi">perubahan konfigurasi</option>
                      <option value="data menunggu validasi">data menunggu validasi</option>
                      <option value="pembaruan versi">pembaruan versi</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Target Peran Penerima</Label>
                    <select
                      value={formData.target || 'Semua Peran'}
                      onChange={e => setFormData({ ...formData, target: e.target.value as any })}
                      className="w-full h-9 rounded-md border bg-white px-2 text-xs"
                    >
                      <option value="Semua Peran">Semua Peran</option>
                      <option value="Administrator Sistem">Administrator Sistem</option>
                      <option value="Pemerintah Desa">Pemerintah Desa</option>
                      <option value="Lembaga Adat">Lembaga Adat</option>
                      <option value="Tenaga Kesehatan">Tenaga Kesehatan</option>
                      <option value="Masyarakat Umum">Masyarakat Umum</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Tanggal Pengiriman</Label>
                    <Input required type="date" value={formData.tanggal || ''} onChange={e => setFormData({ ...formData, tanggal: e.target.value })} className="h-9 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Status Awal</Label>
                    <select
                      value={formData.status || 'Terkirim'}
                      onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full h-9 rounded-md border bg-white px-2 text-xs"
                    >
                      <option value="Terkirim">Terkirim</option>
                      <option value="Terjadwal">Terjadwal</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="h-8 font-bold">Batal</Button>
                  <Button type="submit" className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold"><Send size={12} className="mr-1" /> Simpan &amp; Kirim</Button>
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
