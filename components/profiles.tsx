"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Gunakan next/navigation untuk navigasi
import React from "react";
import {
  Card,
  Skeleton,
  Button,
  CardHeader,
  CardBody,
  Image,
  Link,
} from "@nextui-org/react";
import useEmblaCarousel from "embla-carousel-react";
import EmblaCarouselReact from "embla-carousel-react";
import { GithubIcon } from "./icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Profiles() {
  // const router = useRouter();

  // useEffect(() => {
  //   // Cek apakah user sudah login, misalnya cek token di localStorage
  //   const token = localStorage.getItem('authToken'); // Ganti sesuai dengan cara Anda menyimpan token autentikasi

  //   if (!token) {
  //     // Jika tidak ada token, redirect ke halaman login
  //     router.push('/login');
  //   }
  // }, [router]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const profiles = [
    {
      name: "Fayyadh Asady",
      nim: "1101220353",
      role: "Frontend Developer",
      github: "https://github.com/Asady04",
      instagram:
        "https://www.instagram.com/asady_fyd/profilecard/?igsh=MTNiNHM0bDZwdGgyZQ==",
      image: "/fayyadh.jpg",
    },
    {
      name: "Ad Dhiya Fahma Bilnadzary Nugraha",
      nim: "1101220264",
      role: "Backend Developer",
      github: "https://github.com/Addhiya",
      instagram:
        "https://www.instagram.com/addhiii.f/profilecard/?igsh=OW80cW83MHQzdWkw",
      image: "/adhiya.jpg",
    },
    {
      name: "Made Satya Yudha Prawira",
      nim: "1101223369",
      role: "Devops Developer",
      github: "https://github.com/styydh",
      instagram:
        "https://www.instagram.com/plcg.kangkung/profilecard/?igsh=MTloMHB4M282OWd3dg==",
      image: "/yudha.jpg",
    },
    {
      name: "Muhammad Ridzwan Aulia Azzikra",
      nim: "1101223064",
      role: "AI Developer",
      github: "https://github.com/Emraaaa",
      instagram:
        "https://www.instagram.com/rdzwan_aa/profilecard/?igsh=anFtNXlveWxjamN2",
      image: "/ridzwan.jpg",
    },
  ];
  return (
    <div className="w-full flex md:flex-row flex-col gap-3">
      {profiles.map((profile) => (
        <Card className="py-4 hover:-translate-y-1 duration-100">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={profile.image}
              width={270}
              height={300}
            />
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <p className="text-tiny uppercase font-bold">{profile.name}</p>
            <small className="text-default-500">{profile.nim}</small>
            <div className="flex justify-between">
              <h4 className="font-bold text-large">{profile.role}</h4>
              <div className="flex gap-2 items-center">
                <Link href={profile.instagram} color="foreground" size="lg">
                  <FontAwesomeIcon icon={faInstagram}/>
                </Link>
                <Link href={profile.github} color="foreground" size="lg">
                  <GithubIcon />
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
