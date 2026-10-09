import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

test('header nav reaches every section', { requires: ['browser'] }, async ({ app, screen, browser }) => {
  await app.open('/');

  const nav = screen.getByRole('navigation', 'Primary');
  await nav.getByRole('link', 'Projects').tap();
  await expect(browser).toHaveURL('/projects');
  await expect(screen.getByRole('heading', { level: 1 })).toContainText('Projects');

  await nav.getByRole('link', 'Now').tap();
  await expect(browser).toHaveURL('/now');

  await nav.getByRole('link', 'About').tap();
  await expect(browser).toHaveURL('/about');

  await nav.getByRole('link', 'Links').tap();
  await expect(browser).toHaveURL('/links');
});

test('brand link returns home', { requires: ['browser'] }, async ({ app, screen, browser }) => {
  await app.open('/about');
  await screen.getByRole('link', 'tannerwj.com home').tap();
  await expect(browser).toHaveURL('/');
});

test('footer links reach every section', { requires: ['browser'] }, async ({ app, screen, browser }) => {
  await app.open('/');
  const footer = screen.getByRole('contentinfo');
  await footer.getByRole('link', '/projects').tap();
  await expect(browser).toHaveURL('/projects');
});

test('mobile menu opens and its links work', { requires: ['browser'] }, async ({ app, screen, browser }) => {
  await browser.setViewport({ width: 390, height: 844 });
  await app.open('/');

  const toggle = screen.getByRole('button', 'Open menu');
  await expect(toggle).toBeVisible();
  await toggle.tap();

  const menu = screen.getByRole('navigation', 'Mobile');
  await expect(menu).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');

  await menu.getByRole('link', '/now').tap();
  await expect(browser).toHaveURL('/now');
});

test('current page is marked in the nav', { requires: ['browser'] }, async ({ app, screen }) => {
  await app.open('/projects');
  const current = screen.getByRole('navigation', 'Primary').getByRole('link', 'Projects');
  await expect(current).toHaveAttribute('aria-current', 'page');
});
