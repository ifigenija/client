/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/programDela/View/EnotaProgramaView',
    'template!../tpl/festival-form.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!programFestival'
], function (
        Backgrid,
        i18next,
        EnotaProgramaView,
        formTpl,
        ZapisiLayout,
        schema
        ) {
    
    var sch = schema.toFormSchema().schema;
    
    sch.zaproseno.help = i18next.t('ep.zaprosenoFest');

    var FestivalView = EnotaProgramaView.extend({
        formTemplate: formTpl,
        schema: sch,
        detailName: 'festivali',
        formTitle: i18next.t('festival.title'),
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
                label: i18next.t('ep.naziv'),
                name: 'naziv',
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
                label: i18next.t('ep.vlozekKoproducenta'),
                name: 'vlozekKoproducenta',
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
    
    FestivalView.prototype.prepareToolbar = function () {
        return  this.model ?
                [
                    [
                        this.buttons.shrani,
                        this.buttons.preklici,
                        this.buttons.izracunaj,
                        this.buttons.nasvet
                    ]
                ] : [[this.buttons.dodaj]];
    };
    
    FestivalView.prototype.izracunajPrikaznaPolja = function () {
        var model = this.model;
        model.preracunajInfo(false);
    };
    
    FestivalView.prototype.imaKoprodukcijeChange = function (form, editor) {
        var imaKop = false;
        if (this.model.get('id')) {
            imaKop = editor.getValue();
        }
        this.izrisKoprodukcije(imaKop);
    };

    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    FestivalView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'ProgramFestival'
        });
        this.prilogeR.show(view);
    };

    return FestivalView;
});