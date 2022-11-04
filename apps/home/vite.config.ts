import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
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
			port: Number(env.PORT || env.APP_HOME_PORT) || 3000
		}
	}
})
