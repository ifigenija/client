/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/pogodba-form.tpl',
    'formSchema!pogodba',
    'i18next',
    'app/Max/Module/Backgrid'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next,
        Backgrid
        ) {

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });

    var PogodbaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        title: i18next.t('pogodba.title'),
        detailName: 'pogodbe',
        formTitle: i18next.t('pogodba.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('ent.stevilka'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('pogodba.popa'),
                name: 'popa.label',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('ent.oseba'),
                name: 'oseba.label',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('pogodba.alternacija'),
                name: 'alternacija.label',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('pogodba.vrednostPredstave'),
                name: 'vrednostPredstave',
                sortable: true,
                total: 'sum'

            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('pogodba.vrednostUre'),
                name: 'vrednostUre',
                sortable: true,
                total: 'sum'

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

    PogodbaView.prototype.onFormChange = function (form) {
        var placiloNaVajo = form.fields.placiloNaVajo.editor.getValue();
        var vrednostVaje = form.fields.vrednostVaje.editor.$el;
        var vrednostVaj = form.fields.vrednostVaj.editor.$el;

        if (!placiloNaVajo) {
            vrednostVaj.attr("disabled", "disabled");
            vrednostVaje.removeAttr("disabled");
        } else {
            vrednostVaj.removeAttr("disabled");
            vrednostVaje.attr("disabled", "disabled");

        }
    };

    PogodbaView.prototype.prepareToolbar = function () {
        return  this.model ?
                [
                    [
                        this.buttons.shrani,
                        this.buttons.preklici,
                        this.buttons.nasvet
                    ]
                ] : [[]];

    };

    PogodbaView.prototype.onDodaj = function () {
        this.model = this.dokument.dodajPogodbo();
        this.triggerMethod('get:defaults', this.model);
        this.renderFormAndToolbar();
    };

    return PogodbaView;
});