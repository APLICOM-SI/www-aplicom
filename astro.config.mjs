import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.aplicom.si',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
