module.exports = {
	extends: [
		'./index.js',
	],

	overrides: [
    {
      files: ["*.astro"],
			extends: [
				"plugin:astro/recommended"
			],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {},
    },
  ],
}
