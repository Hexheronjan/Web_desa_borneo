"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionButton } from "@/components/shared/ActionButton";
import { approveArsip, deleteArsip } from "@/actions/adat";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";

export function ArsipList({ initialArsip, color }: { initialArsip: any[], color: string }) {
  const { isWarga } = useUserRole();
  const [previewFile, setPreviewFile] = useState<any>(null);

  return (
    <>
      <Card data-crud-form="true">
        <CardHeader>
          <CardTitle className="text-sm font-semibold" style={{ color: color }}>
            📂 Daftar Arsip Digital Desa (Live DB)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {initialArsip.length === 0 ? (
            <p className="text-center py-10 text-slate-400">Belum ada arsip yang diunggah.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {initialArsip.map((a) => (
                <div key={a.id} className="p-4 border rounded-xl hover:bg-green-50 transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{a.tipe} • {a.kategori}</span>
                      <h3 className="font-bold text-slate-800 mt-0.5">{a.judul}</h3>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${a.statusReview === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {a.statusReview}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100">
                    <div className="flex gap-2 items-center">
                      <span className="text-[10px] text-slate-400">Diunggah: {new Date(a.createdAt).toLocaleDateString()}</span>
                      <button
                        onClick={() => setPreviewFile(a)}
                        className="text-[10px] font-bold text-blue-600 hover:underline ml-2"
                      >
                        👁️ Buka File
                      </button>
                    </div>
                    <div className="flex gap-2">
                      {!isWarga && a.statusReview === "Review" && (
                        <ActionButton
                          label="Setujui"
                          action={approveArsip}
                          id={a.id}
                          variant="outline"
                          className="text-[10px] h-7 px-3 border-green-200 text-green-600 hover:bg-green-600 hover:text-white"
                          successMessage="Arsip telah disetujui."
                        />
                      )}
                      {!isWarga && (
                        <ActionButton
                          label="Hapus"
                          action={deleteArsip}
                          id={a.id}
                          variant="ghost"
                          className="text-[10px] h-7 px-3 text-red-400 hover:text-red-600"
                          successMessage="Arsip telah dihapus."
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Modal - REAL CONTENT VIEW */}
      {previewFile && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-white w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
              <div>
                <h2 className="font-bold text-slate-800 text-base">{previewFile.judul}</h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{previewFile.kategori} • {previewFile.tipe}</p>
              </div>
              <button onClick={() => setPreviewFile(null)} className="text-slate-400 hover:text-slate-600 text-3xl p-2">&times;</button>
            </div>

            <div className="flex-1 bg-slate-100 overflow-hidden relative">
              {(() => {
                const fileUrl: string = previewFile.url || "";
                const lowerUrl = fileUrl.toLowerCase();
                const isDbFile = fileUrl.startsWith("/api/adat/arsip/file");
                const isImage = previewFile.tipe === "foto" || /\.(png|jpe?g|webp|gif)(\b|$)/.test(lowerUrl);
                const isVideo = previewFile.tipe === "video" || /\.(mp4|webm|ogg)(\b|$)/.test(lowerUrl);
                const isPdf = /\.pdf(\b|$)/.test(lowerUrl);

                if (!isDbFile && fileUrl.startsWith("/uploads/")) {
                  return (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center gap-3 bg-white">
                      <div className="text-5xl">📄</div>
                      <h3 className="font-bold text-slate-800 text-base">{previewFile.judul}</h3>
                      <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                        Arsip ini diunggah sebelum penyimpanan file database diaktifkan, sehingga file fisiknya tidak tersimpan di server serverless. Silakan hapus arsip lama ini lalu unggah ulang agar file dapat dilihat &amp; diunduh langsung.
                      </p>
                    </div>
                  );
                }

                if (isImage) {
                  return (
                    <img
                      src={fileUrl}
                      alt={previewFile.judul}
                      className="w-full h-full object-contain bg-slate-900/5"
                    />
                  );
                }

                if (isVideo) {
                  return (
                    <video controls className="w-full h-full bg-black">
                      <source src={fileUrl} />
                      Browser Anda tidak mendukung pemutar video.
                    </video>
                  );
                }

                if (isPdf) {
                  return (
                    <iframe
                      src={fileUrl}
                      className="w-full h-full bg-white border-none"
                      title={previewFile.judul}
                    />
                  );
                }

                return (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center gap-4 bg-white">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-3xl">
                      📝
                    </div>
                    <div className="space-y-1 max-w-md">
                      <h3 className="font-bold text-slate-800 text-base">{previewFile.judul}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Dokumen Word/Office (<code>.docx / .xlsx</code>) tersimpan aman di database. Browser tidak dapat menampilkan pratinjau dokumen Word secara langsung — silakan klik tombol <strong>Unduh File Asli</strong> di bawah untuk membukanya.
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setPreviewFile(null)}>Tutup</Button>
              {previewFile.url?.startsWith("/api/adat/arsip/file") && (
                <a 
                  href={`${previewFile.url}${previewFile.url.includes("?") ? "&" : "?"}download=1`}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2"
                  style={{ backgroundColor: color, color: 'white' }}
                >
                  Unduh File Asli
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
