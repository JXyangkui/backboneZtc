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

    //localStorage: new Backbone.LocalStorage("ztc-backbone")
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

//tab body View....包含2个，一个隐藏一个显示
var SelectTabBd = Backbone.View.extend({

    events: {
        "click .selectbtn": "selectAjax",
        "click .export": "export",
        "click .copy": "copy",
        "click .btn-small": "toggleMoreOrLess"
    },

    selectAjax: function (e) {
        //ajax....request TODO...

        //response
        e = e || window.event;
        var target = e.target || e.srcElement;
        console.log(target);
        if (target.id === "quick_select_btn") {
            console.log("quick_select_btn");

            this.keyWordsForQuick = new KeyWordList(quickData);
            this.keyWordListForQuickView = new KeyWordListView({el: "#list_wrap_quick", collection: this.keyWordsForQuick});
            
            this.keyWordListForQuickView.addAll(this.keyWordsForQuick);
            
            this.keyWordListForQuickView.$el.removeClass("none");
            this.keyWordListForQuickView.bulidTable();

        } else if (target.id === "precise_select_btn") {
            console.log("precise_select_btn");

            this.keywordsForPrecise = new KeyWordList(preciseData);
            this.keyWordListForPreciseView = new KeyWordListView({el: "#list_wrap_precise", collection: this.keywordsForPrecise});

            this.keyWordListForPreciseView.addAll(this.keywordsForPrecise);
            this.keyWordListForPreciseView.$el.removeClass("none");
            this.keyWordListForPreciseView.bulidTable();
        }
    },

    export: function () {

    },

    copy: function () {

    },

    toggleMoreOrLess: function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;

        $(target).parents("ul").find(".hidden-li").toggleClass("none");
        $(target).parents("ul").find(".btn-small").toggleClass("none");
    }

});

//ItemWrap  包含: item table, tab-body 
var ItemWrapView = Backbone.View.extend({

    el: "#item_wrap",

    associationTmpl: _.template($("#association_tmpl").html()),

    events: {
         "click .toggle-tab ": "toggleTab"
    },

    initialize: function () {
        this.item = this.$el.find("#item");
        this.association = this.$el.find("#association");
        this.quickTabBd = new SelectTabBd({el: "#quick_tab_bd"});
        this.preciseTabBd = new SelectTabBd({el: "#precise_tab_bd"});
     },

    render: function (item) {
        var itemView = new ItemView({model: item});

        this.item.html(itemView.render().el);
        this.association.html(this.associationTmpl(item.toJSON().association));
    },

    toggleTab: function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.className.indexOf("bgwhite") === -1) {
            this.$el.find(".toggle-tab").toggleClass("white bgwhite");
            this.$el.find(".tab-bd").toggleClass("none");
            console.log("---------id:----" + target.id + "------------------");
            if (target.id === "quick_tab") {
                console.log("-------------quick_tab------------- -----");
                if (this.quickTabBd.keyWordListForQuickView) {
                    this.quickTabBd.keyWordListForQuickView.toggleDisplay();
                }
                if (this.preciseTabBd.keyWordListForPreciseView) {
                    this.preciseTabBd.keyWordListForPreciseView.toggleDisplay();
                }
            } else if (target.id === "precise_tab") {
                console.log("-------------precise_tab------------------");
                if (this.preciseTabBd.keyWordListForPreciseView) {
                    this.preciseTabBd.keyWordListForPreciseView.toggleDisplay();
                }
                
                if (this.quickTabBd.keyWordListForQuickView) {
                    this.quickTabBd.keyWordListForQuickView.toggleDisplay();
                }
            }
        }

    }
});