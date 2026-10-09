import { describe, test } from 'e2e';
import { expect } from 'e2e';
import { BASE_URL } from './support/base-url';

// SEO / meta / discovery surface: titles, descriptions, canonical + OG tags,
// robots, sitemap, llms.txt, and the security headers from public/_headers.
// Node-platform tests: fetch the live site directly (the `api` target has no
// engine, so there is no `app.baseUrl` here).
const PAGES = [
  { path: '/', title: 'Tanner Johnson — Principal Engineer' },
  { path: '/projects', title: 'Projects — Tanner Johnson' },
  { path: '/now', title: 'Now — Tanner Johnson' },
  { path: '/about', title: 'About — Tanner Johnson' },
  { path: '/links', title: 'Links' },
];

describe('meta', { platforms: ['node'] }, () => {
  for (const { path, title } of PAGES) {
    test(`meta tags on ${path}`, async () => {
      const res = await fetch(new URL(path, BASE_URL));
      expect(res.status).toBe(200);
      const html = await res.text();
      expect(html).toContain(`<title>${title}</title>`);
      expect(html).toContain('name="description"');
      expect(html).toContain(`<link rel="canonical" href="https://tannerwj.com${path === '/' ? '/' : path}"`);
      expect(html).toContain('property="og:title"');
      expect(html).toContain('property="og:image"');
      expect(html).toContain('tannerwj.com/og.png');
    });
  }

  test('security headers are served', async () => {
    const res = await fetch(new URL('/', BASE_URL));
    expect(res.headers.get('x-frame-options')).toBe('DENY');
    expect(res.headers.get('x-content-type-options')).toBe('nosniff');
    expect(res.headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin');
  });

  test('robots.txt and sitemap cover every page', async () => {
    const robots = await (await fetch(new URL('/robots.txt', BASE_URL))).text();
    expect(robots).toContain('Sitemap:');

    const sitemap = await (await fetch(new URL('/sitemap-index.xml', BASE_URL))).text();
    expect(sitemap).toContain('sitemap-0.xml');
    const urls = await (await fetch(new URL('/sitemap-0.xml', BASE_URL))).text();
    for (const { path } of PAGES) {
      expect(urls).toContain(`https://tannerwj.com${path === '/' ? '/' : path + '/'}`);
    }
  });

  test('llms.txt describes the site and lists projects', async () => {
    const res = await fetch(new URL('/llms.txt', BASE_URL));
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('# tannerwj.com');
    expect(text).toContain('Novel Adaptations');
    expect(text).toContain('https://tannerwj.com/projects');
  });

  test('favicon serves', async () => {
    const res = await fetch(new URL('/favicon.svg', BASE_URL));
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('svg');
  });
});
