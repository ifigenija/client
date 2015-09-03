/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/SeznamView',
    'template!../tpl/stevkonfig-form.tpl',
    'formSchema!stevilcenjekonfig',
    'formSchema!stevilcenjekonfig?filter=1',
    'i18next',
    'baseUrl'
], function (
        SeznamView,
        formTpl,
        schema,
        filterSchema,
        i18next,
        baseUrl
        ) {

    var Stevilcenje = SeznamView.extend({
        url: baseUrl + '/rest/stevilcenjekonfig',
        title: i18next.t('stevilcenje.konfigTitle'),
        schema: schema,
        filterSchema: filterSchema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('stevilcenje.zaDokument'),
                name: 'dok',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('stevilcenje.ident'),
                name: 'stevilcenje.ident',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('stevilcenje.label'),
                name: 'stevilcenje.label',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'uredi', title: i18next.t('std.uredi')}
                ]
            }
        ]
    });

    /**
     * Izris toolbara
     * @returns {undefined}
     */
    Stevilcenje.prototype.renderToolbar = function () {

    };
    /**
     * Ob kliku dodaj
     * @returns {undefined}
     */
    Stevilcenje.prototype.onDodaj = function () {
        var model = this.collection.add({});
        this.onSelected(model);
    };


    return Stevilcenje;
});