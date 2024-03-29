module.exports = {
	extends: [
		'turbo',
		'standard-with-typescript',
		'plugin:import/recommended',
		'plugin:prettier/recommended',
	],

	plugins: ['simple-import-sort'],

	env: {
		browser: true,
		es2022: true,
		jest: true,
		node: true,
	},

	parser: '@typescript-eslint/parser',

	parserOptions: {
		project: ["**/tsconfig.json"],
	},

	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
		},

		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: ['tsconfig.json','apps/*/tsconfig.json', 'packages/*/tsconfig.json'],
			},
			node: {
				project: ['tsconfig.json','apps/*/tsconfig.json', 'packages/*/tsconfig.json'],
			}
		},
	},

	rules: {
		'default-param-last': 'warn',
		'dot-notation': 'off',
		'lines-between-class-members': ['warn', 'always'],
		'no-console': 'warn',
		'no-unused-vars': [
			'warn',
			{
				varsIgnorePattern: '^_$',
				argsIgnorePattern: '^_$',
			},
		],
		'no-useless-escape': 'off',
		'object-shorthand': ['warn', 'properties'],
		'padded-blocks': ['warn', 'never'],
		'padding-line-between-statements': [
			'warn',
			{ blankLine: 'always', prev: '*', next: 'return' },
			{ blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
			{
				blankLine: 'any',
				prev: ['const', 'let', 'var'],
				next: ['const', 'let', 'var'],
			},
		],
		'prefer-const': 'warn',
		'spaced-comment': 'warn',

		'import/export': 'warn',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'ignorePackages',
				jsx: 'ignorePackages',
				ts: 'ignorePackages',
				tsx: 'ignorePackages',
			},
		],
		'import/newline-after-import': 'warn',
		'import/no-unresolved': 'error',

		'prettier/prettier': 'warn',

		'simple-import-sort/exports': 'warn',
		'simple-import-sort/imports': [
			'warn',
			{
				groups: [
					[
						// Side effects
						'^\\u0000',
					],
					[
						// Node.js builtins
						'^node:',
						`^(${require('module').builtinModules.join('|')})(/|$)`,
					],
					[
						// Main framework/lib
						'^(react|vue|lit)$',
						// Other packages
						'^@?\\w',
					],
					[
						// Alias imports
						'^(@|@@|@@(\\w+-?)*)(/.*(?<!\\.(jpe?g|png|svg|bmp|webp|css|scss|sass|styl|stylus|emcss|litcss))$)',
						// Parent imports
						'^\\.\\.(?!/?$)',
						'^\\.\\./?$',
						// Relative imports
						'^\\./(?=.*!/)(?!/?$)',
						'^\\.(?!/?$)',
						'^\\./?$',
					],
					[
						"^.*\\u0000$", // import type
					],
					[
						// Styles
						'\\.scoped\\.(css|scss|sass|styl|stylus)$',
						'\\.(css|scss|sass|styl|stylus)$',
						'\\.module\\.(css|scss|sass|styl|stylus)$',
						'\\.(css|scss|sass|styl|stylus)\\?(inline|raw|string)$',
						'\\.(emcss)$', // emotion css-in-js,
						'\\.(litcss)$', // lit-element css-in-js,
						// Images
						'^.+\\.bmp$',
						'^.+\\.jpe?g$',
						'^.+\\.png$',
						'^.+\\.svg$',
						'^.+\\.webp$',
					],
				],
			},
		],
	},

	overrides: [
		{
			files: ['*.ts', '*.tsx'],

			rules: {
				'no-unused-vars': 'off',

				'@typescript-eslint/array-type': 'warn',
				'@typescript-eslint/ban-ts-comment': 'warn',
				'@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
				'@typescript-eslint/dot-notation': 'off',
				'@typescript-eslint/explicit-function-return-type': 'warn',
				'@typescript-eslint/no-confusing-void-expression': [
					'warn',
					{
						ignoreArrowShorthand: true,
						ignoreVoidOperator: true,
					}
				],
				'@typescript-eslint/no-floating-promises': 'warn',
				'@typescript-eslint/no-misused-promises': [
					'warn',
					{
						checksVoidReturn: false,
					},
				],

				'@typescript-eslint/no-non-null-assertion': 'warn',
				'@typescript-eslint/no-shadow': 'warn',
				'@typescript-eslint/no-unused-vars': [
					'warn',
					{
						varsIgnorePattern: '^_$',
						argsIgnorePattern: '^_$',
					},
				],
				'@typescript-eslint/prefer-nullish-coalescing': 'off',
				'@typescript-eslint/prefer-ts-expect-error': 'warn',
				'@typescript-eslint/restrict-template-expressions': 'off',
				'@typescript-eslint/strict-boolean-expressions': [
					'warn',
					{
						allowNullableString: true,
						allowNullableBoolean: true,
						allowNullableNumber: true,
					},
				],
				'@typescript-eslint/triple-slash-reference': 'warn',
			},
		},
	],
}
