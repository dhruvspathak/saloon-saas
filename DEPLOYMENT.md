## Prerequisites
Supabase project + Google Places API + Vercel account + GitHub repo

## Quick Deploy

1. Ensure `config/salon.json` has `salon.id`, `google.placeId`, `transformations` (optional)
2. `git push origin main`
3. vercel.com/new → Select repo → Import
4. Settings → Environment Variables → Add: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
5. Redeploy

## Testing

1. Visit Vercel URL → Open DevTools Console
2. Check for "Google Reviews loaded", Before/After gallery visible, Booking form loads
3. Fill & submit booking form → See success + WhatsApp
4. Supabase Dashboard → Database → leads → Verify record

## Auto-Deployments

`git push origin main` → Auto-deploys to production

`git push origin dev` → Creates preview deployment

**GitHub Branch Protection (Recommended):** Settings → Branches → Add rule for `main` → Require PRs, status checks

## Optional Enhancements

**Preview Deployments:** PR/branch → Auto creates preview. Vercel Dashboard → Deployments → Click preview

**Custom Domain:** Vercel Settings → Domains → Add domain → Follow DNS → Wait ~30 min

## Monitoring

**Logs:** Vercel Dashboard → Deployments → View Runtime Logs

**Performance:** Lighthouse (speed/SEO), Vercel Analytics (traffic/Core Web Vitals), Supabase (database usage)

**Check:** API Supabase calls, Google API rate limits, env vars

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot find module" | `npm install && npm run build && vercel --prod --force` |
| Env vars not working | Verify all in Vercel, redeploy, check names exact, verify `NEXT_PUBLIC_` prefix |
| Google reviews empty | Check key valid, placeId correct, API enabled, view Vercel logs |
| Leads not saving | Verify Vercel has SUPABASE_SERVICE_ROLE_KEY, table exists, RLS allows inserts, check Vercel logs |

## Maintenance

**Weekly:** Check Vercel/Supabase error logs, monitor leads

**Monthly:** Review analytics, check for updates: `npm outdated`

**Per Update:** Edit config → `git push` (auto-deploys)

## Rollback

**Vercel:** Dashboard → Deployments → Find working version → Click •••  → Rollback

**Git:** `git revert HEAD && git push origin main`

## ✅ Success!

Live with: Lead database, Google reviews, Before/after gallery, Booking form, Auto-deployment

**Next:** WhatsApp/Email/SMS notifications (see ARCHITECTURE.md Roadmap)
