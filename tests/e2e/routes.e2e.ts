import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

// Every route renders its page chrome (header/footer) with the right
// document title and top-level heading.
const routes = [
  { path: '/', title: 'Tanner Johnson — Principal Engineer', h1: 'Tanner' },
  { path: '/projects', title: 'Projects — Tanner Johnson', h1: 'Projects' },
  { path: '/now', title: 'Now — Tanner Johnson', h1: 'Now' },
  { path: '/about', title: 'About — Tanner Johnson', h1: 'About' },
  { path: '/links', title: 'Links', h1: 'Links' },
];

for (const r of routes) {
  test(`route ${r.path} renders`, { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await app.open(r.path);
    await expect(browser).toHaveTitle(r.title);
    await expect(screen.getByRole('heading', { level: 1 })).toContainText(r.h1);
    await expect(screen.getByRole('banner')).toBeVisible();
    await expect(screen.getByRole('contentinfo')).toBeVisible();
  });
}
