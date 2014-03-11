define(function(require, exports, module) {

    var Backbone = require('Backbone'),
        Keyword_model = require('../models/keywordModel'),
        Keyword_view = require('../views/keywordView'),
        KeywordList_view;

    require('dataTables');
    KeywordList_view = Backbone.View.extend({

        el: '#list_wrap',

        initialize: function() {
            this.keywordTbody = this.$(".keywords-table").find("tbody");
            this.fragment = document.createDocumentFragment();

            this.listenTo(this.collection, "reset", this.render);
            this.keywordTbody.empty();
        },

        render: function() {
            this.addToTbody(this.collection);
            this.bulidTable();
        },

        addToTbody: function (keywords) {
        
            keywords.each(function (keyword) {
        
                var view = new Keyword_view({model: keyword});

                this.fragment.appendChild(view.render().el);

            }, this);

            this.keywordTbody.append(this.fragment);
        },

        bulidTable: function () {
            this.$(".keywords-table").dataTable();
        }

    });

    module.exports = KeywordList_view;
});