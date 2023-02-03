import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		dts({
			outputDir: 'types',
			include: ["src/**/*.ts"],
			copyDtsFiles: false
		}),

		svelte({
			compilerOptions: {
				// dev: !production,
				customElement: true,
			}
	 }),
	],

	build: {
		lib: {
			entry: 'src/main.ts',
			formats: ['es'],
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
