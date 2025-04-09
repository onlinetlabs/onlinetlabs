import { auth } from "auth";

const authRoutes = ["/login", "/signup"];

export default auth( async (req) => {
  const path = req.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(path);
  const isAuthenticated = req.auth;

  if (isAuthenticated && isAuthRoute) {
    return Response.redirect(new URL("/", req.nextUrl.origin))
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
// export { auth as middleware } from "auth"
