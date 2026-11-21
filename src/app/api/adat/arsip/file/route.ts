import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

const FILE_MODULE_PATH = "/adat/arsip/file";

function guessMimeType(filename: string, fallback?: string | null) {
  if (fallback && fallback !== "application/octet-stream") return fallback;
  const lower = filename.toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".docx")) return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (lower.endsWith(".doc")) return "application/msword";
  if (lower.endsWith(".xlsx")) return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if (lower.endsWith(".xls")) return "application/vnd.ms-excel";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".mp4")) return "video/mp4";
  if (lower.endsWith(".webm")) return "video/webm";
  return fallback || "application/octet-stream";
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Silakan login terlebih dahulu" }, { status: 401 });
    }
    const body = await req.json();
    const key = String(body.key || "").trim().slice(0, 120);
    const chunkIndex = Number(body.chunkIndex ?? 0);
    const fileName = String(body.fileName || "dokumen").trim().slice(0, 191);
    const mimeType = String(body.mimeType || "application/octet-stream").trim().slice(0, 191);
    const dataBase64 = String(body.dataBase64 || "");

    if (!key || !dataBase64 || Number.isNaN(chunkIndex) || chunkIndex < 0) {
      return NextResponse.json({ success: false, error: "Data potongan file tidak valid" }, { status: 400 });
    }

    await prisma.moduleRecord.create({
      data: {
        modulePath: FILE_MODULE_PATH,
        moduleName: "Arsip Digital Adat",
        title: fileName,
        category: key,
        description: String(chunkIndex).padStart(4, "0"),
        valueText: mimeType,
        valueBlob: dataBase64,
        status: "Tersimpan",
        createdBy: "Lembaga Adat",
      },
    });

    return NextResponse.json({ success: true, key, chunkIndex });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[ARSIP FILE UPLOAD ERROR]:", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key")?.trim();
    const isDownload = req.nextUrl.searchParams.get("download") === "1";

    if (!key) {
      return NextResponse.json({ success: false, error: "Parameter key file diperlukan" }, { status: 400 });
    }

    const chunks = await prisma.moduleRecord.findMany({
      where: {
        modulePath: FILE_MODULE_PATH,
        category: key,
      },
      orderBy: { description: "asc" },
      select: {
        title: true,
        valueText: true,
        valueBlob: true,
      },
    });

    if (!chunks || chunks.length === 0) {
      return NextResponse.json(
        { success: false, error: "File arsip tidak ditemukan di database." },
        { status: 404 }
      );
    }

    const fileName = chunks[0].title || "arsip-adat";
    const contentType = guessMimeType(fileName, chunks[0].valueText);
    const buffers = chunks
      .map((c) => (c.valueBlob ? Buffer.from(c.valueBlob, "base64") : Buffer.alloc(0)))
      .filter((b) => b.length > 0);
    const fullBuffer = Buffer.concat(buffers);

    const safeDownloadName = fileName.replace(/["\r\n]/g, "_");
    return new NextResponse(fullBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `${isDownload ? "attachment" : "inline"}; filename="${encodeURIComponent(safeDownloadName)}"`,
        "Content-Length": String(fullBuffer.length),
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[ARSIP FILE GET ERROR]:", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
