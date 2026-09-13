const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const targetDirs = [
  path.join(rootDir, 'public'),
  path.join(rootDir, 'dist')
];

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    const parent = path.dirname(dest);
    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

for (const outDir of targetDirs) {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Copy index.html
  const indexPath = path.join(rootDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    copyRecursive(indexPath, path.join(outDir, 'index.html'));
  }

  // Copy css, js, assets
  for (const folder of ['css', 'js', 'assets']) {
    const folderPath = path.join(rootDir, folder);
    if (fs.existsSync(folderPath)) {
      copyRecursive(folderPath, path.join(outDir, folder));
    }
  }
}

console.log('Build completed successfully. Static assets copied to public/ and dist/.');
