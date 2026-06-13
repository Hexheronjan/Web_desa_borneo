import { NextResponse } from "next/server";
import { getWargaList } from "@/actions/data-desa";

export async function GET() {
  try {
    const result = await getWargaList();
    if (result.success && result.data) {
      // Transform data to match the expected interface
      const transformedData = result.data.map((w: any) => ({
        id: w.id,
        nik: w.nik,
        nama: w.nama,
        alamat: w.alamat,
        status: w.status,
        tempatLahir: w.tempatLahir,
        tanggalLahir: w.tanggalLahir,
        jenisKelamin: w.jenisKelamin,
        noHp: w.noHp,
      }));
      return NextResponse.json({ success: true, data: transformedData });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
