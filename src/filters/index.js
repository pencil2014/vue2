const vueFilter = {
	emoji (val) {
		let ranges = ['\ud83c[\udf00-\udfff]', '\ud83d[\udc00-\ude4f]', '\ud83d[\ude80-\udeff]']
		return val.replace(new RegExp(ranges.join('|'), 'g'), '')
	}
}

module.exports = vueFilter