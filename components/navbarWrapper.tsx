"use client"; // This part will be a Client Component

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { useState, useEffect } from "react";

export default function NavbarWrapper() {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsClient(true); // This will ensure the component only renders on the client
  }, []);
  if (!isClient) return null;
  // Conditionally render the Navbar based on the route
  if (pathname === "/login" || pathname === "/register") return null;

  return <Navbar />;
}
