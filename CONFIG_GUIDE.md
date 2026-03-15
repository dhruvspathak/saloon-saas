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

### Basic Info
- **name**: Salon name
- **tagline**: Catchy phrase (max 60 chars)
- **description**: Salon mission statement

### Location
- **address**: Full salon address
- **phone**: Contact number with country code
- **email**: Contact email
- **whatsapp**: WhatsApp number (with country code)
- **googleMapEmbed**: Embed code from Google Maps
- **openingHours**: Seven days with timings

### Hero Section
- **backgroundImage**: Full URL to hero image (recommended: 1920x1080)
- **overlayOpacity**: 0 to 1 (0 = transparent, 1 = opaque)

### Services
Array of service objects:
```json
{
  "id": 1,
  "name": "Service Name",
  "description": "Service description",
  "price": "₹XXXX",
  "duration": "2 hours",
  "icon": "emoji",
  "category": "Category"
}
```

### Offers
Array of offer objects:
```json
{
  "id": 1,
  "title": "Offer Title",
  "description": "Details",
  "discount": "20% OFF",
  "validTill": "Date",
  "code": "CODE20"
}
```

### Gallery
Array of image objects:
```json
{
  "id": 1,
  "image": "https://...",
  "title": "Image Title",
  "category": "Hair/Makeup/Salon"
}
```

### Reviews
Array of review objects:
```json
{
  "id": 1,
  "name": "Client Name",
  "rating": 5,
  "review": "Review text",
  "date": "YYYY-MM-DD",
  "service": "Service Name"
}
```

### Social Links
```json
{
  "instagram": "https://instagram.com/...",
  "facebook": "https://facebook.com/...",
  "whatsapp": "https://wa.me/...",
  "youtube": "https://youtube.com/..."
}
```

### Meta Tags
- **title**: SEO title (60 chars max)
- **description**: Meta description (160 chars max)
- **keywords**: Comma-separated keywords
- **ogImage**: Open Graph image URL (1200x630px)

## Best Practices

1. **Images**: Use high-quality images (min 1920x1080 for hero)
2. **Descriptions**: Keep them concise and compelling
3. **Prices**: Include currency symbol (₹, $, €, etc.)
4. **Phone Numbers**: Always include country code
5. **URLs**: Ensure all external links are valid and working
6. **Ratings**: Keep reviews between 4-5 stars for consistency
7. **Dates**: Use ISO format (YYYY-MM-DD)

## Creating a New Salon

1. Backup current `config/salon.json`
2. Create new salon with your data
3. Replace placeholder URLs with real images
4. Update all contact info
5. Run `npm install && npm run dev`
6. Test all links and functionality
7. Deploy to Vercel

## Environment Variables (Optional)

Create `.env.local` for additional settings:

```
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Deployment to Vercel

1. Push code to GitHub
2. Go to vercel.com and connect repository
3. Set environment variables if needed
4. Deploy (automatic on push)

Every time you update `config/salon.json`, Vercel will automatically rebuild and redeploy!
