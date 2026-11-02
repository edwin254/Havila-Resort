import { contact, photos } from './data.mjs';

export const nav = [
  ['/stay/', 'Stay'], ['/adventures/', 'Adventures'], ['/camping/', 'Camping'], ['/barizi/', 'Eat at Barizi'],
  ['/events/', 'Events'], ['/rates/', 'Rates'], ['/visit/', 'Visit'],
];

// Responsive photo. Stock images carry a visible tag until the resort supplies its own.
export function photo(name, { sizes = '100vw', cls = '', eager = false, alt } = {}) {
  const m = globalThis.PHOTO_MANIFEST[name];
  const meta = photos[name];
  if (!m || !meta) throw new Error(`Unknown photo ${name}`);
  const largest = m.widths[m.widths.length - 1];
  const srcset = m.widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(', ');
  const img = `<img src="/img/${name}-${largest}.webp" srcset="${srcset}" sizes="${sizes}" width="${largest}" height="${Math.round(largest * m.ratio)}" alt="${alt ?? meta.alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  const tag = meta.sample ? '<span class="sample-tag">Sample photo</span>' : '';
  return `<figure class="pic ${cls}">${img}${tag}</figure>`;
}

export const waFree = (text) => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;

const logo = `<a class="brand" href="/" aria-label="Havila Resort, home">Havila</a>`;

export function layout(page, site) {
  const preview = process.env.PUBLIC !== '1';
  const canonical = `${site}${page.path === '/' ? '/' : `${page.path}/`}`;
  const ld = {
    '@context': 'https://schema.org', '@type': 'Resort', name: 'Havila Resort', slogan: 'The Gift of Serenity', url: site,
    telephone: contact.phone, email: contact.email, image: `${site}/og.jpg`,
    address: { '@type': 'PostalAddress', streetAddress: 'Right off A2 Road, Rukanga, Riandira', addressLocality: 'Sagana', addressRegion: 'Kirinyaga', addressCountry: 'KE' },
    checkinTime: '15:00', checkoutTime: '10:00', petsAllowed: false, sameAs: [contact.facebook],
  };
  const links = nav.map(([href, label]) => `<a href="${href}"${page.path + '/' === href ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<!doctype html>
<html lang="en-KE">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${page.title}</title>
<meta name="description" content="${page.desc}">
<link rel="canonical" href="${canonical}">
${preview ? '<meta name="robots" content="noindex,nofollow">' : ''}
<meta name="theme-color" content="#0D1312">
<meta property="og:type" content="website"><meta property="og:title" content="${page.title}"><meta property="og:description" content="${page.desc}"><meta property="og:image" content="${site}/og.jpg"><meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/anton-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/figtree-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<script>if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')</script>
<link rel="stylesheet" href="/css/site.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body class="${page.bodyClass || ''}">
<a class="skip" href="#main">Skip to content</a>
<header class="top">
  ${logo}
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
  <nav id="site-nav" class="site-nav" aria-label="Main">${links}<a class="btn btn-small nav-cta" href="/plan/">Plan your stay <span data-tray-count></span></a></nav>
</header>
<main id="main">
${page.body}
</main>
<footer class="foot">
    <div class="foot-inner">
    <div class="foot-sign">
      <p class="foot-word">Havila</p>
      <p class="foot-line">The Gift of Serenity. On the River Tana, Sagana.</p>
      <a class="btn" href="/plan/">Plan your stay</a>
    </div>
    <div>
      <h2>Talk to us</h2>
      <ul>
        <li><a href="tel:${contact.phone}">${contact.phoneDisplay}</a></li>
        <li><a href="${waFree('Hello Havila Resort, I have a question.')}" rel="noopener">WhatsApp us</a></li>
        <li><a href="mailto:${contact.email}">${contact.email}</a></li>
        <li><a href="${contact.facebook}" rel="noopener">Facebook</a></li>
      </ul>
    </div>
    <div>
      <h2>Find us</h2>
      <address>${contact.address}</address>
      <p><a href="${contact.maps}" rel="noopener">Open in Google Maps</a></p>
    </div>
    <div>
      <h2>Explore</h2>
      <ul>${nav.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}<li><a href="/credits/">Photo credits</a></li></ul>
    </div>
  </div>
  ${preview ? '<p class="concept">Concept website prepared for the owner of Havila Resort. Not yet the official site, and prices need confirming.</p>' : ''}
</footer>
<nav class="dock" aria-label="Quick actions">
  <button type="button" class="dock-menu" aria-controls="site-nav">Menu</button>
  <a class="dock-wa" href="${waFree('Hello Havila Resort, I would like to ask about a visit.')}" rel="noopener">WhatsApp</a>
  <a class="dock-plan" href="/plan/">Plan <span data-tray-count></span></a>
</nav>
<script src="/js/vendor/gsap.min.js" defer></script>
<script src="/js/vendor/ScrollTrigger.min.js" defer></script>
<script src="/js/vendor/lenis.min.js" defer></script>
<script src="/js/site.js" defer></script>
${page.scripts || ''}
</body>
</html>`;
}
