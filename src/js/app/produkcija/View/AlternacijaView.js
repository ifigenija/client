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
        formTitle: i18next.t(''),
        triggers: {
            "click .pogodba-dodaj": "dodaj:pogodbo"
        },
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
                label: i18next.t('alternacija.pomembna'),
                name: 'pomembna',
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
                headerCell: 'number',
                cell: 'date',
                editable: false,
                label: i18next.t('alternacija.zacetek'),
                name: 'zacetek',
                sortable: false
            },
            {
                headerCell: 'number',
                cell: 'date',
                editable: false,
                label: i18next.t('alternacija.konec'),
                name: 'konec',
                sortable: false
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

    AlternacijaView.prototype.preveriDatum = function (form, editor) {
        var konec = editor.getValue();
        var zacetek = form.fields.zacetek.editor.getValue();
        var polja = form.fields;

        if (zacetek >= konec) {
            polja.konec.setError(i18next.t("std.napaka.datum"));
            return false;
        } else {
            polja.konec.clearError();
            return true;
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

    AlternacijaView.prototype.onShrani = function () {
        if (this.preveriDatum(this.form, this.form.fields.konec)) {
            PostavkeView.prototype.onShrani.apply(this, arguments);
        }
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

        Fv.prototype.placiloVaje = function (form) {
            var placiloNaVajo = form.fields.placiloNaVajo.editor.getValue();
            var vrednostVaje = form.fields.vrednostVaje.editor.$el;
            var vrednostVaj = form.fields.vrednostVaj.editor.$el;
            var steviloVaj = form.fields.planiranoSteviloVaj.editor.$el;

            if (placiloNaVajo) {
                vrednostVaj.attr("disabled", "disabled");
                steviloVaj.removeAttr("disabled");
                vrednostVaje.removeAttr("disabled");
            } else {
                vrednostVaj.removeAttr("disabled");
                steviloVaj.attr("disabled", "disabled");
                vrednostVaje.attr("disabled", "disabled");

            }
        };

        Fv.prototype.onFormChange = function (form) {
            this.placiloVaje(form);
        };

        Fv.prototype.onRender = function () {
            var self = this;
            this.listenTo(this, 'render', function () {
                self.placiloVaje(self.form);
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
            view.on('save:success', function (model) {
                var form = self.form;
                var editor = form.fields.pogodba.editor;
                editor.setValue(model.get('id'));
                form.trigger('change');
                
                //shranimo model alternacije, da ne rabimo ponovno shranjevat pogodbe
                if(!form.commit()){
                    self.model.save({
                        error: Radio.channel('error').request('handler', 'xhr')
                    });
                }
                
                //pridobimo podatke alternacije
                self.model.fetch({
                    success: function () {
                        self.renderList();
                    },
                    error: Radio.channel('error').request('handler', 'xhr')
                });
                modal.close();
            });
            view.triggerMethod('shrani');
            modal.preventClose();
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