import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const id = formData.get('id') as string;

    if (!file) {
      return NextResponse.json({ success: false, error: "File diperlukan" }, { status: 400 });
    }

    if (!id) {
      return NextResponse.json({ success: false, error: "ID surat diperlukan" }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ success: false, error: "Hanya file PDF yang diperbolehkan" }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');

    console.log(`PDF converted to base64, size: ${base64.length} characters`);

    // Save base64 to database
    await prisma.$executeRawUnsafe(`
      UPDATE ModuleRecord
      SET valueBlob = '${base64}'
      WHERE id = '${id}' AND modulePath = '/warga/surat-online'
    `);

    console.log(`PDF saved to database for ID: ${id}`);

    return NextResponse.json({ 
      success: true, 
      base64: base64,
      size: base64.length
    });

  } catch (error: any) {
    console.error('Error uploading PDF:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
