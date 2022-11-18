module.exports = {
	extends: [
		'./index.js',
		'plugin:wc/recommended',
		'plugin:lit/recommended'
	],
	rules: {
		'@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }]
	}
}
