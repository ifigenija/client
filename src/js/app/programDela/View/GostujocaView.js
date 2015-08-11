/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/programDela/View/EnotaProgramaView',
    'template!../tpl/gostujoca-form.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!programGostujoca',
    'app/bars'
], function (
        Backgrid,
        i18next,
        EnotaProgramaView,
        formTpl,
        ZapisiLayout,
        schema,
        Handlebars
        ) {
    
    var GostujocaView = EnotaProgramaView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'gostujoci',
        formTitle: i18next.t('gostujoca.title'),
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
     * Uprizoritev ima samo kot informacijo. Se ne prenašajo podatki
     * Zato smo overridali s prazno metodo
     * @returns {undefined}
     */
    GostujocaView.prototype.uprizoritevChange = function () {
    
    };
    
    GostujocaView.prototype.dodatniFormEventi = function () {
        if (this.model) {

            var self = this;
            var vnosnaPolja = [
                'nasDelez',
                'drugiJavni',
                'zaproseno'
            ];

            vnosnaPolja.forEach(function (i) {
                self.form.on(i + ':change', self.prikaziPodatke, self);
            });
        }
    };
    
    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    GostujocaView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'ProgramGostujoca'
        });
        this.prilogeR.show(view);
    };
    
    return GostujocaView;
});