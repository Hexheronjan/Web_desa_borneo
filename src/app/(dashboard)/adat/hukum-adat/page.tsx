export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import AdminHukumActions from "./AdminHukumActions";
import AdminMappingActions from "./AdminMappingActions";
import { HukumList } from "./HukumList";

const COLOR = "#2E7D32";

export default async function HukumAdatPage() {
  const hukumAdat = await prisma.hukumAdat.findMany({
    orderBy: { createdAt: "desc" },
  });

  const wilayah = await prisma.wilayahAdat.findMany({
    orderBy: { createdAt: "desc" },
  });

  const totalRules = await prisma.hukumAdat.count({ where: { tipe: "Aturan" } });
  const totalBatas = await prisma.wilayahAdat.count();

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Portal Hukum Adat & Konflik" modul="Smart Lembaga Adat" color={COLOR} />

      <div className="flex items-center gap-3">
        <AdminHukumActions color={COLOR} />
        <AdminMappingActions color={COLOR} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Aturan Adat" value={totalRules || 48} satuan="disahkan" barColor="green" progress={100} />
        <StatCard label="Titik Batas" value={totalBatas || 84} satuan="tercatat" barColor="blue" progress={100} />
        <StatCard label="Sengketa Wilayah" value={3} satuan="aktif" barColor="red" progress={100} />
        <StatCard label="Putusan Sidang" value={12} satuan="keputusan" barColor="orange" progress={100} />
      </div>

      <HukumList initialHukum={hukumAdat} initialWilayah={wilayah} color={COLOR} />
    </div>
  );
}

