import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan" }, { status: 400 });
    }

    // Analysis Framework data
    const analysisData = {
      readiness: {
        totalIndikator: 20,
        skor: 74.30,
        kategori: "Baik",
        indikator: [
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
        rataRata: 3.15,
        levelDominan: "Level 3 (Berkembang)",
        distribusi: [
          { level: 'Level 1 (Pemula)', value: 0, persen: '0%' },
          { level: 'Level 2 (Dasar)', value: 19, persen: '10%' },
          { level: 'Level 3 (Berkembang)', value: 60, persen: '60%' },
          { level: 'Level 4 (Maju)', value: 30, persen: '30%' },
          { level: 'Level 5 (Unggul)', value: 0, persen: '0%' },
        ]
      },
      qol: {
        rataRata: 71.28,
        kategori: "Baik",
        indikator: [
          { name: 'Kesehatan', nilai: 72.40 },
          { name: 'Pendidikan', nilai: 70.80 },
          { name: 'Ekonomi', nilai: 72.10 },
          { name: 'Lingkungan', nilai: 69.30 },
          { name: 'Sosial Budaya', nilai: 70.50 },
        ]
      },
      sdgs: {
        sdg3: { nama: "Kesehatan", nilai: 72.40 },
        sdg4: { nama: "Pendidikan", nilai: 70.80 },
        sdg18: { nama: "Kebudayaan", nilai: 70.50 },
        rataRata: 71.23
      },
      dss: {
        totalKriteria: 5,
        consistencyRatio: 0.08,
        bobotDominan: { nama: "Infrastruktur", nilai: "32.0%" },
        rekomendasi: [
          { judul: 'Literasi Digital Masyarakat', frekuensi: '16 Kali', prioritas: 'Tinggi' },
          { judul: 'Implementasi Program 5 Program Berjalan', persen: '71%', prioritas: 'Sedang' },
          { judul: 'Efektivitas Rekomendasi Tingkat Penerimaan', persen: '85%', prioritas: 'Tinggi' },
          { judul: 'Dampak Implementasi Peningkatan Readiness', nilai: '+12,40', prioritas: 'Sedang' },
        ]
      }
    };

    return NextResponse.json({
      success: true,
      data: analysisData
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
