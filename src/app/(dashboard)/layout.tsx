"use client";
import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { RoleTabs } from "@/components/layout/RoleTabs";
import { SearchBar } from "@/components/layout/SearchBar";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans relative overflow-x-hidden">
      
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <AppSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* MOBILE HEADER TOGGLE */}
        <div className="lg:hidden flex items-center p-3 bg-white border-b border-slate-100 shadow-sm sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <span className="ml-3 font-bold text-emerald-800 text-sm">Desa Adat Borneo</span>
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <AppHeader />
          <div className="hidden md:block">
            <RoleTabs />
            <SearchBar />
          </div>
          <main className="flex-1 p-3 md:p-6 pb-20">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
