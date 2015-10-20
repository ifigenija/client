define([
    'radio',
    'i18next',
    'marionette',
    './OrgEnotaTree',
    'app/Dokument/View/FormView',
    'app/Max/View/PaginatedGrid',
    'app/Max/View/TabControl',
    '../Model/OrgEnotaTreeModel',
    '../Model/Zaposlitev',
    'template!../tpl/orgEnota-manager.tpl',
    'template!../tpl/orgEnota-form.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!organizacijskaEnota',
    'formSchema!zaposlitev',
    'app/Max/Module/Backgrid',
    'template!../tpl/orgEnota-form-simple.tpl'
], function (
        Radio,
        i18next,
        Marionette,
        OrgEnotaTree,
        FormView,
        PaginatedGrid,
        TabControl,
        OrgEnotaTreeModel,
        ZaposlitevModel,
        tpl,
        formTpl,
        ZapisiLayout,
        schema,
        schemaZap,
        Backgrid,
        template
        ) {

    var tabsVsi = [{
            name: i18next.t('orgEnota.title'),
            event: 'show:form'
        }, {
            name: i18next.t('orgEnota.zaposleni'),
            event: 'show:zaposleni'
        }, {
            name: i18next.t('orgEnota.zapisi'),
            event: 'show:zapisi'
        }];

    var OrgEnotaManager = Marionette.LayoutView.extend({
        template: tpl,
        regions: {
            treeR: '#tree-container',
            detailR: '#orgEnota-detail',
            tabsR: '#tabs'
        },
        ui: {
            tabs: 'ul.nav-tabs'
        },
        triggers: {
            'click ': 'hide:tree',
            'click .orgEnota-dodaj': 'dodaj:org:enoto',
            'click .orgEnota-odstrani': 'odstrani:org:enoto'
        },
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('zaposlitev.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('oseba.priimek'),
                name: 'oseba.priimek',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('oseba.ime'),
                name: 'oseba.ime',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('oseba.psevdonim'),
                name: 'oseba.psevdonim',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('zaposlitev.delovnoMesto'),
                name: 'delovnoMesto',
                sortable: true
            },
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: schemaZap.getOptionValues('status')
                }),
                editable: false,
                label: i18next.t('zaposlitev.status'),
                name: 'status',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'date',
                editable: false,
                label: i18next.t('zaposlitev.zacetek'),
                name: 'zacetek',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'date',
                editable: false,
                label: i18next.t('zaposlitev.konec'),
                name: 'konec',
                sortable: true
            }
        ]
    });
    OrgEnotaManager.prototype.initialize = function (options) {
        this.seznam = new ZaposlitevModel.Collection();
    };
    OrgEnotaManager.prototype.onRender = function () {
        this.showTree(null);
    };
    OrgEnotaManager.prototype.showTree = function (parent) {
        var treeCollection = new OrgEnotaTreeModel.collection({}, {
            parent: parent
        });
        var tree = new OrgEnotaTree({
            collection: treeCollection
        });
        var self = this;
        treeCollection.fetch();
        tree.on('node:selected', function (view) {
            self.triggerMethod("tree:item:selected", view);
        });
        this.treeR.show(tree);
    };
    OrgEnotaManager.prototype.onTreeItemSelected = function (view) {
        this.selected = view;
        this.seznam.setOrgEnota(this.selected.model);

        var tabs = null;
        if (!this.selected.model.get('id')) {
            tabs = null;
        } else {
            tabs = tabsVsi;
        }
        this.renderTabs(tabs);
    };
    OrgEnotaManager.prototype.onShowZaposleni = function () {
        var self = this;
        var zaposleniGrid = new PaginatedGrid({
            collection: this.seznam,
            columns: this.columns
        });
        this.seznam.getFirstPage({
            reset: true
        });
        self.detailR.show(zaposleniGrid);
    };
    OrgEnotaManager.prototype.onShowZapisi = function () {
        var view = new ZapisiLayout({
            lastnik: this.selected.model.get('id'),
            classLastnika: 'OrganizacijskaEnota'
        });
        this.detailR.show(view);
    };
    OrgEnotaManager.prototype.onHideTree = function () {

    };
    OrgEnotaManager.prototype.onDodajOrgEnoto = function () {
        if (this.selected.model) {
            var parent = this.selected.model;
            this.selected = {};
            this.selected.model = new OrgEnotaTreeModel.model({
                parent: parent
            });

            var tabs = null;
            if (!this.selected.model.get('id')) {
                tabs = null;
            } else {
                tabs = tabsVsi;
            }
            this.renderTabs(tabs);
            this.onShowForm();
        }
    };
    OrgEnotaManager.prototype.onOdstraniOrgEnoto = function () {
        console.log('odstrani');
    };
    OrgEnotaManager.prototype.onShowForm = function () {
        if (this.selected && this.selected.model) {
            var model = this.selected.model;
            var Fv = this.getFormView(model);
            var form = new Fv({
                model: model
            });

            this.detailR.show(form);
        }
    };

    /**
     * 
     * @returns {Marionette.LayoutView@call;extend.prototype.getFormView.form}
     */
    OrgEnotaManager.prototype.getFormView = function (model) {
        var self = this;
        var Fv = FormView.extend({
            formTitle: i18next.t(self.getTitle(model)),
            schema: schema.toFormSchema().schema,
            formTemplate: formTpl,
            //template: template,
            serializeData: function () {
                return  {
                    formTitle: this.formTitle
                };
            },
            buttons: FormView.prototype.defaultButtons,
            onPreklici: function () {
                self.detailR.empty();
                self.tabsR.empty();
            }
        });

        return Fv;
    };

    OrgEnotaManager.prototype.getTitle = function (model) {
        var text = i18next.t("orgEnota.nova");

        if (model.get('id')) {
            text = model.get('naziv') || "Naziv";
        }
        return text;
    };

    /**
     * Izris tabov
     * @returns {OsebaEditView_L11.TabControl}
     */
    OrgEnotaManager.prototype.renderTabs = function (tabs) {
        this.tabControl = new TabControl({tabs: tabs, listener: this});
        this.tabsR.show(this.tabControl);
        return this.tabControl;
    };

    return OrgEnotaManager;
});