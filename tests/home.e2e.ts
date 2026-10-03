// Browser UI tests — written from index.astro + Terminal.astro + ProjectCard.astro.
// NOT run in this sandbox: Chromium cannot reach the public internet here.
// Run with: npx e2e run tests/home.e2e.ts
import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

test('home hero introduces Tanner and links onward', async ({ app, screen, browser }) => {
  await app.open('/');

  await expect(screen.getByRole('heading').first()).toContainText('Tanner');
  await expect(screen.getByText('20 projects shipped', { exact: false })).toBeVisible();

  await screen.getByRole('link', 'View projects →').tap();
  await expect(browser).toHaveURL('/projects');
});

test('home bento shows the four featured projects', async ({ app, screen }) => {
  await app.open('/');

  for (const name of ['Novel Adaptations', 'Our Family Brain', 'The Pit', 'Health']) {
    await expect(screen.getByRole('heading', name)).toBeVisible();
  }
  await expect(screen.getByRole('heading', 'The archive')).toBeVisible();
});

test('home console section renders the interactive terminal', async ({ app, screen }) => {
  await app.open('/');

  await expect(screen.getByRole('heading', 'Console', { exact: false })).toBeVisible();
  await expect(screen.getByLabel('Terminal input')).toBeVisible();
});

test('home elsewhere section links to now and about', async ({ app, screen, browser }) => {
  await app.open('/');

  const elsewhere = screen.getByRole('region', 'More');
  await elsewhere.getByRole('link', '/now').tap();
  await expect(browser).toHaveURL('/now');

  await app.open('/');
  await screen.getByRole('region', 'More').getByRole('link', '/about').tap();
  await expect(browser).toHaveURL('/about');
});
