

  exports.sortArray = function (array) {
	return array.sort((a, b) => b.from - a.from)
};