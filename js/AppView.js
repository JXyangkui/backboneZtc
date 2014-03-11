/*
 * 整个body View ，用于全局控制
 */
define(function(require, exports, module) {

    var Backbone = require('Backbone'),
        ItemView = require('views/itemView'),
        ItemModel = require('models/itemModel'),
        KeywordListView = require('views/keywordListView'),
        KeywordCollection = require('collections/keywordCollection'),
        IndexView;

    IndexView = Backbone.View.extend({
        el: 'body',

        events: {
            'click #select_view_btn': 'selectForView'
        },

        initialize: function() {
            this.url = 'http://' + location.host + '/source/ajax_get_keywords_suggest.json';
            this.preValue = '';
        },

        //选词预览按钮 点击事件
        selectForView: function () {
            var iptValue = this.$("#search_box").val(),
                self = this,
                id,
                itemModel;
            if (!iptValue || iptValue === "" || ! iptValue.match(/(id=)\d+/)) {
                alert("请填写正确的网址");
                return;
            } else if(this.preValue === iptValue) {
                return;
            }
            this.preValue = iptValue;
            self.$("#bd").hide();
            //this.itemView = null;
            //this.keywordListView = null;
            this.itemView = new ItemView({model: new ItemModel()});
            this.keywordListView = new KeywordListView({collection: new KeywordCollection()});
            id = iptValue.match(/(id=)\d+/)[0].slice(3);


            $.ajax({
                url: this.url,
                type: 'get',
                dataType: 'json',
                data: {"num_iid" : id},
                success: function(data) {
                    self.itemView.model.getItemInfo(data.data.item_info);
                    self.keywordListView.collection.getKeywords(data.data.keywords);
                    self.$("#bd").show();
                }
            });

        }
    });

    module.exports = new IndexView();

});