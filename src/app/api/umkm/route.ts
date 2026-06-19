import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const umkms = await prisma.umkm.findMany()
    return NextResponse.json({ success: true, data: umkms })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal mengambil data UMKM' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const umkm = await prisma.umkm.create({
      data: {
        desaId: 'default', // Anda bisa sesuaikan dengan desaId yang benar
        nama: body.nama,
        pemilik: body.pemilik,
        bidang: body.bidang,
        omset: body.omset,
        status: body.status || 'Aktif'
      }
    })
    return NextResponse.json({ success: true, data: umkm })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal menambah UMKM' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const umkm = await prisma.umkm.update({
      where: { id: body.id },
      data: {
        nama: body.nama,
        pemilik: body.pemilik,
        bidang: body.bidang,
        omset: body.omset,
        status: body.status
      }
    })
    return NextResponse.json({ success: true, data: umkm })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal memperbarui UMKM' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    await prisma.umkm.delete({
      where: { id: body.id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal menghapus UMKM' }, { status: 500 })
  }
}
