// Browser UI tests — written from component source (Header.astro, Base.astro).
// NOT run in this sandbox: Chromium cannot reach the public internet here.
// Run with: npx e2e run tests/navigation.e2e.ts
import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

const PAGES = [
  { label: 'Projects', path: '/projects' },
  { label: 'Now', path: '/now' },
  { label: 'About', path: '/about' },
  { label: 'Links', path: '/links' },
];

for (const { label, path } of PAGES) {
  test(`primary nav marks ${label} as current on ${path}`, async ({ app, screen }) => {
    await app.open(path);
    const link = screen.getByRole('navigation', 'Primary').getByRole('link', label);
    await expect(link).toHaveAttribute('aria-current', 'page');
  });
}

test('brand link returns home', async ({ app, screen, browser }) => {
  await app.open('/about');
  await screen.getByRole('link', 'tannerwj.com home').tap();
  await expect(browser).toHaveURL(/\/$/);
});

test('footer links navigate', async ({ app, screen, browser }) => {
  await app.open('/');
  const footer = screen.getByRole('navigation', 'Footer');
  await footer.getByRole('link', '/now').tap();
  await expect(browser).toHaveURL(/\/now\/?$/);
});

test('footer social links open externally', async ({ app, screen }) => {
  await app.open('/');
  const footer = screen.getByRole('navigation', 'Footer');
  const github = footer.getByRole('link', 'GitHub');
  await expect(github).toHaveAttribute('href', 'https://github.com/tannerwj');
  await expect(github).toHaveAttribute('target', '_blank');
});

test.skip('mobile menu toggle expands and collapses', async ({ app, screen, browser }) => {
  // Requires a mobile viewport (button only renders <768px); the e2e
  // browser fixture does not expose viewport control in this setup.
  await app.open('/');
  const toggle = screen.getByRole('button', 'Open menu');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.tap();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await screen.getByRole('navigation', 'Mobile').getByRole('link', '/about').tap();
});

test('unknown route renders the 404 page', async ({ app, screen, browser }) => {
  await app.open('/definitely-not-a-page/');
  await expect(screen.getByRole('heading', '404')).toBeVisible();
  await screen.getByRole('link', '← home').tap();
  await expect(browser).toHaveURL(/\/$/);
});
