define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {

    var UporabnikVloge = Dokument.Postavka.extend({
        urlRoot: '/rest/role'
    });
    
    var UporabnikVlogeCollection = Dokument.PostavkaCollection.extend({
        model: UporabnikVloge,
        url: '/rest/role',
        index: 'pozicija'
    });
    
    var UporabnikModel = Dokument.Model.extend({
        urlRoot: '/rest/user',
        nestedCollections: {
            vloge: {collection: UporabnikVlogeCollection, mappedBy: 'vloge', filterBy: 'user'}
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'vloge':
                    postavka = new UporabnikVloge({
                        uporabnik: this.id
                    });
                    break;
            }
            postavka.dokument = this;
            return postavka;
        }
    });
    return {
        Model: UporabnikModel,
    };
});