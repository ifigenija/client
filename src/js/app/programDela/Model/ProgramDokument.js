define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {

    var DrugiVirModel = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/drugiVir'
    });

    var DrugiViriCollection = Dokument.PostavkaCollection.extend({
        model: DrugiVirModel,
        url: baseUrl + '/rest/drugiVir'
    });

    var KoprodukcijaModel = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/produkcijaDelitev'
    });

    var KoprodukcijeCollection = Dokument.PostavkaCollection.extend({
        model: KoprodukcijaModel,
        url: baseUrl + '/rest/produkcijaDelitev'
    });

    var EnotaProgramaPostavka = Dokument.Postavka.extend({
        nestedCollections: {
            drugiViri: {collection: DrugiViriCollection, mappedBy: 'enotaPrograma'},
            koprodukcije: {collection: KoprodukcijeCollection, mappedBy: 'enotaPrograma'}
        },
        dodajPostavko: function (nested) {
            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'drugiViri':
                    postavka = new DrugiVirModel({
                        enotaPrograma: this.id
                    });
                    break;
                case 'koprodukcije':
                    postavka = new KoprodukcijaModel({
                        enotaPrograma: this.id
                    });
                    break;
            }
            postavka.dokument = this;
            return postavka;
        }
    });

    var GostujocaModel = EnotaProgramaPostavka.extend({
        urlRoot: baseUrl + '/rest/programGostujoca'
    });
    var GostujocaCollection = Dokument.PostavkaCollection.extend({
        model: GostujocaModel,
        url: baseUrl + '/rest/programGostujoca',
        index: 'sort'
    });


    var IzjemniModel = EnotaProgramaPostavka.extend({
        urlRoot: baseUrl + '/rest/programIzjemni'
    });
    var IzjemniCollection = Dokument.PostavkaCollection.extend({
        model: IzjemniModel,
        url: baseUrl + '/rest/programIzjemni',
        index: 'sort'
    });


    var PonovitevPremiereModel = EnotaProgramaPostavka.extend({
        urlRoot: baseUrl + '/rest/programPonovitevPremiere'
    });
    var PonovitvePremierCollection = Dokument.PostavkaCollection.extend({
        model: PonovitevPremiereModel,
        url: baseUrl + '/rest/programPonovitevPremiere',
        index: 'sort'
    });


    var PonovitevPrejsnjeModel = EnotaProgramaPostavka.extend({
        urlRoot: baseUrl + '/rest/programPonovitevPrejsnjih'
    });
    var PonovitvePrejsnjihCollection = Dokument.PostavkaCollection.extend({
        model: PonovitevPrejsnjeModel,
        url: baseUrl + '/rest/programPonovitevPrejsnjih',
        index: 'sort'
    });


    var PremieraModel = EnotaProgramaPostavka.extend({
        urlRoot: baseUrl + '/rest/programPremiera'
    });
    var PremiereCollection = Dokument.PostavkaCollection.extend({
        model: PremieraModel,
        url: baseUrl + '/rest/programPremiera',
        index: 'sort'
    });


    var GostovanjeModel = EnotaProgramaPostavka.extend({
        urlRoot: baseUrl + '/rest/programGostovanje'
    });
    var GostovanjeCollection = Dokument.PostavkaCollection.extend({
        model: GostovanjeModel,
        url: baseUrl + '/rest/programGostovanje',
        index: 'sort'
    });


    var FestivalModel = EnotaProgramaPostavka.extend({
        urlRoot: baseUrl + '/rest/programFestival'
    });
    var FestivaliCollection = Dokument.PostavkaCollection.extend({
        model: FestivalModel,
        url: baseUrl + '/rest/programFestival',
        index: 'sort'
    });


    var RaznoModel = EnotaProgramaPostavka.extend({
        urlRoot: baseUrl + '/rest/programRazno'
    });
    var RazniCollection = Dokument.PostavkaCollection.extend({
        model: RaznoModel,
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
            festivali: {collection: FestivaliCollection, mappedBy: 'programDela'},
            programiRazno: {collection: RazniCollection, mappedBy: 'dokument'}
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'gostovanja':
                    postavka = new GostovanjeModel({
                        dokument: this.id
                    });
                    break;
                case 'gostujoci':
                    postavka = new GostujocaModel({
                        dokument: this.id
                    });
                    break;
                case 'izjemni':
                    postavka = new IzjemniModel({
                        dokument: this.id
                    });
                    break;
                case 'ponovitvePremiere':
                    postavka = new PonovitevPremiereModel({
                        dokument: this.id
                    });
                    break;
                case 'ponovitvePrejsnjih':
                    postavka = new PonovitevPrejsnjeModel({
                        dokument: this.id
                    });
                    break;
                case 'premiere':
                    postavka = new PremieraModel({
                        dokument: this.id
                    });
                    break;
                case 'festivali':
                    postavka = new FestivalModel({
                        programDela: this.id
                    });
                    postavka.programDela = this;
                    break;
                case 'programiRazno':
                    postavka = new RaznoModel({
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
        Postavka: PremieraModel
    };
});