/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/BaseView',
    'template!../tpl/telefonska-form.tpl',
    'formSchema!telefonska'
], function (
        BaseView,
        formTpl,
        shema
        ) {

    var TelefonskaView = BaseView.extend({
        url: '/rest/telefonska',
        formTemplate: formTpl,
        shema: shema,
        name: 'Telefonska',
        columns: [
            {
                cell: 'string',
                editable: false,
                label: 'Poslovni Partner',
                name: 'popa',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Oseba',
                name: 'oseba',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Stevilka',
                name: 'stevilka',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: 'Briši'},
                    {event: 'uredi', title: 'Uredi'},
                ]
            }
        ]
    });

    return TelefonskaView;
});