# No-Authentication Setup for Internal Use

This guide explains how to use the environment variable toggle to disable authentication for internal use of the Open Agent Platform.

## ✅ Implementation Complete

The no-auth functionality has been successfully implemented with an environment variable toggle.

## What Was Implemented

### 1. ✅ Created No-Auth Provider (`apps/web/src/lib/auth/no-auth-provider.ts`)
- A mock authentication provider that always returns a valid session
- Returns a default "Internal User" that is always logged in
- All auth methods (signIn, signUp, etc.) return success without any actual authentication
- Implements the same `AuthProvider` interface as `SupabaseAuthProvider`
- Includes mock user data: `internal@company.com`, "Internal User", "Internal Company"

### 2. ✅ Created No-Auth Middleware (`apps/web/src/lib/auth/no-auth-middleware.ts`)
- A simplified middleware that allows all requests without authentication checks
- Removes all redirect behavior for unauthenticated users
- Returns a pass-through response for all routes

### 3. ✅ Updated Auth Provider (`apps/web/src/providers/Auth.tsx`)
- Added import for `NoAuthProvider`
- Added environment variable check: `process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true'`
- Conditionally creates either `NoAuthProvider` or `SupabaseAuthProvider`

### 4. ✅ Updated Middleware (`apps/web/src/middleware.ts`)
- Added import for `noAuthUpdateSession`
- Added environment variable check: `process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true'`
- Conditionally uses either no-auth or Supabase middleware

## How It Works

When `NEXT_PUBLIC_DISABLE_AUTH=true` is set:

1. **Always Authenticated**: The system behaves as if a user is always logged in as "Internal User"
2. **No Login Required**: All pages and API routes are accessible without signing in
3. **Mock Session**: A fake session token is provided for any code that expects authentication
4. **Mock User Data**: 
   - ID: `internal-user-id`
   - Email: `internal@company.com`
   - Name: `Internal User`
   - Company: `Internal Company`
5. **UI Elements**: Sign out/Sign in buttons are still visible but non-functional (sign out does nothing)

## Usage

### To Disable Authentication
Create or update `.env.local` file in `apps/web/`:
```bash
NEXT_PUBLIC_DISABLE_AUTH=true
```

### To Enable Supabase Authentication
Either remove the environment variable or set it to false:
```bash
NEXT_PUBLIC_DISABLE_AUTH=false
# OR
# NEXT_PUBLIC_DISABLE_AUTH=
```

And ensure you have Supabase credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL="<your supabase url>"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<your supabase anon key>"
```

## Security Considerations

⚠️ **WARNING**: This no-auth setup completely disables authentication and should ONLY be used for:
- Internal tools on secure networks
- Development environments
- Demo deployments with no sensitive data

**DO NOT** use this configuration for:
- Production environments with real user data
- Public-facing applications
- Any deployment that requires access control

## Files Created/Modified

### ✅ New Files Created:
- `apps/web/src/lib/auth/no-auth-provider.ts` - Mock authentication provider
- `apps/web/src/lib/auth/no-auth-middleware.ts` - Pass-through middleware

### ✅ Modified Files:
- `apps/web/src/providers/Auth.tsx` - Added environment variable toggle
- `apps/web/src/middleware.ts` - Added environment variable toggle

## Testing the Implementation

To test that the no-auth mode is working:

1. Set `NEXT_PUBLIC_DISABLE_AUTH=true` in your `.env.local`
2. Start your development server
3. Navigate to any page - you should automatically be "logged in" as "Internal User"
4. Check the user profile/settings - should show "internal@company.com"
5. Try accessing protected routes - they should all be accessible
6. Sign out button should not actually sign you out

To revert back to normal authentication:
1. Set `NEXT_PUBLIC_DISABLE_AUTH=false` or remove the variable
2. Restart your development server
3. Normal Supabase authentication should be restored 