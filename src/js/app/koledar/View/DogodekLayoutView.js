/* 
 * Licenca GPLv3
 */

define([
    'radio',
    'baseUrl',
    'i18next',
    'marionette',
    './DogodekView',
//    './VajaView',
//    './PredstavaView',
//    './ZasedenostView',
//    './SplosniDogodekView',
//    './GostovanjeView',
    './OsebaSelectView',
    'formSchema!dogodek',
    'template!../tpl/dogodekLayout.tpl',
    'app/Max/Model/MaxPageableCollection',
    'backbone'
], function (
        Radio,
        baseUrl,
        i18next,
        Marionette,
        DogodekView,
//        VajaView,
//        PredstavaView,
//        ZasedenostView,
//        SplosniDogodekView,
//        GostovanjeView,
        OsebaSelectView,
        schema,
        tpl,
        MaxPageable,
        Backbone
        ) {

    var DogodekLayoutView = Marionette.LayoutView.extend({
        template: tpl,
        className: 'row',
        schema: schema.toFormSchema().schema,
        regions: {
            dogodekR: '.region-dogodek',
            razredR: '.region-razred',
            osebaR: '.region-dogodek-oseba'
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
            this.renderOsebaSelect();
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
        this.osebaR.empty();
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

    DogodekLayoutView.prototype.renderOsebaSelect = function () {
//        this.OsebaModel = Backbone.DeepModel.extend({
//            urlRoot: baseUrl + '/rest/oseba'
//        });
//        var c = this.osebe = new MaxPageable([], {
//            model: this.OsebaModel,
//            state: {
//                perPage: 50
//            }
//        });
//        c.url = baseUrl + '/rest/oseba';
//
//        //query params potrebno določit
//        c.queryParams.dogodek = this.model.get('id');
//
//        var osv = new OsebaSelectView({
//            collection: c,
//            lookup: "oseba"
//        });
    };

    return  DogodekLayoutView;
});