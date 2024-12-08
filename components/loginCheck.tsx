"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Gunakan next/navigation untuk navigasi
import { usePathname } from "next/navigation";

export default function LoginChecker() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Cek apakah user sudah login, misalnya cek token di localStorage

    const token = localStorage.getItem("authToken"); // Ganti sesuai dengan cara Anda menyimpan token autentikasi
    const role = localStorage.getItem("role"); // Ganti sesuai dengan cara Anda menyimpan token autentikasi

    if (!token) {
      // Jika tidak ada token, redirect ke halaman login
      if (pathname !== "/login" && pathname !== "/register") {
        router.push("/login");
      }
    }

    if (role !== "ADMIN") {
      if (pathname == "/users") {
        router.push("/");
      }
    }
  }, [router]);

  return null;
}
