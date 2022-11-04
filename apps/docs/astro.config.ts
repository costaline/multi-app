import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	server: {
		port: Number(process.env.PORT || process.env.APP_DOCS_PORT) || 2000
	}
});
