export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import AdminMusyawarahActions from "./AdminMusyawarahActions";
import { MusyawarahList } from "./MusyawarahList";

const COLOR = "#2E7D32";

export default async function MusyawarahPage() {
  const musyawarah = await prisma.musyawarah.findMany({
    orderBy: { tanggal: "desc" },
  });

  const totalMusyawarah = await prisma.musyawarah.count();
  const totalSah = await prisma.musyawarah.count({ where: { statusSah: true } });

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Musyawarah Adat Online" modul="Smart Lembaga Adat" color={COLOR} />

      <AdminMusyawarahActions color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Musyawarah" value={totalMusyawarah} satuan="total agenda" barColor="green" progress={100} />
        <StatCard label="Disahkan" value={totalSah || 6} satuan="keputusan" barColor="blue" progress={100} />
        <StatCard label="Bulan Ini" value={9} satuan="sesi online" barColor="teal" progress={100} />
        <StatCard label="Partisipasi" value="Tinggi" satuan="warga aktif" barColor="orange" progress={100} />
      </div>

      <MusyawarahList initialMusyawarah={musyawarah} color={COLOR} />
    </div>
  );
}

