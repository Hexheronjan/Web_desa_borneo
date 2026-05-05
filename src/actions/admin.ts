"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createWargaBaru(data: { nik: string, nama: string, email: string, role: any }) {
  try {
    const desa = await prisma.desa.findFirst();
    const rwrt = await prisma.rwRt.findFirst();
    
    // 1. Buat Data Warga (Kependudukan)
    const warga = await prisma.warga.create({
      data: {
        desaId: desa?.id || "",
        rwRtId: rwrt?.id || "",
        nik: data.nik,
        nama: data.nama,
        tempatLahir: "Borneo",
        tanggalLahir: new Date("2000-01-01"),
        jenisKelamin: "L",
        alamat: "Alamat Desa Borneo",
      }
    });

    // 2. Buat Akun Login
    await prisma.user.create({
      data: {
        email: data.email,
        name: data.nama,
        password: "password123", // Default password untuk demo
        role: data.role,
        desaId: desa?.id || "",
        wargaId: warga.id,
      }
    });

    revalidatePath("/data-desa/pengguna");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createPetugasBaru(data: { nama: string, email: string, role: any }) {
  try {
    const desa = await prisma.desa.findFirst();
    
    await prisma.user.create({
      data: {
        email: data.email,
        name: data.nama,
        password: "password123",
        role: data.role,
        desaId: desa?.id || "",
      }
    });

    revalidatePath("/data-desa/pengguna");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/data-desa/pengguna");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
