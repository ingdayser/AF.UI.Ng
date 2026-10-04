import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: { alias: { '@af/ui-models': fileURLToPath(new URL('../ui-models/src/index.ts', import.meta.url)) } },
  test: { environment: 'jsdom', setupFiles: ['./src/testing/setup.ts'] },
});
