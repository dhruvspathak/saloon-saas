# Quick Reference Guide

## 🚀 Getting Started

### Local Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Visit
http://localhost:3000
```

### Production Build
```bash
# Build
npm run build

# Start
npm start
```

---

## 🔧 Setup Checklist

| Step | Action |
|------|--------|
| 1 | [Supabase](https://supabase.com) → New Project → Create `leads` table → Copy keys to `.env.local` |
| 2 | [Google Cloud Console](https://console.cloud.google.com) → Enable Places API → Create API Key → Add to `.env.local` & config |
| 3 | GitHub push → [Vercel](https://vercel.com/new) → Connect repo → Add env vars → Deploy |

---

## 📁 File Structure

### New Files
```
types/ → lead.js, review.js, config.js
lib/supabase.js, services/ → googleReviews.js, leadProcessor.js
components/ → GoogleReviewsWidget.jsx, BeforeAfterGallery.jsx
pages/api/lead.js
Docs → ARCHITECTURE.md, ENV_SETUP.md, DEPLOYMENT.md
```

---

## 🎯 Key Features

### Features
**Google Reviews:** Auto-fetched via `<GoogleReviewsWidget placeId="..." />`

**Lead Database:** POST to `/api/lead` with `{salonId, name, phone, service, preferredDate, message}`

**Before/After:** Add `transformations: [{title, before, after}, ...]` to config

---

## 🧪 Testing Features

### Testing
- **Leads:** localhost:3000 → Book form → Check Supabase tables
- **Reviews:** Add API key → Add placeId → Restart → Check homepage
- **Gallery:** Add transformations to config → Refresh

---

## 📊 Configuration Example

**config/salon.json** (Extended)
```json
{
  "salon": {
    "id": "cinderella-andheri",
    "name": "Cinderella Sharon's Rose Beauty Salon",
    "location": { ... },
    "services": [ ... ],
    "gallery": [ ... ],
    "reviews": [ ... ]
  },
  "google": {
    "placeId": "ChIJ1b1-KKb64zoRTYlIx-dI1xk"
  },
  "transformations": [
    {
      "title": "Keratin Treatment",
      "before": "https://images.pexels.com/...",
      "after": "https://images.pexels.com/..."
    }
  ]
}
```

---

## Deploy to Vercel

```bash
git add . && git commit -m "Deploy" && git push origin main
```
Vercel auto-deploys. Add env vars in Vercel dashboard → Redeploy if needed.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails | `rm -rf .next && npm run build` |
| Google reviews empty | Check key, placeId, API enabled, console errors |
| Leads not saving | Check Vercel has SUPABASE_SERVICE_ROLE_KEY, Supabase table exists, RLS allows inserts |
| Env vars not working | Restart: `npm run dev`, redeploy, check names exact |

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| [README.md](README.md) | Feature overview |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design & roadmap |
| [ENV_SETUP.md](ENV_SETUP.md) | Step-by-step setup guide |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Vercel deployment |
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | What was built |
| [CONFIG_GUIDE.md](CONFIG_GUIDE.md) | Config reference |
| [QUICK_START.md](QUICK_START.md) | Quick start |

## Pro Tips & Learning Resources

**Best Practices:** Test locally, keep config organized, high-quality images, monitor quotas

**Docs:** README.md (overview), ARCHITECTURE.md (design), ENV_SETUP.md (setup), DEPLOYMENT.md (deploy), CONFIG_GUIDE.md (config)

**Learn:** [Next.js](https://nextjs.org/docs), [Supabase](https://supabase.com/docs), [Google Places](https://developers.google.com/maps/documentation/places/web-service), [Vercel](https://vercel.com/docs)

---

**Status:** 🟢 Ready for deployment | Build: ✅ Success | Features: ✅ All implemented
