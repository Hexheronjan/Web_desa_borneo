"use client";

import { signIn } from "next-auth/react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Leaf, Users, Map, Eye, EyeOff } from "lucide-react";

// 7 Aktor Utama sesuai Use Case Diagram UML & Bab IV
const PRIMARY_UML_ACCOUNTS = [
  { label: 'ADMIN',            sublabel: 'Administrator Sistem',    email: 'admin@borneo.id',            border: 'border-blue-200 hover:border-blue-500',       badge: 'bg-blue-100 text-blue-800' },
  { label: 'TENAGA PENGAJAR',  sublabel: 'Guru/Tenaga Pendidikan',  email: 'guru@borneo.id',             border: 'border-purple-200 hover:border-purple-500',   badge: 'bg-purple-100 text-purple-800' },
  { label: 'TENAGA KESEHATAN', sublabel: 'Nakes Posyandu & SDG 3',  email: 'nakes@borneo.id',            border: 'border-orange-200 hover:border-orange-500',   badge: 'bg-orange-100 text-orange-800' },
  { label: 'LEMBAGA ADAT',     sublabel: 'Tata Kelola Adat & SDG 18', email: 'adat@borneo.id',           border: 'border-amber-200 hover:border-amber-500',     badge: 'bg-amber-100 text-amber-800' },
  { label: 'TOKOH MASYARAKAT', sublabel: 'Partisipasi & Pengawasan', email: 'tokoh.masyarakat@contoh.id', border: 'border-pink-200 hover:border-pink-500',       badge: 'bg-pink-100 text-pink-800' },
  { label: 'PEMERINTAH DESA',  sublabel: 'Musyawarah & DSS SAW',    email: 'pemdes@borneo.id',           border: 'border-indigo-200 hover:border-indigo-500',   badge: 'bg-indigo-100 text-indigo-800' },
  { label: 'MASYARAKAT UMUM',  sublabel: 'Portal Layanan Publik',   email: 'layanan@borneo.id',          border: 'border-emerald-200 hover:border-emerald-500', badge: 'bg-emerald-100 text-emerald-800', full: true },
];

// Peran Tambahan (Pendukung di luar 7 aktor utama UML)
const ADDITIONAL_ACCOUNTS = [
  { label: 'OPERATOR SID', sublabel: 'Pengelola Data SID',  email: 'operator.sid@borneo.id', border: 'border-teal-100 hover:border-teal-400',     badge: 'bg-teal-50 text-teal-700' },
  { label: 'PENELITI',     sublabel: 'Analitik & Evaluasi', email: 'peneliti@borneo.id',     border: 'border-slate-200 hover:border-slate-400',   badge: 'bg-slate-100 text-slate-700' },
  { label: 'BPD',          sublabel: 'Pengawasan Desa',     email: 'bpd@borneo.id',          border: 'border-violet-100 hover:border-violet-400', badge: 'bg-violet-50 text-violet-700' },
  { label: 'DINAS PMD',    sublabel: 'Pemantau Regional',   email: 'dinas.pmd@borneo.id',    border: 'border-sky-100 hover:border-sky-400',       badge: 'bg-sky-50 text-sky-700' },
];

export default function LoginPage() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]   = useState(false);
  const [errorMsg, setErrorMsg]     = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError]   = useState(false);

  // ── Isi form demo dengan nativeInputValueSetter agar React state + DOM sync ──
  function fillDemo(demoEmail: string) {
    const pw = "password123";

    // Update DOM langsung (bypass controlled-input caching)
    const nativeInputSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
    if (emailRef.current && nativeInputSetter) {
      nativeInputSetter.call(emailRef.current, demoEmail);
      emailRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
    if (passwordRef.current && nativeInputSetter) {
      nativeInputSetter.call(passwordRef.current, pw);
      passwordRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }

    // Update React state juga
    setEmail(demoEmail);
    setPassword(pw);
    setErrorMsg("");
    setEmailError(false);
    setPassError(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setEmailError(false);
    setPassError(false);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok && !result?.error) {
        router.push("/");
        router.refresh();
      } else {
        setIsLoading(false);
        if (result?.error?.includes("EMAIL_SALAH")) {
          setErrorMsg("Email ini tidak terdaftar di sistem kami.");
          setEmailError(true);
        } else if (result?.error?.includes("KATA_SANDI_SALAH")) {
          setErrorMsg("Kata sandi yang Anda masukkan salah.");
          setPassError(true);
        } else {
          setErrorMsg("Gagal masuk. Pastikan MySQL (Laragon) sudah berjalan serta email & kata sandi benar.");
        }
      }
    } catch {
      setIsLoading(false);
      setErrorMsg("Tidak dapat terhubung ke server autentikasi. Coba lagi.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-slate-50">

      {/* ── LEFT SIDE (Branding) ── */}
      <div className="w-full md:w-[45%] lg:w-1/2 relative bg-emerald-950 flex flex-col justify-between p-8 lg:p-16 overflow-hidden hidden md:flex text-emerald-50">
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
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Aman</span>
          <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> Terintegrasi</span>
          <span className="flex items-center gap-1.5"><Map className="w-4 h-4" /> Geospasial</span>
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
              <input
                ref={emailRef}
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="cth: tokoh.masyarakat@contoh.id"
                className={`h-12 w-full rounded-lg border bg-slate-50 px-3 text-sm outline-none transition-colors
                  focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200
                  ${emailError ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200'}`}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700">Kata Sandi</Label>
                <a href="#" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">Lupa sandi?</a>
              </div>
              <div className="relative">
                <input
                  ref={passwordRef}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`h-12 w-full rounded-lg border bg-slate-50 px-3 pr-12 text-sm outline-none transition-colors
                    focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200
                    ${passError ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200'}`}
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

          {/* ── DEMO ACCOUNTS: 7 AKTOR UTAMA UML + PERAN TAMBAHAN ── */}
          <div className="rounded-3xl border-2 border-emerald-100 bg-emerald-50/30 p-5 shadow-sm space-y-4">
            {/* Bagian Atas: 7 Aktor Utama UML & Bab IV */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-xs font-black text-emerald-950 uppercase tracking-wider">7 Aktor Utama (Sesuai UML &amp; Bab IV)</h3>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Use Case</span>
              </div>
              <p className="text-[10px] text-slate-500 mb-3">Klik kartu untuk mengisi form login otomatis ↓</p>

              <div className="grid grid-cols-2 gap-2">
                {PRIMARY_UML_ACCOUNTS.map((demo) => (
                  <button
                    key={demo.email}
                    type="button"
                    onClick={() => fillDemo(demo.email)}
                    className={`flex flex-col p-2.5 bg-white rounded-xl border shadow-sm transition-all
                      text-[10px] cursor-pointer text-left active:scale-95
                      ${demo.border} ${demo.full ? 'col-span-2' : ''}`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className={`px-1.5 py-0.5 rounded font-black text-[9px] leading-tight ${demo.badge}`}>
                        {demo.label}
                      </span>
                      <span className="text-[8px] text-emerald-600 font-bold flex-shrink-0">▶ Isi</span>
                    </div>
                    <span className="text-[9px] text-slate-500 font-medium truncate">{demo.sublabel}</span>
                    <span className="font-mono text-slate-700 font-bold truncate mt-0.5">{demo.email}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pemisah Bagian Bawah: Peran Tambahan */}
            <div className="pt-3 border-t border-dashed border-emerald-200">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Peran Tambahan (Pendukung)
                </h4>
                <span className="text-[9px] text-slate-400 font-semibold">Opsional</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {ADDITIONAL_ACCOUNTS.map((demo) => (
                  <button
                    key={demo.email}
                    type="button"
                    onClick={() => fillDemo(demo.email)}
                    className={`flex flex-col p-2 bg-white/80 hover:bg-white rounded-lg border transition-all
                      text-[10px] cursor-pointer text-left active:scale-95 ${demo.border}`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className={`px-1.5 py-0.5 rounded font-bold text-[8.5px] ${demo.badge}`}>
                        {demo.label}
                      </span>
                      <span className="text-[8px] text-slate-400 font-semibold">▶ Isi</span>
                    </div>
                    <span className="font-mono text-[9.5px] text-slate-600 font-semibold truncate">{demo.email}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-slate-400 italic bg-white/60 p-2 rounded-lg border border-dashed border-slate-200">
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <span>Semua akun menggunakan Password <b>password123</b></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
