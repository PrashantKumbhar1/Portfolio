# Google Search Console setup

Production property: `https://prashantkumbhar.netlify.app/`. Complete these steps after reviewing and deploying the SEO build. No indexing or ownership verification has been performed by this implementation.

1. Sign into [Search Console](https://search.google.com/search-console) using the Google account that should own the portfolio property. Select Add property -> URL prefix -> enter the exact HTTPS URL above. A Domain property requires control of DNS; do not attempt to verify `netlify.app`, which you do not own.
2. Choose HTML tag verification. The repository already contains a `google-site-verification` tag, preserved unchanged. If Search Console offers the same token for your account, deploy and verify. If it offers a different token, replace only the existing token in `client/index.html`, rebuild/deploy and confirm View Page Source includes that tag inside head, then click Verify. Do not add a second conflicting tag or delete the working token speculatively. If this property is already verified, keep the verification method and skip re-registration.
3. After deployment, open `https://prashantkumbhar.netlify.app/robots.txt` and `/sitemap.xml`. They must return text/plain and XML respectively, not the homepage. Confirm the sitemap lists only `https://prashantkumbhar.netlify.app/`.
4. In Search Console -> Sitemaps, submit `sitemap.xml`. Confirm processing status. A sitemap is a discovery hint, not a guarantee of crawling or indexing.
5. Paste the homepage URL into URL Inspection. Review indexed status, last crawl, Google-selected canonical versus the declared homepage canonical, crawl allowance and any page-fetch errors. Use Test Live URL to check the deployed version; inspect rendered HTML/screenshot when offered. Then use Request indexing if available and appropriate. You need not submit section fragments or modal project views separately.
6. Use [Rich Results Test](https://search.google.com/test/rich-results) and [Schema Markup Validator](https://validator.schema.org/) on the deployed URL or paste generated JSON-LD. Inspect Person/ProfilePage relationships and factual fields. A valid vocabulary graph does not guarantee a supported rich-result appearance. Do not add invented dates or attributes just to suppress optional warnings.
7. Review Page indexing for exclusion reasons and crawl failures. A newly deployed page can take time to be processed. "Discovered" and "Crawled - currently not indexed" do not mean you should repeatedly submit or create duplicate pages. Check content availability, canonical, robots/noindex and server response before using validation tools.
8. In Performance -> Search results, review queries, pages, countries/devices, clicks, impressions, CTR and average position over a useful date range. Filter personal-name and relevant cybersecurity/DFIR queries. Compare like-for-like periods after enough data accumulates. Distinguish namesakes; do not infer rank or volume from one manual search.
9. Review Core Web Vitals if sufficient field data exists. "Not enough data" is a reporting limitation, not a passed test. Use PageSpeed Insights/Lighthouse separately for lab diagnostics. Monitor mobile and desktop and retest actual interactions, especially the project slider and contact form.

## Troubleshooting

- Verification fails: check exact property URL/account, deployed raw head token, caching, HTTP status and redirects. Do not expose private credentials in the repository.
- Homepage noindex: ensure the production Netlify build context is `production`, not a deploy preview; inspect both robots meta and X-Robots-Tag. Do not reuse a preview artifact for production.
- Wrong canonical: update the single URL source in `script/seo-config.mjs` only if the real preferred production hostname changes; rebuild and review redirects. Do not point production metadata to localhost.
- Missing resources: run `npm run seo:check` on the built output and the optional HTTP mode after deployment. Check Netlify publish directory is `client/dist` and build command is `npm run build`.
- Unknown paths return 200: confirm the deployed `_redirects` file is from this build and remove dashboard/legacy rules that supersede it. Preserve the homepage and real assets.
- Old social preview: confirm image is accessible and metadata points to the absolute production image; platform caches may require their official debugger/rescrape. Google indexing and social caching are separate systems.
- Security/manual-action warnings: investigate the relevant Search Console report before requesting review; do not assume technical metadata fixes resolve them.

Official guidance: [Start with Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start), [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).
