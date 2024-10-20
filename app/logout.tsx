import { useRouter } from 'next/router';
import React, { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Hapus token dari localStorage
    router.push('/login'); // Redirect ke halaman login
  };

  // Panggil handleLogout saat komponen ini dirender
  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
