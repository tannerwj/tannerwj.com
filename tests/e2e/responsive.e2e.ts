import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

for (const vp of viewports) {
  test(`${vp.name} layout: no horizontal overflow, header and footer visible`, { requires: ['browser'] }, async ({
    app,
    screen,
    browser,
  }) => {
    await browser.setViewport({ width: vp.width, height: vp.height });
    await app.open('/');

    const noOverflow = await browser.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    );
    expect(noOverflow, `${vp.name}: horizontal overflow`).toBe(true);

    await expect(screen.getByRole('banner')).toBeVisible();
    await expect(screen.getByRole('contentinfo')).toBeVisible();
    await expect(screen.getByRole('heading', { level: 1 })).toBeVisible();
  });
}

test('tablet projects grid stays readable', { requires: ['browser'] }, async ({ app, screen, browser }) => {
  await browser.setViewport({ width: 768, height: 1024 });
  await app.open('/projects');
  await expect(screen.getByRole('heading', { level: 1 })).toContainText('Projects');
  const noOverflow = await browser.evaluate(
    () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
  );
  expect(noOverflow).toBe(true);
});
