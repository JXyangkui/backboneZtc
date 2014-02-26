Ztc.Collections.KeywordList = Backbone.Collection.extend({

	model: Ztc.Models.Keyword,

	comparator: "matchIndex",

	selected: function () {
		return this.where({selected: true});
	},

	//moduleName : quick  or   precise
	getKeywords: function (moduleName) {
		//send ajax.....

		this.set(Ztc.Source[moduleName + "Data"]);
		return this;
	},

	bulidSelector: function () {

		var minMax = this.getMinMaxInKeywords(this),
            newKeywords = this.slice(this.length - 211),
            selectorObj = {};

		minMaxFor211 = this.getMinMaxInKeywords(new Ztc.Collections.KeywordList(newKeywords));
		_.each(this.models, function (model, index) {
			if (index >= this.length - 211) {
			    model.set({"selected": true});
		    }
		}, this);

        selectorObj.matchIndex = {name: "匹配度", min: minMax.matchIndex[0], max: minMax.matchIndex[1], values: [minMaxFor211.matchIndex[0], minMaxFor211.matchIndex[1]], step: 1};
        selectorObj.competeIndex = {name: "竞争度", min: minMax.competeIndex[0], max: minMax.competeIndex[1], values: [minMaxFor211.competeIndex[0], minMaxFor211.competeIndex[1]], step: 1};
		selectorObj.clickIndex = {name: "点击指数", min: minMax.clickIndex[0], max: minMax.clickIndex[1], values: [minMaxFor211.clickIndex[0], minMaxFor211.clickIndex[1]], step: 1};
		selectorObj.pageView = {name: "展现指数", min: minMax.pageView[0], max: minMax.pageView[1], values: [minMaxFor211.pageView[0], minMaxFor211.pageView[1]], step: 1};
		selectorObj.averagePrice = {name: "市场均价", min: minMax.averagePrice[0], max: minMax.averagePrice[1], values: [minMaxFor211.averagePrice[0], minMaxFor211.averagePrice[1]], step: 0.05};

		return selectorObj;
	},

	//return:  Object
	getMinMaxInKeywords: function (Collection) {
		var sortFuc = function (a, b) {return a - b},
		    averagePrices = Collection.pluck("averagePrice").sort(sortFuc),
		    pageViews = Collection.pluck("pageView").sort(sortFuc),
		    clickIndexs = Collection.pluck("clickIndex").sort(sortFuc),
		    competeIndexs = Collection.pluck("competeIndex").sort(sortFuc),
		    matchIndexs = Collection.pluck("matchIndex").sort(sortFuc);

		averagePrices.splice(1, Collection.length - 2);
		pageViews.splice(1, Collection.length - 2);
		clickIndexs.splice(1, Collection.length - 2);
		competeIndexs.splice(1, Collection.length - 2);
		matchIndexs.splice(1, Collection.length - 2);

		return {
			averagePrice: averagePrices,
			pageView: pageViews,
			clickIndex: clickIndexs,
			competeIndex: competeIndexs,
			matchIndex: matchIndexs
		};
	},

	//  parameter: Object {match: [min,max]......}
	filterKeywords: function (minMaxs) {

		_.filter(this.models, function (model) {
		
			if (model.get("matchIndex") >= minMaxs.match[0] && model.get("matchIndex") <= minMaxs.match[1] &&
				model.get("competeIndex") >= minMaxs.compete[0] && model.get("competeIndex") <= minMaxs.compete[1] &&
				model.get("clickIndex") >= minMaxs.click[0] && model.get("clickIndex") <= minMaxs.click[1] &&
				model.get("pageView") >= minMaxs.pv[0] && model.get("pageView") <= minMaxs.pv[1] &&
				model.get("averagePrice") >= minMaxs.price[0] && model.get("averagePrice") <= minMaxs.price[1]){
			
			    model.set({selected: true});
		        return true;
			} else {

				model.set({selected: false});
				return false;
			}
		});
		console.log(this.where({selected: true}).length);
		return this;
	}
});