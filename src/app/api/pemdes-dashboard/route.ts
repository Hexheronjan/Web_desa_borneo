import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan" }, { status: 400 });
    }

    // Get real village government data
    const totalWarga = await prisma.warga.count({ where: { desaId: desa.id }});
    const totalUsers = await prisma.user.count({ where: { desaId: desa.id }});

    // Budget data (mock with real base numbers)
    const apbdesData = [
      { name: 'Pendapatan Desa', anggaran: 1200, realisasi: 950 },
      { name: 'Belanja Pembangunan', anggaran: 650, realisasi: 520 },
      { name: 'Belanja Pemberdayaan', anggaran: 500, realisasi: 400 },
      { name: 'Belanja Operasional', anggaran: 350, realisasi: 330 },
    ];

    // Radar data
    const radarData = [
      { aspek: 'Pelayanan Publik', nilai: 75 },
      { aspek: 'Transparansi', nilai: 82 },
      { aspek: 'Akuntabilitas', nilai: 78 },
      { aspek: 'Partisipasi', nilai: 70 },
      { aspek: 'Inovasi', nilai: 68 },
    ];

    return NextResponse.json({
      success: true,
      data: {
        apbdesData,
        radarData,
        stats: {
          totalWarga,
          totalUsers
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}