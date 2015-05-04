/* 
 * Licenca GPLv3
 */

define([
    'marionette',
    'backbone',
    '../../max/Module/Form',
    'app/handlebars',
    //'app/max/Module/Backgrid',
    //'app/max/View/PaginatorControl',
    'app/max/View/PaginatedGrid',
    'app/max/Model/MaxPageableCollection',
    'underscore',
    'jquery',
    'app/max/Model/FormMetaCollection',
    'text!../tpl/uporabnik.tpl'

], function (
        Marionette,
        Backbone,
        Form,
        Handlebars,
        //Backgrid,
        //PaginatorControl,
        PaginatedGrid,
        MaxPageableCollection,
        _,
        $,
        FormMetaCollection,
        uporabnikTpl
        ) {

    /*var DrzavaView = Marionette.ItemView.extend({
     tagName: "tr",
     template: Handlebars.compile('<td class="naziv">{{isoNaziv}}</td><td>{{isoNum}}</td><td class="sifra">{{sifra}}</td>'),
     initialize: function (options) {
     this.model.on("change", this.render, this);
     },
     triggers: {
     "click .naziv": "uredi",
     "click .sifra": "odstrani"
     }
     });
     var DrzaveCollView = Marionette.CollectionView.extend({
     tagName: "table",
     className: "list-inline",
     childView: DrzavaView
     });*/

    var columns = [{
            name: "naziv",
            label: "Naziv",
            cell: "string"
        }, {
            name: "sifra",
            label: "Sifra",
            cell: "string"
        }, {
            name: "isoNum",
            label: "isoNum",
            cell: "string"
        }, {
            name: "isoNaziv",
            label: "isoNaziv",
            cell: "string"
        }, {
            name: "sifraDolg",
            label: "DS",
            cell: "string"
        }];

    /*var DrzavaModel = Backbone.Model.extend({
     urlRoot: "/rest/drzava"
     });
     
     var DrzaveColl = Backbone.Collection.extend({
     model: DrzavaModel,
     url: "/rest/drzava",
     });*/

    var DrzavaModel = Backbone.Model.extend({
        urlRoot: "/rest/drzava"
    });

    var DrzaveColl = MaxPageableCollection.extend({
        model: DrzavaModel,
        url: "/rest/drzava"
    });

    var formTpl = '<form class="form-vertical"><div data-fields="sifra,sifDolg,naziv,isoNum,isoNaziv,opomba"></div></form>';

    var UporabnikView = Marionette.LayoutView.extend({
        template: Handlebars.compile(uporabnikTpl),
        regions: {
            'uporabniskiPodatki': "#uporabniski-podatki",
            'vloge': "#vloge",
            'strani': "#strani"
        },
        triggers: {
            "click #shrani": "shrani",
            "click #dodaj": "dodaj",
            "click #json": "json"
        },
        initialize: function () {
            this.drzave = new DrzaveColl();

        },
        onRender: function () {
            var coll = this;
            this.formMetaCollection = new FormMetaCollection();
            this.formMetaCollection.getFormMeta(
                    'drzava',
                    '',
                    function (schema) {
                        coll.schema = schema;
                        coll.form = coll.getForm(new DrzavaModel());
                        coll.uporabniskiPodatki.show(coll.form);
                        coll.onPrikazi();
                    });
        }
    });

    UporabnikView.prototype.onJson = function () {
        $.ajax({
            url: '/rest/drzava',
            method: 'OPTIONS',
            mimeType: 'application/json',
            success: function (data, textStatus, json) {
                console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    };

    UporabnikView.prototype.getForm = function (model) {
        return new Form({
            template: Handlebars.compile(formTpl),
            schema: this.schema,
            model: model
        });

    };

    UporabnikView.prototype.onPrikazi = function () {
        /*this.drzave.fetch();
         var drView = new DrzaveCollView({
         collection: this.drzave
         });*/

        /*var drView = new Backgrid.Grid({
         row: Backgrid.ClickableRow,
         columns: columns,
         collection: this.drzave
         });
         
         this.drzave.fetch();
         this.vloge.show(drView);*/

        var pc = new PaginatedGrid({
            collection: this.drzave,
            columns: columns
        });

        this.drzave.fetch();
        this.strani.show(pc);

        this.drzave.on('selectValue', this.onUredi, this);
        this.drzave.on('backgrid:edited', this.onGridEdited, this);
    };

    UporabnikView.prototype.onUredi = function (model) {
        this.form = this.getForm(model);
        this.uporabniskiPodatki.show(this.form);
    };

    UporabnikView.prototype.onShrani = function (model, column, command) {
        var err = this.form.commit();
        if (!err) {
            var m = model;
            this.drzave.create(m);
        } else {
            console.log(err);
        }
    };

    UporabnikView.prototype.onGridEdited = function (model, schema, command) {

        if (!command.cancel()) {
            if (model.changedAttributes() || _.isObject(schema.get('optionValues'))) {
                model.save({});
            }
        }

    };

    UporabnikView.prototype.onOdstrani = function () {
        var err = this.form.commit();
        if (!err) {
            var m = this.form.model;
            this.drzave.sync("delete", m, {wait: true, success: function () {
                    this.drzave.remove(m);
                }});

            this.form = this.getForm(new DrzavaModel());
            this.uporabniskiPodatki.show(this.form);
        } else {
            console.log(err);
        }
    };

    UporabnikView.prototype.onDodaj = function () {
        this.form = this.getForm(new DrzavaModel());
        this.uporabniskiPodatki.show(this.form);

    };

    return UporabnikView;

});
