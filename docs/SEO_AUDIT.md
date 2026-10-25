# SEO audit -> Prashant Kumbhar

Audit date: 25 October 2026. Baseline captured before application changes. Scope: tracked source, active Vite build, assets, routes and Netlify configuration. Public-site fetches were initially blocked by the network sandbox/web tool; an authorized read-only network retry captured the live responses. No Search Console access or field-performance data is available.

## Initial findings

| Severity | Confirmed evidence | Root cause / action |
| --- | --- | --- |
| High | `client/index.html` contains an empty root; no name, projects or contact in the initial body. | Client-only React rendering. Add build-time rendering of the actual homepage and hydration, without a framework change. This is rendering dependence, not proof Google cannot index it. |
| High | Netlify `/* -> /index.html 200` applies to nonexistent paths. | Soft-404 risk. Only `/` is real; return a static 404 for unknown URLs. |
| High | No canonical link, robots.txt or sitemap.xml in source. | Incomplete crawl/canonical foundation. Generate one canonical homepage URL; no fragment sitemap entries. |
| Medium | No JSON-LD. | Add a factual Person, ProfilePage and WebSite graph using existing profile links; no invented jobs or credentials. |
| Medium | Full portrait is 5,354,380 bytes at 1728 x 1931, rendered much smaller. | Add uncropped responsive WebP alternatives, preserve original. No LCP time measured. |
| Medium | Legacy Replit meta-image plugin can replace production social URLs from environment. | Replace with one production metadata source; preserve verification token and branded social image. |
| Medium | No explicit asset-cache or basic security-header policy in Netlify config. | Revalidate HTML, immutable fingerprinted assets, compatible conservative headers. Do not introduce an untested restrictive CSP. |
| Medium | Case studies, map and command search are eagerly imported although initially closed. | Split optional dialogs and preserve interactive loading/error recovery. |
| Low | Project buttons repeat a generic label; a skills acronym and compact identity do not fully expand DFIR/VAPT. | Improve accessible names and factual descriptive copy without redesign or keyword stuffing. |
| Low | No repeatable SEO build check or Search Console instructions. | Add meaningful production-output, routing and metadata checks and maintenance documentation. |

## Existing strengths retained

English language, viewport allowing zoom, one homepage H1, semantic sections, skip link, working original Resume asset, verified-in-repository GitHub and LinkedIn URLs, labeled contact fields, reduced-motion rules, touch controls, mobile project carousel, explicit image dimensions, high-priority non-lazy portrait, branded 1200 x 630 JPEG share image, and existing Google verification token. The token is preserved, not asserted verified.

## Keyword and content assessment

Candidate intent: personal-name queries establish identity; name + cybersecurity / digital forensics distinguishes this student portfolio from namesakes. A web search for `"Prashant Kumbhar" cybersecurity portfolio` on the audit date surfaced namesakes and unrelated profiles. This is a limited search sample, not a Google ranking report or search-volume study. No keyword-volume, competition or Search Console metrics are available.

Primary mapping: homepage title, description, visible identity copy and Person entity -> Prashant Kumbhar, Cybersecurity, Digital Forensics. Secondary mapping: project summaries and technologies -> AI threat detection, DFIR workflows, QRishing/phishing detection, secure application development. Skills -> vulnerability assessment and penetration testing, network security, OSINT, incident response learning. Preserve student/aspirant context; do not assert employment as an engineer. Broad `cybersecurity portfolio` is descriptive context, not a promised ranking target. No meta-keywords, location pages or artificial routes.

AquaGuard is absent from the active five project records; it will not be invented. Modal case studies do not justify a sitemap URL each. Only the real homepage will be indexable.

## Verification limits

Live deployment headers, redirects and indexing are not inferred from local configuration. Browser tests, console errors, phone gestures, Lighthouse, contrast measurements, field CWV and inbox delivery require actual tools or manual checks. Successful compilation is not proof of those outcomes. External validators and Search Console submission are manual follow-up items. No production publishing or remote push is authorized for this pass.

## Confirmed live baseline

A direct public HTTP read on 25 October 2026 returned the same 2,270-byte HTML for `/`, `/robots.txt`, `/sitemap.xml` and `/seo-audit-missing-page`. All returned HTTP 200 with text/html. This confirms the missing crawl resources and soft-404 behavior on the then-current production version. The homepage source had no canonical or JSON-LD and an empty root. Live HTML already revalidated (`public,max-age=0,must-revalidate`) and Netlify supplied HSTS. No explicit nosniff or Referrer-Policy appeared in those baseline responses. Raw responses are retained locally in ignored `.local/seo-live-baseline.json`; they are not new deployed responses.

GitHub profile HEAD returned 200. LinkedIn refused HEAD with 405 and a normal read with 999, so its accessibility to automated checks is unverified, not a confirmed broken URL. Its exact repository-supplied profile URL is preserved.

## Implemented resolution

| Finding | Local implementation status |
| --- | --- |
| Empty initial body | Actual React homepage is build-time rendered and hydrated. All five project summaries, education, experience, selected skills and contact links are in raw HTML. Native rendering tests pass; browser hydration remains pending. |
| Soft 404 | Generated `_redirects` returns a static noindex 404 for unknown paths; homepage `/index.html` alias redirects to `/`. Local HTTP behavior passes. Not deployed yet. |
| Crawl foundation | Generated plain-text robots and a standard single-URL XML sitemap; absolute production canonical in one metadata source. XML parser and HTTP MIME checks pass. |
| Entity/social metadata | Factual Person + ProfilePage + WebSite graph and consistent production OG/X metadata. Branded share image and verification token retained. Local structure/JSON tests pass; external validator and account checks pending. |
| Portrait payload | Four uncropped responsive WebP alternatives and matching preload; original PNG retained. Full-size lossless pixels match the original RGB image exactly. No LCP timing is claimed. |
| Optional JS | Case study, map and command palette load as optional chunks. Initial entry file decreases from 272,015 to 263,925 bytes; no runtime responsiveness score is claimed. |
| Deployment policy | Shared generated Netlify routing/header files work for source builds and manual ZIP upload. Fingerprinted assets immutable; HTML revalidates. Preview contexts noindex. Actual edge behavior needs post-deployment testing. |
| Semantic/accessibility details | Clear factual student/DFIR copy, expanded assessment term, project-specific button names and focusable skip destination. Theme, layout, carousel and effects preserved. Full contrast/assistive-tech/browser validation not completed. |
| Repeatable checks and documentation | `seo:check`, `seo:preview`, build-integrated regression checks, four requested documents and README instructions added. |

## Final validation record

- PASS: TypeScript (`npm run check`).
- PASS: existing portfolio/content, all case-study views and skill states, form validation, EmailJS failure/retry/timeout mocks (`npm run test:portfolio`). These are render/logic tests, not browser clicks or real email delivery.
- PASS: Vite production build, TypeScript-based prerender and automatic SEO checks.
- PASS: one title/description/canonical, production social URLs, preserved verification tag, one H1, raw portfolio content, valid anchors, image alt/dimensions, JSON-LD syntax/entity relationships, real local asset references and lazy chunk presence. Invalid canonical/schema fixtures are correctly rejected.
- PASS: exact single-URL sitemap and independent standard-library XML parsing, robots content, generated noindex error document and routing/header declarations.
- PASS: local HTTP homepage 200, robots text/plain, sitemap XML, unknown URL 404, `/index.html` 301, critical assets/downloads and nosniff using the generated-rule QA server. This is not an assertion about an unperformed Netlify deployment.
- PASS: Pillow decoding, 1200 x 630 social dimensions, uncropped aspect ratios and full-size lossless WebP equality with the original RGB portrait.
- PASS: whitespace/error checks and production ZIP integrity.
- NOT RUN: Lighthouse mobile/desktop, browser console/hydration, actual swipe/keyboard/rendered desktop-mobile regressions, rendered contrast audit, field CWV, Google external validators, Search Console verification/submission, inbox email test and live post-deployment checks. Computer Use ended before browser access because it could not confidently establish Chrome's current URL for policy enforcement. No workaround was attempted.

No critical indexing prohibition was established; high-priority rendering dependence and response/crawl problems were confirmed. No ranking, search-volume, rich-result, indexing or real-world performance outcome is promised. The remaining limitation is validation of the new build in an actual browser and on the authorized production deployment, followed by Search Console work in the owner's account.

## Release-verification follow-up - 25 October 2026

A review of the actual diff found that the prior documentation overstated changes to the hero introduction/DFIR overline; the source retained those elements. The implementation documentation is corrected rather than changing the design to match the old report. Loading feedback contained a literal question mark and now uses an ASCII ellipsis.

A broad immutable `/assets/*` header could cache missing-chunk error responses for a year. The generator now writes exact paths for existing assets, and the QA server distinguishes exact from wildcard matches. HTTP checks now cover all optional chunks, MIME types, caching, security headers, redirect termination, query/fragment paths, nested 404s and missing JS responses. These checks pass against the production-output QA server. The initial HTTP HTML is independently parsed without JavaScript and contains the expected body content, metadata, JSON-LD and sitemap.

TypeScript, portfolio logic/render tests, the production build, expanded SEO/HTTP checks and the new initial-response parser were executed successfully. All 20 files in the refreshed ZIP match the publish directory by SHA-256. See `SEO_RELEASE_CHECKLIST.md` for exact commands and artifact hash.

The full release gate remains PENDING: supported browser access was retried against a known localhost plan, but the in-app browser is unavailable and native Chrome was stopped by Computer Use's URL-policy check before navigation. No screenshots, hydration/console inspection, responsive visual regression, live interaction tests or Lighthouse metrics were obtained. Lighthouse is not installed locally. No alternate browser-control path was used to bypass the policy. External indexing/account access and real Netlify edge behavior remain manual post-approval tasks.
