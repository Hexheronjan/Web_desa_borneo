import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan" }, { status: 400 });
    }

    // Validation & Evaluation data
    const validationData = {
      artefak: {
        total: 6,
        valid: 6,
        rataRata: 91.50,
        items: [
          { artefak: 'Artefak 1 - Wawancara', status: 'Selesai', nilai: 92.00 },
          { artefak: 'Artefak 2 - FGD', status: 'Selesai', nilai: 90.00 },
          { artefak: 'Artefak 3 - Readiness Assessment', status: 'Selesai', nilai: 95.00 },
          { artefak: 'Artefak 4 - Validasi Ahli', status: 'Selesai', nilai: 88.00 },
          { artefak: 'Artefak 5 - Observasi Lapangan', status: 'Selesai', nilai: 91.00 },
          { artefak: 'Artefak 6 - APL-SLV Borneo (Instansiasi)', status: 'Selesai', nilai: 93.00 },
        ]
      },
      expert: {
        totalValidator: 3,
        rataRataSkor: 92.33,
        validators: [
          { validator: 'Validator 1', bidang: 'Smart Village', skor: 92.00, status: 'Valid' },
          { validator: 'Validator 2', bidang: 'DSS & AI', skor: 90.00, status: 'Valid' },
          { validator: 'Validator 3', bidang: 'Sistem Informasi', skor: 95.00, status: 'Valid' },
        ]
      },
      uatSus: {
        totalResponden: 25,
        skorRataRata: 82.6,
        aspek: [
          { aspek: 'Usability', sus: 85 },
          { aspek: 'Learnability', sus: 82 },
          { aspek: 'Memorability', sus: 78 },
          { aspek: 'Efficiency', sus: 80 },
          { aspek: 'Satisfaction', sus: 88 },
        ]
      }
    };

    return NextResponse.json({
      success: true,
      data: validationData
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
