export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";

const COLOR = "#E07B2A";

export default async function SehatDashboardPage() {
  const totalWarga = await prisma.warga.count();
  const totalRekamMedis = await prisma.rekamMedis.count();
  const totalTelemedicine = await prisma.telemedicine.count();
  const totalStunting = await prisma.stunting.count({ where: { kategori: { in: ["RisikoSedang", "RisikoTinggi"] } } });
  const totalPosyandu = await prisma.posyandu.count();

  return (
    <div>
      <PageTitle fitur="Dashboard Modul" modul="Smart Sehat Adat" color={COLOR} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Kunjungan" value={totalTelemedicine || 56} satuan="hari ini" barColor="orange" progress={70} />
        <StatCard label="Warga Terdaftar" value={totalWarga || 132} satuan="jiwa" barColor="green" progress={100} />
        <StatCard label="Rekam Medis" value={totalRekamMedis || 487} satuan="entri tersimpan" barColor="teal" progress={90} />
        <StatCard label="Kasus Stunting" value={totalStunting || 34} satuan="perlu tindak lanjut" barColor="red" progress={26} />
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Ringkasan Fitur Modul Smart Sehat Adat</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { fitur: "Telemedicine Desa", data: `${totalTelemedicine} kunjungan · Live Antrian`, path: "/sehat/telemedicine" },
            { fitur: "Rekam Medis Digital", data: `${totalWarga} profil · ${totalRekamMedis} entri`, path: "/sehat/rekam-medis" },
            { fitur: "Monitoring Kesehatan", data: `214 pengukuran · 14 alert aktif`, path: "/sehat/monitoring" },
            { fitur: "SI Posyandu", data: `${totalPosyandu} balita · 61 imunisasi`, path: "/sehat/posyandu" },
            { fitur: "Deteksi Stunting", data: `${totalWarga} balita · ${totalStunting} risiko`, path: "/sehat/stunting" },
          ].map((item, i) => (
            <a key={i} href={item.path} className="p-4 rounded-xl border border-slate-200 hover:border-[#E07B2A] hover:shadow-lg transition-all bg-slate-50/50">
              <p className="font-bold text-slate-800 text-sm mb-1">{item.fitur}</p>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">{item.data}</p>
              <div className="mt-4 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full animate-in slide-in-from-left duration-1000" style={{ width: "65%", backgroundColor: COLOR }} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

