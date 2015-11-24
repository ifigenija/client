/* 
 * Licenca GPLv3
 * 
 * @author Lovro Rojko
 * 
 * Vhnodni podatki:
 *      vrste filtrov
 *      prednastavljeni filter
 *      {
 *      vrsta1:{ids:{}},
 *      vrsta2:{ids:{}}
 *      }
 *
 * Prikaz vrst filtrov
 * toolbar z gumboma dodaj vrsto filtra in ponastavi filtre
 * 
 * Izhodni podatki:
 *      {
 *      vrsta1:{ids:{}},
 *      vrsta2:{ids:{}}
 *      }
 */

define([
    'radio',
    'i18next',
    'backbone',
    'marionette',
    'underscore',
    'jquery',
    'template!../tpl/vrsta-filtra.tpl',
    './PovzetekView'
], function (
        Radio,
        i18next,
        Backbone,
        Marionette,
        _,
        $,
        itemTpl,
        PovzetekView
        ) {

    var AktivnaVrstaView = Marionette.LayoutView.extend({
        template: itemTpl,
        className: 'vrsta-filtra-item',
        regions: {
            povzetekR: '.vrsta-filtra-povzetek-region'
        },
        triggers: {
            'click .vrsta-filtra-brisi': 'brisi',
            'click .vrsta-filtra': 'uredi'
        }
    });

    AktivnaVrstaView.prototype.initialize = function (options) {
        this.PovzetekView = options.PovzetekView || PovzetekView;
    };

    AktivnaVrstaView.prototype.serializeData = function () {
        return _.extend(this.options, {
            icon: this.model.get('vrstaModel').get('icon'),
            title: this.model.get('vrstaModel').get('titel')
        });
    };

    AktivnaVrstaView.prototype.onRender = function () {
        this.renderPovzetek();
    };

    /**
     * Metoda prikaže view  povzetka izbranih modelov
     * @returns {undefined}
     */
    AktivnaVrstaView.prototype.renderPovzetek = function () {
        var view = new this.PovzetekView({
            collection: this.model.get('izbrani')
        });
        this.povzetekR.show(view);
    };

    /**
     * metoda odpre view za urejanje filtra
     * @returns {undefined}
     */
    AktivnaVrstaView.prototype.onUredi = function () {
        var model = this.model;
        var $el = this.$el;
        var $e = $('<div class="selectlist-content"></div>');
        $('body').append($e);
        var modelM = model.get('vrstaModel');

        var SelectView = modelM.get('SelectView');

        var view = new SelectView({
            izbrani: model.get('izbrani'),
            mozni: modelM.get('mozni'),
            ItemView: modelM.get('ItemView'),
            itemTemplate: modelM.get('itemTpl'),
            $anchor: $el,
            el: $e,
            title: "izbira oseb"
        });

        view.on('izbrane:vrednosti:filtra', this.izbraneVrednostiFiltra, this);
        view.render();
    };

    /**
     * metoda, ki proži trigger, da je filterIzbran
     * @returns {undefined}
     */
    AktivnaVrstaView.prototype.izbraneVrednostiFiltra = function () {
        this.trigger('izbrane:vrednosti:filtra');
    };

    /**
     * Metoda vrne izbrane vrednosti filtra
     * @returns {undefined}
     */
    AktivnaVrstaView.prototype.getIzbraneVrednosti = function () {
        this.model.get('izbrani');
    };

    /**
     * Metoda briše model
     * @returns {undefined}
     */
    AktivnaVrstaView.prototype.onBrisi = function () {
        this.model.destroy();
    };

    return AktivnaVrstaView;
});



