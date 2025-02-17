import { createClient } from "@/lib/supabase/server"; // Use this only for user auth
import { revalidatePath } from "next/cache";

export async function POST(req) {
    const supabase = await createClient();

    // Get the logged-in user's ID (This is the author)
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log("USER:", user?.id);

    if (authError || !user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Get the content of the request
    const reqData = await req.formData();
    const title = reqData.get("title");
    const blogContent = reqData.get("content");
    const blogImage = reqData.get("blogImage");

    let imageUrl = null;

    try {
        if (blogImage) {
            // Convert file into a buffer
            const bytes = await blogImage.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Define a unique filename (timestamp + original name)
            const filePath = `blogs/${Date.now()}-${blogImage.name}`;

            // Upload file to the storage
            const { data, error } = await supabase.storage
                .from("blogs-bucket")
                .upload(filePath, buffer, { contentType: blogImage.type });

            if (error) {
                console.error("Error uploading image:", error);
                return new Response(JSON.stringify({ error: "Error uploading image" }), { status: 500 });
            }

            // Correct usage of getPublicUrl()
            imageUrl = supabase.storage.from("blogs-bucket").getPublicUrl(filePath).data.publicUrl;
        }

        // Insert blog into supabase
        const { data, error } = await supabase
            .from("blogs")
            .insert([
                {
                    title,
                    content: blogContent,
                    image: imageUrl,
                    author: user.id,
                }
            ]);

        if (error) {
            console.error("Error inserting blog:", error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        // Revalidate the desired paths and return a response
        revalidatePath("/blogs");
        revalidatePath("/admin/blogs_management/my_blogs");
        return new Response(JSON.stringify({ success: true, data, message: "Blog published successfully" }), { status: 201 });

    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ message: "Error processing request" }), { status: 500 });
    }
}
