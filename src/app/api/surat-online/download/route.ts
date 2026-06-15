import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";

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
    let pdfPath: string;

    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      // If it's a URL, redirect to it
      return NextResponse.redirect(filePath);
    } else if (filePath.startsWith('/uploads/surat/')) {
      // New format: absolute path from public folder
      pdfPath = path.join(process.cwd(), 'public', filePath);
    } else if (filePath.startsWith('/')) {
      // Old format: absolute path from public folder
      pdfPath = path.join(process.cwd(), 'public', filePath);
    } else if (filePath.startsWith('/pdf/')) {
      // Mock format that was used before - this won't work but handle gracefully
      pdfPath = path.join(process.cwd(), 'public', filePath);
    } else {
      // Relative path, assume in public/uploads/surat
      pdfPath = path.join(process.cwd(), 'public', 'uploads', 'surat', filePath);
    }

    // Check if file exists
    if (!fs.existsSync(pdfPath)) {
      console.error(`File not found at path: ${pdfPath}`);
      console.error(`Original filePath from database: ${filePath}`);
      return NextResponse.json({ success: false, error: "File PDF tidak ditemukan di server" }, { status: 404 });
    }

    // Read file
    const fileBuffer = fs.readFileSync(pdfPath);

    // Log file info for debugging
    console.log(`Downloading PDF: ${pdfPath}, size: ${fileBuffer.length} bytes`);

    // Extract filename from path
    const filename = path.basename(pdfPath);
    const cleanFilename = suratData.title ? `${suratData.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf` : filename;

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