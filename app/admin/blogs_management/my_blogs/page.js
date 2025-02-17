import DeleteBlogBtn from "@/components/admin/DeleteBlogBtn";
import { createClient } from "@/lib/supabase/server"
import { PenBoxIcon } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const MyBlogsPage = async () => {
    const supabase = await createClient()
    // Read the authState cookie
    const cookieStore = await cookies();
    const authState = cookieStore.get("authState");
    let userId;

    // Parse the cookie data
    if (authState) {
        try {
            const userData = JSON.parse(authState.value);
            userId = userData?.user?.id;
        } catch (error) {
            return <p>Error parsing user data.</p>;
        }
    }

    // Fetch the blogs
    const { data: blogs, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("author", userId);

    if (error) {
        return <p>{error.message}</p>;
    }

  return (
    <div className="">
        <h3 className="">My blogs</h3>
        <div className="flex gap-5 flex-wrap">
            { blogs?.map(blog => (
                <div key={blog.id} className="shadow-md hover:shadow-xl cursor-default transition-all duration-300 max-w-[300px] min-w-[200px] xs:min-w-[180px] rounded-b-lg border flex flex-col gap-1 group bg-white">
                    <div className="h-[200px]">
                        <Image width={1000} height={1000} src={blog.image} alt="Blog image" className="object-cover h-full w-full"/>
                    </div>
                    <div className="p-2">
                        <p className="line-clamp-2">{blog.title}</p>
                        <div className="flex justify-around transition-all duration-700 my-2 mt-2 items-center">
                            <DeleteBlogBtn blogTitle={blog.title} blogId={blog.id}/>
                            <Link href={`/admin/blogs_management/my_blogs/update/${blog.id}`}>
                                <PenBoxIcon className="opacity-0 text-blue-800 cursor-pointer group-hover:opacity-100 transition-all duration-700"/>
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