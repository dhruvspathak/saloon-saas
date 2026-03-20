/**
 * Smart Defaults / Recommendation Engine
 * Picks theme/layout/sections/components for a given industry with visual diversity.
 *
 * - Deterministic randomness: provide a seed (slug/businessName) for stable outputs.
 * - Scalable: per-industry recommendation modules define allowed sets.
 */
 
import recommendSalon from '@/industries/salon/recommendation';
import recommendTattoo from '@/industries/tattoo/recommendation';
import recommendClinic from '@/industries/clinic/recommendation';
import recommendDentist from '@/industries/dentist/recommendation';
import { getIndustryModule } from '@/industries';
import { getLayout } from '@/layouts';
import { generateDescription, generateTagline } from '@/utils/contentGenerator';
 
const RECOMMENDERS = {
  salon: recommendSalon,
  tattoo: recommendTattoo,
  clinic: recommendClinic,
  dentist: recommendDentist,
};
 
function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}
 
function mulberry32(seed) {
  let t = seed >>> 0;
  return function rand() {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
 
function pick(list, rng, fallback) {
  if (!Array.isArray(list) || list.length === 0) return fallback;
  return list[Math.floor(rng() * list.length)];
}
 
function normalizeIndustry(industry) {
  return (industry || 'salon').toLowerCase();
}
 
function getIndustryRecommender(industry) {
  const key = normalizeIndustry(industry);
  return RECOMMENDERS[key] || RECOMMENDERS.salon;
}
 
function ensureIds(items, prefix) {
  if (!Array.isArray(items)) return [];
  return items.map((it, idx) => ({
    id: it.id || `${prefix}-${idx + 1}`,
    ...it,
  }));
}
 
function buildDefaultIndustryContent({ industry, businessName, slug, seed, phone, whatsapp, address, googlePlaceId }) {
  const industryModule = getIndustryModule(industry);
 
  const displayName = businessName?.trim() || `${industryModule.displayName}`;
  const tagline = generateTagline(industry, seed);
  const description = generateDescription(industry, seed);
 
  const services = ensureIds(industryModule.defaultServices || [], `${industry}-service`);
 
  // Lightweight placeholder content pools (kept small + generic; can be expanded per industry later)
  const gallery = ensureIds(
    [
      { title: 'Signature Work', category: 'Highlights', image: '/images/placeholder-1.svg' },
      { title: 'Client Favorites', category: 'Popular', image: '/images/placeholder-2.svg' },
      { title: 'Studio Moments', category: 'Behind the scenes', image: '/images/placeholder-3.svg' },
    ],
    `${industry}-gallery`
  );
 
  const offers = ensureIds(
    [
      { title: 'New Client Offer', description: 'Enjoy a special welcome discount on your first visit.', discount: '10% OFF', code: 'WELCOME10', validTill: 'This month' },
      { title: 'Weekday Special', description: 'Save more on weekday bookings.', discount: '15% OFF', code: 'WEEKDAY15', validTill: 'Limited time' },
      { title: 'Package Deal', description: 'Bundle services and save.', discount: '20% OFF', code: 'BUNDLE20', validTill: 'This season' },
    ],
    `${industry}-offer`
  );
 
  const reviews = ensureIds(
    [
      { name: 'Aarav', rating: 5, review: 'Fantastic experience—professional, clean, and friendly.', service: 'Service', date: new Date().toISOString() },
      { name: 'Diya', rating: 5, review: 'Highly recommended. Great results and great service.', service: 'Service', date: new Date().toISOString() },
    ],
    `${industry}-review`
  );
 
  const hero = {
    backgroundImage: '/images/hero-default.svg',
    overlayOpacity: 0.55,
  };
 
  const about = {
    headline: `About ${displayName}`,
    description,
    yearsInBusiness: 8,
    clientsSatisfied: '2,500+',
    highlights: [
      { icon: '⭐', title: 'Trusted', description: 'Consistent quality and a reliable experience.' },
      { icon: '🧼', title: 'Clean & Safe', description: 'High standards of hygiene and safety.' },
      { icon: '🤝', title: 'Friendly Team', description: 'Warm service with attention to detail.' },
    ],
  };
 
  const location = {
    address: address || '',
    phone: phone || '',
    whatsapp: whatsapp || phone || '',
    googlePlaceId: googlePlaceId || '',
    email: `hello@${(slug || industry).replace(/[^a-z0-9-]/g, '')}.example`,
    googleMapEmbed: address
      ? `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
      : 'https://www.google.com/maps?q=India&output=embed',
    openingHours: {
      monday: '10:00 AM - 8:00 PM',
      tuesday: '10:00 AM - 8:00 PM',
      wednesday: '10:00 AM - 8:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 8:00 PM',
      saturday: '10:00 AM - 8:00 PM',
      sunday: 'Closed',
    },
  };
 
  return {
    id: slug || displayName,
    slug,
    name: displayName,
    tagline,
    hero,
    about,
    services,
    gallery,
    offers,
    reviews,
    location,
  };
}
 
/**
 * Recommend defaults for a given industry.
 *
 * @param {string} industry
 * @param {object} options
 * @param {string} [options.seed] - seed for deterministic diversity (slug/businessName)
 * @param {string} [options.slug]
 * @param {string} [options.businessName]
 * @param {string} [options.phone]
 * @param {string} [options.whatsapp]
 * @param {string} [options.address]
 * @param {string} [options.googlePlaceId]
 * @param {object} [options.overrides] - partial override { theme, layout, components, sections }
 */
export function recommendConfig(industry, options = {}) {
  const industryKey = normalizeIndustry(industry);
  const recommender = getIndustryRecommender(industryKey);
  const rec = recommender();
 
  const seedBase = options.seed || options.slug || options.businessName || `${industryKey}`;
  const rng = mulberry32(xmur3(`${industryKey}|${seedBase}`)());
 
  const theme = options?.overrides?.theme || pick(rec.allowedThemes, rng, 'luxury');
  const layout = options?.overrides?.layout || pick(rec.allowedLayouts, rng, rec.allowedLayouts?.[0] || 'layoutA');
 
  const components = {
    hero: options?.overrides?.components?.hero || pick(rec.componentVariants?.hero, rng, 'heroA'),
    services: options?.overrides?.components?.services || pick(rec.componentVariants?.services, rng, 'servicesA'),
  };
 
  const sections = options?.overrides?.sections || rec.sections || getLayout(layout);
 
  return {
    theme,
    layout,
    sections,
    components,
    _meta: {
      industry: industryKey,
      seed: seedBase,
    },
  };
}
 
/**
 * Build full `config_json` for storing in DB.
 * Keeps existing renderer compatibility by nesting industry data under `config[industry]`.
 */
export function buildSiteConfigJson(input = {}) {
  const industry = normalizeIndustry(input.industry);
  const seed = input.seed || input.slug || input.businessName || `${industry}`;
 
  const recommendation = recommendConfig(industry, {
    seed,
    slug: input.slug,
    businessName: input.businessName,
    phone: input.phone,
    whatsapp: input.whatsapp,
    address: input.address,
    googlePlaceId: input.googlePlaceId,
    overrides: {
      theme: input.theme,
      layout: input.layout,
      components: input.components,
      sections: input.sections,
    },
  });
 
  const industryContent = buildDefaultIndustryContent({
    industry,
    businessName: input.businessName,
    slug: input.slug,
    seed,
    phone: input.phone,
    whatsapp: input.whatsapp,
    address: input.address,
    googlePlaceId: input.googlePlaceId,
  });
 
  return {
    site: {
      id: input.slug,
      slug: input.slug,
      name: industryContent.name,
      industry,
      theme: recommendation.theme,
      layout: recommendation.layout,
      sections: recommendation.sections,
      components: recommendation.components,
    },
    [industry]: industryContent,
  };
}
 
export default {
  recommendConfig,
  buildSiteConfigJson,
};

