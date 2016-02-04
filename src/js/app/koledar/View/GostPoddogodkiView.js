/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'baseUrl',
    'i18next',
    'app/bars',
    'underscore',
    'marionette',
    '../Model/Dogodki',
    'app/Max/Model/MaxNestedModel',
    'app/Max/Module/Backgrid',
    'app/Max/View/BackgridFooter',
    './Wizard/IzbiraDogodkovView',
    '../Model/TerminiStoritve',
    'template!../tpl/gostovanje-poddog.tpl',
    'jquery',
    'jquery.jsonrpc'
], function (
        Radio,
        baseUrl,
        i18next,
        Handlebars,
        _,
        Marionette,
        Dogodki,
        MaxNestedModel,
        Backgrid,
        BackgridFooter,
        IzbiraDogodkovView,
        TerminiStoritve,
        template,
        $
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
        triggers: {
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

        var dogodki = new Dogodki();
        dogodki.queryParams.nadrejenoGostovanje = this.model.get('id');
        dogodki.queryParams.zacetek = this.model.get('zacetek');
        dogodki.queryParams.konec = this.model.get('konec');
        dogodki.fetch();

        var grid = new Backgrid.Grid({
            collection: dogodki,
            columns: gridMeta,
            footer: BackgridFooter.extend({columns: gridMeta})
        });

        dogodki.on('backgrid:action', function (model, action) {
            this.triggerMethod(action, model);
        }, this);

        this.pDogodkiR.show(grid);
    };

    GostPoddogodkiView.prototype.onDodajPoddogodke = function () {
        var models = this.mozniPoddogodki.gridView.getSelectedModels();

        var self = this;
        var dogodekId = this.model.get('dogodek').id;

        var terminiGostovanja = new TerminiStoritve();
        terminiGostovanja.queryParams.dogodek = dogodekId;

        terminiGostovanja.fetch({
            success: function (coll) {
                var terminiStoritve = [];
                coll.each(function (model) {
                    terminiStoritve.push(model.attributes);
                });
                _.each(models, function (model) {
                    if (model) {
                        var termini = model.get('terminiStoritve');
                        _.each(termini, function (termin) {
                            var vsebovana = false;
                            _.each(terminiStoritve, function (ts) {
                                if (termin.oseba.id === ts.oseba.id) {
                                    vsebovana = true;
                                }
                            });
                            if (!vsebovana) {
                                termin = _.extend(termin, {
                                    planiranZacetek: self.model.get('zacetek'),
                                    planiranKonec: self.model.get('konec'),
                                    dogodek: dogodekId,
                                    id: null,
                                    sodelujoc: true,
                                    gost: false,
                                    dezurni: false,
                                    alternacija: null
                                });
                                terminiStoritve.push(termin);
                            }
                        });
                    }
                });

                self.azurirajTsDogodka(dogodekId, terminiStoritve, models);

                console.log(terminiStoritve);
            }
        });
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

    GostPoddogodkiView.prototype.azurirajTsDogodka = function (dogodekId, terminiStoritve, modeli) {
        var self = this;

        var tsji = _.map(terminiStoritve, function (object) {
            if (_.isObject(object.dogodek)) {
                object['dogodek'] = dogodekId;
            }
            return object;
        });

        var self = this;

        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/koledar/dogodek'});
        rpc.call('azurirajTSDogodka', {
            'dogodekId': dogodekId,
            'terminiStoritev': tsji
        }, function () {
            _.each(modeli, function (model) {
                model.save({nadrejenoGostovanje: self.model.get('id')}, {
                    success: function () {
                        Radio.channel('error').command('flash', {
                            message: i18next.t('std.messages.success'),
                            severity: 'success'
                        });
                        self.onRender();
                    },
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            });


        }, function (error) {
            console.log(error);
        });
    };

    return GostPoddogodkiView;
});
