/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'app/programDela/View/IfiPostavkaView',
    'app/Max/Module/Backgrid',
    'template!../tpl/kontaktna-form.tpl',
    'formSchema!kontaktnaoseba',
    'i18next'
], function (
        Radio,
        IfiPostavkaView,
        Backgrid,
        formTpl,
        schema,
        i18next
        ) {


    var KontaktneView = IfiPostavkaView.extend({
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
                    {event: 'brisi', title: i18next.t('std.brisi')},
                    {event: 'uredi', title: i18next.t('std.uredi')},
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
                okText: i18next.t("std.izberi"),
                cancelText: i18next.t("std.preklici")
            }).open();

            modal.listenTo(modal, 'ok', function () {
                if(!view.model.get('id')){
                    Radio.channel('error').command('flash', {message: 'Niste še ustvarili nove osebe', code: 2000000, severity: 'error'});
                    modal.preventClose();
                }
                else{
                    self.form.fields.oseba.editor.setValue(view.model.get('id'));
                    modal.close();
                }
            });
        });
    };

    return KontaktneView;
});