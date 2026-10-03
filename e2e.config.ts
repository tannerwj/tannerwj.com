import type { E2EConfig } from 'e2e';
import { web } from '@e2e-dev/web';

export default {
  targets: [
    {
      engine: web(),
      app: { url: 'https://tannerwj.com' },
    },
  ],
} satisfies E2EConfig;
