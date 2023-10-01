import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (!token) return false
      const pathName = req.nextUrl.pathname
      console.log(pathName)
      const isAdmin = token?.role === "admin" && pathName.startsWith("/dashboard")
      return isAdmin
    }
  },
  pages: {
    signIn: '/login',
  }
})

export const config = {
  matcher: [
    '/dashboard/:path*',
  ]
}