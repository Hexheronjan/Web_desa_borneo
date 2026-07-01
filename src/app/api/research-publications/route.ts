import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan" }, { status: 400 });
    }

    // Research Publications data
    const publicationsData = {
      publikasi: {
        total: 6,
        kategori: [
          { tipe: 'Artikel Jurnal', jumlah: '2 Publikasi' },
          { tipe: 'Prosiding Konferensi', jumlah: '1 Publikasi' },
          { tipe: 'Laporan Penelitian', jumlah: '3 Dokumen' },
          { tipe: 'Sitasi', jumlah: '0 Sitasi' },
        ]
      },
      laporan: {
        total: 4,
        dokumen: [
          { nama: 'Laporan Readiness', format: 'PDF', tanggal: '2025-01-15', ukuran: '2.5 MB' },
          { nama: 'Laporan Maturity', format: 'PDF', tanggal: '2025-01-15', ukuran: '1.8 MB' },
          { nama: 'Laporan QoL', format: 'PDF', tanggal: '2025-01-15', ukuran: '2.1 MB' },
          { nama: 'Dataset Lengkap', format: 'Excel', tanggal: '2025-01-15', ukuran: '5.2 MB' },
        ]
      },
      repository: {
        totalDokumen: 41,
        kategori: [
          { nama: 'Instrumen Penelitian', sub: 'Questionnaire, Panduan Wawancara, Pedoman FGD', jumlah: 12 },
          { nama: 'Dataset Penelitian', sub: 'Data Assessment, QoL, Maturity, DSS', jumlah: 8 },
          { nama: 'Dokumen Validasi', sub: 'Hasil Validasi Ahli, UAT, SUS', jumlah: 6 },
          { nama: 'Dokumentasi Lapangan', sub: 'Foto, Video, Catatan Observasi', jumlah: 15 },
        ]
      }
    };

    return NextResponse.json({
      success: true,
      data: publicationsData
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
