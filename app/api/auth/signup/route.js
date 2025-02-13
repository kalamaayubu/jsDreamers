import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { rollbackUser } from "../../../../utils/rollbackSignup";

export async function POST(req) {
    try {
        const supabase = await createClient();
        const { email, password } = await req.json(); // Get form data

        // Step 1: Create user using Supabase Auth API
        const { data: user, error: authError } = await supabase.auth.signUp({ email, password });

        if (authError || !user) {
            console.error("Auth Error:", authError?.message);
            return NextResponse.json({ success: false, error: authError?.message || "Auth failed" }, { status: 400 });
        }

        const userId = user.user?.id;

        // Step 2: Call the signup_transaction function
        const { error: rpcError } = await supabase.rpc("signup_transaction", {
            _user_id: userId,
            _email: email,
        });

        if (rpcError) {
            console.error("Transaction Error:", rpcError.message);

            // 🚨 Rollback: Delete user if profile creation fails
            const rollbackSuccess = await rollbackUser(supabase, userId)

            if (!rollbackSuccess) {
                return NextResponse.json({ success: false, error: "Signup failed, could not rollback. Please contact support."}, { status: 500 })
            }

            return NextResponse.json({ success: false, error: "Signup failed, user deleted." }, { status: 400 });
        }

        console.log("Successfully signed up:", user);
        return NextResponse.json({ success: true, user, message: "Signup successful. Please Check your email for verification." }, { status: 200 });
        
    } catch (err) {
        console.error("API Error:", err);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
