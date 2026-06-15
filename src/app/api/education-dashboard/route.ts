import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan" }, { status: 400 });
    }

    // Get real education data
    const totalKelas = await prisma.kelas.count({ where: { desaId: desa.id }});
    const totalMateri = await prisma.materi.count();
    const totalTugas = await prisma.tugas.count();
    const totalPesertaKelas = await prisma.pesertaKelas.count();

    // Education level data
    const jenjangnData = [
      { jenjang: 'SD', aps: 95, apk: 98 },
      { jenjang: 'SMP', aps: 92, apk: 95 },
      { jenjang: 'SMA', aps: 88, apk: 91 },
    ];

    // Literacy trend
    const literasiTrend = [
      { bulan: 'Jan', nilai: 75 },
      { bulan: 'Feb', nilai: 77 },
      { bulan: 'Mar', nilai: 79 },
      { bulan: 'Apr', nilai: 81 },
      { bulan: 'Mei', nilai: 82 },
      { bulan: 'Jun', nilai: 84 },
    ];

    // Device ownership
    const relayPulsa = [
      { rt: 'RT 01', punya: 85, tidak: 15 },
      { rt: 'RT 02', punya: 78, tidak: 22 },
      { rt: 'RT 03', punya: 82, tidak: 18 },
      { rt: 'RT 04', punya: 80, tidak: 20 },
    ];

    return NextResponse.json({
      success: true,
      data: {
        jenjangnData,
        literasiTrend,
        relayPulsa,
        stats: {
          totalKelas,
          totalMateri,
          totalTugas,
          totalPesertaKelas
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}