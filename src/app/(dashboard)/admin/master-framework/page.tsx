'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, X, CheckCircle2, ShieldAlert, Layers } from 'lucide-react';

const COLOR = '#1a237e';

interface Framework {
  id: string;
  kodeDefinisi: string;
  dimensi: string;
  indikator: string;
  bobotLokal: number;
  bobotGlobal: number;
  kategoriKesiapan: string;
  periodeBerlaku: string;
  status: 'Draf' | 'Ditinjau Pakar' | 'Disetujui' | 'Aktif' | 'Diarsipkan';
}

const MOCK_FRAMEWORK: Framework[] = [
  { id: 'FW-01', kodeDefinisi: 'INF-01 (Akses Jaringan Internet)', dimensi: 'Infrastruktur Digital', indikator: 'Ketersediaan WiFi Publik Desa', bobotLokal: 15, bobotGlobal: 10, kategoriKesiapan: 'Kesiapan Infrastruktur', periodeBerlaku: 'Tahun anggaran 2026', status: 'Aktif' },
  { id: 'FW-02', kodeDefinisi: 'SDM-02 (Literasi Digital Warga)', dimensi: 'Sumber Daya Manusia', indikator: 'Tingkat Keikutsertaan Pelatihan', bobotLokal: 20, bobotGlobal: 15, kategoriKesiapan: 'Kesiapan SDM', periodeBerlaku: 'Tahun anggaran 2026', status: 'Disetujui' },
  { id: 'FW-03', kodeDefinisi: 'LAY-03 (Layanan Publik Terintegrasi)', dimensi: 'Layanan Publik Desa', indikator: 'Jumlah Surat Online Diproses', bobotLokal: 25, bobotGlobal: 20, kategoriKesiapan: 'Kesiapan Layanan', periodeBerlaku: 'Tahun anggaran 2026', status: 'Ditinjau Pakar' },
  { id: 'FW-04', kodeDefinisi: 'KEB-04 (Arsip Digital Budaya)', dimensi: 'Kelembagaan & Budaya', indikator: 'Dokumentasi Warisan Budaya Dayak', bobotLokal: 10, bobotGlobal: 10, kategoriKesiapan: 'Kesiapan Kelembagaan', periodeBerlaku: 'Tahun anggaran 2026', status: 'Draf' },
];

export default function MasterFrameworkPage() {
  const [frameworks, setFrameworks] = useState<Framework[]>(MOCK_FRAMEWORK);
  const [notification, setNotification] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Framework | null>(null);
  
  // Form states
  const [kodeDefinisi, setKodeDefinisi] = useState('');
  const [dimensi, setDimensi] = useState('');
  const [indikator, setIndikator] = useState('');
  const [bobotLokal, setBobotLokal] = useState(0);
  const [bobotGlobal, setBobotGlobal] = useState(0);
  const [kategoriKesiapan, setKategoriKesiapan] = useState('');
  const [periodeBerlaku, setPeriodeBerlaku] = useState('');
  const [status, setStatus] = useState<'Draf' | 'Ditinjau Pakar' | 'Disetujui' | 'Aktif' | 'Diarsipkan'>('Draf');

  const handleAdd = () => {
    setEditingItem(null);
    setKodeDefinisi('');
    setDimensi('');
    setIndikator('');
    setBobotLokal(10);
    setBobotGlobal(10);
    setKategoriKesiapan('');
    setPeriodeBerlaku('Tahun anggaran 2026');
    setStatus('Draf');
    setIsModalOpen(true);
  };

  const handleEdit = (item: Framework) => {
    setEditingItem(item);
    setKodeDefinisi(item.kodeDefinisi);
    setDimensi(item.dimensi);
    setIndikator(item.indikator);
    setBobotLokal(item.bobotLokal);
    setBobotGlobal(item.bobotGlobal);
    setKategoriKesiapan(item.kategoriKesiapan);
    setPeriodeBerlaku(item.periodeBerlaku);
    setStatus(item.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kodeDefinisi || !dimensi || !indikator) {
      alert('Mohon isi field utama (Kode, Dimensi, Indikator).');
      return;
    }

    if (editingItem) {
      // Update
      setFrameworks(prev => prev.map(f => f.id === editingItem.id ? {
        ...f,
        kodeDefinisi,
        dimensi,
        indikator,
        bobotLokal: Number(bobotLokal),
        bobotGlobal: Number(bobotGlobal),
        kategoriKesiapan,
        periodeBerlaku,
        status
      } : f));
      setNotification('Konfigurasi framework berhasil diperbarui!');
    } else {
      // Create new
      const baru: Framework = {
        id: `FW-0${frameworks.length + 1}`,
        kodeDefinisi,
        dimensi,
        indikator,
        bobotLokal: Number(bobotLokal),
        bobotGlobal: Number(bobotGlobal),
        kategoriKesiapan,
        periodeBerlaku,
        status
      };
      setFrameworks(prev => [...prev, baru]);
      setNotification('Indikator framework baru berhasil ditambahkan!');
    }

    setIsModalOpen(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus indikator framework ini dari master?')) {
      setFrameworks(prev => prev.filter(f => f.id !== id));
      setNotification('Indikator berhasil dihapus.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Master Framework" modul="Framework &amp; Assessment" color={COLOR} />

      {/* BANNER BATASAN KEWENANGAN */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 shadow-sm">
        <ShieldAlert size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          ⚠️ <strong>Batas Kewenangan Administrator:</strong> Administrator dapat memasukkan konfigurasi yang telah disetujui. Administrator tidak boleh mengubah indikator atau bobot hanya berdasarkan keputusan teknis pribadi.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
            <Layers size={14} /> Struktur Teknis Kerangka Kesiapan (6 Dimensi &amp; 24 Indikator)
          </CardTitle>
          <Button onClick={handleAdd} size="sm" className="bg-indigo-650 hover:bg-indigo-755 h-8 font-bold text-xs">
            <Plus size={14} className="mr-1" /> Tambah Indikator Framework
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-bold text-slate-700">Kode &amp; Definisi</TableHead>
                  <TableHead className="font-bold text-slate-700">Dimensi</TableHead>
                  <TableHead className="font-bold text-slate-700">Indikator</TableHead>
                  <TableHead className="font-bold text-slate-700">Bobot Lokal / Global</TableHead>
                  <TableHead className="font-bold text-slate-700">Kategori Kesiapan</TableHead>
                  <TableHead className="font-bold text-slate-700">Periode</TableHead>
                  <TableHead className="font-bold text-slate-700">Status</TableHead>
                  <TableHead className="text-right font-bold text-slate-700">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {frameworks.map((f) => (
                  <TableRow key={f.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-bold text-slate-800">{f.kodeDefinisi}</TableCell>
                    <TableCell>{f.dimensi}</TableCell>
                    <TableCell>{f.indikator}</TableCell>
                    <TableCell>{f.bobotLokal}% / {f.bobotGlobal}%</TableCell>
                    <TableCell>{f.kategoriKesiapan}</TableCell>
                    <TableCell>{f.periodeBerlaku}</TableCell>
                    <TableCell>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                        f.status === 'Aktif' ? 'bg-green-50 text-green-700 border-green-200' :
                        f.status === 'Disetujui' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        f.status === 'Ditinjau Pakar' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-slate-100 text-slate-600'
                      }`}>{f.status}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button onClick={() => handleEdit(f)} size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-slate-100">
                          <Pencil size={13} className="text-blue-600" />
                        </Button>
                        <Button onClick={() => handleDelete(f.id)} size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-slate-100">
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
          <Card className="w-full max-w-lg bg-white shadow-2xl border">
            <CardHeader className="flex flex-row items-center justify-between py-3">
              <CardTitle className="text-sm font-bold text-slate-800">
                {editingItem ? 'Edit Indikator Framework' : 'Tambah Indikator Framework'}
              </CardTitle>
              <Button onClick={() => setIsModalOpen(false)} size="sm" variant="ghost" className="h-8 w-8 p-0">
                <X size={16} />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-3.5 text-xs">
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Kode &amp; Definisi</Label>
                    <Input
                      required
                      value={kodeDefinisi}
                      onChange={e => setKodeDefinisi(e.target.value)}
                      placeholder="Contoh: INF-01 (Akses Internet)"
                      className="text-xs p-2 h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Dimensi Kesiapan</Label>
                    <Input
                      required
                      value={dimensi}
                      onChange={e => setDimensi(e.target.value)}
                      placeholder="Contoh: Infrastruktur Digital"
                      className="text-xs p-2 h-9"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Deskripsi Indikator Utama</Label>
                  <Input
                    required
                    value={indikator}
                    onChange={e => setIndikator(e.target.value)}
                    placeholder="Contoh: Ketersediaan WiFi Publik Desa"
                    className="text-xs p-2 h-9"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Bobot Lokal (%)</Label>
                    <Input
                      type="number"
                      required
                      value={bobotLokal}
                      onChange={e => setBobotLokal(Number(e.target.value))}
                      className="text-xs p-2 h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Bobot Global (%)</Label>
                    <Input
                      type="number"
                      required
                      value={bobotGlobal}
                      onChange={e => setBobotGlobal(Number(e.target.value))}
                      className="text-xs p-2 h-9"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Kategori Kesiapan</Label>
                    <Input
                      value={kategoriKesiapan}
                      onChange={e => setKategoriKesiapan(e.target.value)}
                      placeholder="Contoh: Kesiapan Infrastruktur"
                      className="text-xs p-2 h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Periode Berlaku</Label>
                    <Input
                      value={periodeBerlaku}
                      onChange={e => setPeriodeBerlaku(e.target.value)}
                      placeholder="Tahun anggaran 2026"
                      className="text-xs p-2 h-9"
                    />
                  </div>
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
                    Simpan Konfigurasi
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
