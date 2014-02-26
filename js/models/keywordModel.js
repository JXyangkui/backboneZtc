Ztc.Models.Keyword = Backbone.Model.extend({
	defaults: function () {

		return {
			keyword: "keyWord",
			price: 0.05,
			showIndex: 0,
			chickIndex: 0,
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