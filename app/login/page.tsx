"use client"; // Wajib karena kita pakai interaksi tombol (state)
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

        if (res.ok) {
        // Simpan data role ke dalam cookie selama 1 hari
        Cookies.set('user_role', data.role, { expires: 1 });
        
        if (data.role === 'admin') {
            router.push('/admin');
        } else {
            router.push('/user');
        }
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-800">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl border border-slate-100">
        <h2 className="text-3xl font-bold text-center text-blue-700">Sinarmas</h2>
        <p className="text-center text-slate-500 mb-6 font-medium">Warehouse System</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full p-3 border rounded-lg outline-blue-500"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border rounded-lg outline-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-400"
          >
            {loading ? "Mengecek..." : "Masuk"}
          </button>
        </form>
      </div>
    </main>
  );
}