import BlogContent from "@/components/client/BlogContent";
import NavBar from "@/components/general/NavBar";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 1; // Revalidate every hours

const BlogDetailsPage = async ({ params }) => {
  const { blogId } = await params;
  const supabase = await createClient();

  // Fetch the blog data from Supabase using the blog ID
  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', blogId)
    .single();

  if (error) {
    console.error('Error fetching blog:', error.message);
    return <div>Error: {error.message}</div>;
  }
  
  return (
    <div>
        <div>
            <NavBar/>
        </div>
      <main className="w-[90%] m-auto max-w-[800px]">
        <section className="flex flex-col gap-4 mt-8">
            {/* Use the BlogContent component for parsing and rendering content */}
            <BlogContent content={blog.content}/>
        </section>
      </main>
    </div>
  )
}

export default BlogDetailsPage