Ztc.Models.Keyword = Backbone.Model.extend({
	defaults: function () {

		return {
			keyword: "keyWord",
			averagePrice: 0.05,
			pageView: 0,
			clickIndex: 0,
			competeIndex: 0,
			matchIndex: 0,
			selected: false
		};
	},

	// selected and unselected toggle
	toggleChecked: function () {
		this.set({selected: !this.get("selected")});
	}
});