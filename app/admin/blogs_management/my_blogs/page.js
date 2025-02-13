
import DeleteBlogBtn from "@/components/admin/DeleteBlogBtn";
import { createClient } from "@/lib/supabase/server"
import Image from "next/image";
import Link from "next/link";

const MyBlogsPage = async () => {
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    console.log('USER::', user.id)

    if (userError || !user) {
        return <p>Error fetching user data or not logged in.</p>;
    }

    const { data: blogs, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("author", user.id); // Assuming `id` is the foreign key

    console.log('BLOGS:::', blogs)

    if (error) {
        return <p>{error.message}</p>;
    }

  return (
    <div className="">
        <h3 className="">My blogs</h3>
        <div className="flex gap-5 flex-wrap">
            { blogs?.map(blog => (
                <div key={blog.id} className="shadow-md hover:shadow-xl hover:scale-95 cursor-default transition-all duration-300 max-w-[300px] min-w-[200px] xs:min-w-[180px] flex-1 rounded-b-lg border flex flex-col gap-1 group bg-white">
                    <Image width={1000} height={1000} src={blog.image} alt="Blog image" className="object-cover h-auto w-full"/>
                    <div className="p-2">
                        <p className="line-clamp-3">{blog.title}</p>
                        <div className="flex justify-around transition-all duration-700 my-2 mt-2 items-center">
                            <DeleteBlogBtn blogTitle={blog.title} blogId={blog.id}/>
                            <Link href={`/admin/blogs_management/my_blogs/update/${blog.id}`}>
                                <Image width={20} height={20} src={'/assets/update.svg'} title="update" alt="update" className="opacity-0 cursor-pointer group-hover:opacity-100 transition-all duration-700"/>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MyBlogsPage