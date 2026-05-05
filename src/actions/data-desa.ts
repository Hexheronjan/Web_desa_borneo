"use server";
import prisma from "@/lib/prisma";
import { StatusWarga, JenisKelamin } from "@prisma/client";
import { revalidatePath } from "next/cache";


export async function createWarga(data: any) {
  try {
    const record = await prisma.warga.create({
      data: {
        desaId: "clv_desa_dummy_123",
        rwRtId: data.rwRtId,
        nik: data.nik,
        nama: data.nama,
        tempatLahir: data.tempatLahir || "Borneo",
        tanggalLahir: new Date(data.tanggalLahir || "2000-01-01"),
        jenisKelamin: (data.jenisKelamin as JenisKelamin) || "L",
        alamat: data.alamat || "Alamat Desa",
        status: (data.status as StatusWarga) || "Aktif",
      }
    });
    revalidatePath("/data-desa");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteWarga(id: string) {
  try {
    await prisma.warga.delete({ where: { id } });
    revalidatePath("/data-desa");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateWargaStatus(id: string, status: string) {
  try {
    const record = await prisma.warga.update({
      where: { id },
      data: { status: status as StatusWarga }
    });
    revalidatePath("/data-desa");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
