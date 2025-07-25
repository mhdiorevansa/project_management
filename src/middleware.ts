import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/dashboard"];

const middleware = async (req: NextRequest) => {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { pathname } = req.nextUrl;
	const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
	const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

	if (!user && isProtected) {
		const loginUrl = req.nextUrl.clone();
		loginUrl.pathname = "/login";
		return NextResponse.redirect(loginUrl);
	}

	if (user && isAuthRoute) {
		const dashboardUrl = req.nextUrl.clone();
		dashboardUrl.pathname = "/dashboard";
		return NextResponse.redirect(dashboardUrl);
	}
	return res;
};

export const config = {
	matcher: ["/dashboard/:path*", "/login/:path*", "/register/:path*"],
};

export default middleware;
