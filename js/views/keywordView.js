
define(function(require, exports, module) {

	var Backbone = require('Backbone'),
		Keyword_view;

	Keyword_view = Backbone.View.extend({
		tagName: 'tr',
		template: _.template($("#keyword_template").html()),

		initialize: function() {
			this.listenTo(this.model, "change", this.render);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}

	});

	module.exports = Keyword_view;
	
});