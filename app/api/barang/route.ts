export const runtime = 'edge';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const GAS_URL = process.env.GAS_URL;

    if (!GAS_URL) {
      return NextResponse.json({ message: "URL Database belum diset" }, { status: 500 });
    }

    // Perhatikan: Kita mengirim action 'getBarang' ke Apps Script
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'getBarang'
      }),
    });

    const result = await response.json();

    if (result.status === 'success') {
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ message: "Gagal mengambil data barang" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error Fetch Barang:", error);
    return NextResponse.json({ message: "Terjadi kesalahan koneksi" }, { status: 500 });
  }
}