/*
 * Licenca GPLv3
 */

define([
    'i18next',
    'app/bars',
    './SodelujociView',
    '../Model/TerminiStoritve',
    '../Model/Osebe'
], function (
        i18next,
        Handlebars,
        SodelujociView,
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
                tpl: Handlebars.compile('{{polnoIme}}')
            });
        };

        this.ostaliView = this.renderSeznam({
            collection: this.itsOstali,
            naslov: i18next.t('Ostali'),
            uredi: uredi
        });

        this.ostaliR.show(this.ostaliView);
    };
    return SodelujociOstaliView;
});