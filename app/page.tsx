import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-slate-900">
      <h1 className="text-4xl font-bold text-blue-700">Sinarmas Warehouse</h1>
      <p className="mt-4 text-slate-600">Selamat datang di sistem manajemen gudang.</p>
      
      <Link 
        href="/login" 
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
      >
        Masuk ke Sistem
      </Link>
    </main>
  );
}