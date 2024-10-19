'use client'; // Pastikan ini ada di paling atas

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Link } from "@nextui-org/react";
import React from "react";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation'; // Menggunakan next/navigation

export default function LoginPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  
  const router = useRouter(); // Menggunakan useRouter dari next/navigation

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async () => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await fetch('https://cc-be-beta.vercel.app/login', { // Ganti dengan URL backend Anda
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed: ' + (await response.text()));
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Simpan token di localStorage
      localStorage.setItem('authToken', data.token); // Ganti dengan key sesuai kebutuhan Anda

      // Menampilkan notifikasi login berhasil
      window.alert('Login berhasil');

      // Redirect ke halaman home setelah login berhasil
      router.push('/'); // Menggunakan router untuk redirect
    } catch (error) {
      console.log('Type of error:', typeof error); // Cek tipe dari error
      console.log('Error content:', error); // Cek isi dari error
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 md:px-0">
      <Card className="px-2">
        <CardHeader>
          <h1 className="font-bold text-red-800 text-2xl">Login</h1>
        </CardHeader>
        <CardBody className="gap-3">
          <Input 
            type="email" 
            label="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            endContent={
              <button 
                className="focus:outline-none" 
                type="button" 
                onClick={toggleVisibility} 
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <FontAwesomeIcon className="text-default-500" icon={faEye} />
                ) : (
                  <FontAwesomeIcon className="text-default-500" icon={faEyeSlash} />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Tampilkan pesan error */}
        </CardBody>
        <CardFooter>
          <div className="flex justify-between w-full"> 
            <Link href="/register">
              <p className="text-red-800 text-sm">Don't have an account?</p>
            </Link>
            <Button 
              variant="shadow" 
              className="bg-gradient-to-r from-red-800 to-red-600 text-white font-semibold" 
              onClick={handleLogin} // Panggil handleLogin saat tombol diklik
              disabled={loading} // Nonaktifkan tombol saat loading
            >
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
