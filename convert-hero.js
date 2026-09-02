const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

(async () => {
  const src = path.join(__dirname, 'hero-soma.png');
  const outWebp = path.join(__dirname, 'hero-soma.webp');
  const outAvif = path.join(__dirname, 'hero-soma.avif');
  const outJpg = path.join(__dirname, 'hero-soma.jpg');
  const outWebpMobile = path.join(__dirname, 'hero-soma-mobile.webp');
  const outJpgMobile = path.join(__dirname, 'hero-soma-mobile.jpg');

  await sharp(src).webp({ quality: 82, effort: 6 }).toFile(outWebp);
  await sharp(src).avif({ quality: 60, effort: 6 }).toFile(outAvif);
  await sharp(src).jpeg({ quality: 86, mozjpeg: true, progressive: true }).toFile(outJpg);
  await sharp(src).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toFile(outWebpMobile);
  await sharp(src).resize({ width: 1280, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(outJpgMobile);

  ['hero-soma.png','hero-soma.jpg','hero-soma.webp','hero-soma.avif','hero-soma-mobile.webp','hero-soma-mobile.jpg'].forEach(f => {
    const p = path.join(__dirname, f);
    if (fs.existsSync(p)) console.log(f.padEnd(28), Math.round(fs.statSync(p).size/1024)+'KB');
  });
})().catch(e => { console.error(e.message); process.exit(1); });
