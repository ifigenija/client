define([
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        Dokument,
        _
        ) {

    var Drzava = Dokument.Postavka.extend({
        defaults: {
            kolicina: 1,
            status: '100'
        }
    });
    
    var DrzavaCollection = Dokument.PostavkaCollection.extend({
        model: PostavkaDrzava,
        //entity: 'Tehnologija-KalkMaterial',
        url: '/rest/drzava',
        index: 'pozicija',
    });
    
    var DokumentDrzv = Dokument.Model.extend({
        //entity: 'Tehnologija-Kalk',
        urlRoot: '/rest/drzava',
        nestedCollections: {
            drzave: {collection: DrzavaCollection, mappedBy: 'dokument'}
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'drzave':
                    postavka = new PostavkaDrzava({
                        dokument: this.id
                    });
                    break;
            }
            postavka.dokument = this;
            return postavka;
        }
    });
    return {
        Dokument: DokumentDrzv
    };
});