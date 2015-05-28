/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'i18next',
    'underscore',
    'formSchema!funkcija',
    'template!../tpl/funkcija-form.tpl'
], function (
        PostavkeView,
        i18next,
        _,
        schema,
        formTpl
        ) {

    // odstranim področje iz sheme, ker 
    //  je nastavljeno implicitno glede na to, kje se 
    // funkcija ureja 
    var sch = _.omit(schema.toFormSchema().schema, 'podrocje');
    //console.log(sch);
    /**
     * 
     * 
     * @type @exp;PostavkeView@call;extend
     */
    var FunkcijaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: sch,
        name: '',
        detailName: '',
        formTitle: i18next.t('produkcija.funkcija.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.funkcija.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.funkcija.velikost'),
                name: 'velikost',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.funkcija.pomembna'),
                name: 'pomembna',
                sortable: false
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


    return FunkcijaView;
});
