import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('auth-token')?.value;

  // Protect all routes under /admin
  if (pathname.startsWith('/admin')) {
    if (!authToken) {
      // User is not authenticated, redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verify and decode the JWT
      const decode = jwtDecode(authToken);

      // Check if the user has the 'admin' role
      if (decode.user_role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
      }

      // If the user is an authenticated admin, allow the request to proceed
      return NextResponse.next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Token is invalid or expired, redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};