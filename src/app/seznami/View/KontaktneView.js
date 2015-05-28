/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/kontaktna-form.tpl',
    'formSchema!kontaktnaoseba',
    'i18next'
], function (
        PostavkeView,
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
                label: i18next.t('seznami.kontaktna.funkcija'),
                name: 'funkcija',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.kontaktna.status'),
                name: 'stevilka',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.oseba.ime'),
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
                label: i18next.t('seznami.email'),
                name: 'oseba.email',
                sortable: true
            },
                        
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('seznami.brisi')},
                    {event: 'uredi', title: i18next.t('seznami.uredi')},
                    {event: 'oseba', title: i18next.t('seznami.oseba'), icon: 'fa-user'},
                ]
            }
        ]
    });
    
    

    return KontaktneView;
});