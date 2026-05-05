// Generic template for modul feature pages
// Used by all 15 feature pages to avoid code duplication

import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import { SchedulePanel } from "@/components/shared/SchedulePanel";
import { ActivityPanel } from "@/components/shared/ActivityPanel";
import { StatusPanel } from "@/components/shared/StatusPanel";

type BarColor = "blue" | "green" | "teal" | "orange" | "red" | "yellow" | "purple";

export interface StatCardData {
  label: string;
  value: number | string;
  satuan: string;
  barColor: BarColor;
  progress?: number;
}

export interface BatchItem {
  time: string;
  title: string;
  desc: string;
}

type StatusType = "Aktif" | "Review" | "Baru";

export interface RwRtItem {
  rw: string;
  count: number;
  status: StatusType;
}

interface ModulPageTemplateProps {
  fitur: string;
  modul: string;
  color: string;
  panelKiri: string;
  panelTengah: string;
  panelKanan: string;
  stats: StatCardData[];
  batches: BatchItem[];
  rwrts: RwRtItem[];
  customCenterPanel?: React.ReactNode;
}

export function ModulPageTemplate({
  fitur,
  modul,
  color,
  panelKiri,
  panelTengah,
  panelKanan,
  stats,
  batches,
  rwrts,
  customCenterPanel,
}: ModulPageTemplateProps) {
  return (
    <div className="h-full flex flex-col gap-4 p-3 md:p-5">
      <PageTitle fitur={fitur} modul={modul} color={color} />

      {/* Stat Cards - Optimized for Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* 3-Column Layout - Responsive Stacking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0">
        {/* Kiri ~35% */}
        <div className="lg:col-span-4 min-h-[300px] md:min-h-[420px]">
          <SchedulePanel title={panelKiri} items={batches} color={color} />
        </div>

        {/* Tengah ~40% */}
        <div className="lg:col-span-5 min-h-[350px] md:min-h-[420px]">
          {customCenterPanel ? customCenterPanel : <ActivityPanel title={panelTengah} featureName={fitur} color={color} />}
        </div>

        {/* Kanan ~25% */}
        <div className="lg:col-span-3 min-h-[300px] md:min-h-[420px]">
          <StatusPanel title={panelKanan} items={rwrts} />
        </div>
      </div>
    </div>
  );
}

// Default RW/RT data (same across all modules per spec)
export const defaultRwRt: RwRtItem[] = [
  { rw: "RW/RT 01", count: 24, status: "Aktif" },
  { rw: "RW/RT 02", count: 19, status: "Aktif" },
  { rw: "RW/RT 03", count: 17, status: "Review" },
  { rw: "RW/RT 04", count: 22, status: "Aktif" },
  { rw: "RW/RT 05", count: 14, status: "Baru" },
];

// Helper to build 5 batch items from feature name
export function buildBatches(featureName: string): BatchItem[] {
  return [
    { time: "08:30", title: `${featureName} Batch A`, desc: "Kegiatan pagi" },
    { time: "10:00", title: `${featureName} Batch B`, desc: "Layanan/kelas" },
    { time: "13:00", title: `${featureName} Batch C`, desc: "Pendampingan" },
    { time: "15:00", title: `${featureName} Batch D`, desc: "Validasi data" },
    { time: "19:00", title: `${featureName} Batch E`, desc: "Sesi malam" },
  ];
}
