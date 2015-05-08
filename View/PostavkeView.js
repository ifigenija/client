define([
    'radio',
    'app/Max/Module/Backgrid',
    'backbone',
    'app/bars',
    'underscore',
    'app/Max/View/BackgridFooter',
    'app/Dokument/View/FormView',
    'text!app/Dokument/tpl/postavke.tpl'
], function (
        Radio,
        Backgrid,
        Backbone,
        Handlebars,
        _,
        BackgridFooter,
        FormView,
        tpl
        ) {

    var PostavkeView = FormView.extend({
        gridMeta: {},
        template: Handlebars.compile(tpl),
        formTitle: 'Postavke',
        buttons: {
            dodaj: {
                id: 'doc-postavka-dodaj',
                label: 'Dodaj',
                element: 'button-trigger',
                trigger: 'dodaj'
            },
            shrani: {
                id: 'doc-postavka-shrani',
                label: 'Shrani',
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            preklici: {
                id: 'docedit-skrij-postavko',
                label: 'Prekliči',
                element: 'button-trigger',
                trigger: 'preklici'
            }
        },
        sums: {},
        detailName: 'postavke',
        constructor: function (options) {
            // preprečimo klic initialize() parent konstruktorja
            var init = this.initialize;
            this.initialize = function () {
            };

            FormView.call(this, options);

            this.addRegions({
                regionToolbar: '.region-postavke-toolbar',
                regionForm: '.region-postavke-form',
                regionList: '.region-postavke-list'
            });

            this.dokument = options.dokument;

            this.listenTo(this.collection, 'backgrid:action', this.onGridAction);

            this.initialize = init;
            this.initialize.apply(this, arguments);
        },
        serializeData: function () {
            return  {
                formTitle: this.formTitle
            };
        }
    });

    /**
     * Osnovni hook za spremembe na formi. tukaj preklapljamo 
     * gumb shrani
     * @param {type} form
     * @returns {undefined}
     */
    PostavkeView.prototype.onFormChange = function (form) {
        var tb = this.getToolbarModel();
        var but = tb.getButton('doc-postavka-shrani');
        if (but.get('disabled')) {
            but.set({
                disabled: false
            });
        }

    };
    PostavkeView.prototype.render = function () {
        FormView.prototype.render.apply(this, arguments);
        this.renderList();
        this.triggerMethod('after:render:postavke');
        return this;
    };

    PostavkeView.prototype.onGridAction = function (model, action) {
        this.triggerMethod(action, model);
    };

    PostavkeView.prototype.renderList = function () {
        var grid = new Backgrid.Grid({
            collection: this.collection,
            columns: this.gridMeta,
            footer: BackgridFooter.extend({columns: this.gridMeta})
        });
        this.regionList.show(grid);
        return grid;
    };

    PostavkeView.prototype.prepareToolbar = function () {
        return  this.model ?
                [[this.buttons.shrani, this.buttons.preklici]] : [[this.buttons.dodaj]];

    };

    /**
     * Kaj se zgodi 
     * 
     * @returns {undefined}
     */
    PostavkeView.prototype.onGridItemEdited = function (model) {

        var self = this;
        this.triggerMethod('item:edited', model, {success: function () {
            }
        });
    };

    PostavkeView.prototype.onItemEdited = function (model, options) {
        this.shrani(model, options);
    };

    PostavkeView.prototype.shrani = function (model, options) {
        options = options || {};

        var self = this;
        var collection = this.collection.fullCollection || this.collection;
        collection.create(model, {
            wait: true,
            success: function () {
                Radio.channel('error').command('flash', {
                    message: 'Postavka uspešno shranjena',
                    severity: 'success'
                });
                if (options.success) {
                    if (collection.comparator) {
                        collection.sort();
                    }
                    options.success.apply(self, arguments);
                }
            },
            error: function (model, xhr) {
                Radio.channel('error').command('xhr', model, xhr);
                if (options.error) {
                    options.error.apply(self, arguments);
                }
            }
        });
        return true;

    };

    PostavkeView.prototype.isNew = function () {
        return this.model ? FormView.prototype.isNew.call(this) : true;
    };



    PostavkeView.prototype.onDodaj = function () {
        this.model = this.dokument.dodajPostavko(this.detailName);
        this.triggerMethod('get:defaults', this.model);
        this.renderFormAndToolbar();
    };

    PostavkeView.prototype.onUredi = function (model) {
        this.model = model;
        this.renderFormAndToolbar();
    };

    PostavkeView.prototype.onShrani = function () {
        var self = this;
        if (this.commit()) {
            this.shrani(this.model, {success: function () {
                    self.model = null;
                    var tb = self.getToolbarModel();
                    var but = tb.getButton('doc-postavka-shrani');
                    if (but) {
                        but.set('disabled', true);
                    }
                    this.regionForm.empty();
                    this.renderToolbar();
                }
            });
        }
        return false;
    };

    PostavkeView.prototype.onPreklici = function () {
        this.model = null;
        this.regionForm.empty();
        this.renderToolbar();
    };

    PostavkeView.prototype.onBrisi = function (model) {
        this.collection.get(model).destroy({wait: true,
        });
    };

    PostavkeView.prototype.onPremakniGor = function (model) {
        this.collection.moveUp(model);
    };

    PostavkeView.prototype.onPremakniDol = function (model) {
        this.collection.moveDown(model);
    };

    return PostavkeView;
});