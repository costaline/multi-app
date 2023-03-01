import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	return {
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
			port: Number(env.PORT || env.APP_CHAT_PORT) || 3003,
		},
	}
})
