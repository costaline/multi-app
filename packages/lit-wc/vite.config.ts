import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		dts({
			outputDir: 'types',
			include: ["src/**/*.ts"],
			copyDtsFiles: false
		}),
	],

  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/,
    }
  },

	resolve: {
		alias: {
			'@@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
})
