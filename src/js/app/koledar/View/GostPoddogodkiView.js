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
    // definicija backgrid za prikaz podrejenih dogodkov gostovanja
    var gridMeta = [
        {
            cell: 'string',
            editable: false,
            label: i18next.t('dogodek.title'),
            name: 'title',
            sortable: true
        },
        {
            cell: 'string',
            editable: false,
            label: i18next.t('dogodek.prostor'),
            name: 'prostor.label',
            sortable: true
        },
        {
            cell: 'string',
            editable: false,
            label: i18next.t('dogodek.razred'),
            name: 'razred',
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

        var Dog = Dogodki.extend({
            view: 'mozniPoddogodki'
        });
        this.dogodki = new Dog();
        this.dogodki.queryParams.zacetek = this.model.get('zacetek');
        this.dogodki.queryParams.konec = this.model.get('konec');
    };

    GostPoddogodkiView.prototype.onRender = function () {
        this.renderMozniPoddogodki();
        this.renderPoddogodki();
    };

    /**
     * Izris možnih podrejenih dogodkov 
     * @returns {undefined}
     */
    GostPoddogodkiView.prototype.renderMozniPoddogodki = function () {
        var self = this;
        
        this.dogodki.fetch({
            success: function (coll) {
                if (coll.length) {
                    var view = self.mozniPoddogodki = new IzbiraDogodkovView({
                        model: self.model,
                        collection: coll
                    });
                    self.$('.gostovanje-mozni-poddogodki').show();
                    self.mpDogodkiR.show(view);
                } else {
                    self.$('.gostovanje-mozni-poddogodki').hide();
                    self.mpDogodkiR.empty();
                }
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });

    };

    /**
     * Izris obstoječi podrejeni dogodki
     * iz serverja pridobimo seznam podrejenih dogodkov ki ga potem prikažemo
     * @returns {undefined}
     */
    GostPoddogodkiView.prototype.renderPoddogodki = function () {
        //iz serverja zahtevamo seznam dogodkov s podanim nadrejenimGostovanjem
        //čas začetek in konec samo dokler še ni liste
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

        //ob kliku na gumbe v action cellu
        dogodki.on('backgrid:action', function (model, action) {
            this.triggerMethod(action, model);
        }, this);

        this.pDogodkiR.show(grid);
    };
    /**
     * Ob kliku na gumb dodaj se izvede naslednja funkcija.
     * Namen funkcije je da označene dogodke dodamo v gostovanje
     * Postopek dodajanja dogodka je naslednji:
     * 1. dogodek s termini storitvami mora biti creiran
     * 2. terminestoritve izbranega dogodka je potrebno umestit v gostovanje kot sodelujoče
     * 3. dogodku s termini storitvami nastavimo nadrejenoGostovanje in ga updatamo
     * @returns {undefined}
     */
    GostPoddogodkiView.prototype.onDodajPoddogodke = function () {
        var models = this.mozniPoddogodki.gridView.getSelectedModels();

        var self = this;
        var dogodekId = this.model.get('dogodek').id;

        var terminiGostovanja = new TerminiStoritve();
        terminiGostovanja.queryParams.dogodek = dogodekId;

        terminiGostovanja.fetch({
            success: function (coll) {
                //trenutno stanje terminov storitev v gostovanju
                var terminiStoritve = [];
                coll.each(function (model) {
                    terminiStoritve.push(model.attributes);
                });
                //iz označenih modelov izluščimo termine storitve
                _.each(models, function (model) {
                    if (model) {
                        var termini = model.get('terminiStoritve');
                        //termine storitve primerjamo s trenutnim stanjem terminov storitev
                        //v primeru da oseba obstaja v trenutnem seznamu ts se ts iz dogodka ne doda
                        _.each(termini, function (termin) {
                            var vsebovana = false;
                            _.each(terminiStoritve, function (ts) {
                                if (termin.oseba.id === ts.oseba.id) {
                                    vsebovana = true;
                                }
                            });
                            //v kolikor osebe ni v ts gostovanja se ts pretvori v nov ts kot sodelujoc in začetkom in koncem od gostovanja
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
                //novo stanje terminov storitev na gostovanju ažuriramo
                self.azurirajTsDogodka(dogodekId, terminiStoritve, models);
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


        }, Radio.channel('error').request('handler', 'flash'));
    };

    return GostPoddogodkiView;
});
