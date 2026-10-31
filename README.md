# Havila Resort website

A static site with no backend. Enquiries go out through WhatsApp or email.

```bash
npm install
npm run build
```

The finished site lands in `dist/`. Facts, prices and contact details all live in `src/data.mjs`.

## Share a preview

Go to https://app.netlify.com/drop and drag the `dist` folder onto the page. It gives you a link to send.

Preview builds show a "concept website" note in the footer and are hidden from search engines.

## Go live, after the owner approves

```bash
PUBLIC=1 SITE_URL=https://havilaresort.com npm run build
```

This removes the concept note and allows search engines. Work through `OWNER-NOTES.md` first.
