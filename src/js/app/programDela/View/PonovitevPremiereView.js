/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/programDela/View/EnotaProgramaView',
    'app/programDela/View/PrenesiView',
    'template!../tpl/ponovitevPremiere-form.tpl',
    'template!../tpl/ponovitevPremiere-prenesi.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!programPonovitevPremiere'
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

    var sch = schema.toFormSchema().schema;

    sch.zaproseno.help = i18next.t('ep.zaprosenoPonPrem');

    var PonovitevView = EnotaProgramaView.extend({
        formTemplate: formTpl,
        schema: sch,
        detailName: 'ponovitvePremiere',
        formTitle: i18next.t('ponovitevPremiere.title'),
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

    PonovitevView.prototype.getPrenesiView = function () {
        var View = PrenesiView.extend({
            template: prenesiTpl,
            podatkiUprizoritve: this.podatkiUprizoritve,
            jeNa: true
        });

        return View;
    };

    /**
     * preračun števila ponovitev
     * @param {type} form
     * @returns {EnotaProgramaView@call;extend.prototype.steviloPonovitev.ponoviZamejo|EnotaProgramaView@call;extend.prototype.steviloPonovitev.ponoviDoma|EnotaProgramaView@call;extend.prototype.steviloPonovitev.ponoviGost|EnotaProgramaView@call;extend.prototype.steviloPonovitev.stPonovi}
     */
    PonovitevView.prototype.steviloPonovitev = function (form) {
        var polja = form.fields;

        var ponoviDoma = polja.ponoviDoma.getValue();
        var ponoviZamejo = polja.ponoviZamejo.getValue();
        var ponoviGost = polja.ponoviGost.getValue();
        var ponoviKopr = polja.ponoviKopr.getValue();
        var ponoviKoprZamejo = polja.ponoviKoprZamejo.getValue();
        var ponoviKoprGost = polja.ponoviKoprGost.getValue();

        var stPonovi = ponoviDoma + ponoviZamejo + ponoviGost + ponoviKopr + ponoviKoprZamejo + ponoviKoprGost;

        return stPonovi;
    };

    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    PonovitevView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'ProgramPonovitevPremiere'
        });
        this.prilogeR.show(view);
    };

    return PonovitevView;
});