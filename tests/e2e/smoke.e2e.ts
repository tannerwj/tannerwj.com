import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

test('smoke: home page loads with the expected title', { requires: ['browser'] }, async ({ app, screen, browser }) => {
  await app.open('/');
  await expect(browser).toHaveTitle('Tanner Johnson — Principal Engineer');
  await expect(screen.getByRole('heading', { level: 1 })).toContainText('Tanner');
});
