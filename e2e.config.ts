import type { E2EConfig } from 'e2e';
import { web } from '@e2e-dev/web';

// Deterministic-only suite: no agent.* steps, no model, no API keys.
//
// Two targets:
// - `api` (node): read-only HTTP checks against the live site. Runs in the
//   sandbox and in CI. Reads its URL from E2E_BASE_URL, never app.baseUrl
//   (a target without an engine cannot declare `app`).
// - `chromium` (Playwright): rendered-page checks. Connects to the shared
//   Chromium on 127.0.0.1:9222 (remote debugging, routed through a proxy
//   chain for public HTTPS); never launches its own browser. Keep workers
//   modest — the browser is shared.
const baseUrl = process.env.E2E_BASE_URL ?? 'https://tannerwj.com';

export default {
  tests: 'tests/**/*.e2e.ts',
  workers: 2,
  targets: [
    { name: 'api', platform: 'node' },
    {
      name: 'chromium',
      engine: web({ connect: { cdpEndpoint: () => 'http://127.0.0.1:9222' } }),
      app: { url: baseUrl },
    },
  ],
} satisfies E2EConfig;
