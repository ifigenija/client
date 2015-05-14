define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {

    var UprizoritevArhivalija = Dokument.Postavka.extend({
        urlRoot: '/rest/arhivalija'
    });
    var UprizoritevOseba = Dokument.Postavka.extend({
        urlRoot: '/rest/oseba'
    });
    var UprizoritevUmetniskaEkipa = Dokument.Postavka.extend({
        urlRoot: '/rest/funkcija'
    });
    var UprizoritevNastopajoci = Dokument.Postavka.extend({
        urlRoot: '/rest/funkcija'
    });
    var UprizoritevOstaliSodelujoci = Dokument.Postavka.extend({
        urlRoot: '/rest/funkcija'
    });
    
    var UprizoritevArhivalijaCollection = Dokument.PostavkaCollection.extend({
        model: UprizoritevArhivalija,
        url: '/rest/arhivalija',
        index: 'pozicija'
    });
    
    var UprizoritevOsebaCollection = Dokument.PostavkaCollection.extend({
        model: UprizoritevOseba,
        url: '/rest/oseba',
        index: 'pozicija'
    });
    var UprizoritevUmetniskaEkipaCollection = Dokument.PostavkaCollection.extend({
        model: UprizoritevUmetniskaEkipa,
        url: '/rest/funkcija',
        index: 'pozicija'
    });
    var UprizoritevNastopajocuCollection = Dokument.PostavkaCollection.extend({
        model: UprizoritevNastopajoci,
        url: '/rest/funkcija',
        index: 'pozicija'
    });
    var UprizoritevOstaliSodelujociCollection = Dokument.PostavkaCollection.extend({
        model: UprizoritevOstaliSodelujoci,
        url: '/rest/funkcija',
        index: 'pozicija'
    });
    
    var UprizoritevModel = Dokument.Model.extend({
        urlRoot: '/rest/uprizoritev',
        nestedCollections: {
            arhivalije: {collection: UprizoritevArhivalijaCollection, mappedBy: 'arhivalije', filterBy: 'uprizoritev'},
            osebe: {collection: UprizoritevOsebaCollection, mappedBy: 'osebe', filterBy: 'uprizoritev'},
            umetniskeEkipe: {collection: UprizoritevUmetniskaEkipaCollection, mappedBy: 'umetniskeEkipe', filterBy: 'uprizoritev'},
            nastopajoci: {collection: UprizoritevNastopajocuCollection, mappedBy: 'nastopajoci', filterBy: 'uprizoritev'},
            OstaliSodelujoci: {collection: UprizoritevOstaliSodelujociCollection, mappedBy: 'ostaliSodelujoci', filterBy: 'uprizoritev'}
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
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
                case 'OstaliSodelujoci':
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