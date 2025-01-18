import { type NextRequest, NextResponse } from 'next/server';

const authRoutes = ['/login', '/register'];
const protectedRoutes = ['/dashboard', '/product-setup'];

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get('access_token');

  if (!accessToken && protectedRoutes.some((prefix) => pathname.startsWith(prefix))) {
    const absoluteURL = new URL('/login', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (accessToken && authRoutes.some((prefix) => pathname.startsWith(prefix))) {
    const absoluteURL = new URL('/product-setup/ai-customer-service', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}
