'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, X, ShieldAlert, CheckCircle2, GitBranch } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const COLOR = '#1a237e';

interface FrameworkVersion {
  id: string;
  versi: string;
  tanggalRilis: string;
  deskripsiPerubahan: string;
  status: 'Draf' | 'Ditinjau Pakar' | 'Disetujui' | 'Aktif' | 'Diarsipkan';
}

const MOCK_VERSIONS: FrameworkVersion[] = [
  { id: 'V-01', versi: 'v1.0 (Initial Framework)', tanggalRilis: '15 Januari 2024', deskripsiPerubahan: 'Versi perdana kerangka kesiapan dengan 5 dimensi dasar dan 15 indikator.', status: 'Diarsipkan' },
  { id: 'V-02', versi: 'v2.0 (Artefak 6 Core)', tanggalRilis: '20 Juni 2025', deskripsiPerubahan: 'Integrasi penuh 6 dimensi, 24 indikator kesiapan, dan penambahan dimensi budaya adat.', status: 'Aktif' },
  { id: 'V-03', versi: 'v2.1 (Penyempurnaan SDGs)', tanggalRilis: 'Mendatang (Juli 2026)', deskripsiPerubahan: 'Penyelarasan target SDGs Desa Sektoral & integrasi rekam riwayat terenkripsi.', status: 'Ditinjau Pakar' },
];

export default function FrameworkVersioningPage() {
  const [versions, setVersions] = useState<FrameworkVersion[]>(MOCK_VERSIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FrameworkVersion | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form states
  const [versi, setVersi] = useState('');
  const [tanggalRilis, setTanggalRilis] = useState('');
  const [deskripsiPerubahan, setDeskripsiPerubahan] = useState('');
  const [status, setStatus] = useState<'Draf' | 'Ditinjau Pakar' | 'Disetujui' | 'Aktif' | 'Diarsipkan'>('Draf');

  const handleAdd = () => {
    setEditingItem(null);
    setVersi('');
    setTanggalRilis('');
    setDeskripsiPerubahan('');
    setStatus('Draf');
    setIsModalOpen(true);
  };

  const handleEdit = (item: FrameworkVersion) => {
    setEditingItem(item);
    setVersi(item.versi);
    setTanggalRilis(item.tanggalRilis);
    setDeskripsiPerubahan(item.deskripsiPerubahan);
    setStatus(item.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!versi || !tanggalRilis) {
      alert('Versi dan tanggal rilis wajib diisi.');
      return;
    }

    if (editingItem) {
      setVersions(prev => prev.map(v => v.id === editingItem.id ? {
        ...v,
        versi,
        tanggalRilis,
        deskripsiPerubahan,
        status
      } : v));
      setNotification('Versi framework berhasil diupdate!');
    } else {
      const baru: FrameworkVersion = {
        id: `V-0${versions.length + 1}`,
        versi,
        tanggalRilis,
        deskripsiPerubahan,
        status
      };
      setVersions(prev => [...prev, baru]);
      setNotification('Versi framework baru berhasil ditambahkan!');
    }

    setIsModalOpen(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus catatan versi framework ini?')) {
      setVersions(prev => prev.filter(v => v.id !== id));
      setNotification('Catatan versi berhasil dihapus.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Framework Versioning" modul="Framework &amp; Assessment" color={COLOR} />

      {/* BANNER BATASAN KEWENANGAN */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 shadow-sm">
        <ShieldAlert size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          ⚠️ <strong>Batas Kewenangan Administrator:</strong> Administrator dapat memasukkan konfigurasi versi yang telah disetujui oleh pakar/ahli penilai. Administrator tidak boleh menaikkan atau merilis versi framework baru tanpa persetujuan komite pengembang.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <GitBranch size={14} /> Riwayat &amp; Versioning Struktur Framework
          </CardTitle>
          <Button onClick={handleAdd} size="sm" className="bg-indigo-650 hover:bg-indigo-755 h-8 font-bold text-xs">
            <Plus size={14} className="mr-1" /> Tambah Catatan Versi
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-bold text-slate-700">ID Versi</TableHead>
                  <TableHead className="font-bold text-slate-700">Nama / Label Versi</TableHead>
                  <TableHead className="font-bold text-slate-700">Tanggal Rilis</TableHead>
                  <TableHead className="font-bold text-slate-700">Deskripsi Perubahan</TableHead>
                  <TableHead className="font-bold text-slate-700">Status</TableHead>
                  <TableHead className="text-right font-bold text-slate-700">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {versions.map((v) => (
                  <TableRow key={v.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono font-bold text-slate-450">{v.id}</TableCell>
                    <TableCell className="font-bold text-slate-800">{v.versi}</TableCell>
                    <TableCell>{v.tanggalRilis}</TableCell>
                    <TableCell className="max-w-xs truncate leading-relaxed" title={v.deskripsiPerubahan}>{v.deskripsiPerubahan}</TableCell>
                    <TableCell>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                        v.status === 'Aktif' ? 'bg-green-50 text-green-700 border-green-200' :
                        v.status === 'Ditinjau Pakar' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        v.status === 'Disetujui' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-slate-100 text-slate-655'
                      }`}>{v.status}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button onClick={() => handleEdit(v)} size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-slate-100">
                          <Pencil size={13} className="text-blue-600" />
                        </Button>
                        <Button onClick={() => handleDelete(v.id)} size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-slate-100">
                          <Trash2 size={13} className="text-red-650" />
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
          <Card className="w-full max-w-md bg-white shadow-2xl border">
            <CardHeader className="flex flex-row items-center justify-between py-3">
              <CardTitle className="text-sm font-bold text-slate-805">
                {editingItem ? 'Edit Catatan Versi' : 'Tambah Catatan Versi'}
              </CardTitle>
              <Button onClick={() => setIsModalOpen(false)} size="sm" variant="ghost" className="h-8 w-8 p-0">
                <X size={16} />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-3.5 text-xs">
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Nama / Label Versi</Label>
                    <Input
                      required
                      value={versi}
                      onChange={e => setVersi(e.target.value)}
                      placeholder="Contoh: v2.1"
                      className="text-xs p-2 h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Tanggal Rilis</Label>
                    <Input
                      required
                      value={tanggalRilis}
                      onChange={e => setTanggalRilis(e.target.value)}
                      placeholder="Contoh: 18 Juli 2026"
                      className="text-xs p-2 h-9"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Deskripsi Perubahan</Label>
                  <textarea
                    required
                    value={deskripsiPerubahan}
                    onChange={e => setDeskripsiPerubahan(e.target.value)}
                    placeholder="Tuliskan perubahan mayor atau penyesuaian pada versi ini..."
                    rows={4}
                    className="w-full p-2 border rounded-lg focus:outline-none bg-white text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Tahap Status Persetujuan</Label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as any)}
                    className="w-full p-2 border rounded-lg bg-white h-9 focus:outline-none"
                  >
                    <option value="Draf">Draf</option>
                    <option value="Ditinjau Pakar">Ditinjau Pakar</option>
                    <option value="Disetujui">Disetujui</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Diarsipkan">Diarsipkan</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 border-t pt-3.5">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="h-8 text-xs font-bold">
                    Batal
                  </Button>
                  <Button type="submit" className="bg-indigo-650 hover:bg-indigo-755 h-8 text-xs font-bold text-white">
                    Simpan Versi
                  </Button>
                </div>

              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {notification && (
        <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border border-green-200 bg-white text-xs font-bold">
          <CheckCircle2 className="text-green-600" size={16} />
          {notification}
        </div>
      )}
    </div>
  );
}
