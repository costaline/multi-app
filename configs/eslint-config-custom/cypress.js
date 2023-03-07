module.exports = {
	overrides: [
		{
			files: ['**/e2e/**/?(*.)+(spec|test).cy.[jt]s?(x)'],
			extends: ['plugin:cypress/recommended'],
			rules: {
			},
		},
	],
}
