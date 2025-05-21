import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const supabase = await createClient();
        const { email, password } = await req.json(); // Get form data

        // Step 1: Create user using Supabase Auth API
        const { data: user, error: authError } = await supabase.auth.signUp({ email, password });

        if (authError || !user) {
            console.error("Auth Error:", authError);
            return NextResponse.json({ success: false, error: authError?.message || "Auth failed" }, { status: 400 });
        }

        const userId = user.user?.id;

        // Fetch the profile to ensure it was created
        const { data: userProfile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();

        if (profileError) {
            console.error("Profile Insertion Error:", profileError?.message);
            return NextResponse.json({ success: false, error: "Signup failed, profile not created." }, { status: 400 });
        }
        if (!userProfile) {
            console.error("User profile not found.");
            return NextResponse.json({ success: false, error: "User profile not found." }, { status: 400 });
        }

        console.log("Successfully signed up:", user);
        return NextResponse.json({ success: true, user, message: "Signup successful. Check your email for verification." }, { status: 200 });
    } catch (err) {
        console.error("API Error:", err);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
