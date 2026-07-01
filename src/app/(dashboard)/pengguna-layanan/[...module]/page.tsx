import { redirect } from 'next/navigation';

// Route lama /pengguna-layanan/[...module] sudah diganti menjadi /layanan-slv
export default function PenggunaLayananModuleRedirect() {
  redirect('/layanan-slv');
}
