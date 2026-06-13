"use server";
import prisma from "@/lib/prisma";
import { StatusWarga, JenisKelamin } from "@prisma/client";
import { revalidatePath } from "next/cache";


export async function createWarga(data: any) {
  try {
    // Get first desa and rwRt as defaults
    const desa = await prisma.desa.findFirst();
    const rwRt = await prisma.rwRt.findFirst();

    const record = await prisma.warga.create({
      data: {
        desaId: desa?.id || "clv_desa_dummy_123",
        rwRtId: data.rwRtId || rwRt?.id || "clv_rwt_dummy_123",
        nik: data.nik,
        nama: data.nama,
        tempatLahir: data.tempatLahir || "Borneo",
        tanggalLahir: new Date(data.tanggalLahir || "2000-01-01"),
        jenisKelamin: (data.jenisKelamin as JenisKelamin) || "L",
        alamat: data.alamat || "Alamat Desa",
        noHp: data.noHp,
        status: (data.status as StatusWarga) || "Aktif",
      }
    });
    revalidatePath("/data-desa");
    revalidatePath("/operator-sid/data-penduduk");
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
    revalidatePath("/operator-sid/data-penduduk");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateWarga(id: string, data: any) {
  try {
    const record = await prisma.warga.update({
      where: { id },
      data: {
        nik: data.nik,
        nama: data.nama,
        tempatLahir: data.tempatLahir,
        tanggalLahir: new Date(data.tanggalLahir),
        jenisKelamin: data.jenisKelamin as JenisKelamin,
        alamat: data.alamat,
        noHp: data.noHp,
        status: data.status as StatusWarga,
      }
    });
    revalidatePath("/data-desa");
    revalidatePath("/operator-sid/data-penduduk");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getWargaList() {
  try {
    const warga = await prisma.warga.findMany({
      include: {
        desa: true,
        rwRt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: warga };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
