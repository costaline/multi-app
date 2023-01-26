module.exports = {
	overrides: [
		{
			files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
			extends: ['plugin:storybook/recommended'],
			rules: {
				'@typescript-eslint/consistent-type-assertions': 'off',
				'@typescript-eslint/dot-notation': 'off',
			},
		},
	]
}
