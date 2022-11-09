module.exports = {
	extends: [
		'./index.js',
		'stylelint-config-clean-order',
		// 'stylelint-config-hudochenkov/order',
		'stylelint-prettier/recommended',
	],

	overrides: [
		{
			files: [
				'*.js',
				'**/*.js',
				'*.jsx',
				'**/*.jsx',
				'*.ts',
				'**/*.ts',
				'*.tsx',
				'**/*.tsx',
			],
			customSyntax: 'postcss-lit',
		}
	]
}
