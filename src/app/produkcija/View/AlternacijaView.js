/* 
 * Licenca GPLv3
 */
define([
    'app/programDela/View/IfiPostavkaView',
    'template!../tpl/alternacija-form.tpl',
    'formSchema!alternacija',
    'i18next',
    'app/Max/Module/Backgrid'
], function (
        IfiPostavkaView,
        formTpl,
        schema,
        i18next,
        Backgrid
        ) {

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });

    var AlternacijaView = IfiPostavkaView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema({
            oseba: {
                editorAttrs: {
                    disabled: true
                }
            },
            funkcija: {
                editorAttrs: {
                    disabled: true
                }
            },
            pogodba: {
                editorAttrs: {
                    disabled: true
                }
            }
        }).schema,
        title: i18next.t('alternacija.title'),
        detailName: 'alternacije',
        formTitle: i18next.t('alternacija.title'),
        triggers: {
            "click .pogodba-dodaj": "dodaj:pogodbo"
        },
        gridMeta: [
            {
                headerCell: hc,
                cell: 'integer',
                editable: false,
                label: i18next.t('entiteta.sort'),
                name: 'sort',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.oseba'),
                name: 'oseba.label',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.funkcija'),
                name: 'funkcija.label',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('alternacija.zaposlen'),
                name: 'zaposlen',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('alternacija.pogodba'),
                name: 'pogodba.label',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('entiteta.brisi')},
                    {event: 'uredi', title: i18next.t('entiteta.uredi')}
                ]
            }
        ]
    });

    AlternacijaView.prototype.prepareToolbar = function () {
        return  this.model ?
                [[this.buttons.shrani, this.buttons.preklici, this.buttons.nasvet]] : [[]];

    };

    AlternacijaView.prototype.onDodajPogodbo = function () {
        var self = this;
        require(['backbone-modal',
            'app/Dokument/View/FormView',
            'formSchema!pogodba',
            'template!app/produkcija/tpl/pogodba-form.tpl',
            'baseUrl',
            'backbone',
            'radio'
        ], function (
                Modal,
                FormView,
                schemaPogodba,
                formPogodbaTpl,
                baseUrl,
                Backbone,
                Radio
                ) {
            var Fv = FormView.extend({
                formTitle: "naslov",
                buttons: {
                    shrani: {
                        id: 'doc-shrani',
                        label: 'Shrani',
                        element: 'button-trigger',
                        trigger: 'shrani',
                        disabled: true
                    },
                    nasvet: {
                        id: 'doc-nasvet',
                        label: '<i class="fa fa-info"></i>',
                        element: 'button-trigger',
                        trigger: 'nasvet'
                    }
                },
                schema: schemaPogodba.toFormSchema().schema,
                formTemplate: formPogodbaTpl,
                onFormChange: function (form) {
                    var tb = this.getToolbarModel();
                    var but = tb.getButton('doc-shrani');
                    if (but.get('disabled')) {
                        but.set({
                            disabled: false
                        });
                    }
                }
            });

            var Model = Backbone.Model.extend({
                urlRoot: baseUrl + '/rest/pogodba'
            });

            var model = new Model();

            var view = new Fv({
                model: model
            });

            var modal = new Modal({
                content: view,
                animate: true,
                okText: i18next.t("std.izberi"),
                cancelText: i18next.t("std.preklici")
            }).open(function () {
                if (!view.model.get('id')) {
                    Radio.channel('error').command('flash', {message: 'Niste še ustvarili nove pogodbe', code: 2000001, severity: 'error'});
                    modal.preventClose();
                }
                else {
                    self.form.fields.pogodba.editor.setValue(view.model.get('id'));
                    modal.close();
                }
            });
        });
    };

    return AlternacijaView;
});