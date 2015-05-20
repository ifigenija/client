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

    var UprizoritevStroskovnik = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/stroskovnik'
    });
    var UprizoritevArhivalija = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/arhivalija'
    });
    var UprizoritevOseba = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/oseba'
    });
    var UprizoritevUmetniskaEkipa = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/funkcija'
    });
    var UprizoritevNastopajoci = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/funkcija'
    });
    var UprizoritevOstaliSodelujoci = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/funkcija'
    });
    
    var UprizoritevStroskovnikCollection = Dokument.PostavkaCollection.extend({
        model: UprizoritevStroskovnik,
        url: baseUrl + '/rest/arhivalija',
        index: 'pozicija'
    });
    var UprizoritevArhivalijaCollection = Dokument.PostavkaCollection.extend({
        model: UprizoritevArhivalija,
        url: baseUrl + '/rest/arhivalija',
        index: 'pozicija'
    });
    
    var UprizoritevOsebaCollection = Dokument.PostavkaCollection.extend({
        model: UprizoritevOseba,
        url: baseUrl + '/rest/oseba',
        index: 'pozicija'
    });
    var UprizoritevUmetniskaEkipaCollection = Dokument.PostavkaCollection.extend({
        model: UprizoritevUmetniskaEkipa,
        url: baseUrl + '/rest/funkcija',
        index: 'pozicija'
    });
    var UprizoritevNastopajocuCollection = Dokument.PostavkaCollection.extend({
        model: UprizoritevNastopajoci,
        url: baseUrl + '/rest/funkcija',
        index: 'pozicija'
    });
    var UprizoritevOstaliSodelujociCollection = Dokument.PostavkaCollection.extend({
        model: UprizoritevOstaliSodelujoci,
        url: baseUrl + '/rest/funkcija',
        index: 'pozicija'
    });
    
    var UprizoritevModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/uprizoritev',
        nestedCollections: {
            stroskovniki: {collection: UprizoritevStroskovnikCollection, mappedBy: 'stroskovniki', filterBy: 'uprizoritev'},
            arhivalije: {collection: UprizoritevArhivalijaCollection, mappedBy: 'arhivalije', filterBy: 'uprizoritev'},
            osebe: {collection: UprizoritevOsebaCollection, mappedBy: 'osebe', filterBy: 'uprizoritev'},
            umetniskeEkipe: {collection: UprizoritevUmetniskaEkipaCollection, mappedBy: 'umetniskeEkipe', filterBy: 'uprizoritev'},
            nastopajoci: {collection: UprizoritevNastopajocuCollection, mappedBy: 'nastopajoci', filterBy: 'uprizoritev'},
            ostaliSodelujoci: {collection: UprizoritevOstaliSodelujociCollection, mappedBy: 'ostaliSodelujoci', filterBy: 'uprizoritev'}
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'stroskovniki':
                    postavka = new UprizoritevStroskovnik({
                        uprizoritev: this.id
                    });
                    break;
                case 'arhivalije':
                    postavka = new UprizoritevArhivalija({
                        uprizoritev: this.id
                    });
                    break;
                case 'osebe':
                    postavka = new UprizoritevOseba({
                        uprizoritev: this.id
                    });
                    break;
                case 'umetniskeEkipe':
                    postavka = new UprizoritevUmetniskaEkipa({
                        uprizoritev: this.id
                    });
                    break;
                case 'nastopajoci':
                    postavka = new UprizoritevNastopajoci({
                        uprizoritev: this.id
                    });
                    break;
                case 'ostaliSodelujoci':
                    postavka = new UprizoritevOstaliSodelujoci({
                        uprizoritev: this.id
                    });
                    break;
            }
            postavka.dokument = this;
            return postavka;
        }
    });
    return {
        Model: UprizoritevModel,
    };
});