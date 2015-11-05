define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {

    var PogodbaModel = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/pogodba',
        getVrednost: function (atribut) {
            var vred = this.get(atribut);
            return vred = vred ? vred : 0;
        },
        preracunajVrednostDo: function () {
            var vaja = this.getVrednost('vrednostVaje');
            var stVaj = this.getVrednost('planiranoSteviloVaj');

            if (vaja && stVaj) {
                return vaja * stVaj;
            }
            return 0;
        }
    });

    var PogodbaCollection = Dokument.PostavkaCollection.extend({
        model: PogodbaModel,
        url: baseUrl + '/rest/pogodba',
        mode: 'server'
    });

    var AlternacijaModel = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/alternacija'
    });

    var AlternacijaCollection = Dokument.PostavkaCollection.extend({
        model: AlternacijaModel,
        url: baseUrl + '/rest/alternacija',
        mode: 'server'
    });

    var StrosekModel = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/strosekUprizoritve'
    });

    var StrosekCollection = Dokument.PostavkaCollection.extend({
        model: StrosekModel,
        url: baseUrl + '/rest/strosekUprizoritve',
        mode: 'server'
    });

    var UprizoritevStrosekModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/uprizoritev',
        nestedCollections: {
            alternacije: {collection: AlternacijaCollection, mappedBy: 'uprizoritev'},
            pogodbe: {collection: PogodbaCollection, mappedBy: 'uprizoritev'},
            stroski: {collection: StrosekCollection, mappedBy: 'uprizoritev'}
        },
        dodajPogodbo: function (alternacija) {

            var pogodba;
            if (alternacija) {
                pogodba = new PogodbaModel({
                    alternacije: alternacija,
                    oseba: alternacija.get('oseba')
                });
            } else {
                pogodba = new PogodbaModel();
            }
            pogodba.dokument = this;
            return pogodba;
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
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