/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/BaseView',
    'template!../tpl/uporabnik-form.tpl',
    'formSchema!user'
], function (
        BaseView,
        formTpl,
        shema
        ) {

    var UporabnikView = BaseView.extend({
        url: '/rest/user',
        formTemplate: formTpl,
        shema: shema,
        name: 'Uporabnik',
        columns: [
            {
                cell: 'string',
                editable: false,
                label: 'Ime in Priimek',
                name: 'name',
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
                label: 'Poteče veljavnost',
                name: 'expires',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Privzeta stran',
                name: 'defaultRoute',
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

    return UporabnikView;
});