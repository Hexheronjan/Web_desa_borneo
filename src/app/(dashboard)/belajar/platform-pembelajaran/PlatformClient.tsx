"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActionButton } from "@/components/shared/ActionButton";
import { createKelas, deleteKelas, issueSertifikat, createMateri, deleteMateri } from "@/actions/belajar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PlatformClientProps {
  initialPrograms: any[];
  initialModuls: any[];
  initialSertifikatQueue: any[];
  stats: any;
  color: string;
}

export default function PlatformClient({ initialPrograms, initialModuls, initialSertifikatQueue, stats, color }: PlatformClientProps) {
  const [activeTab, setActiveTab] = useState<"program" | "modul" | "sertifikat">("program");
  const [loading, setLoading] = useState(false);
  const [addModulOpen, setAddModulOpen] = useState(false);
  const [selectedKelasId, setSelectedKelasId] = useState("");
  const [modulJudul, setModulJudul] = useState("");

  const handleCreateProgram = async () => {
    setLoading(true);
    const res = await createKelas({
      nama: "Program Terstruktur #" + (initialPrograms.length + 1),
      modul: "platform_pembelajaran",
      batch: "Batch Baru",
      waktu: "09:00 - 11:00"
    });
    if (res.success) {
      alert("✅ Program Baru berhasil dibuat di Database!");
      window.location.reload();
    } else {
      alert("Gagal membuat program: " + res.error);
    }
    setLoading(false);
  };

  const handleAddModulSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createMateri({
        kelasId: selectedKelasId,
        judul: modulJudul,
        tipe: "pdf",
        url: "#"
    });
    if (res.success) {
        alert("✅ Modul baru berhasil ditambahkan ke program!");
        setAddModulOpen(false);
        setModulJudul("");
        window.location.reload();
    } else {
        alert("Gagal menambah modul: " + res.error);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Guru Management Actions */}
      <div className="flex flex-wrap gap-3">
        <Button 
            onClick={handleCreateProgram} 
            disabled={loading}
            style={{ backgroundColor: color }}
            className="font-bold shadow-lg"
        >
            {loading ? "⌛ Memproses..." : "+ Buat Program Baru (Live DB)"}
        </Button>
        <Button variant="outline" onClick={() => setActiveTab("modul")} style={{ color: color, borderColor: color }}>🗂 Kelola Modul ({initialModuls.length})</Button>
        <Button variant="outline" onClick={() => setActiveTab("sertifikat")} style={{ color: color, borderColor: color }}>🎓 Terbitkan Sertifikat ({initialSertifikatQueue.length})</Button>
      </div>

      {/* Modal Tambah Modul */}
      <Dialog open={addModulOpen} onOpenChange={setAddModulOpen}>
        <DialogContent>
            <DialogHeader><DialogTitle>Tambah Modul Pembelajaran</DialogTitle></DialogHeader>
            <form onSubmit={handleAddModulSubmit} className="space-y-4 py-2">
                <div className="space-y-2">
                    <Label>Judul Modul/Materi</Label>
                    <Input required value={modulJudul} onChange={(e) => setModulJudul(e.target.value)} placeholder="Masukkan judul modul..." />
                </div>
                <Button type="submit" disabled={loading} className="w-full" style={{ backgroundColor: color }}>
                    {loading ? "Menyimpan..." : "Simpan ke Program"}
                </Button>
            </form>
        </DialogContent>
      </Dialog>

      <div className="flex gap-2 border-b border-slate-200">
        {(["program", "modul", "sertifikat"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 ${activeTab === tab ? "border-[#1E5FA5] text-[#1E5FA5]" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            {tab === "program" ? "📁 Program" : tab === "modul" ? "📚 Modul" : "🎓 Sertifikat"}
          </button>
        ))}
      </div>

      <Card className="shadow-md border-slate-100">
        <CardHeader className="bg-slate-50/50">
          <CardTitle className="text-sm font-semibold capitalize flex items-center justify-between" style={{ color: color }}>
            <span>Manajemen {activeTab} Pembelajaran (Live DB)</span>
            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">PROTOTYPE AKTIF</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {activeTab === "program" && (
            <div className="space-y-4">
              {initialPrograms.length === 0 ? (
                  <div className="text-center py-10">
                      <p className="text-slate-400 italic">Belum ada program terstruktur.</p>
                      <Button onClick={handleCreateProgram} variant="link" style={{ color }}>+ Klik untuk membuat program pertama</Button>
                  </div>
              ) : initialPrograms.map(p => (
                <div key={p.id} className="p-4 border rounded-xl flex justify-between items-center bg-white shadow-sm hover:shadow-md transition-all">
                  <div>
                    <p className="font-bold text-slate-800 text-base">{p.nama}</p>
                    <p className="text-xs text-slate-500 font-medium">Batch: {p.batch} • Jadwal: {p.waktu}</p>
                    <div className="flex gap-2 mt-2">
                        <button 
                            onClick={() => { setSelectedKelasId(p.id); setAddModulOpen(true); }} 
                            className="text-[10px] text-blue-600 hover:underline font-bold"
                        >
                            + Tambah Modul
                        </button>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider">{p.status}</span>
                    <ActionButton 
                        label="Hapus" 
                        action={deleteKelas} 
                        id={p.id} 
                        variant="ghost" 
                        className="text-red-400 hover:text-red-600 h-8 w-8 p-0" 
                        successMessage="Program berhasil dihapus."
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === "modul" && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 mb-4 bg-yellow-50 p-2 rounded border border-yellow-100">
                💡 Guru dapat mengunggah materi spesifik ke dalam program untuk membentuk kurikulum terpadu.
              </p>
              {initialModuls.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-6">Belum ada modul materi dalam program mana pun.</p>
              ) : initialModuls.map(m => (
                <div key={m.id} className="p-3 border rounded-lg flex justify-between items-center hover:bg-slate-50">
                    <div>
                        <p className="text-sm font-bold text-slate-700">{m.judul}</p>
                        <p className="text-[10px] text-slate-400">Tipe: {m.tipe.toUpperCase()} • Masuk dalam: <span className="text-blue-600">{m.kelas.nama}</span></p>
                    </div>
                    <ActionButton 
                        label="🗑️" 
                        action={deleteMateri} 
                        id={m.id} 
                        variant="ghost"
                        className="text-red-300 hover:text-red-600"
                        successMessage="Modul berhasil dihapus."
                    />
                </div>
              ))}
            </div>
          )}

          {activeTab === "sertifikat" && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 mb-4 bg-blue-50 p-2 rounded border border-blue-100">
                🎓 Terbitkan sertifikat untuk warga yang telah menyelesaikan kuis dan tugas di setiap program.
              </p>
              {initialSertifikatQueue.length === 0 ? (
                  <div className="text-center py-10 text-slate-400">
                      <p className="text-4xl mb-2">🏅</p>
                      <p className="text-sm font-semibold">Tidak ada antrian sertifikat.</p>
                      <p className="text-xs">Sertifikat akan muncul di sini jika ada warga yang lulus program.</p>
                  </div>
              ) : initialSertifikatQueue.map(pk => (
                <div key={pk.id} className="p-4 border rounded-xl flex justify-between items-center bg-blue-50/50 border-blue-100">
                  <div>
                    <p className="font-bold text-slate-800">{pk.warga.nama}</p>
                    <p className="text-xs text-slate-500 font-medium">Lulus Program: <span className="text-blue-700">{pk.kelas.nama}</span></p>
                  </div>
                  <ActionButton 
                    label="✓ Terbitkan Sertifikat" 
                    action={issueSertifikat} 
                    id={pk.id} 
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                    successMessage={`Sertifikat Digital untuk ${pk.warga.nama} telah diterbitkan dan dapat diunduh oleh warga!`}
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
