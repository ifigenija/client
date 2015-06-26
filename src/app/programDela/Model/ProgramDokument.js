define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore',
    'app/programDela/Model/DrugiVir'
], function (
        baseUrl,
        Dokument,
        _,
        DrugiVir
        ) {

    var DrugiVirPostavka = Dokument.Postavka.extend({
        nestedCollections: {
            drugiViri: {collection: DrugiVir.Collection, mappedBy: 'enotaPrograma'}
        },
        urlRoot: baseUrl + '/rest/programpremiera',
        dodajPostavko: function (nested) {

            nested = nested || 'drugiViri';
            var postavka = new DrugiVir.Model({
                enotaPrograma: this.id
            });
            postavka.dokument = this;
            return postavka;
        }
    });

    var Gostovanje = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programGostovanje'
    });
    var GostovanjeCollection = Dokument.PostavkaCollection.extend({
        model: Gostovanje,
        url: baseUrl + '/rest/programGostovanje',
        index: 'sort'
    });


    var Gostujoca = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programGostujoca'
    });
    var GostujocaCollection = Dokument.PostavkaCollection.extend({
        model: Gostujoca,
        url: baseUrl + '/rest/programGostujoca',
        index: 'sort'
    });


    var Izjemni = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programIzjemni'
    });
    var IzjemniCollection = Dokument.PostavkaCollection.extend({
        model: Izjemni,
        url: baseUrl + '/rest/programIzjemni',
        index: 'sort'
    });


    var PonovitevPremiere = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programPonovitevPremiere'
    });
    var PonovitvePremierCollection = Dokument.PostavkaCollection.extend({
        model: PonovitevPremiere,
        url: baseUrl + '/rest/programPonovitevPremiere',
        index: 'sort'
    });

    var PonovitevPrejsnje = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programPonovitevPrejsnjih'
    });
    var PonovitvePrejsnjihCollection = Dokument.PostavkaCollection.extend({
        model: PonovitevPrejsnje,
        url: baseUrl + '/rest/programPonovitevPrejsnjih',
        index: 'sort'
    });


    var Premiera = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programPremiera'
    });
    var PremiereCollection = Dokument.PostavkaCollection.extend({
        model: DrugiVirPostavka,
        url: baseUrl + '/rest/programPremiera',
        index: 'sort'
    });


    var Festival = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programFestival'
    });
    var FestivaliCollection = Dokument.PostavkaCollection.extend({
        model: Festival,
        url: baseUrl + '/rest/programFestival',
        index: 'sort'
    });

    var Razno = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programRazno'
    });
    var RazniCollection = Dokument.PostavkaCollection.extend({
        model: Razno,
        url: baseUrl + '/rest/programRazno',
        index: 'sort'
    });



    var ProgramDelaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/programDela',
        nestedCollections: {
            gostovanja: {collection: GostovanjeCollection, mappedBy: 'dokument'},
            gostujoci: {collection: GostujocaCollection, mappedBy: 'dokument'},
            izjemni: {collection: IzjemniCollection, mappedBy: 'dokument'},
            ponovitvePremiere: {collection: PonovitvePremierCollection, mappedBy: 'dokument'},
            ponovitvePrejsnjih: {collection: PonovitvePrejsnjihCollection, mappedBy: 'dokument'},
            premiere: {collection: PremiereCollection, mappedBy: 'dokument'},
            festivali: {collection: FestivaliCollection, mappedBy: 'dokument'},
            programiRazno: {collection: RazniCollection, mappedBy: 'dokument'}
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
                case 'ponovitvePremiere':
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
                case 'programiRazno':
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
        Model: ProgramDelaModel,
        Postavka : DrugiVirPostavka
    };
});