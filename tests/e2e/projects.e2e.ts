import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { projects, CATEGORIES } from '../../src/data/projects';

test('projects page lists every project from the catalog', { requires: ['browser'] }, async ({ app, screen, browser }) => {
  await app.open('/projects');
  const visible = await browser.evaluate(
    () => [...document.querySelectorAll('[data-category]')].filter((el) => (el as HTMLElement).style.display !== 'none').length,
  );
  expect(visible).toBe(projects.length);
  await expect(screen.getByText(`${projects.length} projects`)).toBeVisible();
});

test('project filters narrow the grid and update the count', { requires: ['browser'] }, async ({ app, screen, browser }) => {
  await app.open('/projects');

  for (const cat of CATEGORIES.filter((c) => c.id !== 'all')) {
    const expected = projects.filter((p) => p.category === cat.id).length;
    await screen.getByRole('button', cat.label).tap();
    await expect(screen.getByRole('button', cat.label)).toHaveAttribute('aria-pressed', 'true');

    const visible = await browser.evaluate(
      () =>
        [...document.querySelectorAll('[data-category]')].filter((el) => (el as HTMLElement).style.display !== 'none')
          .length,
    );
    expect(visible).toBe(expected);

    const label = `${expected} project${expected === 1 ? '' : 's'}`;
    await expect(screen.getByText(label)).toBeVisible();

    // Every visible card belongs to the chosen category.
    const cats = await browser.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('[data-category]')]
        .filter((el) => el.style.display !== 'none')
        .map((el) => el.dataset.category ?? ''),
    );
    expect(new Set(cats).size).toBeLessThanOrEqual(1);
    if (cats.length > 0) expect(cats[0]).toBe(cat.id);
  }

  // Back to all.
  await screen.getByRole('button', 'All').tap();
  const visible = await browser.evaluate(
    () => [...document.querySelectorAll('[data-category]')].filter((el) => (el as HTMLElement).style.display !== 'none').length,
  );
  expect(visible).toBe(projects.length);
});

test('project cards link out to the live project', { requires: ['browser'] }, async ({ app, screen }) => {
  await app.open('/projects');
  for (const p of projects.slice(0, 5)) {
    const card = screen.getByRole('link', new RegExp(`^${p.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
    await expect(card.first()).toHaveAttribute('href', p.url);
    expect(await card.first().getAttribute('target')).toBe('_blank');
  }
});

test('home bento shows the featured projects', { requires: ['browser'] }, async ({ app, screen }) => {
  await app.open('/');
  const featured = projects.filter((p) => p.featured);
  expect(featured.length).toBeGreaterThan(0);
  for (const p of featured) {
    await expect(
      screen.getByRole('link', new RegExp(p.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))),
    ).toBeVisible();
  }
});
