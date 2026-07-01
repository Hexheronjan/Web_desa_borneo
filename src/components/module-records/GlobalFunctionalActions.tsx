"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { getFiturFromPath, getRoleFromPath } from "@/lib/modul-config";

/**
 * CATATAN PENTING:
 * - Komponen ini SEKARANG HANYA UNTUK:
 *   ✔ Hapus
 *   ✔ Export
 *   ✔ Proses non-form
 * - Tambah & Edit CRUD SUDAH DILARANG TOTAL
 */

type ActionMode = "Hapus" | "Export" | "Proses";

type SavedAction = {
  id: string;
  title: string;
  category: ActionMode | string | null;
  description: string | null;
  status: string;
};

/** ⛔ KATA KUNCI TAMBAH / EDIT / SIMPAN DIHAPUS */
const actionWords = [
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
  const className = button.className.toLowerCase();

  if (lower.includes("hapus") || lower.includes("delete") || className.includes("red")) return "Hapus";
  if (lower.includes("export") || lower.includes("download")) return "Export";
  return "Proses";
}

function downloadCsv(filename: string) {
  const rows = Array.from(document.querySelectorAll("main table tr")).map((row) =>
    Array.from(row.querySelectorAll("th,td")).map((cell) =>
      `"${(cell.textContent || "").replace(/\s+/g, " ").trim().replace(/"/g, '""')}"`
    ).join(",")
  );

  const csv = "sep=,\n" + rows.join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function GlobalFunctionalActions() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const roleInfo = useMemo(
    () => getRoleFromPath(pathname, session?.user?.role),
    [pathname, session?.user?.role]
  );

  const moduleName = useMemo(
    () => getFiturFromPath(pathname, roleInfo),
    [pathname, roleInfo]
  );

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ActionMode>("Proses");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const saveAction = useCallback(async () => {
    await fetch("/api/module-records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        modulePath: pathname,
        moduleName,
        title,
        category: mode,
        description,
        status: mode === "Hapus" ? "Dihapus" : "Selesai",
      }),
    });
  }, [pathname, moduleName, title, description, mode]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const button = (event.target as HTMLElement).closest("button") as HTMLButtonElement | null;
      if (!button) return;

      /** ⛔ BLOK TOTAL FORM CRUD */
      if (button.closest("form")) return;
      if (button.closest("[data-crud-form]")) return;
      if (button.closest('[role="dialog"]')) return;
      if (button.closest("aside") || button.closest("header")) return;

      const label = (
        button.innerText ||
        button.getAttribute("title") ||
        button.getAttribute("aria-label") ||
        ""
      ).trim();

      const lower = label.toLowerCase();
      if (!actionWords.some((w) => lower.includes(w))) return;

      const nextMode = inferMode(button, label);

      /** EXPORT LANGSUNG, TANPA MODAL */
      if (nextMode === "Export") {
        event.preventDefault();
        downloadCsv(`${moduleName}_${new Date().toISOString().slice(0, 10)}.csv`);
        setNotification("Berhasil mengekspor data.");
        return;
      }

      /** HANYA HAPUS / PROSES */
      event.preventDefault();
      setMode(nextMode);
      setTitle(`${nextMode} Data`);
      setDescription(textFromRow(button));
      setOpen(true);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [moduleName]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    await saveAction();
    setSaving(false);
    setOpen(false);
    setNotification("Aksi berhasil diproses.");
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              Konfirmasi {mode}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-sm text-slate-600">{description}</p>

            <button
              disabled={saving}
              className="w-full h-10 rounded-md bg-red-600 text-white font-bold disabled:opacity-60"
            >
              {saving ? "Memproses..." : "Konfirmasi"}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      {notification && (
        <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border-2 border-green-200 bg-white text-xs font-bold">
          <CheckCircle2 className="text-green-600" size={16} />
          {notification}
        </div>
      )}
    </>
  );
}