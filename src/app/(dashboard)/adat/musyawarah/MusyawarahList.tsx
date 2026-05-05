"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionButton } from "@/components/shared/ActionButton";
import { sahkanMusyawarah } from "@/actions/adat";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";

export function MusyawarahList({ initialMusyawarah, color }: { initialMusyawarah: any[], color: string }) {
  const { isWarga } = useUserRole();
  const [selectedRisalah, setSelectedRisalah] = useState<any>(null);
  
  const upcoming = initialMusyawarah.filter(m => !m.statusSah);
  const finished = initialMusyawarah.filter(m => m.statusSah);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold" style={{ color: color }}>
              📅 Agenda Musyawarah Mendatang
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcoming.length === 0 ? (
              <p className="text-center py-6 text-slate-400 text-sm">Tidak ada agenda mendatang.</p>
            ) : upcoming.map((m) => (
              <div key={m.id} className="p-3 border rounded-lg hover:bg-green-50 transition-colors flex justify-between items-center">
                <div>
                  <p className="font-bold text-sm text-slate-800">{m.judul}</p>
                  <p className="text-xs text-slate-500">{new Date(m.tanggal).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                {!isWarga && (
                  <ActionButton 
                    label="Sahkan" 
                    action={sahkanMusyawarah} 
                    id={m.id} 
                    variant="outline" 
                    className="text-[10px] h-7 border-green-200 text-green-600" 
                    successMessage="Keputusan musyawarah telah disahkan."
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold" style={{ color: color }}>
              ✅ Keputusan Resmi & Risalah
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {finished.length === 0 ? (
              <p className="text-center py-6 text-slate-400 text-sm">Belum ada musyawarah yang disahkan.</p>
            ) : finished.map((m) => (
              <div key={m.id} className="p-3 border rounded-lg bg-slate-50 flex justify-between items-center hover:bg-white transition-all border-l-4 border-l-green-600">
                <div>
                  <p className="font-bold text-sm text-slate-800">{m.judul}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Keputusan Sah</p>
                    <span className="text-[10px] text-slate-400">• {new Date(m.tanggal).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
