/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'app/Max/Module/Backgrid',
    'template!../tpl/kontaktna-form.tpl',
    'formSchema!kontaktnaoseba',
    'i18next'
], function (
        PostavkeView,
        Backgrid,
        formTpl,
        schema,
        i18next
        ) {


    var KontaktneView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'kontaktne',
        dodaj: i18next.t('dodaj'),
        formTitle: i18next.t('kontaktnaOseba.title'),
        triggers: {
            'click .dodaj-osebo': 'dodajOsebo'
        },
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.funkcija'),
                name: 'funkcija',
                sortable: true
            },
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('status')
                }),
                editable: false,
                label: i18next.t('entiteta.status'),
                name: 'status',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.ime'),
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
                label: i18next.t('entiteta.email'),
                name: 'oseba.email',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('entiteta.brisi')},
                    {event: 'uredi', title: i18next.t('entiteta.uredi')},
                    {event: 'oseba', title: i18next.t('oseba'), icon: 'fa-user'}
                ]
            }
        ]
    });
    /**
     * Odpre modal za dodajanje osebe
     * @returns {undefined}
     */
    KontaktneView.prototype.onDodajOsebo = function () {
        var self = this;
        require(['app/seznami/Model/Oseba', 'backbone-modal', 'app/seznami/View/OsebaEditView'], function (Model, Modal, OsebaEditView) {
            var editModel = new Model.Model();

            var view = new OsebaEditView({
                model: editModel,
                pogled: 'kontaktna'
            });

            var modal = new Modal({
                content: view,
                animate: true,
                okText: "Shrani",
                cancelText: "Prekliči"
            }).open(function () {
                view.onShrani();
            });

            modal.listenTo(modal, 'ok', function () {
                modal.preventClose();
            });
            modal.listenTo(view, 'save:success', function (model) {
                modal.close();
            });
            self.listenTo(view, 'save:success',
                    function (model) {
                        this.form.fields.oseba.editor.setValue(model.get('id'));
                    });
        });
    };

    return KontaktneView;
});