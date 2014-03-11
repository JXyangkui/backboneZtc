define(function(require, exports, module) {

	var Backbone = require('Backbone'),
		Keyword_model = require('../models/keywordModel'),
		Keyword_collection;

	Keyword_collection = Backbone.Collection.extend({
		model: Keyword_model,

		comparator: 'score',

		//keywords:  Array
		getKeywords: function(keywords) {
			this.reset(keywords);
		}
	});

	module.exports = Keyword_collection;
});