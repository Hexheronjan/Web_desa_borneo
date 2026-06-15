import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'surat');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${id}_${timestamp}.pdf`;
    const filePath = path.join(uploadsDir, filename);

    // Write file to disk
    await writeFile(filePath, buffer);

    // Return the relative path for storage in database
    const relativePath = `/uploads/surat/${filename}`;

    console.log(`PDF uploaded successfully: ${filePath}`);

    return NextResponse.json({ 
      success: true, 
      filePath: relativePath 
    });

  } catch (error: any) {
    console.error('Error uploading PDF:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
