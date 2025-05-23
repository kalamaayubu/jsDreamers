import { createClient } from "@/lib/supabase/server";
import UpdateBlogPage from "./BlogToUpdate";

export const revalidate = 0; // dont cache the result

const fetchBlogToUpdate = async (blogId) => {
    const supabase = await  createClient();

    const { data: blog, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', blogId)
        .single();

    if (error) {
        console.error('Error fetching blog:', error.message);
        return null;
    }

    return blog;
}

const Page = async ({ params }) => {
    const { blogId } = await params; // Get blogId form params

    const blogFromStorage = await fetchBlogToUpdate(blogId);

    if (!blogFromStorage) {
        return <div className="animate-pulse">Loading...</div>;
    }

    return <UpdateBlogPage blogFromStorage={blogFromStorage} />;
};

export default Page;
