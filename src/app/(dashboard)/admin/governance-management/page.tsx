'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, X, Landmark } from 'lucide-react';

const COLOR = '#1a237e';

interface Governance {
  id: string;
  namaGovernance: string;
  deskripsi: string;
  kategori: string;
  status: 'Aktif' | 'Non-Aktif';
}

export default function GovernanceManagementPage() {
  const [governances, setGovernances] = useState<Governance[]>([
    { id: '1', namaGovernance: 'Tata Kelola Desa Digital', deskripsi: 'Framework tata kelola untuk transformasi digital desa', kategori: 'Digital Governance', status: 'Aktif' },
    { id: '2', namaGovernance: 'Tata Kelola Keuangan Desa', deskripsi: 'Standar pengelolaan keuangan desa yang transparan', kategori: 'Financial Governance', status: 'Aktif' },
    { id: '3', namaGovernance: 'Tata Kelola Partisipasi Warga', deskripsi: 'Mekanisme partisipasi masyarakat dalam pembangunan desa', kategori: 'Participatory Governance', status: 'Aktif' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Governance | null>(null);
  const [formData, setFormData] = useState<Partial<Governance>>({});

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ namaGovernance: '', deskripsi: '', kategori: '', status: 'Aktif' });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Governance) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      setGovernances(governances.map(g => g.id === editingItem.id ? { ...formData, id: editingItem.id } as Governance : g));
    } else {
      const newGovernance: Governance = {
        id: Date.now().toString(),
        namaGovernance: formData.namaGovernance || '',
        deskripsi: formData.deskripsi || '',
        kategori: formData.kategori || '',
        status: formData.status || 'Aktif',
      };
      setGovernances([...governances, newGovernance]);
    }
    setIsModalOpen(false);
    setFormData({});
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus governance ini?')) {
      setGovernances(governances.filter(g => g.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Governance Management" modul="Governance & DSS" color={COLOR} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            Master Governance
          </CardTitle>
          <Button onClick={handleAdd} data-real-action-root size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Plus size={16} className="mr-2" /> Tambah Governance
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Governance</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {governances.map((governance) => (
                <TableRow key={governance.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Landmark size={16} className="text-indigo-600" />
                    {governance.namaGovernance}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                      {governance.kategori}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600 max-w-xs truncate">{governance.deskripsi}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      governance.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {governance.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button onClick={() => handleEdit(governance)} data-real-action-root size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Pencil size={16} className="text-blue-600" />
                      </Button>
                      <Button onClick={() => handleDelete(governance.id)} size="sm" variant="ghost" className="h-8 w-8 p-0">
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
                {editingItem ? 'Edit Data Governance' : 'Tambah Data Governance'}
              </CardTitle>
              <Button onClick={() => setIsModalOpen(false)} size="sm" variant="ghost" className="h-8 w-8 p-0">
                <X size={16} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Form ini digunakan untuk {editingItem ? 'mengedit' : 'menambahkan'} data governance yang akan ditampilkan pada Master Governance.
              </p>
              <div className="space-y-2">
                <Label htmlFor="namaGovernance">Nama Governance</Label>
                <Input
                  id="namaGovernance"
                  value={formData.namaGovernance || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, namaGovernance: e.target.value })}
                  placeholder="Contoh: Tata Kelola Desa Digital"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kategori">Kategori</Label>
                <Input
                  id="kategori"
                  value={formData.kategori || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, kategori: e.target.value })}
                  placeholder="Contoh: Digital Governance, Financial Governance"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi</Label>
                <Textarea
                  id="deskripsi"
                  value={formData.deskripsi || ''}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, deskripsi: e.target.value })}
                  placeholder="Masukkan deskripsi governance"
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status || 'Aktif'}
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
