/* 
 * Licenca GPLv3
 * IzbiraDogodekView je bil narejen z mislijo na wizardview.
 * Zato se nahajajo v tem view-u specifični triggerji, ki se tičejo wizardview-a.
 * Prav tako manipulacija modela je pomebna za wizardview.
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
    //definicija stolpcev za backgrid.grid
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
    /**
     * Ob inicializaciji zahtevamo od serverja seznam možnih poddogodkov v nekem določenem obdobju
     * @param {type} options
     * @returns {undefined}
     */
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

    /**
     * Renderiramo tabelo, ker ni nujno da izberemo dogodek se kar proži ready
     * @returns {undefined}
     */
    IzbiraDogodkovView.prototype.onRender = function () {
        this.gridView = new Backgrid.Grid({
            columns: columns,
            collection: this.dogodki
        });

        this.dogodki.on('backgrid:selected', this.selected, this);

        this.seznamR.show(this.gridView);
        this.trigger('ready', this.model);
    };

    /**
     * Funkcija se proži ko izberemo model v backgridu.
     * Namen funkcije je da dopolni model z id-i dogodkov in id-i oseb sodelujočih
     * @returns {undefined}
     */
    IzbiraDogodkovView.prototype.selected = function () {
        var models = this.gridView.getSelectedModels();
        var ids = [];
        ids = _.pluck(models, 'id');

        var osebeIds = this.getSodelujoci(models);

        this.model.set('dogodki', ids);
        this.model.set('sodelujoci', osebeIds);
        this.trigger('ready', this.model);
    };

    /**
     * Namen funkcije je, da vrne polje id-ev izbranih modelov.
     * @returns {Marionette.LayoutView@call;extend.prototype.getSodelujoci.sodelujociIds|Function|_.collect}
     */
    IzbiraDogodkovView.prototype.getSodelujoci = function () {
        var modeli = this.gridView.getSelectedModels();
        var sodelujoci = {};
        _.each(modeli, function (model) {
            if (model) {
                var ts = model.get('terminiStoritve');
                _.each(ts, function (tsModel) {
                    sodelujoci[tsModel.oseba.id] = true;
                });
            }
        });

        // v primeru da ne bi uporabili map bi morali v zgormnjih zankah še implementirati eno dodatno vgnezdeno zanko za preverjanje
        //temu se izognemo da uporabimo objekt in v objekt ključev shranjujemo neko vrednost
        // map pa nam vrne polje teh ključev v našem primeru idjev
        var sodelujociIds = _.map(sodelujoci, function (oseba, key) {
            return key;
        });

        return sodelujociIds;
    };

    return IzbiraDogodkovView;
});