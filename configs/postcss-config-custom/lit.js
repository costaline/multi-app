const base = require('./index')

module.exports = {
	...base,
	customSyntax: 'postcss-lit',
	plugins: [
		...base.plugins
	]
}
