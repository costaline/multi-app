module.exports = {
	extends: [
		'./index.js',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
	],

	settings: {
		react: {
			version: 'detect',
		},
	},

	rules: {
		'react/button-has-type': 'warn',
		'react/destructuring-assignment': [
			'warn',
			'always',
			{
				ignoreClassFields: true,
			},
		],
		'react/function-component-definition': 'off',
		'react/jsx-curly-brace-presence': ['warn', 'never'],
		'react/jsx-filename-extension': [
			'warn',
			{ extensions: ['js', 'jsx', '.tsx'] },
		],
		'react/jsx-fragments': 'off',
		'react/jsx-key': ['warn', { checkKeyMustBeforeSpread: true }],
		'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
		'react/jsx-props-no-spreading': 'off',
		'react/jsx-sort-props': [
			'warn',
			{
				callbacksLast: true,
				shorthandFirst: true,
				shorthandLast: false,
				ignoreCase: false,
				noSortAlphabetically: false,
				reservedFirst: true,
			},
		],
		'react/jsx-uses-vars': 'warn',
		'react/self-closing-comp': ['warn', { component: true, html: true }],

		'react/forbid-prop-types': ['warn', { forbid: ['any', 'array'] }],
		'react/no-unused-prop-types': 'warn',
		'react/prop-types': 'warn',
		'react/require-default-props': 'off',
	},

	overrides: [
		{
			files: ['*.ts', '*.tsx'],

			rules: {
				'@typescript-eslint/no-restricted-imports': [
					'warn',
					{
						name: 'react-redux',
						importNames: ['useSelector', 'useDispatch'],
						message:
							'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
					},
				],
			},
		},
	],
}
