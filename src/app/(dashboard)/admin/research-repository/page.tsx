'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Upload, Download, Eye, Search, Pencil, Trash2, X } from 'lucide-react';

const COLOR = '#1a237e';

interface Dokumen {
  id: string;
  judul: string;
  jenis: 'Artikel' | 'Laporan' | 'Jurnal' | 'Presentasi' | 'Dataset';
  penulis: string;
  tahun: string;
  ukuran: string;
  tanggalUpload: string;
}

export default function ResearchRepositoryPage() {
  const [dokumen, setDokumen] = useState<Dokumen[]>([
    { id: '1', judul: 'Analisis Readiness Desa Digital Kalimantan', jenis: 'Artikel', penulis: 'Dr. Budi Santoso', tahun: '2024', ukuran: '2.5 MB', tanggalUpload: '2025-01-15' },
    { id: '2', judul: 'Laporan Penelitian Smart Living Village', jenis: 'Laporan', penulis: 'Tim Peneliti SLV', tahun: '2024', ukuran: '15.3 MB', tanggalUpload: '2025-01-16' },
    { id: '3', judul: 'Quality of Life Index Framework', jenis: 'Jurnal', penulis: 'Prof. Siti Aminah', tahun: '2024', ukuran: '1.8 MB', tanggalUpload: '2025-01-17' },
    { id: '4', judul: 'Presentasi Hasil Assessment 2024', jenis: 'Presentasi', penulis: 'Dr. Ahmad Yani', tahun: '2024', ukuran: '8.2 MB', tanggalUpload: '2025-01-18' },
    { id: '5', judul: 'Dataset Penelitian Lengkap', jenis: 'Dataset', penulis: 'Tim Data', tahun: '2024', ukuran: '45.7 MB', tanggalUpload: '2025-01-19' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Dokumen | null>(null);
  const [formData, setFormData] = useState<Partial<Dokumen>>({});

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ judul: '', jenis: 'Artikel', penulis: '', tahun: '', ukuran: '', tanggalUpload: new Date().toISOString().split('T')[0] });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Dokumen) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      setDokumen(dokumen.map(d => d.id === editingItem.id ? { ...formData, id: editingItem.id } as Dokumen : d));
    } else {
      const newDokumen: Dokumen = {
        id: Date.now().toString(),
        judul: formData.judul || '',
        jenis: formData.jenis || 'Artikel',
        penulis: formData.penulis || '',
        tahun: formData.tahun || '',
        ukuran: formData.ukuran || '',
        tanggalUpload: formData.tanggalUpload || new Date().toISOString().split('T')[0],
      };
      setDokumen([...dokumen, newDokumen]);
    }
    setIsModalOpen(false);
    setFormData({});
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
      setDokumen(dokumen.filter(d => d.id !== id));
    }
  };

  const filteredDokumen = dokumen.filter(doc =>
    doc.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.penulis.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.jenis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getJenisColor = (jenis: string) => {
    switch (jenis) {
      case 'Artikel': return 'bg-blue-100 text-blue-700';
      case 'Laporan': return 'bg-green-100 text-green-700';
      case 'Jurnal': return 'bg-purple-100 text-purple-700';
      case 'Presentasi': return 'bg-orange-100 text-orange-700';
      case 'Dataset': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Research Repository" modul="Evaluation & Research" color={COLOR} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            Arsip Penelitian
          </CardTitle>
          <Button onClick={handleAdd} data-real-action-root size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Upload size={16} className="mr-2" /> Upload Dokumen
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Search size={18} className="text-slate-400" />
            <Input
              placeholder="Cari dokumen berdasarkan judul, penulis, atau jenis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul Dokumen</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Penulis</TableHead>
                <TableHead>Tahun</TableHead>
                <TableHead>Ukuran</TableHead>
                <TableHead>Tanggal Upload</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDokumen.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText size={16} className="text-indigo-600" />
                    {doc.judul}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getJenisColor(doc.jenis)}`}>
                      {doc.jenis}
                    </span>
                  </TableCell>
                  <TableCell>{doc.penulis}</TableCell>
                  <TableCell>{doc.tahun}</TableCell>
                  <TableCell>{doc.ukuran}</TableCell>
                  <TableCell>{doc.tanggalUpload}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye size={16} className="text-blue-600" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download size={16} className="text-green-600" />
                      </Button>
                      <Button onClick={() => handleEdit(doc)} data-real-action-root size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Pencil size={16} className="text-blue-600" />
                      </Button>
                      <Button onClick={() => handleDelete(doc.id)} size="sm" variant="ghost" className="h-8 w-8 p-0">
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
                {editingItem ? 'Edit Data Dokumen' : 'Upload Dokumen Baru'}
              </CardTitle>
              <Button onClick={() => setIsModalOpen(false)} size="sm" variant="ghost" className="h-8 w-8 p-0">
                <X size={16} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Form ini digunakan untuk {editingItem ? 'mengedit' : 'mengupload'} data dokumen yang akan ditampilkan pada Arsip Penelitian.
              </p>
              <div className="space-y-2">
                <Label htmlFor="judul">Judul Dokumen</Label>
                <Input
                  id="judul"
                  value={formData.judul || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Contoh: Analisis Readiness Desa Digital"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jenis">Jenis Dokumen</Label>
                <select
                  id="jenis"
                  value={formData.jenis || 'Artikel'}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, jenis: e.target.value as 'Artikel' | 'Laporan' | 'Jurnal' | 'Presentasi' | 'Dataset' })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Artikel">Artikel</option>
                  <option value="Laporan">Laporan</option>
                  <option value="Jurnal">Jurnal</option>
                  <option value="Presentasi">Presentasi</option>
                  <option value="Dataset">Dataset</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="penulis">Penulis</Label>
                <Input
                  id="penulis"
                  value={formData.penulis || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, penulis: e.target.value })}
                  placeholder="Contoh: Dr. Budi Santoso"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tahun">Tahun</Label>
                <Input
                  id="tahun"
                  type="number"
                  value={formData.tahun || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, tahun: e.target.value })}
                  placeholder="Contoh: 2024"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ukuran">Ukuran File</Label>
                <Input
                  id="ukuran"
                  value={formData.ukuran || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, ukuran: e.target.value })}
                  placeholder="Contoh: 2.5 MB"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tanggalUpload">Tanggal Upload</Label>
                <Input
                  id="tanggalUpload"
                  type="date"
                  value={formData.tanggalUpload || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, tanggalUpload: e.target.value })}
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

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            Statistik Repository
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Artikel</p>
              <p className="text-2xl font-bold text-blue-900">{dokumen.filter(d => d.jenis === 'Artikel').length}</p>
              <p className="text-xs text-blue-700">Dokumen</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Laporan</p>
              <p className="text-2xl font-bold text-green-900">{dokumen.filter(d => d.jenis === 'Laporan').length}</p>
              <p className="text-xs text-green-700">Dokumen</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Jurnal</p>
              <p className="text-2xl font-bold text-purple-900">{dokumen.filter(d => d.jenis === 'Jurnal').length}</p>
              <p className="text-xs text-purple-700">Dokumen</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Presentasi</p>
              <p className="text-2xl font-bold text-orange-900">{dokumen.filter(d => d.jenis === 'Presentasi').length}</p>
              <p className="text-xs text-orange-700">Dokumen</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Dataset</p>
              <p className="text-2xl font-bold text-red-900">{dokumen.filter(d => d.jenis === 'Dataset').length}</p>
              <p className="text-xs text-red-700">Dokumen</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
