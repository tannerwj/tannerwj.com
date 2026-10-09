import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

test('unknown route renders the 404 page', { requires: ['browser'] }, async ({ app, screen }) => {
  await app.open('/no-such-page-xyz');
  await expect(screen.getByRole('heading', { level: 1 })).toHaveText('404');
  await expect(screen.getByText(/This page doesn't exist/)).toBeVisible();
});

test('404 page links home', { requires: ['browser'] }, async ({ app, screen, browser }) => {
  await app.open('/no-such-page-xyz');
  await screen.getByRole('link', '← home').tap();
  await expect(browser).toHaveURL('/');
});
