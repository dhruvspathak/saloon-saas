/**
 * Content Variation Engine
 * Generates non-duplicate marketing copy using template pools.
 */
 
const INDUSTRY_LABELS = {
  salon: { business: 'salon', craft: 'beauty' },
  tattoo: { business: 'studio', craft: 'tattoo artistry' },
  clinic: { business: 'clinic', craft: 'healthcare' },
  dentist: { business: 'dental clinic', craft: 'dental care' },
};
 
function mulberry32(seed) {
  let t = seed >>> 0;
  return function rand() {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
 
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
 
function pick(list, rng) {
  if (!Array.isArray(list) || list.length === 0) return '';
  return list[Math.floor(rng() * list.length)];
}
 
function getIndustryTokens(industry) {
  return INDUSTRY_LABELS[industry] || { business: 'business', craft: 'services' };
}
 
export function generateTagline(industry, seed = '') {
  const { business, craft } = getIndustryTokens(industry);
  const rng = mulberry32(xmur3(`${industry}|tagline|${seed}`)());
 
  const templates = [
    `Where ${craft} meets comfort.`,
    `Your trusted ${business} for modern ${craft}.`,
    `Premium ${craft}, crafted with care.`,
    `Experience ${craft} done right.`,
    `A better way to enjoy ${craft}.`,
    `Professional ${craft} with a personal touch.`,
    `Carefully curated ${craft} for every visit.`,
    `Elevate your day with exceptional ${craft}.`,
  ];
 
  return pick(templates, rng);
}
 
export function generateDescription(industry, seed = '') {
  const { business, craft } = getIndustryTokens(industry);
  const rng = mulberry32(xmur3(`${industry}|description|${seed}`)());
 
  const templates = [
    `Welcome to our ${business}, where we focus on quality, consistency, and a great experience—every single time.`,
    `From first-time visitors to regulars, we deliver ${craft} that feels effortless, elevated, and tailored to you.`,
    `We combine expertise with thoughtful service to make every visit smooth, comfortable, and genuinely satisfying.`,
    `Our team is committed to safe, clean, and professional standards—so you can enjoy ${craft} with confidence.`,
    `A modern space, a skilled team, and a simple promise: exceptional ${craft} without the hassle.`,
  ];
 
  return pick(templates, rng);
}
 
