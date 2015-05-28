/* 
 * Licenca GPLv3
 */
define([
    'baseUrl',
    'app/Dokument/View/PostavkeView',
    './AlterSelectView',
    'app/Max/Model/MaxPageableCollection',
    'backbone',
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
    var FunkcijaView = PostavkeView.extend({
        formTemplate: formTpl,
        template: tpl,
        schema: sch,
        name: '',
        detailName: '',
        formTitle: i18next.t('produkcija.funkcija.title'),
        regions: {
            alterR: ".region-alternacije"
        },
        gridMeta: [
            {
                cell: 'number',
                editable: false,
                label: i18next.t('produkcija.funkcija.sort'),
                name: 'sort',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.funkcija.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.funkcija.velikost'),
                name: 'velikost',
                sortable: true
            },
            {
                cell: 'select',
                editable: false,
                label: i18next.t('produkcija.funkcija.tipFunkcije'),
                name: 'tipFunkcije',
                optionValues: opts,
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('produkcija.funkcija.pomembna'),
                name: 'pomembna',
                sortable: false
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('produkcija.funkcija.sePlanira'),
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
    FunkcijaView.prototype.onRenderForm = function () {

        if (this.model) {
            this.renderAlternacije(this.model);
        }


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
        var c = this.alters = new MaxPageable({
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
            title: i18next.t("produkcija.funkcija.title"),
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
    FunkcijaView.prototype.brisiAlter = function (alter) {

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
    FunkcijaView.prototype.dodajAlter = function (oseba) {
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



    return FunkcijaView;
});
