"use client";

import Link from "next/link";
import { logout } from "@/actions/auth/logout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { MenuIcon } from "lucide-react";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check authorization of user
  useEffect(() => {
    const authState = Cookies.get("authState"); // Use js-cookie to get the authState cookie

    if (authState) {
      try {
        const parsedAuth = JSON.parse(authState); // Parse the cookie value
        setUser(parsedAuth.user || null); // Set the user state
      } catch (error) {
        console.error("Failed to parse authState cookie:", error);
        setUser(null);
      }
    }
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await logout();
    toast.success("Successfully logged out.");
    router.push("/");
  };

  return (
    <>
      <nav className="md:flex items-center gap-4 hidden">
        <Link href={"/blogs"}>Blogs</Link>
        <Link href={"/"}>Home</Link>
        <Link href={"/admin/dashboard"}>Admin</Link>
        <p>Contacts</p>
        <button className="gradient-button-blue-purple">
          {user ? (
            <span onClick={handleLogout}>Logout</span>
          ) : (
            <Link href={"/auth/login"}>Login</Link>
          )}
        </button>
      </nav>

      {/* Small screens navigation */}
      <nav className={`md:hidden overflow-hidden`}>
        <MenuIcon
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="cursor-pointer"
        />
        <div
          className={`p-6 ${
            isMenuOpen ? "translate-y-60 opacity-0" : ""
          } bg-white translate-y-0 flex flex-col gap-2 rounded-md absolute right-7 shadow-md border transition-all duration-500`}
        >
          <Link href={"/blogs"}>Blogs</Link>
          <Link href={"/"}>Home</Link>
          <Link href={"/admin/dashboard"}>Admin</Link>
          <p>Contacts</p>
          <button className="gradient-button-blue-purple">
            {user ? (
              <span onClick={handleLogout}>Logout</span>
            ) : (
              <Link href={"/auth/login"}>Login</Link>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Menu;
