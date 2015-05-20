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
        urlRoot: '/rest/trr'
    });
    var PopaNaslov = Dokument.Postavka.extend({
        urlRoot: '/rest/postniNaslov'
    });
    var PopaTelefon = Dokument.Postavka.extend({
        urlRoot: '/rest/telefonska'
    });
    
    var PopaTelefonCollection = Dokument.PostavkaCollection.extend({
        model: PopaTelefon,
        url: '/rest/telefonska',
        index: 'pozicija'
    });
    
    var PopaTrrCollection = Dokument.PostavkaCollection.extend({
        model: PopaTrr,
        url: '/rest/trr',
        index: 'pozicija'
    });

    
    var PopaNaslovCollection = Dokument.PostavkaCollection.extend({
        model: PopaNaslov,
        url: '/rest/postniNaslov',
        index: 'pozicija'
    });
    
    var PopaModel = Dokument.Model.extend({
        urlRoot: '/rest/popa',
        nestedCollections: {          
            trrji: {collection: PopaTrrCollection, mappedBy: 'trrji', filterBy: 'popa'},
            telefonske: {collection: PopaTelefonCollection, mappedBy: 'telefonske', filterBy: 'popa'},
            naslovi: {collection: PopaNaslovCollection, mappedBy: 'naslovi', filterBy: 'popa'}
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
            }
            postavka.dokument = this;
            return postavka;
        }
    });
    return {
        Model: PopaModel
    };
});