"""Compare every ZIP entry with the publish directory; no upload is performed."""
from pathlib import Path
from hashlib import sha256
import zipfile

root = Path('client/dist')
archive = Path('Portfolio-Netlify.zip')
expected = {p.relative_to(root).as_posix(): p for p in root.rglob('*') if p.is_file()}
required = {'index.html', '404.html', 'robots.txt', 'sitemap.xml', '_headers', '_redirects'}
assert required <= expected.keys(), 'Missing generated publish files'
with zipfile.ZipFile(archive) as zipped:
    names = [entry.filename for entry in zipped.infolist() if not entry.is_dir()]
    assert len(names) == len(set(names)), 'Duplicate archive entries'
    assert set(names) == set(expected), 'ZIP file list differs from current publish output'
    assert zipped.testzip() is None, 'ZIP CRC failure'
    for name in names:
        assert not name.startswith(('/', '../', 'client/', 'node_modules/', '.git/')), name
        assert sha256(zipped.read(name)).digest() == sha256(expected[name].read_bytes()).digest(), f'Stale ZIP file: {name}'
print(f'PASS: all {len(expected)} ZIP files match client/dist byte-for-byte; correct publish root and required files.')
print('ZIP SHA-256:', sha256(archive.read_bytes()).hexdigest())
