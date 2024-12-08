import { useRouter } from 'next/router';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ambil token dari cookie (pastikan Anda sudah menyetel token ke dalam cookie di aplikasi Anda)
  const token = request.cookies.get('authToken');
  const publicPaths = ['/about'];
  const router = useRouter();

  // Cek apakah request URL termasuk halaman publik
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const adminRoutes = ['/users'];
  // Daftar halaman publik yang tidak memerlukan login
  

  // Jika tidak ada token dan halaman tidak termasuk halaman publik, redirect ke halaman login
  
  const userRole = request.cookies.get('role')?.value;

  if (adminRoutes.includes(request.nextUrl.pathname)) {
    if (userRole !== 'ADMIN') {
      router.push('/')
    }
  }

  // Jika ada token atau halaman yang diakses adalah halaman publik, lanjutkan request
  return NextResponse.next();
}

// Tentukan path yang akan diproteksi
export const config = {
  matcher: [
    // Proteksi semua halaman kecuali halaman publik dan beberapa folder penting
      '/users/:path',
    '/((?!api|_next/static|_next/image|about).*)',
  ],
};
