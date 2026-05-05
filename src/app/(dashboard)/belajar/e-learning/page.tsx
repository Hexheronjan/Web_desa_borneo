import prisma from "@/lib/prisma";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import GuruBelajarActions from "../GuruBelajarActions";
import ELearningClient from "./ELearningClient";
import { auth } from "@/auth";

const COLOR = "#1E5FA5";

export default async function ELearningPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const userRole = session?.user?.role || "warga";
  const wargaId = (session?.user as any)?.wargaId;

  // 1. Ambil data materi
  const [materiList, totalKelas, totalPeserta, totalMateri, defaultKelas] = await Promise.all([
    prisma.materi.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.kelas.count({ where: { modul: 'e_learning' } }),
    prisma.pesertaKelas.count({ where: { kelas: { modul: 'e_learning' } } }),
    prisma.materi.count(),
    prisma.kelas.findFirst({ where: { modul: 'e_learning' } })
  ]);

  // 2. Ambil data Forum (Ambil forum pertama dari kelas e_learning)
  let forum = await prisma.forum.findFirst({
    where: { kelas: { modul: 'e_learning' } },
    include: {
      diskusi: {
        orderBy: { createdAt: "desc" },
        take: 20
      }
    }
  });

  // Jika belum ada forum, buat satu default
  if (!forum && defaultKelas) {
    forum = await prisma.forum.create({
      data: {
        kelasId: defaultKelas.id,
        judul: "Forum Diskusi E-Learning Budaya"
      },
      include: { diskusi: true }
    });
  }

  // 3. Ambil data Sertifikat jika user adalah Warga
  const sertifikatList = wargaId ? await prisma.pesertaKelas.findMany({
    where: { wargaId: wargaId, NOT: { sertifikat: null } },
    include: { kelas: true }
  }) : [];

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="E-Learning Budaya Lokal" modul="Smart Belajar Adat" color={COLOR} />

      <GuruBelajarActions color={COLOR} defaultKelasId={defaultKelas?.id} modul="e_learning" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Kelas Aktif" value={totalKelas} satuan="jadwal minggu ini" barColor="blue" progress={75} />
        <StatCard label="Peserta" value={totalPeserta} satuan="warga terdaftar" barColor="green" progress={85} />
        <StatCard label="Materi" value={totalMateri} satuan="video/pdf/kuis" barColor="teal" progress={60} />
        <StatCard label="Status Anda" value={userRole === "warga" ? "Peserta" : "Fasilitator"} satuan="aktif" barColor="orange" progress={100} />
      </div>

      <ELearningClient 
        initialMateri={materiList} 
        forumData={forum}
        sertifikatList={sertifikatList}
        userId={userId || ""}
        color={COLOR} 
      />
    </div>
  );
}
