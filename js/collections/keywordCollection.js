Ztc.Collections.KeyWordList = Backbone.Collection.extend({

	model: KeyWord,

	comparator: "showIndex",

	selected: function () {
		return this.where({selected: true});
	}
});