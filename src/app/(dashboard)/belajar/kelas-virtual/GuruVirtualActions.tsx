"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createKelas } from "@/actions/belajar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GuruVirtualActions({ color }: { color: string }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    batch: "Gelombang 1",
    waktu: "Sabtu, 09:00 - 11:00"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await createKelas({
      nama: formData.nama,
      modul: "kelas_virtual",
      batch: formData.batch,
      waktu: formData.waktu,
    });

    if (res.success) {
      alert("✅ Kelas Virtual berhasil dijadwalkan!");
      setOpen(false);
      window.location.reload();
    } else {
      alert("Gagal: " + res.error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button style={{ backgroundColor: color }} className="text-white font-bold shadow-md">
            + Buat Kelas Live
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle style={{ color }}>🎥 Jadwalkan Kelas Virtual Baru</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nama Kelas / Topik</Label>
              <Input 
                placeholder="Contoh: Sosialisasi Hukum Adat" 
                required 
                value={formData.nama}
                onChange={(e) => setFormData({...formData, nama: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Batch / Kelompok</Label>
              <Input 
                placeholder="Gelombang 1" 
                value={formData.batch}
                onChange={(e) => setFormData({...formData, batch: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Waktu Pelaksanaan</Label>
              <Input 
                placeholder="Sabtu, 09:00 - 11:00" 
                value={formData.waktu}
                onChange={(e) => setFormData({...formData, waktu: e.target.value})}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full text-white font-bold" 
              style={{ backgroundColor: color }}
              disabled={loading}
            >
              {loading ? "⌛ Menjadwalkan..." : "Jadwalkan Sekarang"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Button variant="outline" style={{ color: color, borderColor: color }} onClick={() => alert("Fitur Kelola Rekaman segera hadir!")}>
        📹 Kelola Rekaman
      </Button>
      <Button variant="outline" style={{ color: color, borderColor: color }} onClick={() => alert("Fitur Moderasi Forum segera hadir!")}>
        💬 Moderasi Forum
      </Button>
    </div>
  );
}
