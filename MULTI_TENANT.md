# Multi-Tenant Architecture Guide

## Overview

The Salon SaaS platform has been successfully converted from a **single-tenant** system to a **multi-tenant** architecture. This allows a **single deployment** on Vercel to serve **multiple salons** with distinct configurations, branding, and data.

## Architecture Design

### Key Principles

1. **Single Codebase** - One Next.js application serves all salons
2. **Single Deployment** - Single Vercel deployment handles multiple salons
3. **Configuration-Driven** - Salon data comes from JSON config files
4. **Backward Compatible** - Existing deployments continue to work
5. **Future SaaS Ready** - Prepared for database-driven multi-tenancy

### System Architecture

```
┌─────────────────────────────────────────┐
│        Browser / User Request           │
└────────────────┬────────────────────────┘
                 │
        ┌────────▼────────┐
        │  Next.js Routes │
        └────────┬────────┘
                 │
         ┌───────┴────────┐
         │                │
    ┌────▼────┐    ┌──────▼──────┐
    │ / (root)│    │/salon/[slug]│
    └────┬────┘    └───────┬──────┘
         │                 │
    ┌────▼────────┐    ┌───▼──────────────┐
    │config/      │    │lib/              │
    │salon.json   │    │loadSalonConfig() │
    │(default)    │    └──────┬───────────┘
    └─────────────┘           │
                          ┌────▼─────┐
                          │config/    │
                          │salons/    │
                          │[slug].json│
                          └───────────┘
```

## File Structure

```
salon-saas/
├── config/
│   ├── salon.json                    # Default salon (backward compat)
│   └── salons/
│       ├── cinderella.json           # Salon 1 config
│       ├── glamstudio.json           # Salon 2 config
│       └── rosebeauty.json           # Salon 3 config
│
├── lib/
│   ├── loadSalonConfig.js            # Config loader utility
│   └── supabase.js                   # Database client
│
├── pages/
│   ├── index.jsx                     # Root route (uses default config)
│   ├── salon/
│   │   └── [slug].jsx                # Dynamic multi-tenant route
│   ├── salons.jsx                    # Directory listing all salons
│   └── api/
│       └── lead.js                   # Lead ingestion API (multi-tenant)
│
├── services/
│   ├── salonService.js               # Salon abstraction layer
│   ├── leadProcessor.js              # Lead processing
│   └── googleReviews.js              # Google Places API integration
│
├── public/
│   └── salons/                       # Salon-specific images
│       ├── cinderella/
│       ├── glamstudio/
│       └── rosebeauty/
│
└── components/
    ├── Navigation.jsx                # All components now receive
    ├── HeroSection.jsx               # config prop for multi-tenancy
    ├── BookingSection.jsx            # (no changes needed)
    └── ...
```

## How It Works

### 1. Default Salon (Backward Compatibility)

When someone visits **`/`**:

```
GET / → pages/index.jsx
  ├── loadDefaultSalonConfig() from config/salon.json
  ├── Fetch Google reviews
  └── Render page with default salon data
```

**Example URL**: `https://salon-saas.vercel.app/`

### 2. Multi-Tenant Salons

When someone visits **`/salon/[slug]`**:

```
GET /salon/cinderella → pages/salon/[slug].jsx
  ├── Extract slug: "cinderella"
  ├── loadSalonConfig("cinderella") from config/salons/cinderella.json
  ├── Fetch Google reviews for that salon
  └── Render page with salon-specific data
```

**Example URLs**:
- `https://salon-saas.vercel.app/salon/cinderella`
- `https://salon-saas.vercel.app/salon/glamstudio`
- `https://salon-saas.vercel.app/salon/rosebeauty`

### 3. Salon Directory

When someone visits **`/salons`**:

```
GET /salons → pages/salons.jsx
  ├── Load all salon configs from config/salons/
  ├── Display grid of all available salons
  └── Each salon links to /salon/[slug]
```

**Example URL**: `https://salon-saas.vercel.app/salons`

## Adding a New Salon

### Step 1: Create Configuration File

Create `config/salons/newsalon.json`:

```json
{
  "salon": {
    "id": "newsalon",
    "slug": "newsalon",
    "name": "New Salon Name",
    "tagline": "Your salon tagline",
    "description": "Salon description...",
    "location": {
      "address": "Address here",
      "phone": "+91 XXXXXXXXXX",
      "email": "email@example.com",
      "whatsapp": "+91 XXXXXXXXXX",
      "openingHours": { ... }
    },
    "hero": { ... },
    "about": { ... },
    "services": [ ... ],
    "offers": [ ... ],
    "gallery": [ ... ],
    "reviews": [ ... ],
    "socialLinks": { ... },
    "meta": {
      "title": "Salon Title | City",
      "description": "SEO description...",
      "keywords": "beauty, salon, services",
      "ogImage": "https://..."
    }
  },
  "google": {
    "placeId": "YOUR_GOOGLE_PLACE_ID"
  },
  "transformations": [ ... ]
}
```

### Step 2: Create Image Directory

Create images directory:
```bash
mkdir public/salons/newsalon
```

Place salon-specific images here.

### Step 3: Deploy

```bash
git add config/salons/newsalon.json public/salons/newsalon/
git commit -m "Add newsalon configuration"
git push
```

The salon is **instantly available** at:
- `https://salon-saas.vercel.app/salon/newsalon`
- Listed on `https://salon-saas.vercel.app/salons`

## Configuration Format

Each salon configuration file (`config/salons/*.json`) follows this schema:

```typescript
{
  "salon": {
    "id": string,                    // Unique identifier
    "slug": string,                  // URL-friendly slug
    "name": string,                  // Display name
    "tagline": string,               // Short description
    "description": string,           // Full description
    "location": {
      "address": string,
      "phone": string,
      "email": string,
      "whatsapp": string,
      "googleMapEmbed": string,      // Google Maps embed URL
      "openingHours": {
        "monday": string,
        "tuesday": string,
        // ... etc
      }
    },
    "hero": {
      "backgroundImage": string,     // Hero section bg
      "overlayOpacity": number        // 0-1
    },
    "about": {
      "headline": string,
      "description": string,
      "yearsInBusiness": number,
      "clientsSatisfied": string,
      "highlights": [
        { "icon": string, "title": string, "description": string }
      ]
    },
    "services": [
      {
        "id": number,
        "name": string,
        "description": string,
        "price": string,
        "duration": string,
        "icon": string,               // Emoji
        "category": string
      }
    ],
    "offers": [ ... ],               // Similar structure
    "gallery": [
      {
        "id": number,
        "image": string,              // Image URL or path
        "title": string,
        "category": string
      }
    ],
    "reviews": [ ... ],              // Customer reviews
    "socialLinks": { ... },          // Social media links
    "meta": {
      "title": string,               // SEO title
      "description": string,         // SEO description
      "keywords": string,            // SEO keywords
      "ogImage": string              // Social share image
    }
  },
  "google": {
    "placeId": string                // Google Places API ID
  },
  "transformations": [               // Before/after gallery
    {
      "title": string,
      "before": string,
      "after": string
    }
  ]
}
```

## Lead Management (Multi-Tenancy)

### Lead API Endpoint

**POST** `/api/lead`

The lead API now supports multi-tenant leads:

```json
{
  "salonId": "cinderella",           // Required: which salon
  "name": "Priya",
  "phone": "+91 98765 43210",
  "service": "Keratin Treatment",
  "preferredDate": "2026-03-20",
  "message": "Optional message"
}
```

### Database Schema

```sql
CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id text NOT NULL,            -- Multi-tenant key
  name text NOT NULL,
  phone text NOT NULL,
  service text,
  preferred_date date,
  message text,
  created_at timestamp DEFAULT now(),
  
  FOREIGN KEY (salon_id) REFERENCES salons(id)
);

CREATE INDEX idx_leads_salon_id ON leads(salon_id);
```

### BookingSection Update

The `BookingSection` component automatically includes `salonId`:

```javascript
const handleSubmit = async (e) => {
  // ...
  const response = await fetch('/api/lead', {
    method: 'POST',
    body: JSON.stringify({
      salonId: salon.id,             // Auto-included
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      preferredDate: formData.date,
      message: formData.message,
    })
  });
  // ...
};
```

## Google Reviews Per Salon

Each salon has its own `google.placeId`:

```json
{
  "google": {
    "placeId": "ChIJ1b1-KKb64zoRTYlIx-dI1xk"  // Unique per salon
  }
}
```

The `GoogleReviewsWidget` component automatically uses the salon's placeId:

```javascript
<GoogleReviewsWidget 
  googleData={googleData} 
  placeId={salon.google.placeId}  // Per-salon place ID
/>
```

## Salon Service Layer

The `services/salonService.js` provides an abstraction layer for salon operations:

```javascript
import { salonService } from '@/services/salonService';

// Get a specific salon
const salon = await salonService.getSalon('cinderella');

// Get all salons
const allSalons = await salonService.getAllSalons();

// Get default salon (backward compat)
const defaultSalon = await salonService.getDefaultSalon();

// Check if salon exists
const exists = salonService.salonExists('cinderella');

// Future: Get salon by custom domain
const salon = await salonService.getSalonByDomain('cinderella.com');
```

This layer is designed to support future features:
- Database-driven configurations
- Custom domains per salon
- Admin dashboards
- Salon analytics

## Development

### Running Locally

```bash
npm install
npm run dev
```

Visit:
- Default salon: `http://localhost:3000/`
- Cinderella: `http://localhost:3000/salon/cinderella`
- All salons: `http://localhost:3000/salons`

### Creating a Test Salon

1. Create `config/salons/test.json` with any valid config
2. Visit `http://localhost:3000/salon/test`
3. It will instantly be available

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel Deployment

No changes needed to deployment process. Simply push to your repository:

```bash
git push origin main
```

Vercel automatically:
1. Builds the Next.js application
2. Generates static pages for all salons (using `getStaticPaths`)
3. Deploys to CDN
4. New salons are available immediately on next deploy

### Environment Variables

Required environment variables (no changes):

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_api_key
```

## Future Enhancements

### 1. Database-Driven Salons

Instead of file-based configs, fetch from database:

```javascript
// In loadSalonConfig()
const { data } = await supabase
  .from('salons')
  .select('*')
  .eq('slug', slug)
  .single();
```

### 2. Custom Domains

Map custom domains to salons:

```javascript
const salon = await salonService.getSalonByDomain('cinderella.com');
```

### 3. Admin Dashboard

- Manage salon configurations
- View salon analytics
- Manage leads per salon
- Customize branding per salon

### 4. Salon Onboarding

- Self-service salon signup
- Automatic configuration generation
- Immediate deployment

### 5. Multi-Language Support

- Salon configs translated per language
- Dynamic locale switching

## Migration from Single-Tenant

If you were running a single salon before:

1. Your default `config/salon.json` **still works** at `/`
2. Create new salon configs in `config/salons/` for additional salons
3. No code changes needed - everything is backward compatible

## Performance Considerations

### ISR (Incremental Static Regeneration)

All pages use ISR with 1-hour revalidation:

```javascript
export async function getStaticProps() {
  return {
    props: { ... },
    revalidate: 3600  // Regenerate every hour
  };
}
```

### Dynamic Routes

`pages/salon/[slug].jsx` uses `getStaticPaths` for static generation:

```javascript
export async function getStaticPaths() {
  const slugs = listAvailableSalons();
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: 'blocking'  // Generate at request time if needed
  };
}
```

### CDN Caching

Each salon has a unique URL, enabling optimal CDN caching:
- `/salon/cinderella` cached separately from `/salon/glamstudio`
- Cache invalidation per salon possible

## Troubleshooting

### Salon Not Appearing

1. Check config file exists: `config/salons/[slug].json`
2. Validate JSON syntax
3. Ensure `salon.id` and `salon.slug` fields exist
4. Restart dev server or redeploy

### Google Reviews Not Loading

1. Verify `google.placeId` is correct
2. Check API key is configured
3. Check quota limits on Google Places API

### Leads Not Saving

1. Check Supabase credentials
2. Verify `leads` table has `salon_id` column
3. Check browser console for API errors

## Support & Questions

For architecture questions or to implement additional multi-tenant features, refer to:
- `lib/loadSalonConfig.js` - Configuration loading
- `services/salonService.js` - Salon operations abstraction
- `pages/salon/[slug].jsx` - Dynamic route implementation
- Example configs in `config/salons/`

---

**Version**: 2.0 - Multi-Tenant Architecture  
**Last Updated**: March 15, 2026
