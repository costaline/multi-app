module.exports = {
	extends: [
		'stylelint-config-clean-order',
		// 'stylelint-config-hudochenkov/order',
		'stylelint-config-prettier',
	],

	rules: {
		'declaration-block-trailing-semicolon': 'always',
	}
}
