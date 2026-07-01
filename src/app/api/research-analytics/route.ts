import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan" }, { status: 400 });
    }

    // Dashboard Analytics data
    const analyticsData = {
      readiness: {
        index: 74.30,
        indicators: [
          { aspek: 'SDM & Literasi Digital', nilai: 68 },
          { aspek: 'Infrastruktur Digital', nilai: 72 },
          { aspek: 'Kesehatan', nilai: 75 },
          { aspek: 'Ekonomi', nilai: 70 },
          { aspek: 'Lingkungan', nilai: 69 },
          { aspek: 'Sosial Budaya', nilai: 73 },
          { aspek: 'Kelembagaan', nilai: 71 },
        ]
      },
      maturity: {
        level: 3.15,
        distribution: [
          { level: 'Level 1 (Pemula)', value: 0, persen: '0%' },
          { level: 'Level 2 (Dasar)', value: 19, persen: '10%' },
          { level: 'Level 3 (Berkembang)', value: 60, persen: '60%' },
          { level: 'Level 4 (Maju)', value: 30, persen: '30%' },
          { level: 'Level 5 (Unggul)', value: 0, persen: '0%' },
        ]
      },
      qol: {
        index: 71.28,
        indicators: [
          { name: 'Kesehatan', nilai: 72.40 },
          { name: 'Pendidikan', nilai: 70.80 },
          { name: 'Ekonomi', nilai: 72.10 },
          { name: 'Lingkungan', nilai: 69.30 },
          { name: 'Sosial Budaya', nilai: 70.50 },
        ]
      },
      sdgs: {
        sdg3: 72.40,
        sdg4: 70.80,
        sdg18: 70.50,
        average: 71.23
      },
      slvIndex: 72.50
    };

    return NextResponse.json({
      success: true,
      data: analyticsData
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
