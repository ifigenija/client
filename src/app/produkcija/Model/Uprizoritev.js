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


    var StrosekModel = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/strosek'
    });

    var FunkcijaModel = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/funkcija'
    });


    var StroskovnikCollection = Dokument.PostavkaCollection.extend({
        model: StrosekModel,
        url: baseUrl + '/rest/strosek',
        index: 'sort'
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
            stroskovnik: {collection: StroskovnikCollection, mappedBy: 'uprizoritev'},
            umetniki: {collection: ZasedbaCollection, mappedBy: 'uprizoritev', filterBy: {'podrocje': 'umentik'}},
            igralci: {collection: ZasedbaCollection, mappedBy: 'uprizoritev', filterBy: {'podrocje': 'igralec'}},
            ostali: {collection: ZasedbaCollection, mappedBy: 'uprizoritev', filterBy: {'podrocje': 'tehnika'}}
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'stroskovnik':
                    postavka = new StrosekModel({
                        uprizoritev: this.get('id')
                    });
                    break;
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
                case 'ostali':
                    postavka = new FunkcijaModel({
                        uprizoritev: this.get('id'),
                        podrocje: 'tehnika'
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
        FunkcijaModel: FunkcijaModel,
        StrosekModel: StrosekModel,
        StroskovnikCollection: StroskovnikCollection,
    };
});