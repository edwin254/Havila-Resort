// Static site build: optimises photos, copies assets, renders every page into dist/.
import { promises as fs, existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { photos, contact, rooms, meals, camping, ownTent, activities } from './src/data.mjs';
import { pages } from './src/pages/index.mjs';
import { layout } from './src/layout.mjs';

const dist = 'dist';
const SITE = process.env.SITE_URL || 'https://havilaresort.com';
const WIDTHS = [640, 1280, 1800];

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(`${dist}/img`, { recursive: true });
await fs.cp('public', dist, { recursive: true });

const fonts = [
  ['figtree', 'figtree-latin-400-normal'], ['figtree', 'figtree-latin-600-normal'], ['figtree', 'figtree-latin-800-normal'],
  ['anton', 'anton-latin-400-normal'],
];
await fs.mkdir(`${dist}/fonts`, { recursive: true });
for (const [pkg, file] of fonts) {
  await fs.copyFile(`node_modules/@fontsource/${pkg}/files/${file}.woff2`, `${dist}/fonts/${file}.woff2`);
}

const manifest = {};
for (const [name, meta] of Object.entries(photos)) {
  const src = path.join('src/photos-raw', meta.sample ? 'sample' : 'real', `${name}.jpg`);
  if (!existsSync(src)) throw new Error(`Missing photo: ${src}`);
  const info = await sharp(src, { limitInputPixels: false }).metadata();
  const usable = WIDTHS.filter((w) => w < info.width);
  if (!usable.length || info.width <= 1800) usable.push(Math.min(info.width, 1800));
  const widths = [...new Set(usable)];
  for (const w of widths) {
    await sharp(src, { limitInputPixels: false }).rotate().resize({ width: w }).webp({ quality: 72 }).toFile(`${dist}/img/${name}-${w}.webp`);
  }
  manifest[name] = { widths, ratio: info.height / info.width };
}
globalThis.PHOTO_MANIFEST = manifest;

const planner = { contact: { whatsapp: contact.whatsapp, email: contact.email }, rooms, meals, camping, ownTent, activities };
await fs.writeFile(`${dist}/js/data.js`, `window.HAVILA=${JSON.stringify(planner)};`);

for (const page of pages()) {
  const html = layout(page, SITE);
  const out = page.path === '/' ? 'index.html' : page.path === '/404' ? '404.html' : `${page.path.slice(1)}/index.html`;
  await fs.mkdir(path.dirname(`${dist}/${out}`), { recursive: true });
  await fs.writeFile(`${dist}/${out}`, html);
}

const urls = pages().filter((p) => p.path !== '/404').map((p) => `<url><loc>${SITE}${p.path === '/' ? '/' : `${p.path}/`}</loc></url>`).join('');
await fs.writeFile(`${dist}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
await fs.writeFile(`${dist}/robots.txt`, process.env.PUBLIC === '1' ? `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');

await sharp('src/photos-raw/real/lodge.jpg').resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 78 }).toFile(`${dist}/og.jpg`);
console.log(`Built ${pages().length} pages and ${Object.keys(manifest).length} photos into ${dist}/`);
