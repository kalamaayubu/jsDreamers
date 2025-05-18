import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(req) {
    const supabase = await createClient()
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    console.log("OAuth code received:", code);

    if (!code) {
        console.error("Missing OAuth code in URL.");
        return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    // Exchange the OAuth code for a session
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    console.log("Session data:", data);
    if (exchangeError || !data) {
        console.error("Error exchanging code for session:", exchangeError?.message);
        return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    // Set auth cookies manually
    const { access_token, refresh_token } = data.session;

    const cookieStore = await cookies()
    
    // The access token
    cookieStore.set('sb-access-token', access_token, {
        path: '/', 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict', // You might want to include SameSite for additional security
        maxAge: 60 * 60 * 5 // Five hours
    })

    // The refresh token
    cookieStore.set("sb-refresh-token", refresh_token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Get the authenticated user 
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log("User data:", user);
    if (userError || !user) {
        console.error("Error fetching authenticated user:", userError?.message || "No user returned");
        return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    // Fetch the user's profile to get the role
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
    
        console.log("Profile data:", profile);

    if (profileError || !profile.role) {
        console.error("Error fetching user role from profiles table:", profileError?.message || "Role missing");
        return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    // Set the authState cookie with the user's role
    cookieStore.set({
        name: "authState",
        value: (JSON.stringify({
          isAuthenticated: true,
          user,
          role: profile.role,
        })),
        httpOnly: true, // prevents access from JavaScript (more secure)
        secure: process.env.NODE_ENV === "production", // HTTPS-only in production
        path: "/", // cookie is available throughout the app
        sameSite: "lax", // mitigates CSRF, still allows normal navigation
        maxAge: 60 * 60 * 24 * 7, // 7 days (you can change as needed)
      })

    // construct the redirect URL based on the user's role
    let redirectUrl = "/auth/login";

    switch (profile.role) {
        case "admin": 
            redirectUrl = "/admin/dashboard";
            break;
        case "user": 
            redirectUrl = "/user/dashboard";
            break;
    }

    // The response
    console.log("Redirecting to:", redirectUrl);
    return NextResponse.json({ redirectUrl });
}