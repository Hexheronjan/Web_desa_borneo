import { NextResponse } from "next/server";
import { put } from '@vercel/blob';

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

    // Check if Vercel Blob is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ 
        success: false, 
        error: "Vercel Blob belum dikonfigurasi. Silakan tambahkan BLOB_READ_WRITE_TOKEN di environment variables." 
      }, { status: 500 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `surat-${id}-${timestamp}.pdf`;

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
    });

    console.log(`PDF uploaded successfully to Vercel Blob: ${blob.url}`);

    return NextResponse.json({ 
      success: true, 
      filePath: blob.url 
    });

  } catch (error: any) {
    console.error('Error uploading PDF:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
