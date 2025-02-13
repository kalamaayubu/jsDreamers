import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"


export async function updateSession(request) {
    const { pathname } = request.nextUrl
    let supabaseResponse = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL, 
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll() // Returns all the cookies of the request, for session management
                },
                setAll(cookiesToSet) {
                    // 1. Update the request cookies
                    cookiesToSet.forEach(({ name, value, options }) => {
                        request.cookies.set(name, value)
                    })
                    // 2. Create a new response object to ensure request cookies are retained
                    supabaseResponse = NextResponse.next({ request })
                    // 3. Apply updated cookies to the response so that client can get it
                    cookiesToSet.forEach(({ name, value, options }) => {
                        supabaseResponse.cookies.set( name, value, options )
                    });
                },
            },
        }
    );

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    // console.log('USER:::', user)

    // Redirect to login page is not in session and tries to access protected pages
    if (!user && !pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Get authState cookie and parse it
    const authStateCookie = request.cookies.get('authState')?.value;

    let role = undefined

    // Get role from authStateCooke (instead of DB call)
    if (authStateCookie) {
        try {
            const authState = JSON.parse(decodeURIComponent(authStateCookie))
            role = authState?.role
            // console.log('ROLE:::', role)
            if (!role) {
                return NextResponse.redirect(new URL('/auth/login'))
            }
        } catch (error) {
            console.error("Failed to parse authState cookie:", error);
        }
    }

    // Redirect the user as per their role
    if (pathname.startsWith('/admin') && role !== 'admin') {
        return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url))
    }
    if (pathname.startsWith('/user') && role !== 'user') {
        return NextResponse.redirect(new URL(`${role}/dashboard`, request.url))
    }

    return supabaseResponse;
}