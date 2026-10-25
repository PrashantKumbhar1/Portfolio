// Local QA server for generated Netlify routing semantics. Not a production
// backend and not a substitute for checking the actual Netlify deployment.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('client/dist');
const port = Number(process.env.PORT || 5174);
const types = { '.html': 'text/html; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };
const redirects = await fs.readFile(`${root}/_redirects`, 'utf8');
if (!redirects.includes('/* /404.html 404')) throw new Error('Run npm run build first.');
const headerText = await fs.readFile(`${root}/_headers`, 'utf8');
const rules = [];
for (const line of headerText.split('\n')) {
  if (line.startsWith('/')) rules.push({ route: line.trim(), headers: {} });
  else if (/^\s+[^:]+:/.test(line)) { const colon = line.indexOf(':'); rules.at(-1).headers[line.slice(0, colon).trim()] = line.slice(colon + 1).trim(); }
}
http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    for (const rule of rules) if (rule.route.endsWith('*') ? pathname.startsWith(rule.route.slice(0, -1)) : pathname === rule.route) for (const [name, value] of Object.entries(rule.headers)) response.setHeader(name, value);
    if (pathname === '/index.html') { response.writeHead(301, { Location: '/' }); response.end(); return; }
    let file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep)) { response.writeHead(403); response.end(); return; }
    let status = 200;
    try { if (!(await fs.stat(file)).isFile() || pathname.startsWith('/_')) throw new Error('missing'); }
    catch { file = `${root}/404.html`; status = 404; }
    const body = await fs.readFile(file);
    response.writeHead(status, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Content-Length': body.length });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch { response.writeHead(400); response.end('Bad request'); }
}).listen(port, '127.0.0.1', () => console.log(`SEO production preview: http://127.0.0.1:${port}/`));
