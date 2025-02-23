import { fetchBlogs } from '@/actions/blogs/fetchBlogs';
import { SkeletonCard } from '@/components/client/SkeletonCard';
import NavBar from '@/components/general/NavBar'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react';

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
            <Image
              width={2000}
              height={200}
              alt='Image'
              src='/assets/blogHero.png'
              className='rounded-xl object-cover w-full h-full'
            />
          </div>
        </section>

        <section className='w-[90%] m-auto mb-10'>
          <h1 className='font-bold text-4xl mt-10'>Latest blogs</h1>
          <Suspense fallback={<SkeletonCardsGrid/>}>
          <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 text-xl'>
                {blogs && blogs.length > 0 ? (
                    blogs.map((blog) => (
                      <div key={blog.id} className='shadow-md rounded-lg border border-gray-100 flex flex-col gap-2'>
                        <div className='h-[200px]'>
                          <img 
                            src={`${blog.image}`} 
                            className='w-full object-cover h-full' 
                          />
                        </div>
                        <div className='text-xl px-4 py-2 flex flex-col gap-2'>
                          <p className='line-clamp-2'>{blog.title}</p>
                          <Link
                            href={`/blogs/${blog.id}`}
                            className='flex gap-4 hover:gap-2 items-center justify-end cursor-pointer'
                          >
                            <p className='font-semibold bg-gradient-to-br text-[16px] from-blue-800 to-purple-600 bg-clip-text text-transparent'>
                              Show more
                            </p>
                            <Image
                              width={100}
                              height={100}
                              alt='Update'
                              src='/assets/three_right_arrows.svg'
                              className='w-6'
                            />
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                      <p>No blogs available.</p>
                  )}
          </div>
          </Suspense>
        </section>
      </main>
    </div>
  )
}

// Skeleton Loader
const SkeletonCardsGrid = () => (
    <>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </>
  );

export default BlogsPage
