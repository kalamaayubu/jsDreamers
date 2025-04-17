'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache";

export async function deleteBlog(blogId, blogImage) {
    const supabase = await createClient()

    console.log('Blogid:', blogId)
    console.log('BlogImage:', blogImage)

    try {
        // Extract the object path (assuming blogImage is the object name)
        const objectPath = blogImage.split('/storage/v1/object/public/blogs-bucket/')[1];

        console.log('Object path:', objectPath)

        // 1. Delete the blog banner in the storage bucket
        const { data: deleteBannerData, error: deleteBannerError } = await supabase.storage.from('blogs-bucket').remove([`${objectPath}`]);
        
        if (deleteBannerError) {
            console.log('Error deleting blog banner:', deleteBannerError);
            return { success: false, error: deleteBannerError.message };
        }

        console.log('Data:', deleteBannerData);
        console.log('Delete Banner Error:', deleteBannerError);
        
        // 2. Delete the blog record in Supabase
        const { error: deleteBlogError } = await supabase.from('blogs').delete().eq('id', blogId);
        
        if (deleteBlogError) {
            // If blog deletion fails, we need to rollback the file deletion manually (if possible)
            console.error('Error deleting blog:', deleteBlogError);
            return{success: false, error: deleteBlogError.message};
        }
        
        console.log('✅ Blog and banner deleted successfully')
        
        // Revalidate the desired paths
        revalidatePath("/admin/blogs_management/my_blogs");
        revalidatePath("/admin/dashboard");
        
        return { success: true, message: 'Blog deleted successfully.' }
    } catch (error) {
        // Catch any errors that occurred during the process
        console.error('Error during blog deletion process:', error.message);
        
        return { success: false, error: error.message }
    }
}
