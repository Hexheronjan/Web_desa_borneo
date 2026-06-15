import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: "ID surat diperlukan" }, { status: 400 });
    }

    // Get surat data from database
    const surat = await prisma.$queryRaw<any[]>`
      SELECT valueText, title
      FROM ModuleRecord
      WHERE id = ${id} AND modulePath = '/warga/surat-online'
      LIMIT 1
    `;

    if (!surat || surat.length === 0) {
      return NextResponse.json({ success: false, error: "Surat tidak ditemukan" }, { status: 404 });
    }

    const suratData = surat[0];
    const filePath = suratData.valueText;

    if (!filePath) {
      return NextResponse.json({ success: false, error: "File PDF tidak tersedia" }, { status: 404 });
    }

    // Handle different file path formats
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      // If it's a URL (Vercel Blob or external), redirect to it
      console.log(`Redirecting to external URL: ${filePath}`);
      return NextResponse.redirect(filePath);
    }

    // For local filesystem paths (won't work in Vercel production)
    console.error(`Local filesystem path detected (won't work in Vercel): ${filePath}`);
    return NextResponse.json({ 
      success: false, 
      error: "File menggunakan local storage yang tidak didukung di Vercel. Silakan upload ulang file PDF." 
    }, { status: 400 });

  } catch (error: any) {
    console.error('Error downloading PDF:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}