module.exports = {
	rules: {
		'declaration-block-trailing-semicolon': 'always',
		'value-keyword-case': [
			'lower',
			{
				ignoreProperties: ['/^[$]/']
			}
		],

		'scss/dollar-variable-first-in-block': [
			true,
			{
				ignore: ['comments', 'imports'],
			},
		],
		'scss/at-rule-no-unknown': true,
		'scss/selector-no-redundant-nesting-selector': true,
	},

	overrides: [
		{
			files: ['*.scss', '**/*.scss'],

			extends: [
				'stylelint-config-standard-scss',
				'stylelint-config-clean-order',
				// 'stylelint-config-hudochenkov/order',
				'stylelint-prettier/recommended'
			],

			customSyntax: 'postcss-scss',
		},

		{
			files: ['*.sass', '**/*.sass'],

			extends: [
				'stylelint-config-standard-scss',
				'stylelint-config-clean-order',
				// 'stylelint-config-hudochenkov/order',
			],

			rules: {
				'block-closing-brace-newline-before': null,
				'block-opening-brace-space-before': null,
				'declaration-block-trailing-semicolon': 'never',
				'selector-type-no-unknown': null
			},

			customSyntax: 'postcss-sass'
		},
	]
}
