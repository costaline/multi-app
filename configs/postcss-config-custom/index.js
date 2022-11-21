const postcssPresetEnv = require('postcss-preset-env');
const postcssNormalize = require('postcss-normalize')

module.exports = {
	plugins: [
		postcssNormalize(),
		postcssPresetEnv()
	]
}
