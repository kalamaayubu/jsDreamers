'use server'

import { createClient } from "@/lib/supabase/server";


export async function getUser() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Cannot check user login state", error);
  }
  return data?.user || null;
}
