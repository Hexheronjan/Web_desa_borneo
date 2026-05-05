export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import { UserManagementClient } from "./UserManagementClient";

const COLOR = "#E07B2A";

export default async function PenggunaPage() {
  const [users, totalUsers, totalWarga, totalNakes] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count(),
    prisma.user.count({ where: { role: "warga" } }),
    prisma.user.count({ where: { role: "nakes_posyandu" } }),
  ]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Manajemen Pengguna & Akun" modul="Data Desa Borneo" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Akun" value={totalUsers} satuan="user" barColor="orange" progress={100} />
        <StatCard label="Warga Terdaftar" value={totalWarga} satuan="jiwa" barColor="green" progress={100} />
        <StatCard label="Nakes/Bidan" value={totalNakes} satuan="orang" barColor="blue" progress={100} />
        <StatCard label="Status Sistem" value="Online" satuan="Satu Data" barColor="teal" progress={100} />
      </div>

      <UserManagementClient initialUsers={users} color={COLOR} />
    </div>
  );
}

