/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    'template!../tpl/prostor-form.tpl',
    'formSchema!prostor',
    '../Model/Prostor',
    '../Model/Popa',
    'i18next',
    'baseUrl',
    'backbone-modal',
    'app/Dokument/View/FormView',
    'template!../tpl/postniNaslov-form.tpl',
    'formSchema!postniNaslov',
    'template!../tpl/postniNaslov-modal.tpl'
], function (
        SeznamView,
        formTpl,
        schema,
        Prostor,
        Popa,
        i18next,
        baseUrl,
        Modal,
        FormView,
        postniNaslovTpl,
        postniNaslovSchema,
        postniNaslovModalTpl
        ) {

    var ProstorView = SeznamView.extend({
        url: baseUrl + '/rest/prostor',
        title: i18next.t('prostor.title'),
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('prostor.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('prostor.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('prostor.popa'),
                name: 'popa.label',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('prostor.naslov'),
                name: 'naslov.label',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('prostor.jePrizorisce'),
                name: 'jePrizorisce',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('prostor.kapaciteta'),
                name: 'kapaciteta',
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
        ],
        triggers: {
            'click .prostor-dodaj-naslov': 'dodaj:naslov'
        }
    });
    
    ProstorView.prototype.disableGumbNaslov = function (form, editor) {
        var podatek = editor.getValue();
        if (podatek) {
            this.$('.prostor-dodaj-naslov').attr("disabled", false);
            this.$('.prostor-dodaj-naslov').prop("disabled", false);
        } else {
            this.$('.prostor-dodaj-naslov').attr("disabled", true);
            this.$('.prostor-dodaj-naslov').prop("disabled", true);
        }
    };

    ProstorView.prototype.onRenderForm = function () {
        var form =this.formView.form;
        var editor =this.formView.form.fields.popa.editor;
        
        form.on('popa:change', this.disableGumbNaslov, this);
        this.disableGumbNaslov(form, editor);
    };

    ProstorView.prototype.getTitle = function (model) {
        var text = i18next.t("prostor.nova");

        if (model.get('id')) {
            text = model.get('naziv') || "Naziv";
        }
        return text;
    };

    ProstorView.prototype.onDodaj = function () {
        var model = new Prostor.Model();
        this.onSelected(model);
    };

    ProstorView.prototype.onDodajNaslov = function () {

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
            schema: postniNaslovSchema.toFormSchema().schema,
            formTemplate: postniNaslovTpl,
            template: postniNaslovModalTpl
        });

        var PostniNaslovModel = Popa.PostniNaslovModel;

        var postniNaslov = new PostniNaslovModel({
            popa: this.formView.form.fields.popa.getValue().id
        });

        var view = new Fv({
            model: postniNaslov
        });

        var self = this;

        var saveSuccess = function () {
            var editor = self.formView.form.fields.naslov.editor;

            editor.setValue(view.model.get('id'));
            modal.close();
        };

        var izberi = function () {
            view.on('save:success', saveSuccess, this);
            view.triggerMethod('shrani');
            modal.preventClose();
        };

        var modal = new Modal({
            content: view,
            animate: true,
            okText: i18next.t("std.izberi"),
            cancelText: i18next.t("std.preklici")
        });

        modal.open(izberi);
    };

    return ProstorView;
});