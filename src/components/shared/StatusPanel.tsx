// StatusPanel — panel kanan, daftar RW/RT per Aktif/Review/Baru

type StatusType = "Aktif" | "Review" | "Baru";

interface RwRtItem {
  rw: string;
  count: number;
  status: StatusType;
}

interface StatusPanelProps {
  title: string; // "Status Peserta" | "Status Kasus" | "Status Proses"
  items: RwRtItem[];
}

const badgeConfig: Record<StatusType, { bg: string; text: string }> = {
  Aktif: { bg: "bg-blue-100", text: "text-blue-700" },
  Review: { bg: "bg-yellow-100", text: "text-yellow-700" },
  Baru: { bg: "bg-slate-100", text: "text-slate-600" },
};

export function StatusPanel({ title, items }: StatusPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="px-5 py-3 border-b border-slate-100">
        <h3 className="font-bold text-sm text-slate-800">{title}</h3>
      </div>
      <div className="flex-1 p-4 space-y-2.5 overflow-y-auto">
        {items.map((item, i) => {
          const badge = badgeConfig[item.status];
          return (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50 hover:bg-white transition-colors"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">{item.rw}</p>
                <p className="text-xs text-slate-500">{item.count} entri</p>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}
              >
                {item.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
