import { createClient } from "@/lib/supabase/server"
import { mkdir, writeFile} from 'fs/promises';
import { revalidatePath } from "next/cache";
import { join } from "path";

export async function POST(req) {
    const supabase = await createClient()

    // Get the logged in user's ID (This is the author)
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log('USER:', user.id)

    if (authError || !user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Get the content of the request
    const reqData = await req.formData()
    const title = reqData.get('title')
    const blogContent = reqData.get('content')
    const blogImage = reqData.get('blogImage')

    // Convert file( blogImage in this case ) to a buffer
    const bytes = await blogImage.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Define the directory and path to save the file
    const publicDir = join(process.cwd(), 'public', 'blogs_banners')
    const path = join(publicDir, blogImage.name) // Construct the full path

    try {
        // Ensure that blogs_banners directory exist, creating it recursively if not
        await mkdir(publicDir, { recursive: true })
        await writeFile(path, buffer) // Write the uploaded file to the constructed path

        const fileUrl = `/blogs_banners/${blogImage.name}`

        // Insert blog into supabase
        const { data, error } = await supabase.from('blogs').insert([
            {
                title,
                content: blogContent,
                image: fileUrl,
                author: user.id
            }
        ]);

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        // Trigger the revealidation of blogs page
        revalidatePath('/blogs')
        return new Response(JSON.stringify({ success: true, data, message: 'Blog published successful' }), { status: 201 });

    } catch (error) {
        console.log('Error uploading image:', error)
        return new Response(JSON.stringify({ message: 'Error uploading image'}), { status: 500 });
    }
}