/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'app/Dokument/View/FormView',
    'template!../tpl/alternacija-form.tpl',
    'template!../tpl/pogodbaAlt-form.tpl',
    'template!../tpl/pogodbaAlt-modal.tpl',
    'formSchema!alternacija/stroskovnik',
    'formSchema!pogodba',
    'i18next',
    'backbone-modal',
    'radio',
    'baseUrl',
    'backbone'
], function (
        PostavkeView,
        FormView,
        formTpl,
        formPogodbaTpl,
        formModalTpl,
        schema,
        schemaPogodba,
        i18next,
        Modal,
        Radio,
        baseUrl,
        Backbone
        ) {

    var AlternacijaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        title: i18next.t('alternacija.title'),
        detailName: 'alternacije',
        formTitle: i18next.t(''),
        triggers: {
            "click .pogodba-dodaj": "dodaj:pogodbo"
        },
        gridMeta: [
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
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('alternacija.imaPogodbo'),
                name: 'imaPogodbo',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'date',
                editable: false,
                label: i18next.t('alternacija.zacetek'),
                name: 'zacetek',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'date',
                editable: false,
                label: i18next.t('alternacija.konec'),
                name: 'konec',
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

    AlternacijaView.prototype.onRenderForm = function (options) {
        var self = this;
        this.form.on('pogodba:change', function (form, editor) {
            if (editor.getValue()) {
                this.$('.pogodba-dodaj').html(i18next.t('std.uredi'));

                if (!form.commit()) {
                    self.model.save({
                        error: Radio.channel('error').request('handler', 'xhr')
                    });
                }
            } else {
                this.$('.pogodba-dodaj').html(i18next.t('std.dodaj'));
            }
        });
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

        var PM = Modal.extend({
            className: 'pogodba-modal modal'
        });

        var modal = new PM({
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
                if (!form.commit()) {
                    self.model.save({
                        error: Radio.channel('error').request('handler', 'xhr')
                    });
                }
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

        var editor = this.form.fields.pogodba.editor;
        var vrednosti = editor.getValue();

        if (vrednosti) {
            var Pogodba = Backbone.Model.extend({
                urlRoot: baseUrl + '/rest/pogodba'
            });

            var model = new Pogodba({id: vrednosti.id});

            model.fetch({
                success: function () {
                    self.pogodbaModal(model);
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });
            //vzemi id in fetchni model model odpri v modalu
        } else {
            pogodba = this.dokument.dodajPogodbo(this.model);
            this.pogodbaModal(pogodba);
            this.$('.pogodba-dodaj').html(i18next.t('std.uredi'));
        }
    };
    return AlternacijaView;
});