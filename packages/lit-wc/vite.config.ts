import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
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
