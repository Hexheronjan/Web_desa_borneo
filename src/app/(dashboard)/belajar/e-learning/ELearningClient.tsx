"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActionButton } from "@/components/shared/ActionButton";
import { deleteMateri, postDiskusi } from "@/actions/belajar";
import { useUserRole } from "@/hooks/useUserRole";
import { Download, MessageSquare, Award, BookOpen } from "lucide-react";

interface ELearningClientProps {
  initialMateri: any[];
  forumData: any;
  sertifikatList: any[];
  userId: string;
  color: string;
}

export default function ELearningClient({ initialMateri, forumData, sertifikatList, userId, color }: ELearningClientProps) {
  const { isWarga } = useUserRole();
  const [activeTab, setActiveTab] = useState<"materi" | "forum" | "sertifikat">("materi");
  const [forumPost, setForumPost] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handlePostForum = async () => {
    if (!forumPost.trim() || !forumData?.id || !userId) return;
    setIsPosting(true);
    try {
      await postDiskusi({
        forumId: forumData.id,
        userId: userId,
        pesan: forumPost
      });
      setForumPost("");
    } catch (error) {
      alert("Gagal mengirim pesan");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 border-b border-slate-200">
        {(["materi", "forum", "sertifikat"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors border-b-2 ${activeTab === tab ? "border-[#1E5FA5] text-[#1E5FA5]" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            {tab === "materi" && <BookOpen size={16} />}
            {tab === "forum" && <MessageSquare size={16} />}
            {tab === "sertifikat" && <Award size={16} />}
            {tab === "materi" ? "Materi Belajar" : tab === "forum" ? "Forum Diskusi" : "Sertifikat Saya"}
          </button>
        ))}
      </div>

      {/* TAB MATERI */}
      {activeTab === "materi" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {initialMateri.length === 0 ? (
              <p className="text-sm text-slate-500 col-span-full text-center py-10">Belum ada materi pembelajaran.</p>
          ) : initialMateri.map((m) => (
            <Card key={m.id} className="border-slate-100 hover:border-blue-200 transition-all">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${m.tipe === "video" ? "bg-blue-100 text-blue-700" : m.tipe === "pdf" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {m.tipe.toUpperCase()}
                  </span>
                  {!isWarga && (
                      <ActionButton 
                        label="🗑️" 
                        action={deleteMateri} 
                        id={m.id} 
                        variant="ghost"
                        className="h-6 w-6 p-0 text-red-400 hover:text-red-600"
                        successMessage="Materi berhasil dihapus."
                      />
                  )}
                </div>
                <p className="font-semibold text-sm text-slate-800 mt-2">{m.judul}</p>
                <p className="text-xs text-slate-500 mt-1">Status: Tersedia untuk dipelajari</p>
                <Button
                  size="sm"
                  className="mt-3 w-full"
                  style={{ backgroundColor: color, color: "white" }}
                  onClick={() => window.open(m.url, "_blank")}
                >
                  {m.tipe === "kuis" ? "Mulai Kuis" : "Buka Materi"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* TAB FORUM */}
      {activeTab === "forum" && (
        <div className="space-y-4">
           <Card>
            <CardContent className="p-4">
              <textarea
                className="w-full border border-slate-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                rows={3}
                placeholder="Tanya sesuatu tentang materi di sini..."
                value={forumPost}
                onChange={e => setForumPost(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <Button 
                  size="sm" 
                  disabled={isPosting}
                  style={{ backgroundColor: color, color: "white" }} 
                  onClick={handlePostForum}
                >
                  {isPosting ? "Mengirim..." : "Kirim ke Forum"}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-3">
            {!forumData?.diskusi || forumData.diskusi.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-6">Belum ada diskusi di forum ini. Jadilah yang pertama bertanya!</p>
            ) : forumData.diskusi.map((f: any) => (
              <Card key={f.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-semibold text-blue-700">Warga Desa</p>
                    <p className="text-[10px] text-slate-400">{new Date(f.createdAt).toLocaleString()}</p>
                  </div>
                  <p className="text-sm text-slate-700">{f.pesan}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB SERTIFIKAT */}
      {activeTab === "sertifikat" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sertifikatList.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="p-10 text-center text-slate-400">
                <Award size={48} className="mx-auto mb-3 opacity-20" />
                <p className="font-semibold">Belum ada Sertifikat</p>
                <p className="text-xs mt-1">Selesaikan kelas atau tunggu penilaian guru untuk mendapatkan sertifikat digital.</p>
              </CardContent>
            </Card>
          ) : sertifikatList.map((s) => (
            <Card key={s.id} className="border-l-4 border-l-yellow-500 bg-yellow-50/30">
              <CardContent className="p-5 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-yellow-600 uppercase">Sertifikat Kelulusan</p>
                  <p className="font-bold text-slate-800">{s.kelas.nama}</p>
                  <p className="text-xs text-slate-500 mt-1">ID: {s.sertifikat}</p>
                </div>
                <Button size="sm" variant="outline" className="gap-2 border-yellow-500 text-yellow-700 hover:bg-yellow-50">
                  <Download size={14} /> Unduh PDF
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
