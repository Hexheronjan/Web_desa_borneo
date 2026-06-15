import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan" }, { status: 400 });
    }

    // Get real BPD data
    const totalAspirasi = await prisma.aspirasi.count({ where: { desaId: desa.id }});
    const totalPengurus = await prisma.pengurus.count({ where: { desaId: desa.id }});

    // Budget data (mock with real base numbers)
    const apbdesData = [
      { name: 'Pendapatan Desa', anggaran: 1500, realisasi: 1200 },
      { name: 'Belanja Pembangunan', anggaran: 800, realisasi: 650 },
      { name: 'Belanja Pemberdayaan', anggaran: 600, realisasi: 480 },
      { name: 'Belanja Operasional', anggaran: 400, realisasi: 380 },
    ];

    // Aspiration pie data
    const aspirasi = [
      { name: 'Infrastruktur', value: 35, color: '#1565C0' },
      { name: 'Ekonomi', value: 25, color: '#E65100' },
      { name: 'Sosial', value: 20, color: '#2E7D32' },
      { name: 'Budaya', value: 15, color: '#00695C' },
      { name: 'Lainnya', value: 5, color: '#94a3b8' },
    ];

    return NextResponse.json({
      success: true,
      data: {
        apbdesData,
        aspirasi,
        stats: {
          totalAspirasi,
          totalPengurus
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}