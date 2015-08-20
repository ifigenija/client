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
                this.set('nasDelez', tan + avtPra + avtHon + mat + dnevPrvZad + transport);
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
            var lastSred = nasD - (javni + zap + viriVsota);
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
            programskeEnoteSklopa: {collection: PESklopiCollection, mappedBy: 'programRazno'}
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
                case 'programskeEnoteSklopa':
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
        },
        /**
         * pridobimo vrednost atributa, ki ga podamo kot parameter.
         * V primeru da ne obstaja vrnemo 0
         * @param {type} spremenljivka
         * @returns {ProgramDokument_L5.ProgramDokumentAnonym$30.getVrednost@call;get|Number}
         */
        getVrednost: function (spremenljivka) {
            var vrednost = this.get(spremenljivka);

            return vrednost ? vrednost : 0;
        },
        /**
         * Preračunamo vrednosti za tabelo kazalnikov
         * @returns {undefined}
         */
        preracunajKazalnike: function () {

            //kazalniki glavni dokument
            var stIzvPrem = this.getVrednost('stIzvPrem');
            var stIzvPonPrem = this.getVrednost('stIzvPonPrem');
            var stIzvPonPrej = this.getVrednost('stIzvPonPrej');
            var stIzvGostovanjInt = this.getVrednost('stIzvGostovanjInt');

            var stVsehPredstav = stIzvPrem + stIzvPonPrem + stIzvPonPrej + stIzvGostovanjInt;
            this.set('stVsehPredstav', stVsehPredstav);

            //Programski sklop ena
            //število enot
            var stPremier = this.getVrednost('stPremier');
            var stPonPrem = this.getVrednost('stPonPrem');
            var stPonPrej = this.getVrednost('stPonPrej');
            var stGostujo = this.getVrednost('stGostujo');

            var stEnotSK1 = stPremier + stPonPrem + stPonPrej + stGostujo;
            this.set('stEnotSK1', stEnotSK1);

            //zaprošena sredstva MK
            var sredZapPrem = this.getVrednost('sredstvaZaprosenoPrem');
            var sredZapPonPrem = this.getVrednost('sredstvaZaprosenoPonPrem');
            var sreZapPonPrej = this.getVrednost('sredstvaZaprosenoPonPrej');
            var sredZapGostujo = this.getVrednost('sredstvaZaprosenoGostujo');

            var mkViriSK1 = sredZapPrem + sredZapPonPrem + sreZapPonPrej + sredZapGostujo;
            this.set('mkViriSK1', mkViriSK1);

            //sredstva drugi javni viri in lokalne skupnosti
            var sredDJPrem = this.getVrednost('sredstvaDrugiJavniPrem');
            var sredDJPonPrem = this.getVrednost('sredstvaDrugiJavniPonPrem');
            var sredDJPonPrej = this.getVrednost('sredstvaDrugiJavniPonPrej');
            var sredDJGostujo = this.getVrednost('sredstvaDrugiJavniGostujo');

            var dmlsViriSK1 = sredDJPrem + sredDJPonPrem + sredDJPonPrej + sredDJGostujo;
            this.set('dmlsViriSK1', dmlsViriSK1);

            // drugi viri
            var sredDVPrem = this.getVrednost('sredstvaDrugiViriPrem');
            var sredDVPonPrem = this.getVrednost('sredstvaDrugiViriPonPrem');
            var sredDVPonPrej = this.getVrednost('sredstvaDrugiViriPonPrej');
            var sredDVGostujo = this.getVrednost('sredstvaDrugiViriGostujo');

            var drugiViriSK1 = sredDVPrem + sredDVPonPrem + sredDVPonPrej + sredDVGostujo;
            this.set('drugiViriSK1', drugiViriSK1);

            var premiereSredstva = sredZapPrem + sredDJPrem + sredDVPrem;
            var ponovitvePremierSredstva = sredZapPonPrem + sredDJPonPrem + sredDVPonPrem;
            var ponovitvePrejsnjihSredstva = sreZapPonPrej + sredDJPonPrej + sredDVPonPrej;
            var gostujoceSredstva = sredZapGostujo + sredDJGostujo + sredDVGostujo;

            this.set('premiereSredstva', premiereSredstva);
            this.set('ponovitvePremierSredstva', ponovitvePremierSredstva);
            this.set('ponovitvePrejsnjihSredstva', ponovitvePrejsnjihSredstva);
            this.set('gostujoceSredstva', gostujoceSredstva);

            this.set('sredstvaSkupajSK1',
                    premiereSredstva +
                    ponovitvePremierSredstva +
                    ponovitvePrejsnjihSredstva +
                    gostujoceSredstva
                    );

            //Programski sklop dva
            //število enot
            var stInt = this.getVrednost('stInt');
            var stFest = this.getVrednost('stFest');
            var stRazno = this.getVrednost('stRazno');
            var stIzjem = this.getVrednost('stIzjem');

            var stEnotSK2 = stInt + stFest + stRazno + stIzjem;
            this.set('stEnotSK2', stEnotSK2);

            //zaprošena sredstva MK
            var sredZapInt = this.getVrednost('sredstvaZaprosenoInt');
            var sredZapFest = this.getVrednost('sredstvaZaprosenoFest');
            var sredZapRazno = this.getVrednost('sredstvaZaprosenoRazno');
            var sredZapIzjem = this.getVrednost('sredstvaZaprosenoIzjem');

            var mkViriSK2 = sredZapInt + sredZapFest + sredZapRazno + sredZapIzjem;
            this.set('mkViriSK2', mkViriSK2);

            //sredstva drugi javni viri in lokalne skupnosti
            var sredDJInt = this.getVrednost('sredstvaDrugiJavniInt');
            var sredDJFest = this.getVrednost('sredstvaDrugiJavniFest');
            var sredDJRazno = this.getVrednost('sredstvaDrugiJavniRazno');
            var sredDJIzjem = this.getVrednost('sredstvaDrugiJavniIzjem');

            var dmlsViriSK2 = sredDJInt + sredDJFest + sredDJRazno + sredDJIzjem;
            this.set('dmlsViriSK2', dmlsViriSK2);

            // drugi viri
            var sredDVInt = this.getVrednost('sredstvaDrugiViriInt');
            var sredDVFest = this.getVrednost('sredstvaDrugiViriFest');
            var sredDVRazno = this.getVrednost('sredstvaDrugiViriRazno');
            var sredDVIzjem = this.getVrednost('sredstvaDrugiViriIzjem');

            var drugiViriSK2 = sredDVInt + sredDVFest + sredDVRazno + sredDVIzjem;
            this.set('drugiViriSK2', drugiViriSK2);

            var gostovanjaSredstva = sredZapInt + sredDJInt + sredDVInt;
            var festivaliSredstva = sredZapFest + sredDJFest + sredDVFest;
            var raznoSredstva = sredZapRazno + sredDJRazno + sredDVRazno;
            var izjemniSredstva = sredZapIzjem + sredDJIzjem + sredDVIzjem;

            this.set('gostovanjaSredstva', gostovanjaSredstva);
            this.set('festivaliSredstva', festivaliSredstva);
            this.set('raznoSredstva', raznoSredstva);
            this.set('izjemniSredstva', izjemniSredstva);

            this.set('sredstvaSkupajSK2',
                    gostovanjaSredstva +
                    festivaliSredstva +
                    raznoSredstva +
                    izjemniSredstva
                    );

            //skupaj programski sklop ena in programski sklop dva
            var stEnotSkupaj = stEnotSK1 + stEnotSK2;
            var mkViriSkupaj = mkViriSK2 + mkViriSK2;
            var dmlsViriSkupaj = dmlsViriSK2 + dmlsViriSK2;
            var drugiViriSkupaj = drugiViriSK2 + drugiViriSK2;

            this.set('stEnotSkupaj', stEnotSkupaj);
            this.set('mkViriSkupaj', mkViriSkupaj);
            this.set('dmlsViriSkupaj', dmlsViriSkupaj);
            this.set('drugiViriSkupaj', drugiViriSkupaj);

            this.set('skSkupaj', mkViriSkupaj + dmlsViriSkupaj + drugiViriSkupaj);

            //kazalniki priloga 2
            this.set('stIzvPremProd', stIzvPrem + stIzvPonPrem);
        }
    });
    return {
        Model: ProgramDelaModel,
        Postavka: PremieraModel
    };
});