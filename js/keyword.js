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
		console.log("-----toggle------");
		console.log(this);
		this.set({selected: !this.get("selected")});
		console.log(this);
	}
});

var KeyWordList = Backbone.Collection.extend({

	model: KeyWord,

	comparator: "showIndex",

	//localStorage: new Backbone.LocalStorage("ztc-backbone"),

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
		this.listenTo(this.model, "change", this.render);
	},

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
	    console.log("--------model---rerender---")
		return this;
	},

	toggleSelected: function () {
		console.log("---------toggleSelected-----");
		this.model.toggle();
	}
});

var KeyWordListView = Backbone.View.extend({

	topTemplate:    _.template($("#table_top_stats").html()),

	events: {
			"click .all-select": "selectAllKeywords"
	},

	initialize: function () {
		this.allCheckbox = this.$(".all-select")[0];
		this.selectedStats = this.$(".list-top-title");
		this.keywordTbody = this.$(".keywords-table").find("tbody");
		this.fragment = document.createDocumentFragment();

		//this.listenTo(keyWords, "add", this.addToFragment);
		this.listenTo(this.collection, "all", this.render);
		//this.listenTo(keyWords, "reset", this.addAll);

		//keyWords.fetch();
	},

	render: function () {
		var selectedCount = this.collection.selected().length,
		    total = this.collection.length;

		this.selectedStats.html(this.topTemplate({selectedCount: selectedCount}));
		this.allCheckbox.checked = (selectedCount === total);
	},

	addOne: function (keyword) {
		console.log("----addOne==");
		var view = new KeyWordView({model: keyword});

		this.keywordTbody.append(view.render().el);
	},

    addToFragment: function (keyword) {
    	
    	var view = new KeyWordView({model: keyword});

    	this.fragment.appendChild(view.render().el);
    },

	addAll: function (keywords) {
		
		keywords.each(this.addToFragment, this);
		
		this.keywordTbody.append(this.fragment);
	},

	toggleDisplay: function () {
		console.log(this.$el);
		this.$el.toggleClass("none");
	},

	bulidTable: function () {
		this.$el.find(".keywords-table").dataTable();
	},

	selectAllKeywords: function () {
		console.log("---------selectAll-------------");
		var isSelected = this.allCheckbox.checked;
		this.collection.each(function (keyword) {
			keyword.set({'selected': isSelected});
		});
	}
});