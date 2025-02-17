'use server'

import supabaseAdmin from "@/lib/supabase/supabaseAdmin"

export async function forgotPassword(email) {
    // Check if the email exists
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ email })

    if (error) {
        console.log('Error:::', error.message)
        return { success: false, error: `${error.message}` };
    }

    // Send the password reset email
    const { error: sendEmailError } = await supabaseAdmin.auth.resetPasswordForEmail(email, { 
        redirectTo: `http://localhost:3000/auth/reset_password`
    })

    if (sendEmailError) {
        console.log('Error sending email:', sendEmailError)
        return { success: false, error: sendEmailError.message };
    }

    return { success: true, message: 'Request sent successfully. Check your email.'}
}