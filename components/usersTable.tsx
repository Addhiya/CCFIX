"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Autocomplete,
  AutocompleteItem,
  Input,
  Kbd,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { SearchIcon } from "@/components/icons";
import React, { Key, useEffect, useState } from "react";
import ModalAddUser from "./modalAddUser";
import ModalDeleteUser from "./modaDeleteUser";

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "nim",
    label: "NIM",
  },
  {
    key: "email",
    label: "EMAIL",
  },
  {
    key: "action",
    label: "Action",
  },
];

export default function UsersTable() {
  interface UserData {
    name: string;
    email: string;
    nim: string;
    role: string;
    id: number;
  }

  // State untuk menyimpan data pengguna
  const [userData, setUserData] = useState<UserData[] | null>(null); // Definisikan tipe

  // Ambil data pengguna dari API
  const fetchUsersData = async () => {
    try {
      const response = await fetch("https://cc-be-beta.vercel.app/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Pastikan menambahkan token di sini
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Fetched user data:", data); // Cek data yang diterima
      setUserData(data); // Simpan data pengguna ke state
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUsersData();
  }, []);

  const deleteUserdata = async (id: number) => {
    try {
      const response = await fetch(
        `https://cc-be-beta.vercel.app/api/user/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Pastikan menambahkan token di sini
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Deleted User Data:", data); // Cek data yang diterima
      await fetchUsersData();
    } catch (error) {
      console.error("Error deleting user data:", error);
    }
  };
  return (
    <div className="w-full">
      <div className="w-full flex justify-end mb-3 items-center">
        <ModalAddUser fetchUserData={fetchUsersData} />
      </div>

      {/* table */}
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={userData || []}>
          {(item: UserData) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell>{item.nim}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <ModalDeleteUser deleteUserData={deleteUserdata} id={item.id}/>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
