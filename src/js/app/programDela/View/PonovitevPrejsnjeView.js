/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/programDela/View/EnotaProgramaView',
    'app/programDela/View/PrenesiView',
    'template!../tpl/ponovitevPrejsnje-form3.tpl',
    'template!../tpl/ponovitevPrejsnje-prenesi.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!programPonovitevPrejsnjih'
], function (
        Backgrid,
        i18next,
        EnotaProgramaView,
        PrenesiView,
        formTpl,
        prenesiTpl,
        ZapisiLayout,
        schema
        ) {
    
    var PonovitevView = EnotaProgramaView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'ponovitvePrejsnjih',
        formTitle: i18next.t('ponovitevPrejsnjih.title'),
        gridMeta: [
            {
                headerCell: 'number',
                cell: 'integer',
                editable: false,
                label: i18next.t('ep.sort'),
                name: 'sort',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('ep.uprizoritev'),
                name: 'uprizoritev.label',
                sortable: true
            },
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('tipProgramskeEnote')
                }),
                editable: false,
                label: i18next.t('ep.t.tipProgramskeEnote'),
                name: 'tipProgramskeEnote',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('ep.zaproseno'),
                name: 'zaproseno',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('ep.t.avtorskiHonorarji'),
                name: 'avtorskiHonorarji',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('ep.tantieme'),
                name: 'tantieme',
                total: 'sum',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('std.brisi')},
                    {event: 'uredi', title: i18next.t('std.uredi')},
                    {event: 'premakniGor', title: i18next.t('std.premakniGor')},
                    {event: 'premakniDol', title: i18next.t('std.premakniDol')}
                ]
            }
        ]
    });

    /**
     * pridobimo view ki se uporabi pri prenosu podatkov iz uprizoritve v enotoprograma
     * preračunamo v viewju ker ni vseh podatkov v modelu in ker ni nujno da se bodo vrednosti prepisale
     * @returns {EnotaProgramaView@call;extend.prototype.getIzracunajView.View}
     */
    PonovitevView.prototype.getPrenesiView = function () {
    var View = PrenesiView.extend({
            template: prenesiTpl,
            podatkiUprizoritve: this.podatkiUprizoritve,
            jeNa: true
        });

        return View;
    };
    
    /**
     * overridana metoda
     * @param {type} view
     * @param {type} model
     * @param {type} uprizoritev
     * @returns {undefined}
     */
    PonovitevView.prototype.prenesiVrednosti = function (view, model, uprizoritev) {

        if (view.$('.avtorskiHonorarji').is(':checked')) {
            model.set('avtorskiHonorarji', uprizoritev.NaDo.avtorskiHonorarji);
        }
        if (view.$('.tantieme').is(':checked')) {
            model.set('tantieme', uprizoritev.NaDo.tantieme);
        }
        if (view.$('.materialni').is(':checked')) {
            model.set('materialni', uprizoritev.NaDo.materialni);
        }
        if (view.$('.avtorskePravice').is(':checked')) {
            model.set('avtorskePravice', uprizoritev.NaDo.avtorskePravice);
        }
        if (view.$('.stHonorarnih').is(':checked')) {
            model.set('stHonorarnih', uprizoritev.stHonorarnih);
        }
        if (view.$('.stHonorarnihIgr').is(':checked')) {
            model.set('stHonorarnihIgr', uprizoritev.stHonorarnihIgr);
        }
        if (view.$('.stHonorarnihIgrTujJZ').is(':checked')) {
            model.set('stHonorarnihIgrTujJZ', uprizoritev.stHonorarnihIgrTujJZ);
        }
        if (view.$('.stHonorarnihIgrSamoz').is(':checked')) {
            model.set('stHonorarnihIgrSamoz', uprizoritev.stHonorarnihIgrSamoz);
        }
        if (view.$('.stZaposUmet').is(':checked')) {
            model.set('stZaposUmet', uprizoritev.stZaposUmet);
        }
        if (view.$('.datumZacStudija').is(':checked')) {
            model.set('datumZacStudija', uprizoritev.datumZacStudija);
        }
        if (view.$('.datumPremiere').is(':checked')) {
            model.set('datumPremiere', uprizoritev.datumPremiere);
        }
    };

    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    PonovitevView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'ProgramPonovitevPrejsnjih'
        });
        this.prilogeR.show(view);
    };

    return PonovitevView;
});