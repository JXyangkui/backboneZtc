var ItemModel = Backbone.Model.extend({

    defaults: function () {

        return {
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
    }
});

var ItemList = Backbone.Collection.extend({

    model: ItemModel,

    localStorage: new Backbone.LocalStorage("ztc-backbone")
});

var Items = new ItemList;

var ItemView = Backbone.View.extend({

    tagName: "table",
    className: "tbl",
    id: "item_table",

    itemPropTemplate: _.template($("#item_table_tmpl").html()),

    render: function () {
        this.$el.html(this.itemPropTemplate(this.model.toJSON()));
        return this;
    }
});

var ItemWrapView = Backbone.View.extend({

    el: "#item_wrap",

    associationTmpl: _.template($("#association_tmpl").html()),

    events: {
         "click .toggle-tab ": "toggleTab"
    },

    initialize: function () {
        this.item = this.$el.find("#item");
        this.association = this.$el.find("#association");
        this.quickTabBd = this.$el.find("#quick_tab_bd");
        this.preciseTabBd = this.$el.find("#precise_tab_bd");

        this.listenTo(Items, "add", this.render);
     },

    render: function (item) {
        console.log(item);
        var itemView = new ItemView({model: item});

        this.item.html(itemView.render().el);
        this.association.html(this.associationTmpl(item.toJSON().association));
    },

    toggleTab: function (e) {
        var target = $(e).target;
        this.$el.find(".toggle-tab").toggleClass("white bgwhite");
        this.$el.find(".tab-bd").toggleClass("none");
    }
});

var itemWrapView = new ItemWrapView;