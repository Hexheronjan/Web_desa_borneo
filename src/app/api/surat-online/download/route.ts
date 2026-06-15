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
      SELECT valueBlob, valueText, title
      FROM ModuleRecord
      WHERE id = ${id} AND modulePath = '/warga/surat-online'
      LIMIT 1
    `;

    if (!surat || surat.length === 0) {
      return NextResponse.json({ success: false, error: "Surat tidak ditemukan" }, { status: 404 });
    }

    const suratData = surat[0];
    const base64Data = suratData.valueBlob;
    const title = suratData.title;

    // Check if we have base64 data
    if (!base64Data) {
      // Check if there's old URL format
      const filePath = suratData.valueText;
      if (filePath && (filePath.startsWith('http://') || filePath.startsWith('https://'))) {
        console.log(`Redirecting to external URL: ${filePath}`);
        return NextResponse.redirect(filePath);
      }

      return NextResponse.json({ success: false, error: "File PDF tidak tersedia. Silakan upload ulang oleh operator." }, { status: 404 });
    }

    // Convert base64 back to buffer
    const fileBuffer = Buffer.from(base64Data, 'base64');

    console.log(`Downloading PDF from base64, size: ${fileBuffer.length} bytes`);

    // Generate clean filename
    const cleanFilename = title ? `${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf` : 'surat.pdf';

    // Return file with proper headers for download
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(cleanFilename)}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error: any) {
    console.error('Error downloading PDF:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}