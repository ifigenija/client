/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/BaseView',
    'template!../tpl/trr-form.tpl',
    'formSchema!trr'
], function (
        BaseView,
        formTpl,
        schema
        ) {

    var TrrView = BaseView.extend({
        url: '/rest/trr',
        formTemplate: formTpl,
        schema: schema,
        name: 'Trr',
        columns: [
            {
                cell: 'string',
                editable: false,
                label: 'Poslovni partner',
                name: 'popa',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Oseba ',
                name: 'oseba',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Banka',
                name: 'banka',
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

    return TrrView;
});