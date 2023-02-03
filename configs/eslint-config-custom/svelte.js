module.exports = {
	rules: {
		'@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }]
	},
	overrides: [
		{
			files: ['*.svelte'],
			extends: ['plugin:svelte/recommended', 'plugin:svelte/prettier' ],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.svelte'],
			},
			rules: {
			}
		}
	]
}
