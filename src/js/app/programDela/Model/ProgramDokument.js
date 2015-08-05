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
        defaults: {
            tanF: 0.0,
            avtHonF: 0.0,
            matF: 0.0,
            odkupAPF: 0.0,
            odkupPF: 0.0,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPZF: 0.0, //mednarodno gostovanje
            dnevF: 0.0, //mednarodno gostovanje
            nasDelezF: 0.0
        },
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
        },
        preracunaj: function () {

            var vsota = 0;
            var produkt = 0;
            var faktor = this.get('nasDelezF');
            if (faktor) {
                produkt = this.get('nasDelez') * faktor;
                if (produkt) {
                    vsota += produkt;
                }
                this.set('nasDelezI', produkt);
            }

            faktor = this.get('tanF');
            if (faktor) {
                produkt = this.get('tantieme') * faktor;
                if (produkt) {
                    vsota += produkt;
                }
                this.set('tantiemeI', produkt);
            }

            faktor = this.get('avtHonF');
            if (faktor) {
                produkt = this.get('avtorskiHonorarji') * faktor;
                if (produkt) {
                    vsota += produkt;
                }
                this.set('avtorskiHonorarjiI', produkt);
            }

            faktor = this.get('matF');
            if (faktor) {
                produkt = this.get('materialni') * faktor;
                if (produkt) {
                    vsota += produkt;
                }
                this.set('materialniI', produkt);
            }

            faktor = this.get('odkupAPF');
            if (faktor) {
                produkt = this.get('avtorskePravice') * faktor;
                if (produkt) {
                    vsota += produkt;
                }
                this.set('avtorskePraviceI', produkt);
            }

            faktor = this.get('odkupPF');
            if (faktor) {
                produkt = this.get('odkupPredstave') * faktor;
                if (produkt) {
                    vsota += produkt;
                }
                this.set('odkupPredstaveI', produkt);
            }

            faktor = this.get('transStrF');
            if (faktor) {
                produkt = this.get('transportniStroski') * faktor;
                if (produkt) {
                    vsota += produkt;
                }
                this.set('transportniStroskiI', produkt);
            }

            faktor = this.get('dnevPZF');
            if (faktor) {
                produkt = this.get('dnevnicePZ') * faktor;
                if (produkt) {
                    vsota += produkt;
                }
                this.set('dnevnicePZI', produkt);
            }

            faktor = this.get('dnevF');
            if (faktor) {
                produkt = this.get('dnevnice') * faktor;
                if (produkt) {
                    vsota += produkt;
                }
                this.set('dnevniceI', produkt);
            }

            this.set('vsota', vsota);
        }
    });

    var PESklopaModel = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/programskaEnotaSklopa'
    });
    var PESklopiCollection = Dokument.PostavkaCollection.extend({
        model: PESklopaModel,
        url: baseUrl + '/rest/programskaEnotaSklopa'
    });

    var RaznoPostavka = EnotaProgramaPostavka.extend({
        defaults: {
            tanF: 0.0,
            avtHonF: 0.0,
            matF: 0.0,
            odkupAPF: 0.0,
            odkupPF: 0.0,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPZF: 0.0, //mednarodno gostovanje
            dnevF: 0.0, //mednarodno gostovanje
            nasDelezF: 0.7
        },
        nestedCollections: {
            drugiViri: {collection: DrugiViriCollection, mappedBy: 'enotaPrograma'},
            koprodukcije: {collection: KoprodukcijeCollection, mappedBy: 'enotaPrograma'},
            peSklopi: {collection: PESklopiCollection, mappedBy: 'programRazno'}
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
                case 'peSklopa':
                    postavka = new PESklopaModel({
                        programRazno: this.id
                    });
                    break;
            }
            postavka.dokument = this;
            return postavka;
        }
    });


    var GostujocaModel = EnotaProgramaPostavka.extend({
        urlRoot: baseUrl + '/rest/programGostujoca',
        defaults: {
            tanF: 0.0,
            avtHonF: 0.0,
            matF: 0.0,
            odkupAPF: 0.0,
            odkupPF: 0.5,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPZF: 0.0, //mednarodno gostovanje
            dnevF: 0.0, //mednarodno gostovanje
            nasDelezF: 0.0
        }
    });
    var GostujocaCollection = Dokument.PostavkaCollection.extend({
        model: GostujocaModel,
        url: baseUrl + '/rest/programGostujoca',
        index: 'sort'
    });


    var IzjemniModel = EnotaProgramaPostavka.extend({
        urlRoot: baseUrl + '/rest/programIzjemni',
        defaults: {
            tanF: 0.0,
            avtHonF: 0.0,
            matF: 0.0,
            odkupAPF: 0.0,
            odkupPF: 0.0,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPZF: 0.0, //mednarodno gostovanje
            dnevF: 0.0, //mednarodno gostovanje
            nasDelezF: 0.0
        }
    });
    var IzjemniCollection = Dokument.PostavkaCollection.extend({
        model: IzjemniModel,
        url: baseUrl + '/rest/programIzjemni',
        index: 'sort'
    });


    var PonovitevPremiereModel = EnotaProgramaPostavka.extend({
        urlRoot: baseUrl + '/rest/programPonovitevPremiere',
        defaults: {
            tanF: 0.7,
            avtHonF: 0.7,
            matF: 0.0,
            odkupAPF: 0.0,
            odkupPF: 0.0,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPZF: 0.0, //mednarodno gostovanje
            dnevF: 0.0, //mednarodno gostovanje
            nasDelezF: 0.0
        }
    });
    var PonovitvePremierCollection = Dokument.PostavkaCollection.extend({
        model: PonovitevPremiereModel,
        url: baseUrl + '/rest/programPonovitevPremiere',
        index: 'sort'
    });


    var PonovitevPrejsnjeModel = EnotaProgramaPostavka.extend({
        urlRoot: baseUrl + '/rest/programPonovitevPrejsnjih',
        defaults: {
            tanF: 0.6,
            avtHonF: 0.6,
            matF: 0.0,
            odkupAPF: 0.0,
            odkupPF: 0.0,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPZF: 0.0, //mednarodno gostovanje
            dnevF: 0.0, //mednarodno gostovanje
            nasDelezF: 0.0
        }
    });
    var PonovitvePrejsnjihCollection = Dokument.PostavkaCollection.extend({
        model: PonovitevPrejsnjeModel,
        url: baseUrl + '/rest/programPonovitevPrejsnjih',
        index: 'sort'
    });


    var PremieraModel = EnotaProgramaPostavka.extend({
        urlRoot: baseUrl + '/rest/programPremiera',
        defaults: {
            tanF: 0.7,
            avtHonF: 0.7,
            matF: 0.7,
            odkupAPF: 0.7,
            odkupPF: 0.0,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPZF: 0.0, //mednarodno gostovanje
            dnevF: 0.0, //mednarodno gostovanje
            nasDelezF: 0.0
        }
    });
    var PremiereCollection = Dokument.PostavkaCollection.extend({
        model: PremieraModel,
        url: baseUrl + '/rest/programPremiera',
        index: 'sort'
    });


    var GostovanjeModel = EnotaProgramaPostavka.extend({
        urlRoot: baseUrl + '/rest/programGostovanje',
        defaults: {
            tanF: 0.6,
            avtHonF: 0.6,
            matF: 0.0,
            odkupAPF: 0.7,
            odkupPF: 0.0,
            transStrF: 1.0, //mednarodno gostovanje
            dnevPZF: 1.0, //mednarodno gostovanje
            dnevF: 0.0, //mednarodno gostovanje
            nasDelezF: 0.0
        }
    });
    var GostovanjeCollection = Dokument.PostavkaCollection.extend({
        model: GostovanjeModel,
        url: baseUrl + '/rest/programGostovanje',
        index: 'sort'
    });


    var FestivalModel = EnotaProgramaPostavka.extend({
        urlRoot: baseUrl + '/rest/programFestival',
        defaults: {
            tanF: 0.0,
            avtHonF: 0.0,
            matF: 0.0,
            odkupAPF: 0.0,
            odkupPF: 0.0,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPZF: 0.0, //mednarodno gostovanje
            dnevF: 0.0, //mednarodno gostovanje
            nasDelezF: 0.7
        }
    });
    var FestivaliCollection = Dokument.PostavkaCollection.extend({
        model: FestivalModel,
        url: baseUrl + '/rest/programFestival',
        index: 'sort'
    });


    var RaznoModel = RaznoPostavka.extend({
        urlRoot: baseUrl + '/rest/programRazno',
        defaults: {
            tanF: 0.0,
            avtHonF: 0.0,
            matF: 0.0,
            odkupAPF: 0.0,
            odkupPF: 0.0,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPZF: 0.0, //mednarodno gostovanje
            dnevF: 0.0, //mednarodno gostovanje
            nasDelezF: 0.7
        }
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