import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan" }, { status: 400 });
    }

    // Get real citizen data
    const totalWarga = await prisma.warga.count({ where: { desaId: desa.id }});
    const totalAspirasi = await prisma.aspirasi.count({ where: { desaId: desa.id }});

    // Quality of life data
    const qolData = [
      { name: 'Kesehatan', nilai: 4.2, color: '#ef4444' },
      { name: 'Pendidikan', nilai: 4.0, color: '#f97316' },
      { name: 'Ekonomi', nilai: 3.8, color: '#eab308' },
      { name: 'Lingkungan', nilai: 4.1, color: '#22c55e' },
      { name: 'Sosial', nilai: 4.3, color: '#06b6d4' },
    ];

    // Document status
    const statusSurat = [
      { name: 'Selesai', value: 65, color: '#22c55e' },
      { name: 'Proses', value: 25, color: '#f97316' },
      { name: 'Pending', value: 10, color: '#ef4444' },
    ];

    return NextResponse.json({
      success: true,
      data: {
        qolData,
        statusSurat,
        stats: {
          totalWarga,
          totalAspirasi
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}