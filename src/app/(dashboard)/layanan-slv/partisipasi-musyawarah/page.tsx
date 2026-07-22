"use client";

import { useState, useEffect } from "react";
import { Vote, CheckCircle2, Users, RefreshCw } from "lucide-react";
import { PageTitle } from "@/components/shared/PageTitle";
import { LayananSLVMetadataCards } from "@/components/layanan-slv/LayananSLVMetadataCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { layananSLVMetadata } from "@/lib/modul-config";

const COLOR = "#2e7d32";
const METADATA = layananSLVMetadata["Partisipasi Musyawarah"];
const MODULE_PATH = "/layanan-slv/partisipasi-musyawarah";

interface VotingItem {
  id: string;
  title: string;
  description: string;
  valueText: string;
  status: string;
  createdAt: string;
}

export default function PartisipasiMusyawarahPage() {
  const [votes, setVotes] = useState<VotingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadVotes();
  }, []);

  async function loadVotes() {
    try {
      const res = await fetch(`/api/module-records?path=${MODULE_PATH}`);
      const data = await res.json();
      if (data.records) {
        setVotes(data.records);
      }
    } catch (error) {
      console.error("Gagal load data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function castVote(id: string, choice: "setuju" | "tolak") {
    if (votedItems.has(id)) return;

    try {
      // Update voting di database
      const item = votes.find(v => v.id === id);
      if (!item) return;

      // Parse current votes
      const setujuMatch = item.valueText?.match(/Suara Setuju:\s*(\d+)/);
      const tolakMatch = item.valueText?.match(/Suara Tolak:\s*(\d+)/);
      const currentSetuju = setujuMatch ? parseInt(setujuMatch[1]) : 0;
      const currentTolak = tolakMatch ? parseInt(tolakMatch[1]) : 0;

      const newSetuju = choice === "setuju" ? currentSetuju + 1 : currentSetuju;
      const newTolak = choice === "tolak" ? currentTolak + 1 : currentTolak;

      const res = await fetch("/api/module-records", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          modulePath: MODULE_PATH,
          title: item.title,
          category: item.status,
          description: item.description,
          valueText: `Suara Setuju: ${newSetuju} | Suara Tolak: ${newTolak} | Total: ${newSetuju + newTolak}`,
          status: item.status,
        }),
      });

      if (res.ok) {
        setVotedItems(prev => new Set(prev).add(id));
        await loadVotes();
      }
    } catch (error) {
      console.error("Gagal submit vote:", error);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Partisipasi Musyawarah" modul="Masyarakat Umum" color={COLOR} />
      <LayananSLVMetadataCards metadata={METADATA} color={COLOR} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {loading ? (
          <p className="text-xs text-slate-500 text-center py-4 col-span-2">Memuat data...</p>
        ) : votes.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4 col-span-2">Belum ada agenda musyawarah.</p>
        ) : (
          votes.map((item) => {
            // Parse votes from valueText
            const setujuMatch = item.valueText?.match(/Suara Setuju:\s*(\d+)/);
            const tolakMatch = item.valueText?.match(/Suara Tolak:\s*(\d+)/);
            const setuju = setujuMatch ? parseInt(setujuMatch[1]) : 0;
            const tolak = tolakMatch ? parseInt(tolakMatch[1]) : 0;
            const total = setuju + tolak;
            const setujuPct = total ? Math.round((setuju / total) * 100) : 0;
            const tolakPct = total ? Math.round((tolak / total) * 100) : 0;
            const hasVoted = votedItems.has(item.id);

            return (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                    <Vote size={16} /> {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600">{item.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>Setuju ({setujuPct}%)</span>
                      <span>Tolak ({tolakPct}%)</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100 overflow-hidden flex">
                      <div className="h-full bg-emerald-500" style={{ width: `${setujuPct}%` }} />
                      <div className="h-full bg-red-400" style={{ width: `${tolakPct}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Users size={12} /> {total} suara terkumpul
                    </p>
                  </div>

                  {hasVoted ? (
                    <div className="flex items-center gap-2 text-sm font-bold text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                      <CheckCircle2 size={16} />
                      Suara Anda telah tercatat
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => castVote(item.id, "setuju")}
                        className="flex-1 h-10 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700"
                      >
                        Setuju
                      </button>
                      <button
                        type="button"
                        onClick={() => castVote(item.id, "tolak")}
                        className="flex-1 h-10 rounded-lg bg-red-500 text-white text-sm font-bold hover:bg-red-600"
                      >
                        Tolak
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
