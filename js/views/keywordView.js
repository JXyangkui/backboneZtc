
Ztc.Views.KeywordView = Backbone.View.extend({

	tagName: "tr",
	template: _.template($("#keyword_template").html()),

	events: {
		"click .toggle": "toggleSelected"
	},

	initialize: function () {
		this.listenTo(this.model, "change", this.render);
	},

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	toggleSelected: function () {
		this.model.toggle();
	}
});

Ztc.Views.KeywordListView = Backbone.View.extend({

	topTemplate: _.template($("#table_top_stats").html()),

	events: {
			"click .all-select": "selectAllKeywords"
	},

	initialize: function () {
		this.allCheckbox = this.$(".all-select")[0];
		this.selectedStats = this.$(".list-top-title");
		this.keywordTbody = this.$(".keywords-table").find("tbody");
		this.fragment = document.createDocumentFragment();

		this.listenTo(this.collection, "all", this.render);

	},

	render: function () {
		var selectedCount = this.collection.selected().length,
		    total = this.collection.length;

		this.selectedStats.html(this.topTemplate({selectedCount: selectedCount}));
		this.allCheckbox.checked = (selectedCount === total);
	},

	addOne: function (keyword) {
		var view = new KeyWordView({model: keyword});

		this.keywordTbody.append(view.render().el);
	},

	addAll: function (keywords) {
		
		keywords.each(function (keyword) {
    	
    	    var view = new Ztc.Views.KeywordView({model: keyword});

    	    this.fragment.appendChild(view.render().el);
        }, this);
		
		this.keywordTbody.append(this.fragment);
	},

	toggleDisplay: function () {
		this.$el.toggleClass("none");
	},

	bulidTable: function () {
		this.$el.find(".keywords-table").dataTable();
	},

	selectAllKeywords: function () {
		var isSelected = this.allCheckbox.checked;
		this.collection.each(function (keyword) {
			keyword.set({'selected': isSelected});
		});
	}
});