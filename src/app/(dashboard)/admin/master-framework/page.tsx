'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, X, CheckCircle2 } from 'lucide-react';

const COLOR = '#1a237e';

interface Framework {
  id: string;
  namaFramework: string;
  dimensi: string;
  indikator: string;
  bobot: string;
}

export default function MasterFrameworkPage() {
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Framework | null>(null);
  const [formData, setFormData] = useState<Partial<Framework>>({});

  useEffect(() => {
    loadFrameworks();
  }, []);

  const loadFrameworks = async () => {
    try {
      const res = await fetch('/api/master-framework');
      const data = await res.json();
      setFrameworks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load frameworks:', error);
      setFrameworks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ namaFramework: '', dimensi: '', indikator: '', bobot: '100' });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Framework) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        // Update existing
        const res = await fetch('/api/master-framework', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingItem.id, status: 'Aktif' })
        });
        if (!res.ok) throw new Error('Gagal mengupdate data');
        const updated = await res.json();
        setFrameworks(frameworks.map(f => f.id === editingItem.id ? updated : f));
        setNotification('Data berhasil diupdate!');
      } else {
        // Create new
        const res = await fetch('/api/master-framework', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, status: 'Aktif' })
        });
        if (!res.ok) throw new Error('Gagal menambah data');
        const created = await res.json();
        setFrameworks([...frameworks, created]);
        setNotification('Data berhasil ditambahkan!');
      }
      setIsModalOpen(false);
      setFormData({});
      setEditingItem(null);
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      alert('Gagal menyimpan data: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus framework ini?')) {
      try {
        const res = await fetch(`/api/master-framework?id=${id}`, {
          method: 'DELETE'
        });
        if (!res.ok) throw new Error('Gagal menghapus data');
        setFrameworks(frameworks.filter(f => f.id !== id));
        setNotification('Data berhasil dihapus!');
        setTimeout(() => setNotification(null), 3000);
      } catch (error) {
        alert('Gagal menghapus data: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Master Framework" modul="Framework & Assessment" color={COLOR} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            Daftar Framework
          </CardTitle>
          <Button onClick={handleAdd} data-real-action-root size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Plus size={16} className="mr-2" /> Tambah Data Framework
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-sm text-muted-foreground py-8">Memuat data...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Framework</TableHead>
                  <TableHead>Dimensi</TableHead>
                  <TableHead>Indikator</TableHead>
                  <TableHead>Bobot</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {frameworks.map((framework) => (
                <TableRow key={framework.id}>
                  <TableCell className="font-medium">{framework.namaFramework}</TableCell>
                  <TableCell>{framework.dimensi}</TableCell>
                  <TableCell>{framework.indikator}</TableCell>
                  <TableCell>{framework.bobot}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button onClick={() => handleEdit(framework)} data-real-action-root size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Pencil size={16} className="text-blue-600" />
                      </Button>
                      <Button onClick={() => handleDelete(framework.id)} size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Trash2 size={16} className="text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Modal Form */}
      {isModalOpen && (
        <div data-real-action-root className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4 bg-white shadow-2xl border-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold" style={{ color: COLOR }}>
                {editingItem ? 'Edit Data Framework' : 'Tambah Data Framework'}
              </CardTitle>
              <Button onClick={() => setIsModalOpen(false)} size="sm" variant="ghost" className="h-8 w-8 p-0">
                <X size={16} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {editingItem 
                  ? 'Form ini digunakan untuk mengedit data framework yang akan ditampilkan pada Daftar Framework.'
                  : 'Form ini digunakan untuk menambahkan data framework yang akan ditampilkan pada Daftar Framework.'
                }
              </p>
              <div className="space-y-2">
                <Label htmlFor="namaFramework">Nama Framework</Label>
                <Input
                  id="namaFramework"
                  value={formData.namaFramework || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, namaFramework: e.target.value })}
                  placeholder="Contoh: Readiness Framework, Maturity Framework, Quality of Life Framework"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dimensi">Dimensi</Label>
                <Input
                  id="dimensi"
                  value={formData.dimensi || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, dimensi: e.target.value })}
                  placeholder="Contoh: 5 Dimensi, 6 Dimensi, 5 Level"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="indikator">Indikator</Label>
                <Input
                  id="indikator"
                  value={formData.indikator || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, indikator: e.target.value })}
                  placeholder="Contoh: 20 Indikator, 25 Indikator"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bobot">Bobot (%)</Label>
                <Input
                  id="bobot"
                  type="number"
                  value={formData.bobot || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, bobot: e.target.value })}
                  placeholder="100%"
                />
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

      {notification && (
        <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border-2 border-green-200 bg-white text-xs font-bold">
          <CheckCircle2 className="text-green-600" size={16} />
          {notification}
        </div>
      )}
    </div>
  );
}
