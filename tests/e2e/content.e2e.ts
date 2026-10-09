import { describe, test } from 'e2e';
import { expect } from 'e2e';
import { BASE_URL } from './support/base-url';

// Content rules for tannerwj.com: no placeholder text anywhere, and the
// standing exclusions (no ward-clerk or Pokémon mentions, nothing more
// specific than Utah) hold on every page.
const PAGES = ['/', '/projects', '/now', '/about', '/links'];

const BANNED = [
  'lorem ipsum',
  'ward clerk',
  'pokémon',
  'pokemon',
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
