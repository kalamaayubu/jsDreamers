import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const BlogsGrid = async ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    return <p>No blogs available.</p>;
  }

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 text-xl">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="shadow-md rounded-lg overflow-hidden border border-gray-100 flex flex-col gap-2"
        >
          <div className="h-[200px]">
            <Suspense
              fallback={
                <div className="w-full h-full bg-gray-200 animate-pulse rounded-xl" />
              }
            >
              <Image
                src={blog.image}
                width={2000}
                height={200}
                className="w-full object-cover h-full"
                loading="lazy"
                alt={blog.title}
              />
            </Suspense>
          </div>
          <div className="text-xl px-4 py-2 flex flex-col gap-2">
            <p className="line-clamp-2">{blog.title}</p>
            <Link
              href={`/blogs/${blog.id}`}
              className="flex gap-4 hover:gap-2 items-center justify-end cursor-pointer"
            >
              <p className="font-semibold bg-gradient-to-br text-[16px] from-blue-800 to-purple-600 bg-clip-text text-transparent">
                Show more
              </p>
              <Image
                width={100}
                height={100}
                alt="Update"
                src="/assets/three_right_arrows.svg"
                className="w-6"
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogsGrid;
