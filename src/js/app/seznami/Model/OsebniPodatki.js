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
        urlRoot: baseUrl + '/rest/trr'
    });
    
    var OsebaZaposlitev = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/zaposlitev'
    });
    
    
    var OsebaTrrCollection = Dokument.PostavkaCollection.extend({
        model: OsebaTrr,
        url: baseUrl + '/rest/trr'
    });
    
    var OsebaZaposlitevCollection = Dokument.PostavkaCollection.extend({
        model: OsebaZaposlitev,
        url: baseUrl + '/rest/zaposlitev'
    });
    
    
    var OsebaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/oseba/osebni',
        nestedCollections: {
            trrji: {collection: OsebaTrrCollection, mappedBy: 'oseba'},
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
    return  OsebaModel;
   
});