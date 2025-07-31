import { NextResponse, type NextRequest } from "next/server";

export async function noAuthUpdateSession(request: NextRequest) {
  // In no-auth mode, we simply pass through all requests without any authentication checks
  // This allows all pages and API routes to be accessible without authentication
  
  const response = NextResponse.next({
    request,
  });

  // No authentication logic needed - all requests are allowed
  // No redirects to login pages
  // No session validation
  
  return response;
}