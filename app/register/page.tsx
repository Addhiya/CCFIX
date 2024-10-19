"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation'; // Pastikan ini diimpor dari 'next/navigation'

export default function PricingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false); // Tambahkan state ini untuk cek apakah component sudah mounted
  const router = useRouter();

  useEffect(() => {
    // Komponen sudah ter-mount
    setMounted(true);
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleRegister = async () => {
    if (!mounted) return; // Hanya jalankan jika komponen sudah mounted
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://cc-be-beta.vercel.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          nim,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Tampilkan notifikasi sukses
      window.alert("Akun berhasil dibuat");

      // Redirect ke halaman login
      router.push("/login");
      
    } catch (error) {
      console.error(error); // Log error untuk debugging
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage); // Set error yang lebih aman
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 md:px-0">
      <Card className="px-2">
        <CardHeader>
          <h1 className="font-bold text-red-800 text-2xl">Registration</h1>
        </CardHeader>
        <CardBody className="gap-3">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            label="NIM"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
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
          <Input
            type="password"
            label="Password Confirmation"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="text-red-600">{error}</p>}
        </CardBody>
        <CardFooter>
          <div className="flex justify-between w-full">
            <Link href="/login">
              <p className="text-red-800 text-sm">Already have an account?</p>
            </Link>
            <Button
              variant="shadow"
              className="bg-gradient-to-r from-red-800 to-red-600 text-white font-semibold"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
