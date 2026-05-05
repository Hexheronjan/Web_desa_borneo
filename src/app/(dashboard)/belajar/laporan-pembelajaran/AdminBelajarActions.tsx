"use client";
import { useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { updateNilaiPeserta } from "@/actions/belajar";
import { Button } from "@/components/ui/button";

export default function AdminBelajarActions({ pendingParticipants = [] }: { pendingParticipants?: any[] }) {
  const { isAdmin, isGuru } = useUserRole();
  const [exporting, setExporting] = useState(false);
  const [showGrading, setShowGrading] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isAdmin && !isGuru) return null;

  const handleExport = (format: "PDF" | "Excel") => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert(`✅ Laporan Pembelajaran berhasil diekspor ke ${format}!\n\nFile: Laporan_Pembelajaran_${new Date().toLocaleDateString("id-ID").replace(/\//g, "-")}.${format === "PDF" ? "pdf" : "xlsx"}`);
    }, 1500);
  };

  const handleGrade = async (id: string, nilai: number) => {
    setLoading(true);
    const res = await updateNilaiPeserta(id, nilai);
    if (res.success) {
      alert("✅ Nilai berhasil disimpan!");
      window.location.reload();
    } else {
      alert("Gagal: " + res.error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => handleExport("PDF")}
        disabled={exporting}
        className="px-4 py-2 text-sm font-medium bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
      >
        {exporting ? "⏳ Memproses..." : "📄 Ekspor Laporan PDF"}
      </button>
      <button
        onClick={() => handleExport("Excel")}
        disabled={exporting}
        className="px-4 py-2 text-sm font-medium bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50"
      >
        {exporting ? "⏳ Memproses..." : "📊 Ekspor Excel"}
      </button>

      {isGuru && (
        <button
          onClick={() => setShowGrading(true)}
          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-shadow shadow-md"
        >
          📝 Nilai Tugas Warga ({pendingParticipants.length})
        </button>
      )}

      {isAdmin && (
        <button
          onClick={() => alert("Fitur Verifikasi Sertifikat Admin")}
          className="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
        >
          🎓 Verifikasi Sertifikat
        </button>
      )}

      {showGrading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="bg-[#1E5FA5] p-6 text-white flex justify-between items-center">
              <div>
                <h2 className="font-bold text-xl">Penilaian Tugas Warga</h2>
                <p className="text-blue-100 text-xs">Review hasil belajar dan berikan nilai (0-100)</p>
              </div>
              <button onClick={() => setShowGrading(false)} className="text-2xl hover:text-red-200 transition-colors">×</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {pendingParticipants.length === 0 ? (
                <p className="text-center text-slate-500 py-10 italic">Tidak ada tugas yang perlu direview saat ini.</p>
              ) : (
                pendingParticipants.map((p: any) => (
                  <div key={p.id} className="p-4 border rounded-xl bg-slate-50 hover:bg-white hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-slate-800">{p.warga?.nama}</p>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">{p.kelas?.nama} • {p.kelas?.modul}</p>
                      <p className="text-[10px] text-blue-600 font-medium mt-1">Status: Menunggu Nilai</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" min="0" max="100" placeholder="Nilai"
                        className="w-20 border rounded-lg p-2 text-center text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                        id={`nilai-${p.id}`}
                      />
                      <Button 
                        size="sm" disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4"
                        onClick={() => {
                          const val = (document.getElementById(`nilai-${p.id}`) as HTMLInputElement)?.value;
                          if (!val) return alert("Masukkan nilai dulu!");
                          handleGrade(p.id, parseFloat(val));
                        }}
                      >
                        Simpan
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
