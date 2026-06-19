"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Database, Plus, RefreshCw, Trash2, CheckCircle2 } from "lucide-react";
import { getFiturFromPath, getRoleFromPath } from "@/lib/modul-config";
import { useSession } from "next-auth/react";

type ModuleRecord = {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  valueText: string | null;
  status: string;
  createdBy: string | null;
  createdAt: string;
};

const statusFlow = ["Baru", "Diproses", "Selesai"];

export function ModuleRecordsPanel() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const roleInfo = useMemo(() => getRoleFromPath(pathname, session?.user?.role), [pathname, session?.user?.role]);
  const moduleName = useMemo(() => getFiturFromPath(pathname, roleInfo), [pathname, roleInfo]);
  const [records, setRecords] = useState<ModuleRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState("");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
    valueText: "",
    description: "",
    status: "Baru",
  });

  const triggerNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const loadRecords = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/module-records?path=${encodeURIComponent(pathname)}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memuat data modul");
      setRecords(data.records || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat data modul");
    } finally {
      setLoading(false);
    }
  }, [pathname]);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const method = editingId ? "PATCH" : "POST";
      const isEdit = !!editingId;
      const res = await fetch("/api/module-records", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          id: editingId,
          modulePath: pathname,
          moduleName,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan data modul");
      setForm({ title: "", category: "", valueText: "", description: "", status: "Baru" });
      setEditingId("");
      await loadRecords();
      triggerNotification(isEdit ? "Berhasil! Data berhasil diperbarui." : "Berhasil! Data berhasil ditambahkan.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan data modul");
      triggerNotification(err instanceof Error ? err.message : "Gagal menyimpan data", "error");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(record: ModuleRecord) {
    setEditingId(record.id);
    setForm({
      title: record.title,
      category: record.category || "",
      valueText: record.valueText || "",
      description: record.description || "",
      status: record.status,
    });
    setError("");
  }

  function cancelEdit() {
    setEditingId("");
    setForm({ title: "", category: "", valueText: "", description: "", status: "Baru" });
    setError("");
  }

  async function updateStatus(record: ModuleRecord) {
    const currentIndex = statusFlow.indexOf(record.status);
    const nextStatus = statusFlow[(currentIndex + 1) % statusFlow.length] || "Diproses";
    setError("");
    const res = await fetch("/api/module-records", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: record.id,
        modulePath: pathname,
        title: record.title,
        category: record.category || "",
        valueText: record.valueText || "",
        description: record.description || "",
        status: nextStatus,
      }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Gagal mengubah status");
      triggerNotification(data.error || "Gagal mengubah status", "error");
      return;
    }
    await loadRecords();
    triggerNotification("Berhasil! Status data berhasil diubah.");
  }

  async function deleteRecord(record: ModuleRecord) {
    setError("");
    const res = await fetch(`/api/module-records?id=${encodeURIComponent(record.id)}&path=${encodeURIComponent(pathname)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Gagal menghapus data");
      triggerNotification(data.error || "Gagal menghapus data", "error");
      return;
    }
    await loadRecords();
    triggerNotification("Berhasil! Data berhasil dihapus.");
  }

  return (
    <section data-module-records-panel className="mb-6 border border-slate-200 bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-8 w-8 rounded-md flex items-center justify-center text-white" style={{ backgroundColor: roleInfo.warna }}>
            <Database size={16} />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-slate-800 truncate">Fitur Data Modul: Tambah, Edit, Hapus</h2>
            <p className="text-xs text-slate-500 truncate">{roleInfo.nama} - {moduleName}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={loadRecords}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold border rounded-md text-slate-600 hover:bg-slate-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[360px_1fr]">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            required
            minLength={3}
            placeholder={`Judul data ${moduleName}`}
            className="w-full h-10 px-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              placeholder="Kategori"
              className="w-full h-10 px-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
            <input
              value={form.valueText}
              onChange={(e) => setForm((prev) => ({ ...prev, valueText: e.target.value }))}
              placeholder="Nilai/target"
              className="w-full h-10 px-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
          <textarea
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Keterangan atau isi data"
            rows={4}
            className="w-full px-3 py-2 rounded-md border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
          <div className="flex gap-2">
            <select
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
              className="h-10 px-3 rounded-md border border-slate-200 text-sm bg-white"
            >
              {statusFlow.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 rounded-md text-white text-sm font-semibold disabled:opacity-60"
              style={{ backgroundColor: roleInfo.warna }}
            >
              <Plus size={16} />
              {saving ? "Menyimpan..." : editingId ? "Update Data" : "Tambah Data"}
            </button>
          </div>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="w-full h-9 rounded-md border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Batal Edit
            </button>
          )}
          {error && <p className="text-xs font-medium text-red-600">{error}</p>}
        </form>

        <div className="min-w-0">
          {records.length === 0 ? (
            <div className="h-full min-h-[220px] rounded-md border border-dashed border-slate-200 flex items-center justify-center text-center p-6">
              <p className="text-sm text-slate-500">Belum ada data real untuk modul ini. Tambahkan data pertama lewat form di samping.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-md border border-slate-100">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs text-slate-500">
                  <tr>
                    <th className="text-left p-3 min-w-[180px]">Judul</th>
                    <th className="text-left p-3">Kategori</th>
                    <th className="text-left p-3">Nilai</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3 min-w-[220px]">Keterangan</th>
                    <th className="text-right p-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id} className="border-t border-slate-100 align-top">
                      <td className="p-3 font-semibold text-slate-800">{record.title}</td>
                      <td className="p-3 text-slate-600">{record.category || "-"}</td>
                      <td className="p-3 text-slate-600">{record.valueText || "-"}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700">
                          <CheckCircle2 size={12} />
                          {record.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 max-w-[320px]">{record.description || "-"}</td>
                      <td className="p-3">
                        <div className="flex justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => startEdit(record)}
                            className="px-2.5 py-1.5 rounded-md border text-xs font-semibold text-blue-600 hover:bg-blue-50"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => updateStatus(record)}
                            className="px-2.5 py-1.5 rounded-md border text-xs font-semibold text-slate-600 hover:bg-slate-50"
                          >
                            Status
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteRecord(record)}
                            className="p-1.5 rounded-md border text-red-600 hover:bg-red-50"
                            title="Hapus"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {notification && (
        <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl border bg-white text-xs font-bold transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
             style={{
               borderColor: notification.type === "success" ? "#bbf7d0" : "#fecaca",
               color: notification.type === "success" ? "#15803d" : "#b91c1c",
             }}>
          <CheckCircle2 size={16} className={notification.type === "success" ? "text-green-600" : "text-red-600"} />
          <span>{notification.message}</span>
        </div>
      )}
    </section>
  );
}
