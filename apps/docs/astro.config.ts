import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind()],
	server: {
		port: Number(process.env.PORT || process.env.APP_DOCS_PORT) || 2000
	}
});
