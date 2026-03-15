# Deployment Guide

This guide covers deploying the Salon SaaS to Vercel with all backend features.

## Prerequisites

- ✅ Supabase project created (see [ENV_SETUP.md](ENV_SETUP.md))
- ✅ Google Places API configured
- ✅ Vercel account at [vercel.com](https://vercel.com)
- ✅ GitHub repository (for Vercel integration)

## Step 1: Prepare for Deployment

### Update Configuration

Ensure `config/salon.json` has:
- ✅ `salon.id` - Unique salon identifier
- ✅ `google.placeId` - Google Maps Place ID
- ✅ `transformations` - Before/after gallery (optional)

Example:
```json
{
  "salon": {
    "id": "cinderella-andheri",
    "name": "Your Salon Name",
    ...
  },
  "google": {
    "placeId": "ChIJ..."
  },
  "transformations": [...]
}
```

### Commit All Changes

```bash
git add .
git commit -m "Add backend features and configuration"
git push origin main
```

## Step 2: Create Vercel Project

### Option A: Connect from GitHub

1. Go to [vercel.com/new](https://vercel.com/new)
2. Select the **salon-saas** repository
3. Click **Import**

### Option B: Using Vercel CLI (Already Done)

If you've already run `vercel` locally:
```bash
vercel --prod
```

## Step 3: Add Environment Variables

1. **In Vercel Dashboard:**
   - Select your project
   - Go to **Settings** → **Environment Variables**

2. **Add all variables:**

Copy from your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
NEXT_PUBLIC_SALON_ID
```

⚠️ **Important:** 
- Make sure `SUPABASE_SERVICE_ROLE_KEY` is added (it's needed for API routes)
- Only `NEXT_PUBLIC_*` vars are available in browser

3. After adding, click **Save**

4. **Redeploy to apply variables:**
   - Go to **Deployments**
   - Click the latest deployment
   - Click **Redeploy**

## Step 4: Test in Production

### Check Deployment

1. Visit your Vercel URL: `https://salon-saas.vercel.app`
2. Open browser DevTools → **Console**
3. Look for:
   - ✅ "Google Reviews loaded" (if API key is valid)
   - ✅ Before/After gallery section visible
   - ✅ Booking form loads

### Test Lead Submission

1. Scroll to **Book Your Appointment**
2. Fill out form with:
   - Name: Test User
   - Phone: 9876543210
   - Service: Any service
   - Date: Any future date
3. Click **Book Now**
4. Should see success message + WhatsApp window

### Verify Database

1. Go to **Supabase Dashboard**
2. **Database** → **Tables** → **leads**
3. You should see the test lead record

## Step 5: Enable Auto-Deployment

### Automatic Deployments (Default)

Vercel automatically deploys on git push:

```bash
git push origin main  # Automatic deployment to production
git push origin dev   # Creates preview deployment
```

### Branch Protection (Recommended)

1. Go to GitHub repository **Settings** → **Branches**
2. **Add rule** for `main`:
   - ✅ Require pull request reviews (1-2 approvals)
   - ✅ Require status checks (if using GitHub Actions)
   - ✅ Require branches up to date

## Step 6: Preview Deployments

Vercel automatically creates preview deployments for:
- ✅ Pull requests
- ✅ Feature branches

To view:
1. Go to **Deployments** in Vercel
2. Click on preview deployment
3. Open preview URL

## Step 7: Domain Setup (Optional)

### Connect Custom Domain

1. In **Vercel**, go to **Settings** → **Domains**
2. Add your domain: `salonnamehere.com`
3. Follow DNS configuration instructions
4. Wait for DNS propagation (~30 min)

### Configure Emails

If using custom domain email forwarding:
- Set up DNS records as shown in Vercel

## Step 8: Monitoring

### View Logs

**Production Logs:**
- Vercel Dashboard → **Deployments** → Select deployment → **View Runtime Logs**

**Error Tracking:**
- Check for errors in:
  - API calls to Supabase
  - Google API rate limits
  - Environment variable issues

### Monitor Performance

- **Lighthouse:** Speed, SEO, Accessibility
- **Vercel Analytics:** Traffic, Core Web Vitals
- **Supabase:** Database usage, API requests

Go to Project → **Analytics** to view metrics.

## Step 9: Troubleshooting

### "Cannot find module" Error

**Issue:** One of the new modules isn't found

**Solution:**
```bash
# Reinstall dependencies
npm install

# Rebuild
npm run build

# Redeploy
vercel --prod --force
```

### Environment Variables Not Working

**Issue:** Features not working in production

**Solution:**
- ✅ Verify all vars are in Vercel dashboard
- ✅ Redeploy after adding vars
- ✅ Check var names match exactly (.env.local)
- ✅ Make sure `NEXT_PUBLIC_` prefix is included

### Google Reviews Not Showing

**Issue:** Reviews section empty

**Solution:**
- ✅ Check `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` is valid
- ✅ Check `google.placeId` in config/salon.json
- ✅ Check API key has Places API enabled
- ✅ View Vercel logs for API errors

### Leads Not Saving

**Issue:** Booking form shows error

**Solution:**
- ✅ Check `SUPABASE_SERVICE_ROLE_KEY` is in Vercel (not just local)
- ✅ Check Supabase project is active
- ✅ Verify `leads` table exists in Supabase
- ✅ Check Supabase RLS policies allow inserts
- ✅ View Vercel logs: **Deployments** → **Runtime Logs**

## Step 10: Ongoing Maintenance

### Weekly
- ✅ Check error logs in Vercel and Supabase
- ✅ Monitor lead submissions

### Monthly
- ✅ Review analytics
- ✅ Update Google Reviews cache (automatic with ISR)
- ✅ Check for updates: `npm outdated`

### Per Configuration Update
- ✅ Update `config/salon.json`
- ✅ Git push (auto-deploys)
- ✅ Test in production

## Rollback (If Needed)

### Revert to Previous Deployment

1. Go to **Vercel** → **Deployments**
2. Find previous working deployment
3. Click **•••** → **Rollback**

### Or via Git

```bash
git revert HEAD
git push origin main
```

## Success! 🎉

Your Salon SaaS is now live with:
- ✅ Lead database
- ✅ Google reviews
- ✅ Before/after gallery
- ✅ Booking form with Supabase integration
- ✅ Auto-deployment on git push

Next: Set up notifications (WhatsApp, Email, SMS) - see Future Roadmap in [ARCHITECTURE.md](ARCHITECTURE.md)
