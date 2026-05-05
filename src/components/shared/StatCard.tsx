// StatCard — progress bar di atas, label, angka besar, satuan kecil
const barColorMap: Record<string, string> = {
  blue: "#1E5FA5",
  green: "#2E7D32",
  teal: "#0891b2",
  orange: "#E07B2A",
  red: "#dc2626",
  yellow: "#ca8a04",
  purple: "#5E35B1",
};

interface StatCardProps {
  label: string;
  value: number | string;
  satuan: string;
  barColor: "blue" | "green" | "teal" | "orange" | "red" | "yellow" | "purple";
  progress?: number; // 0–100, default 70
}

export function StatCard({ label, value, satuan, barColor, progress = 70 }: StatCardProps) {
  const color = barColorMap[barColor] ?? barColorMap.blue;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 flex flex-col gap-1 md:gap-2 shadow-sm hover:shadow-md transition-shadow">
      {/* Progress bar di atas */}
      <div className="w-full h-1 md:h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${progress}%`, backgroundColor: color }}
        />
      </div>

      {/* Label */}
      <p className="text-[10px] md:text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">{label}</p>

      {/* Angka besar */}
      <div className="flex items-end gap-2">
        <span className="text-2xl md:text-3xl font-black text-slate-800 leading-none">{value}</span>
        <span className="text-[10px] md:text-xs text-slate-400 pb-1">{satuan}</span>
      </div>
    </div>
  );
}
