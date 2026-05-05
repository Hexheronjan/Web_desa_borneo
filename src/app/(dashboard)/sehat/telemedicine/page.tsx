import { buildBatches, defaultRwRt } from "@/components/shared/ModulPageTemplate";
import prisma from "@/lib/prisma";
import { TelemedicineClient } from "./TelemedicineClient";
import { auth } from "@/auth";

export default async function TelemedicinePage() {
  const session = await auth();
  const wargaId = (session?.user as any)?.wargaId;
  const wargaName = session?.user?.name || "Warga";

  // Ambil data live dari Prisma
  const dataPasien = await prisma.telemedicine.findMany({
    include: { warga: true },
    orderBy: { waktu: "desc" },
    take: 10,
  });

  const totalKunjungan = await prisma.telemedicine.count();
  const antrian = await prisma.telemedicine.count({ where: { status: "Antrian" } });

  const stats: any = [
    { label: "Kunjungan", value: totalKunjungan, satuan: "total", barColor: "orange", progress: 100 },
    { label: "Nakes", value: 5, satuan: "online", barColor: "green", progress: 100 },
    { label: "Rujukan", value: 18, satuan: "diterbitkan", barColor: "teal", progress: 45 },
    { label: "Antrian", value: antrian, satuan: "menunggu", barColor: "red", progress: antrian > 0 ? 50 : 0 },
  ];

  return (
    <TelemedicineClient 
      initialData={dataPasien} 
      stats={stats} 
      batches={buildBatches("Telemedicine Desa")} 
      rwrts={defaultRwRt} 
      wargaId={wargaId}
      wargaName={wargaName}
    />
  );
}

