import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],

  build: {
    target: 'esnext',
  },

	resolve: {
		alias: {
			'@@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},

  server: {
    port: 3003,
  },
});
