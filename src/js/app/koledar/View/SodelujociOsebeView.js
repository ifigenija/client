/*
 * Licenca GPLv3
 */

define([
    'i18next',
    'app/bars',
    './SodelujociView',
    './UrnikTSView',
    '../Model/TerminiStoritve',
    '../Model/Osebe'
], function (
        i18next,
        Handlebars,
        SodelujociView,
        UrnikTSView,
        TerminiStoritve,
        Osebe
        ) {

    var SodelujociOstaliView = SodelujociView.extend({});
    /**
     * 
     * @param {Object} options
     * @param {String} options.uprizoritev  id uprizoritve
     * @returns {undefined}
     */
    SodelujociOstaliView.prototype.initialize = function (options) {
        this.dogodek = options.dogodek;
        //dodamo atribut label, ker pričakujemo lookup osebe
        options.osebe.forEach(function (model) {
            model.set('label', model.get('polnoIme'));
        });
        this.ostali = options.osebe;
        this.iOstali = new Osebe();
        this.itsOstali = new TerminiStoritve();
    };
    SodelujociOstaliView.prototype.getTS = function () {
        var terminiS = new TerminiStoritve();
        terminiS.add(this.itsOstali.toJSON());
        
        return terminiS.getUrejenTS(this.tsColl);
    };
    

    SodelujociOstaliView.prototype.razdeliTS = function (collection) {
        var tsPodrocja = collection.razdeliPoPodrocjih();
        
        this.itsOstali.reset();
        this.itsOstali.add(tsPodrocja.ostali);
        this.iOstali = this.itsOstali.toOsebe();
    };

    SodelujociOstaliView.prototype.onRender = function () {
        var self = this;
        this.tsColl = new TerminiStoritve();
        this.tsColl.queryParams.dogodek = this.dogodek.get('id');

        this.tsColl.fetch({
            success: function (collection) {
                self.razdeliTS(collection);
                self.renderOstali();
            }
        });
    };
    /**
     * Izris seznam izbranih umetnikov
     * @returns {undefined}
     */
    SodelujociOstaliView.prototype.renderOstali = function () {
        //funkcija, ki jo prožimo ko kliknemo gumb uredi pri umetnikih
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

        this.ostaliView = this.renderSeznam({
            collection: this.itsOstali,
            naslov: i18next.t('terminStoritve.sodelujoci'),
            uredi: uredi
        });

        this.ostaliR.show(this.ostaliView);
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
                this.renderOstali();
            }, this);

            this.koledarR.show(urnikTSView);
            this.ostaliR.empty();
        }
    };
    
    return SodelujociOstaliView;
});