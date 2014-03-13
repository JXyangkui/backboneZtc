/*! mmui - v1.0.3 - 2013-06-09 */
define("lib/mmui/1.0.3/mmui", ["./position", "jquery", "./overlay", "./loading", "./popup"],
function(t, o) {
    o.Position = t("./position"),
    o.Overlay = t("./overlay"),
    o.Loading = t("./loading"),
    o.Popup = t("./popup")
}),
define("lib/mmui/1.0.3/position", ["jquery"],
function(t) {
    var o = t("jquery"),
    e = {};
    return e.pin = function(t, e) {
        var i = "VIEWPORT" === e ? o(window) : o(e),
        n = t.element,
        s = parseInt((i.width() - n.outerWidth()) / 2, 10),
        r = i.height() - n.outerHeight() - 40;
        r = (0 > r ? 0: parseInt(r / 2, 10)) + o(document).scrollTop(),
        n.css({
            top: r,
            left: s
        })
    },
    e.center = function(t, o) {
        o = o || "VIEWPORT",
        e.pin({
            element: t,
            pos: "center"
        },
        o)
    },
    e
}),
define("lib/mmui/1.0.3/overlay", ["jquery"],
function(t) {
    var o = t("jquery"),
    e = !window.XMLHttpRequest,
    i = function(t) {
        var e = {
            zIndex: 499
        };
        this.options = o.extend(e, t),
        this.init()
    };
    return i.prototype = {
        overlayer: null,
        masklayer: null,
        init: function() {
            this.overlayer = o('<div id="dm_window_overlay"></div>').appendTo("body").css("z-index", this.options.zIndex),
            e && (this.masklayer = o('<iframe id="dm_window_selectmask" frameborder="0" />').appendTo("body").css("z-index", this.options.zIndex - 1))
        },
        show: function() {
            this.overlayer.show(),
            this.masklayer && this.masklayer.show()
        },
        hide: function() {
            this.overlayer.hide(),
            this.masklayer && this.masklayer.hide()
        },
        destroy: function() {
            this.overlayer.remove(),
            this.masklayer && this.masklayer.remove()
        }
    },
    i
}),
define("lib/mmui/1.0.3/loading", ["jquery", "./position", "./overlay"],
function(t, o, e) {
    var i = t("jquery"),
    n = t("./position"),
    s = t("./overlay"),
    r = function(t, o) {
        this.text = t;
        var e = {
            zIndex: 1e3
        };
        this.options = i.extend(e, o),
        this.init()
    };
    r.prototype = {
        constructor: r,
        overlay: null,
        indicator: null,
        init: function() {
            this.overlay = new s({
                zIndex: this.options.zIndex
            }),
            this.indicator = i('<div class="mm-loading"><p>' + this.text + '</p><img src="/static/images/loading-bars.gif"></div>').appendTo("body").css("z-index", this.options.zIndex + 1),
            n.center(this.indicator)
        },
        hide: function() {
            this.overlay.destroy(),
            this.indicator.remove()
        }
    },
    e.exports = r
}),
define("lib/mmui/1.0.3/popup", ["jquery", "./position", "./overlay"],
function(t, o, e) {
    var i = t("jquery"),
    n = t("./position"),
    s = t("./overlay"),
    r = function(t, o) {
        this.options = o,
        this.$element = i(t)
    };
    r.prototype = {
        constructor: r,
        overlay: null,
        init: function() {
            var t = this.options,
            o = this;
            t.modal && (this.overlay = new s({
                zIndex: t.zIndex - 1
            }));
            var e = i('<div class="mm-popup"></div>').appendTo("body").addClass(t.themeClass).css("z-index", t.zIndex);
            if ("" != t.title) {
                var r = i('<div class="hd"><span class="title">' + t.title + "</span></div>").appendTo(e);
                t.closeIcon && i('<span class="close" title="关闭">&times;</span>').appendTo(r).click(function() {
                    "destroy" === t.closeMode ? o.destroy() : o.hide()
                })
            }
            if (this.$element.appendTo(e).addClass("bd"), t.buttons) {
                var a = i('<div class="ft"></div>').appendTo(e);
                i.isArray(t.buttons) || (t.buttons = Array(t.buttons));
                for (var p = 0; t.buttons.length > p; p++) {
                    var d = t.buttons[p];
                    if (oBtns = i.extend({
                        classname: "confirm",
                        trigger: "click"
                    },
                    d), !d.hasOwnProperty("text")) for (var l in d) oBtns.text = l,
                    oBtns.handler = d[l];
                    "string" == typeof oBtns.handler && "close" === oBtns.handler ? i('<span class="button cancel-button">' + oBtns.text + "</span>").appendTo(a).click(function() {
                        "destroy" === t.closeMode ? o.destroy() : o.hide()
                    }) : i('<span class="button ' + oBtns.classname + '-button">' + oBtns.text + "</span>").appendTo(a).on(oBtns.trigger, oBtns.handler)
                }
            }
            t.width || (t.width = this.$element.outerWidth()),
            e.css("width", t.width),
            t.height || (t.height = this.$element.outerHeight() + (r ? r.outerHeight() : 0) + (a ? a.outerHeight() : 0)),
            n.center(e),
            this.popuper = e
        },
        show: function() {
            this.popuper.show(),
            this.options.modal && this.overlay.show(),
            this.popuper.show()
        },
        hide: function() {
            this.popuper.hide(),
            this.options.modal && this.overlay.hide(),
            this.options.onHide && this.options.onHide.call(this)
        },
        destroy: function() {
            this.options.beforeClose && this.options.beforeClose(),
            this.popuper.remove(),
            this.options.modal && this.overlay.destroy(),
            this.$element.removeData("popup"),
            this.options.onDestroy && this.options.onDestroy.call(this)
        },
        rePosition: function() {
            n.center(this.popuper)
        }
    },
    i.fn.Popup = function(t) {
        return this.each(function() {
            var o = i(this),
            e = o.data("popup"),
            n = i.extend({},
            i.fn.Popup.defaults, o.data(), "object" == typeof t && t);
            e || o.data("popup", e = new r(this, n)),
            "string" == typeof t ? e[t]() : n.show && e.init()
        })
    },
    i.fn.Popup.defaults = {
        show: !0,
        modal: !1,
        themeClass: "mmpop-aero",
        position: null,
        posTarget: null,
        title: "",
        closeIcon: !0,
        zIndex: 500,
        closeMode: "destroy"
    },
    e.exports = r
});