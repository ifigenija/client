define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {

    var Gostovanje = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programGostovanje'
    });    
    var GostovanjeCollection = Dokument.PostavkaCollection.extend({
        model: Gostovanje,
        url: baseUrl + '/rest/programGostovanje',
        index: 'toBeDetermined'
    });
    
    
    var Gostujoca = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programGostujoca'
    });    
    var GostujocaCollection = Dokument.PostavkaCollection.extend({
        model: Gostujoca,
        url: baseUrl + '/rest/programGostujoca',
        index: 'toBeDetermined'
    });
    
    
    var Izjemni = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programIzjemni'
    });    
    var IzjemniCollection = Dokument.PostavkaCollection.extend({
        model: Izjemni,
        url: baseUrl + '/rest/programIzjemni',
        index: 'toBeDetermined'
    });
    
    
    var PonovitevPremiere = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programPonovitevPremiere'
    });    
    var PonovitvePremierCollection = Dokument.PostavkaCollection.extend({
        model: PonovitevPremiere,
        url: baseUrl + '/rest/programPonovitevPremiere',
        index: 'toBeDetermined'
    });
    
    var PonovitevPrejsnje = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programPonovitevPrejsnjih'
    });    
    var PonovitvePrejsnjihCollection = Dokument.PostavkaCollection.extend({
        model: PonovitevPrejsnje,
        url: baseUrl + '/rest/programPonovitevPrejsnjih',
        index: 'toBeDetermined'
    });
    
    
    var Premiera = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programPremiera'
    });    
    var PremiereCollection = Dokument.PostavkaCollection.extend({
        model: Premiera,
        url: baseUrl + '/rest/programPremiera',
        index: 'toBeDetermined'
    });
    
    
    var Festival = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programFestivali'
    });    
    var FestivaliCollection = Dokument.PostavkaCollection.extend({
        model: Festival,
        url: baseUrl + '/rest/programFestivali',
        index: 'toBeDetermined'
    });
    
    var Razno = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programRazno'
    });    
    var RazniCollection = Dokument.PostavkaCollection.extend({
        model: Razno,
        url: baseUrl + '/rest/programRazno',
        index: 'toBeDetermined'
    });
    
    
    
    var ProgramDelaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/programDela',
        nestedCollections: {
            gostovanja: {collection: GostovanjeCollection, mappedBy: 'dokument'},
            gostujoci: {collection: GostujocaCollection, mappedBy: 'dokument'},
            izjemni: {collection: IzjemniCollection, mappedBy: 'dokument'},
            ponovitvePremier: {collection: PonovitvePremierCollection, mappedBy: 'dokument'},
            ponovitvePrejsnjih: {collection: PonovitvePrejsnjihCollection, mappedBy: 'dokument'},
            premiere: {collection: PremiereCollection, mappedBy: 'dokument'},
            festivali: {collection: FestivaliCollection, mappedBy: 'dokument'},
            razni: {collection: RazniCollection, mappedBy: 'dokument'}
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'gostovanja':
                    postavka = new Gostovanje({
                        dokument: this.id
                    });
                    break;
                case 'gostujoci':
                    postavka = new Gostujoca({
                        dokument: this.id
                    });
                    break;
                case 'izjemni':
                    postavka = new Izjemni({
                        dokument: this.id
                    });
                    break;
                case 'ponovitvePremier':
                    postavka = new PonovitevPremiere({
                        dokument: this.id
                    });
                    break;
                case 'ponovitvePrejsnjih':
                    postavka = new PonovitevPrejsnje({
                        dokument: this.id
                    });
                    break;
                case 'premiere':
                    postavka = new Premiera({
                        dokument: this.id
                    });
                    break;
                case 'festivali':
                    postavka = new Festival({
                        dokument: this.id
                    });
                    break;
                case 'razni':
                    postavka = new Razno({
                        dokument: this.id
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