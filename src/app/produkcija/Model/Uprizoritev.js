define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {

    var UprizoritevArhivalija = Dokument.Postavka.extend({
        urlRoot: '/rest/arhivalija'
    });
    var UprizoritevOseba = Dokument.Postavka.extend({
        urlRoot: '/rest/oseba'
    });
    
    var UprizoritevArhivalijaCollection = Dokument.PostavkaCollection.extend({
        model: UprizoritevArhivalija,
        url: '/rest/arhivalija',
        index: 'pozicija'
    });
    
    var UprizoritevOsebaCollection = Dokument.PostavkaCollection.extend({
        model: UprizoritevOseba,
        url: '/rest/oseba',
        index: 'pozicija'
    });
    
    var UprizoritevModel = Dokument.Model.extend({
        urlRoot: '/rest/uprizoritev',
        nestedCollections: {
            arhivalije: {collection: UprizoritevArhivalijaCollection, mappedBy: 'arhivalije', filterBy: 'uprizoritev'},
            osebe: {collection: UprizoritevOsebaCollection, mappedBy: 'osebe', filterBy: 'uprizoritev'}
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'arhivalije':
                    postavka = new UprizoritevArhivalija({
                        uprizoritev: this.id
                    });
                    break;
                case 'osebe':
                    postavka = new UprizoritevOseba({
                        uprizoritev: this.id
                    });
                    break;
            }
            postavka.dokument = this;
            return postavka;
        }
    });
    return {
        Model: UprizoritevModel,
    };
});