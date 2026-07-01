'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const COLOR = '#1a237e';

interface FrameworkVersion {
  id: string;
  versi: string;
  tanggal: string;
  status: 'Aktif' | 'Non-Aktif';
}

export default function FrameworkVersioningPage() {
  const [versions, setVersions] = useState<FrameworkVersion[]>([
    { id: '1', versi: 'v1.0', tanggal: '2024-01-15', status: 'Non-Aktif' },
    { id: '2', versi: 'v2.0', tanggal: '2024-06-20', status: 'Aktif' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FrameworkVersion | null>(null);
  const [formData, setFormData] = useState<Partial<FrameworkVersion>>({});

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ versi: '', tanggal: '', status: 'Non-Aktif' });
    setIsModalOpen(true);
  };

  const handleEdit = (item: FrameworkVersion) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      setVersions(versions.map(v => v.id === editingItem.id ? { ...formData, id: editingItem.id } as FrameworkVersion : v));
    } else {
      const newVersion: FrameworkVersion = {
        id: Date.now().toString(),
        versi: formData.versi || '',
        tanggal: formData.tanggal || '',
        status: formData.status || 'Non-Aktif',
      };
      setVersions([...versions, newVersion]);
    }
    setIsModalOpen(false);
    setFormData({});
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus versi ini?')) {
      setVersions(versions.filter(v => v.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Framework Versioning" modul="Framework & Assessment" color={COLOR} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            Riwayat Versi Framework
          </CardTitle>
          <Button onClick={handleAdd} data-real-action-root size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Plus size={16} className="mr-2" /> Tambah Versi
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Versi</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {versions.map((version) => (
                <TableRow key={version.id}>
                  <TableCell className="font-medium">{version.versi}</TableCell>
                  <TableCell>{version.tanggal}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      version.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {version.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button onClick={() => handleEdit(version)} data-real-action-root size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Pencil size={16} className="text-blue-600" />
                      </Button>
                      <Button onClick={() => handleDelete(version.id)} size="sm" variant="ghost" className="h-8 w-8 p-0">
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
              <CardTitle className="text-base font-semibold" style={{ color: COLOR }}>
                {editingItem ? 'Edit Data Versi Framework' : 'Tambah Data Versi Framework'}
              </CardTitle>
              <Button onClick={() => setIsModalOpen(false)} size="sm" variant="ghost" className="h-8 w-8 p-0">
                <X size={16} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Form ini digunakan untuk {editingItem ? 'mengedit' : 'menambahkan'} data versi framework yang akan ditampilkan pada Riwayat Versi Framework.
              </p>
              <div className="space-y-2">
                <Label htmlFor="versi">Versi</Label>
                <Input
                  id="versi"
                  value={formData.versi || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, versi: e.target.value })}
                  placeholder="Contoh: v1.0, v2.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tanggal">Tanggal</Label>
                <Input
                  id="tanggal"
                  type="date"
                  value={formData.tanggal || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, tanggal: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status || 'Non-Aktif'}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, status: e.target.value as 'Aktif' | 'Non-Aktif' })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Non-Aktif">Non-Aktif</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button onClick={() => setIsModalOpen(false)} variant="outline">
                  Batal
                </Button>
                <Button onClick={handleSave} data-real-action-root className="bg-indigo-600 hover:bg-indigo-700">
                  Simpan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
