"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


// REKAM MEDIS
export async function createRekamMedis(data: any) {
  try {
    const record = await prisma.rekamMedis.create({
      data: {
        wargaId: data.wargaId,
        tanggal: new Date(),
        diagnosis: data.diagnosis,
        nakes: data.nakes || "Nakes Desa",
        catatan: data.catatan,
        alergi: data.alergi,
      }
    });
    revalidatePath("/sehat/rekam-medis");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createRekamMedisByNik(data: { nik: string, diagnosis: string, alergi: string }) {
  try {
    const warga = await prisma.warga.findUnique({ where: { nik: data.nik } });
    if (!warga) {
      return { success: false, error: "Warga dengan NIK tersebut tidak ditemukan." };
    }
    
    const record = await prisma.rekamMedis.create({
      data: {
        wargaId: warga.id,
        tanggal: new Date(),
        diagnosis: data.diagnosis,
        nakes: "Admin/Nakes",
        alergi: data.alergi || null,
      }
    });
    revalidatePath("/sehat/rekam-medis");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteRekamMedis(id: string) {
  try {
    await prisma.rekamMedis.delete({ where: { id } });
    revalidatePath("/sehat/rekam-medis");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// MONITORING
export async function createMonitoring(data: any) {
  try {
    const record = await prisma.monitoringKesehatan.create({
      data: {
        wargaId: data.wargaId,
        tanggal: new Date(),
        beratBadan: data.beratBadan,
        tinggiBadan: data.tinggiBadan,
        tensiSistolik: data.tensiSistolik,
        tensiDiastolik: data.tensiDiastolik,
        suhu: data.suhu,
        alert: !!((data.tensiSistolik && data.tensiSistolik > 140) || (data.beratBadan && data.beratBadan < 40)),
      }
    });
    revalidatePath("/sehat/monitoring");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createMonitoringByNik(data: { 
  nik: string, 
  beratBadan?: number, 
  tinggiBadan?: number, 
  tensiSistolik?: number, 
  tensiDiastolik?: number,
  suhu?: number
}) {
  try {
    const warga = await prisma.warga.findUnique({ where: { nik: data.nik } });
    if (!warga) {
      return { success: false, error: "Warga dengan NIK tersebut tidak ditemukan." };
    }
    
    const record = await prisma.monitoringKesehatan.create({
      data: {
        wargaId: warga.id,
        tanggal: new Date(),
        beratBadan: data.beratBadan,
        tinggiBadan: data.tinggiBadan,
        tensiSistolik: data.tensiSistolik,
        tensiDiastolik: data.tensiDiastolik,
        suhu: data.suhu,
        alert: !!((data.tensiSistolik && data.tensiSistolik > 140) || (data.beratBadan && data.beratBadan < 40)),
      }
    });
    revalidatePath("/sehat/monitoring");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteMonitoring(id: string) {
  try {
    await prisma.monitoringKesehatan.delete({ where: { id } });
    revalidatePath("/sehat/monitoring");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// POSYANDU
export async function createPosyandu(data: any) {
  try {
    const desa = await prisma.desa.findFirst();
    const record = await prisma.posyandu.create({
      data: {
        desaId: desa?.id || "clv_desa_borneo_01",
        tanggal: new Date(data.tanggal),
        lokasi: data.lokasi,
        jumlahBalita: data.jumlahBalita || 0,
        jumlahImunisasi: data.jumlahImunisasi || 0,
        catatan: data.catatan,
      }
    });
    revalidatePath("/sehat/posyandu");
    revalidatePath("/sehat/laporan-kesehatan");
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deletePosyandu(id: string) {
  try {
    await prisma.posyandu.delete({ where: { id } });
    revalidatePath("/sehat/posyandu");
    revalidatePath("/sehat/laporan-kesehatan");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ALERT & SHIFT
export async function broadcastKesehatanAlert(judul: string, pesan: string) {
  try {
    const users = await prisma.user.findMany({ select: { id: true } });
    await prisma.notifikasi.createMany({
      data: users.map(u => ({
        userId: u.id,
        judul: judul,
        pesan: pesan,
        tipe: "Kesehatan",
      }))
    });
    return { success: true, count: users.length };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createShiftNakes(data: { nama: string, hari: string, mulai: string, selesai: string }) {
  try {
    const desa = await prisma.desa.findFirst();
    const desaId = desa?.id || "clv_desa_borneo_01";
    
    await prisma.shiftNakes.create({
      data: {
        desaId: desaId,
        namaNakes: data.nama,
        hari: data.hari,
        jamMulai: data.mulai,
        jamSelesai: data.selesai,
        status: "Aktif",
      }
    });

    revalidatePath("/sehat/monitoring");
    return { success: true };
  } catch (error: any) {
    console.error("Error creating shift nakes:", error);
    return { success: false, error: error.message };
  }
}
