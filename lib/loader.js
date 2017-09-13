'use strict';

const loaderUtils = require('loader-utils');

module.exports = function (source) {
	if (this.cacheable) {
		this.cacheable();
	}
	const callback = this.async();

	const query = loaderUtils.getOptions(this);
	const language = query.language;
	const useStrictExp = /(\'|\")use strict(\'|\")\;/;
	const useExportsExp = /^(.*?)module\.exports(.*?)(\{|\[)/m;

	const useStrict = useStrictExp.test(source);
	const useExports = useExportsExp.test(source);

	const json = source.replace(useStrictExp, '')
		.replace(useExportsExp, '$3').replace(/\;$/, '').trim();

	const obj = JSON.parse(json);
	let currentObj = {}
	currentObj[language] = obj[language]
	callback(null, `module.exports = ${JSON.stringify(currentObj)}`);
};
