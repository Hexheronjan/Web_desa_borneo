'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Upload, Download, Eye, Search, Pencil, Trash2, X, Shield, History, Info } from 'lucide-react';

const COLOR = '#1a237e';

interface DokumenPenelitian {
  id: string;
  judul: string;
  jenis: 'instrumen' | 'laporan pengujian' | 'hasil validasi' | 'dokumentasi artefak' | 'versi gambar' | 'bukti implementasi' | 'laporan evaluasi' | 'metadata berkas';
  penulis: string;
  versi: string;
  kontrolAkses: 'Publik' | 'Terbatas' | 'Rahasia';
  ukuran: string;
  tanggalUpload: string;
  riwayatRevisi: string[];
}

const INITIAL_DOCS: DokumenPenelitian[] = [
  { id: 'DOC-01', judul: 'Kuesioner Readiness Index Desa Borneo', jenis: 'instrumen', penulis: 'Dr. Budi Santoso', versi: 'v2.1', kontrolAkses: 'Publik', ukuran: '1.2 MB', tanggalUpload: '2026-06-10', riwayatRevisi: ['v2.1 - Perbaikan tata bahasa', 'v2.0 - Perubahan indikator stunting', 'v1.0 - Draft awal instrumen'] },
  { id: 'DOC-02', judul: 'Laporan Pengujian UAT Skenario 1-56', jenis: 'laporan pengujian', penulis: 'Tim Evaluasi SLV', versi: 'v1.0', kontrolAkses: 'Terbatas', ukuran: '4.8 MB', tanggalUpload: '2026-07-12', riwayatRevisi: ['v1.0 - Rilis laporan hasil akhir'] },
  { id: 'DOC-03', judul: 'Hasil Validasi Pakar AHP v2.0', jenis: 'hasil validasi', penulis: 'Prof. Siti Aminah', versi: 'v2.0', kontrolAkses: 'Rahasia', ukuran: '2.4 MB', tanggalUpload: '2026-07-14', riwayatRevisi: ['v2.0 - Persetujuan final pakar', 'v1.0 - Draft hasil validasi'] },
  { id: 'DOC-04', judul: 'Dokumentasi Artefak 1-6 Lengkap', jenis: 'dokumentasi artefak', penulis: 'Dr. Ahmad Yani', versi: 'v1.3', kontrolAkses: 'Publik', ukuran: '15.2 MB', tanggalUpload: '2026-07-15', riwayatRevisi: ['v1.3 - Tambah dokumentasi UAT', 'v1.0 - Inisiasi dokumentasi'] },
  { id: 'DOC-05', judul: 'Versi Gambar UI Halaman Masyarakat Umum', jenis: 'versi gambar', penulis: 'UI/UX Designer', versi: 'v3.2', kontrolAkses: 'Publik', ukuran: '8.7 MB', tanggalUpload: '2026-07-16', riwayatRevisi: ['v3.2 - Revisi terminology Masyarakat Umum', 'v2.0 - Mockup dashboard', 'v1.0 - Wireframe'] },
  { id: 'DOC-06', judul: 'Bukti Implementasi Source Code GitHub', jenis: 'bukti implementasi', penulis: 'Tim Developer', versi: 'v2.0', kontrolAkses: 'Terbatas', ukuran: '32.1 MB', tanggalUpload: '2026-07-17', riwayatRevisi: ['v2.0 - Rilis versi 2.0', 'v1.0 - Setup inisial repo'] },
  { id: 'DOC-07', judul: 'Laporan Evaluasi Dampak Sosial Ekonomi', jenis: 'laporan evaluasi', penulis: 'Peneliti PMD', versi: 'v1.1', kontrolAkses: 'Terbatas', ukuran: '3.5 MB', tanggalUpload: '2026-07-17', riwayatRevisi: ['v1.1 - Revisi rekomendasi program', 'v1.0 - Laporan awal'] },
  { id: 'DOC-08', judul: 'Metadata Berkas SID Jonggon Jaya', jenis: 'metadata berkas', penulis: 'Operator SID', versi: 'v1.0', kontrolAkses: 'Rahasia', ukuran: '820 KB', tanggalUpload: '2026-07-18', riwayatRevisi: ['v1.0 - Rilis berkas skema JSON'] },
];

export default function RepositoriPenelitianPage() {
  const [dokumen, setDokumen] = useState<DokumenPenelitian[]>(INITIAL_DOCS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DokumenPenelitian | null>(null);
  const [selectedDocHistory, setSelectedDocHistory] = useState<DokumenPenelitian | null>(null);
  const [formData, setFormData] = useState<Partial<DokumenPenelitian>>({});

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ judul: '', jenis: 'instrumen', penulis: '', versi: 'v1.0', kontrolAkses: 'Publik', ukuran: '', tanggalUpload: new Date().toISOString().split('T')[0] });
    setIsModalOpen(true);
  };

  const handleEdit = (item: DokumenPenelitian) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      const updatedHistory = editingItem.riwayatRevisi.includes(`${formData.versi} - Diedit`) 
        ? editingItem.riwayatRevisi 
        : [`${formData.versi} - Diperbarui pada ${new Date().toLocaleDateString('id-ID')}`, ...editingItem.riwayatRevisi];
      
      setDokumen(dokumen.map(d => d.id === editingItem.id ? { 
        ...formData, 
        id: editingItem.id,
        riwayatRevisi: updatedHistory
      } as DokumenPenelitian : d));
    } else {
      const newDokumen: DokumenPenelitian = {
        id: `DOC-0${dokumen.length + 1}`,
        judul: formData.judul || '',
        jenis: formData.jenis || 'instrumen',
        penulis: formData.penulis || '',
        versi: formData.versi || 'v1.0',
        kontrolAkses: formData.kontrolAkses || 'Publik',
        ukuran: formData.ukuran || '1.0 MB',
        tanggalUpload: formData.tanggalUpload || new Date().toISOString().split('T')[0],
        riwayatRevisi: [`${formData.versi || 'v1.0'} - Rilis Awal uploads`],
      };
      setDokumen([newDokumen, ...dokumen]);
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

  const getAksesColor = (akses: string) => {
    switch (akses) {
      case 'Publik': return 'bg-green-100 text-green-700 border-green-200';
      case 'Terbatas': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Rahasia': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Repositori Penelitian" modul="Penelitian &amp; Evaluasi" color={COLOR} />

      {/* Banner kontrol akses */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <Info size={15} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          🔒 <strong>Aturan Repositori:</strong> Repositori penelitian wajib memiliki kontrol akses yang ketat sesuai dengan klasifikasi keamanan dokumen dan mencatat seluruh histori versi dokumen demi integritas data penelitian.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <FileText size={14} /> Berkas &amp; Dokumen Penelitian
          </CardTitle>
          <Button onClick={handleAdd} size="sm" className="h-8 text-xs font-bold bg-indigo-600 hover:bg-indigo-700">
            <Upload size={13} className="mr-1" /> Unggah Dokumen
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Search size={16} className="text-slate-400" />
            <Input
              placeholder="Cari berdasarkan judul, penulis, atau jenis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md h-8 text-xs"
            />
          </div>

          <div className="overflow-x-auto text-xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-bold text-slate-700">ID</TableHead>
                  <TableHead className="font-bold text-slate-700">Judul Dokumen</TableHead>
                  <TableHead className="font-bold text-slate-700">Kategori Berkas</TableHead>
                  <TableHead className="font-bold text-slate-700">Penulis</TableHead>
                  <TableHead className="font-bold text-slate-700">Versi</TableHead>
                  <TableHead className="font-bold text-slate-700">Kontrol Akses</TableHead>
                  <TableHead className="font-bold text-slate-700">Ukuran</TableHead>
                  <TableHead className="font-bold text-slate-700">Tgl Upload</TableHead>
                  <TableHead className="text-right font-bold text-slate-700">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDokumen.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono font-bold text-slate-500">{doc.id}</TableCell>
                    <TableCell className="font-bold text-slate-800 flex items-center gap-1.5 py-3">
                      <FileText size={14} className="text-indigo-600 flex-shrink-0" />
                      {doc.judul}
                    </TableCell>
                    <TableCell className="capitalize font-semibold text-slate-700">{doc.jenis}</TableCell>
                    <TableCell>{doc.penulis}</TableCell>
                    <TableCell className="font-mono font-bold text-indigo-700">{doc.versi}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getAksesColor(doc.kontrolAkses)}`}>
                        {doc.kontrolAkses}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono">{doc.ukuran}</TableCell>
                    <TableCell className="font-mono">{doc.tanggalUpload}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button onClick={() => setSelectedDocHistory(doc)} size="sm" variant="ghost" className="h-7 w-7 p-0" title="Lihat Versi &amp; Riwayat">
                          <History size={13} className="text-slate-600" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="Unduh Berkas">
                          <Download size={13} className="text-green-600" />
                        </Button>
                        <Button onClick={() => handleEdit(doc)} size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <Pencil size={13} className="text-blue-600" />
                        </Button>
                        <Button onClick={() => handleDelete(doc.id)} size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <Trash2 size={13} className="text-red-600" />
                        </Button>
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
                {editingItem ? 'Edit Data Dokumen' : 'Unggah Dokumen Penelitian Baru'}
              </CardTitle>
              <Button onClick={() => setIsModalOpen(false)} size="sm" variant="ghost" className="h-8 w-8 p-0">
                <X size={16} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <Label className="font-bold text-slate-700">Judul Dokumen</Label>
                <Input
                  value={formData.judul || ''}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Contoh: Kuesioner Readiness Index Desa Borneo"
                  className="h-9 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Kategori Berkas</Label>
                  <select
                    value={formData.jenis || 'instrumen'}
                    onChange={(e) => setFormData({ ...formData, jenis: e.target.value as any })}
                    className="w-full h-9 rounded-md border bg-white px-3 text-xs"
                  >
                    <option value="instrumen">Instrumen</option>
                    <option value="laporan pengujian">Laporan Pengujian</option>
                    <option value="hasil validasi">Hasil Validasi</option>
                    <option value="dokumentasi artefak">Dokumentasi Artefak</option>
                    <option value="versi gambar">Versi Gambar</option>
                    <option value="bukti implementasi">Bukti Implementasi</option>
                    <option value="laporan evaluasi">Laporan Evaluasi</option>
                    <option value="metadata berkas">Metadata Berkas</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Kontrol Akses</Label>
                  <select
                    value={formData.kontrolAkses || 'Publik'}
                    onChange={(e) => setFormData({ ...formData, kontrolAkses: e.target.value as any })}
                    className="w-full h-9 rounded-md border bg-white px-3 text-xs"
                  >
                    <option value="Publik">Publik (Umum)</option>
                    <option value="Terbatas">Terbatas (Riset)</option>
                    <option value="Rahasia">Rahasia (Medis/Pribadi)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Penulis</Label>
                  <Input
                    value={formData.penulis || ''}
                    onChange={(e) => setFormData({ ...formData, penulis: e.target.value })}
                    placeholder="Nama penulis"
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Versi Dokumen</Label>
                  <Input
                    value={formData.versi || 'v1.0'}
                    onChange={(e) => setFormData({ ...formData, versi: e.target.value })}
                    placeholder="Contoh: v1.0"
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Ukuran File</Label>
                  <Input
                    value={formData.ukuran || '1.2 MB'}
                    onChange={(e) => setFormData({ ...formData, ukuran: e.target.value })}
                    placeholder="Contoh: 1.2 MB"
                    className="h-9 text-xs"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <Button onClick={() => setIsModalOpen(false)} variant="outline" className="h-8 text-xs font-bold">Batal</Button>
                <Button onClick={handleSave} className="h-8 text-xs font-bold bg-indigo-600 hover:bg-indigo-700">Simpan Berkas</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal Riwayat Versi Dokumen */}
      {selectedDocHistory && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white shadow-2xl border">
            <CardHeader className="py-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <History size={16} className="text-indigo-600" /> Riwayat Versi Dokumen
              </CardTitle>
              <Button onClick={() => setSelectedDocHistory(null)} size="sm" variant="ghost" className="h-8 w-8 p-0">✕</Button>
            </CardHeader>
            <CardContent className="space-y-3 text-xs pb-4">
              <p className="font-bold text-slate-800">{selectedDocHistory.judul}</p>
              <div className="border rounded-xl p-3 bg-slate-50 space-y-2 max-h-60 overflow-y-auto font-mono">
                {selectedDocHistory.riwayatRevisi.map((rev, i) => (
                  <div key={i} className="flex justify-between border-b pb-1 last:border-0 last:pb-0 text-slate-600">
                    <span>{rev}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setSelectedDocHistory(null)} className="h-8 text-xs font-bold">Tutup</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
