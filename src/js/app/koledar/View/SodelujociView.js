/*
 * Licenca GPLv3
 */

define([
    'radio',
    'i18next',
    'backbone',
    'app/bars',
    'marionette',
    'underscore',
    'moment',
    'jquery',
    '../Model/TerminiStoritve',
    '../Model/Alternacije',
    '../Model/Osebe',
    './SeznamSodelujocihView',
    'app/filter/View/DualListView',
    'template!../tpl/sodelujoci.tpl'
], function (
        Radio,
        i18next,
        Backbone,
        Handlebars,
        Marionette,
        _,
        moment,
        $,
        TerminiStoritve,
        Alternacije,
        Osebe,
        SeznamSodelujocihView,
        DualListView,
        sodelujociTpl
        ) {

    var SodelujociView = Marionette.LayoutView.extend({
        className: 'sodelujoci',
        template: sodelujociTpl,
        regions: {
            umetnikiR: '.region-umetniki',
            tehnikiR: '.region-tehniki',
            gostiR: '.region-gosti'
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
        this.tsColl = new TerminiStoritve(this.dogodek.get('terminiStoritve'));

        this.razdeliAlternacije();
        this.razdeliTS();
    };

    /**
     * Termine storitve iz dogodkarazdelimo po področjih v tri različne kolekcije.
     * te kolekcije predstavljajo izbrane umetnike, tehnike in goste/dežurne
     * @returns {undefined}
     */
    SodelujociView.prototype.razdeliTS = function () {
        var tsPodrocja = this.tsColl.razdeliPoPodrocjih();

        this.izbraniUmetniki = new TerminiStoritve();
        this.izbraniUmetniki.add(tsPodrocja.umetnik);
        this.izbraniUmetniki.add(tsPodrocja.igralec);

        this.izbraniTehniki = new TerminiStoritve();
        this.izbraniTehniki.add(tsPodrocja.tehnik);
        this.izbraniTehniki.add(tsPodrocja.inspicient);

        this.izbraniGosti = new TerminiStoritve();
        this.izbraniTehniki.add(tsPodrocja.gosti);
    };
    /**
     * V tej funkciji inicializiramo 2 kolekciji ki predstavljajo alternacije umetnikov in tehnikov,
     * ter kolekcijo gostov/dežurni, ki predstavljajo osebe.
     * Prav tako inicializiramo 3 prazne kolekcije v katerih bomo izbra
     * @returns {undefined}
     */
    SodelujociView.prototype.razdeliAlternacije = function () {
        var modeli = this.alternacijeColl.razdeli();

        this.izbraniUmetnikiColl = new Alternacije();
        this.umetnikiColl = new Alternacije();
        this.umetnikiColl.add(modeli.umetnik);
        this.umetnikiColl.add(modeli.igralec);
        this.umetnikiColl.add(modeli.sepetalec);

        this.izbraniTehnikiColl = new Alternacije();
        this.tehnikiColl = new Alternacije();
        this.tehnikiColl.add(modeli.tehnik);
        this.tehnikiColl.add(modeli.inspicient);

        this.izbraniGostiColl = new Osebe();
        this.gostiColl = this.osebeColl;
    };
    SodelujociView.prototype.onRender = function () {
        this.renderUmetniki();
        this.renderTehnika();
        this.renderGosti();
    };
    /**
     * Izris seznam izbranih umetnikov
     * @returns {undefined}
     */
    SodelujociView.prototype.renderUmetniki = function () {
        //funkcija, ki jo prožimo ko kliknemo gumb uredi pri umetnikih
        var uredi = function ($el) {
            this.urediSeznam({
                izbraniTS: this.izbraniUmetniki,
                izbrani: this.izbraniUmetnikiColl,
                mozni: this.umetnikiColl,
                $el: $el,
                tpl: Handlebars.compile('{{oseba.label}}({{funkcija.label}})')
            });
        };

        this.umetnikiView = this.renderSeznam({
            collection: this.izbraniUmetniki,
            naslov: 'Umetniki',
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
                izbraniTS: this.izbraniTehniki,
                izbrani: this.izbraniTehnikiColl,
                mozni: this.tehnikiColl,
                $el: $el,
                tpl: Handlebars.compile('{{oseba.label}}({{funkcija.label}})')
            });
        };
        this.tehnikiView = this.renderSeznam({
            collection: this.izbraniTehniki,
            naslov: 'Tehniki',
            uredi: uredi
        });
        this.tehnikiR.show(this.tehnikiView);
    };

    /**
     * Izris seznam izbranih gostov/dežurnih
     * @returns {undefined}
     */
    SodelujociView.prototype.renderGosti = function () {
        //itemView odgobvoren za izris modelov iz kolekcije seznamSodelujocihView
        var ItemView = Marionette.ItemView.extend({
            tagName: 'span',
            className: 'sodelujoc',
            template: Handlebars.compile('<label>{{ime}}</label>'),
            serializeData: function () {
                return{
                    ime: this.model.get('oseba').get('polnoIme')
                };
            }
        });

        //funkcija, ki jo prožimo ko kliknemo gumb uredi pri gostih
        var uredi = function ($el) {
            this.urediSeznam({
                izbraniTS: this.izbraniGosti,
                izbrani: this.izbraniGostiColl,
                mozni: this.gostiColl,
                $el: $el,
                tpl: Handlebars.compile('{{polnoIme}}')
            });
        };

        this.gostiView = this.renderSeznam({
            collection: this.izbraniGosti,
            naslov: 'Gosti',
            childView: ItemView,
            uredi: uredi
        });

        this.gostiR.show(this.gostiView);
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
            title: "izbira oseb"
        });

        // ko dual list proži changed:vrednosti se kolekcija alternacij/oseb pretvori v polje objektov TS
        var self = this;
        //onclose proži changed:vrednosti
        view.on('changed:vrednosti', function () {
            self.trigger('changed:vrednosti');
            var tsModeli = options.izbrani.toTS({
                dogodek: this.dogodek,
                zacetek: moment(),
                konec: moment()
            });

            // kolekcijo izbranihTerminostoritev resetiramo in dodamo v tem trenutku izbrane alternacije/osebe
            options.izbraniTS.reset(tsModeli);
        }, this);

        view.render();
    };

    /**
     * Funkcija namenjena urejanju terminovstoritev izbranih alternacij/oseb
     * @param {type} options
     * @returns {undefined}
     */
    SodelujociView.prototype.urediTS = function (collection) {
        console.log('urediTS');
    };
    return SodelujociView;
});