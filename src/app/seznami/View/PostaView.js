/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    'template!../tpl/posta-form.tpl',
    'formSchema!posta',
    '../Model/Posta',
    'i18next'
], function (
        SeznamiView,
        formTpl,
        schema,
        Posta,
        i18next
        ) {

    var PostaView = SeznamiView.extend({
        url: '/rest/posta',
        name: 'Posta',
        schema: schema,
        formTemplate: formTpl,
        dodaj: i18next.t('seznami.view.posta.dodaj'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.sifra'),
                name: 'sifra',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.naziv'),
                name: 'naziv',
                sortable: false
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

    PostaView.prototype.onDodaj = function () {
        var model = new Posta.Model();
        this.onSelected(model);
    };

    return PostaView;
});