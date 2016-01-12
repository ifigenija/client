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
    'template!../tpl/seznamSodelujoci.tpl'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Handlebars,
        Marionette,
        sodelujociTpl
        ) {

    var ItemView = Marionette.ItemView.extend({
        tagName: 'span',
        className: 'sodelujoc',
        template: Handlebars.compile('<label>{{ime}}</label>'),
        serializeData: function () {
            return{
                ime: this.model.get('alternacija').get('oseba').label
            };
        }
    });

    var SeznamSodelujocihView = Marionette.CompositeView.extend({
        className: 'sodelujoci',
        template: sodelujociTpl,
        childView: ItemView,
        childViewContainer: '.sodelujoci-list',
        triggers: {
            'click .sodelujoci-uredi': 'uredi',
            'click .sodelujoci-podrobno': 'podrobno'
        },
        naslov: 'Naslov'
    });

    /**
     * 
     * @param {Object} options
     * @param {Collection} options.collection  collection modelov za prikaz v seznamu
     * @returns {undefined}
     */
    SeznamSodelujocihView.prototype.serializeData = function () {
        return {
            naslov: this.naslov
        };
    };
    SeznamSodelujocihView.prototype.initialize = function (options) {
        this.collection = options.collection || new Backbone.Collection();
        this.naslov = options.naslov || this.naslov;
        this.childview = options.childView || this.childView;
    };

    /**
     * Sprožimo uredi in pošljemo jquery element gumba kot parameter
     * @returns {undefined}
     */
    SeznamSodelujocihView.prototype.onUredi = function () {
        this.trigger('render:uredi', this.$('.sodelujoci-uredi'));
    };

    /**
     * Podatke v seznamu prikažemo na bolj podroben način
     * @returns {undefined}
     */
    SeznamSodelujocihView.prototype.onPodrobno = function () {
        console.log('podobno');
    };

    return SeznamSodelujocihView;
});