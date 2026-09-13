const fs = require('fs');
const path = require('path');

// Di Vercel serverless, direktori root read-only, hanya /tmp yang bisa ditulis
const isVercel = Boolean(process.env.VERCEL);
const DATA_DIR = isVercel ? '/tmp' : path.join(__dirname, '..', 'data');
const WISHES_FILE = path.join(DATA_DIR, 'wishes.json');

let memoryWishes = null;

function getWishes() {
  if (memoryWishes) return memoryWishes;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(WISHES_FILE)) {
      // Jika di Vercel, coba salin data awal dari data/wishes.json
      const seedPath = path.join(__dirname, '..', 'data', 'wishes.json');
      if (fs.existsSync(seedPath)) {
        try {
          const seedData = fs.readFileSync(seedPath, 'utf8');
          fs.writeFileSync(WISHES_FILE, seedData, 'utf8');
          memoryWishes = JSON.parse(seedData || '[]');
          return memoryWishes;
        } catch (e) {}
      }
      fs.writeFileSync(WISHES_FILE, '[]', 'utf8');
      memoryWishes = [];
      return [];
    }
    const data = fs.readFileSync(WISHES_FILE, 'utf8');
    memoryWishes = JSON.parse(data || '[]');
    return memoryWishes;
  } catch (err) {
    console.error('Error reading wishes:', err);
    return memoryWishes || [];
  }
}

function saveWishes(wishes) {
  memoryWishes = wishes;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(WISHES_FILE, JSON.stringify(wishes, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving wishes:', err);
    return false;
  }
}

function sendJson(res, statusCode, data) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (typeof res.status === 'function') {
    res.status(statusCode);
    if (typeof res.json === 'function') {
      res.json(data);
      return;
    }
  } else if (typeof res.writeHead === 'function') {
    res.writeHead(statusCode);
  }
  res.end(JSON.stringify(data));
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') res.status(204).end();
    else { res.writeHead(204); res.end(); }
    return;
  }

  if (req.method === 'GET') {
    const wishes = getWishes();
    sendJson(res, 200, wishes);
    return;
  }

  if (req.method === 'POST') {
    let body = req.body;
    if (!body || typeof body !== 'object') {
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { body = {}; }
      } else {
        body = await new Promise((resolve) => {
          let str = '';
          req.on('data', chunk => {
            str += chunk;
            if (str.length > 1e5) req.connection.destroy();
          });
          req.on('end', () => {
            try { resolve(JSON.parse(str)); } catch (e) { resolve({}); }
          });
        });
      }
    }

    const name = (body.name || '').trim().slice(0, 100);
    const attendance = (body.attendance || 'Hadir').trim().slice(0, 50);
    const message = (body.message || '').trim().slice(0, 1000);

    if (!name || !message) {
      sendJson(res, 400, { error: 'Nama dan ucapan wajib diisi.' });
      return;
    }

    const newWish = {
      id: 'w_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      name,
      attendance,
      message,
      time: Date.now()
    };

    const wishes = getWishes();
    wishes.push(newWish);
    saveWishes(wishes);

    sendJson(res, 201, { success: true, wish: newWish, count: wishes.length });
    return;
  }

  sendJson(res, 405, { error: 'Method Not Allowed' });
};
