import type { E2EConfig } from 'e2e';
import { web } from '@e2e-dev/web';

export default {
  targets: [
    {
      name: 'chromium',
      engine: web({ connect: { cdpEndpoint: () => 'http://127.0.0.1:9222' } }),
      app: { url: 'https://tannerwj.com' },
    },
  ],
} satisfies E2EConfig;
