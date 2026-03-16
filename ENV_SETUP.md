# Environment Setup Guide

This guide covers setting up all external services required for the Salon SaaS backend features.

## Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Vercel account (for deployment)

## 1. Supabase Setup

**Create Project:** [supabase.com](https://supabase.com) → New Project → Fill details → Create

**Create `leads` table:** Database → Tables → Create new table with columns:
```sql
id (UUID, PK), salon_id (text), name (text), phone (text), service (text),
preferred_date (date), message (text), status (text, default 'new'),
created_at (timestamp, default now()), updated_at (timestamp, default now())
```

**Add indexes:**
```sql
CREATE INDEX idx_leads_salon_id ON leads(salon_id);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_status ON leads(status);
```

**Get API Keys:** Settings → API → Copy Project URL, anon key, service_role key

## 2. Google Places API Setup

**Enable API:** [Google Cloud Console](https://console.cloud.google.com) → Places API → Enable → Credentials → Create API Key

**Get Place ID:** [Google Maps](https://maps.google.com) → Search salon → Copy URL parameter `place_id:ChIJ...` → Add to `config/salon.json`:
```json
{"google": {"placeId": "ChIJ1b1-KKb64zoRTYlIx-dI1xk"}}
```

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

## 4. Testing

**Supabase:** `npm run dev` → POST to `/api/lead` → Should return `{success: true, leadId: "uuid..."}`

**Google Reviews:** Visit homepage → View browser console → Should show "Rating fetched" messages

## 5. Troubleshooting

| Issue | Solution |
|-------|----------|
| Supabase connection fails | Verify URL & keys, check `NEXT_PUBLIC_` prefix, restart dev server |
| Google API 401 error | Enable Places API, verify key is active, remove key restrictions |
| Leads not saving | Check Supabase RLS, verify service role key in .env, check network tab |
| Vercel build fails | Add all `NEXT_PUBLIC_` vars to Vercel dashboard, check deployment logs |

## 6. Production Security (RLS)

```sql
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow insert" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role read all" ON leads FOR SELECT USING (true);
```

## 7. Monitoring

**Supabase:** Dashboard → Logs | **Vercel:** Dashboard → Deployments → Logs | **Local:** Terminal + DevTools Network
