import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mateusferrao.github.io',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
