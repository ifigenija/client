/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'underscore',
    'marionette',
    'template!../tpl/vzpOpozorila.tpl'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        _,
        Marionette,
        opozorilaTpl
        ) {
    var OpozoriloView = Marionette.ItemView.extend({
        className: 'funkcija',
        template: Handlebars.compile('t1')
    });
    var OpozorilaView = Marionette.CompositeView.extend({
        className: 'alert alert-warning alert-dismissible',
        attributes: {
            role: "alert"
        },
        template: opozorilaTpl,
        childView: OpozoriloView,
        childViewContainer: '.opozorila-seznam',
        childViewOptions: {
            
        }
    });

    return OpozorilaView;
});