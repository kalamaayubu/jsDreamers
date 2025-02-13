// import UpdateBlogPage from "@/app/admin/blogs_management/my_blogs/update/page";
// import { createClient } from "@/lib/supabase/server";

// export async function fetchBlogToUpdate(blogId) {
//     const supabase = await createClient()

//     // Fetch the blog
//     const { data: blog, error } = await supabase
//         .from('blogs')
//         .select('*')
//         .eq('id', blogId)
//         .single()

//     if (error) {
//         console.log('Error fetching blogToUpdate:', error.message)
//         return { success: false, error: error.message}
//     }

//     if (!blog) {
//         console.log('Could not fetch blog to be updated!')
//         return { success: false, message: 'Could not fetch blog. Please try again later.',}
//     }

//     return (
//         <UpdateBlogPage blogFromStorage={blog}/>
//     )
// }