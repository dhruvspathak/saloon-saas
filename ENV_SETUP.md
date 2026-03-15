# Environment Setup Guide

This guide covers setting up all external services required for the Salon SaaS backend features.

## Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Vercel account (for deployment)

## 1. Supabase Setup (Lead Database)

### Create Supabase Project

1. Visit [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - **Name**: `salon-saas` (or your choice)
   - **Database Password**: Save this securely!
   - **Region**: Choose closest to your users
5. Wait for project creation (~2 minutes)

### Create Leads Table

1. Go to **Database** → **Tables**
2. Click **Create a new table**
3. Name it: `leads`
4. Add columns:

```sql
id              | UUID                  | Primary Key | default: gen_random_uuid()
salon_id        | text                  | Not Null    | -
name            | text                  | Not Null    | -
phone           | text                  | Not Null    | -
service         | text                  | Nullable    | -
preferred_date  | date                  | Nullable    | -
message         | text                  | Nullable    | -
status          | text                  | Not Null    | default: 'new'
created_at      | timestamp             | Not Null    | default: now()
updated_at      | timestamp             | Not Null    | default: now()
```

5. Click **Save**

### Add Indexes (Performance)

Run in SQL Editor:

```sql
CREATE INDEX idx_leads_salon_id ON leads(salon_id);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_status ON leads(status);
```

### Get API Keys

1. Go to **Settings** → **API**
2. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Google Places API Setup

### Enable Google Places API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Search for **Places API**
4. Click **Enable**
5. Go to **Credentials**
6. Click **Create Credentials** → **API Key**
7. Copy the key → `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`

### Get Your Place ID

For your salon:

1. Visit [Google Maps](https://maps.google.com)
2. Search for your salon
3. Click on it to open details
4. Copy the URL: `maps.google.com/maps/place/...?q=place_id:**ChIJ...**`
5. Extract the `ChIJ...` part → Add to `config/salon.json`:

```json
{
  "google": {
    "placeId": "ChIJ1b1-KKb64zoRTYlIx-dI1xk"
  }
}
```

**Alternative:** Use [Google Places API Finder](https://developers.google.com/maps/documentation/places/web-service/overview)

## 3. Environment Variables

### Local Development (.env.local)

Create `.env.local` in project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<key>
SUPABASE_SERVICE_ROLE_KEY=<key>

# Google Places API
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=AIzaSyD...

# Salon ID (optional, defaults to config.salon.id)
NEXT_PUBLIC_SALON_ID=cinderella-andheri
```

### Production (Vercel)

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. **Settings** → **Environment Variables**
4. Add all variables from `.env.local`
5. Deploy

## 4. Testing Setup

### Test Supabase Connection

```bash
npm run dev
# Visit http://localhost:3000/api/lead with POST request
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "salonId": "test",
    "name": "Test User",
    "phone": "9876543210",
    "service": "Test Service"
  }'
```

Expected response:
```json
{
  "success": true,
  "leadId": "uuid...",
  "message": "Lead saved successfully"
}
```

### Test Google Reviews

Check browser console while visiting homepage. Should see:
```
Rating fetched: 4.7 stars
Reviews: 5 reviews loaded
```

## 5. Troubleshooting

### Supabase Connection Failed
- ✅ Check both URL and keys are correct
- ✅ Verify `NEXT_PUBLIC_` prefix on client-side vars
- ✅ Check network in browser DevTools
- ✅ Restart dev server: `npm run dev`

### Google API Returns 401
- ✅ API key is active and valid
- ✅ Places API is enabled in Google Cloud
- ✅ Check API key restrictions (should be "unrestricted" or include your domain)

### Leads Not Saving
- ✅ Check Supabase table permissions (RLS)
- ✅ Verify service role key is used on server-side only
- ✅ Check browser network tab for POST errors

### Build Fails on Vercel
- ✅ Ensure all `NEXT_PUBLIC_` vars are in Vercel dashboard
- ✅ Check logs: **Vercel Dashboard** → **Deployments** → **Logs**

## 6. Database Row-Level Security (Optional But Recommended)

For production security, set up RLS policies:

```sql
-- Enable RLS on leads table
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert
CREATE POLICY "Allow insert" ON leads 
  FOR INSERT WITH CHECK (true);

-- Allow service role to read all
CREATE POLICY "Service role read all" ON leads 
  FOR SELECT TO authenticated, service_role USING (true);
```

## 7. Monitoring & Logs

### Supabase Logs
- **Supabase Dashboard** → **Logs** → View insert operations

### Vercel Logs
- **Vercel Dashboard** → **Deployments** → **View Runtime Logs**

### Local Development
- Terminal shows all console.log and errors
- Browser DevTools → Network tab for API calls

## Next Steps

✅ Environment setup complete!

Now you can:
1. ✅ Book appointments (saved to database)
2. ✅ Display Google reviews on homepage
3. ✅ View before/after gallery
4. ✅ Deploy to Vercel with all features

See [ARCHITECTURE.md](ARCHITECTURE.md) for technical details.
