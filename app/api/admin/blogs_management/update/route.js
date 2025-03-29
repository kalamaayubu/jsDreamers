import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Image is not included in update(can not be updated after publish)
export async function POST(req) {
    const supabase = await createClient()

    // Get the blog information from the client
    const formData = await req.formData()
    const title = formData.get('title')
    const content = formData.get('content')
    const blogId = formData.get('id')

    // Make sure that title or content is present before proceeding
    if (!title && !content) {
        return NextResponse.json({ success: false, error: 'No data to update'});
    }

    try {
        // Build the fields to update based on changes
        const updatedFields = {};
        if (title) updatedFields.title = title;
        if (content) updatedFields.content = content;

        // If no fields are provided to update, return an error response
        if (Object.keys(updatedFields).length === 0) {
            return NextResponse.json({ success: false, error: 'No changes to update.' }, { status: 400 });
        }

        // Update the blog in the database
        const { data, error } = await supabase
            .from('blogs')
            .update(updatedFields)
            .eq('id', blogId)

        // Handle errors
        if (error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 500 })
        }

        // Return success response
        return NextResponse.json({ success: true, message: 'Blog updated successfully!', data });
    } catch (error) {
        console.error('Error updating blog:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    
}