/* 
 * Licenca GPLv3
 */

define([
    'radio',
    'i18next',
    'marionette',
    './DogodekView',
    './VajaView',
    './PredstavaView',
    './ZasedenostView',
    './SplosniDogodekView',
    './GostovanjeView',
    'formSchema!dogodek',
    'template!../tpl/dogodekLayout.tpl'
], function (
        Radio,
        i18next,
        Marionette,
        DogodekView,
        VajaView,
        PredstavaView,
        ZasedenostView,
        SplosniDogodekView,
        GostovanjeView,
        schema,
        tpl
        ) {

    var DogodekLayoutView = Marionette.LayoutView.extend({
        template: tpl,
        className: 'row',
        schema: schema.toFormSchema().schema,
        regions: {
            dogodekR: '.region-dogodek-nekaj',
            razredR: '.region-razred'
        }
    });

    DogodekLayoutView.prototype.initialize = function (options) {
        if (options.model) {
            this.model = options.model;
        }
    };

    DogodekLayoutView.prototype.onRender = function () {
        if (this.model.get('title')) {
            this.renderDogodek();
            //this.renderRazred();
        }
    };

    DogodekLayoutView.prototype.renderDogodek = function () {
        var view = new DogodekView({
            formTitle: this.model.get('title'),
            model: this.model
        });

        view.on('preklici', this.onPreklici, this);
        view.on('brisi', this.onBrisi, this);

        this.dogodekR.show(view);
    };

    DogodekLayoutView.prototype.onPreklici = function () {
        this.dogodekR.empty();
        this.razredR.empty();
    };

    DogodekLayoutView.prototype.onBrisi = function () {
        this.onPreklici();
        this.trigger('brisi');
    };

    /**
     * logika keri dogodek izriše
     * @returns {undefined}
     */
    DogodekLayoutView.prototype.renderRazred = function () {
        var razred = this.model.razred;
        if (razred === '100s') {
            this.renderPredstava();
        } else if (razred === '200s') {
            this.renderVaja();
        } else if (razred === '300s') {
            this.renderGostovanje();
        } else if (razred === '400s') {
            this.renderSplosni();
        } else if (razred === '500s') {
            this.renderZasedenost();
        }
    };

    DogodekLayoutView.prototype.renderVaja = function () {
        var vaja = this.model.vaja;
        var view = new VajaView({id: vaja});
        this.razredR.show(view);
    };
    DogodekLayoutView.prototype.renderPredstava = function () {
        var predstava = this.model.predstava;
        var view = new PredstavaView({id: predstava});
        this.razredR.show(view);
    };
    DogodekLayoutView.prototype.renderGostovanje = function () {
        var gostovanje = this.model.gostovanje;
        var view = new GostovanjeView({id: gostovanje});
        this.razredR.show(view);
    };
    DogodekLayoutView.prototype.renderSplosni = function () {
        var splosni = this.model.splosni;
        var view = new SplosniDogodekView({id: splosni});
        this.razredR.show(view);
    };
    DogodekLayoutView.prototype.renderZasedenost = function () {
        var zesedenost = this.model.zesedenost;
        var view = new ZasedenostView({id: zesedenost});
        this.razredR.show(view);
    };

    return  DogodekLayoutView;
});