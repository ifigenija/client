define([
    'radio',
    'i18next',
    'marionette',
    './OrgEnotaTree',
    'app/Max/Module/Form',
    'app/Max/View/PaginatedGrid',
    'app/Max/View/TabControl',
    'app/Max/View/TabControl',
    '../Model/OrgEnotaTreeModel',
    '../Model/Zaposlitev',
    'template!../tpl/orgEnota-manager.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!organizacijskaEnota',
    'formSchema!zaposlitev',
    'app/Max/Module/Backgrid'
], function (
        Radio,
        i18next,
        Marionette,
        OrgEnotaTree,
        Form,
        PaginatedGrid,
        TabControl,
        Toolbar,
        OrgEnotaTreeModel,
        ZaposlitevModel,
        tpl,
        ZapisiLayout,
        schema,
        schemaZap,
        Backgrid
        ) {

    var OrgEnotaManager = Marionette.LayoutView.extend({
        template: tpl,
        regions: {
            tree: '#tree-container',
            detail: '#detail-panel',
            tabs: '#tabs',
            tabToolbar: '#tab-toolbar',
            treeToolbar: '#tree-toolbar'
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
        this.tabControl = new TabControl({
            tabs: [{
                    name: i18next.t('orgEnota.title'),
                    event: 'show:form'
                }, {
                    name: i18next.t('orgEnota.zaposleni'),
                    event: 'show:zaposleni'
                }, {
                    name: i18next.t('orgEnota.zapisi'),
                    event: 'show:zapisi'
                }],
            listener: this
        });
    };
    OrgEnotaManager.prototype.onRender = function () {
        this.showTree(null);
        this.tabs.show(this.tabControl);
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
        this.tree.show(tree);
    };
    OrgEnotaManager.prototype.onTreeItemSelected = function (view) {
        this.selected = view;
        this.seznam.setOrgEnota(this.selected.model);
        this.tabControl.refreshActiveTab();
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
        self.detail.show(zaposleniGrid);
    };
    OrgEnotaManager.prototype.onShowZapisi = function (entity, id) {
        var priponke = new ZapisiLayout({
            owner: id,
            ownerClass: entity,
            vent: Radio.channel('global')
        });
        this.detail.show(priponke);
    };
    OrgEnotaManager.prototype.onHideTree = function () {

    };
    OrgEnotaManager.prototype.onDodajOrgEnoto = function () {
        console.log('dodaj');
    };
    OrgEnotaManager.prototype.onOdstraniOrgEnoto = function () {
        console.log('odstrani');
    };
    OrgEnotaManager.prototype.onShowForm = function () {

        if (this.selected && this.selected.model) {
            var form = new Form({
                schema: schema.toFormSchema().schema,
                fieldsets: schema.toFormSchema().fieldsets,
                model: this.selected.model
            });
            this.tabToolbar.show(this.formToolbar());
            this.detail.show(form);
        }
    };
    OrgEnotaManager.prototype.formToolbar = function () {
        var groups = [[{
                    id: 'save',
                    element: 'button-commit',
                    icon: 'fa fa-save',
                    label: 'Shrani',
                    trigger: 'form-commit'
                }, {
                    id: 'help',
                    element: 'button-help',
                    icon: 'fa fa-question-sign'
                }]];
        return new Toolbar({
            buttonGroups: groups,
            size: 'xs',
            listener: this
        });
    };
    return OrgEnotaManager;
});