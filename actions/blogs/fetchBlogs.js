'use server'

import { createClient } from '@/lib/supabase/server'


export async function fetchBlogs() {
  const supabase = await createClient() // Initialize supabase

  // Fetch blogs from Supabase
  const { data: blogs, error } = await supabase.from('blogs').select('*')

  if (error) {
    console.error('Error fetching blog:', error.message)
    return { success: false, error: error.message }
  }

  return blogs
}
