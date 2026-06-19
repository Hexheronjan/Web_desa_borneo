"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Leaf, Users, Map, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setEmailError(false);
    setPassError(false);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/");
      router.refresh();
    } else {
      setIsLoading(false);
      // NextAuth wraps custom errors in "Error: ..."
      if (result?.error?.includes("EMAIL_SALAH")) {
        setErrorMsg("Email ini tidak terdaftar di sistem kami.");
        setEmailError(true);
      } else if (result?.error?.includes("KATA_SANDI_SALAH")) {
        setErrorMsg("Kata sandi yang Anda masukkan salah.");
        setPassError(true);
      } else {
        setErrorMsg("Terjadi kesalahan. Cek kembali email & kata sandi.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-slate-50">
      
      {/* ── LEFT SIDE (Branding & Theme) ── */}
      <div className="w-full md:w-[45%] lg:w-1/2 relative bg-emerald-950 flex flex-col justify-between p-8 lg:p-16 overflow-hidden hidden md:flex text-emerald-50">
        
        {/* Background Graphic/Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lime-600/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="p-2.5 bg-emerald-500/20 rounded-xl backdrop-blur-md border border-emerald-500/30">
              <Leaf className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Desa Borneo</h1>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-semibold leading-[1.15] text-white">
              Menjaga Tradisi.<br />
              <span className="text-emerald-400">Membangun Masa Depan.</span>
            </h2>
            <p className="text-emerald-100/80 text-lg leading-relaxed max-w-md">
              Sistem informasi desa adat terpadu untuk pelayanan masyarakat, kesehatan balita, pengarsipan adat, dan pembelajaran digital berkelanjutan.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex gap-4 text-emerald-200/60 text-sm">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4"/> Aman</span>
          <span className="flex items-center gap-1.5"><Users className="w-4 h-4"/> Terintegrasi</span>
          <span className="flex items-center gap-1.5"><Map className="w-4 h-4"/> Geospasial</span>
        </div>
      </div>

      {/* ── RIGHT SIDE (Login Form) ── */}
      <div className="w-full md:w-[55%] lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative bg-white">
        
        <div className="w-full max-w-[420px] space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Selamat Datang</h1>
            <p className="text-slate-500 text-sm">Masuk ke portal layanan Desa Adat Borneo</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <span className="text-base">⚠️</span> {errorMsg}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">Alamat Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="cth: warga@borneo.id" 
                className={`h-12 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 ${emailError ? 'border-red-500 ring-red-100' : ''}`}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700">Kata Sandi</Label>
                <a href="#" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">Lupa sandi?</a>
              </div>
              <div className="relative group">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  placeholder="••••••••" 
                  className={`h-12 pr-12 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 ${passError ? 'border-red-500 ring-red-100' : ''}`}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98]"
            >
              {isLoading ? "Memverifikasi..." : "Masuk ke Sistem"}
            </Button>
          </form>

                   <div className="mt-8 rounded-3xl border-2 border-emerald-100 bg-emerald-50/30 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-widest">Akses Akun Demo (Live Data)</h3>
            </div>
            <p className="text-[10px] text-slate-500 mb-3">Klik kartu untuk mengisi form login otomatis ↓</p>
            
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'ADMIN', email: 'admin@borneo.id', border: 'border-blue-100 hover:border-blue-400', badge: 'bg-blue-100 text-blue-700' },
                { label: 'OPERATOR', email: 'operator@borneo.id', border: 'border-teal-100 hover:border-teal-400', badge: 'bg-teal-100 text-teal-700' },
                { label: 'PEMDES', email: 'pemdes@borneo.id', border: 'border-indigo-100 hover:border-indigo-400', badge: 'bg-indigo-100 text-indigo-700' },
                { label: 'BPD', email: 'bpd@borneo.id', border: 'border-violet-100 hover:border-violet-400', badge: 'bg-violet-100 text-violet-700' },
                { label: 'ADAT', email: 'adat@borneo.id', border: 'border-emerald-100 hover:border-emerald-400', badge: 'bg-emerald-100 text-emerald-700' },
                { label: 'GURU', email: 'guru@borneo.id', border: 'border-purple-100 hover:border-purple-400', badge: 'bg-purple-100 text-purple-700' },
                { label: 'NAKES', email: 'nakes@borneo.id', border: 'border-orange-100 hover:border-orange-400', badge: 'bg-orange-100 text-orange-700' },
                { label: 'WARGA', email: 'warga@borneo.id', border: 'border-pink-100 hover:border-pink-400', badge: 'bg-pink-100 text-pink-700' },
                { label: 'DINAS PMD', email: 'dinas@borneo.id', border: 'border-sky-100 hover:border-sky-400', badge: 'bg-sky-100 text-sky-700' },
                { label: 'PENELITI', email: 'peneliti@borneo.id', border: 'border-slate-200 hover:border-slate-400', badge: 'bg-slate-100 text-slate-700' },
                { label: 'LAYANAN', email: 'layanan@borneo.id', border: 'border-green-100 hover:border-green-500 col-span-2', badge: 'bg-green-100 text-green-700' },
              ].map((demo) => (
                <button
                  key={demo.email}
                  type="button"
                  onClick={() => { setEmail(demo.email); setPassword('password123'); }}
                  className={`flex flex-col p-2 bg-white rounded-lg border shadow-sm transition-all text-[10px] cursor-pointer text-left active:scale-95 ${demo.border} ${demo.label === 'LAYANAN' ? 'col-span-2' : ''}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`px-1.5 py-0.5 rounded font-black text-[9px] ${demo.badge}`}>{demo.label}</span>
                    <span className="text-[8px] text-emerald-600 font-bold">▶ Klik isi</span>
                  </div>
                  <span className="font-mono text-slate-600 font-bold truncate">{demo.email}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400 italic bg-white/50 p-2 rounded-lg border border-dashed border-slate-200">
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <span>Semua akun menggunakan Password <b>password123</b></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
