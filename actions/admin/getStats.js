'use server'

import { createClient } from "@/lib/supabase/server"

// Get the number of all users
export async function getNumberOfUsers() {
    const supabase = await createClient()

    const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact'})

        if (error) {
            console.error("Error fetching number of users:", error)
            return null  
        }
    
    return count  
}

// Get the number of all blogs
export async function getNumberOfBlogs() {
    const supabase = await createClient()

    const { count, error } = await supabase
        .from("blogs")
        .select('*', { count: 'exact' })

    if (error) {
        console.error("Error fetching number of blogs:", error)
        return null 
    }

    console.log("Number of blogs:", count)
    return count
}

// Get the number of blogs of the logged in user
export async function getNumberOfMyBlogs(userId) {
    const supabase = await createClient()

    const { count, error } = await supabase
        .from('blogs')
        .select('*', { count: 'exact' })
        .eq('author', userId)

    if (error) {
        console.error("Error fetching number of my blogs:", error)
        return null 
    }

    return count
}