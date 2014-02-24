var Selector = Backbone.Model.extend({

	defaults: function () {
		return {
			//以下数组按 min, max, current顺序初始化
			match: [400, 1000, 588],
			competeIndex: [1, 1500, 566],
			clickIndex: [0, 3000, 200],
			pageView: [0, 100000, 5000],
			averagePrice: [0.05, 10.00, 3.25]
		};
	}
});

var SelectorView = Backbone.View.extend({

	selectorTmpl: _.template($("#selector_tmpl").html());

	render: function () {
		this.$el.html(this.selectorTmpl());
	}
});