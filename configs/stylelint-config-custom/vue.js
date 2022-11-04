module.exports = {
	extends: [
		"stylelint-config-standard-scss",
		"stylelint-config-recommended-vue/scss",
		'stylelint-config-clean-order',
		// 'stylelint-config-hudochenkov/order',
	],

	rules: {
		'block-closing-brace-newline-before': null,
		'block-opening-brace-space-before': null,
		'declaration-block-trailing-semicolon': null,
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
}
