import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],

	build: {
		lib: {
			entry: 'src/main.ts',
			formats: ['es']
		},
		rollupOptions: {
			external: /^svelte/,
		}
	},

	resolve: {
		alias: {
			'@@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
})
