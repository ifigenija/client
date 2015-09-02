/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/programDela/View/EnotaProgramaView',
    'app/programDela/View/PrenesiView',
    'template!../tpl/ponovitevPrejsnje-form.tpl',
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
                label: i18next.t('ent.d.sort'),
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
                    {event: 'uredi', title: i18next.t('std.uredi')},
                    {event: 'premakniGor', title: i18next.t('std.premakniGor')},
                    {event: 'premakniDol', title: i18next.t('std.premakniDol')},
                    {event: 'brisi', title: i18next.t('std.brisi')}
                ]
            }
        ]
    });

    /**
     * pridobimo view ki se uporabi pri prenosu podatkov iz uprizoritve v enotoprograma
     * preračunamo v viewju ker ni vseh podatkov v modelu in ker ni nujno da se bodo vrednosti prepisale
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
     * overridana preračunamo število ponovitev
     * @param {type} form
     * @returns {EnotaProgramaView@call;extend.prototype.steviloPonovitev.ponoviDoma|EnotaProgramaView@call;extend.prototype.steviloPonovitev.ponoviZamejo|EnotaProgramaView@call;extend.prototype.steviloPonovitev.stPonovi|EnotaProgramaView@call;extend.prototype.steviloPonovitev.ponoviGost}
     */
    PonovitevView.prototype.steviloPonovitev = function (form) {
        var polja = form.fields;
        
        var ponoviDoma = polja.ponoviDoma.getValue();
        var ponoviZamejo = polja.ponoviZamejo.getValue();
        var ponoviGost = polja.ponoviGost.getValue();
        var ponoviKopr = polja.ponoviKopr.getValue();

        var stPonovi = ponoviDoma + ponoviZamejo + ponoviGost + ponoviKopr;
        
        return stPonovi;
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