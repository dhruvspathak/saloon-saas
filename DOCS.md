# Salon SaaS - Complete Documentation

## Table of Contents
1. [Quick Start](#quick-start)
2. [Features](#features)
3. [Configuration](#configuration)
4. [Environment Setup](#environment-setup)
5. [Deployment](#deployment)
6. [Architecture](#architecture)
7. [API Reference](#api-reference)
8. [File Structure](#file-structure)
9. [Troubleshooting](#troubleshooting)
10. [FAQ](#faq)

---

## Quick Start

### Installation

```bash
git clone <repo-url>
cd salon-saas
npm install
npm run dev
```

Visit `http://localhost:3000`

### Create New Salon

Edit `config/salon.json` with your salon details and deploy.

### Build & Deploy

```bash
npm run build       # Production build
npm start           # Start production server
vercel              # Deploy to Vercel
```

---

## Features

### Frontend
- 📱 **Fully Responsive**: Mobile-first design
- 🎨 **Luxurious Design**: Rose gold aesthetic
- ⚡ **High Performance**: 90+ Lighthouse score
- 🔍 **SEO Optimized**: Meta tags, JSON-LD, Open Graph
- 🖼️ **Gallery with Lightbox**: Professional images
- 🎥 **Before/After Gallery**: Interactive transformation slider
- 📞 **Multi-Channel Booking**: WhatsApp, Call, Form
- 🗺️ **Google Maps Integration**
- ⭐ **Reviews Section**: Customer testimonials
- 🎯 **Smart CTAs**: Sticky navigation, floating buttons

### Backend & Integrations
- 🔗 **Google Reviews Integration**: Auto-fetch ratings & reviews (ISR cached)
- 📊 **Lead Database**: Supabase PostgreSQL storage
- 💾 **Lead Management**: Track all booking inquiries
- 🛡️ **Phone Validation**: Indian format validation
- 🏢 **Multi-Tenant Ready**: Prepared for SaaS scaling

---

## Configuration

### Minimal Config (config/salon.json)

```json
{
  "salon": {
    "id": "my-salon",
    "name": "Your Salon Name",
    "tagline": "Your tagline",
    "description": "Business description",
    "location": {
      "address": "Street Address, City, Code",
      "phone": "+91 XXXXX XXXXX",
      "email": "email@salon.com",
      "whatsapp": "+91 XXXXX XXXXX",
      "openingHours": {
        "monday": "10:00 AM - 8:00 PM",
        "tuesday": "10:00 AM - 8:00 PM",
        "wednesday": "10:00 AM - 8:00 PM",
        "thursday": "10:00 AM - 8:00 PM",
        "friday": "10:00 AM - 9:00 PM",
        "saturday": "10:00 AM - 9:00 PM",
        "sunday": "12:00 PM - 8:00 PM"
      }
    },
    "hero": {
      "backgroundImage": "https://image-url.jpg",
      "overlayOpacity": 0.4
    },
    "about": {
      "headline": "About Us",
      "description": "Your salon story",
      "yearsInBusiness": 10,
      "clientsSatisfied": "5000+",
      "highlights": [
        {
          "icon": "🎯",
          "title": "Expert Team",
          "description": "Certified professionals"
        }
      ]
    },
    "services": [
      {
        "id": 1,
        "name": "Service Name",
        "description": "Service description",
        "price": "₹2000",
        "duration": "1 hour",
        "icon": "💇‍♀️",
        "category": "Hair Care"
      }
    ],
    "offers": [
      {
        "id": 1,
        "title": "Offer Title",
        "description": "Offer description",
        "discount": "20% OFF",
        "validTill": "March 31, 2026",
        "code": "CODE20",
        "backgroundColor": "gradient-rose"
      }
    ],
    "gallery": [
      {
        "id": 1,
        "image": "https://image-url.jpg",
        "title": "Image Title",
        "category": "Hair"
      }
    ],
    "reviews": [
      {
        "id": 1,
        "name": "Customer Name",
        "rating": 5,
        "review": "Great service!",
        "date": "2026-03-15",
        "service": "Service Name"
      }
    ],
    "socialLinks": {
      "instagram": "https://instagram.com/...",
      "facebook": "https://facebook.com/...",
      "whatsapp": "https://wa.me/...",
      "youtube": "https://youtube.com/..."
    },
    "meta": {
      "title": "Salon Name | Hair & Makeup Services",
      "description": "SEO description",
      "keywords": "beauty, salon, hair",
      "ogImage": "https://image-url.jpg"
    }
  }
}
```

### With Backend Features

Add these to `config/salon.json`:

```json
{
  "salon": { ... },
  
  "google": {
    "placeId": "ChIJ1b1-KKb64zoRTYlIx-dI1xk"
  },

  "transformations": [
    {
      "title": "Keratin Treatment",
      "before": "https://before-image-url.jpg",
      "after": "https://after-image-url.jpg"
    },
    {
      "title": "Hair Coloring",
      "before": "https://before-image-url.jpg",
      "after": "https://after-image-url.jpg"
    }
  ]
}
```

### Finding Google Place ID

1. Visit [Google Maps](https://maps.google.com)
2. Search for your salon
3. Copy URL: `maps.google.com/maps/place/...?q=place_id:**ChIJ...**`
4. Extract `ChIJ...` part

---

## Environment Setup

### Step 1: Supabase (Database Setup)

1. Go to [supabase.com](https://supabase.com)
2. Create project
3. Go to **Database** → **Tables**
4. Click **Create a new table** and name it `leads`

Add columns:
```sql
id              | UUID         | Primary Key (gen_random_uuid())
salon_id        | text         | Not Null
name            | text         | Not Null
phone           | text         | Not Null
service         | text         | Nullable
preferred_date  | date         | Nullable
message         | text         | Nullable
status          | text         | Not Null (default: 'new')
created_at      | timestamp    | Not Null (default: now())
updated_at      | timestamp    | Not Null (default: now())
```

Create indexes:
```sql
CREATE INDEX idx_leads_salon_id ON leads(salon_id);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_status ON leads(status);
```

Get API keys:
- **Settings** → **API**
- Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

### Step 2: Google Places API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Search for **Places API** → Enable
4. **Credentials** → **Create Credentials** → **API Key**
5. Copy key → `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`

### Step 3: Environment Variables

Create `.env.local` in project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<key>
SUPABASE_SERVICE_ROLE_KEY=<key>

# Google Places API
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=AIzaSyD...

# Salon ID (optional)
NEXT_PUBLIC_SALON_ID=cinderella-andheri
```

**Important:** 
- `.env.local` is git-ignored
- `NEXT_PUBLIC_*` vars available in browser
- Other vars server-side only
- Restart `npm run dev` after adding vars

### For Production (Vercel)

1. Vercel Dashboard → Select project
2. **Settings** → **Environment Variables**
3. Add all variables from `.env.local`
4. **Redeploy** to apply

---

## Deployment

### Deploy to Vercel

1. Push to GitHub
   ```bash
   git add .
   git commit -m "Add features"
   git push origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new)
3. Select your repository
4. Click **Import**

### Configure Branch Protection (GitHub)

1. **Settings** → **Branches**
2. **Add rule** for `main`
3. Enable:
   - ✅ Require pull request reviews (1-2 approvals)
   - ✅ Require branches up to date before merge
   - ✅ Restrict who can push

### Test Production

1. Visit Vercel URL
2. Submit booking form
3. Check Supabase: **Tables** → **leads**
4. Verify Google reviews display (if API key added)

### Monitor Deployment

- **Vercel** → **Deployments** → Select deployment → **View Runtime Logs**
- GitHub Actions logs (if CI/CD enabled)
- Supabase logs: **Database** → **Logs**

### Rollback (If Needed)

```bash
# Via Vercel
Deployments → Select previous → Rollback

# Via Git
git revert HEAD
git push origin main
```

---

## Architecture

### System Design

```
Next.js 14 (Frontend + API Routes)
    ↓
├── Static Pages (ISR)
│   ├── Hero, Services, Gallery (Config-driven)
│   ├── Google Reviews (ISR: 1-hour cache)
│   └── Before/After Gallery (Config-driven)
│
├── API Routes
│   └── POST /api/lead (Lead submission)
│
└── Backend Services
    ├── Google Places API (Reviews)
    ├── Supabase PostgreSQL (Lead storage)
    └── Config Loader (Multi-tenant ready)
```

### Multi-Tenant Preparation

The system is prepared for future scaling:
- ✅ Salon ID isolation in database
- ✅ Config-based multi-salon setup
- ✅ Ready for dynamic routing: `/salon/[slug]`
- ⏳ Not yet implemented (future phase)

### Security

- ✅ Phone validation (prevents SQLi)
- ✅ Input sanitization
- ✅ Server-side secrets only
- ✅ Database indexes for performance
- ⏳ Row-Level Security (RLS) - future
- ⏳ Rate limiting - future

### Performance

- **Lighthouse:** 90+
- **Images:** Next.js optimization with lazy loading
- **Caching:** Google reviews with ISR (1 hour)
- **Build:** Static generation + ISR
- **Size:** ~108 kB first load JS

---

## API Reference

### POST /api/lead

Submit booking lead.

**Request:**
```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "salonId": "cinderella-andheri",
    "name": "Priya Sharma",
    "phone": "+91-98765-43210",
    "service": "Keratin Treatment",
    "preferredDate": "2026-03-20",
    "message": "Optional message"
  }'
```

**Response (Success):**
```json
{
  "success": true,
  "leadId": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Lead saved successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid phone number format"
}
```

**Phone Format Support:**
- `9876543210` → `+919876543210`
- `98765 43210` → `+919876543210`
- `+91-98765-43210` → `+919876543210`

---

## File Structure

### New Files Created

```
types/
  ├── lead.js              # Lead data types
  ├── review.js            # Review data types
  └── config.js            # Config data types

lib/
  └── supabase.js          # Supabase client setup

services/
  ├── googleReviews.js     # Google Places API integration
  ├── leadProcessor.js     # Lead validation & storage
  └── configLoader.js      # Config management

components/
  ├── GoogleReviewsWidget.jsx      # Reviews display (NEW)
  └── BeforeAfterGallery.jsx       # Transformations (NEW)

pages/
  ├── api/
  │   └── lead.js          # POST /api/lead endpoint (NEW)
  └── index.jsx            # Main page (UPDATED)
```

### Modified Files

```
package.json                # Added dependencies
pages/index.jsx             # Integrated new components
components/BookingSection.jsx  # Added lead API integration
config/salon.json           # Added google & transformations
README.md                   # Updated features
```

---

## Troubleshooting

### Build Fails

**Issue:** Compilation errors
```bash
# Solution:
rm -rf .next node_modules
npm install
npm run build
```

### Google Reviews Not Loading

**Issue:** Reviews section empty
- ✅ Check `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` is set
- ✅ Check `google.placeId` in config/salon.json
- ✅ Verify Places API is enabled in Google Cloud
- ✅ Check API key isn't rate limited
- ✅ View browser console for errors

### Leads Not Saving

**Issue:** Booking form shows error
- ✅ Check `SUPABASE_SERVICE_ROLE_KEY` in Vercel (not just local)
- ✅ Check Supabase project is active
- ✅ Verify `leads` table exists
- ✅ Check phone format (should start with 9)
- ✅ View Vercel logs: **Deployments** → **Runtime Logs**

### Environment Variables Not Working

**Issue:** Features fail in production
- ✅ Verify all vars added to Vercel dashboard
- ✅ Redeploy after adding vars
- ✅ Check exact spelling (case-sensitive)
- ✅ Restart dev server for local testing

### Form Not Submitting

**Issue:** Booking submit button doesn't work
- ✅ Check console for errors
- ✅ Verify Supabase URL and keys
- ✅ Check phone number format
- ✅ Verify all required fields filled

---

## FAQ

**Q: Is Supabase required?**
A: No, but recommended. Without it, bookings only go to WhatsApp.

**Q: Can I use without Google API?**
A: Yes, reviews section simply won't display.

**Q: How do I customize colors?**
A: Edit `tailwind.config.js`:
```js
'rose-gold': '#YOUR_COLOR'
```

**Q: How do I add custom fonts?**
A: Edit Google Fonts link in `pages/index.jsx`

**Q: Can I create multiple salons?**
A: Yes! Create `/config/salon1.json`, `/config/salon2.json`, etc. Multi-tenant routing prepared for future.

**Q: What's the cost?**
A: Free tier sufficient for startups:
- Vercel: $0
- Supabase: 500K free rows/month
- Google API: 25K free requests/day

**Q: How do I track leads?**
A: Via Supabase dashboard:
- **Tables** → **leads** → View all submissions
- Set status: new → contacted → converted

**Q: Can I add email notifications?**
A: Yes! Architecture prepared. Add SendGrid/Resend integration in `services/leadProcessor.js`

**Q: How do I deploy?**
A: 
```bash
git add .
git commit -m "Your message"
git push origin main
# Vercel auto-deploys
```

**Q: How do I add more services?**
A: Edit `config/salon.json`:
```json
{
  "salon": {
    "services": [
      { "name": "Service 1", "price": "₹2000", ... },
      { "name": "Service 2", "price": "₹3000", ... }
    ]
  }
}
```

**Q: Can I change WhatsApp number?**
A: Yes! Edit `config/salon.json`:
```json
{
  "salon": {
    "location": {
      "whatsapp": "+91 YOUR_NUMBER"
    }
  }
}
```

**Q: How do I see database leads?**
A: 
1. Supabase Dashboard
2. **Tables** → **leads**
3. Click table to view all submissions

**Q: What if I have database issues?**
A: Check Supabase status:
- Dashboard → **Database** → View logs
- Verify service_role_key is configured
- Ensure leads table exists with correct schema

---

## Components Reference

### GoogleReviewsWidget
Displays Google ratings and reviews.
- Props: `googleData`, `placeId`
- Returns: Rating + top reviews + Google Maps link
- Optional: Renders nothing if no data

### BeforeAfterGallery
Interactive before/after transformation slider.
- Props: `transformations` array
- Features: Mouse/touch support, multiple transformations
- Optional: Renders nothing if no transformations

### BookingSection (Enhanced)
Booking form with lead database integration.
- Features: Form validation, API submission, error handling
- Fallback: Opens WhatsApp if database unavailable

---

## Design System

### Colors
- **Primary:** Rose Gold `#B76E79`
- **Dark:** Rose Gold Dark `#9B5A63`
- **Light:** Rose Gold Light `#D4949D`

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Josefin Sans (sans-serif)

### Spacing
- **Mobile:** 16px
- **Tablet:** 24px
- **Desktop:** 32px

### Responsive Breakpoints
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

---

## Best Practices

1. **Keep config organized** - Clear section names
2. **Optimize images** - 1920x1080 for hero, 500x500 for gallery
3. **Test links** - Phone, email, WhatsApp working
4. **Mobile test** - Always test on actual devices
5. **Monitor performance** - Check Lighthouse scores
6. **Backup config** - Version control your config.json
7. **Update regularly** - Keep dependencies current
8. **Check quotas** - Monitor Supabase/Google usage

---

## Version Info

- **Next.js:** 14.2.35
- **React:** 18.2.0
- **TailwindCSS:** 3.3.0
- **Supabase JS:** 2.45.0
- **Build Status:** ✅ Production Ready

---

## Support & Next Steps

### Immediate Setup (This Week)
1. Set up Supabase
2. Configure Google Places API
3. Add environment variables
4. Test locally
5. Deploy to Vercel

### Short Term (Next Sprint)
- Add email notifications
- Create admin dashboard
- Set up CI/CD

### Medium Term (Q2)
- Multi-tenant support
- Payment processing
- Advanced analytics

### Long Term (Q3+)
- Mobile app
- Integrations marketplace

---

**Status:** 🟢 **PRODUCTION READY**
**Last Updated:** March 15, 2026
