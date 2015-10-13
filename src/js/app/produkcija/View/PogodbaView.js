/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/pogodba-form.tpl',
    'formSchema!pogodba',
    'i18next'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next
        ) {

    var PogodbaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        title: i18next.t('pogodba.title'),
        detailName: 'pogodbe',
        formTitle: i18next.t(''),
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
                label: i18next.t('oseba.priimek'),
                name: 'oseba.priimek',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('oseba.ime'),
                name: 'oseba.ime',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('pogodba.funkcija'),
                name: 'funkcija',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('pogodba.vrednostVaj'),
                name: 'vrednostVaj',
                sortable: true,
                total: 'sum'

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
                    {event: 'uredi', title: i18next.t('std.uredi')},
                    {event: 'brisi', title: i18next.t('std.brisi')}
                ]
            }
        ]
    });

    PogodbaView.prototype.placiloVaje = function (form) {
        var vrednostVaje = form.fields.vrednostVaje.editor.$el;
        var vrednostVaj = form.fields.vrednostVaj.editor.$el;
        var steviloVaj = form.fields.planiranoSteviloVaj.editor.$el;
        var procentInkasa = form.fields.procentOdInkasa.editor.$el;

        var placiloNaVajo = form.fields.placiloNaVajo.editor.getValue();
        var inkasa = form.fields.jeProcentOdInkasa.editor.getValue();
        var vredVaje = form.fields.vrednostVaje.editor.getValue();
        var stVaj = form.fields.planiranoSteviloVaj.editor.getValue();

        if (placiloNaVajo) {
            vrednostVaj.attr("disabled", "disabled");
            steviloVaj.removeAttr("disabled");
            vrednostVaje.removeAttr("disabled");
            form.fields.vrednostVaj.editor.setValue(vredVaje * stVaj);
        } else {
            vrednostVaj.removeAttr("disabled");
            steviloVaj.attr("disabled", "disabled");
            vrednostVaje.attr("disabled", "disabled");
            form.fields.vrednostVaje.editor.setValue(0);
            form.fields.planiranoSteviloVaj.editor.setValue(0);
        }

        if (inkasa) {
            procentInkasa.removeAttr("disabled");
        } else {
            procentInkasa.attr("disabled", "disabled");
            form.fields.procentOdInkasa.editor.setValue(0);
        }

        var editor = form.fields.popa.editor;
        var popa = form.fields.popa.editor.getValue();
        var trrEditor = form.fields.trr.editor;
        if (popa) {
            trrEditor.filters = {
                "popa": {
                    "element": "popa"
                }
            };
        } else {
            trrEditor.filters = {
                "oseba": {
                    "element": "oseba"
                }
            };
        }
    };

    PogodbaView.prototype.onRenderForm = function (form) {
        this.placiloVaje(form);
    };

    PogodbaView.prototype.onFormChange = function (form) {
        this.placiloVaje(form);
        PostavkeView.prototype.onFormChange.apply(this, arguments);
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