define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore',
    'baseUrl'
], function (
        baseUrl,
        Dokument,
        _,
        baseUrl
        ) {


    var OsebaTrr = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/trr'
    });
    var OsebaNaslov = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/postniNaslov'
    });
    var OsebaTelefon = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/telefonska'
    });    
    var OsebaZaposlitev = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/zaposlitev'
    });    
    

    var OsebaTelefonCollection = Dokument.PostavkaCollection.extend({
        model: OsebaTelefon,
        url: baseUrl + '/rest/telefonska',
        index: 'pozicija'
    });
    
    var OsebaTrrCollection = Dokument.PostavkaCollection.extend({
        model: OsebaTrr,
        url: baseUrl + '/rest/trr',
        index: 'pozicija'
    });
    
    var OsebaNaslovCollection = Dokument.PostavkaCollection.extend({
        model: OsebaNaslov,
        url: baseUrl + '/rest/postniNaslov',
        index: 'pozicija'
    });
    
    var OsebaZaposlitevCollection = Dokument.PostavkaCollection.extend({
        model: OsebaZaposlitev,
        url: baseUrl + '/rest/zaposlitev',
        index: 'pozicija'
    });
    
    var OsebaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/oseba',
        nestedCollections: {
            trrji: {collection: OsebaTrrCollection, mappedBy: 'oseba'},
            telefonske: {collection: OsebaTelefonCollection, mappedBy: 'oseba'},
            naslovi: {collection: OsebaNaslovCollection, mappedBy: 'oseba'},
            zaposlitve: {collection: OsebaZaposlitevCollection, mappedBy: 'oseba'}
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
        Model: OsebaModel
    };
});