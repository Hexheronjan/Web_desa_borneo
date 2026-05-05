"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function daftarKonsultasi(wargaId: string, keluhan: string) {
  try {
    await prisma.telemedicine.create({
      data: {
        wargaId: wargaId,
        waktu: new Date(),
        status: "Antrian",
        catatanKonsultasi: keluhan,
      },
    });
    revalidatePath("/sehat/telemedicine");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Gagal mendaftar konsultasi." };
  }
}

export async function layaniPasien(id: string, diagnosis: string, rujukan: string, status: any = "Selesai") {
  try {
    await prisma.telemedicine.update({
      where: { id },
      data: {
        status: status,
        catatanKonsultasi: diagnosis,
        suratRujukan: rujukan || null,
      },
    });
    revalidatePath("/sehat/telemedicine");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Gagal menyimpan diagnosis." };
  }
}
