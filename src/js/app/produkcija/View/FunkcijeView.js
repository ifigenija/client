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
    'radio'
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
        Radio
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
    var FunkcijeView = PostavkeView.extend({
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
                label: i18next.t('funkcija.sort'),
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
                label: i18next.t('funkcija.funkcija'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('funkcija.velikost'),
                name: 'velikost',
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
                cell: 'boolean',
                editable: false,
                label: i18next.t('funkcija.pomembna'),
                name: 'pomembna',
                sortable: false
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('funkcija.sePlanira'),
                name: 'sePlanira',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('std.brisi')},
                    {event: 'uredi', title: i18next.t('std.uredi')}
                ]
            }
        ]
    });


    /**
     * 
     * @returns {undefined}
     */
    FunkcijeView.prototype.onRenderForm = function () {

        if (this.model.get('id')) {
            this.renderAlternacije(this.model);
            this.on('preklici', function () {
                this.alterR.empty();
            }, this);
            this.on('save:success', function () {
                this.alterR.empty();
            }, this);
        }

    };




    /**
     * 
     * @param {type} model
     * @returns {undefined}
     */
    FunkcijeView.prototype.renderAlternacije = function (model) {

        this.AlterModel = Backbone.DeepModel.extend({
            urlRoot: baseUrl + '/rest/alternacija'
        });
        var c = this.alters = new MaxPageable([], {
            model: this.AlterModel,
            state: {
                perPage: 50
            },
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
        this.alterR.show(rv);
    };



    /**
     * 
     * @param {type} model
     * @returns {undefined}
     */
    FunkcijeView.prototype.brisiAlter = function (alter) {

        var self = this;
        var o = this.alters.findWhere({id: alter});
        if (o) {
            o.destroy({
                error: Radio.channel('error').request('handler', 'xhr'),
            });

        }

    };

    /**
     * 
     * @param {type} model
     * @returns {undefined}
     */
    FunkcijeView.prototype.dodajAlter = function (oseba) {
        var self = this;
        var model = new this.AlterModel();

        model.save({
            oseba: oseba,
            funkcija: this.model.get('id'),
            altivna: true
        }, {
            success: function (model, x, xhr) {
                self.alters.add(model);
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });

    };



    return FunkcijeView;
});
