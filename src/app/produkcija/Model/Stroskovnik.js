define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore',
    'baseUrl'
], function (
        baseUrl,
        Dokument,
        _,
        baseUrl
        ) {

    var PogodbaModel = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/pogodba'
    });

    var PogodbaCollection = Dokument.PostavkaCollection.extend({
        model: PogodbaModel,
        url: baseUrl + '/rest/pogodba/vse',
        index: 'sifra',
        mode: 'client'
    });

    var KoprodukcijaModel = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/produkcijaDelitev'
    });

    var KoprodukcijaCollection = Dokument.PostavkaCollection.extend({
        model: KoprodukcijaModel,
        url: baseUrl + '/rest/produkcijaDelitev',
        index: 'koproducent',
        mode: 'client'
    });

    var AlternacijaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/alternacija'

    });

    var AlternacijaCollection = Dokument.PostavkaCollection.extend({
        model: AlternacijaModel,
        url: baseUrl + '/rest/alternacija/vse',
        index: 'sifra',
        mode: 'client'
    });

    var StrosekModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/strosekUprizoritve'

    });

    var StrosekCollection = Dokument.PostavkaCollection.extend({
        model: StrosekModel,
        url: baseUrl + '/rest/strosekUprizoritve/vse',
        index: 'sort',
        mode: 'client'
    });

    var UprizoritevStrosekModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/uprizoritev',
        nestedCollections: {
            alternacije: {collection: AlternacijaCollection, mappedBy: 'uprizoritev'},
            pogodbe: {collection: PogodbaCollection, mappedBy: 'uprizoritev'},
            koprodukcije: {collection: KoprodukcijaCollection, mappedBy: 'uprizoritev'},
            stroski: {collection: StrosekCollection, mappedBy: 'uprizoritev'}
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'koprodukcije':
                    postavka = new KoprodukcijaModel({
                        uprizoritev: this.get('id')
                    });
                    break;
                case 'alternacije':
                    postavka = new AlternacijaModel({
                        uprizoritev: this.get('id')
                    });
                    break;
                case 'pogodbe':
                    postavka = new PogodbaModel({
                        uprizoritev: this.get('id')
                    });
                    break;
                case 'stroski':
                    postavka = new StrosekModel({
                        uprizoritev: this.get('id')
                    });
                    break;
            }
            postavka.dokument = this;
            return postavka;
        }
    });

    return {
        Model: UprizoritevStrosekModel
    };
});