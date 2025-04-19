import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 mb-10">
      <Skeleton className="h-[100px] w-[250px] rounded-xl bg-gray-200" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-[250px] bg-gray-200" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
          <Skeleton className="h-4 w-[210px] bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
