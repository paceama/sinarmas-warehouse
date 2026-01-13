"use client"; 
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Fungsi untuk menghapus session dan pindah ke login
  const handleLogout = () => {
    Cookies.remove('user_role'); // Menghapus cookie satpam
    router.push('/login');      // Redirect ke login
    router.refresh();           // Refresh agar middleware mendeteksi perubahan cookie
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-slate-800">
      {/* Sidebar Sederhana untuk Admin */}
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-xl font-bold mb-8 text-blue-400">Admin Sinarmas</h2>
        <nav className="space-y-4">
          <div className="hover:text-blue-300 cursor-pointer">Dashboard</div>
          <div className="hover:text-blue-300 cursor-pointer">Manajemen Stok</div>
          <div className="hover:text-blue-300 cursor-pointer">Laporan</div>
        </nav>
      </aside>

      {/* Konten Utama */}
      <div className="flex-1">
        <header className="bg-white shadow-sm p-4 flex justify-end">
          {/* Tambahkan onClick={handleLogout} di sini */}
          <button 
            onClick={handleLogout}
            className="text-sm text-red-600 font-semibold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
          >
            Keluar Sistem
          </button>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}