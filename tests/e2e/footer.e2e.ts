import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

test('footer shows status, nav, socials, and current year', { requires: ['browser'] }, async ({ app, screen }) => {
  await app.open('/');
  const footer = screen.getByRole('contentinfo');

  await expect(footer.getByText(/all systems operational/)).toBeVisible();
  await expect(footer.getByRole('link', '/projects')).toBeVisible();
  await expect(footer.getByRole('link', 'GitHub')).toBeVisible();
  await expect(footer.getByRole('link', 'X')).toBeVisible();
  await expect(footer.getByRole('link', 'LinkedIn')).toBeVisible();

  const year = String(new Date().getFullYear());
  await expect(footer.getByText(new RegExp(`©.*${year} Tanner Johnson`))).toBeVisible();
});

test('footer socials open externally', { requires: ['browser'] }, async ({ app, screen }) => {
  await app.open('/');
  const footer = screen.getByRole('contentinfo');
  const github = footer.getByRole('link', 'GitHub');
  await expect(github).toHaveAttribute('href', 'https://github.com/tannerwj');
  expect(await github.getAttribute('target')).toBe('_blank');
});
