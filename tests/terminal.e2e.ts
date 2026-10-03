// Browser UI tests — written from Terminal.astro (command responses).
// NOT run in this sandbox: Chromium cannot reach the public internet here.
// Run with: npx e2e run tests/terminal.e2e.ts
import { test } from '@e2e-dev/web';
import { expect, type Screen } from 'e2e';

async function runCommand(screen: Screen, cmd: string) {
  const input = screen.getByLabel('Terminal input');
  await input.pressSequentially(cmd);
  await input.press('Enter');
}

test('terminal answers help', async ({ app, screen }) => {
  await app.open('/');
  await runCommand(screen, 'help');
  await expect(screen.getByText('commands:', { exact: false })).toBeVisible();
});

test('terminal answers whoami', async ({ app, screen }) => {
  await app.open('/');
  await runCommand(screen, 'whoami');
  await expect(screen.getByText('principal engineer', { exact: false }).first()).toBeVisible();
});

test('terminal reports unknown commands', async ({ app, screen }) => {
  await app.open('/');
  await runCommand(screen, 'frobnicate');
  await expect(screen.getByText('command not found', { exact: false })).toBeVisible();
});

test('terminal theme command toggles the site theme', async ({ app, screen, browser }) => {
  await app.open('/');

  const readTheme = () => browser.evaluate(() => document.documentElement.getAttribute('data-theme'));
  const before = await readTheme();

  await runCommand(screen, 'theme');

  const after = await readTheme();
  expect(after).not.toBe(before);
  await expect(screen.getByText('theme toggled', { exact: false })).toBeVisible();
});

test('terminal clear wipes the log lines', async ({ app, screen }) => {
  await app.open('/');
  await runCommand(screen, 'help');
  await expect(screen.getByText('commands:', { exact: false })).toBeVisible();

  await runCommand(screen, 'clear');
  await expect(screen.getByText('commands:', { exact: false })).toBeHidden();
});
