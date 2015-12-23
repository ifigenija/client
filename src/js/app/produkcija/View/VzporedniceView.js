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
    'app/koledar/View/SelectVzporedniceView',
    'app/koledar/View/SelectSodelujociView',
    './VzpUprView'
], function (
        Radio,
        baseUrl,
        i18next,
        Backbone,
        Marionette,
        _,
        SelectVzporedniceView,
        SelectSodelujociView,
        VzpUprView
        ) {
    var VzporedniceView = Marionette.LayoutView.extend({});
    return VzporedniceView;
});