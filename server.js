/**
 * server.js — Server lokal untuk development.
 * Melayani file statis (index.html, css, js, assets) dan API /api/wishes.
 * Di Vercel: file statis disajikan dari public/ (output build),
 *            /api/wishes.js dijalankan sebagai Serverless Function.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.mp3':  'audio/mpeg',
  '.mpeg': 'audio/mpeg',
  '.m4a':  'audio/mp4',
  '.wav':  'audio/wav',
  '.ogg':  'audio/ogg',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
};

/** Cari file statis di public/, lalu fallback ke root. */
function resolveFile(pathname) {
  if (pathname === '/' || pathname === '') pathname = '/index.html';

  const safePath = path.normalize(pathname)
    .replace(/^(\.\.[\/\\])+/, '')
    .replace(/^[\/\\]+/, '');

  const candidates = [
    path.join(ROOT_DIR, safePath),
    path.join(ROOT_DIR, 'public', safePath),
  ];

  for (const candidate of candidates) {
    try {
      const stats = fs.statSync(candidate);
      if (stats.isFile()) return { filePath: candidate, stats };
    } catch (_) {}
  }

  return null;
}

function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(url.pathname);

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API buku tamu
  if (pathname.startsWith('/api/wishes')) {
    return require('./api/wishes')(req, res);
  }

  // File statis
  const found = resolveFile(pathname);
  if (!found) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }

  const { filePath, stats } = found;
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const total = stats.size;
  const range = req.headers.range;

  if (range) {
    const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
    const start = parseInt(startStr, 10);
    const end = endStr ? parseInt(endStr, 10) : total - 1;
    res.writeHead(206, {
      'Content-Range':  `bytes ${start}-${end}/${total}`,
      'Accept-Ranges':  'bytes',
      'Content-Length': end - start + 1,
      'Content-Type':   contentType,
    });
    fs.createReadStream(filePath, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': total,
      'Accept-Ranges':  'bytes',
      'Content-Type':   contentType,
      'Cache-Control':  'public, max-age=3600',
    });
    fs.createReadStream(filePath).pipe(res);
  }
}

const server = http.createServer(handler);
server.listen(PORT, () => {
  console.log(`Server lokal berjalan di http://localhost:${PORT}`);
});