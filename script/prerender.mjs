import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { site, structuredData } from './seo-config.mjs';

// Transpile a temporary Node module tree with the existing TypeScript package.
// No bundler ancestor-directory scans, browser install or extra dependency.
const temp = path.resolve('.local/seo');
const sources = ['script/prerender-entry.tsx', 'client/src/pages/Home.tsx', 'client/src/pages/not-found.tsx', ...(await fs.readdir('client/src/portfolio')).filter(file => /\.tsx?$/.test(file)).map(file => `client/src/portfolio/${file}`)];
for (const source of sources) {
  let code = ts.transpileModule(await fs.readFile(source, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  code = code.replace(/import\s+['"][^'"]+\.css['"];?/g, '')
    .replace(/(from\s+['"])(\.[^'"]+)(['"])/g, (_, start, url, end) => start + url + '.mjs' + end)
    .replace(/(import\(['"])(\.[^'"]+)(['"]\))/g, (_, start, url, end) => start + url + '.mjs' + end)
    .replaceAll('import.meta.env', '({})');
  const destination = path.join(temp, source.replace(/\.tsx?$/, '.mjs'));
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, code);
}
const outfile = path.join(temp, 'script/prerender-entry.mjs');
const { renderHome, render404, person } = await import(pathToFileURL(outfile));
const output = 'client/dist';
const template = await fs.readFile(`${output}/index.html`, 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('Prerender expects one empty root in the Vite template.');
const json = JSON.stringify(structuredData(person)).replaceAll('<', '\\u003c');
// React 19 may emit an automatic image preload; the head already has the
// responsive WebP preload, so avoid downloading the original PNG as well.
const markup = renderHome().replace(/<link\b[^>]*rel="preload"[^>]*\/>/g, '');
const home = template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`).replace('</head>', `    <script type="application/ld+json">${json}</script>\n  </head>`);
await fs.writeFile(`${output}/index.html`, home);
const notFound = template
  .replace(/<title>[^<]*<\/title>/, '<title>Page not found | Prashant Kumbhar</title>')
  .replace(/<link rel="canonical"[^>]*\/>\s*/g, '')
  .replace(/<meta name="robots"[^>]*\/>/, '<meta name="robots" content="noindex, follow" />')
  .replace(/<link rel="preload"[^>]*\/>\s*/g, '')
  .replace('<div id="root"></div>', `<div id="root" data-page="404">${render404()}</div>`);
await fs.writeFile(`${output}/404.html`, notFound);
await fs.writeFile(`${output}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${site.url}sitemap.xml\n`);
await fs.writeFile(`${output}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site.url}</loc></url></urlset>\n`);
const preview = !!process.env.CONTEXT && process.env.CONTEXT !== 'production';
// These files make Git builds and manual ZIP deployments behave consistently.
await fs.writeFile(`${output}/_redirects`, '/index.html / 301!\n/* /404.html 404\n');
// Cache only actual fingerprinted files, so a missing chunk's 404 is not
// accidentally cached for a year by an /assets/* header rule.
const assetHeaders = (await fs.readdir(`${output}/assets`)).map(file => `/assets/${file}\n  Cache-Control: public, max-age=31536000, immutable\n`).join('');
await fs.writeFile(`${output}/_headers`, `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Cache-Control: public, max-age=0, must-revalidate\n${preview ? '  X-Robots-Tag: noindex, follow\n' : ''}${assetHeaders}`);
// Unreferenced legacy images add ~20 MB to every deployment, but remain in
// public source for historical components. They are not active page assets.
for (const file of ['hero-bg.png', 'pillai-college.jpg', 'portrait.jpg', 'opengraph.jpg', 'favicon.png']) await fs.rm(`${output}/${file}`, { force: true });
console.log('Prerendered homepage and 404; generated JSON-LD, robots, sitemap and Netlify rules.');
