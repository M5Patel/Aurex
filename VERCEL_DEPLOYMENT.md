# Vercel Deployment Guide

## Quick Deploy

1. Push your repo to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your repository
4. **Build Settings** (usually auto-detected):
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

## Environment Variables

In **Project Settings** → **Environment Variables**, add:

| Name | Value | Required |
|------|-------|----------|
| `VITE_UNSPLASH_ACCESS_KEY` | Your Unsplash API access key | Optional (search works without it) |
| `VITE_SUPABASE_URL` | Supabase project URL | Optional (feedback falls back to localStorage) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key | Optional |

**Important:** Only use `VITE_` prefixed variables—they are exposed to the frontend. Never add secret keys.

## SPA Routing

`vercel.json` is configured with a rewrite rule so all routes fall back to `index.html` (required for client-side routing).

## Build Verification

```bash
npm run build
```

Build should complete with no errors. Run `npm run preview` to test the production build locally.
