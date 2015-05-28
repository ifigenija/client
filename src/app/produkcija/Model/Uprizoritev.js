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
    
    var FunkcijaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/funkcija'
    });
    /**
     * Kolekcija za funkcije 
     */
    var ZasedbaCollection = Dokument.PostavkaCollection.extend({
        model: FunkcijaModel,
        url: baseUrl + '/rest/funkcija',
        index: 'sort'
    });


    var UprizoritevModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/uprizoritev',
        nestedCollections: {
            umetniki: {collection: ZasedbaCollection, mappedBy: 'uprizoritev', filterBy: {'podrocje': 'umetnik'}},
            igralci: {collection: ZasedbaCollection, mappedBy: 'uprizoritev', filterBy: {'podrocje': 'igralec'}},
            tehniki: {collection: ZasedbaCollection, mappedBy: 'uprizoritev', filterBy: {'podrocje': 'tehnik'}}

        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'umetniki':
                    postavka = new FunkcijaModel({
                        uprizoritev: this.get('id'),
                        podrocje: 'umetnik'
                    });
                    break;
                case 'igralci':
                    postavka = new FunkcijaModel({
                        uprizoritev: this.get('id'),
                        podrocje: 'igralec'
                    });
                    break;
                case 'tehniki':
                    postavka = new FunkcijaModel({
                        uprizoritev: this.get('id'),
                        podrocje: 'tehnik'
                    });
                    break;
            }
            postavka.dokument = this;
            return postavka;
        }
    });

    return {
        Model: UprizoritevModel,
        ZasedbaCollection: ZasedbaCollection,
        FunkcijaModel: FunkcijaModel
    };
});