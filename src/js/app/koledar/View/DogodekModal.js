/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'backbone-modal',
    'app/Max/Module/Form',
    'template!../tpl/dogodek-izbira.tpl',
    'template!../tpl/dogodek-modal.tpl',
    'moment',
    '../Model/RazredDogodek',
    '../Model/Dogodki',
    '../Model/TerminiStoritve'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        Modal,
        Form,
        izbiraTpl,
        modalTpl,
        moment,
        Dogodek,
        Dogodki,
        TerminiStoritve
        ) {
    var IzbiraView = Marionette.ItemView.extend({
        template: izbiraTpl,
        triggers: {
            'click .dogodek-vaja': 'render:vaja',
            'click .dogodek-predstava': 'render:predstava',
            'click .dogodek-zasedenost': 'render:zasedenost',
            'click .dogodek-gostovanje': 'render:gostovanje',
            'click .dogodek-splosni': 'render:splosni',
            'click .dogodek-tehnicni': 'render:tehnicni'
        }
    });

    var DogodekModalLayout = Marionette.LayoutView.extend({
        template: modalTpl,
        zacetek: moment(),
        konec: moment(),
        regions: {
            izbiraR: '.dogodek-region-izbira',
            podrobnoR: '.dogodek-region-podrobno'
        },
        initialize: function (options) {
            //dodaj default
            this.zacetek = options.zacetek || this.zacetek;
            this.konec = options.konec || this.konec;
            this.title = options.title || i18next.t('std.naslov');
        },
        onRender: function () {
            var view = new IzbiraView();

            view.on('render:vaja', this.onVaja, this);
            view.on('render:predstava', this.onPredstava, this);
            view.on('render:zasedenost', this.onZasedenost, this);
            view.on('render:gostovanje', this.onGostovanje, this);
            view.on('render:splosni', this.onSplosni, this);
            view.on('render:tehnicni', this.onTehnicni, this);

            this.izbiraR.show(view);
        },
        /**
         * 
         * @param {String} options.model: določimo url modela
         * @param {String} options.title: določimo title dogodka
         * @returns {undefined}
         */
        initModel: function (options) {
            var model = this.model = new Dogodek({
                view: options.view,
                zacetek: this.zacetek,
                konec: this.konec,
                title: options.title,
                status: options.status
            });

            return model;
        },
        onVaja: function () {
            this.initModel({
                view: 'vaja',
                title: 'Vaja',
                status: '100s'
            });
            this.renderIzbiraUprizoritve(i18next.t('vaja.title'));
        },
        onPredstava: function () {
            this.initModel({
                view: 'predstava',
                title: 'Predstava',
                status: '100s'
            });
            this.renderIzbiraUprizoritve(i18next.t('predstava.title'));
        },
        onTehnicni: function () {
            this.initModel({
                view: 'dogodekTehnicni',
                title: 'Tehnični',
                status: '100s'
            });
            this.preklici();
            this.trigger('potrdi:dogodek');
        },
        onSplosni: function () {
            this.initModel({
                view: 'dogodekSplosni',
                title: 'Splošni',
                status: '100s'
            });
            //this.preklici();
            //this.trigger('potrdi:dogodek');
            this.renderIzbiraProstora(i18next.t('predstava.title'));
        },
        onGostovanje: function () {
            this.initModel({
                view: 'gostovanje',
                title: 'Gostovanje',
                status: '100s'
            });
            this.preklici();
            this.trigger('potrdi:dogodek');
        },
        onZasedenost: function () {
            var model = this.model = new TerminiStoritve.prototype.model();

            if (this.zacetek) {
                model.set('planiranZacetek', this.zacetek);
            }
            model.set('planiranKonec', this.konec);

            //this.preklici();
            //this.trigger('potrdi:dogodek');
            this.renderIzbiraOsebe(i18next.t('predstava.title'));
            
        },
        renderIzbiraUprizoritve: function (title) {
            var sch = {type: 'Toone', targetEntity: 'uprizoritev', editorAttrs: {class: 'form-control'}, title: 'Uprizoritev'};
            var podrobnoView = new Form({
                template: Handlebars.compile('<form><div data-fields="uprizoritev"></div></form>'),
                schema: {
                    uprizoritev: sch
                }
            });
            var self = this;

            //določimo uprizoritev modelu
            podrobnoView.on('uprizoritev:change', function () {
                var podatki = podrobnoView.fields.uprizoritev.getValue();
                self.model.set('uprizoritev', podatki.id);
                self.model.set('title', podatki.label + (title ? ' : ' + title : i18next.t('dogodek.title')));
            }, this);

            this.podrobnoR.show(podrobnoView);
        },

        renderIzbiraProstora: function (title) {
            var sch = {type: 'Toone', targetEntity: 'prostor', editorAttrs: {class: 'form-control'}, title: 'Prostor'};
            var podrobnoView = new Form({
                template: Handlebars.compile('<form><div data-fields="prostor"></div></form>'),
                schema: {
                    prostor: sch
                }
            });
            var self = this;

            //določimo prostor modelu
            podrobnoView.on('prostor:change', function () {
                var podatki = podrobnoView.fields.prostor.getValue();
                self.model.set('prostor', podatki.id);
                self.model.set('title', podatki.label + (title ? ' : ' + title : i18next.t('dogodek.title')));
            }, this);

            this.podrobnoR.show(podrobnoView);
        },
        
        //tomaz
        renderIzbiraOsebe: function (title) {
            var sch = {type: 'Toone', targetEntity: 'oseba', editorAttrs: {class: 'form-control'}, title: 'Oseba'};
            var izbiraOsebeView = new Form({
                template: Handlebars.compile('<form><div data-fields="oseba"></div></form>'),
                schema: {
                    oseba: sch
                }
            });
            var self = this;
            console.log('izbiraOsebeView 1');

            //določimo osebo modelu
            //Uredi model, Tomaz
            izbiraOsebeView.on('oseba:change', function () {
                var podatki = izbiraOsebeView.fields.oseba.getValue();
                self.model.set('oseba', podatki.id);
                self.model.set('gost', true);
                self.model.set('title', podatki.label + (title ? ' : ' + title : i18next.t('dogodek.title')));
                
                console.log('izbiraOsebeView 2');
            }, this);
                     
            this.podrobnoR.show(izbiraOsebeView);
        },
        
        preklici: function () {
            this.podrobnoR.empty();
        }
    });
    return function (options) {

        var view = new DogodekModalLayout({
            zacetek: (options && options.zacetek) ? options.zacetek : moment(),
            konec: (options && options.konec) ? options.zacetek : moment(),
        });

        var DM = Modal.extend({
            className: 'dogodek-modal modal'
        });

        var modal = new DM({
            title: i18next.t("dogodek.dodajDogodek"),
            content: view,
            animate: true,
            okText: i18next.t("std.potrdi"),
            cancelText: i18next.t("std.preklici")
        });

        /**
         * iz modela tipa dogodka pridobimo model dogodek
         * @param {TipDogodkaModel} model
         * @returns {undefined}
         */
        var shraniRazredDogodka = function (model) {
            model.save({}, {
                success: function () {
                    options.cb(model);
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });
        };

        //Tomaz: Ta del bi bilo dobro komentirat
        var odpriDogodek = function () {
            
            
            var model = view.model;
            if (model.view === 'vaja' || model.view === 'predstava') {
            
                if (model.get('uprizoritev')) {
                    if (options.cb) {
                        shraniRazredDogodka(model);
                    }
                } else {
                    modal.preventClose();
                }
            } else {
                if (options.cb) {
                    shraniRazredDogodka(model);
                }
            }
        };

        var zapriModal = function () {
            odpriDogodek();
            modal.close();
        };

        view.on('potrdi:dogodek', zapriModal, this);

        modal.open(odpriDogodek);
        return modal;
    };
});