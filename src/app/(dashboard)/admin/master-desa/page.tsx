'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Plus, Edit, Trash2, Search, Globe, Landmark, Loader2 } from 'lucide-react';

const COLOR = '#1a237e';

type Desa = {
  id: string;
  kodeDesa: string;
  nama: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  status: string;
};

const emptyForm = {
  id: '',
  kodeDesa: '',
  nama: '',
  kecamatan: '',
  kabupaten: '',
  provinsi: 'Kalimantan Tengah',
  status: 'Berkembang',
};

export default function MasterDesaPage() {
  const [search, setSearch] = useState('');
  const [desa, setDesa] = useState<Desa[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function loadDesa() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/master-desa', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal memuat data desa');
      setDesa(data.desa || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat data desa');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDesa();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return desa.filter(d =>
      d.kodeDesa.toLowerCase().includes(q) ||
      d.nama.toLowerCase().includes(q) ||
      d.kecamatan.toLowerCase().includes(q) ||
      d.kabupaten.toLowerCase().includes(q) ||
      d.provinsi.toLowerCase().includes(q)
    );
  }, [desa, search]);

  const stats = useMemo(() => ({
    total: desa.length,
    mandiri: desa.filter(d => d.status === 'Mandiri').length,
    maju: desa.filter(d => d.status === 'Maju').length,
    berkembang: desa.filter(d => d.status === 'Berkembang').length,
  }), [desa]);

  function openCreate() {
    setForm({ ...emptyForm, kodeDesa: `DESA${String(desa.length + 1).padStart(3, '0')}` });
    setError('');
    setOpen(true);
  }

  function openEdit(item: Desa) {
    setForm(item);
    setError('');
    setOpen(true);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/master-desa', {
        method: form.id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan desa');
      setOpen(false);
      setForm(emptyForm);
      await loadDesa();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan desa');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: Desa) {
    const ok = window.confirm(`Hapus ${item.nama}? Data ini akan hilang dari database.`);
    if (!ok) return;

    setError('');
    const res = await fetch(`/api/master-desa?id=${encodeURIComponent(item.id)}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Gagal menghapus desa');
      return;
    }
    await loadDesa();
  }

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Master Desa" modul="Modul 4: Master Data" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Desa" value={stats.total} satuan="desa aktif" barColor="green" progress={100} />
        <StatCard label="Desa Mandiri" value={stats.mandiri} satuan="kategori mandiri" barColor="blue" progress={stats.total ? (stats.mandiri / stats.total) * 100 : 0} />
        <StatCard label="Desa Maju" value={stats.maju} satuan="kategori maju" barColor="teal" progress={stats.total ? (stats.maju / stats.total) * 100 : 0} />
        <StatCard label="Desa Berkembang" value={stats.berkembang} satuan="kategori berkembang" barColor="orange" progress={stats.total ? (stats.berkembang / stats.total) * 100 : 0} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Landmark size={16} /> Daftar Desa Adat Terdaftar
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari desa..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 w-48"
                />
              </div>
              <button data-real-action-root onClick={openCreate} className="px-3 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                Registrasi Desa
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{error}</div>}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                  <th className="pb-2 pr-4">ID Desa</th>
                  <th className="pb-2 pr-4">Nama Desa</th>
                  <th className="pb-2 pr-4">Kecamatan</th>
                  <th className="pb-2 pr-4">Kabupaten</th>
                  <th className="pb-2 pr-4">Provinsi</th>
                  <th className="pb-2 pr-4">Status IDM</th>
                  <th className="pb-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      <Loader2 className="inline-block w-4 h-4 animate-spin mr-2" />
                      Memuat data desa...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">Belum ada data desa.</td>
                  </tr>
                ) : filtered.map((d, i) => (
                  <tr key={d.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50' : ''}`}>
                    <td className="py-3 pr-4 font-mono font-bold text-xs text-indigo-700">{d.kodeDesa}</td>
                    <td className="py-3 pr-4 font-semibold text-slate-700">
                      <span className="flex items-center gap-2">
                        <Globe size={14} className="text-emerald-600" />
                        {d.nama}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-slate-600 text-xs">{d.kecamatan}</td>
                    <td className="py-3 pr-4 text-slate-600 text-xs">{d.kabupaten}</td>
                    <td className="py-3 pr-4 text-slate-400 text-xs">{d.provinsi}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        d.status === 'Mandiri' ? 'bg-emerald-100 text-emerald-700' :
                        d.status === 'Maju' ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        <button data-real-action-root onClick={() => openEdit(d)} className="p-1 hover:bg-slate-100 rounded text-slate-500" title="Edit desa">
                          <Edit size={14} />
                        </button>
                        <button data-real-action-root onClick={() => handleDelete(d)} className="p-1 hover:bg-red-50 rounded text-red-500" title="Hapus desa">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center text-xs text-slate-400">
            <span>Menampilkan {filtered.length} dari {desa.length} desa terdaftar</span>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-real-action-root className="bg-white shadow-2xl border-2">
          <DialogHeader>
            <DialogTitle>{form.id ? 'Edit Desa' : 'Registrasi Desa'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input required value={form.kodeDesa} onChange={e => setForm(prev => ({ ...prev, kodeDesa: e.target.value }))} placeholder="ID Desa" className="h-10 px-3 rounded-md border text-sm" />
              <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value }))} className="h-10 px-3 rounded-md border text-sm bg-white">
                <option value="Mandiri">Mandiri</option>
                <option value="Maju">Maju</option>
                <option value="Berkembang">Berkembang</option>
              </select>
            </div>
            <input required value={form.nama} onChange={e => setForm(prev => ({ ...prev, nama: e.target.value }))} placeholder="Nama desa" className="w-full h-10 px-3 rounded-md border text-sm" />
            <input required value={form.kecamatan} onChange={e => setForm(prev => ({ ...prev, kecamatan: e.target.value }))} placeholder="Kecamatan" className="w-full h-10 px-3 rounded-md border text-sm" />
            <input required value={form.kabupaten} onChange={e => setForm(prev => ({ ...prev, kabupaten: e.target.value }))} placeholder="Kabupaten" className="w-full h-10 px-3 rounded-md border text-sm" />
            <input required value={form.provinsi} onChange={e => setForm(prev => ({ ...prev, provinsi: e.target.value }))} placeholder="Provinsi" className="w-full h-10 px-3 rounded-md border text-sm" />
            {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
            <button disabled={saving} className="w-full h-10 rounded-md bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 disabled:opacity-60">
              {saving ? 'Menyimpan...' : form.id ? 'Simpan Perubahan' : 'Registrasi Desa'}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
