"use server";
import prisma from "@/lib/prisma";
import { ModulBelajar } from "@prisma/client";
import { revalidatePath } from "next/cache";


// KELAS
export async function createKelas(data: any) {
  try {
    const record = await prisma.kelas.create({
      data: {
        desaId: data.desaId || "clv_desa_dummy_123",
        modul: data.modul as ModulBelajar,
        nama: data.nama,
        batch: data.batch || "Batch A",
        waktu: data.waktu || "08.30 - 10.30",
        status: "Aktif",
      }
    });
    revalidatePath("/belajar");
    revalidatePath("/belajar/platform-pembelajaran");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteKelas(id: string) {
  try {
    await prisma.kelas.delete({ where: { id } });
    revalidatePath("/belajar");
    revalidatePath("/belajar/platform-pembelajaran");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// MATERI
export async function createMateri(data: any) {
  try {
    const record = await prisma.materi.create({
      data: {
        kelasId: data.kelasId,
        judul: data.judul,
        tipe: data.tipe,
        url: data.url || "#",
      }
    });
    revalidatePath("/belajar/e-learning");
    revalidatePath("/belajar/platform-pembelajaran");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteMateri(id: string) {
  try {
    await prisma.materi.delete({ where: { id } });
    revalidatePath("/belajar/e-learning");
    revalidatePath("/belajar/platform-pembelajaran");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// TUGAS & REVIEW
export async function updateStatusTugas(id: string, status: string) {
  try {
    const record = await prisma.tugas.update({
      where: { id },
      data: { statusReview: status }
    });
    revalidatePath("/belajar/laporan-pembelajaran");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateNilaiPeserta(pesertaKelasId: string, nilai: number) {
    try {
      const record = await prisma.pesertaKelas.update({
        where: { id: pesertaKelasId },
        data: { 
            nilai: nilai,
            status: "Aktif" 
        }
      });
      revalidatePath("/belajar/laporan-pembelajaran");
      revalidatePath("/belajar/platform-pembelajaran");
      return { success: true, data: record };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

// SERTIFIKAT
export async function issueSertifikat(pesertaKelasId: string) {
    try {
      const record = await prisma.pesertaKelas.update({
        where: { id: pesertaKelasId },
        data: { 
            sertifikat: `CERT-${Math.random().toString(36).substring(7).toUpperCase()}`,
        }
      });
      revalidatePath("/belajar/platform-pembelajaran");
      revalidatePath("/belajar/laporan-pembelajaran");
      return { success: true, data: record };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

// FORUM DISKUSI
export async function postDiskusi(data: { forumId: string; userId: string; pesan: string }) {
  try {
    const record = await prisma.diskusi.create({
      data: {
        forumId: data.forumId,
        userId: data.userId,
        pesan: data.pesan,
      }
    });
    revalidatePath("/belajar/e-learning");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
