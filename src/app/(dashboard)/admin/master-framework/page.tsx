'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, X, CheckCircle2, ShieldAlert, Layers } from 'lucide-react';
import { DIMENSI_BAB4, INDIKATOR_24_BAB4 } from '@/lib/bab4-data';

const COLOR = '#1a237e';

interface FrameworkItem {
  id: string;
  kode: string;
  dimensiKode: string;
  dimensi: string;
  indikator: string;
  definisi: string;
  bobotDimensi: number;
  bobotLokal: number;
  bobotGlobal: number;
  periodeBerlaku: string;
  status: 'Draf' | 'Ditinjau Pakar' | 'Disetujui' | 'Aktif' | 'Diarsipkan';
}

const INITIAL_FRAMEWORK: FrameworkItem[] = INDIKATOR_24_BAB4.map((item) => ({
  id: item.kode,
  kode: item.kode,
  dimensiKode: item.dimensiKode,
  dimensi: `${item.dimensiKode} — ${item.dimensiNama}`,
  indikator: item.nama,
  definisi: item.definisi,
  bobotDimensi: item.bobotDimensi,
  bobotLokal: item.bobotLokal,
  bobotGlobal: item.bobotGlobal,
  periodeBerlaku: 'Dataset SLV 1 v1.2 (2026)',
  status: 'Aktif',
}));

export default function MasterFrameworkPage() {
  const [frameworks, setFrameworks] = useState<FrameworkItem[]>(INITIAL_FRAMEWORK);
  const [filterDimensi, setFilterDimensi] = useState<string>('Semua');
  const [notification, setNotification] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FrameworkItem | null>(null);

  const [kode, setKode] = useState('');
  const [dimensiKode, setDimensiKode] = useState('D1');
  const [dimensi, setDimensi] = useState('');
  const [indikator, setIndikator] = useState('');
  const [definisi, setDefinisi] = useState('');
  const [bobotLokal, setBobotLokal] = useState(0.25);
  const [bobotGlobal, setBobotGlobal] = useState(0.04);
  const [periodeBerlaku, setPeriodeBerlaku] = useState('Dataset SLV 1 v1.2 (2026)');
  const [status, setStatus] = useState<FrameworkItem['status']>('Aktif');

  const filtered = filterDimensi === 'Semua'
    ? frameworks
    : frameworks.filter((f) => f.dimensiKode === filterDimensi);

  const totalBobotGlobal = frameworks.reduce((sum, f) => sum + f.bobotGlobal, 0);

  const handleAdd = () => {
    setEditingItem(null);
    setKode(`I${String(frameworks.length + 1).padStart(2, '0')}`);
    setDimensiKode('D1');
    setDimensi('D1 — Tata Kelola dan Kepemimpinan Digital');
    setIndikator('');
    setDefinisi('');
    setBobotLokal(0.25);
    setBobotGlobal(0.04);
    setPeriodeBerlaku('Dataset SLV 1 v1.2 (2026)');
    setStatus('Draf');
    setIsModalOpen(true);
  };

  const handleEdit = (item: FrameworkItem) => {
    setEditingItem(item);
    setKode(item.kode);
    setDimensiKode(item.dimensiKode);
    setDimensi(item.dimensi);
    setIndikator(item.indikator);
    setDefinisi(item.definisi);
    setBobotLokal(item.bobotLokal);
    setBobotGlobal(item.bobotGlobal);
    setPeriodeBerlaku(item.periodeBerlaku);
    setStatus(item.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kode || !dimensi || !indikator) {
      alert('Mohon isi field utama (Kode, Dimensi, Indikator).');
      return;
    }
    const dimRef = DIMENSI_BAB4.find((d) => d.kode === dimensiKode);
    const bDim = dimRef?.bobot ?? 0.166545;

    if (editingItem) {
      setFrameworks((prev) =>
        prev.map((f) =>
          f.id === editingItem.id
            ? { ...f, kode, dimensiKode, dimensi, indikator, definisi, bobotDimensi: bDim, bobotLokal: Number(bobotLokal), bobotGlobal: Number(bobotGlobal), periodeBerlaku, status }
            : f
        )
      );
      setNotification('Konfigurasi indikator kerangka berhasil diperbarui!');
    } else {
      const baru: FrameworkItem = {
        id: kode,
        kode,
        dimensiKode,
        dimensi,
        indikator,
        definisi,
        bobotDimensi: bDim,
        bobotLokal: Number(bobotLokal),
        bobotGlobal: Number(bobotGlobal),
        periodeBerlaku,
        status,
      };
      setFrameworks((prev) => [...prev, baru]);
      setNotification('Indikator kerangka baru berhasil ditambahkan!');
    }
    setIsModalOpen(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus indikator kerangka ini?')) {
      setFrameworks((prev) => prev.filter((f) => f.id !== id));
      setNotification('Indikator berhasil dihapus.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Master Kerangka Kesiapan (Artefak 1 — Bab IV)" modul="Kerangka &amp; Penilaian" color={COLOR} />

      {/* BANNER BATASAN KEWENANGAN & RINGKASAN AHP BAB IV */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 shadow-sm">
        <ShieldAlert size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          ⚠️ <strong>Batas Kewenangan Administrator (Bab IV, Tabel 4.11 &amp; 4.13D):</strong> Bobot lokal dan global 24 indikator dibentuk melalui agregasi geometric mean 3 pakar AHP (CR dimensi = <strong>0,00144</strong>; CR maks indikator = <strong>0,01738</strong>; S-CVI/Ave final = <strong>1,000</strong>; Cronbach&apos;s α = <strong>0,9367</strong>). Administrator tidak mengubah bobot tanpa persetujuan pakar.
        </p>
      </div>

      {/* RINGKASAN 6 DIMENSI AHP */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
        {DIMENSI_BAB4.map((d) => (
          <button
            key={d.kode}
            type="button"
            onClick={() => setFilterDimensi(filterDimensi === d.kode ? 'Semua' : d.kode)}
            className={`p-3 rounded-xl border text-left transition-all ${
              filterDimensi === d.kode ? 'bg-indigo-700 text-white border-indigo-700 shadow-sm' : 'bg-white hover:bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-black text-xs ${filterDimensi === d.kode ? 'text-white' : 'text-indigo-700'}`}>{d.kode}</span>
              <span className={`text-[9px] font-mono font-bold ${filterDimensi === d.kode ? 'text-indigo-100' : 'text-slate-500'}`}>W={d.bobot.toFixed(5)}</span>
            </div>
            <p className={`text-[10px] font-semibold mt-1 leading-tight ${filterDimensi === d.kode ? 'text-indigo-50' : 'text-slate-700'}`}>{d.nama}</p>
            <p className={`text-[9px] mt-1 font-mono ${filterDimensi === d.kode ? 'text-indigo-200' : 'text-slate-400'}`}>CR: {d.cr.toFixed(5)}</p>
          </button>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4 flex-wrap gap-2">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Layers size={14} /> Struktur Kerangka Kesiapan Final — 6 Dimensi &amp; {frameworks.length} Indikator (Total Bobot Global: {totalBobotGlobal.toFixed(6)})
          </CardTitle>
          <div className="flex items-center gap-2">
            {filterDimensi !== 'Semua' && (
              <Button onClick={() => setFilterDimensi('Semua')} size="sm" variant="outline" className="h-8 text-xs font-bold">
                Tampilkan Semua (24)
              </Button>
            )}
            <Button onClick={handleAdd} size="sm" className="bg-indigo-700 hover:bg-indigo-800 h-8 font-bold text-xs text-white">
              <Plus size={14} className="mr-1" /> Tambah Indikator
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-bold text-slate-700">Kode</TableHead>
                  <TableHead className="font-bold text-slate-700">Dimensi</TableHead>
                  <TableHead className="font-bold text-slate-700">Indikator Final &amp; Definisi Operasional</TableHead>
                  <TableHead className="font-bold text-slate-700 text-right">Bobot Dimensi</TableHead>
                  <TableHead className="font-bold text-slate-700 text-right">Bobot Lokal</TableHead>
                  <TableHead className="font-bold text-slate-700 text-right">Bobot Global</TableHead>
                  <TableHead className="font-bold text-slate-700">Status</TableHead>
                  <TableHead className="text-right font-bold text-slate-700">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((f) => (
                  <TableRow key={f.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono font-black text-indigo-700">{f.kode}</TableCell>
                    <TableCell className="font-semibold text-slate-700 whitespace-nowrap">{f.dimensiKode}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="font-bold text-slate-800">{f.indikator}</p>
                      <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{f.definisi}</p>
                    </TableCell>
                    <TableCell className="text-right font-mono text-slate-600">{f.bobotDimensi.toFixed(6)}</TableCell>
                    <TableCell className="text-right font-mono text-slate-600">{f.bobotLokal.toFixed(6)}</TableCell>
                    <TableCell className="text-right font-mono font-black text-indigo-700">{f.bobotGlobal.toFixed(6)}</TableCell>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg bg-white shadow-2xl border">
            <CardHeader className="flex flex-row items-center justify-between py-3">
              <CardTitle className="text-sm font-bold text-slate-800">
                {editingItem ? 'Edit Indikator Kerangka' : 'Tambah Indikator Kerangka'}
              </CardTitle>
              <Button onClick={() => setIsModalOpen(false)} size="sm" variant="ghost" className="h-8 w-8 p-0">
                <X size={16} />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Kode Indikator</Label>
                    <Input required value={kode} onChange={(e) => setKode(e.target.value)} placeholder="I01" className="text-xs p-2 h-9" />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Dimensi</Label>
                    <select
                      value={dimensiKode}
                      onChange={(e) => {
                        const dk = e.target.value;
                        setDimensiKode(dk);
                        const d = DIMENSI_BAB4.find((x) => x.kode === dk);
                        if (d) setDimensi(`${d.kode} — ${d.nama}`);
                      }}
                      className="w-full p-2 border rounded-lg bg-white h-9"
                    >
                      {DIMENSI_BAB4.map((d) => (
                        <option key={d.kode} value={d.kode}>{d.kode} — {d.nama}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Nama Indikator</Label>
                  <Input required value={indikator} onChange={(e) => setIndikator(e.target.value)} className="text-xs p-2 h-9" />
                </div>

                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Definisi Operasional</Label>
                  <Input value={definisi} onChange={(e) => setDefinisi(e.target.value)} className="text-xs p-2 h-9" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Bobot Lokal AHP</Label>
                    <Input type="number" step="0.000001" required value={bobotLokal} onChange={(e) => setBobotLokal(Number(e.target.value))} className="text-xs p-2 h-9" />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Bobot Global AHP</Label>
                    <Input type="number" step="0.000001" required value={bobotGlobal} onChange={(e) => setBobotGlobal(Number(e.target.value))} className="text-xs p-2 h-9" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Periode / Versi</Label>
                    <Input value={periodeBerlaku} onChange={(e) => setPeriodeBerlaku(e.target.value)} className="text-xs p-2 h-9" />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Status</Label>
                    <select value={status} onChange={(e) => setStatus(e.target.value as FrameworkItem['status'])} className="w-full p-2 border rounded-lg bg-white h-9">
                      <option value="Draf">Draf</option>
                      <option value="Ditinjau Pakar">Ditinjau Pakar</option>
                      <option value="Disetujui">Disetujui</option>
                      <option value="Aktif">Aktif</option>
                      <option value="Diarsipkan">Diarsipkan</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 border-t pt-3">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="h-8 text-xs font-bold">Batal</Button>
                  <Button type="submit" className="bg-indigo-700 hover:bg-indigo-800 h-8 text-xs font-bold text-white">Simpan</Button>
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
