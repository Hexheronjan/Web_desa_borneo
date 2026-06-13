import { NextResponse } from "next/server";
import { getWargaList, createWarga, updateWarga, deleteWarga } from "@/actions/data-desa";

export async function GET() {
  try {
    const result = await getWargaList();
    if (result.success && result.data) {
      // Transform data to match the expected interface and remove duplicates
      const uniqueData = new Map();
      result.data.forEach((w: any) => {
        uniqueData.set(w.id, w);
      });
      const transformedData = Array.from(uniqueData.values()).map((w: any) => ({
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await createWarga(body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const result = await updateWarga(id, data);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }
    const result = await deleteWarga(id);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
