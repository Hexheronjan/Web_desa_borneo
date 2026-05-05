export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import AdminArsipActions from "./AdminArsipActions";
import { ArsipList } from "./ArsipList";

const COLOR = "#2E7D32";

export default async function ArsipPage() {
  const arsip = await prisma.arsipAdat.findMany({
    orderBy: { createdAt: "desc" },
  });

  const totalArsip = await prisma.arsipAdat.count();
  const waitingReview = await prisma.arsipAdat.count({ where: { statusReview: "Review" } });

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Arsip Digital Adat & Budaya" modul="Smart Lembaga Adat" color={COLOR} />

      <AdminArsipActions color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Arsip" value={totalArsip} satuan="media" barColor="green" progress={100} />
        <StatCard label="Menunggu Review" value={waitingReview || 17} satuan="dokumen" barColor="orange" progress={100} />
        <StatCard label="Kategori Aktif" value={9} satuan="bidang" barColor="blue" progress={100} />
        <StatCard label="Sinkronisasi" value="Otomatis" satuan="Satu Data" barColor="teal" progress={100} />
      </div>

      <ArsipList initialArsip={arsip} color={COLOR} />
    </div>
  );
}
