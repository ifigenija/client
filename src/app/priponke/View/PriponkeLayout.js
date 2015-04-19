define(['application',
    'backbone',
    'marionette',
    'underscore',
    'text!../tpl/priponke.tpl',
    '../View/DodajDatoteko',
    '../Model/Datoteka',
    '../View/DatotekaDetail',
    '../View/DodajPriponko',
    '../View/FileManager',
    '../View/IzberiMapo',
    '../View/PriponkeList',
    '../Model/PriponkeCollection',
    '../Model/PriponkaMeta',
    '../Model/MapeModel'
],
        function (
                App,
                Backbone,
                Marionette,
                _,
                tpl,
                DodajDatoteko,
                Datoteka,
                DatotekaDetail,
                DodajPriponko,
                FileManager,
                IzberiMapo,
                PriponkeList,
                PriponkeCollection,
                PriponkaMeta,
                MapeModel) {

            return Marionette.Layout.extend({
                template: _.template(tpl),
                fetchMeta: false,
                events: {
                    'click .btn-dodaj-priponko': 'dodajPriponko',
                    'click .btn-brisi-priponko': 'brisiPriponko',
                    'click .btn-odstrani-povezavo': 'odstraniPovezavo',
                    'click .btn-uredi-priponko': 'urediPriponko'
                },
                regions: {
                    seznamPriponk: '#seznam-priponk',
                    priponkaPodrobno: '#priponka-podrobno',
                    fileManager: '#filemanager-container'
                },
                ui: {
                    btnDodaj: '.btn-dodaj-priponko',
                    btnBrisi: '.btn-brisi-priponko',
                    btnPovezava: '.btn-odstrani-povezavo',
                    btnUredi: '.btn-uredi-priponko',
                    btnZakleni: '.btn-zakleni-priponko',
                    pnlHeading: '#detail-heading',
                    detailPanel: '#detail-panel'
                },
                initialize: function (options) {
                    this.owner = options.owner;
                    this.ownerClass = options.ownerClass;
                    this.fetchMeta = options.fetchMeta || false;
                    this.eventPrefix = options.eventPrefix || 'priponke';
                    this.bind('priponka:refresh', this.priponkaRefresh, this);
                    this.kolekcija = new PriponkeCollection({}, {
                        owner: options.owner,
                        ownerClass: options.ownerClass
                    });
                    this.kolekcija.fetch();                    
                },
                metaReceived: function (model) {
                    var data = model.get('data');
                    var meta = model.get('meta');                    
                    this.$('.priponke-header').text(meta[0].label + ':' +  data[0].ident); 
                },
                prikaziSeznam: function (kolekcija) {
                    var plv = new PriponkeList({
                        collection: this.kolekcija
                    });
                    plv.bind('priponka:selected', this.priponkaSelect, this);
                    this.seznamPriponk.show(plv);
                    
                    if (this.fetchMeta) {
                        var meta = new PriponkaMeta({
                            id: this.owner
                        }, {
                            entity: this.ownerClass
                        });
                        _.bindAll(this, 'metaReceived');
                        meta.fetch({
                            success: this.metaReceived
                        });
                    }
                },
                dodajPriponko: function () {
                    var dodajPriponka = new DodajPriponko({
                        kolekcija: this.kolekcija,
                        owner: this.owner,
                        ownerClass: this.ownerClass
                    });
                    dodajPriponka.bind('priponka:refresh', this.priponkaRefresh, this);

                    this.postaviDetailView('Nova priponka', dodajPriponka);
                },
                datotekaDolocena: function (model) {
                    var self = this;
                    this.priponka.save({datoteka: model.id}, {
                        success: function (model, response) {

                            self.trigger('priponka:refresh');
                        },
                        error: App.FlashManager.fromXhr
                    });
                },
                brisiPriponko: function (model) {
                    var self = this;
                    this.priponka.destroy({
                        success: function (model, response) {

                            self.priponka = null;
                            self.trigger('priponka:refresh');
                        },
                        error: App.FlashManager.fromXhr
                    });
                },
                odstraniMapo: function (model) {
                    var self = this;
                    this.priponka.save({mapa: null}, {
                        success: function (model, response) {

                            self.trigger('priponka:refresh');
                        },
                        error: App.FlashManager.fromXhr
                    });
                },
                brisiDatoteko: function (model) {
                    var self = this;
                    model.brisi({
                        success: function (model, response) {
                            App.FlashManager.fromResponse(response);

                            self.priponka.fetch({
                                success: function (model1, response1) {
                                    self.trigger('priponka:refresh');
                                },
                                error: App.FlashManager.fromXhr
                            });
                        },
                        error: App.FlashManager.fromResponse,
                        odkod: 'Priponka',
                        kdo: this.priponka.id
                    });
                },
                prikaziDetail: function (priponka) {
                    var detail;
                    var self = this;
                    var heading;
                    var fmpanel = false;
                    if (priponka.get('jeMapa') === false) {
                        if (priponka.get('datoteka') !== null) {
                            heading = 'Lastnosti datoteke';
                            var datoteka = new Datoteka({id: priponka.get('datoteka')});
                            detail = new DatotekaDetail({
                                model: datoteka,
                                owningObject: priponka
                            });
                            var show = function (model) {
                                self.postaviDetailView(heading, detail);
                            };
                            datoteka.fetch({success: show});

                            detail.bind('datoteka:uredi', this.urediDatoteko, this);
                            detail.bind('datoteka:brisi', this.brisiDatoteko, this);
                            detail.bind('datoteka:uploaded', this.priponkaSelect, this);

                            return;
                        } else {
                            detail = new DodajDatoteko({priponka: priponka});
                            detail.bind('datoteka:izbrana', this.priponkaSelect, this);
                            heading = 'Dodaj datoteko';
                        }

                    } else {
                        if (priponka.get('mapa') !== null) {
                            fmpanel = true;
                            var mapa = new MapeModel.model({id: priponka.get('mapa')});
                            var mape = new MapeModel.collection([mapa], {model: MapeModel.model});
                            mape.parent = null;
                            detail = new FileManager({mape: mape, readOnly: true});
                            mapa.fetch({success: detail.render});
                        } else {
                            detail = new IzberiMapo({priponka: priponka,
                                vent: this.vent,
                                eventPrefix: 'priponka'
                            });
                            heading = 'Izberi pripeto mapo';
                            detail.bind('izbrana', this.mapaIzbrana, this);

                        }
                    }
                    this.nastaviGumbe(this.priponka);
                    this.postaviDetailView(heading, detail, fmpanel);

                },
                /**
                 * Osveži centralni view glede na to kaj je bilo izbrano v eventu.
                 * priponke list. Se uporablja, ko se  nastavi selected item s klikom uporabnika
                 
                 *
                 * @param priponka priponke , ki je izbran
                 * @returns this
                 */
                priponkaSelect: function (priponka) {
                    if (!priponka) {
                        return;
                    }
                    this.priponka = priponka;
                    this.prikaziDetail(priponka);
                    return this;
                },
                /**
                 * Osveži centralni view in nastavi potrebi nastavi selected v
                 * priponke list. Se uporablja, ko se programsko nastavi selected item v listu
                 * (ko se doda priponka)
                 *
                 * @param  select če je nastavljen pomeni, da se izbere ta model iz lista
                 * @returns this
                 */
                priponkaRefresh: function (select) {

                    if (select) {
                        this.priponka = select;
                    } else {
                        if (!this.priponka) {
                            this.priponka = this.kolekcija.first();
                        }
                    }
                    if (this.priponka) {
                        var pv = this.seznamPriponk.currentView;
                        pv.setSelected(this.priponka);
                        this.prikaziDetail(this.priponka);
                    } else {
                        this.priponkaPodrobno.close();
                    }
                },
                nastaviGumbe: function (priponka) {

                    var niPovezave = (priponka.get('datoteka') === null && priponka.get('mapa') === null);
                    this.ui.btnPovezava.prop('disabled', niPovezave);
                    this.ui.btnBrisi.prop('disabled', !niPovezave && !priponka.get('zaklenjena'));
                    this.ui.btnZakleni.prop('disabled', niPovezave);
                    if (priponka.get('zaklenjena')) {
                        this.ui.btnZakleni.find('i').removeClass('fa-lock');
                        this.ui.btnZakleni.find('i').addClass('fa-unlock');
                    } else {
                        this.ui.btnZakleni.find('i').addClass('fa-lock');
                        this.ui.btnZakleni.find('i').removeClass('fa-unlock');
                    }
                    this.ui.btnUredi.prop('disabled', !priponka.get('zaklenjena'));
                },
                mapaIzbrana: function (model) {
                    var self = this;
                    this.priponka.save({mapa: model.id}, {
                        success: function () {
                            self.trigger('priponka:refresh');
                        },
                        error: App.FlashManager.fromXhr
                    });
                },
                urediPriponko: function (event) {
                    var dodajPriponka = new DodajPriponko({
                        kolekcija: this.kolekcija,
                        priponka: this.priponka,
                        owner: this.owner,
                        ownerClass: this.ownerClass
                    });
                    dodajPriponka.bind('priponka:refresh', this.priponkaRefresh, this);
                    this.postaviDetailView('Uredi priponko', dodajPriponka);

                    return false;
                },
                /**
                 * Akcija, ki sproži urejanje datoteke.
                 * Obešena je na event datoteka:uredi v DatotekaDetail
                 * @param {type} model
                 * @returns {Boolean}
                 */
                urediDatoteko: function (model) {
                    var dodajDatoteko = new DodajDatoteko({
                        priponka: this.priponka,
                        model: model,
                        edit: true
                    });
                    this.ui.pnlHeading.html();
                    dodajDatoteko.bind('datoteka:izbrana', this.priponkaRefresh, this);
                    this.postaviDetailView('Uredi datoteko', dodajDatoteko);
                    return false;
                },
                postaviDetailView: function (heading, detail, fmPanel) {
                    this.ui.pnlHeading.html(heading);
                    if (fmPanel) {
                        this.priponkaPodrobno.close();
                        this.ui.detailPanel.hide();
                        this.fileManager.show(detail);
                    } else {
                        this.ui.detailPanel.show();
                        this.fileManager.close();
                        this.priponkaPodrobno.show(detail);
                    }
                }

            });
        });


