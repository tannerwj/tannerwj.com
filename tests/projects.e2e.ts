// Browser UI tests — written from projects.astro + ProjectCard.astro.
// NOT run in this sandbox: Chromium cannot reach the public internet here.
// Run with: npx e2e run tests/projects.e2e.ts
import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

test('projects page lists all projects with working filters', async ({ app, screen }) => {
  await app.open('/projects');

  await expect(screen.getByRole('heading', 'Projects')).toBeVisible();
  await expect(screen.getByText('20 projects')).toBeVisible();

  for (const label of ['All', 'Apps', 'Tools', 'Games', 'Experiments', 'Sites', 'Client work']) {
    await expect(screen.getByRole('button', label)).toBeVisible();
  }
  await expect(screen.getByRole('button', 'All')).toHaveAttribute('aria-pressed', 'true');
});

test('filtering to Games shows one project and updates the count', async ({ app, screen, browser }) => {
  await app.open('/projects');

  await screen.getByRole('button', 'Games').tap();
  await expect(screen.getByText('1 project')).toBeVisible();
  await expect(screen.getByRole('button', 'Games')).toHaveAttribute('aria-pressed', 'true');
  await expect(screen.getByRole('button', 'All')).toHaveAttribute('aria-pressed', 'false');

  const visibleCards = await browser.evaluate(
    () => document.querySelectorAll('.grid [data-category]:not([style*="display: none"])').length,
  );
  expect(visibleCards).toBe(1);

  await screen.getByRole('button', 'All').tap();
  await expect(screen.getByText('20 projects')).toBeVisible();
});

test('project cards link out to the live project', async ({ app, screen }) => {
  await app.open('/projects');

  // The card itself is the link: find the link containing the project heading.
  const cardLink = screen
    .getByRole('link')
    .filter({ has: screen.getByRole('heading', 'Novel Adaptations') });
  await expect(cardLink).toHaveAttribute('href', 'https://noveladaptations.com');
  await expect(cardLink).toHaveAttribute('target', '_blank');
});
