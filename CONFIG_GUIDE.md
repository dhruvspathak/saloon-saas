# Salon SaaS - Configuration Guide

## Quick Start

To launch a new salon website, you only need to modify **`config/salon.json`**.

### Configuration Structure

```json
{
  "salon": {
    "name": "Salon Name",
    "tagline": "Your tagline",
    "description": "Brief description",
    "location": {
      "address": "Full address",
      "phone": "+91 XXXXX XXXXX",
      "email": "email@domain.com",
      "whatsapp": "+91 XXXXX XXXXX",
      "googleMapEmbed": "Google Maps embed URL",
      "openingHours": {
        "monday": "10:00 AM - 8:00 PM",
        ...
      }
    },
    "hero": {
      "backgroundImage": "URL to hero image",
      "overlayOpacity": 0.4
    },
    "about": { ... },
    "services": [ ... ],
    "offers": [ ... ],
    "gallery": [ ... ],
    "reviews": [ ... ],
    "socialLinks": { ... },
    "meta": { ... }
  }
}
```

## Configuration Fields

| Field | Description |
|-------|-------------|
| name | Salon name |
| tagline | Catchy phrase (max 60 chars) |
| description | Salon mission statement |
| location.address / phone / email / whatsapp | Contact details (include country code) |
| location.googleMapEmbed | Embed URL from Google Maps |
| location.openingHours | Days & times |
| hero.backgroundImage | URL (1920x1080px recommended) |
| hero.overlayOpacity | 0-1 (0=transparent, 1=opaque) |

### Arrays (services, offers, gallery, reviews)
Each object: `{id, name/title, description, price/discount/image/rating, ...}`

**Formats:**
- **Services:** `{id, name, description, price (₹XXXX), duration, icon (emoji), category}`
- **Offers:** `{id, title, description, discount, validTill (YYYY-MM-DD), code}`
- **Gallery:** `{id, image (URL), title, category (Hair/Makeup/Salon)}`
- **Reviews:** `{id, name, rating (4-5), review, date (YYYY-MM-DD), service}`

### Social & Meta
| Field | Details |
|-------|----------|
| instagram, facebook, whatsapp, youtube | Full URLs |
| meta.title | SEO title (60 chars max) |
| meta.description | Meta description (160 chars max) |
| meta.keywords | Comma-separated keywords |
| meta.ogImage | URL 1200x630px)

## Best Practices

Images (1920x1080+), concise descriptions, currency symbols (₹/$), country codes (+91), valid URLs, 4-5 star ratings, ISO dates (YYYY-MM-DD)

## New Salon Setup

Backup `config/salon.json` → Edit with your data → Update URLs & contact info → `npm run dev` → Test → Deploy

## Deploy to Vercel

Push to GitHub → vercel.com (connect repo) → Auto-deploys on push. Config changes auto-rebuild.
