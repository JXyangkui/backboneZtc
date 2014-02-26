Ztc.Models.Selector = Backbone.Model.extend({

	defaults: function () {
		return {
			//以下数组按 min, max, currentMin顺序初始化,currentMax按max初始化
			matchIndex: {name: "匹配度", min: 400, max: 1000, values: [588, 1000], step: 1},
			competeIndex: {name: "竞争度", min: 1, max: 1500, values: [566, 1500], step: 1},
			clickIndex: {name: "点击指数", min: 0, max: 3000, values: [200, 3000], step: 1},
			pageView: {name: "展现指数", min: 1, max: 100000, values: [5000, 100000], step: 1},
			averagePrice: {name: "市场均价", min: 0.05, max: 10.00, values: [3.25, 10.00], step: 1}
		};
	}
});