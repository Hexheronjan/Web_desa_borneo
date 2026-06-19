'use server'

import { PrismaClient } from '@/generated/client'

const prisma = new PrismaClient()

export async function createUmkm(data: any) {
  try {
    const umkm = await prisma.umkm.create({
      data: {
        desaId: 'default',
        nama: data.nama,
        pemilik: data.pemilik,
        bidang: data.bidang,
        omset: data.omset,
        status: data.status || 'Aktif'
      }
    })
    return { success: true, data: umkm }
  } catch (error) {
    return { success: false, error: 'Gagal menambah UMKM' }
  }
}

export async function updateUmkm(id: string, data: any) {
  try {
    const umkm = await prisma.umkm.update({
      where: { id },
      data
    })
    return { success: true, data: umkm }
  } catch (error) {
    return { success: false, error: 'Gagal memperbarui UMKM' }
  }
}

export async function deleteUmkm(id: string) {
  try {
    await prisma.umkm.delete({
      where: { id }
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Gagal menghapus UMKM' }
  }
}
