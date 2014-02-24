$(function () {

    var AppView = Backbone.View.extend({
    	el: $("body"),

    	initialize: function () {
            //选词预览 所在节点
    		this.header = this.$("header");

            //itemWrap =  itemView + selectModuleView
    		this.itemWrapView = new ItemWrapView;
    	},

    	events: {
    		"click #select_view_btn": "selectForView"
    	},

    	//选词预览按钮 点击事件
    	selectForView: function () {
    	    //递交前检查url的合法性 TODO.....

    	    //返回数据后 render,  Data:itemJSON
    	    this.itemWrapView.render(new ItemModel(itemJSON));
    		this.itemWrapView.$el.show();
    	}
    });

    var App = new AppView;
    console.log("App-----start---now!")
});