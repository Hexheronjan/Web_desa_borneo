"use client";

import { useState } from "react";
import { ModulPageTemplate } from "@/components/shared/ModulPageTemplate";
import { daftarKonsultasi, layaniPasien } from "@/actions/telemedicine";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/useUserRole";

const COLOR = "#E07B2A";
const MODUL = "Smart Sehat Adat";
const FITUR = "Telemedicine Desa";

export function TelemedicineClient({ initialData, stats, rwrts, batches, wargaId, wargaName }: any) {
  const { isWarga } = useUserRole();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keluhan, setKeluhan] = useState("");
  
  // Nakes State
  const [selectedPasien, setSelectedPasien] = useState<any>(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [rujukan, setRujukan] = useState("");

  const handleSubmitDaftar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wargaId) return alert("Error: Data warga tidak ditemukan.");
    setLoading(true);
    const res = await daftarKonsultasi(wargaId, keluhan);
    if (res.success) {
      alert("✅ Berhasil mendaftar konsultasi!");
      setIsModalOpen(false);
      setKeluhan("");
    } else alert("Error: " + res.error);
    setLoading(false);
  };

  const handleLayani = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await layaniPasien(selectedPasien.id, diagnosis, rujukan);
    if (res.success) {
      alert("✅ Diagnosis Pasien Berhasil Disimpan!");
      setSelectedPasien(null);
      setDiagnosis(""); setRujukan("");
    } else alert("Error: " + res.error);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute top-0 right-0 z-10 p-4">
        {isWarga && (
          <Button onClick={() => setIsModalOpen(true)} className="bg-[#E07B2A] hover:bg-[#c26721] text-white">
            + Daftar Konsultasi
          </Button>
        )}
      </div>

      <ModulPageTemplate
        fitur={FITUR}
        modul={MODUL}
        color={COLOR}
        panelKiri="Antrian/Jadwal"
        panelTengah={isWarga ? "Status Antrian Anda" : "Daftar Pasien Menunggu (56 Hari Ini)"}
        panelKanan="Status Kasus"
        stats={stats}
        batches={batches}
        rwrts={rwrts}
        customCenterPanel={
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="px-5 py-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-[#E07B2A]">
                {isWarga ? "Antrian Konsultasi Hari Ini" : "Daftar Pasien Hari Ini (Live DB)"}
              </h3>
            </div>
            
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {initialData.length === 0 ? (
                <p className="text-sm text-slate-500 text-center mt-4">Belum ada pasien mendaftar.</p>
              ) : (
                initialData.map((item: any) => {
                  const isOwnAntrian = item.wargaId === wargaId;
                  if (isWarga && !isOwnAntrian) {
                     return (
                      <div key={item.id} className="p-2 border border-slate-100 rounded-lg bg-slate-50 flex justify-between items-center opacity-70 text-xs">
                        <span className="font-medium text-slate-500">Antrian #{item.id.slice(-4)}</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 font-bold">Menunggu</span>
                      </div>
                     );
                  }

                  return (
                    <div key={item.id} className={`p-4 border rounded-xl text-sm flex justify-between items-center transition-all ${isOwnAntrian ? 'border-orange-300 bg-orange-50 shadow-sm' : 'border-slate-100 bg-white hover:shadow-md'}`}>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-slate-800">
                            {isWarga && isOwnAntrian ? `Antrian Anda (${wargaName})` : (item.warga?.nama || "Warga Baru")}
                          </p>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold tracking-tighter ${item.status === 'Antrian' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            {item.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-slate-600 text-xs italic">"{item.catatanKonsultasi}"</p>
                        {item.suratRujukan && (
                          <p className="text-[10px] text-blue-600 font-bold mt-2">📄 Rujukan: {item.suratRujukan}</p>
                        )}
                      </div>
                      {!isWarga && item.status === "Antrian" && (
                        <Button 
                          size="sm" 
                          className="bg-[#E07B2A] hover:bg-[#c26721] text-white"
                          onClick={() => setSelectedPasien(item)}
                        >
                          Layani
                        </Button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        }
      />
      
      {/* Modal Warga: Daftar */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-[#E07B2A] p-6 text-white text-center">
              <h2 className="font-bold text-xl">Daftar Konsultasi</h2>
              <p className="text-orange-100 text-xs">Jelaskan keluhan kesehatan Anda</p>
            </div>
            <form onSubmit={handleSubmitDaftar} className="p-6 space-y-4">
              <textarea 
                required value={keluhan} onChange={(e) => setKeluhan(e.target.value)}
                placeholder="Tulis keluhan Anda di sini..."
                className="w-full border rounded-xl p-3 text-sm h-32 focus:ring-2 focus:ring-[#E07B2A] outline-none"
              />
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button type="submit" disabled={loading} className="bg-[#E07B2A] text-white">Kirim Antrian</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Nakes: Diagnosis */}
      {selectedPasien && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-[#E07B2A] p-6 text-white">
              <h2 className="font-bold text-lg">Diagnosis: {selectedPasien.warga?.nama}</h2>
              <p className="text-orange-100 text-xs italic">"Keluhan: {selectedPasien.catatanKonsultasi}"</p>
            </div>
            <form onSubmit={handleLayani} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Catatan Diagnosis & Tindakan</label>
                <textarea 
                  required value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="Contoh: Pasien mengalami gejala flu ringan. Berikan Paracetamol 500mg..."
                  className="w-full border rounded-xl p-3 text-sm h-32 focus:ring-2 focus:ring-[#E07B2A] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Surat Rujukan (Opsional)</label>
                <input 
                  type="text" value={rujukan} onChange={(e) => setRujukan(e.target.value)}
                  placeholder="Contoh: Rujukan ke RSUD untuk cek lab darah"
                  className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#E07B2A] outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={() => setSelectedPasien(null)}>Batal</Button>
                <Button type="submit" disabled={loading} className="bg-[#E07B2A] text-white">Simpan & Selesaikan</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
