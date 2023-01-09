import { fileURLToPath, URL } from 'node:url'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	return {
		plugins: [react()],

		resolve: {
			alias: {
				'@@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},

		server: {
			host: '0.0.0.0',
			port: Number(env.PORT || env.APP_HOME_PORT) || 3000,
			watch: {
				usePolling: true,
			},
		},

		test: {
			globals: true,
			environment: 'happy-dom',
			setupFiles: './setupTests.ts',
			open: false,
		},
	}
})
