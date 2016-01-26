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
    '../Model/Alternacije',
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
        SeznamSodelujocihView,
        UrnikTSView,
        DualListView,
        sodelujociTpl
        ) {

    var SodelujociView = Marionette.LayoutView.extend({
        className: 'sodelujoci',
        template: sodelujociTpl,
        regions: {
            umetnikiR: '.region-umetniki',
            tehnikiR: '.region-tehniki',
            ostaliR: '.region-ostali',
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
        this.alternacijeColl = options.alternacije;
        this.osebeColl = options.osebe;
        this.dogodek = options.dogodek;

        //its kolekcije predstavljajo izbrane termine storitve
        this.itsUmetniki = new TerminiStoritve();
        this.itsTehniki = new TerminiStoritve();
        this.itsOstali = new TerminiStoritve();

        //kolekcije brez predpone predstavljajo možne alternacije/osebe med katerimi lahko izbiramo
        this.umetniki = new Alternacije();
        this.tehniki = new Alternacije();

        //dodamo atribut label, ker pričakujemo lookup osebe
        this.osebeColl.forEach(function (model) {
            model.set('label', model.get('polnoIme'));
        });
        this.ostali = this.osebeColl;

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
        terminiS.add(this.itsOstali.toJSON());

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
        this.iUmetniki = this.itsUmetniki.toAlternacije(this.umetniki);

        this.itsTehniki.reset();
        this.itsTehniki.add(tsPodrocja.tehnik);
        this.itsTehniki.add(tsPodrocja.inspicient);
        this.itsTehniki.add(tsPodrocja.sepetalec);
        this.iTehniki = this.itsTehniki.toAlternacije(this.tehniki);

        this.itsOstali.reset();
        this.itsOstali.add(tsPodrocja.ostali);
        this.iOstali = this.itsOstali.toOsebe();
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
    SodelujociView.prototype.onRender = function () {
        var self = this;
        this.tsColl = new TerminiStoritve();
        this.tsColl.queryParams.dogodek = this.dogodek.get('id');

        this.tsColl.fetch({
            success: function (collection) {
                self.razdeliTS(collection);
                self.renderUmetniki();
                self.renderTehnika();
                self.renderOstali();
            }
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
     * Izris seznam izbranih gostov/dežurnih/sodelujoči
     * @returns {undefined}
     */
    SodelujociView.prototype.renderOstali = function () {
        //funkcija, ki jo prožimo ko kliknemo gumb uredi pri ostalih
        var uredi = function ($el) {
            this.urediSeznam({
                izbraniTS: this.itsOstali,
                izbrani: this.iOstali,
                mozni: this.ostali,
                $el: $el,
                tpl: Handlebars.compile('{{label}}'),
                gost: this.options.gost,
                dezurni: this.options.dezurni,
                sodelujoc: this.options.sodelujoc
            });
        };

        var naslov, razred = this.dogodek.get('razred');
        switch (razred) {
            case '100s':
                naslov = i18next.t('terminStoritve.dezurni');
                break;
            case '200s':
                naslov = i18next.t('terminStoritve.gosti');
                break;
        }

        this.ostaliView = this.renderSeznam({
            collection: this.itsOstali,
            naslov: naslov,
            uredi: uredi
        });

        this.ostaliR.show(this.ostaliView);
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

            var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/koledar/dogodek'});
            rpc.call('azurirajTSDogodka', {
                'dogodekId': self.dogodek.get('id'),
                'terminiStoritev': terminiStoritve
            }, function () {
                self.tsColl.queryParams.dogodek = self.dogodek.get('id');

                self.tsColl.fetch({
                    success: function (coll) {
                        self.razdeliTS(coll);
                    },
                    error: Radio.channel('error').request('handler', 'xhr')
                });

            }, function (error) {
                console.log(error);
            });
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
                this.renderUmetniki();
                this.renderTehnika();
                this.renderOstali();
            }, this);

            this.koledarR.show(urnikTSView);
            this.umetnikiR.empty();
            this.tehnikiR.empty();
            this.ostaliR.empty();
        }
    };
    return SodelujociView;
});