/* 
 * Licenca GPLv3
 */
define([
    'baseUrl',
    'app/Dokument/View/PostavkeView',
    './AlterSelectView',
    'app/Max/Model/MaxPageableCollection',
    'backbone',
    'app/Max/Module/Backgrid',
    'i18next',
    'underscore',
    'formSchema!funkcija',
    'template!../tpl/funkcija-form.tpl',
    'template!../tpl/funkcija.tpl',
    'radio',
    'app/seznami/Model/TipFunkcije'
], function (
        baseUrl,
        PostavkeView,
        AlterSelectView,
        MaxPageable,
        Backbone,
        Backgrid,
        i18next,
        _,
        schema,
        formTpl,
        tpl,
        Radio,
        TipFunkcijeModel
        ) {

    // odstranim področje iz sheme, ker 
    //  je nastavljeno implicitno glede na to, kje se 
    // funkcija ureja 
    var sch = _.omit(schema.toFormSchema().schema, 'podrocje');
    //console.log(sch);
    var opts = schema.getOptionValues('tipFunkcije');

    /**
     * 
     * 
     * @type @exp;PostavkeView@call;extend
     */
    var FunkcijaView = PostavkeView.extend({
        formTemplate: formTpl,
        template: tpl,
        schema: sch,
        detailName: '',
        formTitle: i18next.t('funkcija.title'),
        regions: {
            alterR: ".region-alternacije"
        },
        gridMeta: [
            {
                cell: 'integer',
                headerCell: Backgrid.HeaderCell.extend({
                    className: 'backgrid-kolona-stevilk'
                }),
                editable: false,
                label: i18next.t('ent.d.sort'),
                name: 'sort',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('funkcija.imena'),
                name: 'imena',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('funkcija.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: opts
                }),
                editable: false,
                label: i18next.t('funkcija.tipFunkcije'),
                name: 'tipFunkcije',
                optionValues: opts,
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('funkcija.velikost'),
                name: 'velikost',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('funkcija.sePlanira'),
                name: 'sePlanira',
                sortable: false
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('funkcija.pomembna'),
                name: 'pomembna',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'uredi', title: i18next.t('std.uredi')},
                    {event: 'premakniGor', title: i18next.t('std.premakniGor')},
                    {event: 'premakniDol', title: i18next.t('std.premakniDol')},
                    {event: 'brisi', title: i18next.t('std.brisi')}
                ]
            }
        ]
    });

    FunkcijaView.prototype.tipFunkcijeChange = function (form, editor) {
        var tip = form.fields.tipFunkcije.editor.getValue();

        var preveriPodrocje = function () {
            var vrednost = form.fields.velikost.editor.getValue();
            var velikost = form.fields.velikost;

            if (model.get('podrocje') === 'igralec') {
                if (!vrednost) {
                    velikost.setError(i18next.t("std.napaka.velikost"));
                } else {
                    velikost.clearError();
                }
            } else {
                velikost.clearError();
            }
        };

        var model = new TipFunkcijeModel.Model({id: tip});
        model.once('sync', preveriPodrocje);
        model.fetch();
    };

    /**
     * 
     * @returns {undefined}
     */
    FunkcijaView.prototype.onRenderForm = function () {

        if (this.model.get('id')) {
            this.renderAlternacije(this.model);
            this.on('preklici', function () {
                this.alterR.empty();
            }, this);
            this.on('save:success', function () {
                this.alterR.empty();
            }, this);
        }
        //this.form.on('tipFunkcije:change', this.tipFunkcijeChange, this);
        //this.form.on('velikost:change', this.tipFunkcijeChange, this);
    };

    /**
     * 
     * @param {type} model
     * @returns {undefined}
     */
    FunkcijaView.prototype.renderAlternacije = function (model) {

        this.AlterModel = Backbone.DeepModel.extend({
            urlRoot: baseUrl + '/rest/alternacija'
        });
        var c = this.alters = new MaxPageable([], {
            model: this.AlterModel,
            state: {
                perPage: 50
            }
        });
        c.url = baseUrl + '/rest/alternacija';

        c.queryParams.funkcija = model.get('id');

        var rv = new AlterSelectView({
            collection: c,
            funkcija: this.model,
            title: i18next.t("funkcija.title"),
            type: "lookup",
            lookup: "oseba"

        });
        rv.on('dodaj:alter', this.dodajAlter, this);
        rv.on('brisi:alter', this.brisiAlter, this);
        rv.on('privzeto:alter', this.privzetoAlter, this);
        this.alterR.show(rv);
    };

    /**
     * 
     * @param {type} model
     * @returns {undefined}
     */
    FunkcijaView.prototype.brisiAlter = function (alter) {
        var o = this.alters.findWhere({id: alter});
        var self = this;
        if (o) {
            o.destroy({
                success: function () {
                    self.model.fetch({
                        error: Radio.channel('error').request('handler', 'xhr')
                    });
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
    };

    /**
     * Nastavimo alternacijo kot privzeto
     * @param {type} alterID
     * @returns {undefined}
     */
    FunkcijaView.prototype.privzetoAlter = function (alterID) {
        var o = this.alters.findWhere({id: alterID});
        var self = this;
        if (o) {
            o.set('privzeti', true);
            o.save({
                success: function () {
                    self.model.fetch({
                        error: Radio.channel('error').request('handler', 'xhr')
                    });
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
    };

    /**
     * 
     * @param {type} model
     * @returns {undefined}
     */
    FunkcijaView.prototype.dodajAlter = function (oseba) {
        var self = this;
        var model = new this.AlterModel();

        model.save({
            oseba: oseba,
            funkcija: this.model.get('id'),
            aktivna: true
        }, {
            success: function (model, x, xhr) {
                self.alters.add(model);
                self.model.fetch({
                    error: Radio.channel('error').request('handler', 'xhr')
                });
                self.form.trigger('change');
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });

    };



    return FunkcijaView;
});
