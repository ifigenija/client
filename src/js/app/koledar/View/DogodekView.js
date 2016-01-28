/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'moment',
    'i18next',
    'app/Max/View/Confirm',
    'app/koledar/Model/Alternacije',
    'app/koledar/Model/Dogodki',
    '../Model/Osebe',
    'app/Max/View/TabControl',
    'app/Dokument/View/DokumentView',
    'app/Zapisi/View/ZapisiLayout',
    './SodelujociView',
    './SodelujociOsebeView',
    './UrnikProstorView',
    'formSchema!dogodek',
    'template!../tpl/dogodek-dok.tpl',
    'template!../tpl/dogodek-form.tpl'
], function (
        Radio,
        moment,
        i18next,
        confirm,
        Alternacije,
        Dogodki,
        Osebe,
        TabControl,
        DokumentView,
        ZapisiLayout,
        SodelujociView,
        SodelujociOsebeView,
        UrnikProstorView,
        schemaDogodek,
        dokumentTpl,
        dogodekTpl
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
        className:'planer-dogodek',
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

        var gost, dezurni, sodelujoc;
        var razred = dogodek.get('razred');
        switch (razred) {
            case '100s':
                dezurni = true;
                break;
            case '200s':
                gost = true;
                break;
            case '300s':
                break;
            case '400s':
                sodelujoc = true;
                break;
            case '600s':
                sodelujoc = true;
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
                            var view = new SodelujociView({
                                alternacije: col,
                                osebe: kol,
                                dogodek: dogodek,
                                gost: gost,
                                dezurni: dezurni,
                                sodelujoc: sodelujoc
                            });
                            self.detailR.show(view);
                        },
                        error: Radio.channel('error').request('handler', 'flash')
                    });
                } else {
                    var view = new SodelujociOsebeView({
                        osebe: kol,
                        dogodek: dogodek,
                        gost: gost,
                        dezurni: dezurni,
                        sodelujoc: sodelujoc
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
        //console.log('onRazmnozi');
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
                niz += i18next.t('std.predstava');
                break;
            case '200s':
                niz += i18next.t('std.vaja');
                break;
            case '300s':
                niz += i18next.t('std.gostovanje');
                break;
            case '400s':
                niz += i18next.t('std.splosno');
                break;
            case '600s':
                niz += i18next.t('std.tehnicni');
                break;
        }

        return niz;
    };

    //tk
    DogodekView.prototype.setButtons = function () {


        console.log('---- seting buttons ----');

        console.log('this:');
        console.log(this);
        console.table(this);

        /*
         
         //C FormView.prototype.getToolbarModel
         
         var coll = this.getToolbarModel();
         
         //uredim
         
         var tb = this.getToolbarModel();
         var but = tb.getButton('doc-shrani');
         if (but && but.get('disabled')) {
         but.set({
         disabled: false
         });
         }
         
         
         
         console.log('Test:');
         console.log('Options: ');console.table(this.options);
         console.log('regionToolbar: ');
         console.table(this.regionToolbar);
         console.dir(this.regionToolbar);
         
         console.log(this.toolbarView);
         
         console.log('model:'); console.log(this.model);
         
         var status = this.model.get('status');
         console.log('status: ', status);
         
         //C odkrij delete tab button
         
         var tb = this.getToolbarModel();
         
         console.log('tb: ', this.toolbarView);
         */
    };

    return DogodekView;
});
