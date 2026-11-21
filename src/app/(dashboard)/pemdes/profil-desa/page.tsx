'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  MapPin, Users, Edit, Save, History, Landmark,
  ShieldCheck, Upload, RefreshCw, CheckCircle2, FileText, X, Trash2
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const COLOR = '#283593';
const MODULE_PATH = '/pemdes/profil-desa';
const STORAGE_KEY = 'slv_pemdes_profil_desa_v1';

interface Riwayat {
  tgl: string;
  user: string;
  perubahan: string;
  status: string;
}

interface UploadedDoc {
  id: string;
  name: string;
  size: string;
  keterangan: string;
  uploadedAt: string;
}

export default function ProfilDesaPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>(null);
  const [docNote, setDocNote] = useState('');
  const [savingDoc, setSavingDoc] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDeleteDoc, setPendingDeleteDoc] = useState<UploadedDoc | null>(null);
  const [submittedVerifikasi, setSubmittedVerifikasi] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedDoc[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  
  // Data Profil Desa sesuai Bab IV (Tabel 4.3 & 4.9 — BPS Kab. Kutai Kartanegara 2025)
  const [formData, setFormData] = useState({
    // 1. Identitas Desa
    namaDesa: 'Desa Lung Anai (Lokus Penelitian: Jonggon Jaya, Kedang Ipil, Lung Anai)',
    kodeDesa: '6402032014',
    kodePos: '75571',
    tahunBentuk: '2007 (Desa Budaya)',
    telepon: '(0541) 661234',
    email: 'pemdes@borneo.id',
    visi: 'Mewujudkan Desa Adat Borneo (Jonggon Jaya, Kedang Ipil, dan Lung Anai) melalui Model Smart Living Village berbasis SDGs Desa 3, 4, dan 18 serta Tata Kelola Adat.',
    misi: '1. Melestarikan budaya adat Dayak Kenyah & Kutai Adat Lawas dengan pelindungan data budaya\n2. Meningkatkan kualitas layanan kesehatan (SDG 3), pendidikan (SDG 4), dan kelembagaan adat (SDG 18)\n3. Memperkuat integrasi Sistem Informasi Desa Adat dan dukungan keputusan berbasis musyawarah',
    
    // 2. Wilayah dan Dusun (Tabel 4.3 BPS Kutai Kartanegara 2025)
    luasWilayah: '1,85 (Lung Anai) | 105,07 (Jonggon Jaya) | 169,00 (Kedang Ipil)',
    batasUtara: 'Wilayah Kec. Loa Kulu, Kab. Kutai Kartanegara',
    batasSelatan: '±28 km ke ibu kota kecamatan; ±33 km ke ibu kota kabupaten',
    jumlahDusun: 'Desa Budaya Lung Anai (4 RT)',
    jumlahRT: '4 RT (Lung Anai) · 17 RT (Jonggon Jaya) · 12 RT / 2 Dusun (Kedang Ipil)',
    
    // 3. Jumlah Penduduk dan Keluarga (Tabel 4.3 BPS 2025 — Kondisi 2024)
    jumlahPenduduk: '480 (Lung Anai) | 2.553 (Jonggon Jaya) | 1.505 (Kedang Ipil)',
    jumlahKeluarga: '152 KK (Lung Anai) | 825 KK (Jonggon Jaya)',
    kepadatan: 'Konteks 3 Desa Penelitian — Kab. Kutai Kartanegara',
    
    // 4. Kelembagaan
    lembagaPemerintah: 'Pemerintah Desa, BPD, Lembaga Adat Dayak Kenyah / Kutai Adat Lawas, Tokoh Masyarakat',
    
    // 5. Sarana Kesehatan
    saranaKesehatan: 'Posyandu Digital, Pustu & Polindes (Kedang Ipil), Puskesmas Jonggon Jaya',
    
    // 6. Sarana Pendidikan
    saranaPendidikan: 'Satuan Pendidikan Dasar–Menengah, Kelas Literasi Digital & Pendampingan Guru',
    
    // 7. Infrastruktur Digital
    infrastrukturDigital: 'Arsitektur Luring-Utama (Offline-First) & Sinkronisasi Berkala (Lung Anai: D2 = 30,75; Kedang Ipil: 48,40; Jonggon Jaya: 69,92)',
    
    // 8. Lembaga Adat
    lembagaAdat: 'Lembaga Adat Dayak Kenyah Lung Anai (D5 = 89,73) & Kutai Adat Lawas Sumping Layang Kedang Ipil (D5 = 86,58)',
    
    // 9. Program Aktif
    programAktif: 'A02 Penguatan Konektivitas & Perangkat (Kedang Ipil & Lung Anai), A08 Dasbor SDGs Desa 3, 4, dan 18 (Jonggon Jaya)',
    
    // 10. Sumber dan Waktu Pembaruan
    sumberData: 'BPS Kabupaten Kutai Kartanegara (2025a, 2025b) & Dataset SLV 1–3 v1.2',
    waktuPembaruan: '18 Juli 2026, 10:00 WITA',
  });

  const [riwayat, setRiwayat] = useState<Riwayat[]>([
    { tgl: '18 Jul 2026, 10:00', user: 'Sekdes (Siti Nurhaliza)', perubahan: 'Pembaruan jumlah penduduk hasil Regsosek 2026', status: 'Terverifikasi' },
    { tgl: '10 Jun 2026, 14:15', user: 'Kasi Pemerintahan', perubahan: 'Update infrastruktur digital (WiFi Balai Desa)', status: 'Terverifikasi' },
    { tgl: '05 Mei 2026, 09:30', user: 'Sekdes (Siti Nurhaliza)', perubahan: 'Pembaruan data sarana kesehatan posyandu', status: 'Terverifikasi' },
  ]);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 4000);
  };

  // Muat dokumen tersimpan dari database MySQL & profil lokal saat halaman dibuka/refresh
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.formData) setFormData(prev => ({ ...prev, ...parsed.formData }));
        if (Array.isArray(parsed.riwayat)) setRiwayat(parsed.riwayat);
        if (typeof parsed.submittedVerifikasi === 'boolean') setSubmittedVerifikasi(parsed.submittedVerifikasi);
      }
    } catch {
      // abaikan jika localStorage kosong/rusak
    }

    fetch(`/api/module-records?path=${encodeURIComponent(MODULE_PATH)}`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (!data || !Array.isArray(data.records)) return;
        const docs: UploadedDoc[] = data.records
          .filter((r: { category?: string }) => r.category === 'Dokumen Pendukung')
          .map((r: { id: string; title: string; valueText?: string | null; description?: string | null; createdAt?: string }) => ({
            id: r.id,
            name: r.title,
            size: r.valueText || '-',
            keterangan: r.description || '',
            uploadedAt: r.createdAt
              ? new Date(r.createdAt).toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WITA'
              : 'Tersimpan',
          }));
        setUploadedFiles(docs);
      })
      .catch(() => {
        // fallback diam
      });
  }, []);

  const persistLocalProfile = (
    nextFormData = formData,
    nextRiwayat = riwayat,
    nextVerifikasi = submittedVerifikasi
  ) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          formData: nextFormData,
          riwayat: nextRiwayat,
          submittedVerifikasi: nextVerifikasi,
        })
      );
    } catch {
      // abaikan kuota storage
    }
  };

  const handleSave = () => {
    const now = new Date().toLocaleString('id-ID') + ' WITA';
    const nextForm = { ...formData, waktuPembaruan: now };
    const nextRiwayat = [
      { tgl: now, user: 'Kepala Desa Lung Anai', perubahan: 'Pembaruan data profil desa', status: 'Tersimpan' },
      ...riwayat,
    ];
    setFormData(nextForm);
    setRiwayat(nextRiwayat);
    setIsEditing(false);
    persistLocalProfile(nextForm, nextRiwayat, submittedVerifikasi);
    showNotice('Profil desa berhasil disimpan.');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const size = file.size >= 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${Math.max(1, Math.round(file.size / 1024))} KB`;
    setSelectedFile({ name: file.name, size });
    e.target.value = '';
  };

  const handleSaveDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      showNotice('Pilih file dokumen terlebih dahulu sebelum menyimpan.');
      return;
    }

    setSavingDoc(true);
    try {
      const res = await fetch('/api/module-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modulePath: MODULE_PATH,
          moduleName: 'Profil Desa',
          title: selectedFile.name,
          category: 'Dokumen Pendukung',
          description: docNote.trim() || 'Dokumen pendukung profil desa',
          valueText: selectedFile.size,
          status: 'Tersimpan',
          createdBy: 'Pemerintah Desa',
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Gagal menyimpan dokumen');

      const now = new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WITA';
      const newDoc: UploadedDoc = {
        id: json.id,
        name: selectedFile.name,
        size: selectedFile.size,
        keterangan: docNote.trim() || 'Dokumen pendukung profil desa',
        uploadedAt: now,
      };
      setUploadedFiles(prev => [newDoc, ...prev]);
      setSelectedFile(null);
      setDocNote('');
      setShowUploadPanel(false);
      showNotice(`Dokumen "${newDoc.name}" berhasil disimpan ke database (aman saat direfresh).`);
    } catch (err) {
      showNotice(err instanceof Error ? err.message : 'Gagal menyimpan dokumen ke database.');
    } finally {
      setSavingDoc(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteDoc) return;
    const doc = pendingDeleteDoc;
    setDeletingId(doc.id);
    try {
      const res = await fetch(`/api/module-records?id=${encodeURIComponent(doc.id)}&path=${encodeURIComponent(MODULE_PATH)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Gagal menghapus dokumen');
      setUploadedFiles(prev => prev.filter(item => item.id !== doc.id));
      setPendingDeleteDoc(null);
      showNotice(`Dokumen "${doc.name}" berhasil dihapus.`);
    } catch {
      showNotice('Gagal menghapus dokumen dari database.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleVerifikasi = () => {
    setSubmittedVerifikasi(true);
    persistLocalProfile(formData, riwayat, true);
    showNotice('Pengajuan verifikasi profil desa telah dikirim ke Dinas PMD Kabupaten.');
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Profil Desa" modul="Pemerintah Desa" color={COLOR} />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-950 via-indigo-900 to-indigo-800 rounded-2xl p-6 text-white overflow-hidden shadow-md">
        <div className="relative z-10 space-y-2">
          <span className="bg-blue-800 text-blue-100 border border-blue-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Modul Pemerintah Desa</span>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{formData.namaDesa}</h1>
          <p className="text-xs text-blue-100">Kecamatan Loa Kulu &amp; Kota Bangun Darat, Kabupaten Kutai Kartanegara, Provinsi Kalimantan Timur</p>
          <div className="flex flex-wrap gap-2 text-[10px] pt-1">
            <span className="px-2.5 py-1 bg-white/15 border border-white/20 text-white rounded-full flex items-center gap-1">
              <Users size={11} /> Lung Anai: 480 Jiwa / 152 KK · Jonggon Jaya: 2.553 Jiwa · Kedang Ipil: 1.505 Jiwa
            </span>
            <span className="px-2.5 py-1 bg-white/15 border border-white/20 text-white rounded-full flex items-center gap-1">
              <MapPin size={11} /> 1,85 km² (Lung Anai) · 105,07 km² (Jonggon Jaya) · 169,00 km² (Kedang Ipil)
            </span>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-36 h-36 opacity-10">
          <Landmark size={144} />
        </div>
      </div>

      {/* FUNGSI UTAMA / ACTION BUTTONS */}
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="px-3.5 py-2 text-xs bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-bold shadow-sm transition-colors flex items-center gap-1.5"
        >
          {isEditing ? <Save size={13} /> : <Edit size={13} />}
          {isEditing ? 'Simpan Profil' : 'Perbarui Profil'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => setShowUploadPanel(prev => !prev)}
          className={`px-3.5 py-2 text-xs rounded-lg font-bold shadow-sm transition-colors flex items-center gap-1.5 border ${
            showUploadPanel
              ? 'bg-indigo-50 border-indigo-400 text-indigo-800'
              : 'bg-white border-slate-400 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Upload size={13} /> Unggah Dokumen Pendukung
        </button>
        <button
          onClick={handleVerifikasi}
          disabled={submittedVerifikasi}
          className={`px-3.5 py-2 text-xs rounded-lg font-bold shadow-sm transition-colors flex items-center gap-1.5 ${submittedVerifikasi ? 'bg-green-100 border border-green-200 text-green-700 cursor-default' : 'bg-emerald-700 hover:bg-emerald-800 text-white'}`}
        >
          <ShieldCheck size={13} /> {submittedVerifikasi ? 'Sudah Diajukan Verifikasi' : 'Ajukan Verifikasi'}
        </button>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="px-3.5 py-2 text-xs bg-white border border-slate-400 text-slate-700 hover:bg-slate-50 rounded-lg font-bold shadow-sm transition-colors flex items-center gap-1.5"
        >
          <History size={13} /> Lihat Riwayat Perubahan
        </button>
      </div>

      {/* IN-PAGE NOTICE */}
      {notice && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between gap-2">
          <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-600" /> {notice}</span>
          <button type="button" onClick={() => setNotice(null)} className="text-emerald-600 hover:text-emerald-800"><X size={14} /></button>
        </div>
      )}

      {/* RIWAYAT PANEL */}
      {showHistory && (
        <Card className="border-indigo-200 bg-indigo-50/10">
          <CardHeader className="py-3">
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <History size={14} className="text-indigo-700" /> Riwayat Pembaruan Profil Desa
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            <div className="divide-y divide-slate-200">
              {riwayat.map((r, i) => (
                <div key={i} className="py-2 flex justify-between items-center gap-4 flex-wrap">
                  <div>
                    <p className="font-semibold text-slate-800">{r.perubahan}</p>
                    <p className="text-[10px] text-slate-400">Oleh: {r.user} • {r.tgl}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-700">{r.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* FORM UNGGAH DOKUMEN PENDUKUNG */}
      {showUploadPanel && (
        <Card className="border-indigo-300 bg-indigo-50/30 shadow-sm">
          <CardHeader className="py-3 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
              <Upload size={14} className="text-indigo-700" /> Unggah &amp; Simpan Dokumen Pendukung
            </CardTitle>
            <button
              type="button"
              onClick={() => { setShowUploadPanel(false); setSelectedFile(null); setDocNote(''); }}
              className="text-slate-400 hover:text-slate-700"
            >
              <X size={15} />
            </button>
          </CardHeader>
          <CardContent className="text-xs">
            <form onSubmit={handleSaveDocument} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">1. Pilih File Dokumen</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-2 bg-white border border-indigo-300 hover:bg-indigo-50 text-indigo-700 rounded-lg font-bold flex items-center gap-1.5 flex-shrink-0"
                    >
                      <Upload size={13} /> Pilih File
                    </button>
                    <span className="text-[11px] text-slate-600 truncate">
                      {selectedFile ? `${selectedFile.name} (${selectedFile.size})` : 'Belum ada file dipilih (PDF, Word, Excel, JPG/PNG)'}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">2. Keterangan Dokumen (Opsional)</label>
                  <input
                    type="text"
                    value={docNote}
                    onChange={e => setDocNote(e.target.value)}
                    placeholder="Contoh: SK Desa Budaya Lung Anai / Lampiran Profil BPS"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => { setShowUploadPanel(false); setSelectedFile(null); setDocNote(''); }}
                  className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile || savingDoc}
                  className="px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-800 disabled:bg-slate-300 text-white font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Save size={13} /> {savingDoc ? 'Menyimpan...' : 'Simpan Dokumen'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* UPLOADED FILES LIST */}
      {uploadedFiles.length > 0 && (
        <Card data-crud-form="true" className="border-indigo-200 bg-indigo-50/20">
          <CardHeader className="py-2.5">
            <CardTitle className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileText size={14} className="text-indigo-700" /> Dokumen Pendukung Tersimpan ({uploadedFiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 text-xs space-y-2">
            {uploadedFiles.map(file => (
              <div key={file.id} className="p-2.5 rounded-xl bg-white border border-indigo-100 flex items-center justify-between gap-3 flex-wrap shadow-sm">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                    <FileText size={15} className="text-indigo-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 truncate">{file.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {file.keterangan} · {file.size} · Disimpan {file.uploadedAt}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={deletingId === file.id}
                  onClick={() => setPendingDeleteDoc(file)}
                  className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold text-[11px] flex items-center gap-1 flex-shrink-0 disabled:opacity-50"
                >
                  <Trash2 size={12} /> Hapus
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* MODAL KONFIRMASI HAPUS DOKUMEN */}
      {pendingDeleteDoc && (
        <div
          data-crud-form="true"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0">
                  <Trash2 size={18} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Konfirmasi Hapus Dokumen</h3>
                  <p className="text-[11px] text-slate-500">Dokumen akan dihapus permanen dari database.</p>
                </div>
              </div>
              <button
                type="button"
                disabled={!!deletingId}
                onClick={() => setPendingDeleteDoc(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <p className="font-bold text-slate-800 break-all">{pendingDeleteDoc.name}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{pendingDeleteDoc.keterangan} · {pendingDeleteDoc.size}</p>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                disabled={!!deletingId}
                onClick={() => setPendingDeleteDoc(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={!!deletingId}
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 disabled:opacity-60"
              >
                <Trash2 size={13} /> {deletingId ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GRID KONTEN DETAIL PROFIL DESA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
        
        {/* IDENTITAS DESA */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-indigo-900 uppercase tracking-wider">1. Identitas Desa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-500">Nama Desa</label>
                {isEditing ? (
                  <input type="text" value={formData.namaDesa} onChange={e => setFormData({ ...formData, namaDesa: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                ) : (
                  <p className="font-semibold text-slate-800 text-[13px]">{formData.namaDesa}</p>
                )}
              </div>
              <div>
                <label className="font-bold text-slate-500">Kode Desa</label>
                {isEditing ? (
                  <input type="text" value={formData.kodeDesa} onChange={e => setFormData({ ...formData, kodeDesa: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                ) : (
                  <p className="font-semibold text-slate-800 font-mono">{formData.kodeDesa}</p>
                )}
              </div>
              <div>
                <label className="font-bold text-slate-500">Tahun Pembentukan</label>
                {isEditing ? (
                  <input type="text" value={formData.tahunBentuk} onChange={e => setFormData({ ...formData, tahunBentuk: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.tahunBentuk}</p>
                )}
              </div>
              <div>
                <label className="font-bold text-slate-500">Kode Pos</label>
                {isEditing ? (
                  <input type="text" value={formData.kodePos} onChange={e => setFormData({ ...formData, kodePos: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                ) : (
                  <p className="font-semibold text-slate-800 font-mono">{formData.kodePos}</p>
                )}
              </div>
            </div>
            <div>
              <label className="font-bold text-slate-500">Visi Desa</label>
              {isEditing ? (
                <textarea rows={2} value={formData.visi} onChange={e => setFormData({ ...formData, visi: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
              ) : (
                <p className="text-slate-700 italic">"{formData.visi}"</p>
              )}
            </div>
            <div>
              <label className="font-bold text-slate-500">Misi Desa</label>
              {isEditing ? (
                <textarea rows={3} value={formData.misi} onChange={e => setFormData({ ...formData, misi: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
              ) : (
                <div className="space-y-1 text-slate-700 whitespace-pre-line">{formData.misi}</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* WILAYAH DAN DUSUN */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-indigo-900 uppercase tracking-wider">2. Wilayah dan Dusun</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-500">Luas Wilayah (km²)</label>
                {isEditing ? (
                  <input type="text" value={formData.luasWilayah} onChange={e => setFormData({ ...formData, luasWilayah: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.luasWilayah} km²</p>
                )}
              </div>
              <div>
                <label className="font-bold text-slate-500">Jumlah Dusun</label>
                {isEditing ? (
                  <input type="text" value={formData.jumlahDusun} onChange={e => setFormData({ ...formData, jumlahDusun: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.jumlahDusun}</p>
                )}
              </div>
              <div>
                <label className="font-bold text-slate-500">Batas Utara</label>
                {isEditing ? (
                  <input type="text" value={formData.batasUtara} onChange={e => setFormData({ ...formData, batasUtara: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.batasUtara}</p>
                )}
              </div>
              <div>
                <label className="font-bold text-slate-500">Batas Selatan</label>
                {isEditing ? (
                  <input type="text" value={formData.batasSelatan} onChange={e => setFormData({ ...formData, batasSelatan: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.batasSelatan}</p>
                )}
              </div>
            </div>
            <div>
              <label className="font-bold text-slate-500">Rincian Rukun Tetangga (RT)</label>
              {isEditing ? (
                <input type="text" value={formData.jumlahRT} onChange={e => setFormData({ ...formData, jumlahRT: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
              ) : (
                <p className="font-semibold text-slate-800">{formData.jumlahRT}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* DATA PENDUDUK, KELEMBAGAAN & SARANA */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-indigo-900 uppercase tracking-wider">3 - 8. Statistik & Kelembagaan Desa</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-500">3. Jumlah Penduduk & Keluarga</label>
                {isEditing ? (
                  <div className="flex gap-2">
                    <input type="text" value={formData.jumlahPenduduk} onChange={e => setFormData({ ...formData, jumlahPenduduk: e.target.value })} placeholder="Jiwa" className="w-1/2 p-2 border rounded-lg" />
                    <input type="text" value={formData.jumlahKeluarga} onChange={e => setFormData({ ...formData, jumlahKeluarga: e.target.value })} placeholder="KK" className="w-1/2 p-2 border rounded-lg" />
                  </div>
                ) : (
                  <p className="font-semibold text-slate-800">{formData.jumlahPenduduk} Jiwa / {formData.jumlahKeluarga} KK ({formData.kepadatan})</p>
                )}
              </div>

              <div>
                <label className="font-bold text-slate-500">4. Kelembagaan Desa</label>
                {isEditing ? (
                  <input type="text" value={formData.lembagaPemerintah} onChange={e => setFormData({ ...formData, lembagaPemerintah: e.target.value })} className="w-full p-2 border rounded-lg" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.lembagaPemerintah}</p>
                )}
              </div>

              <div>
                <label className="font-bold text-slate-500">5. Sarana Kesehatan</label>
                {isEditing ? (
                  <input type="text" value={formData.saranaKesehatan} onChange={e => setFormData({ ...formData, saranaKesehatan: e.target.value })} className="w-full p-2 border rounded-lg" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.saranaKesehatan}</p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-500">6. Sarana Pendidikan</label>
                {isEditing ? (
                  <input type="text" value={formData.saranaPendidikan} onChange={e => setFormData({ ...formData, saranaPendidikan: e.target.value })} className="w-full p-2 border rounded-lg" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.saranaPendidikan}</p>
                )}
              </div>

              <div>
                <label className="font-bold text-slate-500">7. Infrastruktur Digital</label>
                {isEditing ? (
                  <input type="text" value={formData.infrastrukturDigital} onChange={e => setFormData({ ...formData, infrastrukturDigital: e.target.value })} className="w-full p-2 border rounded-lg" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.infrastrukturDigital}</p>
                )}
              </div>

              <div>
                <label className="font-bold text-slate-500">8. Lembaga Adat</label>
                {isEditing ? (
                  <input type="text" value={formData.lembagaAdat} onChange={e => setFormData({ ...formData, lembagaAdat: e.target.value })} className="w-full p-2 border rounded-lg" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.lembagaAdat}</p>
                )}
              </div>
            </div>

          </CardContent>
        </Card>

        {/* PROGRAM AKTIF & METADATA PEMBARUAN */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-indigo-900 uppercase tracking-wider">9 - 10. Program Aktif & Pembaruan Data</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label className="font-bold text-slate-500">9. Program Pembangunan Desa Aktif</label>
              {isEditing ? (
                <input type="text" value={formData.programAktif} onChange={e => setFormData({ ...formData, programAktif: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none" />
              ) : (
                <p className="font-semibold text-slate-800">{formData.programAktif}</p>
              )}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-dashed text-[11px] text-slate-500 space-y-1">
              <p className="font-bold text-slate-700 flex items-center gap-1"><RefreshCw size={12} className="animate-spin text-indigo-700" /> Sumber & Waktu Pembaruan Resmi:</p>
              <p>Sumber: <strong>{formData.sumberData}</strong></p>
              <p>Pembaruan Terakhir: <strong>{formData.waktuPembaruan}</strong></p>
            </div>

          </CardContent>
        </Card>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} /> Data profil terikat dengan Prodeskel & Kemendagri</span>
        <span>Terakhir Diperbarui: {formData.waktuPembaruan}</span>
      </div>
    </div>
  );
}