'use server'

import { createClient } from "@/lib/supabase/server";

export async function callFunction() {
    const supabase = await createClient()

    const { data, error } = await supabase.rpc('hello_world')
    if (error) {
        console.log('Error:', error.message)
        return { error: error.message, success: false }
    } else {
        console.log('Data:', data); // Should output 'Hello world!'
        return { message: data, success: false }
    }
  
}

