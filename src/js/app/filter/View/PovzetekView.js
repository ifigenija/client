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
        className: 'povzetek-item',
        template: Handlebars.compile('{{#if index}}, {{/if}}{{label}}'),
        serializeData: function () {
            return _.extend(this.model.toJSON(), {
                index: this.options.index
            });
        }
    });

    var PovzetekView = Marionette.CompositeView.extend({
        tagName: 'span',
        className: 'povzetek',
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

        this.collection.on('add remove reset', this.changeOstanek, this);
    };

    PovzetekView.prototype.getOstanek = function () {
        var dolzina = this.collection.length - this.stIzpisov;
        if (dolzina <= 0) {
            return 0;
        }
        return dolzina;
    };

    PovzetekView.prototype.getTitle = function () {
        var title = "";
        var coll = this.collection;
        
        coll.each(function (model) {
            title += model.get('label');
            var zadnji = coll.at(coll.length - 1);
            if (model.get('id') !== zadnji.id) {
                title += ', ';
            }
        });

        return title;
    };
    PovzetekView.prototype.serializeData = function () {
        return {
            dolzina: this.getOstanek(),
            title: this.getTitle()
        };
    };

    PovzetekView.prototype.changeOstanek = function () {
        var dolzina = this.getOstanek();
        var title = this.getTitle();

        if (dolzina > 0) {
            this.$('.povzetek-ostanek').html('(' + dolzina + ')');
            this.$('.povzetek-seznam').attr('title', title);
        } else {
            this.$('.povzetek-ostanek').html('');
            this.$('.povzetek-seznam').attr('title', '');
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



