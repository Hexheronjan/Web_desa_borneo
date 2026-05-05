// PageTitle — bullet warna modul + judul besar + sub-deskripsi

interface PageTitleProps {
  fitur: string;  // "E-Learning Budaya Lokal"
  modul: string;  // "Smart Belajar Adat"
  color: string;  // hex
}

export function PageTitle({ fitur, modul, color }: PageTitleProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <div
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        <h2 className="text-2xl font-extrabold text-slate-800 leading-tight">{fitur}</h2>
      </div>
      <p className="text-sm text-slate-500 mt-1.5 ml-6">
        Tampilan operasional fitur <span className="font-medium text-slate-700">{fitur}</span> pada modul <span className="font-medium text-slate-700">{modul}</span>.
      </p>
    </div>
  );
}
