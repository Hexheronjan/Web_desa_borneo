"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/useUserRole";
import { createMateri, createKelas } from "@/actions/belajar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GuruBelajarActionsProps {
  color: string;
  defaultKelasId?: string;
  modul?: string;
}

export default function GuruBelajarActions({ color, defaultKelasId, modul }: GuruBelajarActionsProps) {
  const { isGuru, isAdmin } = useUserRole();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    judul: "",
    tipe: "video",
    url: ""
  });

  if (!isGuru && !isAdmin) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    let targetKelasId = defaultKelasId;

    // Jika tidak ada kelasId, buat kelas default untuk modul ini
    if (!targetKelasId) {
        const newKelas = await createKelas({
            nama: "Kelas Default " + (modul || "E-Learning"),
            modul: modul || "e_learning",
            batch: "Batch A",
            waktu: "Flexible"
        });
        if (newKelas.success && newKelas.data) {
            targetKelasId = newKelas.data.id;
        } else {
            alert("Gagal membuat kelas penampung: " + (newKelas.error || "Unknown error"));
            setLoading(false);
            return;
        }
    }

    const res = await createMateri({
      kelasId: targetKelasId,
      judul: formData.judul,
      tipe: formData.tipe,
      url: formData.url || "#"
    });
    
    if (res.success) {
      alert("✅ Materi berhasil diunggah dan disimpan ke Database!");
      setOpen(false);
      setFormData({ judul: "", tipe: "video", url: "" });
      window.location.reload();
    } else {
      alert("Gagal mengunggah materi: " + res.error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            className="text-white font-bold shadow-md"
            style={{ backgroundColor: color }}
          >
            + Upload Materi Baru (Live DB)
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle style={{ color }}>📤 Upload Materi Pembelajaran</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="judul">Judul Materi</Label>
              <Input 
                id="judul" 
                placeholder="Contoh: Sejarah Suku Dayak" 
                required 
                value={formData.judul}
                onChange={(e) => setFormData({...formData, judul: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipe">Tipe Materi</Label>
              <Select 
                value={formData.tipe} 
                onValueChange={(v) => setFormData({...formData, tipe: v})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">▶ Video Pembelajaran</SelectItem>
                  <SelectItem value="pdf">📄 Dokumen PDF</SelectItem>
                  <SelectItem value="kuis">📝 Kuis Interaktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL Link Materi (YouTube/Drive)</Label>
              <Input 
                id="url" 
                placeholder="https://..." 
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full text-white font-bold" 
              style={{ backgroundColor: color }}
              disabled={loading}
            >
              {loading ? "⌛ Menyimpan ke Database..." : "Simpan Materi"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Button 
        variant="outline"
        style={{ borderColor: color, color: color }}
        onClick={() => alert("Fitur Kelola Batch segera hadir!")}
      >
        📅 Kelola Batch
      </Button>
      <Button 
        variant="outline"
        style={{ borderColor: color, color: color }}
        onClick={() => alert("Fitur Nilai Tugas segera hadir!")}
      >
        📝 Nilai Tugas
      </Button>
    </div>
  );
}
