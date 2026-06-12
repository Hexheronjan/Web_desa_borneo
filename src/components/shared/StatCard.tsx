// StatCard — progress bar di atas, label, angka besar, satuan kecil, optional sparkline
import { MiniSparkline } from './MiniSparkline';

const barColorMap: Record<string, string> = {
  blue:   '#1E5FA5',
  green:  '#2E7D32',
  teal:   '#0891b2',
  orange: '#E07B2A',
  red:    '#dc2626',
  yellow: '#ca8a04',
  purple: '#5E35B1',
};

interface StatCardProps {
  label: string;
  value: number | string;
  satuan: string;
  barColor: 'blue' | 'green' | 'teal' | 'orange' | 'red' | 'yellow' | 'purple';
  progress?: number;         // 0–100, default 70
  sparkData?: number[];      // optional sparkline data
  trend?: 'up' | 'down' | 'flat';
}

export function StatCard({ label, value, satuan, barColor, progress = 70, sparkData, trend }: StatCardProps) {
  const color = barColorMap[barColor] ?? barColorMap.blue;
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : null;
  const trendColor = trend === 'up' ? '#16a34a' : trend === 'down' ? '#dc2626' : '#94a3b8';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 flex flex-col gap-1 md:gap-1.5 shadow-sm hover:shadow-md transition-shadow">
      {/* Progress bar di atas */}
      <div className="w-full h-1 md:h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${progress}%`, backgroundColor: color }}
        />
      </div>

      {/* Label */}
      <p className="text-[10px] md:text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">{label}</p>

      {/* Angka besar + trend */}
      <div className="flex items-end gap-2">
        <span className="text-2xl md:text-3xl font-black text-slate-800 leading-none">{value}</span>
        {trendIcon && (
          <span className="text-xs font-bold pb-1" style={{ color: trendColor }}>{trendIcon}</span>
        )}
      </div>
      <span className="text-[10px] md:text-xs text-slate-400">{satuan}</span>

      {/* Optional Sparkline */}
      {sparkData && sparkData.length >= 2 && (
        <div className="mt-1 -mx-1">
          <MiniSparkline data={sparkData} color={color} height={26} />
        </div>
      )}
    </div>
  );
}
