import { describe, test } from 'e2e';
import { expect } from 'e2e';
import { BASE_URL } from './support/base-url';

// Content rules for tannerwj.com: no placeholder text anywhere, and the
// standing exclusions hold on every page (no ward-clerk mention, nothing
// more specific than Utah). Pokémon is allowed since 2026-11-09: the Poké
// games are listed products at Tanner's direction — the exclusion was
// about stock-hunting/collecting content, not his shipped games.
const PAGES = ['/', '/projects', '/about', '/links'];

const BANNED = [
  'lorem ipsum',
  'ward clerk',
  'todo:',
  'fixme',
  'loremipsum',
];

describe('content rules', { platforms: ['node'] }, () => {
  for (const path of PAGES) {
    test(`content rules hold on ${path}`, async () => {
      const res = await fetch(new URL(path, BASE_URL));
      expect(res.status).toBe(200);
      const lower = (await res.text()).toLowerCase();
      for (const phrase of BANNED) {
        expect(lower, `${path} contains banned phrase "${phrase}"`).not.toContain(phrase);
      }
    });
  }

  test('about page keeps the bio broad (no over-specific location)', async () => {
    const html = await (await fetch(new URL('/about', BASE_URL))).text();
    expect(html.toLowerCase()).toContain('utah');
    expect(html).not.toMatch(/provo|springville|84606/i);
  });
});
