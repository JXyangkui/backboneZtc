Ztc.Views.SelectorView = Backbone.View.extend({

	selectorTmpl: _.template($("#selector_tmpl").html()),

	render: function () {
		var moduleName = this.id.split("_")[0],
		    selectorObj = this.model.toJSON();

		this.$el.html(this.selectorTmpl({moduleName: moduleName, selector: selectorObj}));
		return this;
	},

	bulidSelectorSlider: function() {
		var that = this;
		_.each(this.model.attributes, function (value, key) {

			$(".slider-" + key).slider({
				min: value.min,
				max: value.max,
				values: value.values,
				step: value.step,
				slide: function (event, ui) {
					var as = $(event.target).children("a"),
                    showMin = $(this).parents(".slider-main").find(".show-min"),
                    showMax = $(this).parents(".slider-main").find(".show-max");

	                if (ui.values[0] === ui.value) {
	                    showMin.val(ui.values[0]);
	                    showMin.css("left", as[0].style.left);
	                } else {
	                    showMax.css("left", as[1].style.left);
	                    showMax.val(ui.values[1]);
	                }
				},

				stop: function (event, ui) {
					that.collection.filterKeywords(that.getSelectorMinMaxs());
				}
			});
		});

		$(".slider-main").each(function (index) {
            var slider = $(this).find(".slider"),
                as = $(slider).children("a"),
                showMax = $(this).find(".min-max").children(".show-max"),
                showMin = $(this).find(".min-max").children(".show-min");

            showMin.css("left", as[0].style.left ? as[0].style.left : "0%");
            showMax.css("left", as[1].style.left);
        });
	},

	getSelectorMinMaxs: function () {
		return {
			match: [this.$(".quick-matchIndex-min").val(), this.$(".quick-matchIndex-max").val()],
			compete: [this.$(".quick-competeIndex-min").val(), this.$(".quick-competeIndex-max").val()],
			click: [this.$(".quick-clickIndex-min").val(), this.$(".quick-clickIndex-max").val()],
			pv: [this.$(".quick-pageView-min").val(), this.$(".quick-pageView-max").val()],
			price: [this.$(".quick-averagePrice-min").val(), this.$(".quick-averagePrice-max").val()]
		};
	}
});