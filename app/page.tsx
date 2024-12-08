'use client'; // Pastikan ini ada untuk penggunaan di Next.js

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Gunakan next/navigation untuk navigasi
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function HomePage() {
  const router = useRouter();

  // useEffect(() => {
  //   // Cek apakah user sudah login, misalnya cek token di localStorage
  //   const token = localStorage.getItem('authToken'); // Ganti sesuai dengan cara Anda menyimpan token autentikasi

  //   if (!token) {
  //     // Jika tidak ada token, redirect ke halaman login
  //     router.push('/login');
  //   }
  // }, [router]);

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
    <iframe
      src="https://prediksi-stunting.streamlit.app/?embed=true"
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
      }}
      title="Streamlit Dashboard"
    ></iframe>
  </div>
  );
}
