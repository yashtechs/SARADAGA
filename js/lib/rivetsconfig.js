define(["rivets", "backbone"], function(rivets, backbone) {
    rivets.configure({
        adapter: {
            subscribe: function(obj, keypath, callback) {
                if (obj instanceof Backbone.Collection) {
                    obj.on('add remove reset', function() {
                        callback(obj[keypath]);
                    });
                } else {
                    obj.on('change:' + keypath, function(m, v) {
                        callback(v);
                    });
                }
            },
            unsubscribe: function(obj, keypath, callback) {
                if (obj instanceof Backbone.Collection) {
                    obj.off('add remove reset', function() {
                        callback(obj[keypath]);
                    });
                } else {
                    obj.off('change:' + keypath, function(m, v) {
                        callback(v);
                    });
                }
            },
            read:function (obj, keypath) {
                if (obj instanceof Backbone.Collection) {
                    return obj["models"];
                } else {
                    return obj.get(keypath);
                }
            },
            publish:function (obj, keypath, value) {
                if (obj instanceof Backbone.Collection) {
                    obj["models"] = value;
                } else {
                    obj.set(keypath, value);
                }
            }
            /*read: function(obj, keypath) {
                var index = keypath.indexOf('.');
                if (obj instanceof Backbone.Collection) {
                    return obj["models"]
                }
                else if (index > -1) {
                    var pathA = keypath.slice(0, index);
                    var pathB = keypath.slice(index + 1);
                    return obj[pathA][pathB];
                } else {
                    return obj[keypath];
                }
            },
            publish: function(obj, keypath, value) {
                var index = keypath.indexOf('.');
                if (obj instanceof Backbone.Collection) {
                    obj["models"] = value;
                }
                else if (index > -1) {
                    var pathA = keypath.slice(0, index);
                    var pathB = keypath.slice(index + 1);
                    return obj[pathA][pathB] = value;
                } else {
                    return obj[keypath] = value;
                }
            }

            subscribe: function(obj, keypath, callback) {
                obj.on('change:' + keypath, callback)
            },
            unsubscribe: function(obj, keypath, callback) {
                obj.off('change:' + keypath, callback)
            },
            read: function(obj, keypath) {
                return obj.get(keypath)
            },
            publish: function(obj, keypath, value) {
                obj.set(keypath, value)
            }*/

        }
    });
	rivets.binders.tabtoggle = {
    publishes: true,
    bind: function (el) {
        var self=this, //adapter = this.view.adapters[this.key.interface],
    model = this.model,
    keypath = this.keypath;

        this.callback = function (e) {
            var $target = $(e.currentTarget),
                val;
            console.log($target);
            val = $target.data("tab-index");
            self.view.config.adapter.publish(model, keypath, val)
        }
        $(el).on('click', 'div:not(.active)', this.callback);
    },
    unbind: function (el) {
        $(el).off('click', 'div:not(.active)');
    },
    routine: function (el, value) {
        $(el).find('div[data-tab-index="' + value + '"]')
            .addClass('active').siblings().removeClass('active');
    }

};
rivets.formatters.eq = function (value, args) {
    return value == args;
};
    return rivets
});