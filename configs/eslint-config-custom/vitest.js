module.exports = {
	overrides: [
		{
			files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
			extends: ['plugin:vitest-globals/recommended'],
			plugins: ['testing-library', 'vitest'],
			env: {
				'vitest-globals/env': true
			},
			rules: {
				'vitest/no-identical-title': 'warn'
			},
		},
	],
}
