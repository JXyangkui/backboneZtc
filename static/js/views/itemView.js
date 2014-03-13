/* Item View */
define(function(require, exports, module) {

    var Backbone = require('Backbone'),
        Item_view;

    require('jQueryTmpl');
    Item_view = Backbone.View.extend({
        el: "#item",

        itemPropTemplate: _.template($("#item_table_tmpl").html()),

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {

            var propsArr = this.model.get('props_name'),
                tdStr = '',
                i, len;

            this.$el.html($("#item_table_tmpl").tmpl(this.model.toJSON()));

            for(i = 0, len = propsArr.length; i < len; i ++) {
                tdStr += '<td><div>' + propsArr[i] + '</div></td>';
                if (i % 3 === 2 || i === len -1) {
                    this.$("#props_tbody").append('<tr>' + tdStr + '</tr>');
                    tdStr = '';
                }
            }

            return this;
        }
    });

    module.exports = Item_view;
});