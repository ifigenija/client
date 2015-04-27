define(['application',
    'backbone',
    'marionette',
    'underscore',
    'text!../tpl/priponke.tpl',
    '../View/DodajDatoteko',
    '../Model/Datoteka',
    '../View/DatotekaDetail',
    '../View/DodajPriponko',
    '../View/FileManager',
    '../View/IzberiMapo',
    '../View/PriponkeList',
    '../Model/PriponkeCollection',
    '../Model/PriponkaMeta',
    '../Model/MapeModel'
],
        function (
                App,
                Backbone,
                Marionette,
                _,
                tpl,
                DodajDatoteko,
                Datoteka,
                DatotekaDetail,
                DodajPriponko,
                FileManager,
                IzberiMapo,
                PriponkeList,
                PriponkeCollection,
                PriponkaMeta,
                MapeModel) {

            return Marionette.Layout.extend({
                template: _.template(tpl),
                fetchMeta: false,
                events: {
                    'click .btn-dodaj-priponko': 'dodajPriponko',
                },
                regions: {
                    seznamPriponk: '#seznam-priponk',
                },
                ui: {
                    btnDodaj: '.btn-dodaj-priponko',
                },
                initialize: function (options) {
                    this.owner = options.owner;
                    this.ownerClass = options.ownerClass;
                    this.fetchMeta = options.fetchMeta || false;
                    this.eventPrefix = options.eventPrefix || 'priponke';
                    this.bind('priponka:refresh', this.priponkaRefresh, this);
                    this.kolekcija = new PriponkeCollection({}, {
                        owner: options.owner,
                        ownerClass: options.ownerClass
                    });
                    this.kolekcija.fetch();                    
                },
                metaReceived: function (model) {
                    var data = model.get('data');
                    var meta = model.get('meta');                    
                    this.$('.priponke-header').text(meta[0].label + ':' +  data[0].ident); 
                },
                prikaziSeznam: function (kolekcija) {
                    var plv = new PriponkeList({
                        collection: this.kolekcija
                    });
                    plv.bind('priponka:selected', this.priponkaSelect, this);
                    this.seznamPriponk.show(plv);
                    
                    if (this.fetchMeta) {
                        var meta = new PriponkaMeta({
                            id: this.owner
                        }, {
                            entity: this.ownerClass
                        });
                        _.bindAll(this, 'metaReceived');
                        meta.fetch({
                            success: this.metaReceived
                        });
                    }
                }
             
            });
        });


