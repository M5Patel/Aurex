# Supabase Feedback Setup

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free project
2. Wait for the project to be ready

## 2. Create Feedback Table

In the Supabase SQL Editor, run:

```sql
CREATE TABLE feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  product_feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: Enable Row Level Security (RLS) and add a policy for inserts
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts" ON feedback FOR INSERT WITH CHECK (true);
```

## 3. Get Your Keys

1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** → use as `VITE_SUPABASE_URL`
   - **anon public** key → use as `VITE_SUPABASE_ANON_KEY`

## 4. Add Environment Variables

### Local (.env)

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_key_here
```

### Vercel

1. Project → **Settings** → **Environment Variables**
2. Add:
   - `VITE_SUPABASE_URL` = your project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
   - `VITE_UNSPLASH_ACCESS_KEY` = your Unsplash access key (optional)

**Note:** Never use the `service_role` key in frontend code. The `anon` key is safe for client-side use with RLS.

## 5. Email Notifications (Optional)

Use Supabase Edge Functions or a third-party service (e.g. Resend, SendGrid) to send an email when a row is inserted into `feedback` via database webhooks.
