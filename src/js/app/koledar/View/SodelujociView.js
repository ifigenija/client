/*
 * Licenca GPLv3
 */

define([
    'radio',
    'i18next',
    'app/bars',
    'underscore',
    'marionette',
    'jquery',
    '../Model/TerminiStoritve',
    '../Model/PlaniraneAlternacije',
    '../Model/Osebe',
    './SeznamSodelujocihView',
    './UrnikTSView',
    'app/filter/View/DualListView',
    'template!../tpl/sodelujoci.tpl'
], function (
        Radio,
        i18next,
        Handlebars,
        _,
        Marionette,
        $,
        TerminiStoritve,
        Alternacije,
        Osebe,
        SeznamSodelujocihView,
        UrnikTSView,
        DualListView,
        sodelujociTpl
        ) {

    var pUmetniki = [
        'umetnik',
        'igralec'
    ];
    var pTehniki = [
        'inspicient',
        'tehnik',
        'sepetalec'
    ];
    var pSodelujoci = [
        'sodelujoc'
    ];
    var pGosti = [
        'gost'
    ];
    var pDezurni = [
        'dezurni'
    ];

    var SodelujociView = Marionette.LayoutView.extend({
        className: 'sodelujoci',
        template: sodelujociTpl,
        regions: {
            umetnikiR: '.region-umetniki-sodelujoci',
            tehnikiR: '.region-tehniki-sodelujoci',
            sodelujociR: '.region-sodelujoci-sodelujoci',
            gostiR: '.region-gosti-sodelujoci',
            dezurniR: '.region-dezurni-sodelujoci',
            koledarR: '.region-koledar-sodelujoci'
        }
    });
    /**
     * 
     * @param {Object} options
     * @param {String} options.uprizoritev  id uprizoritve
     * @returns {undefined}
     */
    SodelujociView.prototype.initialize = function (options) {
        this.alternacijeColl = options.alternacije || new Alternacije();
        this.dogodek = options.dogodek;

        //kolekcije brez predpone predstavljajo možne alternacije/osebe med katerimi lahko izbiramo
        this.umetniki = new Alternacije();
        this.umetniki.queryParams.uprizoritev = options.uprizoritev;
        this.umetniki.queryParams.podrocje = ['umetnik', 'igralec'];

        this.tehniki = new Alternacije();
        this.tehniki.queryParams.uprizoritev = options.uprizoritev;
        this.tehniki.queryParams.podrocje = ['sepetalec', 'inspicient', 'tehnik'];

        this.sodelujoci = options.osebe;
        this.gosti = options.osebe;
        this.dezurni = options.osebe;

        this.razdeliAlternacije();
    };

    /**
     * Termine storitve iz dogodkarazdelimo po področjih v tri različne kolekcije.
     * te kolekcije predstavljajo izbrane umetnike, tehnike in goste/dežurne/sodelujoče
     * @returns {undefined}
     */
    SodelujociView.prototype.razdeliTS = function (collection) {
        var tsPodrocja = collection.razdeliPoPodrocjih();

        this.iUmetniki = new Alternacije();
        this.iTehniki = new Alternacije();
        this.iSodelujoci = new Osebe();
        this.iGosti = new Osebe();
        this.iDezurni = new Osebe();

        // kolekcije s predpono "i" predstavljajo izbrane alternacije/osebe
        this.itsUmetniki = new TerminiStoritve();
        this.itsUmetniki.add(tsPodrocja.umetnik);
        this.itsUmetniki.add(tsPodrocja.igralec);
        this.iUmetniki.reset(this.itsUmetniki.toAlternacije());

        this.itsTehniki = new TerminiStoritve();
        this.itsTehniki.add(tsPodrocja.tehnik);
        this.itsTehniki.add(tsPodrocja.inspicient);
        this.itsTehniki.add(tsPodrocja.sepetalec);
        this.iTehniki.reset(this.itsTehniki.toAlternacije());

        this.itsSodelujoci = new TerminiStoritve();
        this.itsSodelujoci.add(tsPodrocja.sodelujoci);
        this.iSodelujoci.reset(this.itsSodelujoci.toOsebe());

        this.itsGosti = new TerminiStoritve();
        this.itsGosti.add(tsPodrocja.gosti);
        this.iGosti.reset(this.itsGosti.toOsebe());

        this.itsDezurni = new TerminiStoritve();
        this.itsDezurni.add(tsPodrocja.dezurni);
        this.iDezurni.reset(this.itsDezurni.toOsebe());
    };
    /**
     * V tej funkciji inicializiramo 2 kolekciji ki predstavljajo alternacije umetnikov in tehnikov,
     * ter kolekcijo gostov/dežurni/sodelujoči, ki predstavljajo osebe.
     * Prav tako inicializiramo 3 prazne kolekcije v katerih bomo izbra
     * @returns {undefined}
     */
    SodelujociView.prototype.razdeliAlternacije = function () {
        var modeli = this.alternacijeColl.razdeli();

        this.umetniki.reset();
        this.umetniki.add(modeli.umetnik);
        this.umetniki.add(modeli.igralec);

        this.tehniki.reset();
        this.tehniki.add(modeli.tehnik);
        this.tehniki.add(modeli.inspicient);
        this.tehniki.add(modeli.sepetalec);

    };
    /**
     * Funkcija se overrida da dosežemo različne načine izrisa sodelujočih
     * @returns {undefined}
     */
    SodelujociView.prototype.renderiraj = function () {
        this.renderUmetniki();
        this.renderTehnika();
        this.renderSodelujoci();
        this.renderGosti();
        this.renderDezurni();
    };
    SodelujociView.prototype.onRender = function () {
        var self = this;
        this.tsColl = new TerminiStoritve();
        this.tsColl.queryParams.dogodek = this.dogodek.get('id');

        this.tsColl.fetch({
            success: function () {
                self.razdeliTS(self.tsColl);
                self.renderiraj();
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });
    };

    /**
     * Izris seznam izbranih umetnikov
     * @returns {undefined}
     */
    SodelujociView.prototype.renderUmetniki = function () {
        var self = this;
        //funkcija, ki jo prožimo ko kliknemo gumb uredi pri umetnikih
        var uredi = function ($el) {
            self.razdeliTS(self.tsColl);

            this.urediSeznam({
                itsIzbrani: this.itsUmetniki,
                izbrani: this.iUmetniki,
                mozni: this.umetniki,
                $el: $el,
                tpl: Handlebars.compile('{{oseba.label}}({{funkcija.label}})')
            });
        };

        this.umetnikiView = this.renderSeznam({
            naslov: i18next.t('terminStoritve.umetniki'),
            uredi: uredi,
            podrocja: pUmetniki
        });

        this.umetnikiR.show(this.umetnikiView);
    };
    /**
     * Izris seznam izbranih tehnikov
     * @returns {undefined}
     */
    SodelujociView.prototype.renderTehnika = function () {
        //funkcija, ki jo prožimo ko kliknemo gumb uredi pri tehniki
        var uredi = function ($el) {
            this.urediSeznam({
                itsIzbrani: this.itsTehniki,
                izbrani: this.iTehniki,
                mozni: this.tehniki,
                $el: $el,
                tpl: Handlebars.compile('{{oseba.label}}({{funkcija.label}})')
            });
        };
        this.tehnikiView = this.renderSeznam({
            naslov: i18next.t('terminStoritve.tehniki'),
            uredi: uredi,
            podrocja: pTehniki
        });
        this.tehnikiR.show(this.tehnikiView);
    };

    /**
     * Izris seznam izbranih gostov
     * @returns {undefined}
     */
    SodelujociView.prototype.renderSodelujoci = function () {
        //funkcija, ki jo prožimo ko kliknemo gumb uredi pri sodelujocih
        var uredi = function ($el) {
            this.urediSeznam({
                itsIzbrani: this.itsSodelujoci,
                izbrani: this.iSodelujoci,
                mozni: this.sodelujoci,
                $el: $el,
                tpl: Handlebars.compile('{{polnoIme}}'),
                sodelujoc: true
            });
        };

        this.sodelujociView = this.renderSeznam({
            naslov: i18next.t('terminStoritve.sodelujoci'),
            uredi: uredi,
            podrocja: pSodelujoci
        });

        this.sodelujociR.show(this.sodelujociView);
    };
    /**
     * Izris seznam izbranih gostov
     * @returns {undefined}
     */
    SodelujociView.prototype.renderGosti = function () {
        //funkcija, ki jo prožimo ko kliknemo gumb uredi pri gostih
        var uredi = function ($el) {
            this.urediSeznam({
                itsIzbrani: this.itsGosti,
                izbrani: this.iGosti,
                mozni: this.gosti,
                $el: $el,
                tpl: Handlebars.compile('{{polnoIme}}'),
                gost: true
            });
        };

        this.gostiView = this.renderSeznam({
            naslov: i18next.t('terminStoritve.gosti'),
            uredi: uredi,
            podrocja: pGosti
        });

        this.gostiR.show(this.gostiView);
    };
    /**
     * Izris seznam izbranih dezurni
     * @returns {undefined}
     */
    SodelujociView.prototype.renderDezurni = function () {
        //funkcija, ki jo prožimo ko kliknemo gumb uredi pri dezurnih
        var uredi = function ($el) {
            this.urediSeznam({
                itsIzbrani: this.itsDezurni,
                izbrani: this.iDezurni,
                mozni: this.dezurni,
                $el: $el,
                tpl: Handlebars.compile('{{polnoIme}}'),
                dezurni: true
            });
        };

        this.dezurniView = this.renderSeznam({
            naslov: i18next.t('terminStoritve.dezurni'),
            uredi: uredi,
            podrocja: pDezurni
        });

        this.dezurniR.show(this.dezurniView);
    };

    /**
     * Funkcija namenjena izrisu seznamaSodelujocihView
     * @param {type} options
     * @returns {undefined}
     */
    SodelujociView.prototype.renderSeznam = function (options) {
        var view = new SeznamSodelujocihView({
            collection: this.tsColl,
            naslov: options.naslov,
            childView: options.childView,
            podrocja: options.podrocja
        });
        view.on('uredi:seznam', options.uredi, this);
        view.on('uredi:TS', this.urediTS, this);
        view.on('razdeljen:TS', this.onRazdeljenTS, this);
        return view;
    };

    /**
     * Ob kliku na gum uredi se nam odpre dualListView. Namen je da izberemo alternacije/osebe, ki bodo povabljene na dogodek.
     * @param {Object} options
     * @param {Object} options.izbrani      koleckcija alternacija ali oseb, ki so trenutno izbrani
     * @param {Object} options.mozni        kolekcija alternacij in oseb, med katerimi lahko izbiramo
     * @param {Object} options.tpl          template za izpis modelov alternacij/oseb v seznamih dual lista
     * @param {Object} options.$el          jquery objekt elementa, ki je pod katerim se naj izriše dualListView
     * @param {Object} options.izbraniTS    kolekcija terminov storitev trenutno izbranih alternacij/oseb
     * 
     * @returns {undefined}
     */
    SodelujociView.prototype.urediSeznam = function (options) {
        var $e = $('<div class="selectlist-content"></div>');
        $('body').append($e);
        var view = new DualListView({
            izbrani: options.izbrani,
            mozni: options.mozni,
            itemTemplate: options.tpl,
            $anchor: options.$el,
            el: $e,
            title: i18next.t('std.izbiraOseb')
        });

        // ko dual list proži changed:vrednosti se kolekcija alternacij/oseb pretvori v polje objektov TS
        var self = this;
        //onclose proži changed:vrednosti
        view.on('changed:vrednosti', function () {
            self.trigger('changed:vrednosti');
            var tsModeli = options.izbrani.toTS({
                dogodek: this.dogodek,
                zacetek: this.dogodek.get('zacetek'),
                konec: this.dogodek.get('konec'),
                gost: options.gost || false,
                sodelujoc: options.sodelujoc || false,
                dezurni: options.dezurni || false,
                coll: this.tsColl
            });

            //poskrbimo da izbrišemo samo termine od oseb, ki niso povabljene na dogodek
            //preveri kako se obnaša pri več alternacijah z isto osebo
            var polje = [];
            options.itsIzbrani.each(function (model) {
                var pusti = false;
                for (var k in tsModeli) {
                    var tsm = tsModeli[k];
                    if (tsm && tsm.oseba) {
                        var osebaId = tsModeli[k].oseba.id;
                        var oId = model.get('oseba').id;
                    }
                    if (tsm && tsm.alternacija) {
                        var alterId = tsModeli[k].alternacija.id;
                        var aId = model.get('alternacija').id;
                    }

                    if (osebaId === oId && alterId === aId) {
                        pusti = true;
                        break;
                    } else if (osebaId === oId && tsModeli[k].alternacija === null) {
                        pusti = true;
                        break;
                    }
                }
                if (!pusti) {
                    polje.push(model);
                }
            });

            //odstrani vse prej dodane termine storitve in dodana samo tiste ki smo jih izbrali
            self.tsColl.remove(polje);
            self.tsColl.add(tsModeli);
            var terminiStoritve = self.tsColl.toJSON();
            self.azurirajTsDogodka(self.dogodek.get('id'), terminiStoritve);
        }, this);

        view.render();
    };

    /**
     * Funkcija namenjena urejanju terminovstoritev izbranih alternacij/oseb
     * @param {terminiStoritve} collection
     * @returns {undefined}
     */
    SodelujociView.prototype.urediTS = function (collection) {
        if (collection.length) {
            var coll = new TerminiStoritve();

            var urnikTSView = new UrnikTSView({
                dogodek: this.dogodek,
                terminiStoritve: collection,
                collection: coll
            });

            urnikTSView.on('zapri:urnik', function () {
                this.koledarR.empty();
                this.razdeliTS(this.tsColl);
                this.renderiraj();
            }, this);

            this.koledarR.show(urnikTSView);
            this.umetnikiR.empty();
            this.tehnikiR.empty();
            this.sodelujociR.empty();
            this.gostiR.empty();
            this.dezurniR.empty();
        }
    };
    SodelujociView.prototype.azurirajTsDogodka = function (dogodekId, terminiStoritve) {

        var self = this;

        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/koledar/dogodek'});
        rpc.call('azurirajTSDogodka', {
            'dogodekId': dogodekId,
            'terminiStoritev': terminiStoritve
        }, function () {
            self.tsColl.queryParams.dogodek = dogodekId;

            self.tsColl.fetch({
                success: function (coll) {
                    self.razdeliTS(coll);
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });

        }, function (error) {
            console.log(error);
        });
    };

    SodelujociView.prototype.onRazdeljenTS = function () {
        var terminiStoritve = this.tsColl.toJSON();

        this.azurirajTsDogodka(this.dogodek.get('id'), terminiStoritve);
    };

    return SodelujociView;
});