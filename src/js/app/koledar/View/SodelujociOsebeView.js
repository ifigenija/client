/*
 * Licenca GPLv3
 */

define([
    'radio',
    'i18next',
    'backbone',
    'app/bars',
    'marionette',
    'underscore',
    'moment',
    'jquery',
    './SodelujociView',
    '../Model/TerminiStoritve',
    '../Model/Osebe'
], function (
        Radio,
        i18next,
        Backbone,
        Handlebars,
        Marionette,
        _,
        moment,
        $,
        SodelujociView,
        TerminiStoritve,
        Osebe
        ) {

    var SodelujociOsebeView = SodelujociView.extend({});
    /**
     * 
     * @param {Object} options
     * @param {String} options.uprizoritev  id uprizoritve
     * @returns {undefined}
     */
    SodelujociOsebeView.prototype.initialize = function (options) {
        this.osebe = options.osebe;
        this.dogodek = options.dogodek;
        this.osebeIz = new Osebe();
        this.osebeIzTS = new TerminiStoritve();
    };
    SodelujociOsebeView.prototype.onRender = function () {
        this.renderOsebe();
    };
    /**
     * Izris seznam izbranih umetnikov
     * @returns {undefined}
     */
    SodelujociOsebeView.prototype.renderOsebe = function () {

        var ItemView = Marionette.ItemView.extend({
            tagName: 'span',
            className: 'sodelujoc',
            template: Handlebars.compile('<label>{{ime}}</label>'),
            serializeData: function () {
                return{
                    ime: this.model.get('oseba').get('polnoIme')
                };
            }
        });
        //funkcija, ki jo prožimo ko kliknemo gumb uredi pri umetnikih
        var uredi = function ($el) {
            this.urediSeznam({
                izbraniTS: this.osebeIzTS,
                izbrani: this.osebeIz,
                mozni: this.osebe,
                $el: $el,
                tpl: Handlebars.compile('{{polnoIme}}')
            });
        };

        this.osebeView = this.renderSeznam({
            collection: this.osebeIzTS,
            naslov: i18next.t('Osebe'),
            childView: ItemView,
            uredi: uredi
        });

        this.gostiR.show(this.osebeView);
    };
    return SodelujociOsebeView;
});