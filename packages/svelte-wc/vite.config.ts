import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import dts from 'vite-plugin-dts'
import components from './components'

// https://vitejs.dev/config/
// @ts-expect-error dts plugin version
export default defineConfig(({ mode }) => {

	const env = loadEnv(mode, process.cwd(), '')

	return {
		plugins: [
			dts({
				outputDir: 'types',
				include: ["src/**/*.ts"],
				copyDtsFiles: false
			}),

			svelte({
				compilerOptions: {
					// dev: !production,
					customElement: env.STORYBOOK_MODE !== 'true',
				}
		 }),
		],

		build: {
			lib: {
				entry: ['src/main.ts', ...components],
				formats: ['es'],
				fileName: (fmt,entryName) => {
					const name = entryName
						.split('/')
						.pop()
						.split('.svelte')
						.shift()

					return `${name}.js`
				}
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
	}
})
