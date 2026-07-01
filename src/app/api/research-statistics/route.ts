import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan" }, { status: 400 });
    }

    // Research Statistics data
    const statisticsData = {
      dataset: {
        total: 4,
        kategori: [
          { nama: "Dataset Readiness", records: 146 },
          { nama: "Dataset Maturity", records: 146 },
          { nama: "Dataset QoL", records: 146 },
          { nama: "Dataset DSS", records: 146 },
        ]
      },
      statistik: {
        totalResponden: 146,
        variabel: [
          { jenis: 'Mean', nilai: 74.30 },
          { jenis: 'Median', nilai: 72.50 },
          { jenis: 'Mode', nilai: 71.00 },
          { jenis: 'Standard Deviation', nilai: 5.20 },
          { jenis: 'Variance', nilai: 27.04 },
          { jenis: 'Min', nilai: 68.00 },
          { jenis: 'Max', nilai: 80.00 },
        ]
      },
      visualisasi: {
        totalGrafik: 5,
        jenis: [
          { jenis: 'Bar Chart', deskripsi: 'Perbandingan kategori', jumlah: 8 },
          { jenis: 'Line Chart', deskripsi: 'Tren waktu', jumlah: 5 },
          { jenis: 'Pie Chart', deskripsi: 'Distribusi persentase', jumlah: 4 },
          { jenis: 'Radar Chart', deskripsi: 'Multi-dimensi', jumlah: 3 },
          { jenis: 'Scatter Plot', deskripsi: 'Korelasi variabel', jumlah: 2 },
        ]
      }
    };

    return NextResponse.json({
      success: true,
      data: statisticsData
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
