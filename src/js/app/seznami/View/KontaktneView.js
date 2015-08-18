/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'app/Dokument/View/PostavkeView',
    'app/Max/Module/Backgrid',
    'template!../tpl/kontaktna-form.tpl',
    'formSchema!kontaktnaoseba',
    'i18next',
    'app/seznami/Model/Oseba'
], function (
        Radio,
        PostavkeView,
        Backgrid,
        formTpl,
        schema,
        i18next,
        OsebaModel
        ) {


    var KontaktneView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'kontaktne',
        dodaj: i18next.t('dodaj'),
        formTitle: i18next.t('kontaktna.title'),
        triggers: {
            'click .dodaj-osebo': 'dodajOsebo'
        },
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('kontaktna.funkcija'),
                name: 'funkcija',
                sortable: true
            },
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('status')
                }),
                editable: false,
                label: i18next.t('kontaktna.status'),
                name: 'status',
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
                label: i18next.t('oseba.priimek'),
                name: 'oseba.priimek',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('oseba.email'),
                name: 'oseba.email',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('std.brisi')},
                    {event: 'uredi', title: i18next.t('std.uredi')},
                    {event: 'oseba', title: i18next.t('ent.oseba'), icon: 'fa fa-user'}
                ]
            }
        ]
    });
    /**
     * Odpre modal za dodajanje osebe
     * @returns {undefined}
     */
    KontaktneView.prototype.onDodajOsebo = function () {
        this.osebaModal(new OsebaModel.Model());
    };

    KontaktneView.prototype.osebaModal = function (editModel) {
        var self = this;

        require(['backbone-modal', 'app/seznami/View/OsebaEditView'], function (Modal, OsebaEditView) {
            var view = new OsebaEditView({
                model: editModel,
                pogled: 'kontaktna'
            });

            var izberi = function () {
                if (!view.model.get('id')) {
                    Radio.channel('error').command('flash', {message: 'Niste še ustvarili nove osebe', code: 2000000, severity: 'error'});
                    modal.preventClose();
                }
                else {
                    self.form.fields.oseba.editor.setValue(view.model.get('id'));
                    modal.close();
                }
            };

            var modal = new Modal({
                content: view,
                animate: true,
                okText: i18next.t("std.izberi"),
                cancelText: i18next.t("std.preklici")
            }).open(izberi);
        });
    };

    /**
     * Odpre modal za dodajanje osebe
     * @returns {undefined}
     */
    KontaktneView.prototype.onOseba = function (model) {
        var editModel = new OsebaModel.Model({id: model.get('oseba').id});
        var self = this;
        editModel.fetch({
            success: function () {
                self.osebaModal(editModel);
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });
    };

    return KontaktneView;
});