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
    'underscore',
    'marionette',
    'jquery',
    'app/bars',
    'template!../tpl/filter.tpl',
    'template!../tpl/vrsta-filtra.tpl'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Marionette,
        $,
        Handlebars,
        tpl,
        itemTpl
        ) {

    var VrstaFiltraView = Marionette.ItemView.extend({
        template: itemTpl,
        className: 'vrsta-filtra-item',
        triggers: {
            'click .vrsta-filtra-brisi': 'brisi',
            'click .vrsta-filtra': 'uredi'
        }
    });

    var FilterView = Marionette.CompositeView.extend({
        template: tpl,
        className: 'filter-select',
        childViewContainer: '.region-vrste-filtra',
        triggers: {
            'click .vrsta-filtra-dodaj': 'dodaj',
            'click .vrsta-filtra-reset': 'ponastavi'
        }
    });

    /**
     * Poskrbeli bomo da lahko nastavljamo različne viewje kot optione
     * parametri
     *      - collection : collection aktivnih vrst filtra
     *      - collVrste: collection vrst filtra
     * @param Array options
     * @returns {undefined}
     */
    FilterView.prototype.initialize = function (options) {
        this.template = options.template || this.template;
        this.VrstaFiltraView = options.VrstaFiltraView || VrstaFiltraView;
        this.vrstaFiltraTpl = options.vrstaFiltraTpl || null;
        this.collVrste = options.collVrste || null;
        
        //izvedemo samo v primeru da imamo zunanji template brez podanega VrstaFiltraView-ja
        if (options.vrstaFiltraTpl && !options.VrstaFiltraView) {
            this.VrstaFiltraView = this.VrstaFiltraView.extend({
                template: this.vrstaFiltraTpl
            });
        }
    };

    FilterView.prototype.getChildView = function () {
        return VrstaFiltraView;
    };

    FilterView.prototype.onChildviewUredi = function (item) {
        var model = item.model;
        var $el = item.$el;
        var $e = $('<div class="selectlist-content"></div>');
        $('body').append($e);
        var modelM = model.modelMozni;
        
        var view = new modelM.SelectView({
            collIzbrani: model.collIzbrani,
            collMozni: modelM.podatki.collMozni,
            ItemView: modelM.ItemView,
            itemTemplate: modelM.itemTemplate,
            $anchor: $el,
            el: $e,
            title: "izbira oseb"
        });
        view.render();
    };

    FilterView.prototype.onChildviewBrisi = function (item) {
        this.collection.remove(item.model);
    };

    FilterView.prototype.onDodaj = function (item) {
        console.log('dodaj');
    };

    FilterView.prototype.onPonastavi = function (item) {
        console.log('ponastavi');
    };

    return FilterView;
});



