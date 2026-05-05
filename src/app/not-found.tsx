import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <h2 className="text-4xl font-bold mb-4">404 - Halaman Tidak Ditemukan</h2>
      <p className="mb-6">Maaf, halaman yang Anda cari tidak ada atau URL salah.</p>
      <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Kembali ke Beranda
      </Link>
    </div>
  )
}
