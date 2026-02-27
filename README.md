# tannerwj.com

Personal website. Static site deployed to Cloudflare Pages.

## Structure

- `public/` - Static files (HTML, CSS, JS, images)
- `src/index.js` - Worker script for routing
- `wrangler.toml` - Cloudflare config

## Deploy

```bash
npx wrangler pages deploy public --project-name=tannerwj-com
```

## Stack

- Cloudflare Pages
- Vanilla HTML/CSS/JS

MIT License
