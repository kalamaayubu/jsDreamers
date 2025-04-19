import { Skeleton } from "../ui/skeleton";

const BlogSkeletonCard = () => {
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 text-xl">
      {[...Array(8)].map((_, i) => (
        <Skeleton
          key={i}
          className={`h-[125px] w-[250px] rounded-xl bg-gray-500 animate-pulse`}
        />
      ))}
    </div>
  );
};

export default BlogSkeletonCard;
