import { NextResponse } from "next/server";
import { getWargaList } from "@/actions/data-desa";

export async function GET() {
  try {
    const result = await getWargaList();
    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
