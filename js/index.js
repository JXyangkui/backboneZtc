$(function () {
	
    var AppView = Backbone.View.extend({
    	el: $("body"),

    	initialize: function () {
    		this.header = this.$("header");

    		this.itemWrap = this.$("#item_wrap");
    		this.listWrapQuick = this.$("#list_wrap_quick");
    		this.listWraPrecise = this.$("#list_wrap_precise");
    	},

    	events: {
    		"click #select_view_btn": "selectForView"
    	},

    	//选词预览按钮 点击事件
    	selectForView: function () {
    	    //递交前检查url的合法性 TODO.....

    	    //返回数据后 render 
    	    Items.create(itemJSON);
    		this.itemWrap.show();
    	}
    });

    var App = new AppView,
        KeyWordListForQuick = new KeyWordListView({el: "#quick_keywords_list"}),
        KeyWordListForPrecise = new KeyWordListView({el: "#precise_keywords_list"});
});