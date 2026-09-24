# tannerwj.com

Personal site of Tanner Johnson — systems architect & vibe coder.

## Stack

**Astro 5**, static output, deployed to **Cloudflare Pages**.
No CMS, no database — content lives in typed data files.

## Adding a project

Edit `src/data/projects.ts` and append one entry:

```ts
{
  name: "My Thing",
  url: "https://mything.tannerwj.com",
  description: "One or two sentences.",
  category: "app", // app | tool | game | experiment | site | client | oss
  tags: ["AI", "Fun"],
  featured: true, // shows in the home-page bento (keep to ~4)
  status: "live", // live | active | archived
  cover: "/covers/my-thing.webp", // optional, shown on card hover
},
```

That's it — home, `/projects`, filters, sitemap, and `llms.txt` derive from this file.

Referral links live in `src/data/links.ts` (powers `/uses` and `/links`).

## Branches & deploys

- `master` → production (apex, served by the `tannerwj-com` worker)
- `redesign` → staging Pages project `tannerwj-beta` → `beta.tannerwj.com`
  (auto-deploys on push; build command `npm run build`, output `dist`)

## Local dev

```bash
npm install
npm run dev    # http://localhost:4321
npm run build  # outputs to dist/
```
