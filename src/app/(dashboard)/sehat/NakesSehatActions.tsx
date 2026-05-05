"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/useUserRole";
import { createMonitoringByNik, broadcastKesehatanAlert, createShiftNakes } from "@/actions/sehat";

export default function NakesSehatActions({ color }: { color: string }) {
  const { isNakes, isAdmin } = useUserRole();
  const [loading, setLoading] = useState(false);
  const [activeModal, setActiveModal] = useState<"monitoring" | "alert" | "shift" | null>(null);
  
  // Monitoring State
  const [nik, setNik] = useState("");
  const [bb, setBb] = useState("");
  const [tb, setTb] = useState("");
  const [sistolik, setSistolik] = useState("");
  const [diastolik, setDiastolik] = useState("");

  // Alert State
  const [alertJudul, setAlertJudul] = useState("Peringatan Kesehatan Desa");
  const [alertPesan, setAlertPesan] = useState("");

  // Shift State
  const [namaNakes, setNamaNakes] = useState("");
  const [hari, setHari] = useState("Senin");
  const [mulai, setMulai] = useState("08:00");
  const [selesai, setSelesai] = useState("14:00");

  if (!isNakes && !isAdmin) return null;

  const handleMonitoringSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createMonitoringByNik({
      nik,
      beratBadan: bb ? parseFloat(bb) : undefined,
      tinggiBadan: tb ? parseFloat(tb) : undefined,
      tensiSistolik: sistolik ? parseInt(sistolik) : undefined,
      tensiDiastolik: diastolik ? parseInt(diastolik) : undefined,
    });
    if (res.success) {
      alert("✅ Data Pemeriksaan berhasil disimpan!");
      setActiveModal(null);
    } else alert("Gagal: " + res.error);
    setLoading(false);
  };

  const handleAlertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await broadcastKesehatanAlert(alertJudul, alertPesan);
    if (res.success) {
      alert(`✅ Berhasil mengirim alert ke ${res.count} warga!`);
      setActiveModal(null);
    } else alert("Gagal: " + res.error);
    setLoading(false);
  };

  const handleShiftSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createShiftNakes({ nama: namaNakes, hari, mulai, selesai });
    if (res.success) {
      alert(`✅ Jadwal shift ${namaNakes} berhasil disimpan!`);
      setActiveModal(null);
    } else alert("Gagal: " + res.error);
    setLoading(false);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <Button 
        onClick={() => setActiveModal("monitoring")}
        className="text-white font-bold"
        style={{ backgroundColor: color }}
      >
        + Input Data Kesehatan (Live DB)
      </Button>

      <Button 
        variant="outline"
        onClick={() => setActiveModal("alert")}
        style={{ borderColor: "#ef4444", color: "#ef4444" }}
      >
        🔔 Kirim Alert
      </Button>

      {isAdmin && (
        <Button 
          variant="outline"
          onClick={() => setActiveModal("shift")}
          style={{ borderColor: color, color: color }}
        >
          📅 Atur Shift Nakes
        </Button>
      )}

      {/* MODAL MONITORING */}
      {activeModal === "monitoring" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden">
            <div className="bg-[#E07B2A] px-6 py-4 text-white">
              <h2 className="font-bold text-lg">Input Pemeriksaan Kesehatan</h2>
            </div>
            <form onSubmit={handleMonitoringSubmit} className="p-6 space-y-4">
              <input type="text" required value={nik} onChange={(e) => setNik(e.target.value)} placeholder="NIK Warga" className="w-full border rounded-lg p-2.5 text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" step="0.1" value={bb} onChange={(e) => setBb(e.target.value)} placeholder="BB (kg)" className="w-full border rounded-lg p-2.5 text-sm" />
                <input type="number" step="0.1" value={tb} onChange={(e) => setTb(e.target.value)} placeholder="TB (cm)" className="w-full border rounded-lg p-2.5 text-sm" />
              </div>
              <div className="flex gap-2">
                <input type="number" value={sistolik} onChange={(e) => setSistolik(e.target.value)} placeholder="Sistolik" className="w-full border rounded-lg p-2.5 text-sm" />
                <input type="number" value={diastolik} onChange={(e) => setDiastolik(e.target.value)} placeholder="Diastolik" className="w-full border rounded-lg p-2.5 text-sm" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={() => setActiveModal(null)}>Batal</Button>
                <Button type="submit" disabled={loading} style={{ backgroundColor: color, color: 'white' }}>Simpan</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ALERT */}
      {activeModal === "alert" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden">
            <div className="bg-red-600 px-6 py-4 text-white">
              <h2 className="font-bold text-lg">Broadcast Alert Kesehatan</h2>
            </div>
            <form onSubmit={handleAlertSubmit} className="p-6 space-y-4">
              <input type="text" required value={alertJudul} onChange={(e) => setAlertJudul(e.target.value)} placeholder="Judul Peringatan" className="w-full border rounded-lg p-2.5 text-sm font-bold" />
              <textarea required value={alertPesan} onChange={(e) => setAlertPesan(e.target.value)} placeholder="Pesan untuk seluruh warga..." className="w-full border rounded-lg p-2.5 text-sm h-32" />
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={() => setActiveModal(null)}>Batal</Button>
                <Button type="submit" disabled={loading} className="bg-red-600 text-white">Kirim Sekarang</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL SHIFT */}
      {activeModal === "shift" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden">
            <div className="bg-blue-600 px-6 py-4 text-white">
              <h2 className="font-bold text-lg">Atur Jadwal Shift Nakes</h2>
            </div>
            <form onSubmit={handleShiftSubmit} className="p-6 space-y-4">
              <input type="text" required value={namaNakes} onChange={(e) => setNamaNakes(e.target.value)} placeholder="Nama Nakes/Bidan" className="w-full border rounded-lg p-2.5 text-sm" />
              <select value={hari} onChange={(e) => setHari(e.target.value)} className="w-full border rounded-lg p-2.5 text-sm">
                <option>Senin</option><option>Selasa</option><option>Rabu</option><option>Kamis</option><option>Jumat</option><option>Sabtu</option><option>Minggu</option>
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input type="time" value={mulai} onChange={(e) => setMulai(e.target.value)} className="w-full border rounded-lg p-2.5 text-sm" />
                <input type="time" value={selesai} onChange={(e) => setSelesai(e.target.value)} className="w-full border rounded-lg p-2.5 text-sm" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={() => setActiveModal(null)}>Batal</Button>
                <Button type="submit" disabled={loading} className="bg-blue-600 text-white">Simpan Jadwal</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
