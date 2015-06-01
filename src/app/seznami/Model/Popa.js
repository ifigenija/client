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

    var PopaTrr = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/trr'
    });
    var PopaNaslov = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/postniNaslov'
    });
    var PopaTelefon = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/telefonska'
    });
    
    var PopaTelefonCollection = Dokument.PostavkaCollection.extend({
        model: PopaTelefon,
        url: baseUrl + '/rest/telefonska',
        index: 'vrsta'
    });

    var Kontaktna = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/kontaktnaoseba'
    });
    
    var KontaktneCollection = Dokument.PostavkaCollection.extend({
        model: Kontaktna,
        url: baseUrl + '/rest/kontaktnaoseba',
        index: 'funkcija'
    });
    
    var PopaTrrCollection = Dokument.PostavkaCollection.extend({
        model: PopaTrr,
        url: baseUrl + '/rest/trr',
        index: 'banka'
    });

    
    var PopaNaslovCollection = Dokument.PostavkaCollection.extend({
        model: PopaNaslov,
        url: baseUrl + '/rest/postniNaslov',
        index: 'naziv'
    });
    
    var PopaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/popa',
        nestedCollections: {          
            trrji: {collection: PopaTrrCollection, mappedBy: 'popa'},
            telefonske: {collection: PopaTelefonCollection, mappedBy: 'popa'},
            naslovi: {collection: PopaNaslovCollection, mappedBy: 'popa'},
            kontaktne: {collection: KontaktneCollection, mappedBy: 'popa'}
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'trrji':
                    postavka = new PopaTrr({
                        popa: this.id
                    });
                    break;
                case 'naslovi':
                    postavka = new PopaNaslov({
                        popa: this.id
                    });
                    break;
                case 'telefonske':
                    postavka = new PopaTelefon({
                        popa: this.id
                    });
                    break;
                case 'kontaktne':
                    postavka = new Kontaktna({
                        popa: this.id
                    });
                    break;
            }
            postavka.dokument = this;
            return postavka;
        }
    });
    return {
        Model: PopaModel
    };
});