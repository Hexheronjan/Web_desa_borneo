export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import AdminKelembagaanActions from "./AdminAdatActions";
import { KelembagaanTabs } from "./KelembagaanTabs";

const COLOR = "#2E7D32";

export default async function KelembagaanPage() {
  const pengurus = await prisma.pengurus.findMany({
    orderBy: { createdAt: "desc" },
  });

  const totalPengurus = await prisma.pengurus.count();

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="SI Kelembagaan Adat" modul="Smart Lembaga Adat" color={COLOR} />

      <AdminKelembagaanActions color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pengurus" value={totalPengurus || 17} satuan="aktif" barColor="green" progress={100} />
        <StatCard label="Bidang" value={5} satuan="struktur" barColor="blue" progress={100} />
        <StatCard label="Program" value={12} satuan="berjalan" barColor="teal" progress={75} />
        <StatCard label="Dokumen" value={9} satuan="diverifikasi" barColor="orange" progress={45} />
      </div>

      <KelembagaanTabs initialPengurus={pengurus} color={COLOR} />
    </div>
  );
}

