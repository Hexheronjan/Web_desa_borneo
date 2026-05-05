"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createRekamMedisByNik } from "@/actions/sehat";

export function AdminRekamMedisActions({ color, data }: { color: string, data: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nik, setNik] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [alergi, setAlergi] = useState("");

  const handleExportExcel = () => {
    if (data.length === 0) return alert("Tidak ada data untuk diekspor.");
    
    // Header CSV
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Nama Pasien,NIK,Diagnosis,Tenaga Kesehatan,Alergi,Tanggal\n";
    
    // Baris Data
    data.forEach(rm => {
      const row = [
        rm.id,
        rm.warga?.nama || "-",
        rm.warga?.nik || "-",
        rm.diagnosis,
        rm.nakes,
        rm.alergi || "Tidak ada",
        new Date(rm.tanggal).toLocaleDateString("id-ID")
      ].join(",");
      csvContent += row + "\n";
    });
    
    // Trigger Download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "laporan_rekam_medis_borneo.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSimpan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await createRekamMedisByNik({ nik, diagnosis, alergi });

    if (res.success) {
      alert("✅ Data Rekam Medis berhasil disimpan ke Database!");
      setIsModalOpen(false);
      setNik("");
      setDiagnosis("");
      setAlergi("");
    } else {
      alert("Gagal: " + res.error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          style={{ backgroundColor: color }}
          onClick={() => setIsModalOpen(true)}
        >
          + Profil Medis Baru
        </Button>
        <Button 
          variant="outline" 
          style={{ color: color, borderColor: color }}
          onClick={() => window.print()}
        >
          🖨️ Cetak Ringkasan (PDF)
        </Button>
        <Button 
          variant="outline" 
          style={{ color: "#166534", borderColor: "#166534" }}
          onClick={handleExportExcel}
        >
          📊 Ekspor Excel
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#E07B2A] px-6 py-4">
              <h2 className="text-white font-bold text-lg">Input Rekam Medis Baru</h2>
              <p className="text-orange-100 text-sm opacity-90">Formulir Admin Puskesmas</p>
            </div>

            <form onSubmit={handleSimpan} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">NIK Warga</label>
                  <input
                    type="text"
                    required
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    placeholder="Contoh: 1234567890123456"
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Diagnosis</label>
                  <input
                    type="text"
                    required
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="Contoh: Demam Berdarah"
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Alergi (Opsional)</label>
                  <input
                    type="text"
                    value={alergi}
                    onChange={(e) => setAlergi(e.target.value)}
                    placeholder="Contoh: Antibiotik"
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button type="submit" disabled={isLoading} className="bg-[#E07B2A] hover:bg-[#c26721] text-white">
                  {isLoading ? "Menyimpan..." : "Simpan Data"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
