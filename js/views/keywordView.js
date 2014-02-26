
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
		this.model.toggleChecked();
	}
});

Ztc.Views.KeywordListView = Backbone.View.extend({

	topTemplate: _.template($("#table_top_stats").html()),
	sliderTop: _.template($("#selector_slider_stats_tmpl").html()),

	events: {
			"click .all-select": "selectAllKeywords"
	},

	initialize: function () {
		this.allCheckbox = this.$(".all-select")[0];
		this.selectedStats = this.$(".list-top-title");
		this.keywordTbody = this.$(".keywords-table").find("tbody");
		this.fragment = document.createDocumentFragment();

		this.listenTo(this.collection, "change", this.render);

	},

	render: function () {
		var selectedCount = this.collection.selected().length,
		    total = this.collection.length,
		    selectednum = this.collection.where({selected: true}).length;

		this.selectedStats.html(this.topTemplate({selectedCount: selectedCount}));
		this.allCheckbox.checked = (selectedCount === total);
		this.$el.parent().find(".selector-slider-top").html(this.sliderTop({total: total, selectedNum: selectednum}));

	},

	addToTbody: function (keywords) {
		
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
		this.$(".keywords-table").dataTable();
	},

	selectAllKeywords: function () {
		var isSelected = this.allCheckbox.checked;
		this.collection.each(function (keyword) {
			keyword.set({'selected': isSelected});
		});
	}
});