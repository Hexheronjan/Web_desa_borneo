// PageTitle — Vivid gradient strip + judul + sub-deskripsi

interface PageTitleProps {
  fitur: string;
  modul: string;
  color: string;
}

export function PageTitle({ fitur, modul, color }: PageTitleProps) {
  return (
    <div
      className="rounded-xl px-5 py-4 mb-2 border flex items-center gap-4"
      style={{
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        borderColor: `${color}30`,
      }}
    >
      <div
        className="w-1 self-stretch rounded-full flex-shrink-0 min-h-[40px]"
        style={{ backgroundColor: color }}
      />
      <div className="flex-1 min-w-0">
        <h2
          className="text-xl md:text-2xl font-extrabold leading-tight truncate"
          style={{ color }}
        >
          {fitur}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Modul: <span className="font-semibold text-slate-600">{modul}</span>
        </p>
      </div>
      <div
        className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg text-white text-lg font-black flex-shrink-0"
        style={{ backgroundColor: color }}
      >
        {fitur.charAt(0).toUpperCase()}
      </div>
    </div>
  );
}
