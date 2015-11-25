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
    'template!../tpl/izbiraFiltra-item.tpl'
], function (
        Radio,
        i18next,
        Backbone,
        Marionette,
        Handlebars,
        _,
        izbiraFiltraItemTpl
        ) {

    var ItemView = Backbone.Marionette.ItemView.extend({
        tagName: 'span',
        template: izbiraFiltraItemTpl,
        trigger:{
            click: 'izbira'
        }
    });

    var IzbiraFiltraView = Marionette.Collection.extend({
        tagName: 'span',
        childView: ItemView
    });

    IzbiraFiltraView.prototype.initialize = function (options) {
    };

    IzbiraFiltraView.prototype.onChildviewIzbira = function () {
        console.log('izbira');
    };

    return IzbiraFiltraView;
});



