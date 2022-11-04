module.exports = {
	extends: [
		'./index.js'
	],

	rules: {
	},

	overrides: [
		{
			files: ["*.vue"],
			extends: [
				'plugin:vue/vue3-recommended',
				'plugin:prettier-vue/recommended'
			],
			parser: "vue-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
				extraFileExtensions: [".vue"],
			},
			rules: {},
		},
	],
}
