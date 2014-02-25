Ztc.Models.Item = Backbone.Model.extend({

	defaults: function () {

        return {
        	id:              "36562212670",
            title:           "title.....",
            link:            "http://XXX.com?id=888",
            imgSrc:          "http://img04.taobaocdn.com/bao/uploaded/i4/T.jpg_200x200.jpg",
            catalog:         "catalog....",
            price:           0.00,
            stock:           0,
            postFee:         0,
            type:            "种地类型",
            shape:           "形状",
            service:         "售后服务",
            certificate:     "证书",
            certificateSign: "证书认证标识",
            embed:           "镶嵌物",
            brand:           "品牌",
            goodNum:         "货号",
            priceZone:       [101, 1000],
            style:           "款式",
            association:     {
                aboutItem: ["翡翠", "手镯", "玉珠宝", "玉镯", "镯子"],
                modifier:  ["翡翠", "糯种", "包邮", "云南", "A货", "证书", "手镯", "镶嵌", "七彩", "天然", "圆条", "缅甸", "带证书", "镯子"]
            }
        };
    },

    // get item by id in url : http://detail.tmall.com/item.htm?id=36562212670  
    getItem: function (id) {
    	//TODO ... send ajax request
    	// $.getJSON("./source/jsonItem.js?jsoncallback=?",
    	//     {id:id}, 
    	//     function (data) {
    	//     	this.set(data);
    	// });
		this.set(Ztc.Source.itemJSON);
    	return this;
    }
});