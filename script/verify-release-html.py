"""Inspect a real initial HTTP response without executing client JavaScript."""
import json
from html.parser import HTMLParser
from urllib.request import urlopen
from xml.etree import ElementTree
from pathlib import Path

BASE = 'http://127.0.0.1:5174'

class InitialHTML(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_body = False
        self.in_h1 = False
        self.body = []
        self.h1 = []
        self.meta = []
        self.canonical = []
        self.in_schema = False
        self.schema = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'body': self.in_body = True
        if tag == 'h1': self.in_h1 = True
        if tag == 'br' and self.in_h1: self.h1.append(' ')
        if tag == 'meta': self.meta.append(attrs)
        if tag == 'link' and attrs.get('rel') == 'canonical': self.canonical.append(attrs.get('href'))
        if tag == 'script' and attrs.get('type') == 'application/ld+json': self.in_schema = True

    def handle_endtag(self, tag):
        if tag == 'body': self.in_body = False
        if tag == 'h1': self.in_h1 = False
        if tag == 'script': self.in_schema = False

    def handle_data(self, data):
        if self.in_body: self.body.append(data)
        if self.in_h1: self.h1.append(data)
        if self.in_schema: self.schema.append(data)

with urlopen(BASE + '/') as response:
    assert response.status == 200
    raw = response.read().decode('utf-8')
parsed = InitialHTML()
parsed.feed(raw)
body = ' '.join(parsed.body)
for text in ['Prashant', 'Kumbhar', 'I work at the intersection', 'ThreatCore', 'NETRA', 'QR Security Engine', 'Phishing', 'CivicLens', 'Pillai', 'Bluestock', 'kumbharprashant494@gmail.com']:
    assert text.lower() in body.lower(), f'Missing raw body content: {text}'
assert 'Prashant Kumbhar' in ''.join(parsed.h1)
assert parsed.canonical == ['https://prashantkumbhar.netlify.app/']
for name in ['description', 'robots']:
    assert len([m for m in parsed.meta if m.get('name') == name]) == 1
schema = json.loads(''.join(parsed.schema))
assert {n['@type'] for n in schema['@graph']} == {'Person', 'ProfilePage', 'WebSite'}
with urlopen(BASE + '/sitemap.xml') as response:
    tree = ElementTree.fromstring(response.read())
assert [n.text for n in tree.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')] == parsed.canonical
evidence = {'url': BASE, 'response_bytes': len(raw.encode('utf-8')), 'canonical': parsed.canonical[0], 'schema_types': [n['@type'] for n in schema['@graph']], 'raw_body_content': 'PASS', 'browser_hydration': 'NOT EXECUTED'}
Path('.local').mkdir(exist_ok=True)
Path('.local/seo-release-initial-html.json').write_text(json.dumps(evidence, indent=2), encoding='utf-8')
print('PASS: parsed initial HTTP body, H1, introduction, five project summaries, contact, metadata, JSON-LD and XML without executing JavaScript.')
