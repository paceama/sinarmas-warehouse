"use client";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('user_role'); // Hapus session
    router.push('/login');      // Kembali ke login
    router.refresh();           // Reset middleware
  };

  return (
    <section className="min-h-screen bg-slate-50 text-slate-800">
      {/* Navbar khusus User */}
      <nav className="p-4 bg-white shadow-sm border-b flex justify-between items-center">
        <span className="font-bold text-blue-600">Sinarmas User Panel</span>
        
        <button 
          onClick={handleLogout}
          className="text-sm text-red-600 font-medium border border-red-200 px-4 py-1.5 rounded-lg hover:bg-red-50 transition-all"
        >
          Logout
        </button>
      </nav>
      
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </section>
  );
}