// SchedulePanel — Panel jadwal/antrian/agenda dengan Batch A–E
interface BatchItem {
  time: string;
  title: string;
  desc: string;
}

interface SchedulePanelProps {
  title: string;       // e.g. "Jadwal/Kegiatan" | "Antrian/Jadwal" | "Agenda/Registrasi"
  items: BatchItem[];
  color: string;       // hex color
}

export function SchedulePanel({ title, items, color }: SchedulePanelProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="px-5 py-3 border-b border-slate-100">
        <h3 className="font-bold text-sm text-slate-800">{title}</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-1">
          {items.map((item, i) => (
            <div key={i} className="flex gap-3 py-2.5 border-b border-slate-50 last:border-0 group">
              {/* Timeline dot */}
              <div className="flex flex-col items-center gap-1 pt-0.5 flex-shrink-0">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                {i < items.length - 1 && (
                  <div className="w-px flex-1 bg-slate-200 min-h-[20px]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded text-white flex-shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    {item.time}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-800 mt-1 leading-tight">{item.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
