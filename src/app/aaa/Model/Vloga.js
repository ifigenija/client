define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {

    var VlogaDovoljenja = Dokument.Postavka.extend({
        urlRoot: '/rest/permission'
    });
    
    var VlogaDovoljenjaCollection = Dokument.PostavkaCollection.extend({
        model: VlogaDovoljenja,
        url: '/rest/permission',
        index: 'pozicija'
    });
    
    var VlogaModel = Dokument.Model.extend({
        urlRoot: '/rest/role',
        nestedCollections: {
            vloge: {collection: VlogaDovoljenjaCollection, mappedBy: 'dovoljenja', filterBy: 'role'}
        },
        dodajPostavko: function (nested) {

            if (!_.contains(_.keys(this.nestedCollections), nested)) {
                console.log('napačni dodaj', nested);
            }
            var postavka;
            switch (nested) {
                case 'dovoljenja':
                    postavka = new VlogaDovoljenja({
                        vloga: this.id
                    });
                    break;
            }
            postavka.dokument = this;
            return postavka;
        }
    });
    return {
        Model: VlogaModel,
    };
});