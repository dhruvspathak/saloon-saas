# Quick Start Guide - Multi-Industry Platform

## 5-Minute Setup

### Step 1: Install Dependencies (1 min)
```bash
git clone <your-repo>
cd salon-saas
npm install
```

### Step 2: Configure Environment (2 min)
Create `.env.local`:
```env
# Supabase (get from https://supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# Site Creation Security
INTERNAL_API_KEY=your-secret-key-123
```

### Step 3: Setup Database (1 min)
In Supabase SQL Editor, run:
```sql
-- Create sites table
CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  industry TEXT NOT NULL,
  theme TEXT NOT NULL,
  layout TEXT NOT NULL,
  config_json JSONB,
  created_at TIMESTAMP DEFAULT now()
);

-- Create leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL REFERENCES sites(id),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT,
  preferred_date DATE,
  message TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Indexes
CREATE INDEX idx_sites_slug ON sites(slug);
CREATE INDEX idx_leads_site_id ON leads(site_id);
```

### Step 4: Start Development Server (1 min)
```bash
npm run dev
# Open http://localhost:3000
```

---

## Create Your First Site

### Option A: Using the Web Form (Fastest)

1. **Open Internal Tool**
   - Go to: http://localhost:3000/internal/create-site
   - Enter API key if prompted

2. **Fill Form**
   ```
   Business Name: Cinderella Sharon's
   Slug: cinderella-sharons (auto-fills)
   Industry: salon
   Theme: luxury
   Layout: layoutA
   Phone: +91 99679 36773
   WhatsApp: +91 98765 43210
   Address: 123 Main Street, Mumbai
   ```

3. **Click Create**
   - Site created in database
   - Auto-filled with industry defaults
   - Live at: /site/cinderella-sharons

### Option B: Using the API

```bash
curl -X POST http://localhost:3000/api/internal/createSite \
  -H "Content-Type: application/json" \
  -H "X-Internal-API-Key: your-secret-key-123" \
  -d '{
    "businessName": "New Tattoo Studio",
    "slug": "new-tattoo-studio",
    "industry": "tattoo",
    "theme": "modern",
    "layout": "layoutB",
    "phone": "+91 XXXXXXXXXX",
    "address": "Address here",
    "whatsapp": "+91 XXXXXXXXXX"
  }'
```

### Option C: Using Legacy Config File

1. Create: `/config/salons/my-salon.json`
2. Add config (see CONFIG_GUIDE.md)
3. Visit: `/salon/my-salon`

---

## View Your Site

After creation, your site is live at:

```
http://localhost:3000/site/{slug}
```

Example:
- **Salon**: http://localhost:3000/site/cinderella-sharons
- **Tattoo**: http://localhost:3000/site/new-tattoo-studio
- **Legacy**: http://localhost:3000/salon/cinderella-sharons

---

## Available Industries

### 1. Salon 💇‍♀️
```
Default Services:
- Hair Cutting, Hair Coloring, Bridal Makeup
- Facials, Manicure & Pedicure, Threading
- Layout: layoutA (services-first)
- Theme: luxury
```

### 2. Tattoo 🎨
```
Default Services:
- Custom Tattoo Design, Small/Large Tattoo
- Cover-Up Tattoo, Body Piercing
- Layout: layoutB (portfolio-first)  
- Theme: modern
```

### 3. Clinic 🏥
```
Default Services:
- General Consultation, Health Checkup
- Vaccination, Lab Tests, Telemedicine
- Layout: layoutC (trust-first)
- Theme: minimal
```

### 4. Dentist 🦷
```
Default Services:
- Routine Checkup, Teeth Cleaning
- Root Canal, Teeth Whitening, Braces
- Layout: layoutC (trust-first)
- Theme: elegant
```

---

## Available Themes

### 1. Luxury (Rose-Gold)
- Primary: #B76E79 (rose gold)
- Font: Playfair Display (serif)
- Best for: High-end salons, wellness

### 2. Modern (Bold Blue)
- Primary: #3B82F6 (blue)
- Font: Montserrat (san-serif)
- Best for: Tattoo, trendy businesses

### 3. Minimal (Neutral)
- Primary: #333333 (dark gray)
- Font: Lato (clean sans-serif)
- Best for: Medical, professional services

### 4. Elegant (Emerald)
- Primary: #1A5F4A (emerald)
- Font: Cormorant Garamond (serif)
- Best for: Dental, upscale services

---

## Available Layouts

### Layout A (Services-Focused)
```
Hero
About
Services ⭐ (prominent)
Gallery
Reviews
Booking
```
**Best for**: Salons, studios with service menus

### Layout B (Portfolio-Focused)
```
Hero
Gallery ⭐ (prominent)
Services
Reviews
Artists
Booking
```
**Best for**: Tattoo studios, design-focused businesses

### Layout C (Trust-Focused)
```
Hero
About
Services
Doctors ⭐ (prominent)
Facilities
Reviews
Booking
```
**Best for**: Medical clinics, dental offices

---

## Common Tasks

### Add Google Reviews

1. Get Google Place ID from: https://developers.google.com/maps/documentation/places/web-service/overview
2. During site creation, enter `googlePlaceId`
3. Reviews auto-fetch on page load
4. Cache updates hourly

### Upload Images

1. Create folder: `/public/sites/{slug}/gallery/`
2. Add images: `image1.jpg`, `image2.jpg`
3. Reference in config: `/sites/{slug}/gallery/image1.jpg`
4. Repeat for `/public/sites/{slug}/before-after/`

### Customize Services

1. Edit site config in database
2. Update `config_json` column
3. Add/edit services array
4. Changes live after page revalidation

### Track Leads

```javascript
// In your admin dashboard
import { getLeadsForSiteBySlug } from '@/services/leadProcessor';

const leads = await getLeadsForSiteBySlug('cinderella-sharons');
// Returns: [{ name, phone, service, message, created_at }, ...]
```

---

## Deployment to Vercel

### Easy Path
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Auto-deploy on push

### Manual Build
```bash
npm run build
npm run start
# Production server on port 3000
```

---

## Troubleshooting

### "Site not found"
- ✅ Check slug in database
- ✅ Verify supabase connection
- ✅ Check .env.local file

### "Internal API Key Invalid"
- ✅ Check INTERNAL_API_KEY in .env.local
- ✅ Verify header: `X-Internal-API-Key: your-key`
- ✅ Restart dev server

### "No Google Reviews"
- ✅ Add googlePlaceId when creating site
- ✅ Verify Google Places API enabled
- ✅ Wait 1 hour for cache (can force refresh)

### "Images not showing"
- ✅ Create /public/sites/{slug}/ folder
- ✅ Add images to gallery/ subfolder
- ✅ Reference with /sites/{slug}/gallery/image.jpg path

---

## Key Files

| File | Purpose |
|------|---------|
| `/industries/` | Industry modules (salon, tattoo, etc.) |
| `/themes/` | Theme definitions (luxury, modern, etc.) |
| `/layouts/` | Page layout variations |
| `/pages/site/[slug].jsx` | Main site renderer |
| `/pages/internal/create-site.jsx` | Site creation UI |
| `/services/siteService.js` | Database operations |
| `ARCHITECTURE.md` | Full technical documentation |
| `.env.local` | Configuration (keep secret!) |

---

## Next Steps

1. ✅ Setup .env.local
2. ✅ Create database tables
3. ✅ Create your first site
4. ✅ Customize theme/layout
5. ✅ Add images to /public/sites/
6. ✅ Deploy to Vercel
7. ✅ Share site link
8. ✅ Start receiving leads!

---

## Get Full Documentation

- **Architecture Details**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Environment Setup**: [ENV_SETUP.md](./ENV_SETUP.md)
- **Configuration Guide**: [CONFIG_GUIDE.md](./CONFIG_GUIDE.md)
- **Implementation Summary**: [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

---

**Support**: For detailed questions, see the full documentation files above.
