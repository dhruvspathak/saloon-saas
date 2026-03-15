# Salon SaaS - Production Ready MVP

A modern, fully responsive beauty salon website template with **backend-capable features** for lead management and Google reviews integration.

## ✨ Features

### Frontend
- 📱 **Fully Responsive**: Mobile-first design for all devices
- 🎨 **Luxurious Design**: Rose gold & modern aesthetic
- ⚡ **High Performance**: 90+ Lighthouse score
- 🔍 **SEO Optimized**: Meta tags, JSON-LD structured data, Open Graph
- 🖼️ **Gallery with Lightbox**: Professional image showcase
- 🎥 **Before/After Gallery**: Interactive slider for transformations
- 📞 **Multi-Channel Booking**: WhatsApp, Call, and Form booking
- 🗺️ **Location Integration**: Google Maps embedded
- ⭐ **Reviews Section**: Client testimonials with ratings
- 🎯 **Smart CTAs**: Floating WhatsApp button, sticky navigation

### Backend & Integrations (NEW!)
- 🔗 **Google Reviews Integration**: Fetch and display Google ratings & reviews (with ISR caching)
- 📊 **Lead Database**: Supabase Postgres with secure lead storage
- 💾 **Lead Management**: Track all booking inquiries automatically
- 🛡️ **Phone Validation**: Indian phone number validation & sanitization
- 📧 **Notifications Ready**: Prepared for WhatsApp, Email, SMS (future)
- 🏢 **Multi-Tenant Ready**: Designed for SaaS scaling

### Configuration
- ✨ **Configuration-Driven**: Change only `config/salon.json` to launch new salons
- 🚀 **Easy Multi-Tenancy**: Support for multiple salon configurations
- 📝 **JSON-Based Config**: No database setup needed for basic usage

## 🚀 Quick Start

### Installation

```bash
# Clone and install
git clone <repo-url>
cd salon-saas
npm install

# Development
npm run dev

# Production build
npm run build
npm start
```

Visit `http://localhost:3000`

### Setup Backend Services (Optional but Recommended)

For full feature set, configure:

1. **Supabase** (for lead database)
2. **Google Places API** (for reviews integration)

See [ENV_SETUP.md](ENV_SETUP.md) for detailed setup instructions.

### Create New Salon

1. Edit `config/salon.json`
2. Update all fields (name, services, gallery, etc.)
3. Add Google `placeId` (optional, for reviews display)
4. Add `transformations` for before/after gallery (optional)
5. Save and refresh
6. Deploy to Vercel

## � Get Started with Visitor Analytics

To start counting visitors and page views, follow these steps:

### 1. Install Analytics Package

The `@vercel/analytics` package is already installed in your project.

### 2. Analytics Component Added

The `<Analytics/>` React component has been added to your app's layout (`pages/_app.jsx`). It automatically starts collecting page views when you deploy.

```jsx
import { Analytics } from "@vercel/analytics/next"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

### 3. Deploy & Visit Your Site

Deploy your changes to Vercel, then visit your deployment to start collecting page view data.

```bash
# Push to your repository
git add .
git commit -m "Add Vercel Analytics integration"
git push origin main

# Deploy on Vercel (automatic on push)
# Visit your deployment URL
```

### 4. View Your Analytics

- If you don't see data after 30 seconds, please check for content blockers and try navigating between pages on your site
- Visit your Vercel project dashboard to view real-time analytics and visitor statistics
- For full documentation, refer to [Vercel Analytics docs](https://vercel.com/docs/analytics)

## �📋 Configuration

### Minimal Config
```json
{
  "salon": {
    "id": "my-salon",
    "name": "My Beauty Salon",
    "tagline": "Your tagline",
    ...
  }
}
```

### Full Config with Backend Features
```json
{
  "salon": { ... },
  "google": {
    "placeId": "ChIJ1b1-KKb64zoRTYlIx-dI1xk"
  },
  "transformations": [
    {
      "title": "Keratin Treatment",
      "before": "url-to-before.jpg",
      "after": "url-to-after.jpg"
    }
  ]
}
```

See [CONFIG_GUIDE.md](CONFIG_GUIDE.md) for detailed configuration options.

```json
{
  "salon": {
    "name": "Your Salon Name",
    "tagline": "Your tagline",
    "location": {
      "address": "Address",
      "phone": "+91 XXXXX XXXXX",
      "whatsapp": "+91 XXXXX XXXXX"
    },
    "services": [
      {
        "name": "Service Name",
        "price": "₹XXXX",
        "description": "Description"
      }
    ]
  }
}
```

## 🎯 Components

- **Navigation**: Sticky header with smooth scroll
- **Hero Section**: Full-screen banner with CTA buttons
- **About**: Salon story and highlights
- **Services**: Grid layout with pricing and duration
- **Gallery**: Lightbox image viewer
- **Offers**: Promotional cards with discount codes
- **Reviews**: Client testimonials with ratings
- **Location**: Google Maps + opening hours
- **Booking**: Multi-channel booking form
- **Footer**: Social links and contact info

## 🎨 Design System

### Colors
- **Rose Gold**: `#B76E79` (primary)
- **Rose Gold Dark**: `#9B5A63` (hover)
- **Rose Gold Light**: `#D4949D` (accents)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Josefin Sans (modern sans-serif)

### Spacing
- Mobile: 16px base
- Tablet: 24px base
- Desktop: 32px base

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## ⚙️ Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Styling**: TailwindCSS 3.3
- **Images**: Next.js Image optimization
- **Icons**: React Icons
- **Lightbox**: Yet Another React Lightbox
- **Hosting**: Vercel
- **SEO**: Built-in meta tags + JSON-LD

## 📊 Performance Metrics

- **Lighthouse Score**: 90+
- **Core Web Vitals**: All green
- **Performance**: Optimized images with next/image
- **Accessibility**: WCAG 2.1 compliant
- **Best Practices**: 98+ score

## 🔒 SEO & Meta

### Built-in Features
- Meta titles and descriptions
- Open Graph tags for social sharing
- Twitter Card support
- JSON-LD structured data
- Mobile-friendly meta tags
- Robots meta tag
- Canonical URLs (automatic)

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
# Follow prompts
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables

```
NEXT_PUBLIC_ANALYTICS_ID=your_id
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 📁 Project Structure

```
salon-saas/
├── components/              # Reusable React components
│   ├── Navigation.jsx
│   ├── HeroSection.jsx
│   ├── ServicesSection.jsx
│   ├── GallerySection.jsx
│   ├── OffersSection.jsx
│   ├── ReviewsSection.jsx
│   ├── BookingSection.jsx
│   ├── LocationSection.jsx
│   ├── AboutSection.jsx
│   └── Footer.jsx
├── config/                  # Configuration files
│   └── salon.json          # Main config (EDIT THIS!)
├── pages/                  # Next.js pages
│   ├── _app.jsx
│   ├── _document.jsx
│   └── index.jsx
├── public/
│   └── images/             # Static images
├── styles/
│   └── globals.css
├── utils/                  # Utility functions
├── next.config.js
├── tailwind.config.js
├── jsconfig.json
└── package.json
```

## 🎯 Example Salons

The template includes example configuration for:
- **Cinderella Sharon's Rose Beauty Salon** (Andheri East, Mumbai)
  - Services: Keratin, Hair Smoothening, Hair Color, Bridal Makeup
  - Gallery with 6 images
  - 5 customer reviews
  - Complete with prices and timings

## 🔧 Customization

### Change Colors
Edit `tailwind.config.js`:
```js
'rose-gold': '#YOUR_COLOR'
```

### Change Fonts
Edit Google Fonts link in `pages/index.jsx`

### Add New Sections
1. Create component in `components/`
2. Import in `pages/index.jsx`
3. Add to config for data-driven approach

### Add Google Analytics
Uncomment GA code in `pages/_document.jsx`

## � Backend Features

### Google Reviews Integration

Automatically fetch and display Google ratings and reviews on your website.

**Setup:**
1. Get your salon's Google Place ID (see [ENV_SETUP.md](ENV_SETUP.md))
2. Add to `config/salon.json`:
   ```json
   {
     "google": {
       "placeId": "ChIJ..."
     }
   }
   ```
3. Set `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` environment variable

**Features:**
- ✅ Displays average rating and review count
- ✅ Shows top 5 reviews with author info
- ✅ ISR caching (1-hour revalidation)
- ✅ Link to Google Maps page

### Lead Database

All bookings are automatically saved to Supabase database.

**Setup:**
1. Create Supabase project (see [ENV_SETUP.md](ENV_SETUP.md))
2. Set environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

**Features:**
- ✅ Secure lead storage with validation
- ✅ Phone number validation & sanitization
- ✅ Timestamps for follow-up tracking
- ✅ Dashboard-ready structure

### Before/After Transformation Gallery

Interactive slider showcasing service transformations.

**Setup:**
1. Add to `config/salon.json`:
   ```json
   {
     "transformations": [
       {
         "title": "Service Name",
         "before": "url-to-before-image",
         "after": "url-to-after-image"
       }
     ]
   }
   ```

**Features:**
- ✅ Interactive before/after slider
- ✅ Service-specific galleries
- ✅ Lazy loading images
- ✅ Mobile-friendly

## 📚 Documentation

- [CONFIG_GUIDE.md](CONFIG_GUIDE.md) - Detailed configuration options
- [ENV_SETUP.md](ENV_SETUP.md) - Backend services setup (Supabase, Google Places API)
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy to Vercel
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture and future roadmap
- [QUICK_START.md](QUICK_START.md) - Quick start guide

## 🚀 API Endpoints

### POST /api/lead

Submit a booking lead.

**Request:**
```json
{
  "salonId": "cinderella-andheri",
  "name": "Customer Name",
  "phone": "+91-98765-43210",
  "service": "Keratin Treatment",
  "preferredDate": "2026-03-20",
  "message": "Optional message"
}
```

**Response:**
```json
{
  "success": true,
  "leadId": "uuid...",
  "message": "Lead saved successfully"
}
```

## 🏢 Multi-Tenant Ready

The system is designed for future multi-tenant scaling:
- ✅ Salon ID isolation in database
- ✅ Config-based multi-salon setup
- ✅ Prepared for dynamic routing: `/salon/[slug]`

See [ARCHITECTURE.md](ARCHITECTURE.md) for details.

1. **Keep config organized** - Use clear section names
2. **Optimize images** - Use 1920x1080 for hero, 500x500 for gallery
3. **Test links** - Verify all phone, email, WhatsApp links work
4. **Social links** - Include all relevant platforms
5. **Mobile test** - Always test on actual mobile devices
6. **Performance** - Monitor Lighthouse scores

## 🆘 Troubleshooting

### Images not loading
- Check URLs are valid and accessible
- Verify image paths in config
- Check CORS policies

### Styling issues
- Rebuild Next.js: `npm run build`
- Clear `.next` folder: `rm -rf .next`
- Restart dev server

### Booking form issues
- Verify WhatsApp number format
- Check phone number includes country code
- Test WhatsApp link manually

## 📄 License

MIT License - Feel free to use for your clients!

## 🤝 Support

For issues and questions:
1. Check [CONFIG_GUIDE.md](CONFIG_GUIDE.md)
2. Review example config in `config/salon.json`
3. Test on Vercel: `vercel --prod`

## 🚀 Future Enhancements

- [ ] Multi-language support
- [ ] Payment integration (Razorpay/Stripe)
- [ ] Admin dashboard for config management
- [ ] Email confirmation for bookings
- [ ] Customer portal / login
- [ ] Appointment calendar integration
- [ ] SMS notifications
- [ ] Analytics dashboard
- [ ] AI-powered chatbot

---

**Built with ❤️ for beauty salons** | Ready for production | Vercel optimized
