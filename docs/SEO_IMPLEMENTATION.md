# SEO implementation

Completed locally on 25 October 2026. No remote push, production deployment, DNS change, account modification or Search Console submission was performed.

## Architecture and rendering

The existing React 19 + TypeScript + Vite 7 stack, wouter homepage route, custom CSS, mobile carousel and EmailJS browser integration remain. Netlify still builds with `npm run build` and publishes `client/dist`. The Express/database code and historical UI components are not part of this static deployment.

Build pipeline: Vite compiles client assets -> `script/prerender.mjs` transpiles the actual homepage modules using the already installed TypeScript compiler -> React `renderToString` writes the homepage into `#root` -> the build writes 404/crawl/deployment files -> `script/seo-check.mjs` fails the build on SEO regressions. No browser installation, SSR server, paid service or framework migration is required. Temporary modules are ignored under `.local/seo`.

`main.tsx` hydrates existing production markup; an empty development root uses `createRoot`. A generated 404 has `data-page="404"` and hydrates the NotFound component even when opened directly. The initial HTML has the actual name, education, project summaries, technology lists, experience and contact links. Optional dialogs keep the same initial closed state, loaded through React.lazy/Suspense on demand. A visible loading status and the existing root error recovery handle delayed/failed chunks. A noscript notice preserves normal reading, Resume and profile/email links while hiding controls that require JavaScript. This is the same visible portfolio content, not a crawler-specific version.

Hydration and interaction execution still need a real browser regression pass. Computer Use inventory exposed Chrome, but its policy URL check refused access before the page could be tested. No browser or Lighthouse scores are claimed.

## Single metadata source

`script/seo-config.mjs` owns the fixed production URL, title, description, social metadata, image preload and entity graph. `vite-plugin-seo.ts` fills one head marker in `client/index.html`. Existing language, viewport, favicon, font stylesheet, and the original Google verification token are retained. The legacy Replit image plugin is no longer imported, preventing preview hosts from replacing the production share image. No localhost metadata, meta-keywords, artificial landing pages or duplicated head writers are introduced.

Canonical URL: https://prashantkumbhar.netlify.app/ . One ProfilePage describes the actual profile, connects to a Person and WebSite, and uses the exact GitHub/LinkedIn URLs from `person` data. The student affiliation is a CollegeOrUniversity; no `alumniOf`, employer, job title, certification, award, invented date or detection metric is asserted. JSON-LD syntax, required entity connections and visible social-link consistency are checked locally. External Google/Schema validators have not been submitted; vocabulary alignment does not guarantee a rich result.

## Crawl files and deployment

Generated `robots.txt` allows public resources and references the absolute sitemap. `sitemap.xml` contains exactly the homepage, without fragments, fabricated lastmod, modal URLs or error pages. `_redirects` redirects `/index.html` to `/` and returns `/404.html` with status 404 for missing paths; real static assets shadow the fallback normally on Netlify. This replaces the soft-404 SPA rule, justified because only `/` is a real route. Fragment navigation and refresh stay on `/`.

Generated `_headers` applies nosniff, strict-origin-when-cross-origin referrer policy and DENY framing. HTML/crawl resources revalidate; each existing fingerprinted asset receives one-year immutable caching via an exact generated path. Missing chunks retain revalidation rather than inheriting an immutable wildcard policy. The live baseline already had Netlify HSTS, so it is not overridden. No untested restrictive CSP is installed: inline React styles, generated JSON-LD, Google Fonts and EmailJS must remain compatible. A CSP needs browser/network testing before enforcement. Normal external profile links remain noreferrer protected.

Netlify sets `CONTEXT`; nonproduction contexts receive a noindex robots meta tag and X-Robots-Tag header while retaining the production canonical. Local production builds are indexable by default. These controls discourage indexing; they do not make previews private. Manual ZIP deployments do not have a build context and are intended for the existing production site, not staging.

`seo:preview` is a localhost QA server that follows the generated redirect/header conventions. It verifies expected behavior without pretending to run Netlify's edge platform. The actual deployment still needs post-release checks.

## Performance and design preservation

The original portrait PNG is untouched. New 480px, 960px and 1440px WebP variants keep the full aspect ratio and use quality 95; full-size WebP is lossless at the original 1728 x 1931 dimensions. A picture element chooses a suitable size and falls back to the original. A matching responsive preload avoids downloading the PNG unnecessarily. Explicit dimensions, high fetch priority and non-lazy loading remain. CSS extends the same original portrait presentation to the picture wrapper, including no crop/filter. The college logo remains lazy with explicit dimensions. Existing fonts already use display=swap and preconnect; no typeface or animation redesign is introduced.

Original PNG: 5,354,380 bytes. Alternatives: 480px WebP 45,374 bytes; 960px WebP 213,932 bytes; 1440px WebP 482,570 bytes; native full WebP 3,164,458 bytes. These are file sizes, not measured network transfer or LCP. Device DPR, selected source and compression determine actual transfer. Full lossless RGB pixels are checked against the original.

Initial JS baseline: 272,015 bytes. After optional dialog splitting: approximately 263,925 bytes, plus three on-demand dialog chunks (see final build output for exact filenames/sizes). This is a modest reduction in initial code, not an INP measurement. Shared modules may still be in the entry chunk. Unused legacy images are omitted from production copying after build, but remain in public source for historical components. They were not requested by the active page; removal reduces deployment size rather than claimed page-transfer savings. No dependency installation was required; unused historical dependencies were not broadly removed because they support retained source/server code and are tree-shaken from the active page.

## Content and accessibility

The existing visible introduction, cybersecurity/DFIR overline, and academic summary retain the student identity and digital-investigation direction. The assessment description now expands vulnerability assessment and penetration testing. Editorial headings, layout, colors, typography, mobile-only carousel and model interactions remain. Each case-study button has its project's accessible name, each article has a stable fragment ID, and the skip target can receive focus. Existing form labels, validation, email fallback, dialog focus restoration, keyboard controls and reduced-motion behavior are retained. No certificates, AquaGuard project, project-specific repositories or production outcomes were invented.

## Files

- `client/index.html`, `vite-plugin-seo.ts`, `script/seo-config.mjs`, `script/seo-config.d.mts`: metadata architecture.
- `script/prerender-entry.tsx`, `script/prerender.mjs`, `client/src/main.tsx`: rendering and hydration.
- `client/src/pages/Home.tsx`, `pages/not-found.tsx`, `portfolio/ProjectShowcase.tsx`, `portfolio/SkillExplorer.tsx`, `portfolio/project-refinements.css`: factual copy, image presentation, accessible labels and optional-dialog splitting.
- `client/public/profile-{480,960,1440,full}.webp`: responsive portrait files; original PNG retained.
- `netlify.toml`: retain build/publish settings, remove old SPA fallback; generated Netlify files are shared by Git builds and manual upload ZIPs.
- `script/seo-check.mjs`, `script/preview-seo.mjs`, `package.json`: repeatable checks and QA preview.
- `docs/SEO_*.md`, `docs/GOOGLE_SEARCH_CONSOLE_SETUP.md`, `README.md`: audit, results and maintenance.

## Validation

Run `npm run check`, `npm run test:portfolio`, `npm run build`, then `npm run seo:preview` and `npm run seo:check -- --url http://127.0.0.1:5174`. Windows may require `npm.cmd`. Production checks cover title/description/canonical uniqueness, social URLs, robots rules, exact sitemap output, JSON-LD syntax/entities, one H1, initial content, anchor targets, image alt/dimensions, local asset existence, optional chunks, 404 metadata, redirect rules and cache/security declarations. Deliberately corrupted canonical and JSON-LD fixtures are rejected, proving the checks detect regressions. Existing contact tests use simulated delivery; no live email is sent by them.

HTTP checks verify homepage 200, real crawl MIME types, canonical redirect, missing URL 404, all critical assets and nosniff on the local QA server. Separate standard-library XML parsing and Pillow image decoding verify XML/image artifacts. Final command outcomes are recorded in the audit. No measured Lighthouse, LCP, INP, CLS, contrast score, Search Console status, inbox delivery or ranking improvement is asserted.

References: [React hydration](https://react.dev/reference/react-dom/client/hydrateRoot), [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [Google profile markup](https://developers.google.com/search/docs/appearance/structured-data/profile-page), [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Netlify redirect options](https://docs.netlify.com/manage/routing/redirects/redirect-options/).

## Release-verification follow-up

See `SEO_RELEASE_CHECKLIST.md` for the current gate. The review corrected the earlier copy-change description to match the actual source, replaced a question mark in loading feedback with an ellipsis, restricted immutable caching to real generated files, corrected exact-path matching in the local QA server, and expanded HTTP tests to every lazy chunk, MIME type, cache policy, redirect destination and nested/missing-asset error response. `verify-release-html.py` parses the initial HTTP body without JavaScript. `verify-release-artifact.py` compares every ZIP entry with current output using SHA-256 and checks the publish root.

The pre-follow-up ZIP matched the prior build. It became stale after the follow-up build, as correctly detected by the new comparison, and was regenerated. All 20 files now match the current publish output byte-for-byte. No production deployment occurred. Browser access was retried only through supported Computer Use interfaces after starting the known local URL; no policy bypass was attempted. The in-app browser was unavailable; native Chrome navigation was stopped by the URL-policy check. Browser hydration, console/visual checks and Lighthouse remain unverified, so the full release gate is not passed.
