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
            strosekOdkPredF: 0.0,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPrvZadF: 0.0, //mednarodno gostovanje
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
        preracunajInfo: function (nasDelez) {

            var tan = this.get('tantieme');
            tan = tan ? tan : 0;
            
            var avtPra = this.get('avtorskePravice');
            avtPra = avtPra ? avtPra : 0;
            
            var avtHon = this.get('avtorskiHonorarji');
            avtHon = avtHon ? avtHon : 0;
            
            var mat = this.get('materialni');
            mat = mat ? mat : 0;
            
            var javni = this.get('drugiJavni');
            javni = javni ? javni : 0;
            
            var zap = this.get('zaproseno');
            zap = zap ? zap : 0;
            
            var dnevPrvZad = this.get('dnevPrvZad');            
            dnevPrvZad = dnevPrvZad ? dnevPrvZad : 0;
            
            var transport = this.get('transportniStroski');            
            transport = transport ? transport : 0;

            if (nasDelez) {
                this.set('nasDelez', tan + avtPra + avtHon + mat + dnevPrvZad);
            }

            var viri = this.drugiViriCollection;
            var kopro = this.koprodukcijeCollection;

            var viriVsota = 0;
            viri.each(function (vir) {
                viriVsota += vir.attributes.znesek;
            });

            var koproVsota = 0;
            var stevec = 0;
            kopro.each(function (produkcija) {
                if (stevec !== 0) {
                    koproVsota += produkcija.attributes.delez;
                }
                stevec++;
            });

            var nasD = this.get('nasDelez');
            nasD = nasD ? nasD : 0;
            
            //celvredgsz(ali se prešteje našemu deležu) in vlozekgost(odsteje od našega deleža)
            var lastSred = nasD - (javni + zap + viriVsota + transport);
            var celVred = nasD + koproVsota;

            this.set('lastnaSredstva', lastSred);
            this.set('celotnaVrednost', celVred);

        },
        preracunajZaproseno: function () {

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

            faktor = this.get('strosekOdkPredF');
            if (faktor) {
                produkt = this.get('strosekOdkPred') * faktor;
                if (produkt) {
                    vsota += produkt;
                }
                this.set('strosekOdkPredI', produkt);
            }

            faktor = this.get('transStrF');
            if (faktor) {
                produkt = this.get('transportniStroski') * faktor;
                if (produkt) {
                    vsota += produkt;
                }
                this.set('transportniStroskiI', produkt);
            }

            faktor = this.get('dnevPrvZadF');
            if (faktor) {
                produkt = this.get('dnevPrvZad') * faktor;
                if (produkt) {
                    vsota += produkt;
                }
                this.set('dnevPrvZadI', produkt);
            }

            faktor = this.get('dnevF');
            if (faktor) {
                produkt = this.get('dnev') * faktor;
                if (produkt) {
                    vsota += produkt;
                }
                this.set('dnevI', produkt);
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
            strosekOdkPredF: 0.0,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPrvZadF: 0.0, //mednarodno gostovanje
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
                    postavka.programRazno = this;
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
            strosekOdkPredF: 0.5,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPrvZadF: 0.0, //mednarodno gostovanje
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
            tanF: 1.0,
            avtHonF: 1.0,
            matF: 1.0,
            odkupAPF: 1.0,
            strosekOdkPredF: 0.0,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPrvZadF: 0.0, //mednarodno gostovanje
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
            strosekOdkPredF: 0.0,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPrvZadF: 0.0, //mednarodno gostovanje
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
            strosekOdkPredF: 0.0,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPrvZadF: 0.0, //mednarodno gostovanje
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
            strosekOdkPredF: 0.0,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPrvZadF: 0.0, //mednarodno gostovanje
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
            strosekOdkPredF: 0.0,
            transStrF: 1.0, //mednarodno gostovanje
            dnevPrvZadF: 1.0, //mednarodno gostovanje
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
            strosekOdkPredF: 0.0,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPrvZadF: 0.0, //mednarodno gostovanje
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
            strosekOdkPredF: 0.0,
            transStrF: 0.0, //mednarodno gostovanje
            dnevPrvZadF: 0.0, //mednarodno gostovanje
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