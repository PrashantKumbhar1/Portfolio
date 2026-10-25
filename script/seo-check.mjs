import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { site, seoHead } from './seo-config.mjs';

const dir = path.resolve('client/dist');
const read = file => fs.readFile(path.join(dir, file), 'utf8');
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'");
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key.toLowerCase(), decode(value)]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(match => attrs(match[0]));
const one = (items, label) => { assert.equal(items.length, 1, `Exactly one ${label}`); return items[0]; };
export function validateHome(html, { preview = false } = {}) {
  const meta = tags(html, 'meta');
  const get = key => one(meta.filter(m => m.name === key || m.property === key), key).content;
  assert.equal(one([...html.matchAll(/<title>([^<]+)<\/title>/g)], 'title')[1], site.title.replaceAll('&', '&amp;'));
  assert.equal(get('description'), site.description);
  assert.equal(one(tags(html, 'link').filter(l => l.rel === 'canonical'), 'canonical').href, site.url);
  assert.equal(get('og:url'), site.url);
  assert.equal(get('og:image'), site.image);
  assert.equal(get('twitter:image'), site.image);
  assert.equal(get('twitter:card'), 'summary_large_image');
  for (const key of ['og:title', 'twitter:title']) assert.equal(get(key), site.title);
  assert.equal(get('robots'), preview ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  assert.ok(get('viewport').includes('width=device-width'));
  assert.ok(!/user-scalable=no|maximum-scale=1/.test(get('viewport')));
  assert.ok(get('google-site-verification').length > 20);
  assert.ok(!meta.some(m => m.name === 'keywords'));
  assert.match(html, /<html lang="en">/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  for (const text of ['Prashant', 'Kumbhar', 'Digital Forensics', 'ThreatCore', 'NETRA', 'QR Security Engine', 'CivicLens', 'Pillai College', 'Bluestock', 'Send message']) assert.ok(html.toLowerCase().includes(text.toLowerCase()), `Initial HTML content: ${text}`);
  assert.ok(!/localhost|127\.0\.0\.1|<!--seo-head-->/.test(html));
  const ids = tags(html, '[a-z][a-z0-9-]*').map(t => t.id).filter(Boolean);
  assert.equal(ids.length, new Set(ids).size, 'Unique element IDs');
  for (const link of tags(html, 'a')) {
    assert.ok(link.href && link.href !== '#', 'No placeholder anchor');
    if (link.href.startsWith('#')) assert.ok(ids.includes(link.href.slice(1)), `Anchor ${link.href}`);
    if (link.target === '_blank') assert.match(link.rel, /noreferrer|noopener/);
  }
  for (const img of tags(html, 'img')) {
    assert.ok(img.alt?.trim(), `Image alt ${img.src}`);
    assert.ok(Number(img.width) > 0 && Number(img.height) > 0, 'Image dimensions');
  }
  const portrait = tags(html, 'img').find(i => i.src === '/profile.png');
  assert.ok(portrait && portrait.loading !== 'lazy' && portrait.fetchpriority === 'high');
  assert.ok(!tags(html, 'link').some(l => l.rel === 'preload' && l.href === '/profile.png'), 'No duplicate PNG preload');
  const sources = tags(html, 'source');
  assert.ok(sources.some(s => s.type === 'image/webp' && s.srcset.includes('profile-full.webp')));
  const schema = JSON.parse(one([...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)], 'JSON-LD')[1]);
  assert.equal(schema['@context'], 'https://schema.org');
  const graph = schema['@graph'];
  const person = one(graph.filter(n => n['@type'] === 'Person'), 'Person');
  const profile = one(graph.filter(n => n['@type'] === 'ProfilePage'), 'ProfilePage');
  one(graph.filter(n => n['@type'] === 'WebSite'), 'WebSite');
  assert.equal(person.name, 'Prashant Kumbhar');
  assert.equal(profile.mainEntity['@id'], person['@id']);
  assert.ok(!person.jobTitle && !person.worksFor && !person.alumniOf, 'No invented employment or graduation');
  for (const url of person.sameAs) assert.ok(tags(html, 'a').some(a => a.href === url), `Visible sameAs ${url}`);
  return schema;
}

const html = await read('index.html');
const preview = !!process.env.CONTEXT && process.env.CONTEXT !== 'production';
validateHome(html, { preview });
// Regressions must actually be caught, rather than merely reporting success.
assert.throws(() => validateHome(html.replace('rel="canonical"', 'rel="alternate"'), { preview }));
assert.throws(() => validateHome(html.replace('"@context":"https://schema.org"', '"@context":"invalid"'), { preview }));
assert.match(seoHead({ preview: true }), /noindex, follow/);
console.log('PASS: metadata uniqueness, canonical, identity graph, headings, links, image accessibility and preview noindex.');

const robots = await read('robots.txt');
assert.match(robots, /^User-agent: \*\nAllow: \/\n/m);
assert.ok(!/^Disallow:\s*\//m.test(robots));
assert.ok(robots.includes(`Sitemap: ${site.url}sitemap.xml`));
const sitemap = await read('sitemap.xml');
assert.equal(sitemap, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site.url}</loc></url></urlset>\n`);
assert.ok(!sitemap.includes('<lastmod>'), 'No fabricated lastmod');
const missing = await read('404.html');
assert.match(missing, /name="robots" content="noindex, follow"/);
assert.ok(!missing.includes('rel="canonical"'));
assert.match(missing, /data-page="404"/);
const redirects = await read('_redirects');
assert.match(redirects, /^\/index.html \/ 301!/m);
assert.match(redirects, /^\/\* \/404.html 404/m);
assert.ok(!redirects.includes('/index.html 200'));
const headers = await read('_headers');
assert.match(headers, /X-Content-Type-Options: nosniff/);
assert.match(headers, /max-age=31536000, immutable/);
assert.match(headers, /max-age=0, must-revalidate/);
if (preview) assert.match(headers, /X-Robots-Tag: noindex/);
console.log('PASS: robots, exact single-URL XML sitemap, 404, canonical redirect, caching and security rules.');

const assetPaths = new Set();
for (const tag of [...tags(html, 'img'), ...tags(html, 'script'), ...tags(html, 'link'), ...tags(html, 'a')]) for (const value of [tag.src, tag.href]) if (value?.startsWith('/') && !value.startsWith('//')) assetPaths.add(value.split('#')[0]);
for (const tag of [...tags(html, 'source'), ...tags(html, 'link')]) for (const value of [tag.srcset, tag.imagesrcset]) if (value) for (const item of value.split(',')) assetPaths.add(item.trim().split(' ')[0]);
assetPaths.add('/social-preview.jpg');
assetPaths.add('/404.html');
for (const asset of assetPaths) assert.ok((await fs.stat(path.join(dir, asset))).isFile(), `Built asset ${asset}`);
const assets = await fs.readdir(`${dir}/assets`);
for (const name of ['CaseStudy-', 'CommandPalette-', 'InvestigationMap-']) assert.ok(assets.some(a => a.startsWith(name)), `Lazy chunk ${name}`);
console.log(`PASS: ${assetPaths.size} referenced production assets/downloads and three optional dialog chunks.`);

// Optional real HTTP verification. On localhost this requires the Netlify-rule
// preview command; Vite preview deliberately has its own SPA fallback behavior.
const index = process.argv.indexOf('--url');
if (index >= 0) {
  const base = new URL(process.argv[index + 1]);
  const request = async route => {
    const response = await fetch(new URL(route, base), { redirect: 'manual', signal: AbortSignal.timeout(15000) });
    return { response, body: await response.text() };
  };
  const home = await request('/'); assert.equal(home.response.status, 200); validateHome(home.body, { preview });
  for (const [route, type] of [['/robots.txt', 'text/plain'], ['/sitemap.xml', 'xml']]) { const { response, body } = await request(route); assert.equal(response.status, 200); assert.ok(response.headers.get('content-type')?.includes(type)); assert.ok(!body.includes('<!DOCTYPE html>')); }
  const absent = await request('/seo-check-missing-page'); assert.equal(absent.response.status, 404); assert.match(absent.body, /noindex, follow/);
  const alias = await request('/index.html'); assert.equal(alias.response.status, 301); assert.ok(alias.response.headers.get('location')?.endsWith('/'));
  const mime = { '.js': 'javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.html': 'text/html', '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };
  const httpAssets = new Set([...assetPaths, ...assets.map(file => `/assets/${file}`)]);
  for (const asset of httpAssets) {
    const { response } = await request(asset);
    assert.equal(response.status, 200, asset);
    assert.ok(response.headers.get('content-type')?.includes(mime[path.extname(asset)]), `MIME type ${asset}`);
    assert.match(response.headers.get('cache-control') || '', asset.startsWith('/assets/') ? /max-age=31536000, immutable/ : /max-age=0, must-revalidate/, `Cache policy ${asset}`);
  }
  for (const route of ['/?release-check=1', '/#work']) { const result = await request(route); assert.equal(result.response.status, 200); validateHome(result.body, { preview }); }
  for (const route of ['/missing/nested/', '/assets/missing-chunk.js']) { const result = await request(route); assert.equal(result.response.status, 404); assert.match(result.body, /noindex, follow/); assert.match(result.response.headers.get('cache-control') || '', /max-age=0, must-revalidate/, 'Missing routes must not be immutable'); }
  assert.equal((await request(alias.response.headers.get('location'))).response.status, 200, 'Canonical redirect terminates at homepage');
  assert.match(home.response.headers.get('cache-control') || '', /max-age=0, must-revalidate/);
  assert.equal(home.response.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  assert.equal(home.response.headers.get('x-frame-options'), 'DENY');
  assert.ok(!home.response.headers.has('x-robots-tag') || preview, 'Production HTTP must not noindex');
  assert.equal(home.response.headers.get('x-content-type-options'), 'nosniff');
  console.log(`PASS: HTTP homepage/query/fragment, crawl MIME, terminating redirect, nested/missing-chunk 404, ${httpAssets.size} asset MIME/cache checks and security headers at ${base.origin}.`);
}
const sizes = await Promise.all(assets.filter(a => /\.(js|css)$/.test(a)).map(async file => ({ file, bytes: (await fs.stat(`${dir}/assets/${file}`)).size })));
console.log('Build asset bytes:', JSON.stringify(sizes));
