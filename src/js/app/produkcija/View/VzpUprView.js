/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'baseUrl',
    'i18next',
    'backbone',
    'marionette',
    'underscore',
    'template!../tpl/vzp-upr-item.tpl',
    'template!../tpl/vzp-upr.tpl'
], function (
        Radio,
        baseUrl,
        i18next,
        Backbone,
        Marionette,
        _,
        vzpUprItemTpl,
        vzpUprTpl
        ) {

    var VzpUprizoritevView = Marionette.ItemView.extend({
        tagName: 'span',
        className: 'vzp-uprizoritev',
        tempalte: vzpUprItemTpl,
        triggers: {
            'click .odstrani': 'odstrani'
        }
    });
    var VzpUprView = Marionette.CompositeView.extend({
        tagName: 'span',
        className: 'vzp-uprizoritve',
        template: vzpUprTpl,
        childViewContainer: 'vzp-upr-container',
        childView: VzpUprizoritevView,
        triggers: {
            'click .odstrani-vse': 'odstraniVse'
        },
        onChildviewOdstrani: function (child) {
            this.collection.remove(child.model);
        },
        onOdstraniVse: function () {
            this.collection.reset();
        }
    });
    return VzpUprView;
});