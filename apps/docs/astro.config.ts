import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), mdx()],
	server: {
		port: Number(process.env.PORT || process.env.APP_DOCS_PORT) || 2000
	},
});
