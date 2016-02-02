/*
 * Licenca GPLv3
 */

define([
    'radio',
    'i18next',
    'app/bars',
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

        //its kolekcije predstavljajo izbrane termine storitve
        this.itsUmetniki = new TerminiStoritve();
        this.itsTehniki = new TerminiStoritve();
        this.itsSodelujoci = new TerminiStoritve();
        this.itsGosti = new TerminiStoritve();
        this.itsDezurni = new TerminiStoritve();

        this.iUmetniki = new Alternacije();
        this.iTehniki = new Alternacije();
        this.iSodelujoci = new Osebe();
        this.iGosti = new Osebe();
        this.iDezurni = new Osebe();

        this.itsUmetniki.on('remove', function () {
            this.iUmetniki.reset(this.itsUmetniki.toAlternacije());
        }, this);
        this.itsTehniki.on('remove', function () {
            this.iTehniki.reset(this.itsTehniki.toAlternacije());
        }, this);
        this.itsSodelujoci.on('remove', function () {
            this.iSodelujoci.reset(this.itsSodelujoci.toOsebe());
        }, this);
        this.itsGosti.on('remove', function () {
            this.iGosti.reset(this.itsGosti.toOsebe());
        }, this);
        this.itsDezurni.on('remove', function () {
            this.iDezurni.reset(this.itsDezurni.toOsebe());
        }, this);

        //kolekcije brez predpone predstavljajo možne alternacije/osebe med katerimi lahko izbiramo
        this.umetniki = new Alternacije();
        this.umetniki.queryParams.uprizoritev = options.uprizoritev;
        this.tehniki = new Alternacije();
        this.tehniki.queryParams.uprizoritev = options.uprizoritev;

        this.sodelujoci = options.osebe;
        this.gosti = options.osebe;
        this.dezurni = options.osebe;

        this.razdeliAlternacije();
    };
    /**
     * Funkcija namenjena da vrne seznam trenutno izbranih termino storitev dogodka
     * @returns {TerminiStoritve}
     */
    SodelujociView.prototype.getTS = function () {
        var terminiS = new TerminiStoritve();

        terminiS.add(this.itsUmetniki.toJSON());
        terminiS.add(this.itsTehniki.toJSON());
        terminiS.add(this.itsSodelujoci.toJSON());
        terminiS.add(this.itsGosti.toJSON());
        terminiS.add(this.itsDezurni.toJSON());

        return terminiS.getUrejenTS(this.tsColl);
    };

    /**
     * Termine storitve iz dogodkarazdelimo po področjih v tri različne kolekcije.
     * te kolekcije predstavljajo izbrane umetnike, tehnike in goste/dežurne/sodelujoče
     * @returns {undefined}
     */
    SodelujociView.prototype.razdeliTS = function (collection) {
        var tsPodrocja = collection.razdeliPoPodrocjih();

        // kolekcije s predpono "i" predstavljajo izbrane alternacije/osebe
        this.itsUmetniki.reset();
        this.itsUmetniki.add(tsPodrocja.umetnik);
        this.itsUmetniki.add(tsPodrocja.igralec);
        this.iUmetniki.reset(this.itsUmetniki.toAlternacije());

        this.itsTehniki.reset();
        this.itsTehniki.add(tsPodrocja.tehnik);
        this.itsTehniki.add(tsPodrocja.inspicient);
        this.itsTehniki.add(tsPodrocja.sepetalec);
        this.iTehniki.reset(this.itsTehniki.toAlternacije());

        this.itsSodelujoci.reset();
        this.itsSodelujoci.add(tsPodrocja.sodelujoci);
        this.iSodelujoci.reset(this.itsSodelujoci.toOsebe());

        this.itsGosti.reset();
        this.itsGosti.add(tsPodrocja.gosti);
        this.iGosti.reset(this.itsGosti.toOsebe());

        this.itsDezurni.reset();
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
            success: function (collection) {
                self.razdeliTS(collection);
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
        //funkcija, ki jo prožimo ko kliknemo gumb uredi pri umetnikih
        var uredi = function ($el) {
            this.urediSeznam({
                izbraniTS: this.itsUmetniki,
                izbrani: this.iUmetniki,
                mozni: this.umetniki,
                $el: $el,
                tpl: Handlebars.compile('{{oseba.label}}({{funkcija.label}})')
            });
        };

        this.umetnikiView = this.renderSeznam({
            collection: this.itsUmetniki,
            naslov: i18next.t('terminStoritve.umetniki'),
            uredi: uredi
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
                izbraniTS: this.itsTehniki,
                izbrani: this.iTehniki,
                mozni: this.tehniki,
                $el: $el,
                tpl: Handlebars.compile('{{oseba.label}}({{funkcija.label}})')
            });
        };
        this.tehnikiView = this.renderSeznam({
            collection: this.itsTehniki,
            naslov: i18next.t('terminStoritve.tehniki'),
            uredi: uredi
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
                izbraniTS: this.itsSodelujoci,
                izbrani: this.iSodelujoci,
                mozni: this.sodelujoci,
                $el: $el,
                tpl: Handlebars.compile('{{polnoIme}}'),
                sodelujoc: true
            });
        };

        this.sodelujociView = this.renderSeznam({
            collection: this.itsSodelujoci,
            naslov: i18next.t('terminStoritve.sodelujoci'),
            uredi: uredi
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
                izbraniTS: this.itsGosti,
                izbrani: this.iGosti,
                mozni: this.gosti,
                $el: $el,
                tpl: Handlebars.compile('{{polnoIme}}'),
                gost: true
            });
        };

        this.gostiView = this.renderSeznam({
            collection: this.itsGosti,
            naslov: i18next.t('terminStoritve.gosti'),
            uredi: uredi
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
                izbraniTS: this.itsDezurni,
                izbrani: this.iDezurni,
                mozni: this.dezurni,
                $el: $el,
                tpl: Handlebars.compile('{{polnoIme}}'),
                dezurni: true
            });
        };

        this.dezurniView = this.renderSeznam({
            collection: this.itsDezurni,
            naslov: i18next.t('terminStoritve.dezurni'),
            uredi: uredi
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
            collection: options.collection,
            naslov: options.naslov,
            childView: options.childView
        });
        view.on('uredi:seznam', options.uredi, this);
        view.on('uredi:TS', this.urediTS, this);
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
                dezurni: options.dezurni || false
            });

            // kolekcijo izbranihTerminostoritev resetiramo in dodamo v tem trenutku izbrane alternacije/osebe
            options.izbraniTS.reset(tsModeli);
            var terminiStoritve = self.getTS();
            terminiStoritve = terminiStoritve.toJSON();
            
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

        }, Radio.channel('error').request('handler', 'flash'));
    };

    return SodelujociView;
});