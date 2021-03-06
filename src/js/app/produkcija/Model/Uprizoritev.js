define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
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
    
    /**
     * Model za vajo
     */
    var VajaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/vaja',
        defaults: {
            status: '200s',
        }
    });
    /**
     * Kolekcija za vaje 
     */
    var VajeCollection = Dokument.PostavkaCollection.extend({
        model: VajaModel,
        url: baseUrl + '/rest/vaja'
    });
    
    /**
     * Model za predstavo
     */
    var PredstavaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/predstava',
        defaults: {
            status: '200s',
        }
    });
    /**
     * Kolekcija za predstave 
     */
    var PredstaveCollection = Dokument.PostavkaCollection.extend({
        model: PredstavaModel,
        url: baseUrl + '/rest/predstava'
    });


    var UprizoritevModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/uprizoritev',
        nestedCollections: {
            umetniki: {collection: ZasedbaCollection, mappedBy: 'uprizoritev', filterBy: {'podrocje': ['umetnik']}},
            igralci: {collection: ZasedbaCollection, mappedBy: 'uprizoritev', filterBy: {'podrocje': ['igralec']}},
            tehniki: {collection: ZasedbaCollection, mappedBy: 'uprizoritev', filterBy: {'podrocje': ['tehnik','inspicient','sepetalec']}},
            planVaje: {collection: VajeCollection, mappedBy: 'uprizoritev'},
            planPredstave: {collection: PredstaveCollection, mappedBy: 'uprizoritev'}

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
                case 'planVaje':
                    postavka = new VajaModel({
                        uprizoritev: this.get('id')
                    });
                    break;
                case 'planPredstave':
                    postavka = new PredstavaModel({
                        uprizoritev: this.get('id')
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