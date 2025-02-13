'use client'

import { ChevronDown, ChevronUp, MoreHorizontal, Plus, Settings, User2, LayoutDashboard } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuTrigger,DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import Image from "next/image"
import Link from "next/link"
import { logout } from "@/actions/auth/logout"
import { useRouter } from "next/navigation"


// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
    const router = useRouter()

    // Function to log out
    const handleLogout = async () => {
        await logout()
        router.push('/auth/login')
    }

  return (
    <Sidebar collapsible="icon" variant="" className="">
      <SidebarContent className="mt-2 overflow-x-hidden">
        <SidebarHeader>
          <div className="flex gap-4 items-center">
            <Image width={20} height={20} alt="Logo" src="/assets/logo.svg" className="w-10"/>
            <span className="font-bold ">jsDreamers</span>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Manage blogs</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className={``}>
                  <SidebarMenuButton 
                    asChild 
                    className="bg-green-500 hover:bg-green-600 text-white px-4 w-full rounded-md transition"
                    >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction>
                    <MoreHorizontal />
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-black px-4 py-3 rounded-md flex flex-col gap-[2px] shadow-md" side="right" align="start">
                  <DropdownMenuItem className="outline-none p-2 px-4 rounded-md cursor-pointer hover:bg-gray-100">
                    <Link href={`/admin/blogs_management/my_blogs`}>My blogs</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="outline-none p-2 px-4 rounded-md cursor-pointer hover:bg-gray-100">
                  <Link href={'/admin/blogs_management/create'}>Create blog</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Help
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
            <SidebarGroupContent className="flex flex-col gap-2">
              <p className="py-2 px-3 rounded-md bg-blue-300 hover:bg-gray-200">Content1</p>
              <p className="py-2 px-3 rounded-md bg-blue-300 hover:bg-gray-200">Content1</p>
              <p className="py-2 px-3 rounded-md bg-blue-300 hover:bg-gray-200">Content1</p>
              <p className="py-2 px-3 rounded-md bg-blue-300 hover:bg-gray-200">Content1</p>
            </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width] bg-white rounded-md flex flex-col gap-[1px] shadow-lg p-4 border border-gray-200"
                >
                  <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md">
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md">
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-4 py-2 hover:bg-red-600 hover:text-white cursor-pointer rounded-md">
                    <span onClick={handleLogout}>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}