/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/postniNaslov-form.tpl',
    'formSchema!postniNaslov',
    'i18next'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next
        ) {

    var PostniNaslovView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'naslovi',
        formTitle: i18next.t('postniNaslov.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('ent.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('postniNaslov.ulica'),
                name: 'ulica',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('postniNaslov.posta'),
                name: 'posta',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('postniNaslov.postaNaziv'),
                name: 'postaNaziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('ent.drzava'),
                name: 'drzava.label',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('std.brisi')},
                    {event: 'uredi', title: i18next.t('std.uredi')}
                ]
            }
        ]
    });

    return PostniNaslovView;
});