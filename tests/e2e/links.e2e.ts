import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { linkGroups } from '../../src/data/links';

// /links is the link-in-bio page: every affiliate link must render with its
// reader-benefit copy, open in a new tab, and carry rel="sponsored".
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

for (const group of linkGroups) {
  test(`links: "${group.title}" items render with perks and sponsored rel`, { requires: ['browser'] }, async ({
    app,
    screen,
  }) => {
    await app.open('/links');

    const section = screen.getByRole('region', group.title);
    await expect(section).toBeVisible();

    for (const item of group.items) {
      const link = section.getByRole('link', new RegExp(`^${esc(item.name)}`));
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', item.url);
      expect(await link.getAttribute('target')).toBe('_blank');
      expect(await link.getAttribute('rel')).toContain('sponsored');
      await expect(link).toContainText(item.blurb);
      if (item.perk) await expect(link).toContainText(item.perk);
    }
  });
}

test('links: referral disclosure is present', { requires: ['browser'] }, async ({ app, screen }) => {
  await app.open('/links');
  await expect(screen.getByText(/referral links that may earn me credit/)).toBeVisible();
});

// Pure data check — no browser needed, runs on the node target too.
describe('link data', { platforms: ['node'] }, () => {
  test('every affiliate URL is a valid https URL', () => {
    for (const group of linkGroups) {
      for (const item of group.items) {
        const url = new URL(item.url);
        expect(url.protocol, `${item.name} URL`).toBe('https:');
      }
    }
  });
});
