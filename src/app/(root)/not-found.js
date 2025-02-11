export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Halaman Tidak Ditemukan</h1>
      <p className="text-gray-600 mt-2">
        Oops! Halaman yang Anda cari tidak tersedia.
      </p>
      <a href="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Kembali ke Beranda
      </a>
    </div>
  );
}
