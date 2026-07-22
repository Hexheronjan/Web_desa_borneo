"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Users, CheckCircle2, RefreshCw, FileText } from "lucide-react";
import { PageTitle } from "@/components/shared/PageTitle";
import { LayananSLVMetadataCards } from "@/components/layanan-slv/LayananSLVMetadataCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { layananSLVMetadata } from "@/lib/modul-config";

const COLOR = "#2e7d32";
const METADATA = layananSLVMetadata["Musyawarah Digital"];
const MODULE_PATH = "/layanan-slv/musyawarah-digital";

interface AgendaItem {
  id: string;
  title: string;
  category: string;
  description: string;
  valueText: string;
  status: string;
  createdAt: string;
}

export default function MusyawarahDigitalPage() {
  const [agendas, setAgendas] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAgendas();
  }, []);

  async function loadAgendas() {
    try {
      const res = await fetch(`/api/module-records?path=${MODULE_PATH}`);
      const data = await res.json();
      if (data.records) {
        setAgendas(data.records);
      }
    } catch (error) {
      console.error("Gagal load data:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Musyawarah Digital" modul="Masyarakat Umum" color={COLOR} />
      <LayananSLVMetadataCards metadata={METADATA} color={COLOR} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sidebar Info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Calendar size={16} /> Agenda Musyawarah
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <p className="text-xs font-bold text-emerald-800 mb-2">Total Agenda</p>
              <p className="text-2xl font-black text-emerald-600">{agendas.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <p className="text-xs font-bold text-blue-800 mb-2">Sedang Voting</p>
              <p className="text-2xl font-black text-blue-600">
                {agendas.filter(a => a.status === "Aktif").length}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
              <p className="text-xs font-bold text-green-800 mb-2">Keputusan Selesai</p>
              <p className="text-2xl font-black text-green-600">
                {agendas.filter(a => a.status === "Selesai").length}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
              Daftar Agenda & Keputusan
            </CardTitle>
            <button
              onClick={loadAgendas}
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
            ) : agendas.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">Belum ada agenda musyawarah.</p>
            ) : (
              agendas.map((agenda) => {
                // Parse valueText
                const pesertaMatch = agenda.valueText?.match(/Peserta:\s*(\d+)/);
                const statusMatch = agenda.valueText?.match(/Status:\s*([^|]+)/);
                const peserta = pesertaMatch ? parseInt(pesertaMatch[1]) : 0;
                const votingStatus = statusMatch ? statusMatch[1].trim() : agenda.status;
                const date = new Date(agenda.createdAt).toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric' 
                });

                return (
                  <div key={agenda.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-emerald-50/50 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${
                            agenda.status === "Aktif" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                          }`}>
                            {agenda.status}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border text-slate-600">
                            {agenda.category}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-slate-800">{agenda.title}</p>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{agenda.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                          <span className="inline-flex items-center gap-1">
                            <Users size={12} /> {peserta} peserta
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock size={12} /> {date}
                          </span>
                        </div>
                      </div>
                      {agenda.status === "Selesai" && (
                        <div className="flex-shrink-0">
                          <div className="flex items-center gap-2 text-xs font-bold text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                            <CheckCircle2 size={14} />
                            Keputusan
                          </div>
                        </div>
                      )}
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
