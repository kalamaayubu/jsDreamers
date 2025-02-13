"use client";

import { logout } from "@/actions/auth/logout";
import {
  Book,
  ChevronUp,
  LayoutDashboard,
  LogOut,
  NewspaperIcon,
  Settings,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Sidebar = ({ isOpen }) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const logoutRef = useRef(null);
  const router = useRouter();

  // Close the logout div when user clicks outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (logoutRef.current && !logoutRef.current.contains(e.target)) {
        setIsLogoutOpen(false);
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully loged out.");
    } catch (error) {
      toast.error("Error occured while loging out.");
      console.error("Error during logout", error);
    }
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      name: "Dashboard",
      url: "/admin/dashboard",
    },
    {
      icon: NewspaperIcon,
      name: "Create Blog",
      url: "/admin/blogs_management/my_blogs/create",
    },
    {
      icon: Book,
      name: "My Blogs",
      url: "/admin/blogs_management/my_blogs",
    },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-52" : "w-[52px] pt-2"
      } transition-all duration-50 relative flex flex-col h-full`}
    >
      <div className="p-3">
        {menuItems?.map((item) => (
          <div
            key={item.name}
            onClick={() => router.push(item.url)}
            className={`${
              isOpen ? "px-3 py-1 hover:bg-gray-100" : "mb-[20px]"
            } rounded-lg cursor-pointer`}
          >
            <div
              title={`${!isOpen ? item.name : ""}`}
              className="flex items-center gap-2"
            >
              <item.icon className="text-gray-800 size-5 items-center" />
              <button className={`${!isOpen && "hidden"}`}>{item.name}</button>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`absolute bottom-0 w-full overflow-y-clip ${
          isLogoutOpen ? "pt-12" : "h-12"
        } ${isOpen ? "" : "mx-1"}`}
      >
        <div
          onClick={() => setIsLogoutOpen(!isLogoutOpen)}
          className={`${
            isOpen ? "" : "pl-[13px] p-[6px] mr-1"
          } flex w-full cursor-pointer bg-white z-20 px-2 rounded-md gap-2 items-center absolute bottom-0 hover:bg-gray-50`}
        >
          <User className={`${isOpen ? "" : "size-5"}`} />
          <button className={`${isOpen ? "" : "hidden"}`}>Username</button>
          <ChevronUp
            className={`${isOpen ? "" : "hidden"} ${
              isLogoutOpen && "rotate-0"
            } -translate-y-[6px] transition-all duration-300 self-end rotate-180`}
          />
        </div>

        <div
          ref={logoutRef}
          className={` ${isLogoutOpen ? "block" : "translate-y-40"} ${
            isOpen ? "shadow-lg mx-2 p-2" : "gap-1 shadow-md p-[4px]"
          } flex flex-col z-10 rounded-md bg-white border transition-all duration-300 -translate-y-[40px]`}
        >
          <button
            title={`${!isOpen ? "Settings" : ""}`}
            className={` ${
              isOpen ? "px-3 py-2" : ""
            } whitespace-nowrap hover:bg-lightGray rounded-md flex items-center gap-2`}
          >
            <Settings className={`size-4`} />
            <span className={`${isOpen ? "" : "hidden"}`}>Settings</span>
          </button>
          <button
            title={`${!isOpen ? "Logout" : ""}`}
            onClick={handleLogout}
            className={` ${
              isOpen ? "px-3 py-2" : ""
            } whitespace-nowrap hover:bg-red-500 rounded-md flex items-center gap-2`}
          >
            <LogOut className={`size-4`} />
            <span className={`${isOpen ? "" : "hidden"}`}>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
