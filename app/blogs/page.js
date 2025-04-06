import { fetchBlogs } from '@/actions/blogs/fetchBlogs';
import BlogSkeletonCard from '@/components/client/BlogSkeletonCard';
import NavBar from '@/components/general/NavBar'
import BlogsGrid from '@/components/server/BlogsGrid';
import Image from 'next/image'
import { Suspense } from 'react';

// Custom Shimmer Skeleton for Image
const ShimmerImage = () => (
  <div className="w-full h-full bg-gray-900 animate-pulse rounded-xl" />
);

export const revalidate = 86400; // 1 day

const BlogsPage = async () => {
    const blogs = await fetchBlogs(); // Fetch on the server

  return (
    <div className='relative'>
      <div className='p-1 top-0 sticky bg-white pb-2 shadow-md w-full'>
        <NavBar />
      </div>

      <main className='mt-10'>
        <section className='hero_section m-auto'>
          <div className='w-[90%] h-[200px] sm:h-[250px] lg:h-[300px] m-auto'>
            <Suspense fallback={<ShimmerImage />}>
              <Image
                width={2000}
                height={200}
                alt='Image'
                src='/assets/blogHero.png'
                className='rounded-xl object-cover w-full h-full'
              />
            </Suspense>
          </div>
        </section>

        <section className='w-[90%] m-auto mb-10'>
          <h1 className='font-bold text-4xl mt-10'>Latest blogs</h1>
          <Suspense fallback={<BlogSkeletonCard/>}>
            <BlogsGrid/>
          </Suspense>
        </section>
      </main>
    </div>
  )
}

export default BlogsPage
