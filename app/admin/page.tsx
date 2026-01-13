"use client";
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [barang, setBarang] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBarang();
  }, []);

  const fetchBarang = async () => {
    try {
      // Kita buat API route baru nanti atau pakai API auth yang sudah ada
      const res = await fetch('/api/barang'); 
      const result = await res.json();
      setBarang(result.data || []);
    } catch (error) {
      console.error("Gagal mengambil data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manajemen Stok Gudang</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold">Nama Barang</th>
              <th className="p-4 font-semibold">Kategori</th>
              <th className="p-4 font-semibold">Stok</th>
              <th className="p-4 font-semibold">Lokasi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-4 text-center">Memuat data...</td></tr>
            ) : barang.map((item: any, index) => (
              <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-4">{item.nama}</td>
                <td className="p-4">{item.kategori}</td>
                <td className="p-4 font-mono">{item.stok}</td>
                <td className="p-4">{item.lokasi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}