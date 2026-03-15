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

### Step 1: Supabase (Database)
- [ ] Go to [supabase.com](https://supabase.com)
- [ ] Create project
- [ ] Create `leads` table (schema in ENV_SETUP.md)
- [ ] Copy API keys to `.env.local`:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://...
  NEXT_PUBLIC_SUPABASE_ANON_KEY=...
  SUPABASE_SERVICE_ROLE_KEY=...
  ```

### Step 2: Google Places API
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com)
- [ ] Enable Places API
- [ ] Create API Key
- [ ] Find your salon's Place ID on Google Maps
- [ ] Add to `.env.local`:
  ```env
  NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=...
  ```
- [ ] Update `config/salon.json`:
  ```json
  {
    "google": {
      "placeId": "ChIJ..."
    }
  }
  ```

### Step 3: Deployment (Vercel)
- [ ] Push to GitHub
- [ ] Connect to [Vercel](https://vercel.com/new)
- [ ] Add environment variables in Vercel dashboard
- [ ] Deploy

---

## 📁 File Structure

### New Files Added
```
types/
  ├── lead.js              ← Lead data types
  ├── review.js            ← Review data types
  └── config.js            ← Config data types

lib/
  └── supabase.js          ← Supabase client

services/
  ├── googleReviews.js     ← Google API integration
  ├── leadProcessor.js     ← Lead validation & storage
  └── configLoader.js      ← Config management

components/
  ├── GoogleReviewsWidget.jsx    ← Reviews widget
  └── BeforeAfterGallery.jsx     ← Transformations

pages/
  └── api/
      └── lead.js          ← POST /api/lead endpoint

Documentation/
  ├── ARCHITECTURE.md      ← System design
  ├── ENV_SETUP.md         ← Environment setup
  ├── DEPLOYMENT.md        ← Vercel deployment
  └── IMPLEMENTATION_SUMMARY.md  ← This implementation
```

---

## 🎯 Key Features

### Google Reviews
```javascript
// Auto-fetched and displayed in:
<GoogleReviewsWidget googleData={data} placeId="..." />
```

### Lead Database
```javascript
// POST to /api/lead with:
{
  salonId: "cinderella-andheri",
  name: "Customer Name",
  phone: "+91-98765-43210",
  service: "Service Name",
  preferredDate: "2026-03-20",
  message: "Optional"
}
```

### Before/After Gallery
```javascript
// Config in salon.json:
"transformations": [
  {
    "title": "Service Name",
    "before": "/images/before.jpg",
    "after": "/images/after.jpg"
  }
]
```

---

## 🧪 Testing Features

### Test Lead Submission
1. Visit http://localhost:3000
2. Scroll to "Book Your Appointment"
3. Fill form and submit
4. Check Supabase: **Tables** → **leads**

### Test Google Reviews
1. Add NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
2. Add google.placeId to config
3. Restart dev server
4. Reviews should appear on homepage

### Test Before/After Gallery
1. Add transformations to config/salon.json
2. Refresh page
3. Gallery should appear between Services and Reviews

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

## 🚢 Deployment to Vercel

### 1. Prepare Repository
```bash
git add .
git commit -m "Add backend features"
git push origin main
```

### 2. Create Vercel Project
- Visit [vercel.com/new](https://vercel.com/new)
- Select your GitHub repo
- Click Import

### 3. Add Environment Variables
In Vercel Dashboard:
- Settings → Environment Variables
- Add all vars from `.env.local`

### 4. Deploy
- Vercel auto-deploys on git push
- View progress in Deployments panel

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Google Reviews Not Loading
- [ ] Check NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
- [ ] Verify google.placeId in config
- [ ] Check browser console for errors

### Leads Not Saving
- [ ] Check SUPABASE_SERVICE_ROLE_KEY in Vercel
- [ ] Verify leads table exists
- [ ] Check Supabase logs

### Environment Variables Not Working
- [ ] Restart dev server: `npm run dev`
- [ ] Redeploy on Vercel after adding vars
- [ ] Check var names are exact

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

---

## 💡 Pro Tips

1. **Test locally first** before pushing to production
2. **Keep config.json organized** for future multi-tenant scaling
3. **Use high-quality images** (1920x1080 for hero, 500x500 for gallery)
4. **Monitor Supabase usage** in free tier (includes 500K monthly rows)
5. **Check Google API quota** (25,000 requests/day free)
6. **Set up branch protection** on GitHub main branch

---

## 🎯 Next Steps

### Immediate (This Week)
- [ ] Set up Supabase
- [ ] Configure Google Places API
- [ ] Test locally
- [ ] Deploy to Vercel

### Short Term (Next Sprint)
- [ ] Add email notifications
- [ ] Create admin dashboard
- [ ] Set up CI/CD

### Medium Term (Q2)
- [ ] Multi-tenant support
- [ ] Payment processing
- [ ] WhatsApp integration

### Long Term (Q3+)
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Integrations marketplace

---

## ❓ FAQ

**Q: Is database required?**
A: No, but recommended. Without it, bookings only go to WhatsApp.

**Q: Can I use without Google API?**
A: Yes, reviews section will simply not display.

**Q: How do I scale to multiple salons?**
A: Architecture supports `/salon/[slug].json` configs. See ARCHITECTURE.md.

**Q: What's the cost?**
A: Supabase free tier + Google free tier + Vercel free tier = $0 to start.

**Q: Can I customize design?**
A: Yes! Colors in tailwind.config.js, fonts in pages/index.jsx.

---

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service)
- [Vercel Docs](https://vercel.com/docs)

---

## 📞 Support

For issues:
1. Check relevant documentation file
2. Review browser console errors
3. Check Vercel/Supabase logs
4. Read TROUBLESHOOTING section in DEPLOYMENT.md

---

**Status:** 🟢 Ready for deployment
**Build:** ✅ Compiles successfully
**Features:** ✅ All implemented
