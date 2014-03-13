
define(function(require, exports, module) {

	var Backbone = require('Backbone'),
		Keyword_view;

	require('jQueryTmpl');
	Keyword_view = Backbone.View.extend({
		tagName: 'tr',

		initialize: function() {
			//this.listenTo(this.model, "change", this.render);
		},

		render: function () {
			
			this.$el.html($("#keyword_template").tmpl(this.model.toJSON()));
			return this;
		}

	});

	module.exports = Keyword_view;
	
});