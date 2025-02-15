'use client'

import { getNumberOfBlogs, getNumberOfMyBlogs, getNumberOfUsers } from "@/actions/admin/getStats";
import StatsCard from "@/components/admin/StatsCard";
import { BookCheck, Newspaper, Plane, TrendingDown, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AdminRootPage = () => {
  // Get the userID from the Redux store
  const userId = useSelector(state => state.auth.user?.id)

  // State for storing the counts
  const [totalUsers, setTotalUsers] = useState(null)
  const [totalBlogs, setTotalBlogs] = useState(null)
  const [myBlogs, setMyBlogs] = useState(null)

  // Fetch stats on mount
  useEffect(() => {
    const fetchStats = async () => {
      const usersCount = await getNumberOfUsers()
      const blogsCount = await getNumberOfBlogs()
      const myBlogsCount = await getNumberOfMyBlogs(userId)

      setTotalUsers(usersCount)
      setTotalBlogs(blogsCount)
      setMyBlogs(myBlogsCount)
    }

    fetchStats()
  }, [userId])

  const stats = [
    { icon: Users, title: "Total users", count: totalUsers, color: "#1D4ED8", shadowColor: "#60A5FA", percentage: "4.5", trendIcon: TrendingUp },
    { icon: BookCheck, title: "All blogs", count: totalBlogs, color: "#EA580C", shadowColor: "#FDBA74", percentage: "0.5", trendIcon: null },
    { icon: Newspaper, title: "My Blogs", count: myBlogs, color: "#15803D", shadowColor: "#4ADE80", percentage: "2.1", trendIcon: TrendingDown },
    { icon: Plane, title: "Total users", count: 137, color: "#7C3AED", shadowColor: "#C084FC", percentage: "6.8", trendIcon: TrendingUp },
  ]

  return (
    <div className="flex flex-col gap-5 overflow-y-auto">
      <div className="flex gap-4 flex-wrap items-center" >
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat}/>
        ))}
      </div>

      <div className="bg-white h-[1000px] rounded-lg p-4">
        <p className="font-bold text-2xl">Graph</p>
      </div>
    </div>
  )
}

export default AdminRootPage