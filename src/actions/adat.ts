"use server";
import prisma from "@/lib/prisma";
import { TipeArsip, TipeHukumAdat } from "@prisma/client";
import { revalidatePath } from "next/cache";


import fs from "fs";
import path from "path";

// ARSIP
export async function createArsip(data: any) {
  try {
    let judul, kategori, tipe, url = "/uploads/placeholder.pdf";
    
    if (data instanceof FormData) {
      const file = data.get("file") as File;
      judul = data.get("judul") as string;
      kategori = data.get("kategori") as string;
      tipe = data.get("tipe") as string;
      
      if (file) {
        // Simpan file ke public/uploads
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
        const filePath = path.join(process.cwd(), "public", "uploads", fileName);
        
        if (!fs.existsSync(path.join(process.cwd(), "public", "uploads"))) {
          fs.mkdirSync(path.join(process.cwd(), "public", "uploads"), { recursive: true });
        }
        
        fs.writeFileSync(filePath, buffer);
        url = `/uploads/${fileName}`;
      }
    } else {
      judul = data.judul;
      kategori = data.kategori;
      tipe = data.tipe;
      url = data.url || "/uploads/placeholder.pdf";
    }
    
    const desa = await prisma.desa.findFirst();

    const record = await prisma.arsipAdat.create({
      data: {
        desaId: desa?.id || "clv_desa_borneo_01",
        judul: judul,
        kategori: kategori,
        tipe: tipe as TipeArsip,
        url: url,
        tahun: new Date().getFullYear(),
        statusReview: "Review",
      }
    });
    revalidatePath("/adat/arsip");
    return { success: true, data: record };
  } catch (error: any) {
    console.error("Upload Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteArsip(id: string) {
  try {
    await prisma.arsipAdat.delete({ where: { id } });
    revalidatePath("/adat/arsip");
    revalidatePath("/adat/laporan-kelembagaan");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function approveArsip(id: string) {
  try {
    const record = await prisma.arsipAdat.update({
      where: { id },
      data: { statusReview: "Aktif" }
    });
    revalidatePath("/adat/arsip");
    revalidatePath("/adat/laporan-kelembagaan");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// MUSYAWARAH
export async function createMusyawarah(data: any) {
  try {
    const record = await prisma.musyawarah.create({
      data: {
        desaId: data.desaId || "clv_desa_dummy_123",
        judul: data.judul,
        tanggal: new Date(data.tanggal),
        statusSah: false,
      }
    });
    revalidatePath("/adat/musyawarah");
    revalidatePath("/adat/laporan-kelembagaan");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function sahkanMusyawarah(id: string) {
  try {
    const record = await prisma.musyawarah.update({
      where: { id },
      data: { statusSah: true }
    });
    revalidatePath("/adat/musyawarah");
    revalidatePath("/adat/laporan-kelembagaan");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// PENGURUS
export async function createPengurus(data: any) {
  try {
    const record = await prisma.pengurus.create({
      data: {
        desaId: "clv_desa_dummy_123",
        nama: data.nama,
        jabatan: data.jabatan,
        bidang: data.bidang,
        periode: data.periode || "2024-2029",
      }
    });
    revalidatePath("/adat/kelembagaan");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deletePengurus(id: string) {
  try {
    await prisma.pengurus.delete({ where: { id } });
    revalidatePath("/adat/kelembagaan");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// HUKUM & MAPPING
export async function createHukumAdat(data: any) {
  try {
    const desa = await prisma.desa.findFirst();
    const record = await prisma.hukumAdat.create({
      data: {
        desaId: desa?.id || "clv_desa_borneo_01",
        judul: data.judul,
        tipe: data.tipe as TipeHukumAdat,
        deskripsi: data.deskripsi,
        publik: data.publik || false,
      }
    });
    revalidatePath("/adat/hukum-adat");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createWilayahAdat(data: any) {
  try {
    const desa = await prisma.desa.findFirst();
    const record = await prisma.wilayahAdat.create({
      data: {
        desaId: desa?.id || "clv_desa_borneo_01",
        namaLayer: data.namaLayer,
        koordinat: data.koordinat, // Json
        validasi: true,
      }
    });
    revalidatePath("/adat/mapping");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
