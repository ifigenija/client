/* 
 * Licenca GPLv3
 * 
 * @author Lovro Rojko
 */

define([
    'radio',
    'i18next',
    'backbone',
    'marionette',
    'app/bars',
    'underscore',
    'template!../tpl/povzetek.tpl'
], function (
        Radio,
        i18next,
        Backbone,
        Marionette,
        Handlebars,
        _,
        povzetekTpl
        ) {

    var ItemView = Backbone.Marionette.ItemView.extend({
        tagName: 'span',
        template: Handlebars.compile('{{#if index}}, {{/if}}{{label}}'),
        serializeData: function () {
            return _.extend(this.model.toJSON(), {
                index: this.options.index
            });
        }
    });

    var PovzetekView = Marionette.CompositeView.extend({
        tagName: 'span',
        template: povzetekTpl,
        childViewContainer: ".povzetek-seznam",
        childView: ItemView,
        childViewOptions: function (model, index) {
            return {
                index: index
            };
        }
    });

    PovzetekView.prototype.initialize = function (options) {
        this.stIzpisov = options.stIzpisov || 2;
        
        this.collection.on('add remove', this.changeOstanek, this);
    };

    PovzetekView.prototype.serializeData = function () {
        var self = this;

        return {
            dolzina: function () {

                var dolzina = self.collection.length - self.stIzpisov;
                if (dolzina <= 0) {
                    return 0;
                }
                return dolzina;
            }
        };
    };

    PovzetekView.prototype.changeOstanek = function () {
        var dolzina = this.collection.length - this.stIzpisov;
        if (dolzina > 0) {
            this.$('.povzetek-ostanek').html('(' + dolzina + ')');
        }else{
            this.$('.povzetek-ostanek').html('');
        }
    };

    PovzetekView.prototype.filter = function (child, index, collection) {
        if (index < this.stIzpisov && index >= 0) {
            return true;
        }
        return false;
    };

    return PovzetekView;
});



