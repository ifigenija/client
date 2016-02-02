/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'underscore',
    'backbone',
    'marionette',
    '../../Model/Dogodki',
    'backgrid',
    'backgrid-select-all'
], function (
        Radio,
        i18next,
        Handlebars,
        _,
        Backbone,
        Marionette,
        Dogodki,
        Backgrid
        ) {

    var columns = [
        {
            cell: 'select-row',
            headerCell: 'select-all',
            name: ""
        },
        {
            cell: 'string',
            editable: false,
            label: i18next.t('dogodek.title'),
            name: 'title',
            sortable: true
        },
        {
            headerCell: 'number',
            cell: 'date',
            editable: false,
            label: i18next.t('dogodek.zacetek'),
            name: 'zacetek',
            sortable: true
        },
        {
            headerCell: 'number',
            cell: 'date',
            editable: false,
            label: i18next.t('dogodek.konec'),
            name: 'zacetek',
            sortable: true
        },
        {
            cell: 'string',
            editable: false,
            label: i18next.t('dogodek.razred'),
            name: 'razred',
            sortable: true
        }
    ];

    var IzbiraDogodkovView = Marionette.LayoutView.extend({
        clasName: 'Izbira-dogodkov',
        template: Handlebars.compile('<div class="region-seznam-dogodki"></div>'),
        regions: {
            seznamR: '.region-seznam-dogodki'
        }
    });

    IzbiraDogodkovView.prototype.initialize = function (options) {
        var Dog = Dogodki.extend({
            view: 'mozniPoddogodki'
        });
        this.dogodki = new Dog();
        if (options && options.model) {
            //želimo pridobiti dogodke, ki se začnejo v času gosto vanja
            this.model = options.model;
            this.dogodki.queryParams.zacetek = this.model.get('zacetek');
            this.dogodki.queryParams.konec = this.model.get('konec');

            this.dogodki.fetch({
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
    };

    IzbiraDogodkovView.prototype.onRender = function () {
        this.gridView = new Backgrid.Grid({
            columns: columns,
            collection: this.dogodki
        });

        this.dogodki.on('backgrid:selected', this.selected, this);

        this.seznamR.show(this.gridView);
    };

    IzbiraDogodkovView.prototype.selected = function () {
        var models = this.gridView.getSelectedModels();
        if (models.length) {
            var ids = [];
            ids = _.pluck(models, 'id');

            var osebe = {};
            _.each(models, function (model) {
                var ts = model.get('terminiStoritve');
                _.each(ts, function (tsModel) {
                    osebe[tsModel.oseba.id] = true;
                });
            });

            var osebeIds = _.map(osebe, function (oseba, key) {
                return key;
            });

            this.model.set('dogodki', ids);
            this.model.set('sodelujoci', osebeIds);
            this.trigger('ready', this.model);
        } else {
            this.trigger('not:ready', this.model);
        }
    };

    return IzbiraDogodkovView;
});