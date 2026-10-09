import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

async function term(input: { fill: (v: string) => Promise<void>; press: (k: string) => Promise<void> }, cmd: string) {
  await input.fill(cmd);
  await input.press('Enter');
}

test('terminal window title renders the prompt text (not an obfuscated email link)', { requires: ['browser'] }, async ({
  app,
  screen,
  browser,
}) => {
  await app.open('/');
  // Regression: Cloudflare's email obfuscation rewrote the decorative
  // "tanner@tannerwj.com — zsh" title into a /cdn-cgi/l/email-protection
  // link. The title is now set from JS (split string), so the static HTML
  // carries no email pattern.
  await expect(screen.getByText('tanner@tannerwj.com — zsh')).toBeVisible();
  expect(await browser.locator('#tj-terminal .__cf_email__').count()).toBe(0);
});

test('terminal: help lists the commands', { requires: ['browser'] }, async ({ app, screen }) => {
  await app.open('/');
  const input = screen.getByLabel('Terminal input');
  await input.scrollIntoView();
  await term(input, 'help');
  await expect(screen.getByText(/commands: whoami/)).toBeVisible();
});

test('terminal: whoami answers', { requires: ['browser'] }, async ({ app, screen }) => {
  await app.open('/');
  const input = screen.getByLabel('Terminal input');
  await input.scrollIntoView();
  await term(input, 'whoami');
  await expect(screen.getByText(/principal engineer/)).toBeVisible();
});

test('terminal: unknown command gets a helpful error', { requires: ['browser'] }, async ({ app, screen }) => {
  await app.open('/');
  const input = screen.getByLabel('Terminal input');
  await input.scrollIntoView();
  await term(input, 'frobnicate');
  await expect(screen.getByText(/command not found: frobnicate/)).toBeVisible();
});

test('terminal: clear wipes the output', { requires: ['browser'] }, async ({ app, screen, browser }) => {
  await app.open('/');
  const input = screen.getByLabel('Terminal input');
  await input.scrollIntoView();
  await term(input, 'whoami');
  await expect(screen.getByText(/principal engineer/)).toBeVisible();
  await term(input, 'clear');
  await expect(screen.getByText(/principal engineer/)).toHaveCount(0);
  // The input row survives the clear.
  await expect(browser.locator('#term-input')).toBeVisible();
});

test('terminal: theme command toggles the site theme', { requires: ['browser'] }, async ({ app, screen, browser }) => {
  await app.open('/');
  const before = await browser.evaluate(() => document.documentElement.getAttribute('data-theme'));
  const input = screen.getByLabel('Terminal input');
  await input.scrollIntoView();
  await term(input, 'theme');
  const expected = before === 'light' ? 'dark' : 'light';
  await expect(browser.locator('html')).toHaveAttribute('data-theme', expected);
});
