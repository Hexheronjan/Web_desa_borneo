"use client";

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Save,
  Edit3,
  CheckCircle2,
  IdCard,
  Calendar,
} from "lucide-react";
import { PageTitle } from "@/components/shared/PageTitle";
import { LayananSLVMetadataCards } from "@/components/layanan-slv/LayananSLVMetadataCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { layananSLVMetadata } from "@/lib/modul-config";

const COLOR = "#2e7d32";
const METADATA = layananSLVMetadata["Profil Saya"];

export default function ProfilSayaPage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    namaLengkap: "Andi Saputra",
    username: "layanan_andi",
    email: "layanan@borneo.id",
    nik: "6271011506890001",
    tempatLahir: "Palangka Raya",
    tanggalLahir: "1989-06-15",
    jenisKelamin: "Laki-laki",
    telepon: "0812-3456-7890",
    alamat: "Jl. Huma Betang No. 12, Desa Lung Anai",
    rt: "03",
    rw: "02",
  });

  const displayName = session?.user?.name || form.namaLengkap;
  const displayEmail = session?.user?.email || form.email;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  }

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Profil Saya" modul="Layanan SLV" color={COLOR} />
      <LayananSLVMetadataCards metadata={METADATA} color={COLOR} />

      {/* Hero profil */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-800 to-green-700 text-white p-6 md:p-8">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="h-20 w-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center flex-shrink-0">
            <User size={36} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-black leading-tight">{displayName}</h2>
            <p className="text-emerald-100 text-sm mt-1 flex items-center gap-1.5">
              <Mail size={14} /> {displayEmail}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 rounded-full bg-white/15 text-xs font-bold border border-white/20">
                Layanan SLV
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/30 text-xs font-bold border border-emerald-300/30 flex items-center gap-1">
                <CheckCircle2 size={12} /> Akun Terverifikasi
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsEditing((v) => !v)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-emerald-800 text-sm font-bold hover:bg-emerald-50 transition-colors"
          >
            {isEditing ? <Shield size={16} /> : <Edit3 size={16} />}
            {isEditing ? "Batal Edit" : "Edit Profil"}
          </button>
        </div>
      </div>

      {/* Form biodata */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <IdCard size={16} /> Biodata Layanan SLV
          </CardTitle>
          {saved && (
            <span className="text-xs font-bold text-green-700 flex items-center gap-1">
              <CheckCircle2 size={14} /> Profil berhasil diperbarui
            </span>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: "namaLengkap", label: "Nama Lengkap", icon: User },
              { key: "username", label: "Username", icon: User },
              { key: "email", label: "Email", icon: Mail, type: "email" },
              { key: "nik", label: "NIK", icon: IdCard },
              { key: "tempatLahir", label: "Tempat Lahir", icon: MapPin },
              { key: "tanggalLahir", label: "Tanggal Lahir", icon: Calendar, type: "date" },
              { key: "telepon", label: "Nomor Telepon", icon: Phone },
              { key: "alamat", label: "Alamat Lengkap", icon: MapPin, full: true },
            ].map((field) => {
              const Icon = field.icon;
              const value = form[field.key as keyof typeof form];
              return (
                <div key={field.key} className={field.full ? "md:col-span-2" : ""}>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                    <Icon size={12} /> {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    value={value}
                    disabled={!isEditing}
                    onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full h-10 px-3 rounded-md border border-slate-200 text-sm disabled:bg-slate-50 disabled:text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
              );
            })}

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Jenis Kelamin</label>
              <select
                value={form.jenisKelamin}
                disabled={!isEditing}
                onChange={(e) => setForm((prev) => ({ ...prev, jenisKelamin: e.target.value }))}
                className="w-full h-10 px-3 rounded-md border border-slate-200 text-sm disabled:bg-slate-50 disabled:text-slate-700 bg-white"
              >
                <option>Laki-laki</option>
                <option>Perempuan</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">RT</label>
                <input
                  value={form.rt}
                  disabled={!isEditing}
                  onChange={(e) => setForm((prev) => ({ ...prev, rt: e.target.value }))}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 text-sm disabled:bg-slate-50"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">RW</label>
                <input
                  value={form.rw}
                  disabled={!isEditing}
                  onChange={(e) => setForm((prev) => ({ ...prev, rw: e.target.value }))}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 text-sm disabled:bg-slate-50"
                />
              </div>
            </div>

            {isEditing && (
              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 h-10 rounded-lg text-white text-sm font-bold"
                  style={{ backgroundColor: COLOR }}
                >
                  <Save size={16} /> Simpan Perubahan Profil
                </button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
