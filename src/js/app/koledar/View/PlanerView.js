/* 
 * Licenca GPLv3
 */

define(['marionette',
    'backbone',
    'moment',
    'underscore',
    'jquery',
    '../Model/PlanerTeden',
    'app/Max/Module/Form',
    '../Model/Dogodki',
    '../Model/RazredDogodek',
    './DogodekView',
    './VajaView',
    './PredstavaView',
    './GostovanjeView',
    './SplosniView',
    './TehnicniView',
    'template!../tpl/planer-layout.tpl',
    'template!../tpl/planer-dan.tpl',
    'template!../tpl/planer-dogodek.tpl',
    'template!../tpl/planer-termin.tpl',
    'template!../tpl/planer-dogodkidan.tpl'
], function (Marionette,
        Backbone,
        moment,
        _,
        $,
        PlanerTeden,
        Form,
        Dogodki,
        RazredDogodek,
        DogodekView,
        VajaView,
        PredstavaView,
        GostovanjeView,
        SplosniView,
        TehnicniView,
        tpl,
        tplDan,
        tplDogodek,
        tplTermin,
        tplDogodkiDan
        ) {

    /**
     * Prikazuje posamezen dogodek 
     * @type @exp;Marionette@pro;ItemView@call;extend
     */
    var DogodekItemView = Marionette.ItemView.extend({
        className: 'planer-dogodek',
        template: tplDogodek,
        triggers: {
            'click': 'prikazi'
        },
        onPrikazi: function () {
            var dogodekModel = this.model;
            var razred = dogodekModel.get('razred');
            var modelT;

            if (razred === '100s') {
                modelT = new RazredDogodek({
                    id: dogodekModel.get('predstava'),
                    view: 'predstava'
                });
            } else if (razred === '200s') {
                modelT = new RazredDogodek({
                    id: dogodekModel.get('vaja'),
                    view: 'vaja'
                });
            } else if (razred === '300s') {
                modelT = new RazredDogodek({
                    id: dogodekModel.get('gostovanje'),
                    view: 'gostovanje'
                });

            } else if (razred === '400s') {
                modelT = new RazredDogodek({
                    id: dogodekModel.get('splosni'),
                    view: 'dogodekSplosni'
                });

            } else if (razred === '500s') {

            } else if (razred === '600s') {
                modelT = new RazredDogodek({
                    id: dogodekModel.get('tehnicni'),
                    view: 'dogodekTehnicni'
                });

            }
            var self = this;
            modelT.fetch({
                success: function () {
                    self.trigger('prikazi:dogodek', modelT);
                }
            });
        }
    });


    /**
     * Odgovoren za prika seznama dogodkov 
     * znotraj posameznega dela dneva 
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var DogodkiCompositeView = Marionette.CompositeView.extend({
        className: 'planer-dogodki',
        template: tplDogodkiDan,
        childViewContainer: ".childview-container",
        childView: DogodekItemView,
        triggers: {
            'click .dodaj-dogodek': 'dodaj:dogodek',
            'click .odstrani-dogodke': 'odstrani:dogodke'
        },
        onDodajDogodek: function () {

        },
        onOdstraniDogodke: function () {

        },
        onChildviewPrikaziDogodek: function (dogodekM, razredDogodkaM) {
            this.trigger('prikazi:dogodek', razredDogodkaM);
        }
    });

    /**
     * Prikazuje posamezni dan v planeru
     * Regije za tri dele dneva, popoldne, dopoldne, zvečer. 
     * 
     * 
     * @type @exp;Marionette@pro;LayoutView@call;extend
     */
    var DanView = Marionette.LayoutView.extend({
        className: 'planer-dan',
        template: tplDan,
        regions: {
            dopoldneR: '.region-dopoldne',
            popoldneR: '.region-popoldne',
            zvecerR: '.region-zvecer',
            detailR: '.region-detail'
        },
        onRender: function () {
            this.renderDopoldne();
            this.renderPopoldne();
            this.renderZvecer();
        },
        renderDopoldne: function () {
            var view = this.dopoldneView = new DogodkiCompositeView({
                collection: this.model.get('dopoldneColl')
            });
            view.on('prikazi:dogodek', this.prikaziDogodek, this);
            this.dopoldneR.show(view);
        },
        renderPopoldne: function () {
            var view = this.popoldneView = new DogodkiCompositeView({
                collection: this.model.get('popoldneColl')
            });
            view.on('prikazi:dogodek', this.prikaziDogodek, this);
            this.popoldneR.show(view);
        },
        renderZvecer: function () {
            var view = this.zvecerView = new DogodkiCompositeView({
                collection: this.model.get('zvecerColl')
            });
            view.on('prikazi:dogodek', this.prikaziDogodek, this);
            this.zvecerR.show(view);
        },
        prikaziDogodek: function (model) {
            var razred = model.get('dogodek').razred;
            var TipDogodkaView;
            if (razred === '100s') {
                TipDogodkaView = PredstavaView;
            } else if (razred === '200s') {
                TipDogodkaView = VajaView;
            } else if (razred === '300s') {
                TipDogodkaView = GostovanjeView;
            } else if (razred === '400s') {
                TipDogodkaView = SplosniView;
            } else if (razred === '500s') {
                this.onZasedenost(model);
                this.dogodekView.on('skrij', this.onPreklici, this);

            } else if (razred === '600s') {
                TipDogodkaView = TehnicniView;
            }
            var view = new DogodekView({
                model: model,
                TipDogView: TipDogodkaView,
                tipDogModel: model
            });
            view.on('skrij', function () {
                this.detailR.empty();
            }, this);
            this.detailR.show(view);
        }
    });


    /**
     * Odgovoren je za prika kolekcije dnevov
     * za obdobje, ki ga planer trenutno obdeluje
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */

    var TedenCollectionView = Marionette.CollectionView.extend({
        childView: DanView
    });

    var handleChangeTeden = function (e, form, datum) {
        form.getEditor('teden').setValue(datum.toISOString());
        setTimeout(function () {
            form.trigger("change");
        });
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    /**
     * 
     * @type @exp;Form@call;extend
     */
    var TerminView = Form.extend({
        template: tplTermin,
        events: {
            'click .nazaj-mesec': "nazajMesec",
            'click .naprej-mesec': "naprejMesec",
            'click .nazaj-teden': "nazajTeden",
            'click .naprej-teden': "naprejTeden"
        },
        schema: {
            teden: {type: 'DatePicker', validators: ['required'], editorAttrs: {class: 'form-control'}}
        },
        naprejMesec: function (e) {
            var v = moment(this.getValue('teden')).add(1, 'month');
            return handleChangeTeden(e, this, v);
        },
        nazajTeden: function (e) {
            var v = moment(this.getValue('teden')).subtract(1, 'week');
            return handleChangeTeden(e, this, v);
        },
        naprejTeden: function (e) {
            var v = moment(this.getValue('teden')).add(1, 'week');
            return handleChangeTeden(e, this, v);
        },
        nazajMesec: function (e) {
            var v = moment(this.getValue('teden')).subtract(1, 'month');
            return handleChangeTeden(e, this, v);
        }
    });


    /**
     * Layout za planer, ima regije za vnosno form termina in 
     * prikaz dogodkov tedna
     * 
     * @type @exp;Marionette@pro;LayoutView@call;extend
     */
    var PlanerView = Marionette.LayoutView.extend({
        template: tpl,
        regions: {
            tedenR: '.region-teden',
            terminR: '.region-termin'
        },
        onRender: function () {

            this.form = new TerminView({
                model: new Backbone.Model({
                    datum: moment().toISOString()
                })
            });

            this.form.on('change', this.naloziDogodke, this);

            this.terminR.show(this.form);
        },
        naloziDogodke: function () {
            var datum = moment(this.form.getEditor('teden').getValue());

            var planerTeden = new PlanerTeden();
            planerTeden.initTeden(moment(datum));

            var zacetek = moment(datum).startOf('week');
            var konec = moment(datum).endOf('week');

            this.collection = new Dogodki();
            this.collection.queryParams.zacetek = zacetek.toISOString();
            this.collection.queryParams.konec = konec.toISOString();

            var self = this;
            this.collection.fetch({
                success: function () {
                    self.collection.pretvoriVPlanerTeden(planerTeden);
                    var tedenView = new TedenCollectionView({
                        collection: planerTeden
                    });

                    self.tedenR.show(tedenView);
                }
            });
        }

    });

    return PlanerView;
});