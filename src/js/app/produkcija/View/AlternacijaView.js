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
    'backbone-modal',
    'radio'
], function (
        PostavkeView,
        FormView,
        formTpl,
        formPogodbaTpl,
        formModalTpl,
        schema,
        schemaPogodba,
        i18next,
        Backgrid,
        Modal,
        Radio
        ) {

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
                headerCell: 'number',
                cell: 'integer',
                editable: false,
                label: i18next.t('alternacija.sort'),
                name: 'sort',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('alternacija.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('alternacija.oseba'),
                name: 'oseba.label',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('alternacija.funkcija'),
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
                cell: 'date',
                editable: false,
                label: i18next.t('alternacija.zacetek'),
                name: 'zacetek',
                sortable: false
            },
            {
                cell: 'date',
                editable: false,
                label: i18next.t('alternacija.konec'),
                name: 'konec',
                sortable: false
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('alternacija.aktivna'),
                name: 'aktivna',
                sortable: false
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

    AlternacijaView.prototype.preveriDatum = function (form, editor) {
        var konec = editor.getValue();
        var zacetek = form.fields.zacetek.editor.getValue();
        var polja = form.fields;

        if (zacetek >= konec) {
            polja.konec.setError(i18next.t("napaka.datum"));
        } else {
            polja.konec.clearError();
        }
    };

    AlternacijaView.prototype.onRenderForm = function (options) {
        this.form.on('pogodba:change', function (form, editor) {
            if (editor.getValue()) {
                this.$('.pogodba-dodaj').html(i18next.t('std.uredi'));
            } else {
                this.$('.pogodba-dodaj').html(i18next.t('std.dodaj'));
            }
        });

        this.form.on('konec:change', this.preveriDatum, this);
    };

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
                    icon: 'fa fa-info',
                    element: 'button-trigger',
                    trigger: 'nasvet'
                }
            },
            schema: schemaPogodba.toFormSchema().schema,
            formTemplate: formPogodbaTpl,
            template: formModalTpl
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
            var model = modal.options.content.model;
            var view = modal.options.content;
            if (!model.get('id')) {
                view.on('save:success', function (model) {
                    var form = self.form;
                    var editor = form.fields.pogodba.editor;
                    editor.setValue(model.get('id'));
                    form.trigger('change');
                    form.trigger('pogodba:change', form, editor);
                    self.dokument.alternacijeCollection.fetch({
                        success: function () {
                            self.renderList();
                        },
                        error: Radio.channel('error').request('handler', 'xhr')
                    });
                });
            }
            view.triggerMethod('shrani');
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
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
    };
    return AlternacijaView;
});