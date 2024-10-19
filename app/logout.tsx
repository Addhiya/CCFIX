// middleware.ts
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken'); // Ganti sesuai dengan cara Anda menyimpan token autentikasi

  // Log untuk memeriksa apakah middleware dipanggil
  console.log('Middleware triggered:', request.nextUrl.pathname);

  // Cek apakah token ada
  if (!token) {
    const { pathname } = request.nextUrl;

    // Biarkan akses ke halaman login dan halaman about
    if (pathname !== '/login' && pathname !== '/about') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Jika token ada, biarkan pengguna mengakses halaman
  return NextResponse.next();
}


// Tentukan paths yang ingin dilindungi
export const config = {
  matcher: [
    '/((?!api|login|about|_next).*)', // Kecualikan API, halaman login, halaman about, dan static assets dari middleware
  ],
};
