/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/BaseView',
    'template!../tpl/vloga-form.tpl',
    'formSchema!role'
], function (
        BaseView,
        formTpl,
        schema
        ) {

    var VlogaView = BaseView.extend({
        url: '/rest/role',
        formTemplate: formTpl,
        schema: schema,
        name: 'Vloga',
        columns: [
            {
                cell: 'string',
                editable: false,
                label: 'Naziv',
                name: 'name',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Opis',
                name: 'description',
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

    return VlogaView;
});