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
    'template!../tpl/vrsta-filtra.tpl'
], function (
        Radio,
        i18next,
        Backbone,
        Marionette,
        _,
        $,
        itemTpl
        ) {

    var VrstaFiltraView = Marionette.LayoutView.extend({
        template: itemTpl,
        className: 'vrsta-filtra-item',
        regions: {
            seznamR: '.vrsta-filtra-seznam-region'
        },
        triggers: {
            'click .vrsta-filtra-brisi': 'brisi',
            'click .vrsta-filtra': 'uredi'
        }
    });

    VrstaFiltraView.prototype.serializeData = function () {

    };
    
    VrstaFiltraView.prototype.serializeData = function () {
        return _.extend(this.options, {
            icon: this.model.get('modelMozni').get('icon'),
            title: this.model.get('modelMozni').get('titel')
        });
    };

    VrstaFiltraView.prototype.onRender = function () {
        this.renderSeznam();
    };

    VrstaFiltraView.prototype.renderSeznam = function () {
        //this.seznamR.show();
    };

    VrstaFiltraView.prototype.onUredi = function () {
        var model = this.model;
        var $el = this.$el;
        var $e = $('<div class="selectlist-content"></div>');
        $('body').append($e);
        var modelM = model.get('modelMozni');

        var SelectView = modelM.get('SelectView');

        var view = new SelectView({
            collIzbrani: model.get('collIzbrani'),
            collMozni: modelM.get('podatki').collMozni,
            ItemView: modelM.get('ItemView'),
            itemTemplate: modelM.get('itemTemplate'),
            $anchor: $el,
            el: $e,
            title: "izbira oseb"
        });

        view.on('close', this.render);
        view.render();
    };

    VrstaFiltraView.prototype.onBrisi = function () {
        this.model.destroy();
    };

    return VrstaFiltraView;
});



