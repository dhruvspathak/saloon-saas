# 🎯 Quick Start Checklist

## 5-Minute Setup

- [ ] `npm install`
- [ ] Edit `config/salon.json` with your salon details
- [ ] `npm run dev`
- [ ] Visit http://localhost:3000
- [ ] Test all sections and links

## Configuration Essentials (in `config/salon.json`)

**Salon Info:**
- [ ] `name` - Salon name
- [ ] `tagline` - Catchy phrase (max 60 chars)
- [ ] `description` - Brief story
- [ ] `location.address` - Full address
- [ ] `location.phone` - With country code (+91, etc)
- [ ] `location.whatsapp` - For bookings
- [ ] `location.email` - Contact email

**Images:**
- [ ] `hero.backgroundImage` - Main banner image (1920x1080)
- [ ] `gallery[].image` - 6 salon images (500x500)
- [ ] `meta.ogImage` - Social share image (1200x630)

**Content:**
- [ ] `services[]` - At least 3 services with price
- [ ] `offers[]` - 2-3 promotional offers
- [ ] `reviews[]` - 3-5 customer reviews with ratings
- [ ] `about.highlights[]` - 3 key points about salon

**Integrations:**
- [ ] `location.googleMapEmbed` - Embedded map link
- [ ] `socialLinks` - Instagram, Facebook, YouTube links

**SEO:**
- [ ] `meta.title` - Page title (60 chars)
- [ ] `meta.description` - Meta description (160 chars)
- [ ] `meta.keywords` - Comma-separated keywords

## Running the Project

```bash
# Install dependencies
npm install

# Development (hot reload enabled)
npm run dev
# Visit: http://localhost:3000

# Production build
npm run build
npm start

# Export as static site
npm run export
```

## Testing Checklist

| Category | Test |
|----------|------|
| Mobile | Responsive design, hamburger menu, touch elements, images load |
| Functionality | Navigation scrolls, WhatsApp button, booking form, gallery lightbox, offers code, social links |
| Links | Phone `tel:` links, WhatsApp `wa.me` format, HTTPS, images load |

## Deployment

**Vercel (Recommended):** `vercel` → auto-deploys on git push, free HTTPS/domain, instant scaling

**Netlify:** `npm run build` → connect to netlify.com

**Self-Hosted:** `npm run build && npm start`

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Build fails | `rm -rf .next && npm run build` |
| Styling broken | Restart dev server + clear cache |
| Images not loading | Verify URLs are public & accessible |
| WhatsApp not working | Check phone format: +91XXXXXXXXXX |
| Mobile layout wrong | Check if CSS is compiled correctly |

## Performance Targets

- ✅ Lighthouse Score: 90+
- ✅ Load Time: < 3s
- ✅ Mobile Score: 85+
- ✅ SEO Score: 95+

Monitor at: https://pagespeed.web.dev/

## File Structure Quick Reference

```
config/salon.json          ← EDIT THIS (main config)
pages/index.jsx            ← Main page
components/
  ├── Navigation.jsx       ← Header/Menu
  ├── HeroSection.jsx      ← Banner
  ├── AboutSection.jsx     ← Story
  ├── ServicesSection.jsx  ← Services
  ├── GallerySection.jsx   ← Photos
  ├── OffersSection.jsx    ← Deals
  ├── ReviewsSection.jsx   ← Reviews
  ├── LocationSection.jsx  ← Maps/Hours
  ├── BookingSection.jsx   ← Booking form
  └── Footer.jsx           ← Footer
styles/globals.css         ← Global CSS
public/images/             ← Static images
```

## Configuration Examples

### Service Template
```json
{
  "id": 1,
  "name": "Keratin Treatment",
  "description": "Smooth & strengthen hair",
  "price": "₹3,500",
  "duration": "2 hours",
  "icon": "💇‍♀️",
  "category": "Hair Care"
}
```

### Offer Template
```json
{
  "id": 1,
  "title": "Spring Hair Special",
  "description": "20% off all hair services",
  "discount": "20% OFF",
  "validTill": "March 31, 2026",
  "code": "SPRING20"
}
```

### Review Template
```json
{
  "id": 1,
  "name": "Client Name",
  "rating": 5,
  "review": "Amazing service!",
  "date": "2026-03-15",
  "service": "Keratin Treatment"
}
```

## URL Formats

**Phone:** `+91 98765 43210` → `+919876543210` (no spaces)

**WhatsApp:** `https://wa.me/919876543210` or `https://wa.me/919876543210?text=message`

**Maps:** `https://www.google.com/maps/embed?pb=!1m18...` (from Google My Business)

**Images:** Any public URL (Unsplash, CDN, etc.)

## Deploy to Vercel in 2 Steps

1. Push to GitHub: `git push origin main`
2. vercel.com → New Project → Select repo → Deploy → ✅ Live!

## SEO Tips

Meta tags (Google results), social preview, mobile friendly, page speed, structured data

## Docs Reference

- `README.md` - Features overview
- `CONFIG_GUIDE.md` - Config reference
- `ENV_SETUP.md` - Backend setup
- `DEPLOYMENT.md` - Vercel deployment

---

**Start:** `npm install` → edit `config/salon.json` → `npm run dev`
