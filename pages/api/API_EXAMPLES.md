# 🚀 Practical API Usage Examples

## Quick Command Reference

### Prerequisites
```bash
# Set these values in your environment or .env.local
export API_URL="http://localhost:3000"
export API_KEY="your-secret-key-123"

# For production
export PROD_URL="https://your-domain.vercel.app"
```

---

## 1️⃣ Create Your First Site

### Option A: Using cURL (Programmatic)
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
    "address": "Shop No. 3, Pump House, Andheri East, Mumbai",
    "googlePlaceId": "ChIJ1b1-KKb64zoRTYlIx-dI1xk"
  }'
```

**Expected Response:**
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

### Option B: Using the Web UI
```
1. Go to: http://localhost:3000/internal/create-site
2. Fill form:
   - Business Name: Cinderella Sharon's Rose Beauty Salon
   - Slug: cinderella-sharons
   - Industry: salon
   - Theme: luxury
   - Layout: layoutA
   - Phone: +91 99679 36773
   - Address: Shop No. 3, Pump House, Andheri East, Mumbai
3. Click "Create Site"
4. Auto-redirects to: http://localhost:3000/site/cinderella-sharons
```

---

## 2️⃣ Create Multiple Sites (Batch)

### Script: create-sites.sh
```bash
#!/bin/bash

API_URL="http://localhost:3000"
API_KEY="your-secret-key-123"

# Helper function
create_site() {
  local name=$1
  local slug=$2
  local industry=$3
  local theme=$4
  local layout=$5
  local phone=$6
  local address=$7

  curl -X POST $API_URL/api/internal/createSite \
    -H "Content-Type: application/json" \
    -H "X-Internal-API-Key: $API_KEY" \
    -d "{
      \"businessName\": \"$name\",
      \"slug\": \"$slug\",
      \"industry\": \"$industry\",
      \"theme\": \"$theme\",
      \"layout\": \"$layout\",
      \"phone\": \"$phone\",
      \"address\": \"$address\"
    }" | jq '.site.url'
}

echo "🌹 Creating Salon..."
create_site \
  "Cinderella Sharon's Beauty Salon" \
  "cinderella-sharons" \
  "salon" \
  "luxury" \
  "layoutA" \
  "+91 99679 36773" \
  "Andheri, Mumbai"

echo "🎨 Creating Tattoo Studio..."
create_site \
  "Ink Tattoo Studio" \
  "ink-tattoo-studio" \
  "tattoo" \
  "modern" \
  "layoutB" \
  "+91 98765 43210" \
  "Fort, Mumbai"

echo "🏥 Creating Medical Clinic..."
create_site \
  "Wellness Medical Clinic" \
  "wellness-clinic" \
  "clinic" \
  "minimal" \
  "layoutC" \
  "+91 87654 32109" \
  "Bandra, Mumbai"

echo "🦷 Creating Dental Practice..."
create_site \
  "Smile Dental Care" \
  "smile-dental" \
  "dentist" \
  "elegant" \
  "layoutA" \
  "+91 76543 21098" \
  "Worli, Mumbai"

echo "✅ All sites created!"
```

**Run:**
```bash
chmod +x create-sites.sh
./create-sites.sh
```

**Result:**
```
🌹 Creating Salon...
/site/cinderella-sharons

🎨 Creating Tattoo Studio...
/site/ink-tattoo-studio

🏥 Creating Medical Clinic...
/site/wellness-clinic

🦷 Creating Dental Practice...
/site/smile-dental

✅ All sites created!
```

---

## 3️⃣ Access Sites

### View All Sites Directory
```bash
curl http://localhost:3000/salons
```

### View Specific Site
```bash
# View in browser
open http://localhost:3000/site/cinderella-sharons

# Or via curl (gets HTML)
curl http://localhost:3000/site/cinderella-sharons
```

### Test Different Industries
```bash
# Salon (services-focused)
http://localhost:3000/site/cinderella-sharons

# Tattoo (portfolio-focused)
http://localhost:3000/site/ink-tattoo-studio

# Clinic (trust-focused)
http://localhost:3000/site/wellness-clinic

# Dentist (trust-focused)
http://localhost:3000/site/smile-dental
```

---

## 4️⃣ Submit Booking/Lead

### From Browser (User submits form on site)
```
1. Open any site: http://localhost:3000/site/cinderella-sharons
2. Scroll to Booking section
3. Fill form:
   - Name: Priya Sharma
   - Phone: +91 9876543210
   - Service: Bridal Makeup
   - Date: 2026-03-20
   - Message: Need appointment ASAP
4. Click "Submit"
```

### Programmatically via cURL
```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "siteSlug": "cinderella-sharons",
    "name": "Priya Sharma",
    "phone": "+91 9876543210",
    "service": "Bridal Makeup",
    "preferredDate": "2026-03-20",
    "message": "Need appointment ASAP"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Lead saved successfully",
  "leadId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Verify Lead in Database
```sql
-- In Supabase SQL Editor
SELECT * FROM leads WHERE siteSlug = 'cinderella-sharons';

-- Result:
-- id | site_id | name | phone | service | preferred_date | created_at
-- uuid | uuid | Priya Sharma | +91 9876543210 | Bridal Makeup | 2026-03-20 | now()
```

---

## 5️⃣ Add Images to Site

### Directory Structure
```
/public/sites/{slug}/
  ├── gallery/
  │   ├── image1.jpg
  │   ├── image2.jpg
  │   └── image3.jpg
  └── before-after/
      ├── before1.jpg
      ├── after1.jpg
      └── before2.jpg
```

### Create Directories
```bash
mkdir -p public/sites/cinderella-sharons/gallery
mkdir -p public/sites/cinderella-sharons/before-after
```

### Add Images
```bash
# Copy images to directories
cp ~/Downloads/salon-image1.jpg public/sites/cinderella-sharons/gallery/
cp ~/Downloads/salon-image2.jpg public/sites/cinderella-sharons/gallery/
cp ~/Downloads/before.jpg public/sites/cinderella-sharons/before-after/
cp ~/Downloads/after.jpg public/sites/cinderella-sharons/before-after/
```

### Use in Site Config
```javascript
// In Supabase, update sites.config_json:
{
  "gallery": [
    "/sites/cinderella-sharons/gallery/image1.jpg",
    "/sites/cinderella-sharons/gallery/image2.jpg",
    "/sites/cinderella-sharons/gallery/image3.jpg"
  ],
  "beforeAfter": [
    {
      "before": "/sites/cinderella-sharons/before-after/before1.jpg",
      "after": "/sites/cinderella-sharons/before-after/after1.jpg"
    }
  ]
}
```

---

## 6️⃣ Deploy to Production

### Build
```bash
npm run build
```

### Deploy via Git
```bash
git add .
git commit -m "Add new sites"
git push

# Vercel auto-deploys
```

### Test Production
```bash
# Production URLs
https://your-domain.vercel.app/site/cinderella-sharons
https://your-domain.vercel.app/site/ink-tattoo-studio

# Create site on production
curl -X POST https://your-domain.vercel.app/api/internal/createSite \
  -H "X-Internal-API-Key: your-secret-key-123" \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Another Salon",
    "slug": "another-salon",
    "industry": "salon",
    "theme": "modern",
    "layout": "layoutB",
    "phone": "+91 XXXXXXXXXX",
    "address": "Address"
  }'
```

---

## 7️⃣ Error Handling Examples

### Invalid API Key
```bash
curl -X POST http://localhost:3000/api/internal/createSite \
  -H "X-Internal-API-Key: wrong-key" \
  -H "Content-Type: application/json" \
  -d '{ "businessName": "Test", ... }'

# Response: 401 Unauthorized
# {
#   "error": "Unauthorized: Invalid or missing API key"
# }
```

### Missing Required Field
```bash
curl -X POST http://localhost:3000/api/internal/createSite \
  -H "X-Internal-API-Key: your-secret-key-123" \
  -H "Content-Type: application/json" \
  -d '{ "slug": "test" }' # Missing required fields

# Response: 400 Bad Request
# {
#   "error": "Validation failed",
#   "details": [
#     "Business name is required",
#     "Industry is required",
#     "Theme is required",
#     "Phone is required"
#   ]
# }
```

### Invalid Phone Format
```bash
curl -X POST http://localhost:3000/api/internal/createSite \
  -H "X-Internal-API-Key: your-secret-key-123" \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Test Salon",
    "slug": "test-salon",
    "industry": "salon",
    "theme": "luxury",
    "layout": "layoutA",
    "phone": "invalid", # Wrong format
    "address": "Test"
  }'

# Response: 400 Bad Request
# {
#   "error": "Validation failed",
#   "details": ["Phone number must be in Indian format (e.g., +91 9876543210)"]
# }
```

### Site Already Exists (Duplicate Slug)
```bash
# Try to create with existing slug
curl -X POST http://localhost:3000/api/internal/createSite \
  -H "X-Internal-API-Key: your-secret-key-123" \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Another Salon",
    "slug": "cinderella-sharons", # Already exists!
    "industry": "salon",
    "theme": "luxury",
    "layout": "layoutA",
    "phone": "+91 9999 9999 99",
    "address": "Another location"
  }'

# Response: 400 Bad Request or 409 Conflict
# {
#   "error": "Site with slug 'cinderella-sharons' already exists"
# }
```

### Booking with Non-Existent Site
```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "siteSlug": "non-existent-salon", # Doesn't exist
    "name": "Customer",
    "phone": "+91 9876543210"
  }'

# Response: 404 Not Found
# {
#   "error": "Site not found"
# }
```

---

## 8️⃣ Advanced Usage

### Get All Sites (Admin)
```bash
# Node.js script
import { getAllSites } from './services/siteService.js';

const sites = await getAllSites();
console.log(sites);
// Output: Array of all sites with all configs
```

### Get Leads for Specific Site (Admin)
```bash
# Node.js script
import { getLeadsForSiteBySlug } from './services/leadProcessor.js';

const leads = await getLeadsForSiteBySlug('cinderella-sharons');
console.log(leads);
// Output: All leads for this site
```

### Mark Lead as Contacted (Admin)
```bash
# Node.js script
import { markLeadAsContacted } from './services/leadProcessor.js';

await markLeadAsContacted('lead-uuid-here');
// Marks lead status as 'contacted' in database
```

### Update Site Configuration
```bash
# Node.js script
import { updateSiteConfig } from './services/siteService.js';

await updateSiteConfig('cinderella-sharons', {
  services: [
    { name: "New Service", price: "₹2,000" },
    // ... more services
  ],
  offers: [
    { title: "Summer Special", discount: "30%" }
  ]
});
```

---

## 9️⃣ Performance Tips

### ISR (Incremental Static Regeneration)
```javascript
// Sites revalidate every 1 hour
// GET /site/[slug] → Cached for 1 hour
// GET /salon/[slug] → Cached for 1 hour

// Force revalidation:
// 1. Wait 1 hour, OR
// 2. Update site config (triggers rebuild), OR
// 3. Redeploy to Vercel
```

### JavaScript Client Example
```javascript
// Create site from JavaScript
async function createSite(data) {
  const response = await fetch('/api/internal/createSite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Internal-API-Key': process.env.NEXT_PUBLIC_API_KEY
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  if (result.success) {
    window.location.href = result.site.url;
  } else {
    console.error('Failed:', result.error);
  }
}

// Submit booking from JavaScript
async function submitBooking(siteSlug, formData) {
  const response = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      siteSlug,
      ...formData
    })
  });

  const result = await response.json();
  if (result.success) {
    alert('Booking submitted! 🎉');
  } else {
    alert('Error: ' + result.error);
  }
}
```

---

## 🔟 Production Deployment Checklist

```bash
☐ Environment variables set in .env.local
☐ Database tables created (sites, leads)
☐ Images uploaded to /public/sites/{slug}/
☐ npm run build successful (no errors)
☐ Local npm run dev tested all routes
☐ Git pushed to repository
☐ Vercel environment variables configured
☐ INTERNAL_API_KEY set in Vercel
☐ npm run build works in Vercel
☐ All sites accessible at production URLs
☐ Google Reviews API configured (optional)
☐ ISR caching verified (check headers)
☐ Booking form tested on live site
☐ Database backups configured
☐ Error monitoring set up (Sentry, etc.)
```

---

## 📞 Production URLs Examples

```
Home Page:          https://your-domain.vercel.app/
All Salons:         https://your-domain.vercel.app/salons
Salon (Legacy):     https://your-domain.vercel.app/salon/cinderella-sharons
Multi-Industry:     https://your-domain.vercel.app/site/cinderella-sharons
                    https://your-domain.vercel.app/site/ink-tattoo-studio
                    https://your-domain.vercel.app/site/wellness-clinic

Create Site (UI):   https://your-domain.vercel.app/internal/create-site
Create Site (API):  https://your-domain.vercel.app/api/internal/createSite
Submit Booking:     https://your-domain.vercel.app/api/lead
```

---

Ready to deploy! 🚀
