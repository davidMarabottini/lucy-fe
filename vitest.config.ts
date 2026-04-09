import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.tsx', 'src/**/*.ts'],
      exclude: [
        'src/config/**',
        'types.ts',
        'router.tsx',
        'src/main.tsx', 
        'src/vite-env.d.ts', 
        '**/*.types.ts', 
        '**/*.module.scss', 
        'src/**/index.ts', 
        '**/*.stories.ts',
        '**/*.stories.tsx',
        '**/*.presets.ts',
        '**/*.presets.tsx'
      ],
      reporter: ['text', 'html']
    }
  }
});

// import react from '@vitejs/plugin-react';
// import tsconfigPaths from 'vite-tsconfig-paths';
// import { defineConfig } from 'vitest/config';
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
// import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
// import { playwright } from '@vitest/browser-playwright';
// const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// // More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
//   test: {
//     globals: true,
//     environment: 'jsdom',
//     setupFiles: './src/setupTests.ts',
//     coverage: {
//       provider: 'v8',
//       include: ['src/**/*.tsx', 'src/**/*.ts'],
//       exclude: ['src/main.tsx', 'src/vite-env.d.ts', '**/*.types.ts', '**/*.module.scss', 'src/**/index.ts'],
//       reporter: ['text', 'html']
//     },
//     projects: [{
//       extends: true,
//       plugins: [
//       // The plugin will run tests for the stories defined in your Storybook config
//       // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
//       storybookTest({
//         configDir: path.join(dirname, '.storybook')
//       })],
//       test: {
//         name: 'storybook',
//         browser: {
//           enabled: true,
//           headless: true,
//           provider: playwright({}),
//           instances: [{
//             browser: 'chromium'
//           }]
//         },
//         setupFiles: ['.storybook/vitest.setup.ts']
//       }
//     }]
//   }
// });