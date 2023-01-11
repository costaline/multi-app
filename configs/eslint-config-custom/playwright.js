module.exports = {
	overrides: [
		{
			files: ['**/__tests__/**/*.[jt]s?(x)', '**/e2e/**/?(*.)+(spec|test).[jt]s?(x)'],
			extends: ['plugin:playwright/playwright-test'],
			rules: {
			},
		},
	],
}
