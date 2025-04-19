import Stats from "@/components/admin/Stats";
import { SkeletonCard } from "@/components/client/SkeletonCard";
import { getUserId } from "@/utils/getUserId";
import { Suspense } from "react";

const AdminRootPage = async () => {
  // Get the userID from cookies
  const userId = await getUserId()

  return (
    <div className="flex flex-col gap-5 overflow-y-auto">
      <Suspense fallback={<SkeletonCard/>}>
        <Stats userId={userId} />
      </Suspense>

      <div className="bg-white h-[1000px] rounded-lg p-4">
        <p className="font-bold text-2xl">Graph</p>
        <SkeletonCard/>
        <SkeletonCard/>
        <SkeletonCard/>
      </div>
    </div>
  )
}

export default AdminRootPage