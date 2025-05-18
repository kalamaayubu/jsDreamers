'use server'

import supabaseAdmin from "@/lib/supabase/supabaseAdmin"

export async function forgotPassword(email) {
    // Check if the email exists
    const { data: users,  error: fetchUsersError } = await supabaseAdmin.auth.admin.listUsers()

    if (fetchUsersError) {
        console.log('Error:::', fetchUsersError.message)
        return { success: false, error: `${fetchUsersError.message}` };
    }

    // Find the user by email
    const user = users?.users?.find(user => user.email === email)
    if (!user) {
        return { success: false, error: 'Email not found!' };
    }

    // Get the base URL dynamically for appropriate redirection
    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://jsdreamers.netlify.app'
        : 'http://localhost:3000';

    // Send the password reset email
    const { error: sendEmailError } = await supabaseAdmin.auth.resetPasswordForEmail(email, { 
        redirectTo: `${baseUrl}/auth/reset_password`
    })

    if (sendEmailError) {
        console.log('Error sending email:', sendEmailError)
        return { success: false, error: sendEmailError.message };
    }

    return { success: true, message: 'Request sent. Check your email.'}
}