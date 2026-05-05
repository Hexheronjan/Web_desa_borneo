"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createWargaBaru, createPetugasBaru, deleteUser } from "@/actions/admin";
import { ActionButton } from "@/components/shared/ActionButton";

export function UserManagementClient({ initialUsers, color }: { initialUsers: any[], color: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [mode, setMode] = useState<"warga" | "petugas">("warga");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nik, setNik] = useState("");
  const [role, setRole] = useState("warga");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    let res;
    if (mode === "warga") {
      res = await createWargaBaru({ nik, nama, email, role: "warga" });
    } else {
      res = await createPetugasBaru({ nama, email, role });
    }

    if (res.success) {
      alert("✅ Berhasil mendaftarkan pengguna baru ke Database!");
      setIsModalOpen(false);
      setNama(""); setEmail(""); setNik("");
    } else {
      alert("Gagal: " + res.error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex gap-3 mb-2">
        <Button onClick={() => { setMode("warga"); setIsModalOpen(true); }} style={{ backgroundColor: color }}>
          + Daftarkan Warga Baru
        </Button>
        <Button onClick={() => { setMode("petugas"); setIsModalOpen(true); }} variant="outline" style={{ color: color, borderColor: color }}>
          + Tambah Petugas (Nakes/Guru)
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold" style={{ color: color }}>
            👥 Daftar Pengguna Sistem (Live DB)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {initialUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">{u.name}</td>
                    <td className="px-4 py-3 text-slate-500">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ActionButton 
                        label="Hapus" 
                        action={deleteUser} 
                        id={u.id} 
                        variant="ghost" 
                        className="text-red-500 hover:text-red-700 text-xs" 
                        successMessage="User telah dihapus."
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* MODAL PENDAFTARAN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#E07B2A] px-6 py-4 text-white">
              <h2 className="font-bold text-lg">{mode === "warga" ? "Pendaftaran Warga Baru" : "Tambah Petugas Desa"}</h2>
              <p className="text-orange-100 text-xs opacity-90">Entri Data ke MySQL</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Lengkap</label>
                <input type="text" required value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama Lengkap" className="w-full border rounded-lg p-2.5 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Alamat Email (Login)</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@borneo.id" className="w-full border rounded-lg p-2.5 text-sm" />
              </div>
              
              {mode === "warga" ? (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">NIK (16 Digit)</label>
                  <input type="text" required value={nik} onChange={(e) => setNik(e.target.value)} placeholder="1234567890123456" className="w-full border rounded-lg p-2.5 text-sm" />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Pilih Jabatan/Peran</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border rounded-lg p-2.5 text-sm bg-white">
                    <option value="nakes_posyandu">Tenaga Kesehatan (Nakes)</option>
                    <option value="guru_fasilitator">Guru / Fasilitator</option>
                    <option value="pemerintah_desa">Pemerintah Desa (Sekdes/Staf)</option>
                    <option value="lembaga_adat">Pengurus Lembaga Adat</option>
                  </select>
                </div>
              )}

              <p className="text-[10px] text-slate-400 italic">*Password default untuk pendaftaran baru adalah: <strong>password123</strong></p>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button type="submit" disabled={loading} className="bg-[#E07B2A] hover:bg-[#c26721] text-white px-8">
                  {loading ? "Memproses..." : "Daftarkan Sekarang"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
