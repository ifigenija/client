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
        dodaj: i18next.t('seznami.dodaj'),
        formTitle: i18next.t('seznami.kontaktna.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.std.funkcija'),
                name: 'funkcija',
                sortable: true
            },
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('status')
                }),
                editable: false,
                label: i18next.t('seznami.kontaktna.status'),
                name: 'status',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.std.ime'),
                name: 'oseba.ime',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.oseba.priimek'),
                name: 'oseba.priimek',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.std.email'),
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
                    {event: 'oseba', title: i18next.t('seznami.oseba'), icon: 'fa-user'}
                ]
            }
        ]
    });



    return KontaktneView;
});