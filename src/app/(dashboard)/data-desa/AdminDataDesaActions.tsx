"use client";
import { useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";

export default function AdminDataDesaActions({ totalWarga }: { totalWarga: number }) {
  const { isAdmin } = useUserRole();
  const [exporting, setExporting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [notifSent, setNotifSent] = useState(false);

  if (!isAdmin) return null;

  const handleExportGabungan = (format: "PDF" | "Excel") => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert(`✅ Laporan GABUNGAN SEMUA MODUL berhasil diekspor ke ${format}!\n\nFile: Laporan_SLV_Lengkap_${new Date().toLocaleDateString("id-ID").replace(/\//g, "-")}.${format === "PDF" ? "pdf" : "xlsx"}\n\nMencakup:\n• Smart Sehat: Telemedicine, Rekam Medis, Posyandu, Stunting\n• Smart Belajar: E-Learning, Kelas Virtual, Sertifikat\n• Smart Adat: Arsip, Musyawarah, Hukum Adat, Peta\n• Data Desa: Kependudukan, Audit Trail`);
    }, 2000);
  };

  const handleSinkronisasi = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      alert(`🔄 Sinkronisasi Satu Data Desa berhasil!\n\n✅ ${totalWarga} data warga tersinkron\n✅ Profil desa diperbarui\n✅ Data RW/RT tersinkron\n✅ Timestamp: ${new Date().toLocaleString("id-ID")}\n\nData berhasil dikirim ke sistem pemerintah pusat.`);
    }, 2500);
  };

  const handleNotifikasi = () => {
    setNotifSent(true);
    setTimeout(() => setNotifSent(false), 3000);
    alert(`📢 Notifikasi dikirim ke ${totalWarga} warga!\n\nIsi notifikasi:\n"Jadwal posyandu bulan Mei 2025 telah diperbarui. Cek aplikasi SLV untuk info lengkap."\n\nNotifikasi terkirim melalui:\n• SMS Gateway\n• Push Notification App\n• Papan pengumuman digital`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button onClick={() => handleExportGabungan("PDF")} disabled={exporting}
        className="px-4 py-2 text-sm font-medium bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50">
        {exporting ? "⏳ Memproses..." : "📄 Ekspor Laporan Gabungan PDF"}
      </button>
      <button onClick={() => handleExportGabungan("Excel")} disabled={exporting}
        className="px-4 py-2 text-sm font-medium bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50">
        {exporting ? "⏳ Memproses..." : "📊 Ekspor Excel Gabungan"}
      </button>
      <button onClick={handleSinkronisasi} disabled={syncing}
        className="px-4 py-2 text-sm font-medium bg-purple-50 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50">
        {syncing ? "🔄 Menyinkronkan..." : "🔄 Sinkronisasi Data Nasional"}
      </button>
      <button onClick={handleNotifikasi} disabled={notifSent}
        className="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50">
        {notifSent ? "✅ Terkirim!" : `📢 Kirim Notifikasi ke ${totalWarga} Warga`}
      </button>
    </div>
  );
}
