define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {

    var PostavkaOseba = Dokument.Postavka.extend({
        defaults: {
            kolicina: 1,
            status: '100'
        },
        urlRoot: '/rest/oseba'
    });
    
    var PostavkaOsebaCollection = Dokument.PostavkaCollection.extend({
        model: PostavkaOseba,
        url: '/rest/oseba',
        index: 'pozicija'
    });
    
    var DokumentOseba = Dokument.Model.extend({
        urlRoot: '/rest/oseba',
        nestedCollections: {
            osebe: {collection: PostavkaOsebaCollection, mappedBy: 'dokument'}
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'osebe':
                    postavka = new PostavkaOseba({
                        dokument: this.id
                    });
                    break;
            }
            postavka.dokument = this;
            return postavka;
        }
    });
    return {
        Dokument: DokumentOseba
    };
});