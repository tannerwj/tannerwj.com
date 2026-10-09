import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

const readTheme = async (browser: { evaluate: (fn: () => string | null) => Promise<unknown> }) =>
  (await browser.evaluate(() => document.documentElement.getAttribute('data-theme'))) as string | null;

test('theme toggle flips between dark and light', { requires: ['browser'] }, async ({ app, screen, browser }) => {
  await app.open('/');

  const toggle = screen.getByRole('button', 'Toggle light and dark theme');
  await toggle.tap();
  await expect(browser.locator('html')).toHaveAttribute('data-theme', 'light');

  await toggle.tap();
  await expect(browser.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('theme choice persists across reloads', { requires: ['browser'] }, async ({ app, screen, browser }) => {
  await app.open('/');
  await screen.getByRole('button', 'Toggle light and dark theme').tap();
  await expect(browser.locator('html')).toHaveAttribute('data-theme', 'light');

  expect(await browser.evaluate(() => localStorage.getItem('tj-theme'))).toBe('light');

  await browser.reload();
  await expect(browser.locator('html')).toHaveAttribute('data-theme', 'light');

  // And back to dark persists too.
  await screen.getByRole('button', 'Toggle light and dark theme').tap();
  await browser.reload();
  await expect(browser.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('saved theme applies on first load (no flash of wrong theme)', { requires: ['browser'] }, async ({ app, browser }) => {
  await app.open('/');
  // Seed a saved preference, then navigate: the inline head script must
  // apply it before first paint, so the very first read already matches.
  await browser.evaluate(() => {
    localStorage.setItem('tj-theme', 'light');
    return true;
  });
  await app.open('/about');
  expect(await readTheme(browser)).toBe('light');

  await browser.evaluate(() => {
    localStorage.setItem('tj-theme', 'dark');
    return true;
  });
  await app.open('/now');
  expect(await readTheme(browser)).toBe('dark');
});
