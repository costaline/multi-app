export const ENVS_BY_APP: Record<string, string[]> = {
	strapi: ['.env', '.env.development'],
}

export const RUNNABLE_APPS = {
	side: ['docs'],
	main: ['about', 'home', 'strapi'],
	ancillary: ['lit-wc'],
} as const
