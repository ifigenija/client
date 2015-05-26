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


    var AlternacijaModel = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/alternacija'
    });

    var AlternacijaCollection = Dokument.PostavkaCollection.extend({
        model: AlternacijaModel,
        url: baseUrl + '/rest/alternacija',
        index: 'pozicija'
    });

    var FunkcijaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/funkcija',
        nestedCollections: {
            alternacije: {collection: AlternacijaCollection, mappedBy: 'funkcija'}
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'alternacije':
                    postavka = new FunkcijaAlternacija({
                        funkcija: this.id
                        
                    });
                    break;
            }
            postavka.dokument = this;
            return postavka;
        }
    });

});