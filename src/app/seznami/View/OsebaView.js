/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/BaseView',
    'template!../tpl/oseba-form.tpl',
    'formSchema!oseba'
], function (
        BaseView,
        formTpl,
        shema
        ) {

    var OsebaView = BaseView.extend({
        url: '/rest/oseba',
        formTemplate: formTpl,
        shema: shema,
        name: 'Oseba',
        columns: [
            {
                cell: 'string',
                editable: false,
                label: 'Ime',
                name: 'ime',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Priimek',
                name: 'priimek',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Psevdonim',
                name: 'psevdonim',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'E-pošta',
                name: 'email',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Uporabnik',
                name: 'user',
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

    return OsebaView;
});