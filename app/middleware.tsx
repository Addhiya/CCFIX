import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ambil token dari cookie (pastikan Anda sudah menyetel token ke dalam cookie di aplikasi Anda)
  const token = request.cookies.get('authToken');

  // Daftar halaman publik yang tidak memerlukan login
  const publicPaths = ['/about'];

  // Cek apakah request URL termasuk halaman publik
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // Jika tidak ada token dan halaman tidak termasuk halaman publik, redirect ke halaman login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika ada token atau halaman yang diakses adalah halaman publik, lanjutkan request
  return NextResponse.next();
}

// Tentukan path yang akan diproteksi
export const config = {
  matcher: [
    // Proteksi semua halaman kecuali halaman publik dan beberapa folder penting
    '/((?!api|_next/static|_next/image|about).*)',
  ],
};
