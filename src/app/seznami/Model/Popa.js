define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {

    var PopaTrr = Dokument.Postavka.extend({
        urlRoot: '/rest/trr'
    });
    var PopaNaslov = Dokument.Postavka.extend({
        urlRoot: '/rest/postniNaslov'
    });
    var PopaTelefon = Dokument.Postavka.extend({
        urlRoot: '/rest/telefonska'
    });

    var PopaOseba = Dokument.Postavka.extend({
        initialize: function(options) {
            if (options.popa) {
                this.urlRoot = '/rest/popa/' + options.popa.get('id') + '/osebe';
            }
        }
    });
    
    
    var PopaTelefonCollection = Dokument.PostavkaCollection.extend({
        model: PopaTelefon,
        url: '/rest/oseba',
        index: 'pozicija'
    });
    
    var PopaTrrCollection = Dokument.PostavkaCollection.extend({
        model: PopaTrr,
        url: '/rest/trr',
        index: 'pozicija'
    });

    
    var PopaNaslovCollection = Dokument.PostavkaCollection.extend({
        model: PopaNaslov,
        url: '/rest/postniNaslov',
        index: 'pozicija'
    });
    
    var PopaOsebaCollection = Dokument.PostavkaCollection.extend({
        model: PopaOseba,
        url: function() {
            return '/rest/popa/' + this.parent.id + '/osebe' ;
        },
        index: 'pozicija'
    });
    
    var PopaModel = Dokument.Model.extend({
        urlRoot: '/rest/popa',
        nestedCollections: {
            osebe: {collection: PopaOsebaCollection, mappedBy: 'osebe'},
            trrji: {collection: PopaTrrCollection, mappedBy: 'trrji', filterBy: 'popa'},
            telefonske: {collection: PopaTelefonCollection, mappedBy: 'telefonske', filterBy: 'popa'},
            naslovi: {collection: PopaNaslovCollection, mappedBy: 'naslovi', filterBy: 'popa'},
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'osebe':
                    postavka = new PopaOseba({
                        popa: this.id
                    });
                    break;
                case 'trrji':
                    postavka = new PopaTrr({
                        popa: this.id
                    });
                    break;
                case 'naslovi':
                    postavka = new PopaNaslov({
                        popa: this.id
                    });
                    break;
                case 'telefonske':
                    postavka = new PopaTelefon({
                        popa: this.id
                    });
                    break;
            }
            postavka.dokument = this;
            return postavka;
        }
    });
    return {
        Model: PopaModel,
    };
});