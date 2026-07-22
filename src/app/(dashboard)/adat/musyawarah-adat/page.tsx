'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Users, Plus, CheckCircle2, MessageSquare, AlertTriangle, Eye, Trash2, Pencil, X, Calendar } from 'lucide-react';

const COLOR = '#5c3d11'; // Cokelat Kayu Adat

interface MusyawarahAdatRecord {
  id: string;
  agenda: string;
  bahanPembahasan: string;
  peserta: string;
  pandanganPertimbangan: string;
  hasilMusyawarah: string;
  persetujuanStatus: 'Disetujui' | 'Disetujui dengan Catatan' | 'Ditolak' | 'Ditunda';
  alasanKeputusan: string;
  tindakLanjut: string;
  tanggalMusyawarah: string;
}

const INITIAL_RECORDS: MusyawarahAdatRecord[] = [
  { id: 'MS-01', agenda: 'Musyawarah Batas Wilayah Hutan Adat Betutu', bahanPembahasan: 'Peta zonasi geospasial usulan PT Perkebunan', peserta: 'Tetua Adat, Tokoh Pemuda, BPD, Dinas Kehutanan', pandanganPertimbangan: 'Hutan adat tidak boleh beralih fungsi demi kelangsungan ekologi betutu', hasilMusyawarah: 'Ditolak total, hutan adat dipertahankan sebagai cagar budaya', persetujuanStatus: 'Ditolak', alasanKeputusan: 'Melanggar hukum adat pembukaan hutan keramat leluhur', tindakLanjut: 'Kirim surat penolakan resmi ke PMD dan investor', tanggalMusyawarah: '2026-07-10' },
  { id: 'MS-02', agenda: 'Pembahasan Festival Kebudayaan Hudoq 2026', bahanPembahasan: 'Rencana anggaran, jadwal ritual, dan akomodasi turis luar', peserta: 'Pengurus Sanggar Seni, Pemerintah Desa, Ketua Adat', pandanganPertimbangan: 'Ritual kesakralan panen padi harus dipisah dari pentas hiburan turis umum', hasilMusyawarah: 'Jadwal disepakati, upacara sakral tertutup di Huma Betang', persetujuanStatus: 'Disetujui dengan Catatan', alasanKeputusan: 'Menjaga nilai sakralitas ritus adat', tindakLanjut: 'Publikasikan jadwal pentas seni terbuka di media sosial desa', tanggalMusyawarah: '2026-07-12' },
];

export default function MusyawarahKeputusanAdatPage() {
  const [items, setItems] = useState<MusyawarahAdatRecord[]>(INITIAL_RECORDS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MusyawarahAdatRecord | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form states
  const [agenda, setAgenda] = useState('');
  const [bahanPembahasan, setBahanPembahasan] = useState('');
  const [peserta, setPeserta] = useState('');
  const [pandanganPertimbangan, setPandanganPertimbangan] = useState('');
  const [hasilMusyawarah, setHasilMusyawarah] = useState('');
  const [persetujuanStatus, setPersetujuanStatus] = useState<MusyawarahAdatRecord['persetujuanStatus']>('Disetujui');
  const [alasanKeputusan, setAlasanKeputusan] = useState('');
  const [tindakLanjut, setTindakLanjut] = useState('');

  const openAdd = () => {
    setEditingItem(null);
    setAgenda(''); setBahanPembahasan(''); setPeserta(''); setPandanganPertimbangan('');
    setHasilMusyawarah(''); setPersetujuanStatus('Disetujui'); setAlasanKeputusan(''); setTindakLanjut('');
    setIsModalOpen(true);
  };

  const openEdit = (item: MusyawarahAdatRecord) => {
    setEditingItem(item);
    setAgenda(item.agenda); setBahanPembahasan(item.bahanPembahasan); setPeserta(item.peserta);
    setPandanganPertimbangan(item.pandanganPertimbangan); setHasilMusyawarah(item.hasilMusyawarah);
    setPersetujuanStatus(item.persetujuanStatus); setAlasanKeputusan(item.alasanKeputusan); setTindakLanjut(item.tindakLanjut);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { agenda, bahanPembahasan, peserta, pandanganPertimbangan, hasilMusyawarah, persetujuanStatus, alasanKeputusan, tindakLanjut };
    if (editingItem) {
      setItems(prev => prev.map(x => x.id === editingItem.id ? { ...x, ...payload } : x));
      setNotification('Musyawarah adat berhasil diperbarui!');
    } else {
      setItems(prev => [...prev, {
        id: `MS-0${prev.length + 1}`, ...payload, tanggalMusyawarah: new Date().toISOString().split('T')[0]
      }]);
      setNotification('Rapat/Musyawarah adat baru berhasil dicatat!');
    }
    setIsModalOpen(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus catatan rapat adat ini?')) {
      setItems(prev => prev.filter(x => x.id !== id));
      setNotification('Catatan rapat adat berhasil dihapus.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const getPersetujuanColor = (status: string) => {
    switch (status) {
      case 'Disetujui': return 'bg-green-50 text-green-700 border-green-200';
      case 'Disetujui dengan Catatan': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Ditolak': return 'bg-red-50 text-red-700 border-red-200';
      case 'Ditunda': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-500';
    }
  };

  return (
    <div className="flex flex-col gap-5 text-xs">
      <PageTitle fitur="Musyawarah dan Keputusan Adat" modul="Penelitian &amp; Evaluasi" color={COLOR} />

      {/* Banner info */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <Calendar size={15} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          🏛️ <strong>Musyawarah Adat Rumah Betang:</strong> Catatan keputusan rapat adat ini berfungsi sebagai dokumentasi legalitas kesepakatan adat demi menindaklanjuti seluruh aspirasi masyarakat adat Desa Lung Anai.
        </p>
      </div>

      <Card>
        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Users size={14} /> Arsip Rapat, Musyawarah &amp; Hasil Keputusan Adat
          </CardTitle>
          <Button onClick={openAdd} size="sm" className="h-8 text-xs font-bold bg-[#5c3d11] hover:bg-[#432c0c] text-white">
            <Plus size={13} className="mr-1" /> Agendakan Musyawarah
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  {['ID', 'Agenda Rapat Adat', 'Bahan Pembahasan', 'Peserta Rapat', 'Pandangan Adat', 'Hasil Musyawarah', 'Status', 'Alasan', 'Tindak Lanjut', 'Tgl Rapat', 'Aksi'].map(h => (
                    <TableHead key={h} className="font-bold text-slate-700">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map(item => (
                  <TableRow key={item.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono font-bold text-slate-500">{item.id}</TableCell>
                    <TableCell className="font-bold text-slate-800">{item.agenda}</TableCell>
                    <TableCell className="max-w-[130px] truncate text-slate-500" title={item.bahanPembahasan}>{item.bahanPembahasan}</TableCell>
                    <TableCell className="max-w-[120px] truncate" title={item.peserta}>{item.peserta}</TableCell>
                    <TableCell className="max-w-[150px] truncate" title={item.pandanganPertimbangan}>{item.pandanganPertimbangan}</TableCell>
                    <TableCell className="max-w-[150px] truncate font-semibold" title={item.hasilMusyawarah}>{item.hasilMusyawarah}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border whitespace-nowrap ${getPersetujuanColor(item.persetujuanStatus)}`}>
                        {item.persetujuanStatus}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[120px] truncate text-slate-500" title={item.alasanKeputusan}>{item.alasanKeputusan}</TableCell>
                    <TableCell className="max-w-[120px] truncate text-indigo-700 font-bold" title={item.tindakLanjut}>{item.tindakLanjut}</TableCell>
                    <TableCell className="font-mono">{item.tanggalMusyawarah}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button onClick={() => openEdit(item)} size="sm" variant="ghost" className="h-7 w-7 p-0"><Pencil size={13} className="text-blue-600" /></Button>
                        <Button onClick={() => handleDelete(item.id)} size="sm" variant="ghost" className="h-7 w-7 p-0"><Trash2 size={13} className="text-red-650" /></Button>
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
            <CardHeader className="py-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800">{editingItem ? 'Edit Hasil Musyawarah Adat' : 'Agendakan Musyawarah Adat Baru'}</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsModalOpen(false)}>✕</Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Agenda Musyawarah</Label>
                  <Input required value={agenda} onChange={e => setAgenda(e.target.value)} className="h-9 text-xs" placeholder="Contoh: Rapat Hutan Adat Betutu" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Bahan Pembahasan</Label>
                    <Input required value={bahanPembahasan} onChange={e => setBahanPembahasan(e.target.value)} className="h-9 text-xs" placeholder="Bahan usulan/dokumen" />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Daftar Peserta</Label>
                    <Input required value={peserta} onChange={e => setPeserta(e.target.value)} className="h-9 text-xs" placeholder="Siapa saja yang hadir" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Pandangan / Pertimbangan Adat</Label>
                  <Textarea required value={pandanganPertimbangan} onChange={e => setPandanganPertimbangan(e.target.value)} className="min-h-[50px] text-xs" placeholder="Norma hukum adat yang menjadi dasar..." />
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Hasil Musyawarah</Label>
                  <Textarea required value={hasilMusyawarah} onChange={e => setHasilMusyawarah(e.target.value)} className="min-h-[50px] text-xs" placeholder="Keputusan mufakat rapat..." />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Status Persetujuan</Label>
                    <select value={persetujuanStatus} onChange={e => setPersetujuanStatus(e.target.value as any)} className="w-full h-9 rounded-md border bg-white px-2 text-xs">
                      <option value="Disetujui">Disetujui</option>
                      <option value="Disetujui dengan Catatan">Disetujui dengan Catatan</option>
                      <option value="Ditolak">Ditolak</option>
                      <option value="Ditunda">Ditunda</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Alasan Keputusan</Label>
                    <Input required value={alasanKeputusan} onChange={e => setAlasanKeputusan(e.target.value)} className="h-9 text-xs" placeholder="Alasan disetujui/ditolak" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Tindak Lanjut Musyawarah</Label>
                  <Input required value={tindakLanjut} onChange={e => setTindakLanjut(e.target.value)} className="h-9 text-xs" placeholder="Langkah berikutnya..." />
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="h-8 text-xs font-bold">Batal</Button>
                  <Button type="submit" className="h-8 text-xs font-bold bg-[#5c3d11] text-white hover:bg-[#432c0c]">Simpan Keputusan</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {notification && (
        <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border border-green-200 bg-white text-xs font-bold">
          <CheckCircle2 className="text-green-600" size={16} /> {notification}
        </div>
      )}
    </div>
  );
}
