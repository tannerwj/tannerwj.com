// Browser UI tests — written from Base.astro (theme-toggle behavior).
// NOT run in this sandbox: Chromium cannot reach the public internet here.
// Run with: npx e2e run tests/theme.e2e.ts
import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

test('theme toggle flips data-theme without reloading the page', async ({ app, screen, browser }) => {
  await app.open('/');
  const toggle = screen.getByRole('button', 'Toggle light and dark theme');
  await expect(toggle).toBeVisible();

  const readTheme = () => browser.evaluate(() => document.documentElement.getAttribute('data-theme'));

  const before = await readTheme();
  expect(before === 'light' || before === 'dark').toBe(true);

  await toggle.tap();
  const after = await readTheme();
  expect(after).not.toBe(before);
  expect(after === 'light' || after === 'dark').toBe(true);

  // No reload, no navigation: the URL is untouched.
  await expect(browser).toHaveURL('/');

  // The choice is persisted for the pre-paint script.
  const saved = await browser.evaluate(() => window.localStorage.getItem('tj-theme'));
  expect(saved).toBe(after);

  // Toggling again restores the original theme.
  await toggle.tap();
  expect(await readTheme()).toBe(before);
});

test('saved theme is applied on reload', async ({ app, screen, browser }) => {
  await app.open('/');
  const toggle = screen.getByRole('button', 'Toggle light and dark theme');
  await toggle.tap();
  const chosen = await browser.evaluate(() => document.documentElement.getAttribute('data-theme'));

  await browser.reload();
  const afterReload = await browser.evaluate(() => document.documentElement.getAttribute('data-theme'));
  expect(afterReload).toBe(chosen);
});

test('theme toggle exists on every page', async ({ app, screen }) => {
  for (const path of ['/projects', '/now', '/about', '/links']) {
    await app.open(path);
    await expect(screen.getByRole('button', 'Toggle light and dark theme')).toBeVisible();
  }
});
