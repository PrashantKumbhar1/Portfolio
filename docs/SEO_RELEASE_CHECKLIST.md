# SEO release quality gate

Review date: 25 October 2026. Scope: current uncommitted SEO implementation and local production build. No push, deployment, DNS or external-account changes were made.

**Overall outcome: PENDING browser/hydration/visual verification.** Local build, raw HTML, HTTP and artifact gates pass. Do not describe this as a fully browser-verified release.

## Executed checks

| Step | Actual outcome | Evidence / command | Outstanding action |
| --- | --- | --- | --- |
| Read four SEO documents and inspect code/diff | PASS; corrected overstated hero copy changes | `git diff`, source and document reads | None for the source review |
| TypeScript | PASS | `npm.cmd run check` | None |
| Existing portfolio/content/contact logic tests | PASS | `npm.cmd run test:portfolio` | These do not prove browser interactions or inbox delivery |
| Production build and prerender | PASS | `npm.cmd run build` | Browser hydration still required |
| Metadata, JSON-LD, robots and sitemap | PASS locally | Build-integrated `seo:check`; JSON parse; exact canonical sitemap | Google external validation remains manual |
| Raw initial HTTP body before JavaScript | PASS | `python script/verify-release-html.py`; evidence `.local/seo-release-initial-html.json` | After-hydration comparison not executed |
| Initial body content | PASS | Parser confirms H1/name, introduction, all five projects, education, experience and contact email | No-JS visual layout not tested |
| Homepage/query/fragment direct HTTP reads | PASS, 200 | `npm.cmd run seo:check -- --url http://127.0.0.1:5174` | Browser hash navigation/refresh not tested; fragments are not sent to HTTP servers |
| Canonical alias redirect | PASS, 301 to `/`, destination 200 | Expanded HTTP check, redirects disabled until explicit destination read | Actual Netlify edge check after approval/deployment |
| Missing route/nested route/missing chunk | PASS, 404 and noindex error HTML | Expanded HTTP check | Actual Netlify edge check after approval/deployment |
| Crawl content types | PASS: robots text/plain, sitemap XML | Expanded HTTP check and XML parser | Recheck deployed host |
| All referenced assets and three optional JS chunks | PASS: 15 HTTP asset checks | Status, MIME and cache checks | Runtime chunk execution still untested |
| HTML and unhashed asset caching | PASS: revalidate | HTTP Cache-Control checks | Recheck Netlify output after deployment |
| Existing fingerprinted files | PASS: one-year immutable | Exact generated `_headers` paths and HTTP checks | None locally |
| Missing-chunk cache policy | PASS: revalidate, no immutable 404 | New negative-path HTTP check | Recheck actual edge behavior |
| Conservative security headers | PASS at HTTP level: nosniff, Referrer-Policy, frame denial | Expanded HTTP check | Browser integration behavior remains unverified; no CSP added |
| Production indexability directives | PASS locally: canonical production URL, allow robots, index meta, no noindex HTTP header | Expanded metadata/HTTP check | Does not prove Google crawling/indexing |
| Preview-context noindex logic | Code reviewed; metadata unit assertion PASS | `seoHead({preview:true})` test and generator review | Full preview deployment not executed |
| Artifact root, CRC, required generated files | PASS | `python script/verify-release-artifact.py` | None for the current ZIP |
| Artifact freshness | PASS: all 20 entries match `client/dist` byte-for-byte | SHA-256 comparison per file; no source wrapper or node_modules | Rerun after any new build |
| Git whitespace checks | PASS | `git diff --check` | No commit/push performed |

Current archive: `Portfolio-Netlify.zip`.

SHA-256: `326289e44219ac83ff31ef566281a9a4d93323a9689250231d0f975b7076a6ed`.

The previous ZIP matched the previous output when first inspected. The follow-up build changed hashed assets, and the comparison correctly rejected the stale archive before it was regenerated. Final comparison passes.

## Defects addressed

1. Immutable wildcard caching could affect missing JS responses. Generate exact paths for existing files; missing paths revalidate.
2. The local server matched exact header routes as prefixes. It now matches exact paths exactly and wildcard prefixes only when explicitly declared.
3. Previous HTTP testing omitted lazy-chunk MIME/cache checks and redirect destination validation. Tests now cover these, plus nested errors and security headers.
4. Previous ZIP verification checked CRC/presence but did not prove freshness. A reusable whole-file-set/hash comparison now rejects stale artifacts.
5. Documentation overstated two copy edits that had not applied; corrected the report to the retained source. Loading feedback had a literal question mark; fixed without redesign.

## Browser gate - NOT EXECUTED

The production server was explicitly started at `http://127.0.0.1:5174/`. Opening that address with the in-app browser failed because `iab` is unavailable. Native Chrome was discovered and bound successfully; requesting a dedicated test tab was then stopped by Computer Use because the current browser URL could not be established with sufficient confidence for policy enforcement. No further browser-control attempts or policy bypasses were made.

Consequently, the following are unverified: browser hydration and runtime/console errors; head metadata after hydration; desktop/mobile screenshots; font and image rendering; hero shifts/overflow; actual carousel swipe; all navigation and modal clicks; search and case-study tabs; form behavior in the browser; keyboard/focus and reduced-motion execution; direct browser refresh and 404 rendering. Render/logic tests are not substituted for these checks. Screenshot artifacts were not obtained.

Manual browser test:

1. Start `npm.cmd run seo:preview` and open `http://127.0.0.1:5174/` in Chrome.
2. Check Console before and after reload for React hydration errors, failed chunks/assets and runtime exceptions. Compare View Source with Elements for exactly one title, description, canonical and JSON-LD graph after loading.
3. At desktop width, inspect the full page and original-aspect portrait. Exercise search with Ctrl/Cmd+K and keyboard selection; open/close every project, use all tabs/stages, and filter the map.
4. In Device Toolbar test 360px and 390px widths plus landscape. Check no horizontal page overflow, name/photo visibility, project carousel arrows and touch swipe, menu dismissal, skill switching and dialogs with the on-screen keyboard.
5. Use Tab/Shift+Tab/Escape to verify focus, skip link and dialog restoration. In DevTools Rendering emulate prefers-reduced-motion: reduce and check usability.
6. Check form errors without sending. A real inbox delivery check requires an intentionally authorized message; it was not sent in this pass. Download the Resume and verify its content opens.
7. Refresh `/` and `/#work`; open an unknown path and check the error page/return link. Save desktop/mobile screenshots and record browser/version/viewport.

## Lighthouse - NOT MEASURED

No scores, LCP, CLS, TBT or INP-related values were measured. `lighthouse`, `playwright` and `@playwright/test` are not installed. Chrome DevTools could not be operated because of the browser policy stop. No alternate automation was installed or used to bypass it. Lighthouse is lab testing, not field Core Web Vitals; INP requires interaction/field evidence and is not inferred from TBT.

On a machine with a supported Node version, Chrome and working browser access, keep the production server running and execute:

```powershell
npx.cmd --yes lighthouse http://127.0.0.1:5174/ --only-categories=performance,accessibility,best-practices,seo --output=html --output=json --output-path=.local/lighthouse-mobile --chrome-flags="--headless"
npx.cmd --yes lighthouse http://127.0.0.1:5174/ --preset=desktop --only-categories=performance,accessibility,best-practices,seo --output=html --output=json --output-path=.local/lighthouse-desktop --chrome-flags="--headless"
```

These commands are provided for later execution and were NOT run. They download the official Lighthouse package if absent. Record its version, Chrome version, date, URL and actual report settings. Inspect Performance/Accessibility/Best Practices/SEO, LCP, CLS, TBT, render blocking, image selection and large bundles. Fix measured defects, rerun applicable checks and regenerate/recompare the ZIP. [Official Lighthouse CLI documentation](https://github.com/GoogleChrome/lighthouse#using-the-node-cli).

## Authorized deployment and Google steps - NOT PERFORMED

1. Complete the pending browser and Lighthouse gates. Review this report and approve deployment separately; no upload is authorized by this review.
2. For manual Netlify deployment, use the existing portfolio site's Deploys area and upload `Portfolio-Netlify.zip`. Its root is the publish directory: index.html, assets, crawl files, `_headers` and `_redirects`, without a client/dist wrapper. For a future authorized Git deployment, use build `npm run build` and publish `client/dist`; do not reuse a preview-context artifact for production.
3. After deployment run `npm.cmd run seo:check -- --url https://prashantkumbhar.netlify.app/` against the matching local build. Check real Netlify redirects, headers, missing paths, resources and rendered mobile/desktop behavior. The local server does not prove edge-platform behavior.
4. Open Search Console and add/select URL-prefix property `https://prashantkumbhar.netlify.app/`. Keep the existing verification tag if it matches the owner account; otherwise use the exact account-provided token, rebuild and deploy only with approval. Do not invent a token or use a Domain property for netlify.app.
5. Submit `sitemap.xml` in Sitemaps. Inspect the homepage using URL Inspection, run Test Live URL, check declared/selected canonical and request indexing if appropriate. Use Google Rich Results Test and Schema Markup Validator.
6. Monitor Page indexing and Search performance over time. Google indexing, ownership, rankings, impressions, clicks and field CWV have not been verified. See `GOOGLE_SEARCH_CONSOLE_SETUP.md` for troubleshooting.
