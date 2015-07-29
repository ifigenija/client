define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {
    
    var PESklopaModel = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programskaEnotaSklopa'
    });
    var PESklopiCollection = Dokument.PostavkaCollection.extend({
        model: PESklopaModel,
        url: baseUrl + '/rest/programskaEnotaSklopa'
    });

    var ProgramDelaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/programRazno',
        nestedCollections: {
            peSklopi: {collection: PESklopiCollection, mappedBy: 'programRazno'}
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'peSklopa':
                    postavka = new PESklopaModel({
                        programRazno: this.id
                    });
                    break;
            }
            postavka.programRazno = this;
            return postavka;
        }
    });
    return {
        Model: ProgramDelaModel
    };
});