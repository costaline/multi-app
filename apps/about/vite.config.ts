import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

	const env = loadEnv(mode, process.cwd(), '')

	return {
		plugins: [vue()],
		resolve: {
			alias: {
				'@@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		server: {
			host: '0.0.0.0',
			port: Number(env.PORT || env.APP_ABOUT_PORT) || 3001,
			watch: {
				usePolling: true,
			},
		}
	}
})
