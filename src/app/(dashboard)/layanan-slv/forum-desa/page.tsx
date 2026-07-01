"use client";

import { FormEvent, useState, useEffect } from "react";
import { MessageSquare, Send, User, Clock, RefreshCw } from "lucide-react";
import { PageTitle } from "@/components/shared/PageTitle";
import { LayananSLVMetadataCards } from "@/components/layanan-slv/LayananSLVMetadataCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { layananSLVMetadata } from "@/lib/modul-config";

const COLOR = "#2e7d32";
const METADATA = layananSLVMetadata["Forum Desa"];
const MODULE_PATH = "/layanan-slv/forum-desa";

interface Topic {
  id: string;
  title: string;
  category: string;
  description: string;
  valueText: string;
  status: string;
  createdAt: string;
}

export default function ForumDesaPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Umum");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load data from database
  useEffect(() => {
    loadTopics();
  }, []);

  async function loadTopics() {
    try {
      const res = await fetch(`/api/module-records?path=${MODULE_PATH}`);
      const data = await res.json();
      if (data.records) {
        setTopics(data.records);
      }
    } catch (error) {
      console.error("Gagal load data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    setSubmitting(true);
    try {
      const res = await fetch("/api/module-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modulePath: MODULE_PATH,
          moduleName: "Forum Desa",
          title: title.trim(),
          category,
          description: content.trim(),
          valueText: `Penulis: Andi Saputra | Balasan: 0`,
          status: "Aktif",
          createdBy: "layanan_slv",
        }),
      });
      
      if (res.ok) {
        setTitle("");
        setContent("");
        setCategory("Umum");
        await loadTopics(); // Refresh data
      }
    } catch (error) {
      console.error("Gagal submit:", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Forum Desa" modul="Layanan SLV" color={COLOR} />
      <LayananSLVMetadataCards metadata={METADATA} color={COLOR} />

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Send size={16} /> Buat Topik Diskusi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Topik diskusi / pertanyaan warga"
                className="w-full h-10 px-3 rounded-md border border-slate-200 text-sm"
                disabled={submitting}
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-slate-200 text-sm bg-white"
                disabled={submitting}
              >
                {["Umum", "Gotong Royong", "Infrastruktur", "Pendidikan", "Kesehatan"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={5}
                placeholder="Tulis pertanyaan atau usulan Anda..."
                className="w-full px-3 py-2 rounded-md border border-slate-200 text-sm resize-none"
                disabled={submitting}
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-10 rounded-md text-white text-sm font-bold inline-flex items-center justify-center gap-2 disabled:opacity-50"
                style={{ backgroundColor: COLOR }}
              >
                {submitting ? <RefreshCw size={16} className="animate-spin" /> : <MessageSquare size={16} />}
                {submitting ? "Mengirim..." : "Kirim Diskusi"}
              </button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
              Daftar Forum Desa
            </CardTitle>
            <button
              onClick={loadTopics}
              className="text-xs flex items-center gap-1 text-slate-500 hover:text-slate-700"
              disabled={loading}
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <p className="text-xs text-slate-500 text-center py-4">Memuat data...</p>
            ) : topics.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">Belum ada topik diskusi. Buat topik baru!</p>
            ) : (
              topics.map((topic) => {
                // Parse valueText to extract author and replies
                const authorMatch = topic.valueText?.match(/Penulis:\s*([^|]+)/);
                const repliesMatch = topic.valueText?.match(/Balasan:\s*(\d+)/);
                const author = authorMatch ? authorMatch[1].trim() : "Anonim";
                const replies = repliesMatch ? parseInt(repliesMatch[1]) : 0;
                const time = new Date(topic.createdAt).toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div key={topic.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-emerald-50/50 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800">{topic.title}</p>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{topic.description}</p>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1"><User size={12} /> {author}</span>
                          <span className="inline-flex items-center gap-1"><Clock size={12} /> {time}</span>
                        </p>
                      </div>
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full flex-shrink-0 ${
                        topic.status === "Aktif" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                      }`}>
                        {topic.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border text-slate-600">{topic.category}</span>
                      <span className="text-[10px] text-slate-400">{replies} balasan</span>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
