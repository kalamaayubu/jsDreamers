"use client";

import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { toast } from "react-toastify";

const ContinueWithGoogle = () => {
  const supabase = createClient();

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/google_auth_callback`, // Redirect URL after successful login
      },
    });

    if (error) {
      console.error("Error during Google login:", error.message);
      toast.error("Error during Google login. Please try again.");
      return;
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-4 py-3 px-4 rounded-lg cursor-pointer border border-gray-200 hover:bg-gray-100 hover:border-gray-200 bg-white transition duration-200 ease-in-out w-full"
    >
      <Image
        width={1000}
        height={1000}
        src={`/assets/googleLogo.png`}
        alt="Google"
        className="w-6 h-6"
        priority={true}
      />
      <p className="text-center md:hidden text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
        Continue with Google
      </p>
      <p className="hidden md:block text-center text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
        Continue with Google
      </p>
    </button>
  );
};

export default ContinueWithGoogle;
