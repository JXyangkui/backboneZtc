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

    require('cookie');
    require('showLoading');
    IndexView = Backbone.View.extend({
        el: 'body',

        events: {
            'click #select_view_btn': 'selectForView'
        },

        initialize: function() {
            this.url = 'http://' + location.host + '/ajax_get_keywords_suggest';
            this.itemView = new ItemView({model: new ItemModel()});
            this.keywordListView = new KeywordListView({collection: new KeywordCollection()});
            this.ajaxSetup();
        
            console.log(this.$('.footer').offset().top + ' ' + this.$('.footer')[0].offsetHeight);
            console.log(document.documentElement.clientHeight);
            this.setSectionHeight();
        },

        setSectionHeight: function() {
            var offsetTop = this.$('.footer').offset().top,
                offsetHeight = this.$('.footer')[0].offsetHeight,
                domClientHeight = document.documentElement.clientHeight;
            if ((offsetTop + offsetHeight) < domClientHeight) {
                this.$('#header').height(domClientHeight - offsetHeight);
            }
        },

        ajaxSetup: function() {

            var csrftoken = $.cookie('csrftoken');
            $.ajaxSetup({
                // obviates need for sameOrigin test
                crossDomain: false,
                cache: false,
                //解决IE浏览器下缓存的问题
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                // Ajax CSRFToken处理
                beforeSend: function(xhr, settings) {

                    if (!/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type)) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);

                    }
                },
                //Ajax 错误处理
                ajaxError: function(event, jqxhr) {
                    if(jqxhr.status !== 0) {
                        console.log('ajax: ' + jqxhr.status);
                    }
                }
            });
        },

        //选词预览按钮 点击事件
        selectForView: function () {
            this.$('#bd').hide();
            this.$('.fixedHeader').remove();
            this.setSectionHeight();
            this.$el.showLoading({'text': "正在加载数据"});

            var iptValue = this.$("#search_box").val(),
                self = this,
                id,
                itemModel;
            if (!iptValue || iptValue === "" || ! iptValue.match(/(id=)\d+/)) {
                alert("请填写正确的网址");
                return;
            }
            self.$("#bd").hide();

            id = iptValue.match(/(id=)\d+/)[0].slice(3);
 
            $.ajax({
                url: this.url,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({num_iid : parseInt(id, 10)}),
                success: function(data) {
                    self.itemView.model.getItemInfo(data.d.item_info);
                    self.keywordListView.collection.getKeywords(data.d.keywords_suggest);
                    self.$('#header').height(215);//还原高度
                    self.$("#bd").show();
                    self.$('.fixedHeader').show();
                    self.$el.hideLoading();
                },
                error: function(xhr) {
                    self.$el.hideLoading();
                }
            });

        }
    });

    module.exports = new IndexView();

});
