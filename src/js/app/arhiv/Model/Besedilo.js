define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {
    
    var AvtorModel = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/avtorBesedila'
    });

    var AvtorjiCollection = Dokument.PostavkaCollection.extend({
        model: AvtorModel,
        url: baseUrl + '/rest/avtorBesedila',
        index: 'zaporedna'
    });
    
    var BesediloModel = Dokument.Model.extend({
        urlRoot: baseUrl + baseUrl + '/rest/besedilo',
        nestedCollections: {
            avtorji: {collection: AvtorjiCollection, mappedBy: 'besedilo'}
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'avtorji':
                    postavka = new AvtorModel({
                        besedilo: this.id
                    });
                    break;
            }
            postavka.dokument = this;
            return postavka;
        }
    });
    return {
        Model: BesediloModel,
        AvtorModel: AvtorModel
    };
});