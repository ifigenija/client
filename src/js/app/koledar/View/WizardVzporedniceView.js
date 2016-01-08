/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'baseUrl',
    'i18next',
    'app/bars',
    'backbone',
    'moment',
    'marionette',
    'underscore',
    'app/koledar/View/VzporedniceView',
    'jquery',
    'jquery.jsonrpc'
], function (
        Radio,
        baseUrl,
        i18next,
        Handlebars,
        Backbone,
        moment,
        Marionette,
        _,
        VzporedniceView,
        $
        ) {

    var WizerdVzporedniceView = VzporedniceView.extend({
    });

    /**
     * inicializacija collectiona Uprizoritev
     * V kolekcijo dodamo uprizoritev, ki jo trenutno gledamo
     * @param {type} options
     * @returns {undefined}
     */
    WizerdVzporedniceView.prototype.initialize = function (options) {
        VzporedniceView.prototype.initialize.apply(this, arguments);
        
        var zacetek = options.model.get('zacetek');
        var konec = options.model.get('konec');

        if (options && zacetek) {
            this.zacetek = moment(zacetek).toISOString();
        }

        if (options && konec) {
            this.konec = moment(konec).toISOString();
        }
    };

    /**
     * Funkcija se kliče, ko vzporedniceview/prekrivanjaView prožijo select oz takrak ko izberemo uprizoritev
     * @param {type} model
     * @returns {undefined}
     */
    WizerdVzporedniceView.prototype.onSelected = function (model) {
        if (!this.collectionUprizoritev.length) {
            this.collectionUprizoritev.add(model);
            this.$('.prikazi-prekrivanja').removeClass('hidden');
        }
    };

    return WizerdVzporedniceView;
});