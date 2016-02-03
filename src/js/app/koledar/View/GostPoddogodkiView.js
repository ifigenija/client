/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'baseUrl',
    'i18next',
    'app/bars',
    'marionette',
    '../Model/Dogodki',
    'app/Max/Model/MaxNestedModel',
    'app/Max/Module/Backgrid',
    'app/Max/View/BackgridFooter',
    './Wizard/IzbiraDogodkovView',
    'template!../tpl/gostovanje-poddog.tpl'
], function (
        Radio,
        baseUrl,
        i18next,
        Handlebars,
        Marionette,
        Dogodki,
        MaxNestedModel,
        Backgrid,
        BackgridFooter,
        IzbiraDogodkovView,
        template
        ) {

    var gridMeta = [
        {
            cell: 'string',
            editable: false,
            label: i18next.t('gostovanje.title'),
            name: 'title',
            sortable: true
        },
        {
            cell: 'string',
            editable: false,
            label: i18next.t('gostovanje.prostor'),
            name: 'prostor.label',
            sortable: true
        },
        {
            cell: 'string',
            editable: false,
            label: i18next.t('gostovanje.razred'),
            name: 'razred',
            sortable: true
        },
        {
            headerCell: 'number',
            cell: 'date',
            editable: false,
            label: i18next.t('gostovanje.zacetek'),
            name: 'zacetek',
            sortable: true
        },
        {
            headerCell: 'number',
            cell: 'date',
            editable: false,
            label: i18next.t('gostovanje.konec'),
            name: 'konec',
            sortable: true
        },
        {
            cell: 'action',
            name: '...',
            sortable: false,
            actions: [
                {event: 'brisi', title: i18next.t('std.brisi')}
            ]
        }
    ];

    var GostPoddogodkiView = Marionette.LayoutView.extend({
        template: template,
        regions: {
            mpDogodkiR: '.region-poddogodki-mozni',
            pDogodkiR: '.region-poddogodki'
        },
        triggers:{
            'click .dodaj-poddogodke': 'dodaj:poddogodke'
        }
    });

    GostPoddogodkiView.prototype.initialize = function (options) {
        this.model = options.model || this.model;
    };

    GostPoddogodkiView.prototype.onRender = function () {
        this.renderMozniPoddogodki();
        this.renderPoddogodki();
    };

    GostPoddogodkiView.prototype.renderMozniPoddogodki = function () {
        var view = this.mozniPoddogodki = new IzbiraDogodkovView({
            model: this.model
        });
        this.mpDogodkiR.show(view);
    };

    GostPoddogodkiView.prototype.renderPoddogodki = function () {
        var Dog = Dogodki.extend({
            view: null
        });

        var GostovanjeModel = MaxNestedModel.extend({
            urlRoot: baseUrl + '/rest/gostovanje',
            nestedCollections: {
                podrejeniDogodki: {collection: Dog, mappedBy: 'nadrejenoGostovanje'}
            }
        });

        var gm = new GostovanjeModel(this.model);
        gm.podrejeniDogodkiCollection.fetch();

        var grid = new Backgrid.Grid({
            collection: gm.podrejeniDogodkiCollection,
            columns: gridMeta,
            footer: BackgridFooter.extend({columns: gridMeta})
        });

        gm.podrejeniDogodkiCollection.on('backgrid:action', function (model, action) {
            this.triggerMethod(action, model);
        }, this);

        this.pDogodkiR.show(grid);
    };

    GostPoddogodkiView.prototype.onDodajPoddogodke = function () {
        var models = this.mozniPoddogodki.gridView.getSelectedModels();
        
        
        console.log(models);
    };

    GostPoddogodkiView.prototype.onBrisi = function (model) {
        model.destroy({
            wait: true,
            success: function () {
                Radio.channel('error').command('flash', {
                    message: i18next.t('std.messages.success'),
                    severity: 'success'
                });
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });
    };

    return GostPoddogodkiView;
});
