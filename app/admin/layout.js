'use client'

import { usePathname } from "next/navigation"
import AdminHeader from "@/components/admin/AdminHeader"
import Sidebar from "@/components/admin/Sidebar"
import { useState } from "react"

export default function Layout({ children }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Exclude blog editing pages(create and preview) from the admin pages layout
  if(pathname === '/admin/blogs_management/preview' || pathname === '/admin/blogs_management/create') {
    return <>{ children }</>
  }

  return (
    <div className="bg-white h-screen flex flex-col relative">
      <header className="bg-white border-b-[1px] p-4 py-3 fixed top-0 left-0 right-0">
        <AdminHeader toggleSideBar={() => setSidebarOpen(prev => !prev)}/>
      </header>

      <div className="flex gap-0 h-full pt-[70px]">
        <nav>
          <Sidebar isOpen={sidebarOpen}/>
        </nav>
        <main className="flex-1 h-full bg-lightGray p-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
