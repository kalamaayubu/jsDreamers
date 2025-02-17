'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache";

export async function deleteBlog(blogId) {
    const supabase = await createClient()

    // Delete blog in supabase
    const { data, error } = await supabase.from('blogs').delete().eq('id', blogId)

    // Catch error
    if (error) {
        console.error("Error deleting blog:", error);
        return { success: false, error: error.message };
    }
    
    // Revalidate the desired paths and return a response
    revalidatePath("/admin/blogs_management/my_blogs");
    revalidatePath("/admin/dashboard");
    return { success: true, message: 'Blog deleted successfully.'}
}