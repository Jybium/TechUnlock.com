This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

The easiest way to deploy your Next.js app is to use a managed hosting platform that supports Next.js server functions. Refer to the Next.js documentation for hosting options.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Security and Configuration

### Authentication and Token Handling

- The app stores the access token in an httpOnly cookie `access_token` with `SameSite=Lax`, `Secure` (in production), and `Path=/`.
- A CSRF token is set in a readable cookie `csrf_token` with `SameSite=Lax` and `Secure` (in production). The client automatically attaches it in the `x-csrf-token` header for state-changing requests.
- All API calls from the browser go through the internal proxy at `/api/proxy/*`. The proxy reads `access_token` and `csrf_token` cookies and forwards requests to the upstream API. The access token is never exposed to client-side JavaScript.
- The proxy enforces CSRF for non-GET/HEAD/OPTIONS requests and rotates the `csrf_token` after each successful state-changing request.

### Middleware Guards

- `middleware.js` protects selected routes by checking for the presence of the `access_token` cookie and redirects to `/login` if missing.
- Adjust the `matcher` list in `middleware.js` to add or remove protected paths.

### Content Security Policy (CSP)

- CSP headers are set in `next.config.js` via the `headers()` function. Defaults:
  - `default-src 'self'`
  - `script-src 'self' 'unsafe-inline' 'unsafe-eval'`
  - `connect-src` allows your API domain and self
  - `img-src 'self' data: blob: https://res.cloudinary.com`
  - `style-src 'self' 'unsafe-inline'`
  - `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`
- You can customize `connect-src` via the env var `NEXT_PUBLIC_CSP_CONNECT_SRC`.

### Redirect Allowed List

- External redirects (e.g., payment) are validated against an allowed list before navigation.
- Configure allowed domains with `NEXT_PUBLIC_PAYMENT_REDIRECT_ALLOWLIST` as a comma-separated list. Defaults include common payment checkout domains:
  - `NEXT_PUBLIC_PAYMENT_REDIRECT_ALLOWLIST="https://checkout.paystack.com,https://paystack.com"`

### Environment Variables

Create a `.env.local` file with entries like:

```bash
# CSP
NEXT_PUBLIC_CSP_CONNECT_SRC="'self' https://test.techunlock.org"

# Redirect allowlist for external payment pages
NEXT_PUBLIC_PAYMENT_REDIRECT_ALLOWLIST="https://checkout.paystack.com,https://paystack.com"
```

### Smoke Test Checklist

1. Login and confirm cookies: `access_token` (httpOnly, Lax), `csrf_token` (readable, Lax).
2. Visit a guarded route; expect access with token, redirect without.
3. Perform a POST/PUT/PATCH/DELETE and confirm `x-csrf-token` header is sent and a fresh `csrf_token` is issued.
4. Logout; `access_token` is deleted and guarded routes redirect to `/login`.
