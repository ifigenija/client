/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/alternacija-form.tpl',
    'formSchema!alternacija',
    'i18next',
    'app/Max/Module/Backgrid'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next,
        Backgrid
        ) {
    
    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    }); 

    var AlternacijaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema({
            oseba: {
                editorAttrs: {
                    disabled: true
                }
            },
            funkcija: {
                editorAttrs: {
                    disabled: true
                }
            }
        }).schema,
        title: i18next.t('produkcija.alternacija.title'),
        detailName: 'alternacije',
        formTitle: i18next.t('produkcija.alternacija.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.std.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.alternacija.oseba'),
                name: 'oseba.label',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.alternacija.funkcija'),
                name: 'funkcija',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('produkcija.alternacija.zaposlen'),
                name: 'zaposlen',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.alternacija.pogodba'),
                name: 'pogodba',
                sortable: false
            },
            {
                headerCell: hc,
                cell: 'integer',
                editable: false,
                label: i18next.t('produkcija.std.sort'),
                name: 'sort',
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


    AlternacijaView.prototype.prepareToolbar = function () {
        return  this.model ?
                [[this.buttons.shrani, this.buttons.preklici]] : [[]];

    };

    return AlternacijaView;
});