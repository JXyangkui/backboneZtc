define(function(require, exports, module) {

    var Backbone = require('Backbone'),
        Keyword_model = require('../models/keywordModel'),
        Keyword_view = require('../views/keywordView'),
        FixedHeader = require('FixedHeader'),
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
            this.dtable && this.dtable.fnDestroy();
            this.keywordTbody.empty();
            
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
            this.dtable = this.$(".keywords-table").dataTable({

                "bDeferRender": true,
                "aLengthMenu": [50, 100, 200],
                "iDisplayLength": 100,
                "bAutoWidth": false,
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_条",
                    "sZeroRecords": "没有找到符合条件的数据",
                    "sProcessing": "&lt;img src=’./loading.gif’ /&gt;",
                    "sInfo": "当前第 _START_ - _END_ 条　共计 _TOTAL_ 条",
                    "sInfoEmpty": "没有记录",
                    "sInfoFiltered": "(从 _MAX_ 条记录中过滤)",
                    "sSearch": "搜索：",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "前一页",
                        "sNext": "后一页",
                        "sLast": "尾页"
                    }
                },
                "sPaginationType": "full_numbers",
                "bSortClasses": false,
                "asStripeClasses": [],
                "aoColumns": [{
                    "sWidth": "40%"
                }, {
                    "sWidth": "15%" 
                }, {
                    "sWidth": "15%" 
                }, {
                    "sWidth": "15%" 
                }, {
                    "sWidth": "15%" 
                }, {
                    "sWidth": "0%" 
                }],

                "fnInitComplete": function(oSettings, json) {

                    var oTable = oSettings.oInstance;
                    var options = {zTop: 20};
                    var oFH = new FixedHeader(oTable, options);

                    if(oSettings.oFeatures.bDeferRender){
                        for (var i = 0; i < oSettings.aoDrawCallback.length; i++) {
                            if(oSettings.aoDrawCallback[i].sName === 'FixedHeader'){
                                var fhFn = oSettings.aoDrawCallback.splice(i, 1);
                                oSettings.aoDrawCallback.unshift(fhFn[0]);
                                break;
                            }
                        }
                    }
                    setTimeout(function(){
                        oFH.fnUpdate();
                    }, 1000);
                }
            });

        }

    });

    module.exports = KeywordList_view;
});