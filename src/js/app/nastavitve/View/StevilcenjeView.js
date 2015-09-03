/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/SeznamView',
    'template!../tpl/stevilcenje-form.tpl',
    'formSchema!stevilcenje',
    'formSchema!stevilcenje?filter=1',
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
        url: baseUrl + '/rest/stevilcenje',
        title: i18next.t('stevilcenje.title'),
        schema: schema,
        filterSchema: filterSchema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('stevilcenje.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('stevilcenje.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('stevilcenje.prefix'),
                name: 'prefix',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('stevilcenje.format'),
                name: 'format',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'string',
                editable: false,
                label: i18next.t('stevilcenje.suffix'),
                name: 'suffix',
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
        ]
    });


    /**
     * Ob kliku dodaj
     * @returns {undefined}
     */
    Stevilcenje.prototype.onDodaj = function () {
        var model= this.collection.add({});
        this.onSelected(model);                
    };
 

    return Stevilcenje;
});