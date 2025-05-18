"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const AuthListener = () => {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        router.push("admin/dashboard"); // Change this to your desired post-login route
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  return null;
};

export default AuthListener;
