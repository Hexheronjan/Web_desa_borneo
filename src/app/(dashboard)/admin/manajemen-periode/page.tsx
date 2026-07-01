'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, X, Lock, Unlock } from 'lucide-react';

const COLOR = '#1a237e';

interface Periode {
  id: string;
  tahun: string;
  semester: '1' | '2';
  status: 'Buka' | 'Tutup';
}

export default function ManajemenPeriodePage() {
  const [periodes, setPeriodes] = useState<Periode[]>([
    { id: '1', tahun: '2024', semester: '1', status: 'Tutup' },
    { id: '2', tahun: '2024', semester: '2', status: 'Tutup' },
    { id: '3', tahun: '2025', semester: '1', status: 'Buka' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Periode | null>(null);
  const [formData, setFormData] = useState<Partial<Periode>>({});

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ tahun: '', semester: '1', status: 'Tutup' });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Periode) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      setPeriodes(periodes.map(p => p.id === editingItem.id ? { ...formData, id: editingItem.id } as Periode : p));
    } else {
      const newPeriode: Periode = {
        id: Date.now().toString(),
        tahun: formData.tahun || '',
        semester: formData.semester || '1',
        status: formData.status || 'Tutup',
      };
      setPeriodes([...periodes, newPeriode]);
    }
    setIsModalOpen(false);
    setFormData({});
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus periode ini?')) {
      setPeriodes(periodes.filter(p => p.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setPeriodes(periodes.map(p => 
      p.id === id ? { ...p, status: p.status === 'Buka' ? 'Tutup' : 'Buka' } : p
    ));
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Manajemen Periode" modul="Framework & Assessment" color={COLOR} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            Periode Assessment
          </CardTitle>
          <Button onClick={handleAdd} data-real-action-root size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Plus size={16} className="mr-2" /> Tambah Periode
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tahun</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {periodes.map((periode) => (
                <TableRow key={periode.id}>
                  <TableCell className="font-medium">{periode.tahun}</TableCell>
                  <TableCell>Semester {periode.semester}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      periode.status === 'Buka' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {periode.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        onClick={() => toggleStatus(periode.id)} 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        title={periode.status === 'Buka' ? 'Tutup Periode' : 'Buka Periode'}
                      >
                        {periode.status === 'Buka' ? <Lock size={16} className="text-orange-600" /> : <Unlock size={16} className="text-green-600" />}
                      </Button>
                      <Button onClick={() => handleEdit(periode)} data-real-action-root size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Pencil size={16} className="text-blue-600" />
                      </Button>
                      <Button onClick={() => handleDelete(periode.id)} size="sm" variant="ghost" className="h-8 w-8 p-0">
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
                {editingItem ? 'Edit Data Periode' : 'Tambah Data Periode'}
              </CardTitle>
              <Button onClick={() => setIsModalOpen(false)} size="sm" variant="ghost" className="h-8 w-8 p-0">
                <X size={16} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Form ini digunakan untuk {editingItem ? 'mengedit' : 'menambahkan'} data periode assessment yang akan ditampilkan pada Periode Assessment.
              </p>
              <div className="space-y-2">
                <Label htmlFor="tahun">Tahun</Label>
                <Input
                  id="tahun"
                  type="number"
                  value={formData.tahun || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, tahun: e.target.value })}
                  placeholder="Contoh: 2024, 2025"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <select
                  id="semester"
                  value={formData.semester || '1'}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, semester: e.target.value as '1' | '2' })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status || 'Tutup'}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, status: e.target.value as 'Buka' | 'Tutup' })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Buka">Buka</option>
                  <option value="Tutup">Tutup</option>
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
