/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'backbone',
    'underscore',
    'app/bars',
    'marionette',
    'jquery',
    './DogodekView',
    './VajaView'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Handlebars,
        Marionette,
        $,
        DogodekView,
        VajaView
        ) {

    var DogodekVajaView = DogodekView.extend({
        TipDogView: VajaView,
        tipDogModel: null
    });

    return DogodekVajaView;
});
