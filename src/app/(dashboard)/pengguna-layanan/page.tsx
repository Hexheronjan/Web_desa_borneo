import { redirect } from 'next/navigation';

// Route lama /pengguna-layanan sudah diganti menjadi /layanan-slv
export default function PenggunaLayananRedirect() {
  redirect('/layanan-slv');
}
