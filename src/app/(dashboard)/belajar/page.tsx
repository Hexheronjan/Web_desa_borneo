import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";

const COLOR = "#1E5FA5";

export default function BelajarDashboardPage() {
  return (
    <div>
      <PageTitle fitur="Dashboard Modul" modul="Smart Belajar Adat" color={COLOR} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Kelas" value={47} satuan="semua batch" barColor="blue" progress={70} />
        <StatCard label="Total Peserta" value={658} satuan="warga terdaftar" barColor="green" progress={85} />
        <StatCard label="Total Materi" value={232} satuan="video/pdf/kuis" barColor="teal" progress={60} />
        <StatCard label="Sertifikat" value={55} satuan="terbit" barColor="orange" progress={45} />
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-800 mb-4">Ringkasan Fitur Modul Smart Belajar Adat</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { fitur: "E-Learning Budaya Lokal", kelas: 12, peserta: 268, path: "/belajar/e-learning" },
            { fitur: "Platform Pembelajaran Digital Desa", kelas: 8, peserta: 156, path: "/belajar/platform-pembelajaran" },
            { fitur: "Pusat Literasi Digital Desa", kelas: 6, peserta: 94, path: "/belajar/pusat-literasi" },
            { fitur: "Program Pelatihan Guru Digital", kelas: 4, peserta: 28, path: "/belajar/pelatihan-guru" },
            { fitur: "Kelas Virtual Komunitas", kelas: 15, peserta: 112, path: "/belajar/kelas-virtual" },
          ].map((item, i) => (
            <a key={i} href={item.path} className="p-4 rounded-lg border border-slate-200 hover:border-[#1E5FA5] hover:shadow-md transition-all">
              <p className="font-semibold text-slate-800 text-sm mb-2">{item.fitur}</p>
              <p className="text-xs text-slate-500">{item.kelas} kelas · {item.peserta} peserta</p>
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
