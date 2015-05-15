/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    'template!../tpl/zvrstSurs-form.tpl',
    'formSchema!zvrstSurs',
    '../Model/ZvrstSurs',
    'i18next'
], function (
        SeznamiView,
        formTpl,
        schema,
        ZvrstSurs,
        i18next
        ) {

    var ZvrstSursView = SeznamiView.extend({
        url: '/rest/zvrstSurs',
        name: 'ZvrstSurs',
        schema: schema,
        formTemplate: formTpl,
        dodaj: i18next.t('seznami.view.zvrstSurs.dodaj'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.ime'),
                name: 'ime',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('seznami.view.brisi')},
                    {event: 'uredi', title: i18next.t('seznami.view.uredi')},
                ]
            }
        ]
    });
    
    ZvrstSursView.prototype.onDodaj = function () {
        var model = new ZvrstSurs.Model();
        this.onSelected(model);
    };


    return ZvrstSursView;
});