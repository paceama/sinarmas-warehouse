import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ambil cookie user_role
  const role = request.cookies.get('user_role')?.value;
  const url = request.nextUrl.pathname;

  // 1. Jika mencoba masuk ke /admin tapi bukan admin
  if (url.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Jika mencoba masuk ke /user tapi tidak login
  if (url.startsWith('/user') && !role) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Jika sudah login tapi ingin ke halaman login lagi
  if (url === '/login' && role) {
    return NextResponse.redirect(new URL(role === 'admin' ? '/admin' : '/user', request.url));
  }

  return NextResponse.next();
}

// Tentukan halaman mana saja yang dijaga oleh middleware ini
export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/login'],
};