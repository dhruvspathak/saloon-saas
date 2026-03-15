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

## Testing Before Deployment

### Mobile Testing
- [ ] Responsive design (test on actual phone)
- [ ] Hamburger menu works
- [ ] Touch elements are tappable
- [ ] Images load properly

### Functionality Testing
- [ ] Navigation links scroll to sections
- [ ] Floating WhatsApp button works
- [ ] Booking form submits via WhatsApp
- [ ] Phone numbers dial correctly
- [ ] Gallery lightbox opens/closes
- [ ] Offers code copies to clipboard
- [ ] Social links open in new tab

### Links Testing
- [ ] All phone numbers: `tel:` links
- [ ] All WhatsApp links: `wa.me` format
- [ ] All external links: HTTPS
- [ ] All images load without errors

## Deployment Options

### Option 1: Vercel (Recommended)
```bash
npm i -g vercel
vercel
```
- Auto-deploys on git push
- Free HTTPS & domain
- Instant scaling

### Option 2: Netlify
```bash
npm run build
# Connect to netlify.com
```

### Option 3: Self-Hosted
```bash
npm run build
npm start
```

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

## URL Format Guide

### Phone
```
+91 98765 43210  → +919876543210 (no spaces/dashes)
```

### WhatsApp
```
https://wa.me/919876543210
https://wa.me/919876543210?text=Hi%20I%20want%20to%20book
```

### Google Maps Embed
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!...
(Get from Google My Business or Google Maps)
```

### Images (Use URLs)
```
https://images.unsplash.com/...
https://cdn.example.com/...
Or any publicly accessible image URL
```

## Vercel Deployment in 2 Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Launch"
   git push
   ```

2. **Deploy to Vercel**
   - Go to vercel.com
   - Click "New Project"
   - Select your GitHub repo
   - Click "Deploy"
   - ✅ Live in ~60 seconds!

## Marketing Tips

1. **Meta Tags** - Appear in Google search results
2. **Social Share** - Facebook/WhatsApp preview
3. **Mobile Friendly** - Better Google ranking
4. **Page Speed** - Affects SEO score
5. **Structured Data** - Rich snippets in search

## Environment Variables (Optional)

Create `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
```

## Support

- 📖 Read `README.md` for full documentation
- 📋 Read `CONFIG_GUIDE.md` for detailed config options
- 🚀 Read `SETUP_GUIDE.md` for deployment instructions

---

**Ready to launch? Start with `npm install` then edit `config/salon.json`! 🎉**
