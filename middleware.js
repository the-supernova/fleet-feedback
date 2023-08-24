export { default } from "next-auth/middleware"

export const config = {
    matcher: ['/api/:path*', '/site/:path*', '/sites/:path*', '/feedback/:path*']
}
