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


    var OsebaNaslov = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/postniNaslov'
    });
    var OsebaTelefon = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/telefonska'
    });
   

    var OsebaTelefonCollection = Dokument.PostavkaCollection.extend({
        model: OsebaTelefon,
        url: baseUrl + '/rest/telefonska',
        index: 'naziv'
    });


    var OsebaNaslovCollection = Dokument.PostavkaCollection.extend({
        model: OsebaNaslov,
        url: baseUrl + '/rest/postniNaslov',
        index: 'vrsta'
    });


    var OsebaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/oseba',
        nestedCollections: {
            telefonske: {collection: OsebaTelefonCollection, mappedBy: 'oseba'},
            naslovi: {collection: OsebaNaslovCollection, mappedBy: 'oseba'},
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
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
            }
            postavka.dokument = this;
            return postavka;
        }
    });
    return {
        Model: OsebaModel
    };
});