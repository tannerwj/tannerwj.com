import { describe, test } from 'e2e';
import { expect } from 'e2e';
import { BASE_URL } from './support/base-url';

// Performance sanity: the static site must stay light. Budgets are generous
// upper bounds — a regression that doubles an asset should trip them.
const ASSET_BUDGETS: Array<[string, number]> = [
  ['/og.png', 200_000],
  ['/covers/novel-adaptations.webp', 400_000],
  ['/covers/our-family-brain.webp', 400_000],
  ['/covers/the-pit.webp', 400_000],
  ['/covers/triangulum.webp', 400_000],
  ['/favicon.svg', 10_000],
];

describe('perf budgets', { platforms: ['node'] }, () => {
  for (const [path, budget] of ASSET_BUDGETS) {
    test(`asset budget: ${path} under ${budget / 1000}KB`, async () => {
      const res = await fetch(new URL(path, BASE_URL));
      expect(res.status).toBe(200);
      const bytes = (await res.arrayBuffer()).byteLength;
      expect(bytes, `${path} is ${bytes} bytes`).toBeLessThan(budget);
    });
  }

  test('page HTML stays lean', async () => {
    for (const path of ['/', '/projects', '/links']) {
      const res = await fetch(new URL(path, BASE_URL));
      const bytes = (await res.arrayBuffer()).byteLength;
      expect(bytes, `${path} HTML is ${bytes} bytes`).toBeLessThan(120_000);
    }
  });
});
