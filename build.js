const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const outDir = path.join(rootDir, 'public');

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    const parent = path.dirname(dest);
    if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

// Bersihkan output lama
if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

// Salin file statis ke public/
copyRecursive(path.join(rootDir, 'index.html'), path.join(outDir, 'index.html'));
for (const folder of ['css', 'js', 'assets']) {
  const src = path.join(rootDir, folder);
  if (fs.existsSync(src)) copyRecursive(src, path.join(outDir, folder));
}

// Salin favicon
const faviconSrc = path.join(rootDir, 'favicon.svg');
if (fs.existsSync(faviconSrc)) fs.copyFileSync(faviconSrc, path.join(outDir, 'favicon.svg'));

console.log('Build selesai — file statis disalin ke public/');
