var KeyWord = Backbone.Model.extend({
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
	toggle: function () {
		this.save({selected: !this.get("selected")});
	}
});

var KeyWordList = Backbone.Collection.extend({

	model: KeyWord,

	comparator: "showIndex",

	selected: function () {
		return this.where({selected: true});
	},

	unselected: function () {
		return this.where({selected: false});
	}
});

var keyWords = new KeyWordList;

var KeyWordView = Backbone.View.extend({

	tagName: "tr",
	template: _.template($("#keyword_template").html()),

	events: {
		"click .toggle": "toggleSelected"
	},

	initialize: function () {
		this.listenTo(this.model, "change:[selected]", this.render);
	},

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
			
		return this;
	},

	toggleSelected: function () {
		this.model.toggle();
	}
});

var KeyWordListView = Backbone.View.extend({

	topTemplate:    _.template($("#table_top_stats").html()),

	events: {
			"click .all-select": "selectAllKeywords"
	},

	initialize: function () {
		this.allCheckbox = this.$(".all-select");
		this.selectedStats = this.$(".list-top-title");
		this.keywordTbody = this.$(".keywords-table").find("tbody");
		this.fragment = document.createDocumentFragment();

		this.listenTo(keyWords, "add", this.addOne);
		this.listenTo(keyWords, "all", this.render);
		this.listenTo(keyWords, "reset", this.addAll);

		//keyWords.fetch();
	},

	render: function () {
		var selectedCount = keyWords.selected().length,
		    total = keyWords.length;

		this.selectedStats.html(this.topTemplate({selectedCount: selectedCount}));
		this.allCheckbox.checked = (selectedCount === total);
	},

	addOne: function (keyword) {
		var view = new KeyWordView({model: keyword});

		this.keywordTbody.append(view.render().el);
	},

    addToFragment: function (keyword) {
    	var view = new KeyWordView({model: keyword});
    	this.fragment.append(view.render().el);
    },

	addAll: function () {
		keyWords.each(this.addToFragment, this);

		this.keywordTbody.append(this.fragment);
	},

	selectAllKeywords: function () {
		var isSelected = this.allCheckbox.checked;
		keyWords.each(function (keyword) {
			keyword.save({"selected": isSelected});
		});
	}
});