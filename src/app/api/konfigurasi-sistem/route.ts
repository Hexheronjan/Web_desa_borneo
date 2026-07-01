import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const config = await prisma.konfigurasiSistem.findFirst();
    if (!config) {
      // Create default config if not exists
      const defaultConfig = await prisma.konfigurasiSistem.create({
        data: {
          namaSistem: "APL-SLV BORNEO Smart Living Village",
          versiSistem: "v2.0",
          urlSistem: "",
          emailAdmin: "",
          deskripsiSistem: "",
          maxUploadSize: "50",
          sessionTimeout: "60",
          maintenanceMode: false,
          backupOtomatis: true,
          backupSchedule: "02:00",
          notifikasiEmail: true,
          notifikasiSms: false
        }
      });
      return NextResponse.json(defaultConfig);
    }
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const existingConfig = await prisma.konfigurasiSistem.findFirst();
    
    if (existingConfig) {
      const config = await prisma.konfigurasiSistem.update({
        where: { id: existingConfig.id },
        data: body
      });
      return NextResponse.json(config);
    } else {
      const config = await prisma.konfigurasiSistem.create({
        data: body
      });
      return NextResponse.json(config);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
}
