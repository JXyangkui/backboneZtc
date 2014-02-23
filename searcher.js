var searcher = Backbone.Model.extend({
    
    initialize: function () {
    	return {

    	}
    },
});

var searcherView = Backbone.View.extend({

	el: "#select_keywords_module",

	events: {
		"click #quick_select_btn": "selectNow",
		"click #percise_select_btn": "selectNow",
		"click .export": "export",
		"click .copy": "copy"
	},

	selectNow: function () {},

	export: function () {},

	copy: function () {}
});