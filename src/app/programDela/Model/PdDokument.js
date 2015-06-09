define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {

    var PdGostovanje = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programGostovanje'
    });    
    var PdGostovanjeCollection = Dokument.PostavkaCollection.extend({
        model: PdGostovanje,
        url: baseUrl + '/rest/programGostovanje',
        index: 'toBeDetermined'
    });
    
    
    var PdGostujoca = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programGostujoca'
    });    
    var PdGostujocaCollection = Dokument.PostavkaCollection.extend({
        model: PdGostujoca,
        url: baseUrl + '/rest/programGostujoca',
        index: 'toBeDetermined'
    });
    
    
    var PdIzjemni = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programIzjemni'
    });    
    var PdIzjemniCollection = Dokument.PostavkaCollection.extend({
        model: PdIzjemni,
        url: baseUrl + '/rest/programIzjemni',
        index: 'toBeDetermined'
    });
    
    
    var PdPonovitve = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programPonovitve'
    });    
    var PdPonovitveCollection = Dokument.PostavkaCollection.extend({
        model: PdPonovitve,
        url: baseUrl + '/rest/programPonovitve',
        index: 'toBeDetermined'
    });
    
    
    var PdPremiere = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programPremiere'
    });    
    var PdPremiereCollection = Dokument.PostavkaCollection.extend({
        model: PdPremiere,
        url: baseUrl + '/rest/programPremiere',
        index: 'toBeDetermined'
    });
    
    
    var PdFestivali = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programFestivali'
    });    
    var PdFestivaliCollection = Dokument.PostavkaCollection.extend({
        model: PdFestivali,
        url: baseUrl + '/rest/programFestivali',
        index: 'toBeDetermined'
    });
    
    
    
    var ProgramDelaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/programDela',
        nestedCollections: {
            gostovanja: {collection: PdGostovanjeCollection, mappedBy: 'programDela'},
            gostujoci: {collection: PdGostujocaCollection, mappedBy: 'programDela'},
            izjemni: {collection: PdIzjemniCollection, mappedBy: 'programDela'},
            ponovitve: {collection: PdPonovitveCollection, mappedBy: 'programDela'},
            premiere: {collection: PdPremiereCollection, mappedBy: 'programDela'},
            festivali: {collection: PdFestivaliCollection, mappedBy: 'programDela'}
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'gostovanja':
                    postavka = new PdGostovanje({
                        programDela: this.id
                    });
                    break;
                case 'gostujoci':
                    postavka = new PdGostujoca({
                        programDela: this.id
                    });
                    break;
                case 'izjemni':
                    postavka = new PdIzjemni({
                        programDela: this.id
                    });
                    break;
                case 'ponovitve':
                    postavka = new PdPonovitve({
                        programDela: this.id
                    });
                    break;
                case 'premiere':
                    postavka = new PdPremiere({
                        programDela: this.id
                    });
                    break;
                case 'festivali':
                    postavka = new PdGostovanje({
                        programDela: this.id
                    });
                    break;
            }
            postavka.dokument = this;
            return postavka;
        }
    });
    return {
        Model: ProgramDelaModel
    };
});