/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    'template!../tpl/zvrstUprizoritve-form.tpl',
    'formSchema!zvrstUprizoritve',
    '../Model/ZvrstUprizoritve',
    'i18next',
    'baseUrl'
], function (
        SeznamiView,
        formTpl,
        schema,
        ZvrstUprizoritve,
        i18next,
        baseUrl
        ) {

    var ZvrstUprizoritveView = SeznamiView.extend({
        url: '/rest/zvrstUprizoritve',
        name: 'ZvrstUprizoritve',
        schema: schema,
        formTemplate: formTpl,
        dodaj: i18next.t('seznami.view.zvrstUprizoritve.dodaj'),
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
                label: i18next.t('seznami.view.opis'),
                name: 'opis',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('seznami.view.brisi')}
                ]
            }
        ]
    });
    
    ZvrstUprizoritveView.prototype.onDodaj = function () {
        var model = new ZvrstUprizoritve.Model();
        this.onSelected(model);
    };

    return ZvrstUprizoritveView;
});