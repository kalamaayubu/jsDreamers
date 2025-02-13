"use client";

import { Bell, Menu, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const AdminHeader = ({ toggleSideBar }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex gap-4 items-center justify-between w-full">
      <div className="flex gap-5 items-center">
        <div className="flex gap-4 items-center">
          <Image
            width={20}
            height={20}
            alt="Logo"
            src="/assets/logo.svg"
            className="w-8"
          />
          <span className="font-semibold text-xl hidden md:flex">
            jsDreamers
          </span>
        </div>

        <Menu onClick={toggleSideBar} className="cursor-pointer mx-2" />
      </div>

      <div className="flex gap-2 items-center px-4 py-[2px] rounded-full bg-gray-100">
        <Search className="text-gray-500 w-5" />
        <input
          type="text"
          value={search}
          className="border-none bg-gray-100"
          placeholder="Search here..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="relative flex bg-gradient-to-br from-blue-800 to-purple-500 p-3 rounded-full cursor-pointer self-end">
        <Bell className="text-white size-[18px]" />
        <div className="size-3 bg-green-400 absolute rounded-full top-0 right-0" />
      </div>
    </div>
  );
};

export default AdminHeader;
