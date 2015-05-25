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


    var KoprodukcijaModel = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/strosek'
    });


    

    var KoprodukcijaCollection = Dokument.PostavkaCollection.extend({
        model: KoprodukcijaModel,
        url: baseUrl + '/rest/koprodukcija',
        index: 'sort',
        mode: 'client'
    });
    
    var AlternacijaModel = Dokument.Model.extend({
        
        urlRoot: baseUrl + '/rest/alternacija'
         
    });
    
    var AlternacijaCollection = Dokument.PostavkaCollection.extend({
        model: KoprodukcijaModel,
        url: baseUrl + '/rest/alternacija',
        index: 'sort',
        mode: 'client'
    });
    

    var FunkcijaModel = Dokument.Model.extend({
        url: baseUrl + '/rest/funkcija'        
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
            tehniki: {collection: ZasedbaCollection, mappedBy: 'uprizoritev', filterBy: {'podrocje': 'tehnik'}},
            koprodukcije: {collection: ZasedbaCollection, mappedBy: 'uprizoritev'}

        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'koprodukcije':
                    postavka = new Model({
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
        FunkcijaModel: FunkcijaModel,
        AlternacijaModel: AlternacijaModel,
        AlternacijaCollection: AlternacijaCollection,
        KodprodukcijaModel: KoprodukcijaModel,
        KoprodukcijaCollection: KoprodukcijaCollection,
    };
});