'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, ShieldAlert, CheckCircle2, UserCheck, FileText } from 'lucide-react';

const COLOR = '#1a237e';

interface ValidasiPakar {
  id: string;
  namaPakar: string;
  institusi: string;
  instrumenValidasi: string;
  artefakDinilai: string;
  nilai: number | null;
  komentar: string;
  rekomendasiPerbaikan: string;
  statusRevisi: 'Disetujui' | 'Perlu Revisi' | 'Menunggu';
  dokumenPersetujuan: string;
}

const MOCK: ValidasiPakar[] = [
  { id: 'VP-01', namaPakar: 'Dr. Budi Santoso', institusi: 'UNMUL – Ilmu Pemerintahan', instrumenValidasi: 'Kuesioner Governance', artefakDinilai: 'Artefak 1 (Pedoman Wawancara)', nilai: 85, komentar: 'Pertanyaan sudah relevan, tambahkan sub-indikator partisipasi musyawarah.', rekomendasiPerbaikan: 'Tambahkan item musyawarah desa di dimensi kelembagaan.', statusRevisi: 'Disetujui', dokumenPersetujuan: 'TTDD/I/2025-001' },
  { id: 'VP-02', namaPakar: 'Prof. Siti Aminah', institusi: 'UNMUL – Kesehatan Masyarakat', instrumenValidasi: 'Kuesioner Quality of Life', artefakDinilai: 'Artefak 3 (Kuesioner QoL)', nilai: 90, komentar: 'Dimensi layanan kesehatan sudah komprehensif.', rekomendasiPerbaikan: '-', statusRevisi: 'Disetujui', dokumenPersetujuan: 'TTDD/I/2025-002' },
  { id: 'VP-03', namaPakar: 'Ir. Rina Wijaya', institusi: 'UNMUL – Teknologi Informasi', instrumenValidasi: 'Kuesioner Maturity Model', artefakDinilai: 'Artefak 4 (Maturity Framework)', nilai: null, komentar: '', rekomendasiPerbaikan: '', statusRevisi: 'Menunggu', dokumenPersetujuan: '-' },
];

export default function ExpertValidationPage() {
  const [items, setItems] = useState<ValidasiPakar[]>(MOCK);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ValidasiPakar | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form states
  const [namaPakar, setNamaPakar] = useState('');
  const [institusi, setInstitusi] = useState('');
  const [instrumenValidasi, setInstrumenValidasi] = useState('');
  const [artefakDinilai, setArtefakDinilai] = useState('');
  const [dokumenPersetujuan, setDokumenPersetujuan] = useState('');

  const openAdd = () => {
    setEditingItem(null);
    setNamaPakar(''); setInstitusi(''); setInstrumenValidasi(''); setArtefakDinilai(''); setDokumenPersetujuan('');
    setIsModalOpen(true);
  };

  const openEdit = (item: ValidasiPakar) => {
    setEditingItem(item);
    setNamaPakar(item.namaPakar); setInstitusi(item.institusi); setInstrumenValidasi(item.instrumenValidasi);
    setArtefakDinilai(item.artefakDinilai); setDokumenPersetujuan(item.dokumenPersetujuan);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setItems(prev => prev.map(x => x.id === editingItem.id ? { ...x, namaPakar, institusi, instrumenValidasi, artefakDinilai, dokumenPersetujuan } : x));
      setNotification('Data pakar berhasil diperbarui!');
    } else {
      setItems(prev => [...prev, {
        id: `VP-0${prev.length + 1}`, namaPakar, institusi, instrumenValidasi, artefakDinilai,
        nilai: null, komentar: '', rekomendasiPerbaikan: '', statusRevisi: 'Menunggu', dokumenPersetujuan
      }]);
      setNotification('Pakar baru berhasil didaftarkan!');
    }
    setIsModalOpen(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus data validasi pakar ini?')) {
      setItems(prev => prev.filter(x => x.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Validasi Pakar" modul="Penelitian &amp; Evaluasi" color={COLOR} />

      {/* Banner batasan */}
      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5">
        <ShieldAlert size={15} className="text-blue-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          ℹ️ <strong>Batas Kewenangan:</strong> Admin mengelola instrumen validasi dan penyimpanan hasil penilaian, tetapi <strong>tidak mengisi penilaian atas nama pakar</strong>. Nilai, komentar, dan rekomendasi diisi sendiri oleh pakar yang bersangkutan.
        </p>
      </div>

      <Card>
        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck size={14} /> Daftar Pakar &amp; Instrumen Validasi
          </CardTitle>
          <Button onClick={openAdd} size="sm" className="h-8 text-xs font-bold">
            <Plus size={13} className="mr-1" /> Daftarkan Pakar
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  {['ID', 'Nama Pakar', 'Institusi', 'Instrumen Validasi', 'Artefak Dinilai', 'Nilai', 'Komentar', 'Rekomendasi Perbaikan', 'Status Revisi', 'Dok. Persetujuan', 'Aksi'].map(h => (
                    <TableHead key={h} className="font-bold text-slate-700">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map(item => (
                  <TableRow key={item.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono font-bold text-slate-500">{item.id}</TableCell>
                    <TableCell className="font-bold text-slate-800">{item.namaPakar}</TableCell>
                    <TableCell>{item.institusi}</TableCell>
                    <TableCell>{item.instrumenValidasi}</TableCell>
                    <TableCell>{item.artefakDinilai}</TableCell>
                    <TableCell className="font-black text-indigo-700">{item.nilai !== null ? item.nilai : <span className="text-slate-400 font-normal">Belum diisi</span>}</TableCell>
                    <TableCell className="max-w-[150px] truncate text-slate-600" title={item.komentar}>{item.komentar || '—'}</TableCell>
                    <TableCell className="max-w-[150px] truncate text-slate-600" title={item.rekomendasiPerbaikan}>{item.rekomendasiPerbaikan || '—'}</TableCell>
                    <TableCell>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${item.statusRevisi === 'Disetujui' ? 'bg-green-50 text-green-700 border-green-200' : item.statusRevisi === 'Perlu Revisi' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                        {item.statusRevisi}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1">
                        <FileText size={11} className="text-slate-400" />
                        {item.dokumenPersetujuan}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button onClick={() => openEdit(item)} size="sm" variant="ghost" className="h-7 w-7 p-0"><Pencil size={13} className="text-blue-600" /></Button>
                        <Button onClick={() => handleDelete(item.id)} size="sm" variant="ghost" className="h-7 w-7 p-0"><Trash2 size={13} className="text-red-600" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal — hanya kelola instrumen & daftar pakar, bukan isi nilai */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white shadow-2xl border">
            <CardHeader className="py-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800">{editingItem ? 'Edit Data Pakar' : 'Daftarkan Pakar Baru'}</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsModalOpen(false)}>✕</Button>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2.5 mb-3 font-semibold">
                ⚠️ Form ini hanya untuk mengelola instrumen dan daftar pakar. Nilai dan komentar <strong>hanya diisi oleh pakar yang bersangkutan</strong>.
              </div>
              <form onSubmit={handleSave} className="space-y-3 text-xs">
                <div className="space-y-1"><Label className="font-bold text-slate-700">Nama Lengkap Pakar</Label><Input required value={namaPakar} onChange={e => setNamaPakar(e.target.value)} className="h-9 text-xs" placeholder="Dr. / Prof. ..." /></div>
                <div className="space-y-1"><Label className="font-bold text-slate-700">Institusi / Afiliasi</Label><Input required value={institusi} onChange={e => setInstitusi(e.target.value)} className="h-9 text-xs" placeholder="Contoh: UNMUL – Ilmu Pemerintahan" /></div>
                <div className="space-y-1"><Label className="font-bold text-slate-700">Instrumen Validasi</Label><Input required value={instrumenValidasi} onChange={e => setInstrumenValidasi(e.target.value)} className="h-9 text-xs" placeholder="Contoh: Kuesioner Readiness" /></div>
                <div className="space-y-1"><Label className="font-bold text-slate-700">Artefak yang Dinilai</Label><Input required value={artefakDinilai} onChange={e => setArtefakDinilai(e.target.value)} className="h-9 text-xs" placeholder="Contoh: Artefak 1 (Pedoman Wawancara)" /></div>
                <div className="space-y-1"><Label className="font-bold text-slate-700">Nomor Dokumen Persetujuan</Label><Input value={dokumenPersetujuan} onChange={e => setDokumenPersetujuan(e.target.value)} className="h-9 text-xs" placeholder="Contoh: TTDD/I/2025-001" /></div>
                <div className="flex justify-end gap-2 pt-2 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="h-8 text-xs font-bold">Batal</Button>
                  <Button type="submit" className="h-8 text-xs font-bold">Simpan</Button>
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
