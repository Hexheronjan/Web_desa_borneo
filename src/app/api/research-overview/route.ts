import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan" }, { status: 400 });
    }

    // Research Overview data
    const overviewData = {
      lokasi: {
        nama: "Desa Lung Anai",
        provinsi: "Kalimantan Timur",
        koordinat: "-0.4567, 116.9876"
      },
      sampel: {
        total: 146,
        karakteristik: [
          { kategori: "Gender", laki: 78, perempuan: 68 },
          { kategori: "Usia", rataRata: 35.5, min: 18, max: 65 },
          { kategori: "Pendidikan", sd: 45, smp: 38, sma: 42, s1: 21 }
        ]
      },
      dataset: {
        total: 4,
        kategori: [
          { nama: "Dataset Readiness", status: "Lengkap", records: 146 },
          { nama: "Dataset Maturity", status: "Lengkap", records: 146 },
          { nama: "Dataset QoL", status: "Lengkap", records: 146 },
          { nama: "Dataset DSS", status: "Lengkap", records: 146 },
        ]
      },
      status: {
        fase: "Berjalan",
        progress: 75,
        tahap: "Analisis Data"
      }
    };

    return NextResponse.json({
      success: true,
      data: overviewData
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
