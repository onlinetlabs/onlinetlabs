import { auth } from "@auth"

const authRoutes = ["/login", "/signup"];

export default auth((req) => {
  const path = req.nextUrl.pathname;
  const isPublicRoute = authRoutes.includes(path);
  const isAuthenticated = req.auth;

  if (isAuthenticated && isPublicRoute) {
    const newUrl = new URL("/", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
