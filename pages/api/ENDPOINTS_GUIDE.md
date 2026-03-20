# Complete Endpoints Reference & Workflow Guide

## 🗺️ All Available Routes & Endpoints

### **PUBLIC PAGES** (Anyone can access)

#### 1. **GET `/`** - Home/Landing Page
- **Purpose**: Display default salon homepage
- **Functions**: Loads default salon config from `config/salon.json`
- **Returns**: Server-rendered HTML page with salon info, services, gallery, booking form
- **Use in Flow**: 
  ```
  Your app home page
  http://localhost:3000/
  ```

#### 2. **GET `/salons`** - Salons Directory
- **Purpose**: List all available salons in your network
- **Functions**: Loads all salon configs from `config/salons/` directory
- **Returns**: Gallery of linked salons with cards for each salon
- **Use in Flow**:
  ```
  Discovery page showing all your businesses
  http://localhost:3000/salons
  ```
  Click salon card → Goes to `/salon/{slug}`

#### 3. **GET `/salon/[slug]`** - Individual Salon Page (LEGACY)
- **Purpose**: Display specific salon website
- **Parameters**: 
  - `slug` = salon identifier (e.g., `cinderella-sharons`)
- **Functions**: 
  - First tries to load from new `sites` table (industry='salon')
  - Falls back to old config files (`config/salons/{slug}.json`)
  - Fetches Google Reviews (if googlePlaceId exists)
  - Loads theme & layout from site config
- **Returns**: Fully rendered salon website with theme applied
- **Use in Flow**:
  ```
  Access specific salon/business
  http://localhost:3000/salon/cinderella-sharons
  ```
  **Example Output**:
  - Shows: Hero section, services, gallery, reviews, booking form
  - Theme applied: Luxury (rose-gold)
  - Layout applied: LayoutA (services-focused)

#### 4. **GET `/site/[slug]`** - Multi-Industry Site Page (NEW)
- **Purpose**: Display any industry site (new unified route)
- **Parameters**:
  - `slug` = site identifier (from `sites` table)
- **Functions**:
  - Loads from `sites` table (any industry)
  - Gets theme, layout, industry modules dynamically
  - Applies correct terminology for industry
  - Fetches Google Reviews
  - Renders with correct layout order
- **Returns**: Fully rendered site with dynamic theme/layout/industry settings
- **Use in Flow**:
  ```
  Main route for all new sites
  http://localhost:3000/site/cinderella-sharons      # Salon
  http://localhost:3000/site/ink-tattoo-studio      # Tattoo studio
  http://localhost:3000/site/wellness-clinic        # Medical clinic
  http://localhost:3000/site/smile-dental           # Dentist
  ```

#### 5. **GET `/internal/create-site`** - Site Creation Interface
- **Purpose**: Protected operator page to create new sites
- **Security**: Requires `INTERNAL_API_KEY` check
- **Functions**:
  - Loads available industries, themes, layouts
  - Provides form with validation
  - Auto-generates slug from business name
  - Submits to `POST /api/internal/createSite`
- **Form Fields**:
  ```
  Business Name*     (required)
  Slug*              (auto-filled, required)
  Industry*          (dropdown: salon, tattoo, clinic, dentist)
  Theme*             (dropdown: luxury, modern, minimal, elegant)
  Layout*            (dropdown: layoutA, layoutB, layoutC)
  Phone*             (required)
  WhatsApp           (optional)
  Address*           (required)
  Google Place ID    (optional, for reviews)
  ```
- **Use in Flow**:
  ```
  Step 1: Operator creates new site
  http://localhost:3000/internal/create-site
  
  Fill form:
  - Business Name: "Cinderella Sharon's"
  - Industry: "salon"
  - Theme: "luxury"
  - Layout: "layoutA"
  
  Click "Create Site" → API called → Site created → Redirects to /site/cinderella-sharons
  ```

---

### **API ENDPOINTS** (Backend only)

#### 6. **POST `/api/internal/createSite`** - Create New Site (API)
- **Purpose**: Programmatically create a new site in database
- **Security**: Requires `X-Internal-API-Key` header
- **Content-Type**: `application/json`
- **Request Body**:
  ```javascript
  {
    "businessName": "Cinderella Sharon's",     // required
    "slug": "cinderella-sharons",              // required
    "industry": "salon",                       // required: salon|tattoo|clinic|dentist
    "theme": "luxury",                         // required: luxury|modern|minimal|elegant
    "layout": "layoutA",                       // required: layoutA|layoutB|layoutC
    "phone": "+91 99679 36773",                // required
    "whatsapp": "+91 98765 43210",             // optional
    "address": "Mumbai address here",          // required
    "googlePlaceId": "ChIJ1b1..." // optional, for Google reviews
  }
  ```
- **Returns (Success - 201)**:
  ```javascript
  {
    "success": true,
    "message": "Site created successfully",
    "site": {
      "id": "uuid-here",
      "slug": "cinderella-sharons",
      "name": "Cinderella Sharon's",
      "industry": "salon",
      "theme": "luxury",
      "layout": "layoutA",
      "url": "/site/cinderella-sharons"
    }
  }
  ```
- **Returns (Error - 400/401/500)**:
  ```javascript
  {
    "error": "Validation failed",
    "details": [
      "Slug must contain only lowercase letters, numbers, and hyphens",
      "Phone number is required"
    ]
  }
  ```
- **Use in Flow**:
  ```
  Step 1: Programmatic Site Creation
  
  curl -X POST http://localhost:3000/api/internal/createSite \
    -H "Content-Type: application/json" \
    -H "X-Internal-API-Key: your-secret-key" \
    -d '{
      "businessName": "New Tattoo Studio",
      "slug": "new-tattoo-studio",
      "industry": "tattoo",
      "theme": "modern",
      "layout": "layoutB",
      "phone": "+91 98765 43210",
      "address": "Studio address"
    }'
  
  Response:
  ✅ Site created
  📍 Live at: /site/new-tattoo-studio
  ```

#### 7. **POST `/api/lead`** - Submit Booking/Lead Form
- **Purpose**: Submit booking inquiry from site visitor
- **Content-Type**: `application/json`
- **Request Body**:
  ```javascript
  {
    "siteSlug": "cinderella-sharons",      // required: which site
    "name": "Customer Name",                // required
    "phone": "+91 9876543210",              // required
    "service": "Hair Coloring",             // optional
    "preferredDate": "2026-03-20",          // optional
    "message": "Want to schedule"           // optional
  }
  ```
- **Processing**:
  - Validates phone number format
  - Sanitizes all inputs (XSS prevention)
  - Stores in `leads` table with `site_id`
  - Isolates leads by site
- **Returns (Success - 200)**:
  ```javascript
  {
    "success": true,
    "message": "Lead saved successfully",
    "leadId": "uuid-here"
  }
  ```
- **Use in Flow**:
  ```
  Step 2: Customer books appointment
  
  Visitor fills booking form on /site/cinderella-sharons
  
  Form data:
  {
    "siteSlug": "cinderella-sharons",
    "name": "Priya Sharma",
    "phone": "+91 9876543210",
    "service": "Bridal Makeup",
    "preferredDate": "2026-03-20"
  }
  
  POST /api/lead
  
  Response:
  ✅ Lead stored in database
  📊 Isolated to site: cinderella-sharons
  📋 Lead ID: <uuid>
  ```

---

## 🔄 Complete Workflow: From Prompt → Deploy → Visit

### **SCENARIO: Launch a New Beauty Salon**

#### **PHASE 1: Preparation (Local Development)**

**Step 1.1: Environment Setup**
```bash
cd salon-saas
npm install
```

**Step 1.2: Configure .env.local**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
INTERNAL_API_KEY=your-secret-key-123
```

**Step 1.3: Create Database Tables**
```bash
# In Supabase SQL Editor
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

CREATE INDEX idx_sites_slug ON sites(slug);
CREATE INDEX idx_leads_site_id ON leads(site_id);
```

**Step 1.4: Start Development Server**
```bash
npm run dev
# http://localhost:3000
```

---

#### **PHASE 2: Create Site (Method A - Via UI)**

**Step 2.1A: Open Internal Tool**
```
http://localhost:3000/internal/create-site
```

**Step 2.1B: Fill Form**
```
Business Name:     Cinderella Sharon's Rose Beauty Salon
Slug:              cinderella-sharons (auto-filled)
Industry:          salon
Theme:             luxury
Layout:            layoutA
Phone:             +91 99679 36773
WhatsApp:          +91 98765 43210
Address:           Pump House, Andheri East, Mumbai
Google Place ID:   ChIJ1b1-KKb64zoRTYlIx-dI1xk (optional)
```

**Step 2.1C: Click "Create Site"**
```
✅ Site created in database
✅ Default services loaded from salon industry module
✅ Theme "luxury" applied
✅ Layout LayoutA applied
✅ Redirects to: http://localhost:3000/site/cinderella-sharons
```

**Result**: Site live with all defaults!

---

#### **PHASE 2 Alternative: Create Site (Method B - Via API)**

**Step 2.2A: Call API**
```bash
curl -X POST http://localhost:3000/api/internal/createSite \
  -H "Content-Type: application/json" \
  -H "X-Internal-API-Key: your-secret-key-123" \
  -d '{
    "businessName": "Cinderella Sharon'\''s Rose Beauty Salon",
    "slug": "cinderella-sharons",
    "industry": "salon",
    "theme": "luxury",
    "layout": "layoutA",
    "phone": "+91 99679 36773",
    "whatsapp": "+91 98765 43210",
    "address": "Pump House, Andheri East, Mumbai",
    "googlePlaceId": "ChIJ1b1-KKb64zoRTYlIx-dI1xk"
  }'
```

**Result**:
```json
{
  "success": true,
  "message": "Site created successfully",
  "site": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "slug": "cinderella-sharons",
    "name": "Cinderella Sharon's Rose Beauty Salon",
    "industry": "salon",
    "theme": "luxury",
    "layout": "layoutA",
    "url": "/site/cinderella-sharons"
  }
}
```

---

#### **PHASE 3: Customize Site (Optional)**

**Step 3.1: View Site Data**
```bash
# Site stored in Supabase sites table:
{
  id: "550e8400-e29b-41d4-a716-446655440000",
  slug: "cinderella-sharons",
  name: "Cinderella Sharon's Rose Beauty Salon",
  industry: "salon",
  theme: "luxury",
  layout: "layoutA",
  config_json: {
    site: { ... },
    location: { ... },
    services: [ // Populated from salon industry defaults
      { name: "Keratin Treatment", price: "₹3,500" },
      { name: "Hair Coloring", price: "₹1,500 - ₹4,000" },
      // ... more services
    ],
    // ... other sections
  }
}
```

**Step 3.2: Add Images**
```bash
# Create directories
mkdir -p /public/sites/cinderella-sharons/gallery
mkdir -p /public/sites/cinderella-sharons/before-after

# Add images
/public/sites/cinderella-sharons/gallery/image1.jpg
/public/sites/cinderella-sharons/gallery/image2.jpg
/public/sites/cinderella-sharons/before-after/before1.jpg
/public/sites/cinderella-sharons/before-after/after1.jpg
```

**Step 3.3: Update Config (via API or Database UI)**
```javascript
// Update config_json with images, offers, etc.
{
  gallery: [
    "/sites/cinderella-sharons/gallery/image1.jpg",
    "/sites/cinderella-sharons/gallery/image2.jpg"
  ],
  beforeAfter: [
    {
      before: "/sites/cinderella-sharons/before-after/before1.jpg",
      after: "/sites/cinderella-sharons/before-after/after1.jpg"
    }
  ]
}
```

---

#### **PHASE 4: Test Locally**

**Step 4.1: Visit Site**
```bash
# Browser
http://localhost:3000/site/cinderella-sharons
```

**Expected Output**:
```
✅ Hero section with background image
✅ About section with salon description
✅ Services section (from industry defaults)
✅ Gallery section (your images)
✅ Before-After transformations
✅ Offers section
✅ Reviews (from Google Places API)
✅ Location section with map
✅ Booking form
✅ Theme applied: Luxury (rose-gold colors, serif fonts)
✅ Layout: LayoutA (services-focused)
```

**Step 4.2: Test Booking Form**
```javascript
// Fill booking form
{
  name: "Test Customer",
  phone: "+91 9876543210",
  service: "Hair Coloring",
  preferredDate: "2026-03-20",
  message: "Interested in booking"
}

// Submit to: POST /api/lead
// Lead stored in database with: site_id = "cinderella-sharons"
```

**Verify in Supabase**:
```sql
SELECT * FROM leads WHERE site_id = '550e8400-e29b-41d4-a716-446655440000';
```

---

#### **PHASE 5: Deploy to Vercel**

**Step 5.1: Build**
```bash
npm run build
# ✅ All routes optimized
# ✅ ISR enabled for /site/[slug] and /salon/[slug]
# ✅ Static pages generated
```

**Step 5.2: Deploy Option A - Git Push**
```bash
# Push to GitHub
git add .
git commit -m "Add cinderella-sharons site"
git push

# Vercel auto-deploys
# ✅ Live at: https://your-domain.vercel.app/site/cinderella-sharons
```

**Step 5.3: Deploy Option B - Vercel CLI**
```bash
npm install -g vercel
vercel deploy --prod
```

**Step 5.4: Add Environment Variables to Vercel**
```bash
# In Vercel Dashboard → Settings → Environment Variables
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
INTERNAL_API_KEY=...
```

---

#### **PHASE 6: Visit Live Site**

**Step 6.1: Production URL**
```
https://your-app.vercel.app/site/cinderella-sharons
```

**Step 6.2: Create More Sites**
```bash
# Via API (production)
curl -X POST https://your-app.vercel.app/api/internal/createSite \
  -H "X-Internal-API-Key: your-secret-key" \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Ink Tattoo Studio",
    "slug": "ink-tattoo-studio",
    "industry": "tattoo",
    "theme": "modern",
    "layout": "layoutB",
    "phone": "+91 XXXXXXXXXX",
    "address": "Studio Address"
  }'

# Result: https://your-app.vercel.app/site/ink-tattoo-studio
```

**Step 6.3: Access Directory**
```
https://your-app.vercel.app/salons
# Shows all your sites
```

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     COMPLETE REQUEST FLOW                       │
└─────────────────────────────────────────────────────────────────┘

1. CREATE SITE
   ┌──────────────────────────────┐
   │  /internal/create-site       │  (UI Form)
   │  or                          │
   │  POST /api/internal/createSite│ (API)
   └──────────────┬───────────────┘
                  │
                  ▼
         ┌────────────────────┐
         │  Database: sites   │
         │  table insert      │
         │  ✅ Created        │
         └────────────────────┘

2. VISIT SITE
   ┌──────────────────────────────┐
   │  GET /site/[slug]            │
   │  Browser request             │
   └──────────────┬───────────────┘
                  │
                  ▼
   ┌────────────────────────────────────┐
   │  Next.js getStaticProps()          │
   │  ├─ Load site from DB              │
   │  ├─ Load theme (luxury)            │
   │  ├─ Load layout (layoutA)          │
   │  ├─ Load industry (salon)          │
   │  ├─ Fetch Google Reviews           │
   │  └─ Merge all configs              │
   └─────────┬──────────────────────────┘
             │
             ▼
   ┌────────────────────────────────────┐
   │  React Component Render            │
   │  ├─ Apply theme CSS               │
   │  ├─ Render sections by layout     │
   │  ├─ Show services (from industry) │
   │  └─ Display with theme colors     │
   └─────────┬──────────────────────────┘
             │
             ▼
   ┌────────────────────────────────────┐
   │  Browser displays                  │
   │  ✨ Beautiful themed site          │
   └────────────────────────────────────┘

3. SUBMIT LEAD
   ┌──────────────────────────────┐
   │  Customer fills booking form │
   │  Clicks submit               │
   └──────────────┬───────────────┘
                  │
                  ▼
   ┌──────────────────────────────┐
   │  POST /api/lead              │
   │  {                           │
   │    siteSlug,                 │
   │    name, phone, service      │
   │  }                           │
   └──────────────┬───────────────┘
                  │
                  ▼
   ┌────────────────────────────────────┐
   │  Lead Processor                    │
   │  ├─ Validate phone                 │
   │  ├─ Sanitize inputs (XSS)          │
   │  ├─ Get site_id from slug          │
   │  └─ Insert into leads table        │
   └─────────┬──────────────────────────┘
             │
             ▼
   ┌────────────────────────────────────┐
   │  Database: leads table             │
   │  ✅ Lead stored with site_id       │
   │  📧 Ready for notifications        │
   └────────────────────────────────────┘
```

---

## 🎯 Quick Reference: Which Endpoint to Use?

| Goal | Use Endpoint | Method |
|------|--------------|--------|
| Show home page | `GET /` | Public |
| List all salons | `GET /salons` | Public |
| View specific salon (old) | `GET /salon/{slug}` | Public |
| View any site (new) | `GET /site/{slug}` | Public |
| Create site via UI | `GET /internal/create-site` | Protected |
| Create site via code | `POST /api/internal/createSite` | Protected API |
| Submit booking | `POST /api/lead` | Public API |

---

## 🔒 Security & Usage Notes

### API Key Protection
```javascript
// Only needed for:
// 1. POST /api/internal/createSite
// 2. GET /internal/create-site

Header: X-Internal-API-Key: your-secret-key
```

### Public Access
```javascript
// These are public, no auth needed:
// 1. GET /
// 2. GET /salons
// 3. GET /salon/{slug}
// 4. GET /site/{slug}
// 5. POST /api/lead (public booking form)
```

### Data Isolation
```javascript
// Each site isolated by:
// - site_id in leads table
// - slug in sites table
// - separate /public/sites/{slug}/ directories
```

---

## 📋 Complete Request/Response Examples

### Example 1: Create Salon via UI
```
Browser → GET http://localhost:3000/internal/create-site
          ↓
        Form appears
          ↓
Input → Business Name: "Cinderella Sharon's"
        Industry: "salon"
        Theme: "luxury"
        Layout: "layoutA"
          ↓
        Form submits to POST /api/internal/createSite
          ↓
Response ← 201 Created
        ← { success: true, url: "/site/cinderella-sharons" }
          ↓
        Redirect to /site/cinderella-sharons
          ↓
        Live site displays!
```

### Example 2: Customer Books Appointment
```
Browser → GET http://localhost:3000/site/cinderella-sharons
          ↓
        Site displays with booking form
          ↓
Input → Fill form:
        Name: "Priya"
        Phone: "+91 9876543210"
        Service: "Hair Coloring"
        Date: "2026-03-20"
          ↓
        Form submits to POST /api/lead
          ↓
Response ← 200 OK
        ← { success: true, leadId: "uuid" }
          ↓
        Lead stored in database
          ↓
        Database now shows:
        leads table: 1 new row with site_id = cinderella-sharons
```

### Example 3: Programmatically Add Tattoo Studio
```
Code → curl -X POST /api/internal/createSite
          -H "X-Internal-API-Key: secret"
          -d "{ industry: tattoo, theme: modern, ... }"
          ↓
Response ← 201 Created
        ← { url: "/site/ink-tattoo-studio" }
          ↓
        Immediately accessible:
        http://localhost:3000/site/ink-tattoo-studio
```

---

This is your complete endpoint map! Use this to understand the full system and build any automation on top of it.
