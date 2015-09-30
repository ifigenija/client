/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/Dokument/View/PostavkeView',
    'template!../tpl/postavkaCDve-form.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!postavkaCDve',
    'radio',
    '../Model/ProgramDokument',
    'app/Max/View/Confirm',
    'jquery',
    'jquery.jsonrpc'
], function (
        Backgrid,
        i18next,
        PostavkeView,
        formTpl,
        ZapisiLayout,
        schema,
        Radio,
        ProgramDokument,
        confirm,
        $
        ) {

    var PostavkaCDveView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'postavkeC2',
        formTitle: i18next.t('postavkaCdve.title'),
        disabled: false,
        buttons: {
            osvezi: {
                id: 'doc-postavka-osvezi',
                label: i18next.t('std.osvezi'),
                element: 'button-trigger',
                trigger: 'osvezi'
            }
        },
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('postavkaCdve.t.razred'),
                name: 'razred',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('postavkaCdve.t.naziv'),
                name: 'naziv',
                sortable: false
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('postavkaCdve.t.vrPremiere'),
                name: 'vrPremiere',
                total: 'sum',
                sortable: false
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('postavkaCdve.t.vrPonovitvePremier'),
                name: 'vrPonovitvePremier',
                total: 'sum',
                sortable: false
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('postavkaCdve.t.vrPonovitvePrejsnjih'),
                name: 'vrPonovitvePrejsnjih',
                total: 'sum',
                sortable: false
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: true,
                label: i18next.t('postavkaCdve.t.vrFestivali'),
                name: 'vrFestivali',
                total: 'sum',
                sortable: false
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('postavkaCdve.t.vrGostovanjaZamejstvo'),
                name: 'vrGostovanjaZamejstvo',
                total: 'sum',
                sortable: false
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: true,
                label: i18next.t('postavkaCdve.t.vrGostovanjaInt'),
                name: 'vrGostovanjaInt',
                total: 'sum',
                sortable: false
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: true,
                label: i18next.t('postavkaCdve.t.vrOstalo'),
                name: 'vrOstalo',
                total: 'sum',
                sortable: false
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('postavkaCdve.t.vrSkupaj'),
                name: 'skupaj',
                total: 'sum',
                sortable: false
            }
        ]
    });
    //dodamo skupno vrstico na konec
    PostavkaCDveView.prototype.dodajModel = function () {
        var self = this;
        var model = new ProgramDokument.PostavkaCDvaModel();

        model.set('razred', 'Skupaj');
        model.set('skupina', 'ZZZZZ1234');
        model.set('podskupina', 0);
        model.set('naziv', 'SKUPAJ C.2.');

        self.collection.add(model, {
            error: Radio.channel('error').request('handler', 'xhr')
        });

        self.preracunajSkupaj(self.collection);
    };

    PostavkaCDveView.prototype.initialize = function () {

        // Komparator za sort collectiona
        this.collection.comparator = function (a, b) {
            var sa = a.get('skupina');
            var sb = b.get('skupina');
            var psa = a.get('podskupina');
            var psb = b.get('podskupina');

            if (sa === sb) {
                return (psa < psb) ? -1 : (psa > psb) ? 1 : 0;
            } else {
                return (sa < sb) ? -1 : 1;
            }
        };

        if (this.collection.length <= 0) {
            this.osvezi();
        }

        this.collection.sort();
        this.dodajModel();

        this.listenTo(this.collection, "backgrid:edited", function (model, schema, command) {
            var self = this;
            if (!command.cancel()) {
                if (model.changedAttributes() || _.isObject(schema.get('optionValues'))) {
                    model.preracunajSkupaj();
                    model.save({}, {
                        error: Radio.channel('error').request('handler', 'xhr')
                    });

                    self.preracunajTabelo();

                }
            }
        });
    };

    /*
     * Metoda ki preračuna podatke tabele
     * @returns {undefined}
     */

    PostavkaCDveView.prototype.preracunajTabelo = function () {
        var coll = this.collection;
        coll.sort();

        var vsotaPremiera = 0, vsotaPonovitvePremier = 0, vsotaPonovitvePrejsnjih = 0,
                vsotaGostovanjaZamejstvo = 0, vasotaFestivali = 0, vsotaGostovanjaInt = 0,
                vsotaOstalo = 0;

        var prejsnjaSkupina = "";
        for (var i = 0; i < coll.length; i++) {
            var model = coll.models[i];
            var podskupina = model.get('podskupina');

            if (podskupina === 0 && i !== 0) {

                //shranemo sestevek
                var sestevek = coll.findWhere({'podskupina': 0, 'skupina': prejsnjaSkupina.toString()});
                sestevek.set('vrPremiere', vsotaPremiera);
                sestevek.set('vrPonovitvePremier', vsotaPonovitvePremier);
                sestevek.set('vrPonovitvePrejsnjih', vsotaPonovitvePrejsnjih);
                sestevek.set('vrGostovanjaZamejstvo', vsotaGostovanjaZamejstvo);
                sestevek.set('vrFestivali', vasotaFestivali);
                sestevek.set('vrGostovanjaInt', vsotaGostovanjaInt);
                sestevek.set('vrOstalo', vsotaOstalo);

                sestevek.preracunajSkupaj();

                sestevek.save({
                    error: Radio.channel('error').request('handler', 'xhr')
                });

                vsotaPremiera = 0, vsotaPonovitvePremier = 0, vsotaPonovitvePrejsnjih = 0,
                        vsotaGostovanjaZamejstvo = 0, vasotaFestivali = 0, vsotaGostovanjaInt = 0,
                        vsotaOstalo = 0;
            } else if (podskupina !== 0){
                prejsnjaSkupina = model.get('skupina');

                vsotaPremiera += model.get('vrPremiere');
                vsotaPonovitvePremier += model.get('vrPonovitvePremier');
                vsotaPonovitvePrejsnjih += model.get('vrPonovitvePrejsnjih');
                vsotaGostovanjaZamejstvo += model.get('vrGostovanjaZamejstvo');
                vasotaFestivali += model.get('vrFestivali');
                vsotaGostovanjaInt += model.get('vrGostovanjaInt');
                vsotaOstalo += model.get('vrOstalo');
            }

        }
        this.preracunajSkupaj(coll);
    };

    PostavkaCDveView.prototype.preracunajSkupaj = function (coll) {
        
        var vsotaPremiera = 0, vsotaPonovitvePremier = 0, vsotaPonovitvePrejsnjih = 0,
                vsotaGostovanjaZamejstvo = 0, vasotaFestivali = 0, vsotaGostovanjaInt = 0,
                vsotaOstalo = 0;
        for (var i = 0; i < coll.length; i++) {
            var model = coll.models[i];
            var podskupina = model.get('podskupina');

            if (podskupina !== 0){
                vsotaPremiera += model.get('vrPremiere');
                vsotaPonovitvePremier += model.get('vrPonovitvePremier');
                vsotaPonovitvePrejsnjih += model.get('vrPonovitvePrejsnjih');
                vsotaGostovanjaZamejstvo += model.get('vrGostovanjaZamejstvo');
                vasotaFestivali += model.get('vrFestivali');
                vsotaGostovanjaInt += model.get('vrGostovanjaInt');
                vsotaOstalo += model.get('vrOstalo');
            }

        }
        var skupaj = coll.findWhere({'podskupina': 0, 'skupina': 'ZZZZZ1234'});
        //shranemo vse vsote
        skupaj.set('vrPremiere', vsotaPremiera);
        skupaj.set('vrPonovitvePremier', vsotaPonovitvePremier);
        skupaj.set('vrPonovitvePrejsnjih', vsotaPonovitvePrejsnjih);
        skupaj.set('vrGostovanjaZamejstvo', vsotaGostovanjaZamejstvo);
        skupaj.set('vrFestivali', vasotaFestivali);
        skupaj.set('vrGostovanjaInt', vsotaGostovanjaInt);
        skupaj.set('vrOstalo', vsotaOstalo);

        skupaj.preracunajSkupaj();
    };

    PostavkaCDveView.prototype.renderList = function () {
        var Povdarjena = Backgrid.Row.extend({
            /**
             Renders a row of cells for this row's model.
             */
            render: function () {
                Backgrid.Row.prototype.render.apply(this, arguments);

                if (this.model.get('podskupina') === 0) {
                    this.$el.addClass('povdarjena-vrstica');
                }

                return this;
            }
        });

        var grid = new Backgrid.Grid({
            collection: this.collection,
            row: Povdarjena,
            columns: this.gridMeta
        });
        this.regionList.show(grid);
        return grid;
    };
    PostavkaCDveView.prototype.osvezi = function () {
        var self = this;
        var success = function () {
            self.collection.fetch({
                success: function () {
                    self.collection.sort();
                    self.dodajModel();
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });
        };

        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/programDela/programDela'});
        rpc.call('osveziTabeloC2', {
            'programDelaId': self.dokument.get('id')
        },
        success,
                Radio.channel('error').request('handler', 'xhr'));
    };


    PostavkaCDveView.prototype.onOsvezi = function () {
        var self = this;
        confirm({
            text: i18next.t('std.potrdiPrepis'),
            modalOptions: {
                title: i18next.t("std.prepisiCDve"),
                okText: i18next.t("std.obnovi")
            },
            ok: function () {
                PostavkaCDveView.prototype.osvezi.apply(self, arguments);
            }
        });
    };

    PostavkaCDveView.prototype.prepareToolbar = function () {
        return [
            [
                this.buttons.osvezi
            ]
        ];
    };

    PostavkaCDveView.prototype.onUredi = function () {

    };

    PostavkaCDveView.prototype.onSelected = function () {

    };

    return PostavkaCDveView;
});