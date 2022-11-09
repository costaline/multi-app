module.exports = {
	extends: [
		'@stylelint/postcss-css-in-js',
		'stylelint-config-standard-scss',
		'stylelint-config-clean-order',
		// 'stylelint-config-hudochenkov/order',
		'stylelint-prettier/recommended',
	],

	customSyntax: '@stylelint/postcss-css-in-js',

	rules: {
		'declaration-block-trailing-semicolon': 'always',
		'no-missing-end-of-source-newline': null,
		'value-keyword-case': null,
	},
}
