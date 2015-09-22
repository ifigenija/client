/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/avtorBesedila-form.tpl',
    'formSchema!avtorBesedila?filter=1',
    'formSchema!avtorBesedila',
    '../Model/Besedilo',
    'i18next',
    'baseUrl',
    'radio'
], function (
        PostavkeView,
        formTpl,
        filterSch,
        schema,
        Model,
        i18next,
        baseUrl,
        Radio
        ) {

    var AvtorBesedilaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'avtorji',
        dodaj: i18next.t('dodaj'),
        formTitle: i18next.t('avtorBesedila.title'),
        triggers: {
            'click .dodaj-osebo': 'dodajOsebo'
        },
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('avtorBesedila.tipAvtorja'),
                name: 'tipAvtorja',
                sortable: true
            },
            {
                cell:'boolean',
                editable: false,
                label: i18next.t('avtorBesedila.aliVNaslovu'),
                name: 'aliVNaslovu',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('avtorBesedila.besedilo'),
                name: 'besedilo.label',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('avtorBesedila.oseba'),
                name: 'oseba.label',
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

    return AvtorBesedilaView;
});