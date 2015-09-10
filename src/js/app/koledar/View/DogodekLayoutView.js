/* 
 * Licenca GPLv3
 */

define([
    'radio',
    'i18next',
    'marionette',
    '../DogodekView',
    '../ZasedenostView',
    'formSchema!dogodek',
    'template!../tpl/dogodek-form.tpl'
], function (
        Radio,
        i18next,
        Marionette,
        DogodekView,
        ZasedenostView,
        schema,
        tpl
        ) {

    var DogodekLayoutView = Marionette.LayoutView.extend({
        template: tpl,
        className: 'row',
        schema: schema.toFormSchema().schema,
        regions: {
            dogodekR: '.region-dogodek',
            razredR: '.region-razred'
        }
    });
    
    DogodekLayoutView.prototype.initialize = function (options) {
        this.model = options.model | this.model;
    };

    DogodekLayoutView.prototype.onRender = function () {
        if (this.model.get('ime')) {
            this.renderDogodek();
            this.renderRazred();
        }
    };
    
    DogodekLayoutView.prototype.renderDogodek = function () {
        var view = new DogodekView({
            model: this.model
        });
        this.dogodekR.show(view);
    };
    
    /**
     * logika keri dogodek izriše
     * @returns {undefined}
     */
    DogodekLayoutView.prototype.renderRazred = function () {
        this.razredR.show();
    };
    
    DogodekLayoutView.prototype.renderVaja = function () {
        this.razredR.show();
    };
    DogodekLayoutView.prototype.renderPredstava = function () {
        this.razredR.show();
    };
    DogodekLayoutView.prototype.renderGostovanje = function () {
        this.razredR.show();
    };
    DogodekLayoutView.prototype.renderSplosni = function () {
        this.razredR.show();
    };
    DogodekLayoutView.prototype.renderZasedenost = function () {
        var zas = new ZasedenostView({
            model: this.model
        });
        this.razredR.show();
    };

    return  DogodekLayoutView;
});