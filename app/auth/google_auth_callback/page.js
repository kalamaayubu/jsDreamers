'use client'

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GoogleAuthCallback = () => {
    const [redirectUrl, setRedirectUrl] = useState(null);
    const [attempts, setAttempts] = useState(0);
    const router = useRouter()
    const code = useSearchParams().get("code");
    const path = usePathname();

    useEffect(() => {
        const handleRedirect = async () => {
            // Fetch the redirect URL from the server
            const response = await fetch(`/api/auth/callback?code=${code}`);

            console.log("Response from server:", response);
            if (!response.ok) {
                console.error("Failed to fetch redirect URL");
                return;
            }

            const data = await response.json();
            const redirectUrl = data.redirectUrl;

            setRedirectUrl(redirectUrl);
            console.log("Redirect URL:", redirectUrl);

            // Make 10 redirect attempts to the desired dashboard
            while (path.startsWith("/auth/login")) {
                console.log("Redirecting to:", redirectUrl);
                setTimeout(() => {
                    router.push(redirectUrl);
                }, 100); // Wait for 0.1 second before redirecting
            }
        };

        handleRedirect();
    }, [router, path, code]);

    useEffect(() => {
        if (!redirectUrl || !path.startsWith("/auth/google_auth_callback")) return;

        const interval = setInterval(() => {
            setAttempts((prev) => prev + 1);
            console.log(`Redirect attempt ${attempts + 1} to ${redirectUrl}`);
            router.push(redirectUrl);

            // Stop after 10 tries just in case
            if (attempts >= 9) {
                clearInterval(interval);
            }
        }, 500); // every 0.5 seconds

        return () => clearInterval(interval);
    }, [redirectUrl, path, router, attempts]);

  return (
    <div>Please wait as we are redirecting you to your dashboard. 
        {redirectUrl && (
            <> If this takes too long, click <Link href={redirectUrl} className="text-blue-800 hover:underline">this link</Link> to manually navigate.</>
        )}
    </div>
  )
}

export default GoogleAuthCallback