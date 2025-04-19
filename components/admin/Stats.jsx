import {
  getNumberOfBlogs,
  getNumberOfMyBlogs,
  getNumberOfUsers,
} from "@/actions/admin/getStats";
import StatsCard from "./StatsCard";
import {
  BookCheck,
  Newspaper,
  Plane,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

export default async function Stats({ userId }) {
  // Fetch all the stats concurrently to reduce loading time(optimize performance)
  const [totalUsers, totalBlogs, myBlogs] = await Promise.all([
    getNumberOfBlogs(),
    getNumberOfMyBlogs(userId),
    getNumberOfUsers(),
  ]);

  const stats = [
    {
      icon: Users,
      title: "Total users",
      count: totalUsers,
      color: "#1D4ED8",
      shadowColor: "#60A5FA",
      percentage: "4.5",
      trendIcon: TrendingUp,
    },
    {
      icon: BookCheck,
      title: "All blogs",
      count: totalBlogs,
      color: "#EA580C",
      shadowColor: "#FDBA74",
      percentage: "0.5",
      trendIcon: null,
    },
    {
      icon: Newspaper,
      title: "My Blogs",
      count: myBlogs,
      color: "#15803D",
      shadowColor: "#4ADE80",
      percentage: "2.1",
      trendIcon: TrendingDown,
    },
    {
      icon: Plane,
      title: "Total users",
      count: 137,
      color: "#7C3AED",
      shadowColor: "#C084FC",
      percentage: "6.8",
      trendIcon: TrendingUp,
    },
  ];

  // Render the stats cards using the stats(above) data
  return (
    <div className="flex gap-4 flex-wrap items-center">
      {stats.map((stat, index) => (
        // Spread the properties of each stat object into the StatsCard component
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
