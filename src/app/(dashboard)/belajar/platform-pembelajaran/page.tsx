export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import PlatformClient from "./PlatformClient";

const COLOR = "#1E5FA5";


export default async function PlatformPembelajaranPage() {
  const [programs, moduls, certQueue, fasilitatorCount] = await Promise.all([
    prisma.kelas.findMany({
      where: { modul: "platform_pembelajaran" },
      orderBy: { createdAt: "desc" },
    }),
    prisma.materi.findMany({
        include: { kelas: true },
        take: 50
    }),
    prisma.pesertaKelas.findMany({
        where: { sertifikat: null },
        include: { warga: true, kelas: true },
        take: 20
    }),
    prisma.user.count({ where: { role: 'guru_fasilitator' } })
  ]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Platform Pembelajaran Digital Desa" modul="Smart Belajar Adat" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Program" value={programs.length} satuan="kelas terstruktur" barColor="blue" progress={55} />
        <StatCard label="Fasilitator" value={fasilitatorCount} satuan="aktif" barColor="green" progress={70} />
        <StatCard label="Modul" value={moduls.length} satuan="tersedia" barColor="teal" progress={80} />
        <StatCard label="Sertifikat" value={certQueue.length} satuan="antrian" barColor="orange" progress={50} />
      </div>

      <PlatformClient 
        initialPrograms={programs} 
        initialModuls={moduls} 
        initialSertifikatQueue={certQueue}
        stats={{}} 
        color={COLOR} 
      />
    </div>
  );
}

