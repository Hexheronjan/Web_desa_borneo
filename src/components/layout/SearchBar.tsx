"use client";

import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="px-4 py-2 bg-slate-50 border-b flex-shrink-0">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="search"
          placeholder="Cari data, fitur, warga, dokumen, atau laporan..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent"
        />
      </div>
    </div>
  );
}
