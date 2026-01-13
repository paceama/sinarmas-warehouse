export const runtime = 'edge';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Ambil URL GAS dari file .env.local
    const GAS_URL = process.env.GAS_URL;

    if (!GAS_URL) {
      return NextResponse.json({ message: "URL Database belum diset" }, { status: 500 });
    }

    const response = await fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'login',
        username: username,
        password: password
      }),
    });

    const result = await response.json();

    if (result.status === 'success') {
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ message: result.message }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan koneksi" }, { status: 500 });
  }
}