import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";
import { 
  HeartPulse, 
  BookOpen, 
  Map as MapIcon, 
  Bell, 
  ChevronRight, 
  Award,
  Stethoscope,
  Calendar
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const userRole = session?.user?.role || "warga";
  const userId = session?.user?.id;

  // Jika Login sebagai Warga, tampilkan Dashboard Personal
  if (userRole === "warga" && userId) {
    // Ambil data warga yang terhubung dengan user ini
    const userWithWarga = await prisma.user.findUnique({
      where: { id: userId },
      include: { 
        warga: {
          include: {
            rekamMedis: { orderBy: { tanggal: "desc" }, take: 1 },
            stunting: { orderBy: { tanggal: "desc" }, take: 1 },
            pesertaKelas: { include: { kelas: true } },
            telemedicine: { where: { status: "Antrian" } }
          }
        }
      }
    });

    const warga = userWithWarga?.warga;
    const notifikasi = await prisma.notifikasi.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
      take: 3
    });

    return (
      <div className="space-y-6">
        <PageTitle fitur={`Halo, ${session?.user?.name}!`} modul="Portal Warga Desa Borneo" color="#5E35B1" />

        {/* NOTIFIKASI SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Bell className="text-purple-500" size={18} /> Pengumuman & Notifikasi Desa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifikasi.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">Belum ada pengumuman baru untuk Anda.</p>
                ) : notifikasi.map(n => (
                  <div key={n.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{n.judul}</p>
                      <p className="text-xs text-slate-500">{n.pesan}</p>
                    </div>
                    <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-bold uppercase">{n.tipe}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white border-none shadow-xl">
            <CardContent className="p-6 flex flex-col h-full justify-center">
              <div>
                <p className="text-purple-100 text-xs font-bold uppercase tracking-wider mb-1">Status Kependudukan</p>
                <h3 className="text-2xl font-bold mb-4">{warga?.nama || session?.user?.name}</h3>
                <div className="space-y-2 opacity-90 text-sm">
                  <p className="flex justify-between gap-4"><span>NIK:</span> <span className="font-mono">{warga?.nik || "-"}</span></p>
                  <p className="flex justify-between gap-4"><span>Status:</span> <span className="bg-white/20 px-2 rounded-md">Aktif / Terverifikasi</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FEATURE GRID (SMART SEHAT, BELAJAR, ADAT) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* SMART SEHAT */}
          <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-orange-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-orange-600 flex items-center gap-2">
                <HeartPulse size={18} /> Smart Sehat
              </CardTitle>
              <Link href="/sehat" className="text-[10px] text-slate-400 hover:text-orange-500 font-bold uppercase">Buka Modul</Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex items-center gap-3 mb-2">
                  <Stethoscope className="text-orange-500" size={20} />
                  <div>
                    <p className="text-[10px] font-bold text-orange-400 uppercase">Rekam Medis Terakhir</p>
                    <p className="text-xs font-bold text-slate-700">{warga?.rekamMedis?.[0]?.diagnosis || "Belum ada riwayat"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="text-orange-500" size={20} />
                  <div>
                    <p className="text-[10px] font-bold text-orange-400 uppercase">Status Gizi (Stunting)</p>
                    <p className="text-xs font-bold text-slate-700">{warga?.stunting?.[0]?.kategori || "Normal"}</p>
                  </div>
                </div>
              </div>
              <Link href="/sehat/telemedicine" className="block text-center text-xs font-bold py-2 bg-orange-500 text-white rounded-lg">
                Daftar Telemedicine Online
              </Link>
            </CardContent>
          </Card>

          {/* SMART BELAJAR */}
          <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-blue-600 flex items-center gap-2">
                <BookOpen size={18} /> Smart Belajar
              </CardTitle>
              <Link href="/belajar" className="text-[10px] text-slate-400 hover:text-blue-500 font-bold uppercase">Buka Modul</Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="text-blue-500" size={20} />
                  <div>
                    <p className="text-[10px] font-bold text-blue-400 uppercase">Kelas Virtual Anda</p>
                    <p className="text-xs font-bold text-slate-700">{warga?.pesertaKelas?.[0]?.kelas?.nama || "Belum ada kelas aktif"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="text-blue-500" size={20} />
                  <div>
                    <p className="text-[10px] font-bold text-blue-400 uppercase">Sertifikat Digital</p>
                    <p className="text-xs font-bold text-slate-700">{warga?.pesertaKelas?.filter(p => p.sertifikat).length || 0} Sertifikat Tersedia</p>
                  </div>
                </div>
              </div>
              <Link href="/belajar/e-learning" className="block text-center text-xs font-bold py-2 bg-blue-600 text-white rounded-lg">
                Mulai Belajar Budaya Lokal
              </Link>
            </CardContent>
          </Card>

          {/* SMART ADAT */}
          <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-green-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-green-700 flex items-center gap-2">
                <MapIcon size={18} /> Smart Adat
              </CardTitle>
              <Link href="/adat" className="text-[10px] text-slate-400 hover:text-green-600 font-bold uppercase">Buka Modul</Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                <p className="text-[10px] font-bold text-green-400 uppercase mb-2 text-center">Agenda Musyawarah Mendatang</p>
                <div className="text-center py-2">
                  <p className="text-sm font-bold text-slate-800">Musyawarah Adat Bulanan</p>
                  <p className="text-[10px] text-slate-500">Minggu, 12 Mei 2024 • Balai Desa</p>
                </div>
              </div>
              <Link href="/adat/arsip" className="block text-center text-xs font-bold py-2 bg-green-700 text-white rounded-lg">
                Baca Arsip & Hukum Adat
              </Link>
            </CardContent>
          </Card>

        </div>
      </div>
    );
  }

  // JIKA LOGIN SEBAGAI ADMIN / PEMERINTAH (TAMPILAN LAMA)
  const totalWarga = await prisma.warga.count();
  const pria = await prisma.warga.count({ where: { jenisKelamin: "L" } });
  const wanita = await prisma.warga.count({ where: { jenisKelamin: "P" } });
  const aktifKesehatan = await prisma.telemedicine.count();
  const desa = await prisma.desa.findFirst();
  const persenPria = totalWarga > 0 ? Math.round((pria / totalWarga) * 100) : 0;
  const persenWanita = totalWarga > 0 ? Math.round((wanita / totalWarga) * 100) : 0;

  return (
    <div>
      <PageTitle fitur="Dashboard Utama Admin" modul="Data Desa Adat Borneo" color="#5E35B1" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Warga" value={totalWarga} satuan="jiwa" barColor="purple" progress={100} />
        <StatCard label="Kelas Belajar Aktif" value={0} satuan="kelas" barColor="blue" progress={0} />
        <StatCard label="Kasus Kesehatan" value={aktifKesehatan} satuan="pasien" barColor="orange" progress={40} />
        <StatCard label="Musyawarah/Hukum" value={0} satuan="agenda" barColor="green" progress={0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Profil {desa?.nama ?? "Desa Adat Borneo"}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-slate-700">
              <p><strong>Kecamatan:</strong> {desa?.kecamatan ?? "-"}<br/><strong>Kabupaten:</strong> {desa?.kabupaten ?? "-"}</p>
              <p>{desa?.sejarah ?? "Platform Smart Layanan Village (SLV) Desa Adat Borneo..."}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Demografi (Real-time)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1"><span>Pria</span><span>{pria} jiwa ({persenPria}%)</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: `${persenPria}%` }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span>Wanita</span><span>{wanita} jiwa ({persenWanita}%)</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-pink-500 h-2 rounded-full" style={{ width: `${persenWanita}%` }}></div></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
