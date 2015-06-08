/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'backbone',
    'radio',
    'i18next',
    'baseUrl',
    'template!../tpl/pdPrva.tpl'
], function (
        Marionette,
        Backbone,
        Radio,
        i18next,
        baseUrl,
        tpl
        ) {

    var pdPrvaView = Marionette.LayoutView.extend({
        template: tpl,
        title: i18next.t('programDela.title')
    });
    
    return pdPrvaView;
});