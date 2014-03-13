/* Item model */
define(function(require, exports, module) {

    var Backbone = require('Backbone'),
        Item_mode;

    Item_mode = Backbone.Model.extend({

        defaults: function () {

            return {
                cid: null,
                price: null,
                title: null,
                num_iid: null,
                nick: null,
                property_alias: null,
                detail_url: null,
                pic_url: null,
                props_name: [],
                list_time: null,
                delist_time: null
            };
        },

        idAttribute: 'num_iid',

        getItemInfo: function (data) {

            //props_name: 20418023:157305307:主图来源:自主实拍图;20000:92958787:品牌:三分姿色;13021751:346516015:货号:SFZS13A0916;
            var props_name = '',
                propsArr = [],
                propsObj = {},
                _propsArr = [],
                propArr, i, len;

            if(data['props_name']) {
                props_name = data['props_name'];
                propsArr = props_name.split(';');
                for(i = 0, len = propsArr.length; i < len; i ++) {
                    propArr = propsArr[i].split(':');

                    if(propsObj[propArr[0]] && propsObj[propArr[0]].indexOf('...') === -1) {
                        propsObj[propArr[0]] += '...';
                    } else {
                        propsObj[propArr[0]] = propArr[2] + ':' + propArr[3];
                    }
                }
                i = 0;
                for(key in propsObj) {
                    if(key === '20518') {
                        continue;
                    }
                    _propsArr[i ++] = propsObj[key];
                }
                _propsArr[i] = propsObj['20518'] ? propsObj['20518'] : '';
                data['props_name'] = _propsArr;
            }
            this.set(data);

            return this;
        }

    });

    module.exports = Item_mode;
});