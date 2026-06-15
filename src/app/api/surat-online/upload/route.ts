import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const MODULE_PATH = "/warga/surat-online";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const id = formData.get("id") as string;

    if (!file) {
      return NextResponse.json({ success: false, error: "File diperlukan" }, { status: 400 });
    }

    if (!id) {
      return NextResponse.json({ success: false, error: "ID surat diperlukan" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ success: false, error: "Hanya file PDF yang diperbolehkan" }, { status: 400 });
    }

    const existing = await prisma.moduleRecord.findFirst({
      where: { id, modulePath: MODULE_PATH },
      select: { id: true },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: "Surat tidak ditemukan" }, { status: 404 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    await prisma.moduleRecord.update({
      where: { id },
      data: { valueBlob: base64 },
    });

    return NextResponse.json({
      success: true,
      size: base64.length,
    });
  } catch (error: any) {
    console.error("Error uploading PDF:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
