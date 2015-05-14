define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {

    var OsebaTrr = Dokument.Postavka.extend({
        urlRoot: '/rest/trr'
    });
    var OsebaNaslov = Dokument.Postavka.extend({
        urlRoot: '/rest/postniNaslov'
    });
    var OsebaTelefon = Dokument.Postavka.extend({
        urlRoot: '/rest/telefonska'
    });    
    var OsebaZaposlitev = Dokument.Postavka.extend({
        urlRoot: '/rest/zaposlitev'
    });    
    
    var OsebaTelefonCollection = Dokument.PostavkaCollection.extend({
        model: OsebaTelefon,
        url: '/rest/telefonska',
        index: 'pozicija'
    });
    
    var OsebaTrrCollection = Dokument.PostavkaCollection.extend({
        model: OsebaTrr,
        url: '/rest/trr',
        index: 'pozicija'
    });
    
    var OsebaNaslovCollection = Dokument.PostavkaCollection.extend({
        model: OsebaNaslov,
        url: '/rest/postniNaslov',
        index: 'pozicija'
    });
    
    var OsebaZaposlitevCollection = Dokument.PostavkaCollection.extend({
        model: OsebaZaposlitev,
        url: '/rest/zaposlitev',
        index: 'pozicija'
    });
    
    var OsebaModel = Dokument.Model.extend({
        urlRoot: '/rest/oseba',
        nestedCollections: {
            trrji: {collection: OsebaTrrCollection, mappedBy: 'trrji', filterBy: 'oseba'},
            telefonske: {collection: OsebaTelefonCollection, mappedBy: 'telefonske', filterBy: 'oseba'},
            naslovi: {collection: OsebaNaslovCollection, mappedBy: 'naslovi', filterBy: 'oseba'},
            zaposlitve: {collection: OsebaZaposlitevCollection, mappedBy: 'zaposlitve', filterBy: 'oseba'}
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'trrji':
                    postavka = new OsebaTrr({
                        oseba: this.id
                    });
                    break;
                case 'naslovi':
                    postavka = new OsebaNaslov({
                        oseba: this.id
                    });
                    break;
                case 'telefonske':
                    postavka = new OsebaTelefon({
                        oseba: this.id
                    });
                    break;
                case 'zaposlitve':
                    postavka = new OsebaZaposlitev({
                        oseba: this.id
                    });
                    break;
            }
            postavka.dokument = this;
            return postavka;
        }
    });
    return {
        Model: OsebaModel,
    };
});