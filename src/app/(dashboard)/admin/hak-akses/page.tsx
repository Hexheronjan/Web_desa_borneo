'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Check, X, ShieldAlert, Lock } from 'lucide-react';

const COLOR = '#1a237e';

const roleList = [
  { key: 'admin_super', name: 'Administrator Sistem', modules: 'Modul 1-14' },
  { key: 'operator_sid', name: 'Operator SID', modules: 'Modul 15-21' },
  { key: 'pemerintah_desa', name: 'Pemdes (Kades)', modules: 'Modul 22-31' },
  { key: 'bpd', name: 'BPD', modules: 'Modul 32-34' },
  { key: 'lembaga_adat', name: 'Lembaga Adat', modules: 'Modul 35-38' },
  { key: 'guru_fasilitator', name: 'Guru', modules: 'Modul 39-42' },
  { key: 'nakes_posyandu', name: 'Nakes', modules: 'Modul 43-46' },
  { key: 'warga', name: 'Warga', modules: 'Modul 47-50' },
  { key: 'dinas_pmd', name: 'Dinas PMD Regional', modules: 'Modul 51-54' },
  { key: 'peneliti', name: 'Peneliti', modules: 'Modul 55-60' }
];

const moduleGroups = [
  { name: 'Pengaturan Sistem', count: 3 },
  { name: 'Master Data & Referensi', count: 4 },
  { name: 'Kesiapan & Kematangan', count: 4 },
  { name: 'Sistem Informasi Desa', count: 7 },
  { name: 'Tata Kelola & Keuangan', count: 3 },
  { name: 'Pelayanan Publik & Warga', count: 4 },
  { name: 'Budaya & Adat', count: 5 },
  { name: 'Pendidikan & Kesehatan', count: 10 },
  { name: 'Penelitian & DSS', count: 6 },
  { name: 'Monitoring Regional', count: 4 }
];

// Matrix mapping: true if role has access to module group
const matrix: Record<string, boolean[]> = {
  admin_super: [true, true, true, true, true, true, true, true, true, true],
  operator_sid: [false, false, false, true, false, true, false, false, false, false],
  pemerintah_desa: [false, true, true, true, true, true, true, true, true, false],
  bpd: [false, false, false, true, true, false, false, false, false, false],
  lembaga_adat: [false, false, false, false, false, false, true, false, false, false],
  guru_fasilitator: [false, false, false, false, false, false, false, true, false, false],
  nakes_posyandu: [false, false, false, false, false, false, false, true, false, false],
  warga: [false, false, false, false, false, true, false, false, false, false],
  dinas_pmd: [false, true, true, true, false, false, false, false, false, true],
  peneliti: [false, false, true, false, false, false, false, false, true, false],
};

export default function HakAksesPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Hak Akses & Permission" modul="Modul 3: Hak Akses" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Permission" value={100} satuan="rules" barColor="blue" progress={100} />
        <StatCard label="Role dengan Akses Penuh" value={1} satuan="role" barColor="purple" progress={10} />
        <StatCard label="Akses Terbuka" value={32} satuan="fitur" barColor="green" progress={32} />
        <StatCard label="Akses Dikunci" value={68} satuan="fitur" barColor="red" progress={68} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <ShieldAlert size={16} /> Matriks Otorisasi Pengguna (Role-Based Access Control)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs">
                  <th className="p-3 text-left font-bold text-slate-600">Role Pengguna</th>
                  <th className="p-3 text-left font-bold text-slate-600">Rentang Modul</th>
                  {moduleGroups.map((group, i) => (
                    <th key={i} className="p-3 text-center font-bold text-slate-600 min-w-[100px] leading-tight">
                      {group.name}
                      <span className="block text-[9px] font-normal text-slate-400 mt-0.5">{group.count} modul</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roleList.map((role, rIdx) => (
                  <tr key={role.key} className={`border-b border-slate-100 hover:bg-slate-50/50 ${rIdx % 2 === 0 ? 'bg-slate-50/30' : ''}`}>
                    <td className="p-3 font-semibold text-slate-700">{role.name}</td>
                    <td className="p-3 text-xs text-slate-400 font-mono">{role.modules}</td>
                    {matrix[role.key].map((hasAccess, mIdx) => (
                      <td key={mIdx} className="p-3 text-center">
                        <div className="flex justify-center">
                          {hasAccess ? (
                            <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center" title="Diizinkan">
                              <Check size={14} className="stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-red-50 text-red-400 flex items-center justify-center" title="Dibatasi">
                              <X size={14} className="stroke-[2]" />
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 rounded-xl border bg-slate-50 flex items-center gap-3">
            <Lock className="w-5 h-5 text-indigo-600 flex-shrink-0" />
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong>Catatan Sistem:</strong> Matriks hak akses di atas dikunci secara <i>hard-coded</i> untuk memelihara integritas prototype program.
              Perubahan pada skema database otorisasi memerlukan approval dari Administrator Sistem dan sinkronisasi dengan <code>next-auth</code> middleware.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
