'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, X, BookOpen, CheckCircle2 } from 'lucide-react';

const COLOR = '#1a237e';

interface DSSRule {
  id: string;
  namaRule: string;
  bobot: number;
  aturan: string;
  kategori: string;
  status: 'Aktif' | 'Non-Aktif';
}

export default function DSSKnowledgeBasePage() {
  const [rules, setRules] = useState<DSSRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DSSRule | null>(null);
  const [formData, setFormData] = useState<Partial<DSSRule>>({});

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      const res = await fetch('/api/dss-knowledge-base');
      const data = await res.json();
      setRules(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load rules:', error);
      setRules([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ namaRule: '', bobot: 0, aturan: '', kategori: '', status: 'Aktif' });
    setIsModalOpen(true);
  };

  const handleEdit = (item: DSSRule) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        const res = await fetch('/api/dss-knowledge-base', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingItem.id })
        });
        if (!res.ok) throw new Error('Gagal mengupdate data');
        const updated = await res.json();
        setRules(rules.map(r => r.id === editingItem.id ? updated : r));
        setNotification('Data berhasil diupdate!');
      } else {
        const res = await fetch('/api/dss-knowledge-base', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error('Gagal menambah data');
        const created = await res.json();
        setRules([...rules, created]);
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
    if (confirm('Apakah Anda yakin ingin menghapus rule ini?')) {
      try {
        const res = await fetch(`/api/dss-knowledge-base?id=${id}`, {
          method: 'DELETE'
        });
        if (!res.ok) throw new Error('Gagal menghapus data');
        setRules(rules.filter(r => r.id !== id));
        setNotification('Data berhasil dihapus!');
        setTimeout(() => setNotification(null), 3000);
      } catch (error) {
        alert('Gagal menghapus data: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="DSS Knowledge Base" modul="Governance & DSS" color={COLOR} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            Rule DSS
          </CardTitle>
          <Button onClick={handleAdd} data-real-action-root size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Plus size={16} className="mr-2" /> Tambah Rule
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-sm text-muted-foreground py-8">Memuat data...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Rule</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Bobot</TableHead>
                  <TableHead>Aturan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <BookOpen size={16} className="text-indigo-600" />
                    {rule.namaRule}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                      {rule.kategori}
                    </span>
                  </TableCell>
                  <TableCell>{rule.bobot.toFixed(2)}</TableCell>
                  <TableCell className="text-sm text-slate-600 max-w-xs truncate">{rule.aturan}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rule.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {rule.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button onClick={() => handleEdit(rule)} data-real-action-root size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Pencil size={16} className="text-blue-600" />
                      </Button>
                      <Button onClick={() => handleDelete(rule.id)} size="sm" variant="ghost" className="h-8 w-8 p-0">
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
                {editingItem ? 'Edit Data Rule DSS' : 'Tambah Data Rule DSS'}
              </CardTitle>
              <Button onClick={() => setIsModalOpen(false)} size="sm" variant="ghost" className="h-8 w-8 p-0">
                <X size={16} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Form ini digunakan untuk {editingItem ? 'mengedit' : 'menambahkan'} data rule DSS yang akan ditampilkan pada Rule DSS.
              </p>
              <div className="space-y-2">
                <Label htmlFor="namaRule">Nama Rule</Label>
                <Input
                  id="namaRule"
                  value={formData.namaRule || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, namaRule: e.target.value })}
                  placeholder="Contoh: Rule Readiness Tinggi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kategori">Kategori</Label>
                <Input
                  id="kategori"
                  value={formData.kategori || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, kategori: e.target.value })}
                  placeholder="Contoh: Readiness, Maturity, Quality of Life"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bobot">Bobot (0-1)</Label>
                <Input
                  id="bobot"
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  value={formData.bobot || 0}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, bobot: parseFloat(e.target.value) })}
                  placeholder="Contoh: 0.8, 0.9"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aturan">Aturan</Label>
                <Textarea
                  id="aturan"
                  value={formData.aturan || ''}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, aturan: e.target.value })}
                  placeholder="Masukkan aturan DSS"
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

      {notification && (
        <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border-2 border-green-200 bg-white text-xs font-bold">
          <CheckCircle2 className="text-green-600" size={16} />
          {notification}
        </div>
      )}
    </div>
  );
}
