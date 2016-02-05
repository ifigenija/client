/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'moment',
    'i18next',
    'backbone',
    'app/Max/View/Confirm',
    'app/koledar/Model/PlaniraneAlternacije',
    'app/koledar/Model/Dogodki',
    '../Model/Osebe',
    'app/Max/View/TabControl',
    'app/Dokument/View/DokumentView',
    'app/Zapisi/View/ZapisiLayout',
    './SodelujociView',
    './UrnikProstorView',
    './RazmnoziView',
    'formSchema!dogodek',
    'template!../tpl/dogodek-dok.tpl',
    'template!../tpl/dogodek-form.tpl',
    'options!dogodek.termini'
], function (
        Radio,
        moment,
        i18next,
        Backbone,
        confirm,
        Alternacije,
        Dogodki,
        Osebe,
        TabControl,
        DokumentView,
        ZapisiLayout,
        SodelujociView,
        UrnikProstorView,
        RazmnoziView,
        schemaDogodek,
        dokumentTpl,
        dogodekTpl,
        termini
        ) {
    /**
     * Vsi tabi, ki se bodo uporabilo, ko bo model imel id
     * @type Array
     */
    var tabVse = [
        {id: 'dogodek', name: i18next.t('dogodek.title'), event: 'dogodek'},
        {id: 'sodelujoci', name: i18next.t('dogodek.sodelujoci'), event: 'sodelujoci'},
        {id: 'priloge', name: i18next.t('dogodek.priloge'), event: 'priloge'}
    ];

    /**
     * Tabi, ki se bodo prikazali ko bo model nov(brez id)
     * @type Array
     */
    var tabNovi = [
        {name: i18next.t('dogodek.title'), event: 'dogodek'}
    ];
    /**
     * Dogodekview namenjen prikazu dogodka in razreda dogodka
     * 
     * @type @exp;DokumentView@call;extend
     */
    var DogodekView = DokumentView.extend({
        className: 'planer-dogodek',
        template: dokumentTpl,
        formTemplate: dogodekTpl,
        schema: schemaDogodek.toFormSchema().schema,
        regions: {
            tabsR: '.dogodek-tabs',
            detailR: '.region-detail',
            koledarR: '.region-koledar'
        },
        buttons: {
            'doc-razmnozi': {
                id: 'doc-razmnozi',
                label: 'Razmnoži',
                element: 'button-trigger',
                trigger: 'razmnozi',
                disabled: false
            },
            'doc-pregledan': {
                id: 'doc-pregledan',
                label: 'Pregledan',
                element: 'button-trigger',
                trigger: 'pregledan',
                disabled: true,
                hidden: true
            },
            'doc-zakljuci': {
                id: 'doc-zakljuci',
                label: 'Zaključi',
                element: 'button-trigger',
                trigger: 'zakljuci',
                disabled: true,
                hidden: true
            },
            'doc-odpovej': {
                id: 'doc-odpovej',
                label: 'Odpovej',
                element: 'button-trigger',
                trigger: 'odpovej',
                disabled: true,
                hidden: true
            },
            'doc-brisi': {
                id: 'doc-brisi',
                label: 'Briši',
                element: 'button-trigger',
                trigger: 'brisi',
                disabled: true,
                hidden: true
            },
            'doc-shrani': {
                id: 'doc-shrani',
                label: i18next.t('std.shrani'),
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            'doc-skrij': {
                id: 'doc-skrij',
                label: i18next.t('std.skrij'),
                element: 'button-trigger',
                trigger: 'skrij'
            },
            'doc-nasvet': {
                id: 'doc-nasvet',
                icon: 'fa fa-info',
                title: i18next.t('std.pomoc'),
                element: 'button-trigger',
                trigger: 'nasvet'
            }
        },
        triggers: {
            'click .prikazi-koledar': 'prikazi:koledar'
        }
    });
    /**
     * Overridana funkcija, ker ne želimo spremeniti urlja na strani
     * @returns {undefined}
     */
    DogodekView.prototype.posodobiUrlNaslov = function () {
    };

    /**
     * Kaj se bo zgodilo ob kliku na gumb zraven vnosnega polja za prostor
     * @returns {undefined}
     */
    DogodekView.prototype.onPrikaziKoledar = function () {
        var self = this;
        var coll = new Dogodki();
        var datum = moment(this.model.get('zacetek'));
        var dogodek = new Dogodki.prototype.model(this.model.get('dogodek'));

        var urnikProstorView = new UrnikProstorView({
            datum: datum,
            dogodek: dogodek,
            collection: coll
        });

        //ko se želi urnik zapret renderiramo formo in toolbar ter zbrišemo koledar
        urnikProstorView.on('zapri:urnik', function () {
            self.model.fetch({
                success: function () {
                    self.koledarR.empty();
                    self.renderFormAndToolbar();
                }
            });
        }, self);

        //ko narišemo izrisujemo koledar skrijemo formo in toolbar
        this.koledarR.show(urnikProstorView);
        this.regionForm.empty();
        this.regionToolbar.empty();
    };

    /**
     * 
     * @param {Array} options
     * @returns {undefined}
     */
    DogodekView.prototype.initialize = function (options) {
        this.model = options.model || this.model;
        this.schema = options.schema || this.schema;
        this.formTemplate = options.formTemplate || this.formTemplate;
    };

    /**
     * Kaj se zgodi ko se je view že vstavil v DOM
     * @returns {undefined}
     */
    DogodekView.prototype.onRender = function () {
        this.tabs = tabVse;
        this.renderTabs(this.tabs);
    };

    /**
     * deselect taba 
     * @returns {undefined}
     */
    DogodekView.prototype.deselectTab = function () {
        this.koledarR.empty();
        this.renderFormAndToolbar();
        this.$('.dogodek-panels .tab-pane').removeClass('active');
    };

    /**
     * Izris tabov
     * @returns {DogodekView_L11.TabControl}
     */
    DogodekView.prototype.renderTabs = function (tabs) {
        this.tabControl = new TabControl({tabs: tabs, listener: this});
        var tab = this.tabControl.findTab('dogodek');
        var razred = this.getRazredNiz();
        tab.set('name', razred);


        this.tabsR.show(this.tabControl);
        return this.tabControl;
    };

    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    DogodekView.prototype.onDogodek = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
    };

    /**
     * Klik na tab sodelujoči
     * @returns {undefined}
     */
    DogodekView.prototype.onSodelujoci = function () {
        this.deselectTab();
        this.$('.pnl-detail').addClass('active');
        this.renderSodelujoci();

    };
    /**
     * Klik na tab priloge
     * @returns {undefined}
     */
    DogodekView.prototype.onPriloge = function () {
        this.deselectTab();
        this.$('.pnl-detail').addClass('active');
        this.renderPriloge();

    };

    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    DogodekView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'Dogodek'
        });
        this.detailR.show(view);
    };

    /**
     * Izris sodelujociView
     * @returns {undefined}
     */
    DogodekView.prototype.renderSodelujoci = function () {
        var self = this;

        var uprizoritev = this.model.get('uprizoritev');
        var dogodek = new Dogodki.prototype.model(this.model.get('dogodek'));
        var osebe = new Osebe();

        var SodView = SodelujociView;
        var razred = dogodek.get('razred');
        switch (razred) {
            case '100s':
                SodView = SodelujociView.extend({
                    renderiraj: function () {
                        this.renderUmetniki();
                        this.renderTehnika();
                        this.renderSodelujoci();
                        this.renderDezurni();
                    }
                });
                break;
            case '200s':
                SodView = SodelujociView.extend({
                    renderiraj: function () {
                        this.renderUmetniki();
                        this.renderTehnika();
                        this.renderGosti();
                    }
                });
                break;
            case '300s':
                SodView = SodelujociView.extend({
                    renderiraj: function () {
                        this.renderSodelujoci();
                    }
                });
                break;
            case '400s':
                SodView = SodelujociView.extend({
                    renderiraj: function () {
                        this.renderSodelujoci();
                    }
                });
                break;
            case '600s':
                SodView = SodelujociView.extend({
                    renderiraj: function () {
                        this.renderSodelujoci();
                    }
                });
                break;
        }
        //pridobimo kolekcijo oseb
        osebe.fetch({
            success: function (kol) {
                //ob uspešnem fetchu izrišemo sodelujociview

                if (uprizoritev) {
                    var alternacije = this.collection = new Alternacije();
                    alternacije.queryParams.uprizoritev = uprizoritev;
                    alternacije.fetch({
                        success: function (col) {
                            var view = new SodView({
                                alternacije: col,
                                osebe: kol,
                                uprizoritev: uprizoritev,
                                dogodek: dogodek
                            });
                            self.detailR.show(view);
                        },
                        error: Radio.channel('error').request('handler', 'flash')
                    });
                } else {
                    var view = new SodView({
                        osebe: kol,
                        dogodek: dogodek
                    });
                    self.detailR.show(view);
                }
            }
        });
    };

    DogodekView.prototype.onBrisi = function (options) {
        var self = this;
        var brisi = function () {
            self.model.destroy({
                success: function () {
                    //alert('Dogodek izbrisan');
                    self.trigger('destroy:success');

                    self.trigger('skrij', self);
                }
            });
        };

        confirm({
            text: i18next.t('std.potrdiIzbris'),
            modalOptions: {
                title: "Briši postavko",
                okText: i18next.t("std.brisi")
            },
            ok: brisi
        });

    };

    //tk
    DogodekView.prototype.onOdpovej = function (options) {
        console.log('onOdpovej');
    };

    DogodekView.prototype.onZakljuci = function (options) {
        console.log('onZakljuci');
    };

    DogodekView.prototype.onRazmnozi = function (options) {
        
        var to_hours_minutes = function(terminObj) {
            
            var h = ('00'+terminObj.h).substr(-2);
            var m = ('00'+terminObj.m).substr(-2);
            return h + ':' + m;
        };
        
        var add_day = function(adate) {
            
            var nextDay = moment(adate).add(1, 'day').startOf('day');
            return nextDay;
        };
        
        var razmnoziView = new RazmnoziView({
            model: new Backbone.Model({
                id: this.model.get('dogodek').id,
                dni: ["1", "2", "3", "4", "5", "6", "7"],
                show_mode: '',
                termini: [
                    {kratica: "dop", ime: i18next.t('Dopoldan')},
                    {kratica: "pop", ime: i18next.t('Popoldan')},
                    {kratica: "zve", ime: i18next.t('Zvečer')}
                ],
                time_dop: to_hours_minutes(termini.dopoldanZacetek),
                time_pop: to_hours_minutes(termini.popoldanZacetek),
                time_zve: to_hours_minutes(termini.vecerZacetek),
                
                zacetek: add_day(this.model.get('zacetek'))
                
            })
        });
        
        //console.log('termini', termini);

        razmnoziView.on('preklici', function () {
            this.koledarR.empty();
            this.renderFormAndToolbar();
        }, this);
        
        razmnoziView.on('save:success', function () {
            this.koledarR.empty();
            this.trigger('skrij', this);
            //this.renderFormAndToolbar();
            
            Radio.channel('layout').command('osveziPlaner');
        }, this);

        //ko narišemo izrisujemo koledar skrijemo formo in toolbar
        this.koledarR.show(razmnoziView);
        this.regionForm.empty();
        this.regionToolbar.empty();
    };

    /**
     * Pridobi prevod razreda dogodka, za izpis v tabu
     * @returns {DokumentView@call;extend.prototype.getRazredNiz.niz}
     */
    DogodekView.prototype.getRazredNiz = function () {

        var razred = i18next.t(this.model.get('dogodek').razred);
        var niz = '';

        var uprizoritev = this.model.get('uprizoritev');
        if (uprizoritev) {
            niz += uprizoritev.label + ': ';
        }

        switch (razred) {
            case '100s':
                niz += i18next.t('dogodek.predstava');
                break;
            case '200s':
                niz += i18next.t('dogodek.vaja');
                break;
            case '300s':
                niz += i18next.t('dogodek.gostovanje');
                break;
            case '400s':
                niz += i18next.t('dogodek.splosno');
                break;
            case '600s':
                niz += i18next.t('dogodek.tehnicni');
                break;
        }

        return niz;
    };

    return DogodekView;
});
