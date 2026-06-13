"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, Pencil, Plus, Trash2 } from "lucide-react";
import { getFiturFromPath, getRoleFromPath } from "@/lib/modul-config";

type ActionMode = "Tambah" | "Edit" | "Hapus" | "Export" | "Proses";

type SavedAction = {
  id: string;
  title: string;
  category: ActionMode | string | null;
  description: string | null;
  status: string;
};

const actionWords = [
  "tambah",
  "registrasi",
  "buat",
  "input",
  "edit",
  "ubah",
  "hapus",
  "delete",
  "export",
  "download",
  "validasi",
  "approve",
  "sahkan",
  "sinkron",
  "backup",
  "restore",
  "kelola",
  "lihat",
  "detail",
  "simpan",
];

function textFromRow(button: HTMLButtonElement) {
  const row = button.closest("tr");
  if (!row) return "";
  return Array.from(row.querySelectorAll("td"))
    .map((td) => td.textContent?.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join(" | ")
    .slice(0, 500);
}

function inferMode(button: HTMLButtonElement, label: string): ActionMode {
  const lower = label.toLowerCase();
  const className = button.className.toString().toLowerCase();
  if (lower.includes("hapus") || lower.includes("delete") || className.includes("red")) return "Hapus";
  if (lower.includes("edit") || lower.includes("ubah") || className.includes("amber")) return "Edit";
  if (lower.includes("export") || lower.includes("download")) return "Export";
  if (lower.includes("tambah") || lower.includes("registrasi") || lower.includes("buat") || lower.includes("input")) return "Tambah";
  return "Proses";
}

function downloadCsv(filename: string) {
  const rows = Array.from(document.querySelectorAll("main table tr")).map((row) =>
    Array.from(row.querySelectorAll("th,td")).map((cell) => `"${(cell.textContent || "").replace(/\s+/g, " ").trim().replace(/"/g, '""')}"`).join(",")
  );
  const csv = "sep=,\n" + rows.filter(Boolean).join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function clearSyntheticRows() {
  document.querySelectorAll("[data-global-action-row]").forEach((row) => row.remove());
}

function findRowsByContext(context: string) {
  const key = context.split("|")[0]?.trim();
  if (!key) return [];
  return Array.from(document.querySelectorAll("main table tbody tr")).filter((row) =>
    row.textContent?.replace(/\s+/g, " ").includes(key)
  );
}

function appendSyntheticRow(action: SavedAction) {
  const tbody = document.querySelector("main table tbody");
  const table = tbody?.closest("table");
  const colCount = table?.querySelectorAll("thead th").length || 1;
  if (!tbody) return;

  const row = document.createElement("tr");
  row.setAttribute("data-global-action-row", action.id);
  row.className = "border-b bg-emerald-50/60";
  const cell = document.createElement("td");
  cell.colSpan = colCount;
  cell.className = "py-3 px-4 text-xs text-emerald-800";
  cell.textContent = `${action.category || "Aksi"} tersimpan: ${action.title} - ${action.description || "-"}`;
  row.appendChild(cell);
  tbody.prepend(row);
}

export function GlobalFunctionalActions() {
  const pathname = usePathname();
  const roleInfo = useMemo(() => getRoleFromPath(pathname), [pathname]);
  const moduleName = useMemo(() => getFiturFromPath(pathname, roleInfo), [pathname, roleInfo]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ActionMode>("Proses");
  const [actionLabel, setActionLabel] = useState("");
  const [rowContext, setRowContext] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const triggerNotification = useCallback((msg: string, type: "success" | "error" = "success") => {
    setNotification({ message: msg, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  }, []);

  const saveAction = useCallback(async (actionMode: ActionMode, actionTitle: string, actionDescription: string, status = "Selesai") => {
    const res = await fetch("/api/module-records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        modulePath: pathname,
        moduleName,
        title: actionTitle,
        category: actionMode,
        valueText: actionLabel || actionMode,
        description: actionDescription,
        status,
      }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Gagal menyimpan aksi");
    }
  }, [actionLabel, moduleName, pathname]);

  const applySavedActions = useCallback(async () => {
    try {
      const res = await fetch(`/api/module-records?path=${encodeURIComponent(pathname)}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      const actions = (data.records || []) as SavedAction[];
      clearSyntheticRows();

      actions.slice().reverse().forEach((action) => {
        if (action.category === "Hapus") {
          findRowsByContext(action.description || action.title).forEach((row) => {
            row.setAttribute("style", "display:none");
          });
          return;
        }

        if (action.category === "Edit") {
          const rows = findRowsByContext(action.title.replace(/^Edit\s*-\s*/i, "") || action.description || "");
          rows.forEach((row) => {
            row.classList.add("bg-amber-50");
            row.setAttribute("title", `Data sudah diedit: ${action.description || action.title}`);
          });
          appendSyntheticRow(action);
          return;
        }

        if (action.category === "Tambah" || action.category === "Proses") {
          appendSyntheticRow(action);
        }
      });
    } catch {
      // Non-blocking UI enhancement. The page itself should keep working.
    }
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const button = (event.target as HTMLElement).closest("button") as HTMLButtonElement | null;
      if (!button) return;
      if (!button.isConnected || button.disabled) return;
      if (button.closest("[data-real-action-root]")) return;
      if (button.closest("[data-module-records-panel]")) return;
      if (button.closest('[role="dialog"]')) return;
      if (button.closest("form") && (button.type === "submit" || !button.type)) return;
      if (button.closest("aside") || button.closest("header")) return;
      // Exclude mobile menu toggle button
      if (button.getAttribute("data-mobile-menu-toggle") === "true") return;

      const label = [
        button.innerText,
        button.getAttribute("title"),
        button.getAttribute("aria-label"),
        button.textContent,
      ].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
      const lower = label.toLowerCase();
      const hasKnownAction = actionWords.some((word) => lower.includes(word));
      const iconOnlyAction = !label && button.querySelector("svg");
      if (!hasKnownAction && !iconOnlyAction) return;

      const nextMode = inferMode(button, label);
      if (nextMode === "Export") {
        event.preventDefault();
        downloadCsv(`${moduleName.replace(/\s+/g, "_")}_${new Date().toISOString().slice(0, 10)}.csv`);
        saveAction("Export", label || "Export Data", "File CSV dibuat dari tabel yang sedang tampil.", "Selesai")
          .then(() => triggerNotification("Berhasil! Data berhasil diekspor ke Excel."))
          .catch(() => triggerNotification("Gagal mengekspor data.", "error"));
        return;
      }

      event.preventDefault();
      const context = textFromRow(button);
      const cleanLabel = label || nextMode;
      setMode(nextMode);
      setActionLabel(cleanLabel);
      setRowContext(context);
      setTitle(context ? `${nextMode} - ${context.split("|")[0].trim()}` : cleanLabel);
      setDescription(context || `Aksi ${cleanLabel} pada modul ${moduleName}`);
      setMessage("");
      setOpen(true);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [moduleName, pathname, saveAction, triggerNotification]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      applySavedActions();
    }, 500);
    return () => window.clearTimeout(timer);
  }, [applySavedActions]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const isHapus = mode === "Hapus";
      const isEdit = mode === "Edit";
      await saveAction(mode, title, description, isHapus ? "Dihapus" : "Selesai");
      setMessage("Aksi berhasil diproses dan tersimpan ke database.");
      if (isHapus) {
        findRowsByContext(rowContext).forEach((row) => row.setAttribute("style", "display:none"));
      }
      await applySavedActions();
      triggerNotification(isHapus ? "Berhasil! Data berhasil dihapus." : isEdit ? "Berhasil! Data berhasil diperbarui." : "Berhasil! Data berhasil ditambahkan.");
      setTimeout(() => setOpen(false), 700);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Aksi gagal diproses");
      triggerNotification(err instanceof Error ? err.message : "Gagal memproses aksi.", "error");
    } finally {
      setSaving(false);
    }
  }

  const Icon = mode === "Tambah" ? Plus : mode === "Edit" ? Pencil : mode === "Hapus" ? Trash2 : CheckCircle2;

  return (
    <div data-real-action-root>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              {mode} Data {moduleName}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={3}
              className="w-full h-10 rounded-md border px-3 text-sm"
              placeholder="Judul aksi/data"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full rounded-md border px-3 py-2 text-sm resize-none"
              placeholder="Keterangan data"
            />
            {rowContext && (
              <div className="rounded-md bg-slate-50 border px-3 py-2 text-xs text-slate-500">
                Data baris: {rowContext}
              </div>
            )}
            {message && (
              <div className={`rounded-md border px-3 py-2 text-xs font-semibold ${message.includes("gagal") || message.includes("Gagal") ? "bg-red-50 text-red-700 border-red-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                {message}
              </div>
            )}
            <button
              disabled={saving}
              className="w-full h-10 rounded-md text-white text-sm font-bold disabled:opacity-60"
              style={{ backgroundColor: mode === "Hapus" ? "#dc2626" : roleInfo.warna }}
            >
              {saving ? "Memproses..." : mode === "Hapus" ? "Konfirmasi Hapus" : "Simpan Aksi"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
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
    </div>
  );
}
