'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Send, Trash2, Bell, Users, Globe, Pencil, X } from 'lucide-react';

const COLOR = '#1a237e';

interface Notifikasi {
  id: string;
  judul: string;
  isi: string;
  target: 'Semua User' | 'Admin' | 'Operator SID' | 'Pemerintah Desa' | 'Nakes' | 'Guru' | 'Warga';
  tanggalKirim: string;
  status: 'Terkirim' | 'Terjadwal' | 'Draft';
}

export default function PengaturanNotifikasiPage() {
  const [notifikasi, setNotifikasi] = useState<Notifikasi[]>([
    { id: '1', judul: 'Maintenance System', isi: 'Sistem akan melakukan maintenance pada tanggal 30 Januari 2025 pukul 02:00 WIB', target: 'Semua User', tanggalKirim: '2025-01-20', status: 'Terkirim' },
    { id: '2', judul: 'Update Fitur Baru', isi: 'Fitur dashboard analytics baru telah tersedia untuk semua role', target: 'Admin', tanggalKirim: '2025-01-18', status: 'Terkirim' },
    { id: '3', judul: 'Reminder Assessment', isi: 'Mohon selesaikan assessment periode 2025 semester 1 sebelum tanggal 28 Februari 2025', target: 'Operator SID', tanggalKirim: '2025-01-25', status: 'Terjadwal' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Notifikasi | null>(null);
  const [formData, setFormData] = useState<Partial<Notifikasi>>({});

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ judul: '', isi: '', target: 'Semua User', tanggalKirim: new Date().toISOString().split('T')[0], status: 'Terkirim' });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Notifikasi) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      setNotifikasi(notifikasi.map(n => n.id === editingItem.id ? { ...formData, id: editingItem.id } as Notifikasi : n));
    } else {
      const newNotifikasi: Notifikasi = {
        id: Date.now().toString(),
        judul: formData.judul || '',
        isi: formData.isi || '',
        target: formData.target || 'Semua User',
        tanggalKirim: formData.tanggalKirim || new Date().toISOString().split('T')[0],
        status: formData.status || 'Terkirim',
      };
      setNotifikasi([newNotifikasi, ...notifikasi]);
    }
    setIsModalOpen(false);
    setFormData({});
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus notifikasi ini?')) {
      setNotifikasi(notifikasi.filter(n => n.id !== id));
    }
  };

  const getTargetIcon = (target: string) => {
    switch (target) {
      case 'Semua User': return <Globe size={16} className="text-indigo-600" />;
      case 'Admin': return <Bell size={16} className="text-purple-600" />;
      default: return <Users size={16} className="text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terkirim': return 'bg-green-100 text-green-700';
      case 'Terjadwal': return 'bg-blue-100 text-blue-700';
      case 'Draft': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Pengaturan Notifikasi" modul="Administration" color={COLOR} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Bell size={16} /> Riwayat Notifikasi
          </CardTitle>
          <Button onClick={handleAdd} data-real-action-root size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Plus size={16} className="mr-2" /> Buat Notifikasi
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Isi</TableHead>
                <TableHead>Tanggal Kirim</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifikasi.map((notif) => (
                <TableRow key={notif.id}>
                  <TableCell className="font-medium">{notif.judul}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTargetIcon(notif.target)}
                      <span className="text-sm">{notif.target}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600 max-w-xs truncate">{notif.isi}</TableCell>
                  <TableCell>{notif.tanggalKirim}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(notif.status)}`}>
                      {notif.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button onClick={() => handleEdit(notif)} data-real-action-root size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Pencil size={16} className="text-blue-600" />
                      </Button>
                      <Button onClick={() => handleDelete(notif.id)} size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Trash2 size={16} className="text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal Form */}
      {isModalOpen && (
        <div data-real-action-root className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4 bg-white shadow-2xl border-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Send size={16} /> {editingItem ? 'Edit Notifikasi' : 'Buat Notifikasi Baru'}
              </CardTitle>
              <Button onClick={() => setIsModalOpen(false)} size="sm" variant="ghost" className="h-8 w-8 p-0">
                <X size={16} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Form ini digunakan untuk {editingItem ? 'mengedit' : 'membuat'} notifikasi yang akan dikirim ke target penerima.
              </p>
              <div className="space-y-2">
                <Label htmlFor="judul">Judul Notifikasi</Label>
                <Input
                  id="judul"
                  value={formData.judul || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Masukkan judul notifikasi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="isi">Isi Notifikasi</Label>
                <Textarea
                  id="isi"
                  value={formData.isi || ''}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, isi: e.target.value })}
                  placeholder="Masukkan isi notifikasi"
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Target Penerima</Label>
                <select
                  id="target"
                  value={formData.target || 'Semua User'}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, target: e.target.value as any })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Semua User">Semua User</option>
                  <option value="Admin">Admin</option>
                  <option value="Operator SID">Operator SID</option>
                  <option value="Pemerintah Desa">Pemerintah Desa</option>
                  <option value="Nakes">Nakes</option>
                  <option value="Guru">Guru</option>
                  <option value="Warga">Warga</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tanggalKirim">Tanggal Kirim</Label>
                <Input
                  id="tanggalKirim"
                  type="date"
                  value={formData.tanggalKirim || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, tanggalKirim: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status || 'Terkirim'}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, status: e.target.value as 'Terkirim' | 'Terjadwal' | 'Draft' })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Terkirim">Terkirim</option>
                  <option value="Terjadwal">Terjadwal</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button onClick={() => setIsModalOpen(false)} variant="outline">
                  Batal
                </Button>
                <Button onClick={handleSave} data-real-action-root className="bg-indigo-600 hover:bg-indigo-700">
                  <Send size={16} className="mr-2" /> Kirim Notifikasi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
