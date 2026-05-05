import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";

const COLOR = "#2E7D32";

export default function AdatDashboardPage() {
  return (
    <div>
      <PageTitle fitur="Dashboard Modul" modul="Smart Lembaga Adat" color={COLOR} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Pengurus" value={17} satuan="aktif di lembaga" barColor="green" progress={85} />
        <StatCard label="Arsip Digital" value={1248} satuan="dokumen tersimpan" barColor="teal" progress={95} />
        <StatCard label="Peta Wilayah" value={12} satuan="layer aktif" barColor="blue" progress={70} />
        <StatCard label="Kasus Hukum" value={14} satuan="dalam proses" barColor="orange" progress={45} />
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-800 mb-4">Ringkasan Fitur Modul Smart Lembaga Adat</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { fitur: "Sistem Informasi Kelembagaan Adat", data: "17 pengurus · 12 program", path: "/adat/kelembagaan" },
            { fitur: "Arsip Digital Adat & Budaya", data: "1248 arsip · 9 kategori", path: "/adat/arsip" },
            { fitur: "Musyawarah Adat Online", data: "9 jadwal · 146 peserta", path: "/adat/musyawarah" },
            { fitur: "Digital Mapping Wilayah Adat", data: "12 layer · 84 titik", path: "/adat/mapping" },
            { fitur: "Portal Hukum Adat & Resolusi Konflik", data: "48 aturan · 14 kasus", path: "/adat/hukum-adat" },
          ].map((item, i) => (
            <a key={i} href={item.path} className="p-4 rounded-lg border border-slate-200 hover:border-[#2E7D32] hover:shadow-md transition-all">
              <p className="font-semibold text-slate-800 text-sm mb-2">{item.fitur}</p>
              <p className="text-xs text-slate-500">{item.data}</p>
              <div className="mt-3 h-1.5 bg-slate-100 rounded-full">
                <div className="h-full rounded-full" style={{ width: "65%", backgroundColor: COLOR }} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
