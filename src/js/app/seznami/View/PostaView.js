/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/SeznamView',
    'template!../tpl/posta-form.tpl',
    'formSchema!posta?filter=1',
    'formSchema!posta',
    '../Model/Posta',
    'i18next',
    'baseUrl'
], function (
        SeznamView,
        formTpl,
        filterSch,
        schema,
        Posta,
        i18next,
        baseUrl
        ) {

    var PostaView = SeznamView.extend({
        url: baseUrl + '/rest/posta',
        title: i18next.t('posta.title'),
        zapirajFormo: false,
        skrivajTabelo: true,
        filterSchema: filterSch,
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('posta.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('posta.naziv'),
                name: 'naziv',
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

    PostaView.prototype.getTitle = function (model) {
        var text = i18next.t("posta.nova");

        if (model.get('id')) {
            text = model.get('naziv') || "Naziv";
        }
        return text;
    };

    PostaView.prototype.onDodaj = function () {
        var model = new Posta.Model();
        this.onUredi(model);
    };

    return PostaView;
});