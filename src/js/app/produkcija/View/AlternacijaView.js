/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'app/Dokument/View/FormView',
    'template!../tpl/alternacija-form.tpl',
    'template!../tpl/pogodbaAlt-form.tpl',
    'template!../tpl/pogodbaAlt-modal.tpl',
    'formSchema!alternacija',
    'formSchema!pogodba',
    'i18next',
    'app/Max/Module/Backgrid',
    'backbone-modal'
], function (
        PostavkeView,
        FormView,
        formTpl,
        formPogodbaTpl,
        formPogAltTpl,
        schema,
        schemaPogodba,
        i18next,
        Backgrid,
        Modal
        ) {

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });

    var AlternacijaView = PostavkeView.extend({
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
                label: i18next.t('ent.sort'),
                name: 'sort',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('ent.sifra'),
                name: 'sifra',
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
                label: i18next.t('ent.funkcija'),
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
                cell: 'boolean',
                editable: false,
                label: i18next.t('alternacija.imaPogodbo'),
                name: 'imaPogodbo',
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
     * Priprava toolbara
     * @returns {Array}
     */
    AlternacijaView.prototype.prepareToolbar = function () {
        return  this.model ?
                [[this.buttons.shrani, this.buttons.preklici, this.buttons.nasvet]] : [[]];

    };
    /**
     * Odpremo modal z določenim modelom
     * @param {type} pogodba
     * @returns {undefined}
     */
    AlternacijaView.prototype.pogodbaModal = function (pogodba) {
        var self = this;
        var Fv = FormView.extend({
            formTitle: "naslov",
            buttons: {
                nasvet: {
                    id: 'doc-nasvet',
                    label: '<i class="fa fa-info"></i>',
                    element: 'button-trigger',
                    trigger: 'nasvet'
                }
            },
            schema: schemaPogodba.toFormSchema().schema,
            formTemplate: formPogodbaTpl,
            template: formPogAltTpl
        });

        Fv.prototype.onFormChange = function (form) {
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

        Fv.prototype.onRender = function () {
            var self = this;
            this.listenTo(this, 'render', function () {
                var placiloNaVajo = self.form.fields.placiloNaVajo.editor.getValue();
                if (placiloNaVajo) {
                    self.form.fields.vrednostVaje.editor.$el.attr("disabled", "disabled");
                } else {
                    self.form.fields.vrednostVaj.editor.$el.attr("disabled", "disabled");
                }
            });
        };

        var formView = new Fv({
            model: pogodba
        });

        var modal = new Modal({
            content: formView,
            animate: true,
            okText: i18next.t("std.shrani"),
            cancelText: i18next.t("std.preklici"),
            title: i18next.t("pogodba.naslov") + ' ' + this.model.get('oseba')['label']
        });

        modal.open(function () {
            shraniSpremembe();
        });

        var shraniSpremembe = function () {
            if (!formView.model.get('id')) {
                formView.listenTo(formView, 'save:success', function () {
                    self.dokument.alternacijeCollection.fetch({
                        success: function () {
                            self.renderList();
                            self.renderFormAndToolbar();
                        }
                    });
                });
            }
            formView.triggerMethod('shrani');
        };

    };
    /**
     * Dodamo novo pogodbo
     * ALI
     * Uredimo že obstoječo pogodbo
     * @returns {undefined}
     */
    AlternacijaView.prototype.onDodajPogodbo = function () {
        var self = this;
        var pogodba = null;

        if (!self.model.get('imaPogodbo')) {
            pogodba = this.dokument.dodajPogodbo(this.model);
            this.pogodbaModal(pogodba);

        } else {
            var pogodbe = self.dokument.pogodbeCollection;
            pogodbe.fetch({
                success: function () {
                    var vrednosti = self.model.get('pogodba');
                    if (vrednosti) {
                        var id = vrednosti['id'];
                        if (id) {
                            pogodba = pogodbe.get(id);
                            self.pogodbaModal(pogodba);
                        }
                    }
                }
            });
        }
    };
    return AlternacijaView;
});