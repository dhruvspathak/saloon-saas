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
- 📊 **Visitor Analytics**: Vercel Analytics integration for tracking page views

### Security & Validation
- 🔒 **Form Validation**: Real-time field validation with regex patterns
- 🛡️ **XSS Prevention**: Input sanitization to prevent attacks
- 📱 **Phone Validation**: Indian phone format validation (+91, 10 digits)
- ✅ **Field Error Messages**: User-friendly validation feedback
- 🔐 **Secure Data**: All form data sanitized before storage

### Backend & Integrations
- 🔗 **Google Reviews Integration**: Fetch and display Google ratings & reviews (with ISR caching)
- 📊 **Lead Database**: Supabase Postgres with secure lead storage
- 💾 **Lead Management**: Track all booking inquiries automatically
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

## 🎫 Booking Form with Validation

The "Book your Appointment" form includes **real-time validation and security**:

### Validation Rules
- **Name**: 2-100 characters, letters/spaces/hyphens/apostrophes only
- **Phone**: Indian phone number (10 digits, accepts +91, 0xx, or plain format)
- **Service**: Required - must select from available services
- **Date**: Must be today or in the future, max 90 days ahead
- **Message**: Optional, max 500 characters, HTML/scripts blocked

### Security Features
- ✅ Real-time validation feedback as user types
- ✅ XSS prevention - all inputs sanitized
- ✅ Phone number normalization to +91XXXXXXXXXX
- ✅ Server-side validation in API routes
- ✅ Secure storage in Supabase database

### User Experience
- 🟢 Green checkmark when fields are valid
- 🔴 Red border + error message for invalid input
- 📊 Character counter for message field
- 💬 Success confirmation message
- 🚀 Auto-opens WhatsApp with booking details

## 📊 Visitor Analytics

Vercel Analytics is pre-configured and automatically tracks page views when deployed. Deploy to Vercel → Visit your site → Monitor on Vercel dashboard. See [Vercel Analytics docs](https://vercel.com/docs/analytics) for details.
## 🚀 Recent Updates

### March 2026 Release
- ✅ **Security**: Upgraded to Next.js 15.5.10 (fixed CVE in Next.js 14.2.35)
- ✅ **Form Validation**: Added comprehensive regex & XSS protection to booking form
- ✅ **Analytics**: Integrated Vercel Analytics for visitor tracking
- ✅ **Performance**: Fixed Next.js 15 warnings (stylesheets, image quality)
- ✅ **Accessibility**: Real-time validation feedback with field-level error messages
- ✅ **Data Security**: All form inputs sanitized before API submission
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

Navigation (sticky), Hero (banner), About (story), Services (pricing), Gallery (lightbox), Offers (codes), Reviews (ratings), Location (maps/hours), Booking (form), Footer (social)

## � Design: Rose Gold (#B76E79) | Fonts: Playfair Display + Josefin Sans | Breakpoints: Mobile <640px, Tablet 640-1024px, Desktop >1024px

## ⚙️ Tech Stack

Next.js 15.5.10, React 18, TailwindCSS 3.3, Next.js Image optimization, React Icons, Lightbox, Supabase (Postgres), Vercel Analytics, Regex validation, Vercel hosting, SEO (meta tags + JSON-LD)

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

## 🔄 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

**Env Vars (in Vercel dashboard):**
- NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY (lead database)
- NEXT_PUBLIC_GOOGLE_PLACES_API_KEY (Google reviews)

See [ENV_SETUP.md](ENV_SETUP.md) for keys

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
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
│   ├── BookingSection.jsx  # ✨ With real-time validation
│   ├── LocationSection.jsx
│   ├── AboutSection.jsx
│   ├── GoogleReviewsWidget.jsx
│   └── Footer.jsx
├── pages/                   # Next.js pages
│   ├── _app.jsx            # Analytics integrated
│   ├── _document.jsx       # Global fonts
│   ├── index.jsx
│   ├── salons.jsx
│   ├── salon/[slug].jsx
│   └── api/
│       └── lead.js         # Booking API endpoint
├── config/                  # Configuration files
│   ├── salon.json          # Main config (EDIT THIS!)
│   └── salons/             # Multi-tenant configs
├── public/
│   └── images/             # Static images
├── services/               # Business logic
│   ├── leadProcessor.js    # Lead processing & validation
│   └── googleReviews.js
├── utils/                  # Utility functions
│   ├── validation.js       # 🔒 Form validation & XSS prevention
│   ├── helpers.js
│   └── seo.js
├── lib/
│   └── supabase.js         # Supabase client initialization
├── types/                  # TypeScript types
├── styles/
│   └── globals.css
├── next.config.js          # Next.js configuration
├── tailwind.config.js
├── jsconfig.json
├── .env                    # Environment variables
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

[CONFIG_GUIDE.md](CONFIG_GUIDE.md) | [ENV_SETUP.md](ENV_SETUP.md) | [DEPLOYMENT.md](DEPLOYMENT.md) | [ARCHITECTURE.md](ARCHITECTURE.md) | [QUICK_START.md](QUICK_START.md)

## 🚀 Quick API Ref

**POST /api/lead:** `{salonId, name, phone, service, preferredDate, message}` → `{success, leadId}`

See [ARCHITECTURE.md](ARCHITECTURE.md) for details.

1. **Keep config organized** - Use clear section names
2. **Optimize images** - Use 1920x1080 for hero, 500x500 for gallery
3. **Test links** - Verify all phone, email, WhatsApp links work
4. **Social links** - Include all relevant platforms
5. **Mobile test** - Always test on actual mobile devices
6. **Performance** - Monitor Lighthouse scores

## 👥 Getting Started - 3 Minutes

### Step 1: Clone & Install (1 min)
```bash
git clone https://github.com/yourusername/salon-saas.git
cd salon-saas
npm install
```

### Step 2: Configure Your Salon (1 min)
Edit `config/salon.json` with your salon details:
- Name, tagline, location
- Services with prices and duration
- Contact info (phone, WhatsApp, email)
- Gallery images

### Step 3: Test Locally (1 min)
```bash
npm run dev
# Visit http://localhost:3000
```

That's it! You now have a fully functional salon website with:
- ✅ Booking form with validation
- ✅ WhatsApp integration
- ✅ Before/after gallery
- ✅ Google Reviews (optional)
- ✅ Visitor Analytics

### Optional: Setup Backend

To enable lead storage and Google Reviews:
1. Follow [ENV_SETUP.md](ENV_SETUP.md)
2. Add environment variables to `.env`
3. Restart dev server

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
