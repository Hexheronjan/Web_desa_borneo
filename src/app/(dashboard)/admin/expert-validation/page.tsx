'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, User, CheckCircle2, Star, Pencil, Trash2, X } from 'lucide-react';

const COLOR = '#1a237e';

interface Validator {
  id: string;
  namaValidator: string;
  keahlian: string;
  artefakDivalidasi: string;
  nilaiValiditas: number;
  status: 'Selesai' | 'Pending';
}

export default function ExpertValidationPage() {
  const [validators, setValidators] = useState<Validator[]>([
    { id: '1', namaValidator: 'Dr. Budi Santoso', keahlian: 'Governance Digital', artefakDivalidasi: 'Pedoman Wawancara, Hasil FGD', nilaiValiditas: 85, status: 'Selesai' },
    { id: '2', namaValidator: 'Prof. Siti Aminah', keahlian: 'Quality of Life', artefakDivalidasi: 'Kuesioner QoL', nilaiValiditas: 90, status: 'Selesai' },
    { id: '3', namaValidator: 'Dr. Ahmad Yani', keahlian: 'Smart Village', artefakDivalidasi: 'APL-SLV Borneo', nilaiValiditas: 88, status: 'Selesai' },
    { id: '4', namaValidator: 'Ir. Rina Wijaya', keahlian: 'Maturity Model', artefakDivalidasi: 'Kuesioner Maturity', nilaiValiditas: 0, status: 'Pending' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Validator | null>(null);
  const [formData, setFormData] = useState<Partial<Validator>>({});

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ namaValidator: '', keahlian: '', artefakDivalidasi: '', nilaiValiditas: 0, status: 'Pending' });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Validator) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      setValidators(validators.map(v => v.id === editingItem.id ? { ...formData, id: editingItem.id } as Validator : v));
    } else {
      const newValidator: Validator = {
        id: Date.now().toString(),
        namaValidator: formData.namaValidator || '',
        keahlian: formData.keahlian || '',
        artefakDivalidasi: formData.artefakDivalidasi || '',
        nilaiValiditas: formData.nilaiValiditas || 0,
        status: formData.status || 'Pending',
      };
      setValidators([...validators, newValidator]);
    }
    setIsModalOpen(false);
    setFormData({});
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus validator ini?')) {
      setValidators(validators.filter(v => v.id !== id));
    }
  };

  const handleInputNilai = (item: Validator) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const getNilaiColor = (nilai: number) => {
    if (nilai >= 85) return 'text-green-600';
    if (nilai >= 70) return 'text-blue-600';
    if (nilai >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Expert Validation" modul="Evaluation & Research" color={COLOR} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            Daftar Validator
          </CardTitle>
          <Button onClick={handleAdd} data-real-action-root size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <User size={16} className="mr-2" /> Tambah Validator
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Validator</TableHead>
                <TableHead>Keahlian</TableHead>
                <TableHead>Artefak Divalidasi</TableHead>
                <TableHead>Nilai Validitas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {validators.map((validator) => (
                <TableRow key={validator.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Shield size={16} className="text-indigo-600" />
                    {validator.namaValidator}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                      {validator.keahlian}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600 max-w-xs truncate">{validator.artefakDivalidasi}</TableCell>
                  <TableCell>
                    {validator.nilaiValiditas > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500" />
                        <span className={`font-bold ${getNilaiColor(validator.nilaiValiditas)}`}>
                          {validator.nilaiValiditas}
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(validator.status)}`}>
                      {validator.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {validator.status === 'Pending' && (
                        <Button onClick={() => handleInputNilai(validator)} size="sm" variant="ghost" className="h-8 px-3">
                          <CheckCircle2 size={16} className="text-green-600 mr-1" /> Input Nilai
                        </Button>
                      )}
                      <Button onClick={() => handleEdit(validator)} data-real-action-root size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Pencil size={16} className="text-blue-600" />
                      </Button>
                      <Button onClick={() => handleDelete(validator.id)} size="sm" variant="ghost" className="h-8 w-8 p-0">
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
                {editingItem ? 'Edit Data Validator' : 'Tambah Data Validator'}
              </CardTitle>
              <Button onClick={() => setIsModalOpen(false)} size="sm" variant="ghost" className="h-8 w-8 p-0">
                <X size={16} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Form ini digunakan untuk {editingItem ? 'mengedit' : 'menambahkan'} data validator yang akan ditampilkan pada Daftar Validator.
              </p>
              <div className="space-y-2">
                <Label htmlFor="namaValidator">Nama Validator</Label>
                <Input
                  id="namaValidator"
                  value={formData.namaValidator || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, namaValidator: e.target.value })}
                  placeholder="Contoh: Dr. Budi Santoso"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keahlian">Keahlian</Label>
                <Input
                  id="keahlian"
                  value={formData.keahlian || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, keahlian: e.target.value })}
                  placeholder="Contoh: Governance Digital, Quality of Life"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="artefakDivalidasi">Artefak Divalidasi</Label>
                <Textarea
                  id="artefakDivalidasi"
                  value={formData.artefakDivalidasi || ''}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, artefakDivalidasi: e.target.value })}
                  placeholder="Masukkan artefak yang divalidasi"
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nilaiValiditas">Nilai Validitas (0-100)</Label>
                <Input
                  id="nilaiValiditas"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.nilaiValiditas || 0}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, nilaiValiditas: parseInt(e.target.value) })}
                  placeholder="Contoh: 85, 90"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status || 'Pending'}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, status: e.target.value as 'Selesai' | 'Pending' })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Selesai">Selesai</option>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            Ringkasan Validasi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={20} className="text-green-600" />
                <p className="text-sm font-semibold text-green-800">Validasi Selesai</p>
              </div>
              <p className="text-2xl font-bold text-green-900">{validators.filter(v => v.status === 'Selesai').length}</p>
              <p className="text-xs text-green-700">Artefak</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Star size={20} className="text-yellow-600" />
                <p className="text-sm font-semibold text-yellow-800">Rata-rata Nilai</p>
              </div>
              <p className="text-2xl font-bold text-yellow-900">
                {validators.filter(v => v.nilaiValiditas > 0).length > 0 
                  ? (validators.filter(v => v.nilaiValiditas > 0).reduce((a, b) => a + b.nilaiValiditas, 0) / validators.filter(v => v.nilaiValiditas > 0).length).toFixed(1)
                  : '0'}
              </p>
              <p className="text-xs text-yellow-700">Sangat Baik</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <User size={20} className="text-blue-600" />
                <p className="text-sm font-semibold text-blue-800">Total Validator</p>
              </div>
              <p className="text-2xl font-bold text-blue-900">{validators.length}</p>
              <p className="text-xs text-blue-700">Ahli & Pakar</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
