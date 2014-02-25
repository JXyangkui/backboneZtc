/*
 * 整个body View ，用于全局控制
 */

Ztc.Views.ZtcView = Backbone.View.extend({
    el: $("body"),

	initialize: function () {
        //选词预览 所在节点
		this.header = this.$("header");

        //itemWrap =  itemView + selectModuleTabView
		this.itemWrapView = new Ztc.Views.ItemWrapView;
    },

	events: {
		"click #select_view_btn": "selectForView"
    },

	//选词预览按钮 点击事件
    selectForView: function () {
        var iptValue = this.$("#search_box").val(),
            id,
            itemModel;
        if (!iptValue || iptValue === "" || ! iptValue.match(/(id=)\d+/)) {
            alert("请填写正确的网址");
            return;
        }
        d = iptValue.match(/(id=)\d+/)[0].slice(3),
        itemModel = new Ztc.Models.Item().getItem(id);

    	//返回数据后 render,  Data:itemJSON
        this.itemWrapView.render(itemModel);
		this.itemWrapView.$el.show();
    }
});