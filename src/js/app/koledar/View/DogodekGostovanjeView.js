/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'baseUrl',
    'i18next',
    'underscore',
    '../Model/Dogodki',
    'app/Max/Model/MaxNestedModel',
    'app/Max/Module/Backgrid',
    'app/Max/View/BackgridFooter',
    './DogodekView',
    'template!../tpl/gostovanje-form.tpl',
    'formSchema!gostovanje'
], function (
        Radio,
        baseUrl,
        i18next,
        _,
        Dogodki,
        MaxNestedModel,
        Backgrid,
        BackgridFooter,
        DogodekView,
        tpl,
        schema
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

    var DogodekGostovanjeView = DogodekView.extend({
        schema: schema.toFormSchema().schema,
        formTemplate: tpl
    });

    /**
     * Overridana funkcija renderTabs
     * Dodan nov tab, ki bo namenjen za izris tabele abonmajev
     * @param {type} tabs
     * @returns {DogodekGostovanjeView_L14.DogodekGostovanjeView.tabControl}
     */
    DogodekGostovanjeView.prototype.renderTabs = function (tabs) {
        var gosTabs = _.clone(tabs);
        gosTabs.push({id: 'dogodki', name: i18next.t('gostovanje.dogodki'), event: 'dogodki'});
        DogodekView.prototype.renderTabs.apply(this, [gosTabs]);
    };

    DogodekGostovanjeView.prototype.onDogodki = function () {
        this.deselectTab();
        this.$('.pnl-detail').addClass('active');
        //var poddogodki = this.model.get('podrejeniDogodki');
        var Dog = Dogodki.extend({
            view: null
        });

        var GostovanjeModel = MaxNestedModel.extend({
            urlRoot: baseUrl + '/rest/gostovanje',
            nestedCollections: {
                podrejeniDogodki: {collection: Dog, mappedBy: 'nadrejenoGostovanje'/*, filterBy: {'razred': ['100s', '200s', '400s', '500s']}*/},
            }
        });

        var gm = new GostovanjeModel(this.model);
        gm.podrejeniDogodkiCollection.fetch({
            success: function () {
                console.log('fuck yeah');
            }
        });

        //var dogodki = new Dogodki(poddogodki);

        var grid = new Backgrid.Grid({
            collection: gm.podrejeniDogodkiCollection,
            columns: gridMeta,
            footer: BackgridFooter.extend({columns: gridMeta})
        });
        gm.podrejeniDogodkiCollection.on('backgrid:action', function (model, action) {
            this.triggerMethod(action, model);
        }, this);
        this.detailR.show(grid);
    };

    DogodekGostovanjeView.prototype.onBrisi = function (model) {
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

    return DogodekGostovanjeView;
});
