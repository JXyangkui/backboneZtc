Ztc.Collections.KeywordList = Backbone.Collection.extend({

	model: Ztc.Models.Keyword,

	comparator: "showIndex",

	selected: function () {
		return this.where({selected: true});
	},

	//moduleName : quick  or   precise
	getKeywords: function (moduleName) {
		//send ajax.....

		this.set(Ztc.Source[moduleName + "Data"]);
		return this;
	}
});