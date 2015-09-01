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
                label: i18next.t('pogodba.sifra'),
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
                label: i18next.t('pogodba.oseba'),
                name: 'oseba.label',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('pogodba.vrednostPredstave'),
                name: 'vrednostPredstave',
                sortable: true,
                total: 'sum'

            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('pogodba.samozaposlen'),
                name: 'samozaposlen',
                sortable: true

            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('pogodba.igralec'),
                name: 'igralec',
                sortable: true

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
    
    PogodbaView.prototype.placiloVaje = function (form) {
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
    
    PogodbaView.prototype.onRenderForm = function (form) {
        this.placiloVaje(form);
    };

    PogodbaView.prototype.onFormChange = function (form) {
        this.placiloVaje(form);
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