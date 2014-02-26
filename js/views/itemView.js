Ztc.Views.ItemView = Backbone.View.extend({

    tagName: "table",
    className: "tbl",
    id: "item_table",

    itemPropTemplate: _.template($("#item_table_tmpl").html()),

    render: function () {
        this.$el.html(this.itemPropTemplate(this.model.toJSON()));
        return this;
    }
});

Ztc.Views.ItemWrapView = Backbone.View.extend({

	el: "#item_wrap",

    associationTmpl: _.template($("#association_tmpl").html()),

    events: {
         "click .toggle-tab ": "toggleTab"
    },

    initialize: function () {
        this.item = this.$el.find("#item");
        this.association = this.$el.find("#association");

        //快速淘词tab切换搜索页
        this.quickTabBd = new Ztc.Views.SelectTabBd({el: "#quick_tab_bd"});
        //精准淘词tab切换搜索页
        this.preciseTabBd = new Ztc.Views.SelectTabBd({el: "#precise_tab_bd"});
     },

    render: function (item) {
        var itemView = new Ztc.Views.ItemView({model: item});

        //商品属性等的渲染
        this.item.html(itemView.render().el);
        //联想词的渲染
        this.association.html(this.associationTmpl(item.toJSON().association));
    },

    toggleTab: function (e) {

        e = e || window.event;
        var target = e.target || e.srcElement;

        if (target.className.indexOf("bgwhite") === -1) {
            this.$el.find(".toggle-tab").toggleClass("white bgwhite");
            this.$el.find(".tab-bd").toggleClass("none");

            if (this.quickTabBd.quickKeywordListView) {
                this.quickTabBd.quickKeywordListView.toggleDisplay();
            }
            if (this.preciseTabBd.preciseKeywordListView) {
                this.preciseTabBd.preciseKeywordListView.toggleDisplay();
            }
            
        }

    }
});

Ztc.Views.SelectTabBd = Backbone.View.extend({

    events: {
        "click .selectbtn": "selectAjax",
        "click .export": "export",
        "click .copy": "copy",
        "click .btn-small": "toggleMoreOrLess"
    },

    selectAjax: function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement,
			moduleName = target.id.split("_")[0];

		var keywords = (new Ztc.Collections.KeywordList).getKeywords(moduleName);// 这里还需要一些其他合适的参数

        this[moduleName + "KeywordListView"] = new Ztc.Views.KeywordListView({el: "#list_wrap_" + moduleName, collection: keywords});
        this[moduleName + "KeywordListView"].addToTbody(keywords);
        
        this[moduleName + "KeywordListView"].$el.removeClass("none");
        this[moduleName + "KeywordListView"].bulidTable();
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