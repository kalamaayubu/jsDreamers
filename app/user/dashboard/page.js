'use client'

import { logout } from "@/actions/auth/logout"
import { useRouter } from "next/navigation"

const UserRootPage = () => {
    const router = useRouter()

    const handleLogout = async () => {
        await logout()
        router.push('/auth/login')
    }
  return (
    <div>
        <p>UserRootPage</p>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default UserRootPage