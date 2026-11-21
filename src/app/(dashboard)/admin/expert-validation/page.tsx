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
  bidang: string;
  instrumenValidasi: string;
  artefakDinilai: string;
  hasilWorkbook: string;
  catatan: string;
  statusRevisi: 'S-CVI Final 1,000' | 'Instrumen Siap (Form Asli Pending)' | 'Konsisten (CR ≤ 0,10)';
  dokumenPersetujuan: string;
}

const INITIAL_VALIDASI: ValidasiPakar[] = [
  {
    id: 'RQ1-CVI',
    namaPakar: 'Panel 3 Pakar (P1, P2, P3)',
    bidang: 'Tata Kelola, Sistem Informasi & Adat',
    instrumenValidasi: 'Validitas Isi 24 Indikator (Skala 1–4)',
    artefakDinilai: 'Artefak 1 — Kerangka Kesiapan (6 Dimensi, 24 Indikator)',
    hasilWorkbook: 'S-CVI/Ave pra 0,9167 → pasca 1,000',
    catatan: '6 indikator direvisi pada tahap pra (I07, I13, I14, I16, I21, I23); I-CVI pasca = 1,00.',
    statusRevisi: 'S-CVI Final 1,000',
    dokumenPersetujuan: 'Dataset SLV 1 (Form asli pakar menunggu autentikasi)',
  },
  {
    id: 'RQ1-AHP',
    namaPakar: 'Panel 3 Pakar (P1, P2, P3)',
    bidang: 'Pembobotan Prioritas AHP (51 Pasangan/Pakar)',
    instrumenValidasi: 'Matriks Perbandingan Berpasangan (153 Input)',
    artefakDinilai: 'Artefak 1 — Bobot Lokal & Global 24 Indikator',
    hasilWorkbook: 'CR Dimensi 0,00144; CR Indikator maks 0,01738',
    catatan: 'Agregasi geometric mean 3 pakar; seluruh 7 matriks memenuhi CR ≤ 0,10.',
    statusRevisi: 'Konsisten (CR ≤ 0,10)',
    dokumenPersetujuan: 'Dataset SLV 1 — Sheet AHP_Hasil',
  },
  {
    id: 'RQ2-A2',
    namaPakar: 'Rencana P1, P2, P3',
    bidang: 'Validasi Formal Desain (6 Butir/Artefak)',
    instrumenValidasi: 'Instrumen Validasi Formal (30 Butir, Skala 1–4)',
    artefakDinilai: 'Artefak 2 — Model Konseptual (2 Siklus, 7 Aktor)',
    hasilWorkbook: 'Keterlacakan 24 indikator & 35 kebutuhan tersedia',
    catatan: 'Aspek penilaian dirumuskan (Tabel 4.27A); skor I-CVI formal menunggu formulir asli P1–P3.',
    statusRevisi: 'Instrumen Siap (Form Asli Pending)',
    dokumenPersetujuan: 'Instrumen Validasi Artefak 2–6',
  },
  {
    id: 'RQ2-A3',
    namaPakar: 'Rencana P1, P2, P3',
    bidang: 'Validasi Formal Arsitektur & Keamanan',
    instrumenValidasi: 'Instrumen Validasi Formal (6 Butir, Skala 1–4)',
    artefakDinilai: 'Artefak 3 — Cetak Biru Arsitektur (8 Lapisan, 32 Komponen)',
    hasilWorkbook: 'Spesifikasi 8 lapisan, RBAC 7 aktor, mode luring',
    catatan: 'Fokus perhatian: pengaturan akses, keamanan data budaya, dan interoperabilitas luring.',
    statusRevisi: 'Instrumen Siap (Form Asli Pending)',
    dokumenPersetujuan: 'Instrumen Validasi Artefak 2–6',
  },
  {
    id: 'RQ2-A4',
    namaPakar: '21 Pengguna + 3 Evaluator Pakar',
    bidang: 'Evaluasi Formatif DSS SAW',
    instrumenValidasi: 'Evaluasi 6 Aspek DSS (Dataset SLV 3)',
    artefakDinilai: 'Artefak 4 — DSS Berbasis SAW (6 Kriteria C1–C6)',
    hasilWorkbook: 'Rerata Formatif 4,09/5 (Pakar: 4,31; Pengguna: 4,06)',
    catatan: 'Sensitivitas ±10% stabil 39/39 skenario; keputusan akhir tetap melalui musyawarah.',
    statusRevisi: 'Instrumen Siap (Form Asli Pending)',
    dokumenPersetujuan: 'Dataset SLV 2 & SLV 3 — 08 Evaluasi DSS',
  },
  {
    id: 'RQ2-A5A6',
    namaPakar: 'Rencana P1, P2, P3',
    bidang: 'Validasi Antarmuka & Prototipe Web',
    instrumenValidasi: 'Instrumen Validasi Formal + Keterlacakan UML–UAT',
    artefakDinilai: 'Artefak 5 (35 Komponen) & Artefak 6 (35 Fitur, 4 UML)',
    hasilWorkbook: 'Demonstrasi 7 peran; UAT 86,65% (F-029 perlu retest)',
    catatan: 'Hasil demonstrasi & UAT dilaporkan terpisah dari klaim validasi isi formal pakar.',
    statusRevisi: 'Instrumen Siap (Form Asli Pending)',
    dokumenPersetujuan: 'Tabel 4.27A & Dataset SLV 3',
  },
];

export default function ExpertValidationPage() {
  const [items, setItems] = useState<ValidasiPakar[]>(INITIAL_VALIDASI);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ValidasiPakar | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const [namaPakar, setNamaPakar] = useState('');
  const [bidang, setBidang] = useState('');
  const [instrumenValidasi, setInstrumenValidasi] = useState('');
  const [artefakDinilai, setArtefakDinilai] = useState('');
  const [dokumenPersetujuan, setDokumenPersetujuan] = useState('');

  const openAdd = () => {
    setEditingItem(null);
    setNamaPakar(''); setBidang(''); setInstrumenValidasi(''); setArtefakDinilai(''); setDokumenPersetujuan('');
    setIsModalOpen(true);
  };

  const openEdit = (item: ValidasiPakar) => {
    setEditingItem(item);
    setNamaPakar(item.namaPakar); setBidang(item.bidang); setInstrumenValidasi(item.instrumenValidasi);
    setArtefakDinilai(item.artefakDinilai); setDokumenPersetujuan(item.dokumenPersetujuan);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setItems((prev) => prev.map((x) => (x.id === editingItem.id ? { ...x, namaPakar, bidang, instrumenValidasi, artefakDinilai, dokumenPersetujuan } : x)));
      setNotification('Data validasi pakar berhasil diperbarui!');
    } else {
      setItems((prev) => [
        ...prev,
        {
          id: `VP-0${prev.length + 1}`,
          namaPakar,
          bidang,
          instrumenValidasi,
          artefakDinilai,
          hasilWorkbook: 'Menunggu pengisian pakar',
          catatan: 'Instrumen terdaftar untuk penilaian pakar.',
          statusRevisi: 'Instrumen Siap (Form Asli Pending)',
          dokumenPersetujuan,
        },
      ]);
      setNotification('Instrumen validasi pakar baru berhasil didaftarkan!');
    }
    setIsModalOpen(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus data validasi pakar ini?')) {
      setItems((prev) => prev.filter((x) => x.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Validasi Pakar (Panel P1–P3 — Bab IV Tabel 4.13 &amp; 4.27A)" modul="Penelitian &amp; Evaluasi" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5">
        <ShieldAlert size={15} className="text-blue-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          ℹ️ <strong>Batas Kewenangan &amp; Gerbang Bukti (Bab IV):</strong> Administrator mengelola daftar instrumen validasi, namun <strong>tidak mengisi penilaian atas nama pakar</strong>. Validitas isi RQ1 mencatat S-CVI/Ave final <strong>1,000</strong> dan CR AHP <strong>0,00144</strong>; validasi formal Artefak 2–6 (30 butir, P1–P3) dilaporkan terpisah sambil menunggu autentikasi formulir asli pakar.
        </p>
      </div>

      <Card>
        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck size={14} /> Matriks Instrumen &amp; Status Validasi Pakar (Artefak 1 – 6)
          </CardTitle>
          <Button onClick={openAdd} size="sm" className="h-8 text-xs font-bold bg-indigo-700 hover:bg-indigo-800 text-white">
            <Plus size={13} className="mr-1" /> Daftarkan Instrumen
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  {['Kode', 'Pakar / Evaluator', 'Instrumen Validasi', 'Artefak Dinilai', 'Hasil Tercatat', 'Catatan Audit', 'Status', 'Arsip', 'Aksi'].map((h) => (
                    <TableHead key={h} className="font-bold text-slate-700">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono font-bold text-indigo-700">{item.id}</TableCell>
                    <TableCell>
                      <p className="font-bold text-slate-800">{item.namaPakar}</p>
                      <p className="text-[10px] text-slate-500">{item.bidang}</p>
                    </TableCell>
                    <TableCell className="text-slate-700">{item.instrumenValidasi}</TableCell>
                    <TableCell className="font-semibold text-slate-800 max-w-[200px]">{item.artefakDinilai}</TableCell>
                    <TableCell className="font-bold text-indigo-800">{item.hasilWorkbook}</TableCell>
                    <TableCell className="max-w-[220px] text-slate-600 leading-snug">{item.catatan}</TableCell>
                    <TableCell>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border whitespace-nowrap ${
                        item.statusRevisi.includes('Pending')
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-green-50 text-green-700 border-green-200'
                      }`}>
                        {item.statusRevisi}
                      </span>
                    </TableCell>
                    <TableCell className="text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <FileText size={11} className="text-slate-400 flex-shrink-0" />
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white shadow-2xl border">
            <CardHeader className="py-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800">{editingItem ? 'Edit Instrumen Validasi' : 'Daftarkan Instrumen Pakar'}</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsModalOpen(false)}>✕</Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-3 text-xs">
                <div className="space-y-1"><Label className="font-bold text-slate-700">Pakar / Panel</Label><Input required value={namaPakar} onChange={(e) => setNamaPakar(e.target.value)} className="h-9 text-xs" placeholder="Pakar P1 / Panel P1–P3" /></div>
                <div className="space-y-1"><Label className="font-bold text-slate-700">Bidang Keahlian</Label><Input required value={bidang} onChange={(e) => setBidang(e.target.value)} className="h-9 text-xs" /></div>
                <div className="space-y-1"><Label className="font-bold text-slate-700">Instrumen Validasi</Label><Input required value={instrumenValidasi} onChange={(e) => setInstrumenValidasi(e.target.value)} className="h-9 text-xs" /></div>
                <div className="space-y-1"><Label className="font-bold text-slate-700">Artefak yang Dinilai</Label><Input required value={artefakDinilai} onChange={(e) => setArtefakDinilai(e.target.value)} className="h-9 text-xs" placeholder="Artefak 2 — Model Konseptual" /></div>
                <div className="space-y-1"><Label className="font-bold text-slate-700">Referensi Arsip</Label><Input value={dokumenPersetujuan} onChange={(e) => setDokumenPersetujuan(e.target.value)} className="h-9 text-xs" /></div>
                <div className="flex justify-end gap-2 pt-2 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="h-8 text-xs font-bold">Batal</Button>
                  <Button type="submit" className="h-8 text-xs font-bold bg-indigo-700 text-white">Simpan</Button>
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
