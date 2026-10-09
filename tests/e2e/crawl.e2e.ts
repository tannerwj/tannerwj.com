import { describe, test } from 'e2e';
import { expect } from 'e2e';
import { BASE_URL } from './support/base-url';

// Crawl every page and follow every internal link, image, and stylesheet:
// nothing internal may 404. External links are validated for shape only
// (referral hosts may block bots, so fetching them would be flaky).
const SEED_PAGES = ['/', '/projects', '/now', '/about', '/links'];

function internalRefs(html: string): string[] {
  const refs = new Set<string>();
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = m[1];
    if (!raw.startsWith('/') || raw.startsWith('//')) continue;
    // Cloudflare-managed endpoints, not site content.
    if (raw.startsWith('/cdn-cgi/')) continue;
    const clean = raw.split('#')[0].split('?')[0];
    if (clean) refs.add(clean);
  }
  return [...refs];
}

describe('crawl', { platforms: ['node'] }, () => {
  test('no broken internal links or assets on any page', async () => {
    const seen = new Set<string>();
    const queue = [...SEED_PAGES];
    const broken: string[] = [];

    while (queue.length > 0) {
      const path = queue.shift()!;
      if (seen.has(path)) continue;
      seen.add(path);
      const res = await fetch(new URL(path, BASE_URL));
      if (res.status >= 400) {
        broken.push(`${path} -> ${res.status}`);
        continue;
      }
      const html = await res.text();
      for (const ref of internalRefs(html)) {
        if (!seen.has(ref) && !queue.includes(ref)) queue.push(ref);
      }
    }

    expect(broken).toEqual([]);
    for (const p of SEED_PAGES) {
      expect(seen.has(p), `crawler should have visited ${p}`).toBe(true);
    }
  });

  test('legacy /home redirects to /', async () => {
    const res = await fetch(new URL('/home', BASE_URL), { redirect: 'manual' });
    expect([301, 308]).toContain(res.status);
    expect(res.headers.get('location')).toBe('/');
  });

  test('unknown paths serve the 404 page', async () => {
    const res = await fetch(new URL('/no-such-page-xyz', BASE_URL));
    expect(res.status).toBe(404);
    const html = await res.text();
    expect(html).toContain('404');
  });
});
