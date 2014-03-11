define(function(require, exports, module) {

	var Backbone = require('Backbone'),
	    Keyword_model;

	Keyword_model = Backbone.Model.extend({
		defaults: function () {
			return {
				bidword: "keyWord",
				avg_price: 0.05,
				pv: 0,
				click: 0,
				compete: 0,
				score: 0
			};
		}
	});

	module.exports = Keyword_model;

});