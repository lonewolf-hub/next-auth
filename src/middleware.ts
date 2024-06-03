import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = ['/login', '/signup', '/'].includes(path);
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        // Redirect authenticated users from public paths
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }

    if (!isPublicPath && !token) {
        // Redirect unauthenticated users from private paths
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    // Check if the user is an admin
    const isAdmin = checkAdminRole(token);

    if (!isAdmin && isAdminPath(path)) {
        // Redirect non-admin users from admin paths
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }

    return null; // Return null if no redirection is needed
}

function checkAdminRole(token: string): boolean {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as { role: string };
        return decoded.role === 'admin';
    } catch (error) {
        return false;
    }
}

function isAdminPath(path: string): boolean {
    // Add paths that require admin role
    return ['/admin', '/manage'].includes(path);
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/profile/:path*',
        '/login',
        '/signup',
        '/verifyemail',
        '/admin',
        '/manage',
    ]
};
